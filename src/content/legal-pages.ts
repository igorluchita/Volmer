export const legalTypes = ['privacy', 'cookies', 'terms'] as const;
export type LegalType = typeof legalTypes[number];
export type LegalLocale = 'ro' | 'ru';

const slugs: Record<LegalType, Record<LegalLocale, string>> = {
  privacy: {ro: 'politica-de-confidentialitate', ru: 'politica-de-confidentialitate'},
  cookies: {ro: 'cookie-uri', ru: 'cookie-uri'},
  terms: {ro: 'termeni-si-conditii', ru: 'termeni-si-conditii'}
};

export function legalPath(locale: LegalLocale, type: LegalType): string {
  return `/${locale}/${slugs[type][locale]}/`;
}
