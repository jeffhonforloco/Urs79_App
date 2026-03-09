/**
 * Cloudflare Worker - Edge Middleware
 * 
 * Purpose: API proxy, caching, rate limiting, and auth validation
 * for external API calls (NOT for direct Supabase SDK communication)
 * 
 * The React SPA continues to use Supabase SDK directly for:
 * - Authentication (supabase.auth)
 * - Database queries (supabase.from())
 * - Storage (supabase.storage)
 * - Realtime subscriptions
 * 
 * This Worker is for proxying OTHER external APIs.
 */

interface Env {
  BACKEND_API_URL?: string;
  RATE_LIMIT_KV?: KVNamespace;
  CACHE_TTL?: string;
}

// Rate limiting config
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100;

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type, X-Requested-With',
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Health check endpoint
    if (url.pathname === '/health') {
      return jsonResponse({ status: 'ok', timestamp: new Date().toISOString() });
    }

    // Rate limiting (if KV is configured)
    if (env.RATE_LIMIT_KV) {
      const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
      const rateLimitResult = await checkRateLimit(env.RATE_LIMIT_KV, clientIP);
      
      if (!rateLimitResult.allowed) {
        return jsonResponse(
          { error: 'Rate limit exceeded', retryAfter: rateLimitResult.retryAfter },
          429,
          { 'Retry-After': String(rateLimitResult.retryAfter) }
        );
      }
    }

    // Auth token validation for protected routes
    if (url.pathname.startsWith('/api/protected/')) {
      const authResult = validateAuthToken(request);
      if (!authResult.valid) {
        return jsonResponse({ error: 'Unauthorized', message: authResult.error }, 401);
      }
    }

    // Proxy to external backend API
    if (url.pathname.startsWith('/api/')) {
      return handleApiProxy(request, env, ctx);
    }

    // Default: return 404 for unhandled routes
    return jsonResponse({ error: 'Not Found' }, 404);
  },
};

/**
 * Rate limiting using Cloudflare KV
 */
async function checkRateLimit(
  kv: KVNamespace,
  clientKey: string
): Promise<{ allowed: boolean; retryAfter?: number }> {
  const key = `ratelimit:${clientKey}`;
  const now = Date.now();
  
  try {
    const data = await kv.get(key, 'json') as { count: number; windowStart: number } | null;
    
    if (!data || now - data.windowStart > RATE_LIMIT_WINDOW_MS) {
      // New window
      await kv.put(key, JSON.stringify({ count: 1, windowStart: now }), {
        expirationTtl: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000),
      });
      return { allowed: true };
    }
    
    if (data.count >= RATE_LIMIT_MAX_REQUESTS) {
      const retryAfter = Math.ceil((data.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000);
      return { allowed: false, retryAfter };
    }
    
    // Increment count
    await kv.put(key, JSON.stringify({ ...data, count: data.count + 1 }), {
      expirationTtl: Math.ceil((data.windowStart + RATE_LIMIT_WINDOW_MS - now) / 1000),
    });
    
    return { allowed: true };
  } catch {
    // If KV fails, allow the request
    return { allowed: true };
  }
}

/**
 * Validate JWT token from Authorization header
 * Note: This is a basic validation. For production, use proper JWT verification
 */
function validateAuthToken(request: Request): { valid: boolean; error?: string } {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader) {
    return { valid: false, error: 'Missing Authorization header' };
  }
  
  if (!authHeader.startsWith('Bearer ')) {
    return { valid: false, error: 'Invalid Authorization format' };
  }
  
  const token = authHeader.substring(7);
  
  if (!token || token.length < 10) {
    return { valid: false, error: 'Invalid token' };
  }
  
  // Basic JWT structure validation (header.payload.signature)
  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'Invalid JWT structure' };
  }
  
  // Check expiration from payload
  try {
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return { valid: false, error: 'Token expired' };
    }
  } catch {
    return { valid: false, error: 'Invalid token payload' };
  }
  
  return { valid: true };
}

/**
 * Proxy requests to external backend API with caching
 */
async function handleApiProxy(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  const url = new URL(request.url);
  const backendUrl = env.BACKEND_API_URL || 'https://api.example.com';
  
  // Strip /api prefix and proxy to backend
  const proxyPath = url.pathname.replace(/^\/api/, '');
  const proxyUrl = `${backendUrl}${proxyPath}${url.search}`;
  
  // For GET requests, try cache first
  if (request.method === 'GET') {
    const cacheKey = new Request(proxyUrl, request);
    const cache = caches.default;
    
    let cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      return addCorsHeaders(cachedResponse);
    }
    
    // Fetch from backend
    const response = await fetch(proxyUrl, {
      method: request.method,
      headers: {
        ...Object.fromEntries(request.headers),
        'X-Forwarded-For': request.headers.get('CF-Connecting-IP') || '',
      },
    });
    
    // Cache successful responses
    if (response.ok) {
      const cacheTtl = parseInt(env.CACHE_TTL || '60', 10);
      const responseToCache = new Response(response.body, response);
      responseToCache.headers.set('Cache-Control', `public, max-age=${cacheTtl}`);
      ctx.waitUntil(cache.put(cacheKey, responseToCache.clone()));
      return addCorsHeaders(responseToCache);
    }
    
    return addCorsHeaders(response);
  }
  
  // For non-GET requests, proxy directly
  const response = await fetch(proxyUrl, {
    method: request.method,
    headers: {
      ...Object.fromEntries(request.headers),
      'X-Forwarded-For': request.headers.get('CF-Connecting-IP') || '',
    },
    body: request.body,
  });
  
  return addCorsHeaders(response);
}

/**
 * Helper: Create JSON response
 */
function jsonResponse(
  data: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
      ...extraHeaders,
    },
  });
}

/**
 * Helper: Add CORS headers to response
 */
function addCorsHeaders(response: Response): Response {
  const newHeaders = new Headers(response.headers);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    newHeaders.set(key, value);
  });
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
