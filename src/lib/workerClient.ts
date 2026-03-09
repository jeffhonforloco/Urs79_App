/**
 * Cloudflare Worker proxy client
 * Use this for external API requests routed through the edge Worker.
 * Direct Supabase SDK calls (auth, database, storage) do NOT use this.
 */

const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'http://localhost:8787';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
  /** Cache TTL hint in seconds (GET only) */
  cache?: number;
  /** Include the current Supabase JWT for protected Worker routes */
  withAuth?: boolean;
};

type WorkerResponse<T> = {
  data: T | null;
  error: string | null;
  status: number;
};

/**
 * Get the current session JWT from Supabase (if logged in)
 */
async function getAuthToken(): Promise<string | null> {
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  } catch {
    return null;
  }
}

/**
 * Core fetch wrapper for the Cloudflare Worker proxy
 */
async function workerFetch<T>(
  path: string,
  options: RequestOptions = {}
): Promise<WorkerResponse<T>> {
  const { method = 'GET', body, headers = {}, withAuth = false } = options;

  const reqHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (withAuth) {
    const token = await getAuthToken();
    if (token) reqHeaders['Authorization'] = `Bearer ${token}`;
  }

  const url = `${WORKER_URL}${path.startsWith('/') ? path : `/${path}`}`;

  try {
    const response = await fetch(url, {
      method,
      headers: reqHeaders,
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    const status = response.status;

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      return { data: null, error: errorData.error ?? 'Request failed', status };
    }

    const data: T = await response.json();
    return { data, error: null, status };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { data: null, error: message, status: 0 };
  }
}

/**
 * Typed convenience methods
 */
export const workerClient = {
  get: <T>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    workerFetch<T>(path, { ...opts, method: 'GET' }),

  post: <T>(path: string, body: unknown, opts?: Omit<RequestOptions, 'method'>) =>
    workerFetch<T>(path, { ...opts, method: 'POST', body }),

  put: <T>(path: string, body: unknown, opts?: Omit<RequestOptions, 'method'>) =>
    workerFetch<T>(path, { ...opts, method: 'PUT', body }),

  delete: <T>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    workerFetch<T>(path, { ...opts, method: 'DELETE' }),

  /** Check Worker health */
  health: () => workerFetch<{ status: string; timestamp: string }>('/health'),
};
