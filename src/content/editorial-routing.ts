export const editorialTypes = ['test', 'diaspora', 'flex', 'dementia', 'cnam', 'about', 'team', 'faq', 'contact'] as const;
export type EditorialType = typeof editorialTypes[number];
export type EditorialLocale = 'ro' | 'ru';

const slugs: Record<EditorialType, Record<EditorialLocale, string>> = {
  test: {ro: 'test-auditiv-gratuit', ru: 'test-auditiv-gratuit'},
  diaspora: {ro: 'pentru-familia-de-peste-hotare', ru: 'pentru-familia-de-peste-hotare'},
  flex: {ro: 'flex-trial', ru: 'flex-trial'},
  dementia: {ro: 'auzul-si-dementa', ru: 'auzul-si-dementa'},
  cnam: {ro: 'cnam', ru: 'cnam'},
  about: {ro: 'despre-noi', ru: 'despre-noi'},
  team: {ro: 'echipa', ru: 'echipa'},
  faq: {ro: 'intrebari-frecvente', ru: 'intrebari-frecvente'},
  contact: {ro: 'contact', ru: 'contact'}
};

export function editorialPath(locale: EditorialLocale, type: EditorialType): string {
  return `/${locale}/${slugs[type][locale]}/`;
}

export function editorialTypeFor(locale: EditorialLocale, slug: string): EditorialType | null {
  return editorialTypes.find((type) => slugs[type][locale] === slug) ?? null;
}
