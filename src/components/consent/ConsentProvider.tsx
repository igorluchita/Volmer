'use client';

import {createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode} from 'react';
import {useTranslations} from 'next-intl';
import {CONSENT_STORAGE_KEY, createConsent, hasConsent, parseConsent, readConsent, storeConsent, type Consent, type ConsentCategory} from '@/lib/consent';
import {googleConsentFor, updateGoogleConsent} from '@/lib/google-consent';

type ConsentContextValue = {
  consent: Consent | null;
  has: (category: ConsentCategory) => boolean;
  save: (analytics: boolean, marketing: boolean) => void;
  openSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) throw new Error('ConsentProvider is missing');
  return context;
}

export function ConsentProvider({children}: {children: ReactNode}) {
  const t = useTranslations('Consent');
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<Consent | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => { setConsent(readConsent()); setReady(true); });
    const onStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_STORAGE_KEY || event.key === null) {
        const next = parseConsent(event.newValue);
        setConsent(next);
        updateGoogleConsent(googleConsentFor(next));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('storage', onStorage); };
  }, []);

  const save = useCallback((allowAnalytics: boolean, allowMarketing: boolean) => {
    const next = createConsent(allowAnalytics, allowMarketing);
    storeConsent(next);
    updateGoogleConsent(googleConsentFor(next));
    setConsent(next);
    setSettingsOpen(false);
    if (settingsOpen) requestAnimationFrame(() => {
      const target = returnFocusRef.current?.isConnected ? returnFocusRef.current : document.querySelector<HTMLElement>('#content');
      target?.focus();
    });
  }, [settingsOpen]);

  const openSettings = useCallback(() => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setAnalytics(consent?.analytics ?? false);
    setMarketing(consent?.marketing ?? false);
    setSettingsOpen(true);
  }, [consent]);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
    requestAnimationFrame(() => {
      const target = returnFocusRef.current?.isConnected ? returnFocusRef.current : document.querySelector<HTMLElement>('[data-consent-customize]');
      target?.focus();
    });
  }, []);

  useEffect(() => {
    if (!settingsOpen) return;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>('button, input')?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closeSettings(); return; }
      if (event.key !== 'Tab' || !dialog) return;
      const focusable = [...dialog.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), a[href]')];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [settingsOpen, closeSettings]);

  return <ConsentContext.Provider value={{consent, has: (category) => hasConsent(consent, category), save, openSettings}}>
    {children}
    {ready && !consent && !settingsOpen && <aside className="consent-banner" aria-labelledby="consent-title">
      <div><h2 id="consent-title">{t('title')}</h2><p>{t('intro')}</p></div>
      <div className="consent-actions">
        <button type="button" onClick={() => save(true, true)}>{t('acceptAll')}</button>
        <button type="button" onClick={() => save(false, false)}>{t('rejectOptional')}</button>
        <button type="button" data-consent-customize onClick={openSettings}>{t('customize')}</button>
      </div>
    </aside>}
    {settingsOpen && <div className="consent-backdrop">
      <div className="consent-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="consent-settings-title" aria-describedby="consent-settings-description">
        <div className="consent-dialog-head"><h2 id="consent-settings-title">{t('settingsTitle')}</h2><button type="button" onClick={closeSettings} aria-label={t('close')}>×</button></div>
        <p id="consent-settings-description">{t('settingsIntro')}</p>
        <label className="consent-choice"><span><strong>{t('necessary')}</strong><small>{t('necessaryDescription')}</small></span><input type="checkbox" checked disabled /></label>
        <label className="consent-choice"><span><strong>{t('analytics')}</strong><small>{t('analyticsDescription')}</small></span><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /></label>
        <label className="consent-choice"><span><strong>{t('marketing')}</strong><small>{t('marketingDescription')}</small></span><input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} /></label>
        <div className="consent-actions"><button type="button" onClick={() => save(analytics, marketing)}>{t('save')}</button><button type="button" onClick={closeSettings}>{t('cancel')}</button></div>
      </div>
    </div>}
  </ConsentContext.Provider>;
}
