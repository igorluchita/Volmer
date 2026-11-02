import {readFileSync} from 'node:fs';
import {describe, expect, it} from 'vitest';
import sitemap from './app/sitemap';
import {editorialContent, editorialPath, editorialTypeFor, editorialTypes} from './content/editorial-pages';
import {localizedBlogPath} from './content/blog-locales';
import {editorialMetadata} from './lib/editorial-metadata';
import {siteConfig} from './config/site';
import {seoPages, blogPosts} from './content/seo';
import {legalPath, legalTypes} from './content/legal-pages';
import {localizedNavigationHref} from './lib/localized-navigation';

describe('RO/RU editorial pages', () => {
  it('normalizes localized navigation paths and preserves query, fragment, and API paths', () => {
    expect(localizedNavigationHref('ro', '/')).toBe('/ro/');
    expect(localizedNavigationHref('ru', '/#contact')).toBe('/ru/#contact');
    expect(localizedNavigationHref('ru', '/aparate-auditive?source=nav#catalog')).toBe('/ru/aparate-auditive/?source=nav#catalog');
    expect(localizedNavigationHref('ro', '/api/leads')).toBe('/api/leads');
  });

  it('has one unique, nonempty localized page per requested topic', () => {
    expect(editorialTypes).toHaveLength(8);
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

  it('keeps redirect sources and removed price routes out of sitemap', () => {
    const entries = sitemap();
    const urls = new Set(entries.map((entry) => entry.url));
    expect(urls.size).toBe(entries.length);
    expect(entries).toHaveLength(4 + seoPages.ro.length * 2 + 2 + blogPosts.ro.length * 2 + legalTypes.length * 2 + editorialTypes.length * 2);
    for (const entry of entries) {
      const url = new URL(entry.url);
      expect(url.origin).toBe('https://volmer.md');
      expect(url.protocol).toBe('https:');
      expect(url.pathname.endsWith('/')).toBe(true);
      expect(url.search).toBe('');
      expect(url.hash).toBe('');
      expect(entry.lastModified).toBeUndefined();
    }
    for (const entry of entries) {
      for (const target of Object.values(entry.alternates?.languages ?? {})) {
        expect(target && urls.has(target)).toBe(true);
      }
    }
    const redirectSources = [
      '/ro/test-auditiv/',
      '/ru/test-auditiv/',
      '/ro/test-auz-chisinau/',
      '/ru/test-auz-chisinau/',
      '/ru/proverka-sluha-kishinev/',
      '/ru/sluhovye-apparaty-moldova/',
      '/ru/sluhovye-apparaty-kishinev/',
      '/ro/programare/',
      '/ru/programare/',
      '/ru/besplatnaya-proverka-sluha/',
      '/ru/dlya-semi-za-granitsey/',
      '/ru/sluh-i-dementsiya/',
      '/ru/o-nas/',
      '/ru/chastye-voprosy/',
      '/ru/kontakty/',
      '/ru/politika-konfidentsialnosti/',
      '/ru/cookie/',
      '/ru/pravila-i-usloviya/',
      '/ru/blog/priznaki-snizheniya-sluha/',
      '/ru/blog/slyshu-golos-ne-razbirayu-slova/',
      '/ru/blog/rech-v-shume/',
      '/ru/blog/kogda-proveryat-sluh/',
      '/ru/blog/kak-prohodit-proverka-sluha/',
      '/ru/blog/kak-vybrat-sluhovoy-apparat/',
      '/ru/blog/ric-bte-vnutriushnye/',
      '/ru/blog/perezaryazhaemye-apparaty/',
      '/ru/blog/bluetooth-v-sluhovyh-apparatah/',
      '/ru/blog/uhod-za-apparatom/',
      '/ru/blog/vazhnost-nastroyki/',
      '/ru/blog/pomoshch-blizkomu-so-sluhom/',
      '/ru/blog/kak-prohodit-proverka-sluha/',
      '/ro/blog/unitron-tehnologii-moderne/',
      '/ro/blog/cum-functioneaza-aparat-auditiv/',
      '/ro/blog/conectare-aparat-auditiv-telefon/',
      '/ro/blog/prima-consultatie-auz/',
      '/ro/servicii/',
      '/ru/servicii/',
    ];
    for (const path of redirectSources) expect(urls.has(`${siteConfig.siteUrl}${path}`)).toBe(false);

    for (const path of [
      '/ru/',
      '/ro/',
      '/ru/aparate-auditive/',
      '/ru/aparate-auditive-chisinau/',
      '/ru/aparate-auditive-moldova/',
      '/ro/aparate-auditive-moldova/',
      '/ro/aparate-auditive-chisinau/',
      '/ro/test-auditiv-gratuit/',
      '/ru/blog/semne-auz-slab/',
      '/ru/blog/cum-se-desfasoara-test-auditiv/',
      '/ro/aparate-auditive/',
    ]) expect(urls.has(`${siteConfig.siteUrl}${path}`)).toBe(true);
    expect(urls.has(`${siteConfig.siteUrl}/ro/preturi/`)).toBe(false);
    expect(urls.has(`${siteConfig.siteUrl}/ru/preturi/`)).toBe(false);
    for (const path of [
      '/ro/multumim/',
      '/ru/multumim/',
      '/robots.txt',
      '/manifest.webmanifest',
      '/api/leads',
      '/api/appointments',
      '/api/appointments/availability',
    ]) expect(urls.has(`${siteConfig.siteUrl}${path}`)).toBe(false);
    for (const path of [
      '/ru/aparate-auditive-moldova/',
      '/ru/aparate-auditive-chisinau/',
      '/ro/test-auditiv-gratuit/',
      '/ru/test-auditiv-gratuit/',
      '/ru/blog/semne-auz-slab/',
    ]) expect(urls.has(`${siteConfig.siteUrl}${path}`)).toBe(true);
    expect(editorialTypeFor('ro', 'preturi')).toBeNull();
    expect(editorialTypeFor('ru', 'preturi')).toBeNull();
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

  it('redirects old blog URLs to existing matching content', () => {
    const config = readFileSync('next.config.ts', 'utf8');
    expect(config).toContain("{source: '/ro/blog/unitron-tehnologii-moderne/', destination: '/ro/aparate-auditive/', permanent: true}");
  });

  it('uses the confirmed business phone for configured messaging channels', () => {
    expect(siteConfig.quickContact.whatsapp).toBe('https://wa.me/37379331839');
    expect(siteConfig.quickContact.viber).toBe('viber://chat?number=%2B37379331839');
    expect(siteConfig.quickContact.telegram).toBe('https://t.me/+37379331839');
  });
});
