// Small in-memory limiter to slow down password guessing (per IP + route).
export function rateLimit({ windowMs = 15 * 60 * 1000, max = 20 } = {}) {
  const hits = new Map();
  return (request, _response, next) => {
    const now = Date.now();
    const key = `${request.ip}:${request.path}`;
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
    } else if (++entry.count > max) {
      return next(Object.assign(new Error('Too many attempts. Please wait a few minutes and try again.'), { statusCode: 429 }));
    }
    if (hits.size > 5000) for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    next();
  };
}
