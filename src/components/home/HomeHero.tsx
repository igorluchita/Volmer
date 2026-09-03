import Image from 'next/image';
import {Headphones, MapPin, Phone} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {siteConfig} from '@/config/site';

export async function HomeHero() {
  const t = await getTranslations('HomePage.hero');

  return <section className="home-hero">
    <div className="home-hero-accent" aria-hidden="true"/>
    <div className="home-hero-container">
      <div className="home-hero-copy">
        <p className="home-hero-eyebrow"><Headphones size={16}/>{t('eyebrow')}</p>
        <h1><span>{t('titleLine1')}</span><span>{t('titleLine2')}</span></h1>
        <p className="home-hero-description">{t('description')}</p>
        <div className="home-hero-actions">
          <a className="home-hero-primary" href={`tel:${siteConfig.phoneInternational}`} aria-label={`${t('primaryCta')}: ${siteConfig.phoneDisplay}`}><Phone size={19}/>{t('primaryCta')}</a>
          <Link className="home-hero-secondary" href="/aparate-auditive">{t('secondaryCta')}</Link>
        </div>
        <a className="home-hero-location" href={siteConfig.googleMapsDirectionsUrl} target="_blank" rel="noreferrer" aria-label={t('locationLabel')}><MapPin size={17}/><span>{siteConfig.city}, {siteConfig.address}</span></a>
      </div>
      <div className="home-hero-media">
        <Image src="/images/home/hearing-aid-hero.webp" alt={t('imageAlt')} fill priority sizes="(max-width: 768px) 100vw, 52vw"/>
      </div>
    </div>
  </section>;
}
