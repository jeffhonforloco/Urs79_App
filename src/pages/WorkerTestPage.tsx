import { useState } from 'react';
import { workerClient } from '@/lib/workerClient';
import { supabase } from '@/integrations/supabase/client';

type TestResult = {
  label: string;
  status: 'idle' | 'loading' | 'ok' | 'error';
  status_code?: number;
  payload?: unknown;
  error?: string;
  duration_ms?: number;
};

const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'http://localhost:8787';

export default function WorkerTestPage() {
  const [results, setResults] = useState<TestResult[]>([
    { label: 'Health check  GET /health', status: 'idle' },
    { label: 'Public proxy  GET /api/ping', status: 'idle' },
    { label: 'Protected     GET /api/protected/me', status: 'idle' },
    { label: 'Rate limit    10× rapid GET /api/ping', status: 'idle' },
  ]);

  const update = (index: number, patch: Partial<TestResult>) =>
    setResults(prev => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)));

  const runAll = async () => {
    // Reset
    setResults(prev => prev.map(r => ({ ...r, status: 'idle', payload: undefined, error: undefined })));

    // ── 1. Health check ──────────────────────────────────────────────
    update(0, { status: 'loading' });
    const t0 = Date.now();
    const health = await workerClient.health();
    update(0, {
      status: health.error ? 'error' : 'ok',
      status_code: health.status,
      payload: health.data,
      error: health.error ?? undefined,
      duration_ms: Date.now() - t0,
    });

    // ── 2. Public proxy ───────────────────────────────────────────────
    update(1, { status: 'loading' });
    const t1 = Date.now();
    const pub = await workerClient.get('/api/ping');
    update(1, {
      status: pub.error ? 'error' : 'ok',
      status_code: pub.status,
      payload: pub.data,
      error: pub.error ?? undefined,
      duration_ms: Date.now() - t1,
    });

    // ── 3. Protected route (sends JWT if session exists) ──────────────
    update(2, { status: 'loading' });
    const t2 = Date.now();
    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;
    const prot = await workerClient.get('/api/protected/me', { withAuth: true });
    update(2, {
      status: prot.status === 401 ? 'error' : prot.error ? 'error' : 'ok',
      status_code: prot.status,
      payload: prot.data ?? { token_present: !!token, note: 'Worker returned 401 — expected if no session' },
      error: prot.error ?? undefined,
      duration_ms: Date.now() - t2,
    });

    // ── 4. Rate limit test (10 rapid calls) ───────────────────────────
    update(3, { status: 'loading' });
    const t3 = Date.now();
    const calls = await Promise.all(
      Array.from({ length: 10 }, () => workerClient.get('/api/ping'))
    );
    const statuses = calls.map(c => c.status);
    const hit429 = statuses.includes(429);
    update(3, {
      status: 'ok',
      status_code: hit429 ? 429 : 200,
      payload: { statuses, rate_limit_triggered: hit429 },
      duration_ms: Date.now() - t3,
    });
  };

  const badge = (r: TestResult) => {
    if (r.status === 'idle') return <span className="text-[10px] uppercase tracking-widest text-muted-foreground">idle</span>;
    if (r.status === 'loading') return <span className="text-[10px] uppercase tracking-widest text-yellow-400 animate-pulse">running…</span>;
    if (r.status === 'ok') return <span className="text-[10px] uppercase tracking-widest text-green-400">✓ {r.status_code} · {r.duration_ms}ms</span>;
    return <span className="text-[10px] uppercase tracking-widest text-red-400">✗ {r.status_code || 'ERR'} · {r.duration_ms}ms</span>;
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 max-w-3xl mx-auto">
      <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">Developer Tooling</p>
      <h1 className="font-display text-4xl mb-2">Worker Test</h1>
      <p className="text-sm text-muted-foreground mb-1">
        Target: <code className="bg-secondary px-2 py-0.5 rounded text-xs">{WORKER_URL}</code>
      </p>
      <p className="text-xs text-muted-foreground mb-8">
        Requires <code className="bg-secondary px-1 rounded">wrangler dev</code> running locally.
        Set <code className="bg-secondary px-1 rounded">VITE_WORKER_URL</code> to override.
      </p>

      <button
        onClick={runAll}
        className="mb-8 px-6 py-2.5 bg-primary text-primary-foreground text-xs tracking-[0.15em] uppercase rounded hover:opacity-90 transition-opacity"
      >
        Run All Tests
      </button>

      <div className="space-y-3">
        {results.map((r, i) => (
          <div key={i} className="glass-card p-5 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <code className="text-sm font-mono text-foreground">{r.label}</code>
              {badge(r)}
            </div>
            {(r.payload || r.error) && (
              <pre className={`text-xs rounded p-3 overflow-x-auto ${r.status === 'error' ? 'bg-red-950/30 text-red-300' : 'bg-secondary text-muted-foreground'}`}>
                {JSON.stringify(r.error ? { error: r.error } : r.payload, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-8">
        This page is only accessible at <code className="bg-secondary px-1 rounded">/worker-test</code>.
        Remove it before production launch.
      </p>
    </div>
  );
}
