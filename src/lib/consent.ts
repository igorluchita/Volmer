export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = 'volmer-consent';

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';
export type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  version: number;
  timestamp: string;
};

export function createConsent(analytics = false, marketing = false, now = new Date()): Consent {
  return {necessary: true, analytics, marketing, version: CONSENT_VERSION, timestamp: now.toISOString()};
}

export function parseConsent(raw: string | null): Consent | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object') return null;
    const choice = value as Record<string, unknown>;
    if (choice.version !== CONSENT_VERSION || choice.necessary !== true ||
        typeof choice.analytics !== 'boolean' || typeof choice.marketing !== 'boolean' ||
        typeof choice.timestamp !== 'string' || Number.isNaN(Date.parse(choice.timestamp))) return null;
    return {
      necessary: true,
      analytics: choice.analytics,
      marketing: choice.marketing,
      version: CONSENT_VERSION,
      timestamp: choice.timestamp
    };
  } catch {
    return null;
  }
}

export function hasConsent(choice: Consent | null, category: ConsentCategory): boolean {
  return category === 'necessary' || choice?.[category] === true;
}

export function externalEmbedSrc(choice: Consent | null, src: string): string | null {
  return hasConsent(choice, 'marketing') ? src : null;
}

export function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  try { return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY)); }
  catch { return null; }
}

export function storeConsent(choice: Consent): void {
  if (typeof window === 'undefined') return;
  try { window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(choice)); }
  catch { /* Browsers can deny storage; the in-memory choice still applies. */ }
}
