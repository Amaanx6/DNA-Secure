/**
 * Default `/dna-api` is proxied by Next to Python — avoids CORS and works with LAN IPs.
 * Set `NEXT_PUBLIC_API_URL` to call an API directly (must allow browser CORS).
 * Server-side rewrites use `API_INTERNAL_ORIGIN` in `next.config.ts`.
 */
function normalizeBase(url: string): string {
  return url.replace(/\/$/, "");
}

const fromEnv = process.env.NEXT_PUBLIC_API_URL?.trim();

export const API_BASE = fromEnv
  ? normalizeBase(fromEnv)
  : "/dna-api";
