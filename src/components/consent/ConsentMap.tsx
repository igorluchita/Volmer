'use client';

import {useTranslations} from 'next-intl';
import {useConsent} from './ConsentProvider';
import {externalEmbedSrc} from '@/lib/consent';

export function ConsentMap({src, className = 'hp-contact-map', title}: {src: string; className?: string; title?: string}) {
  const t = useTranslations('Consent');
  const {consent, save} = useConsent();
  const embedSrc = externalEmbedSrc(consent, src);
  if (embedSrc) return <iframe className={className} src={embedSrc} title={title ?? t('mapTitle')} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />;
  return <div className={`${className} consent-map-placeholder`}>
    <p>{t('mapBlocked')}</p>
    <button type="button" onClick={() => save(consent?.analytics ?? false, true)}>{t('allowMap')}</button>
  </div>;
}
