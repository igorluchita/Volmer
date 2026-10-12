import type {Metadata} from 'next';
import {siteConfig} from '../config/site';
import {editorialContent, editorialPath, type EditorialLocale, type EditorialType} from '../content/editorial-pages';

export function editorialMetadata(locale: EditorialLocale, type: EditorialType): Metadata {
  const data = editorialContent(locale, type);
  const path = editorialPath(locale, type);
  const title = `${data.title} | Volmer`;
  return {
    title, description: data.description,
    alternates: {canonical: path, languages: {'ro-MD': editorialPath('ro', type), 'ru-MD': editorialPath('ru', type), 'x-default': editorialPath('ro', type)}},
    openGraph: {title, description: data.description, url: path, type: 'website', locale: locale === 'ro' ? 'ro_MD' : 'ru_MD', alternateLocale: locale === 'ro' ? ['ru_MD'] : ['ro_MD'], images: [{url: siteConfig.logoPath, alt: 'Volmer'}]},
    twitter: {card: 'summary', title, description: data.description, images: [siteConfig.logoPath]}
  };
}
