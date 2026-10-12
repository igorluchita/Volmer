'use client';

import {useTranslations} from 'next-intl';
import {useConsent} from './ConsentProvider';

export function CookieSettingsButton() {
  const t = useTranslations('Footer');
  const {openSettings} = useConsent();
  return <button type="button" onClick={openSettings}>{t('cookieSettings')}</button>;
}
