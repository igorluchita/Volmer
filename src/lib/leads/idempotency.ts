const activeKeys = new Map<string, number>();
const KEY_TTL_MS = 10 * 60_000;
const MAX_KEYS = 10_000;

export function claimLeadSubmission(key: string, now = Date.now()): boolean {
  for (const [storedKey, expiresAt] of activeKeys) {
    if (expiresAt <= now) activeKeys.delete(storedKey);
  }
  if (activeKeys.has(key)) return false;
  if (activeKeys.size >= MAX_KEYS) {
    const oldestKey = activeKeys.keys().next().value;
    if (oldestKey) activeKeys.delete(oldestKey);
  }
  activeKeys.set(key, now + KEY_TTL_MS);
  return true;
}

export function releaseLeadSubmission(key: string): void {
  activeKeys.delete(key);
}

export function clearLeadSubmissionsForTests(): void {
  activeKeys.clear();
}
