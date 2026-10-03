/**
 * Sliding-window rate limit per client IP, kept in memory.
 *
 * Best-effort by design: on serverless each warm instance has its own window,
 * so the real ceiling is a multiple of this. It still stops one visitor (or a
 * script) from running up the OpenAI bill from a single tab. Move to a shared
 * store (Upstash Redis, Vercel KV) if the chatbot ever needs a hard limit.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;

const hits = new Map<string, number[]>();

export function rateLimit(key: string): { ok: true } | { ok: false; retryAfterMinutes: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return { ok: false, retryAfterMinutes: Math.max(1, Math.ceil((WINDOW_MS - (now - recent[0])) / 60000)) };
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long-lived server.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(k);
    }
  }
  return { ok: true };
}
