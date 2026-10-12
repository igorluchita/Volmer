import type {Metadata} from 'next';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Breadcrumbs} from '@/components/breadcrumbs';
import {siteConfig} from '@/config/site';
import {legalPath, type LegalLocale, type LegalType} from '@/content/legal-pages';

export async function legalMetadata(locale: LegalLocale, type: LegalType): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Legal'});
  const path = legalPath(locale, type);
  const title = t(`${type}.title`);
  const description = t(`${type}.description`);
  return {
    title, description,
    alternates: {canonical: path, languages: {'ro-MD': legalPath('ro', type), 'ru-MD': legalPath('ru', type), 'x-default': legalPath('ro', type)}},
    openGraph: {title, description, url: path, type: 'website', locale: locale === 'ro' ? 'ro_MD' : 'ru_MD', alternateLocale: locale === 'ro' ? ['ru_MD'] : ['ro_MD'], images: [{url: siteConfig.logoPath, alt: 'Volmer'}]},
    twitter: {card: 'summary', title, description, images: [siteConfig.logoPath]}
  };
}

export async function LegalPage({locale, type}: {locale: LegalLocale; type: LegalType}) {
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'Legal'});
  const path = legalPath(locale, type).split('/')[2];
  const sections = t.raw(`${type}.sections`) as {title: string; text: string}[];
  return <>
    <Breadcrumbs locale={locale} label={t(`${type}.title`)} path={path} />
    <article className="legal-page container">
      <p className="legal-eyebrow">VOLMER</p>
      <h1>{t(`${type}.title`)}</h1>
      <p className="legal-intro">{t(`${type}.description`)}</p>
      <p className="legal-review-note">{t('reviewNote')}</p>
      {sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}
      <section><h2>{t('contactTitle')}</h2><p>{siteConfig.brandName}, {siteConfig.address}, {siteConfig.city}. <a href={`tel:${siteConfig.phoneInternational}`}>{siteConfig.phoneDisplay}</a> · <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p></section>
    </article>
  </>;
}
