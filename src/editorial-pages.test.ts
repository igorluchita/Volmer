import {readFileSync} from 'node:fs';
import {describe, expect, it} from 'vitest';
import sitemap from './app/sitemap';
import {editorialContent, editorialPath, editorialTypeFor, editorialTypes} from './content/editorial-pages';
import {localizedBlogPath} from './content/blog-locales';
import {editorialMetadata} from './lib/editorial-metadata';
import {siteConfig} from './config/site';
import {seoPages, blogPosts} from './content/seo';
import {legalPath, legalTypes} from './content/legal-pages';

describe('RO/RU editorial pages', () => {
  it('has one unique, nonempty localized page per requested topic', () => {
    expect(editorialTypes).toHaveLength(9);
    for (const locale of ['ro', 'ru'] as const) {
      const paths = editorialTypes.map((type) => editorialPath(locale, type));
      expect(new Set(paths).size).toBe(paths.length);
      for (const type of editorialTypes) {
        const content = editorialContent(locale, type);
        expect(content.title.length).toBeGreaterThan(15);
        expect(content.description.length).toBeGreaterThan(30);
        expect(content.sections.length || content.faqs?.length || ['test', 'team', 'about'].includes(type)).toBeTruthy();
        expect(editorialTypeFor(locale, editorialPath(locale, type).split('/')[2])).toBe(type);
      }
    }
  });

  it('keeps canonical, reciprocal hreflang and language switch paths aligned', () => {
    for (const type of editorialTypes) {
      const ro = editorialMetadata('ro', type);
      const ru = editorialMetadata('ru', type);
      expect(ro.alternates?.canonical).toBe(editorialPath('ro', type));
      expect(ru.alternates?.canonical).toBe(editorialPath('ru', type));
      expect(ro.alternates?.languages).toEqual(ru.alternates?.languages);
      expect(localizedBlogPath(editorialPath('ro', type).replace('/ro', '').replace(/\/$/, ''), 'ro'))
        .toBe(editorialPath('ru', type).replace('/ru', '').replace(/\/$/, ''));
    }
  });

  it('includes both locales in sitemap and excludes the old hearing-test URL', () => {
    const entries = sitemap();
    const urls = new Set(entries.map((entry) => entry.url));
    for (const type of editorialTypes) {
      const ro = `${siteConfig.siteUrl}${editorialPath('ro', type)}`;
      const ru = `${siteConfig.siteUrl}${editorialPath('ru', type)}`;
      expect(urls.has(ro)).toBe(true);
      expect(urls.has(ru)).toBe(true);
      const entry = entries.find((item) => item.url === ro);
      expect(entry?.alternates?.languages).toEqual({'ro-MD': ro, 'ru-MD': ru, 'x-default': ro});
    }
    expect(urls.has(`${siteConfig.siteUrl}/ro/test-auditiv/`)).toBe(false);
    expect(urls.has(`${siteConfig.siteUrl}/ru/test-auditiv/`)).toBe(false);
  });

  it('uses one shared slug for every RO/RU page pair', () => {
    for (const type of editorialTypes) {
      expect(editorialPath('ro', type).slice(4)).toBe(editorialPath('ru', type).slice(4));
    }
    for (const type of legalTypes) {
      expect(legalPath('ro', type).slice(4)).toBe(legalPath('ru', type).slice(4));
    }
    expect(seoPages.ro.map((page) => page[0])).toEqual(seoPages.ru.map((page) => page[0]));
    expect(blogPosts.ro.map((post) => post.slug)).toEqual(blogPosts.ru.map((post) => post.slug));
    const urls = new Set(sitemap().map((entry) => entry.url));
    for (const url of urls) {
      const match = url.match(/^(https?:\/\/[^/]+)\/(ro|ru)\/(.*)$/);
      if (match) expect(urls.has(`${match[1]}/${match[2] === 'ro' ? 'ru' : 'ro'}/${match[3]}`)).toBe(true);
    }
  });

  it('permanently redirects both old hearing-test URLs', () => {
    const config = readFileSync('next.config.ts', 'utf8');
    expect(config).toContain("{source: '/ro/test-auditiv/', destination: '/ro/test-auditiv-gratuit/', permanent: true}");
    expect(config).toContain("{source: '/ru/test-auditiv/', destination: '/ru/test-auditiv-gratuit/', permanent: true}");
  });

  it('uses the confirmed business phone for configured messaging channels', () => {
    expect(siteConfig.quickContact.whatsapp).toBe('https://wa.me/37379331839');
    expect(siteConfig.quickContact.viber).toBe('viber://chat?number=%2B37379331839');
    expect(siteConfig.quickContact.telegram).toBe('https://t.me/+37379331839');
  });
});
