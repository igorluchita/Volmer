import {getLocale, getTranslations} from 'next-intl/server';
import {siteConfig} from '@/config/site';
import {Clock} from 'lucide-react';
import {BrandLogo} from './brand-logo';
import {BusinessHours} from './business-hours';

export async function Footer() {
  const t = await getTranslations('Footer');
  await getLocale();
  const hours = await getTranslations('BusinessHours');
  return <footer><div className="container footer-grid"><div><BrandLogo footer/><p>{t('note')}</p></div><address>{siteConfig.address}, {siteConfig.city}<br/><a href={`tel:${siteConfig.phoneInternational}`}>{siteConfig.phoneDisplay}</a><br/><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></address><section className="footer-hours"><h2><Clock size={17}/>{hours('title')}</h2><BusinessHours/></section></div><div className="container legal">© {new Date().getFullYear()} {siteConfig.brandName}</div></footer>;
}
