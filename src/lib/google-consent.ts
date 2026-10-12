import {CONSENT_STORAGE_KEY, CONSENT_VERSION, type Consent} from './consent';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GTM_CONTAINER_ID = 'GTM-WTWSLTSZ';

export type GoogleConsentState = {
  analytics_storage: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
};

export const DEFAULT_GOOGLE_CONSENT: GoogleConsentState = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
};

export function googleConsentFor(choice: Consent | null): GoogleConsentState {
  return {
    analytics_storage: choice?.analytics ? 'granted' : 'denied',
    ad_storage: choice?.marketing ? 'granted' : 'denied',
    ad_user_data: choice?.marketing ? 'granted' : 'denied',
    ad_personalization: choice?.marketing ? 'granted' : 'denied'
  };
}

export function createGoogleTagManagerBootstrap(containerId = GTM_CONTAINER_ID): string {
  return `
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500
    });
    window.gtag('set', 'ads_data_redaction', true);
    window.gtag('set', 'url_passthrough', true);
    try {
      var saved = JSON.parse(window.localStorage.getItem('${CONSENT_STORAGE_KEY}') || 'null');
      if (saved && saved.version === ${CONSENT_VERSION} && saved.necessary === true &&
          typeof saved.analytics === 'boolean' && typeof saved.marketing === 'boolean' &&
          typeof saved.timestamp === 'string' && !Number.isNaN(Date.parse(saved.timestamp))) {
        window.gtag('consent', 'update', {
          analytics_storage: saved.analytics ? 'granted' : 'denied',
          ad_storage: saved.marketing ? 'granted' : 'denied',
          ad_user_data: saved.marketing ? 'granted' : 'denied',
          ad_personalization: saved.marketing ? 'granted' : 'denied'
        });
      }
    } catch (_) {}
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${containerId}');
  `;
}

export function updateGoogleConsent(state: GoogleConsentState): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', state);
}
