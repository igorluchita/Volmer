import {describe, expect, it} from 'vitest';
import {existsSync, readFileSync} from 'node:fs';
import {siteConfig} from './config/site';

describe('site static Volmer', () => {
  it('centralizează datele pentru apel și email', () => {
    expect(siteConfig.phoneInternational).toMatch(/^\+\d+$/);
    expect(`tel:${siteConfig.phoneInternational}`).toMatch(/^tel:\+/);
    expect(`mailto:${siteConfig.email}`).toContain('@');
  });

  it('nu mai conține rute API sau formulare de programare', () => {
    expect(existsSync('src/app/api')).toBe(false);
    expect(existsSync('src/components/booking-form.tsx')).toBe(false);
    expect(existsSync('src/lib/google-calendar')).toBe(false);
  });

  it('păstrează apelul centralizat în paginile publice', () => {
    for (const path of ['src/components/header.tsx','src/components/footer.tsx','src/components/home/HomeHero.tsx','src/components/info-page.tsx']) {
      expect(readFileSync(path,'utf8')).toContain('siteConfig.phoneInternational');
    }
  });
});
