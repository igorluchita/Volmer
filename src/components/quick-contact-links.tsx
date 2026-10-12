'use client';

import {useTranslations} from 'next-intl';
import {useState} from 'react';
import {MessageCircle, Phone, Send} from 'lucide-react';
import {siteConfig} from '@/config/site';
import {configuredContactChannels} from '@/config/contact-links';

type Channel = {key: 'whatsapp' | 'viber' | 'telegram'; label: string; href: string; Icon: typeof MessageCircle};

export function QuickContactLinks({variant = 'floating'}: {variant?: 'floating' | 'inline'}) {
  const t = useTranslations('QuickContact');
  const [isOpen, setIsOpen] = useState(false);
  const channels = configuredContactChannels([
    {key: 'whatsapp', label: 'WhatsApp', href: siteConfig.quickContact.whatsapp, Icon: MessageCircle},
    {key: 'viber', label: 'Viber', href: siteConfig.quickContact.viber, Icon: Phone},
    {key: 'telegram', label: 'Telegram', href: siteConfig.quickContact.telegram, Icon: Send}
  ] satisfies Channel[]);

  return <div className={`quick-contact-wrap quick-contact-wrap-${variant}`}>
    {variant === 'floating' && <button className="quick-contact-toggle" type="button" aria-label={isOpen ? t('closeChannels') : t('openChannels')} aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>
      <MessageCircle size={23} aria-hidden="true" />
      <span>{t('toggleLabel')}</span>
      <span className="quick-contact-toggle-indicator" aria-hidden="true">{isOpen ? '−' : '+'}</span>
    </button>}
    <nav className={`quick-contact quick-contact-${variant}${variant === 'floating' ? ` is-${isOpen ? 'open' : 'closed'}` : ''}`} aria-label={t('navigationLabel')} aria-hidden={variant === 'floating' ? !isOpen : undefined}>
      {channels.map(({key, label, href, Icon}, index) => <a key={key} className={`quick-contact-link quick-contact-${key}`} href={href} target="_blank" rel="noopener noreferrer" data-contact-channel={key} aria-label={label} tabIndex={variant === 'floating' && !isOpen ? -1 : undefined} style={{'--contact-index': index} as React.CSSProperties}>
        <Icon size={18} aria-hidden="true" /><span>{label}</span>
      </a>)}
    </nav>
  </div>;
}
