import {describe, expect, it} from 'vitest';
import sitemap from '../../app/sitemap';
import {leadThankYouMetadata} from './thank-you';

describe('lead thank-you SEO', () => {
  it('sets noindex, follow and locale-specific canonical metadata', () => {
    expect(leadThankYouMetadata('ro')).toMatchObject({robots: {index: false, follow: true}, alternates: {canonical: '/ro/multumim/'}});
    expect(leadThankYouMetadata('ru')).toMatchObject({robots: {index: false, follow: true}, alternates: {canonical: '/ru/multumim/'}});
  });

  it('keeps both thank-you pages out of sitemap', () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.endsWith('/ro/multumim/'))).toBe(false);
    expect(urls.some((url) => url.endsWith('/ru/multumim/'))).toBe(false);
  });
});
