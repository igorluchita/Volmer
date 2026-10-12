import {afterEach, describe, expect, it, vi} from 'vitest';
import {CONSENT_STORAGE_KEY, CONSENT_VERSION, createConsent, externalEmbedSrc, hasConsent, parseConsent, readConsent, storeConsent} from './consent';

afterEach(() => vi.unstubAllGlobals());

describe('privacy consent', () => {
  it('defaults to necessary only and blocks external content', () => {
    expect(hasConsent(null, 'necessary')).toBe(true);
    expect(hasConsent(null, 'analytics')).toBe(false);
    expect(hasConsent(null, 'marketing')).toBe(false);
    expect(externalEmbedSrc(null, 'https://maps.google.com/embed')).toBeNull();
  });

  it('accepts all and allows external content', () => {
    const choice = createConsent(true, true, new Date('2026-01-01T00:00:00Z'));
    expect(hasConsent(choice, 'analytics')).toBe(true);
    expect(hasConsent(choice, 'marketing')).toBe(true);
    expect(externalEmbedSrc(choice, 'https://maps.google.com/embed')).toBe('https://maps.google.com/embed');
  });

  it('rejects optional categories', () => {
    const choice = createConsent();
    expect(choice.necessary).toBe(true);
    expect(choice.analytics).toBe(false);
    expect(choice.marketing).toBe(false);
  });

  it('keeps custom categories independent and supports changing consent', () => {
    const custom = createConsent(true, false);
    expect(hasConsent(custom, 'analytics')).toBe(true);
    expect(externalEmbedSrc(custom, 'https://maps.google.com/embed')).toBeNull();
    const changed = createConsent(false, true);
    expect(hasConsent(changed, 'analytics')).toBe(false);
    expect(hasConsent(changed, 'marketing')).toBe(true);
  });

  it('persists only the consent record and reads it back', () => {
    const values = new Map<string, string>();
    vi.stubGlobal('window', {localStorage: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value)
    }});
    const choice = createConsent(true, false, new Date('2026-01-01T00:00:00Z'));
    storeConsent(choice);
    expect(values.size).toBe(1);
    expect(values.has(CONSENT_STORAGE_KEY)).toBe(true);
    expect(readConsent()).toEqual(choice);
  });

  it('requests renewed consent after a version change and rejects malformed records', () => {
    const old = {...createConsent(), version: CONSENT_VERSION - 1};
    expect(parseConsent(JSON.stringify(old))).toBeNull();
    expect(parseConsent('{bad json')).toBeNull();
    expect(parseConsent(JSON.stringify({...createConsent(), necessary: false}))).toBeNull();
  });
});
