type Counter = { count: number; expiresAt: number };
const counters = new Map<string, Counter>();
const MAX_COUNTERS = 10_000;

export function takeRateLimit(key: string, limit: number, windowMs: number, now = Date.now()): boolean {
  for (const [entryKey, value] of counters) {
    if (value.expiresAt <= now) counters.delete(entryKey);
  }
  const current = counters.get(key);
  if (!current || current.expiresAt <= now) {
    if (counters.size >= MAX_COUNTERS) {
      const oldestKey = counters.keys().next().value;
      if (oldestKey !== undefined) counters.delete(oldestKey);
    }
    counters.set(key, { count: 1, expiresAt: now + windowMs });
    return true;
  }
  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}

export function clearRateLimitForTests(): void {
  counters.clear();
}
