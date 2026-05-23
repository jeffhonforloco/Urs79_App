# Project Context — urs79

## Identity
Project: urs79
Owner: Tarvico Inc.
Status: Pre-launch / Active

## Stack
- Frontend: React 18 / TypeScript / Vite / Tailwind CSS / shadcn/ui
- Backend: Supabase (PostgreSQL + Auth + Storage + Edge Functions + Realtime)
- Database: PostgreSQL via Supabase (project: `syfjzqneqlbxwcpbwgww`)
- Cache: Cloudflare KV (Worker only — optional, used for rate-limiting)
- Queue: pgmq (Postgres-native via Supabase extensions) — `auth_emails`, `transactional_emails`, `*_dlq` pairs
- AI: none active
- Auth: Supabase Auth (email/password + custom auth-email-hook Edge Function)
- Payments: none (shop cart + wishlist UI exist; no checkout/payment integration yet)
- Email: `@lovable.dev/email-js` (send); Mailgun webhooks (bounce/complaint suppression)
- File storage: Supabase Storage — `site-assets` (logo, hero video), music/audio for submissions
- Cloud: Cloudflare Pages (static SPA) + Cloudflare Workers (edge middleware `urs79-edge`)
- Functions: Supabase Edge Functions (Deno) — see `/supabase/functions/`
- CI/CD: none

## Key Paths
```
/src/pages/               ← Page-level route components
/src/pages/admin/         ← Admin dashboard pages
/src/components/urs79/    ← Site-level layout (SiteLayout, SectionHeader, Marquee, ScrollReveal)
/src/components/shop/     ← Cart and Wishlist drawers
/src/components/submit/   ← Multi-step music submission wizard
/src/components/ui/       ← shadcn/ui primitives (do not hand-edit)
/src/integrations/supabase/ ← Supabase client + auto-generated types (do not hand-edit types.ts)
/src/hooks/               ← Custom React hooks (useAdmin, useSiteSettings, useWorkerQuery)
/src/contexts/            ← CartContext, WishlistContext
/src/lib/                 ← Shared utilities + workerClient.ts
/worker/                  ← Cloudflare Worker edge middleware (rate-limit, CORS, API proxy)
/supabase/migrations/     ← DB schema migrations (chronological, never edit existing files)
/supabase/functions/      ← Supabase Edge Functions (Deno runtime)
/Logo/                    ← Brand assets (PNG variants)
/public/                  ← Static assets served as-is
```

## Supabase Tables
| Table | Purpose |
|---|---|
| `artists` | Label roster — published to Artists page |
| `news` | News/blog posts |
| `projects` | Portfolio projects |
| `products` | Shop catalogue |
| `releases` | Music releases linked to artists |
| `release_tracks` | Individual tracks per release |
| `submissions` | Music submission intake records |
| `submission_releases` | Release metadata from submission wizard |
| `submission_accounts` | Account step data from submission wizard |
| `submission_artist_profiles` | Artist profile step data |
| `master_declarations` | Master ownership / rights declarations |
| `publishing_splits` | Mechanical publishing splits per release |
| `track_contributors` | Per-track contributor credits |
| `profiles` | Auth user profiles (display name, avatar) |
| `user_roles` | Role assignments (`admin`, `moderator`, `user`) |
| `site_settings` | Key/value store for CMS-style settings (logo, hero video, notification emails) |
| `email_send_log` | Audit trail for every email send attempt |
| `email_send_state` | Global rate-limit / batch config for email queue |
| `email_unsubscribe_tokens` | One-time tokens for unsubscribe links |
| `suppressed_emails` | Bounce/complaint suppression list |

## Supabase Edge Functions
| Function | Purpose |
|---|---|
| `auth-email-hook` | Custom auth email delivery via Lovable email service |
| `process-email-queue` | Cron-driven pgmq consumer — sends queued emails |
| `send-transactional-email` | Enqueues transactional emails (contact, submission received) |
| `handle-email-suppression` | Mailgun webhook handler — marks bounces/complaints in DB |
| `handle-email-unsubscribe` | Token-based unsubscribe confirmation |
| `preview-transactional-email` | Dev preview of email templates |
| `setup-admin` | One-time admin role provisioning |

## Critical Conventions
- Single-tenant: no org_id — this is a single-label site, not a SaaS
- RLS enabled on all tables; admin access controlled via `has_role(auth.uid(), 'admin')`
- Admin role check: query `user_roles` table — do NOT use Supabase's built-in `is_claims_admin`
- Email queue: always enqueue via `send-transactional-email` Edge Function, never send directly
- Email suppression: check `suppressed_emails` before sending; honour unsubscribe tokens
- Supabase types: `src/integrations/supabase/types.ts` is auto-generated — regenerate with `supabase gen types`, never edit by hand
- Worker (`/worker/`): handles only external API proxying, rate limiting, and CORS — Supabase SDK calls go directly from the SPA, not through the Worker
- File uploads: use Supabase Storage SDK directly from the SPA; bucket `site-assets` for site media
- Design tokens: use Tailwind CSS variables and shadcn/ui tokens — no hardcoded hex colours
- Routing: React Router v6; all public routes wrapped in `<SiteLayout>`; admin routes under `/admin/*` with auth guard

## Environment Variables
```
# Frontend (Vite — must be prefixed VITE_)
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_PROJECT_ID

# Cloudflare Worker (set in Wrangler dashboard or wrangler.toml [vars])
BACKEND_API_URL
CACHE_TTL
RATE_LIMIT_KV          # KV namespace binding (optional)

# Supabase Edge Functions (set as Supabase secrets)
SUPABASE_SERVICE_ROLE_KEY
MAILGUN_API_KEY
MAILGUN_DOMAIN
LOVABLE_WEBHOOK_SECRET
```

## Do NOT
- Add a payment integration without updating CartContext + creating a checkout route
- Edit `supabase/migrations/` files after they have been applied — create a new migration instead
- Hand-edit `src/integrations/supabase/types.ts` — regenerate it
- Send emails from frontend code — always go through the Edge Function queue
- Remove RLS from any table
- Route Supabase SDK calls through the Cloudflare Worker
- Add hardcoded colours — use Tailwind / shadcn CSS variables

## Known Deferred Items
- Payment / checkout integration for the shop (cart + wishlist drawers are complete; Stripe or similar TBD)
- CI/CD pipeline (no GitHub Actions configured)
- Cloudflare KV rate-limit namespace not wired in production (`RATE_LIMIT_KV` binding commented out in `worker/wrangler.toml`)
- Worker `BACKEND_API_URL` points to placeholder `api.example.com` — needs real value if proxy routes are used

## Last Updated
2026-05-23 — Initial CONTEXT.md generated from codebase audit
