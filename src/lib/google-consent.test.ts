import {afterEach, describe, expect, it, vi} from 'vitest';
import {createConsent, parseConsent} from './consent';
import {createGoogleTagManagerBootstrap, DEFAULT_GOOGLE_CONSENT, googleConsentFor, GTM_CONTAINER_ID, trackMessengerClick, updateGoogleConsent} from './google-consent';

afterEach(() => vi.unstubAllGlobals());

describe('Google Tag Manager consent integration', () => {
  it('sets every optional Google storage to denied before loading GTM', () => {
    const bootstrap = createGoogleTagManagerBootstrap();
    expect(bootstrap).toContain("window.gtag('consent', 'default'");
    expect(bootstrap).toContain("analytics_storage: 'denied'");
    expect(bootstrap).toContain("ad_storage: 'denied'");
    expect(bootstrap).toContain("ad_user_data: 'denied'");
    expect(bootstrap).toContain("ad_personalization: 'denied'");
    expect(bootstrap).toContain("window.gtag('set', 'ads_data_redaction', true)");
    expect(bootstrap).toContain("window.gtag('set', 'url_passthrough', true)");
    expect(bootstrap.indexOf("window.gtag('consent', 'default'")).toBeLessThan(bootstrap.indexOf('googletagmanager.com/gtm.js'));
    expect(bootstrap).toContain("window.localStorage.getItem('volmer-consent')");
    expect(bootstrap.indexOf("window.gtag('consent', 'update'")).toBeLessThan(bootstrap.indexOf('googletagmanager.com/gtm.js'));
    expect(DEFAULT_GOOGLE_CONSENT.analytics_storage).toBe('denied');
  });

  it('maps analytics consent update independently', () => {
    expect(googleConsentFor(createConsent(true, false))).toEqual({
      analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
    });
  });

  it('maps marketing consent update to all advertising storages', () => {
    expect(googleConsentFor(createConsent(false, true))).toEqual({
      analytics_storage: 'denied', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted'
    });
  });

  it('sends consent updates through gtag without reloading the page', () => {
    const gtag = vi.fn();
    vi.stubGlobal('window', {gtag});
    updateGoogleConsent(googleConsentFor(createConsent(true, false)));
    expect(gtag).toHaveBeenCalledWith('consent', 'update', {
      analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
    });
  });

  it.each(['whatsapp', 'viber', 'telegram'] as const)('queues one messenger_click event for %s', (messenger) => {
    const dataLayer: unknown[] = [];
    vi.stubGlobal('window', {dataLayer});
    trackMessengerClick(messenger);
    expect(dataLayer).toEqual([{event: 'messenger_click', messenger}]);
  });

  it('keeps reject optional and accept all behavior', () => {
    expect(googleConsentFor(createConsent(false, false))).toEqual(DEFAULT_GOOGLE_CONSENT);
    expect(googleConsentFor(createConsent(true, true))).toEqual({
      analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted'
    });
  });

  it.each([
    ['accept all', createConsent(true, true), {analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted'}],
    ['reject optional', createConsent(false, false), {analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'}],
    ['custom: analytics only', createConsent(true, false), {analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'}],
    ['custom: marketing only', createConsent(false, true), {analytics_storage: 'denied', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted'}]
  ])('produces exact Consent Mode values for %s', (_scenario, consent, expected) => {
    expect(googleConsentFor(consent)).toEqual(expected);
  });

  it('keeps current persisted consent records compatible', () => {
    const stored = createConsent(true, false, new Date('2026-01-01T00:00:00Z'));
    expect(parseConsent(JSON.stringify(stored))).toEqual(stored);
    expect(googleConsentFor(parseConsent(JSON.stringify(stored))).analytics_storage).toBe('granted');
  });

  it('uses one GTM container and one script loader', () => {
    const bootstrap = createGoogleTagManagerBootstrap();
    expect(GTM_CONTAINER_ID).toBe('GTM-WTWSLTSZ');
    expect(bootstrap.match(/googletagmanager\.com\/gtm\.js/g)).toHaveLength(1);
    expect(bootstrap.match(/GTM-WTWSLTSZ/g)).toHaveLength(1);
  });

  it.each([
    ['no saved choice', null, [{analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'}]],
    ['accept all', JSON.stringify(createConsent(true, true)), [
      {analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'},
      {analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted'}
    ]],
    ['reject optional', JSON.stringify(createConsent(false, false)), [
      {analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'},
      {analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'}
    ]],
    ['customize analytics only', JSON.stringify(createConsent(true, false)), [
      {analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'},
      {analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'}
    ]],
    ['customize marketing only', JSON.stringify(createConsent(false, true)), [
      {analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'},
      {analytics_storage: 'denied', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted'}
    ]]
  ])('queues exact denied/default and persisted consent for %s before GTM', (_scenario, persisted, expectedStates) => {
    const firstScript = {parentNode: {insertBefore: vi.fn()}};
    const windowMock = {
      dataLayer: [] as unknown[],
      localStorage: {getItem: vi.fn(() => persisted)},
      gtag: undefined as ((...args: unknown[]) => void) | undefined
    };
    const documentMock = {
      getElementsByTagName: () => [firstScript],
      createElement: () => ({})
    };
    new Function('window', 'document', createGoogleTagManagerBootstrap())(windowMock, documentMock);
    const consentUpdates = windowMock.dataLayer
      .filter((entry): entry is IArguments => typeof entry === 'object' && entry !== null && 'callee' in entry)
      .filter((entry) => entry[0] === 'consent')
      .map((entry) => entry[2] as Record<string, string>);
    expect(consentUpdates.map(({analytics_storage, ad_storage, ad_user_data, ad_personalization}) => ({analytics_storage, ad_storage, ad_user_data, ad_personalization}))).toEqual(expectedStates);
    expect(windowMock.dataLayer.findIndex((entry) => typeof entry === 'object' && entry !== null && 'event' in entry && (entry as {event: string}).event === 'gtm.js')).toBeGreaterThan(windowMock.dataLayer.findIndex((entry) => typeof entry === 'object' && entry !== null && 'callee' in entry && (entry as IArguments)[0] === 'consent'));
  });
});
