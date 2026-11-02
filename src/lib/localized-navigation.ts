import type {Locale} from '@/content/seo';

/** Build a canonical, locale-prefixed href for an internal page navigation item. */
export function localizedNavigationHref(locale: Locale, href: string): string {
  if (!href.startsWith('/') || href.startsWith('//')) {
    throw new Error(`Expected an internal navigation path: ${href}`);
  }

  const hashIndex = href.indexOf('#');
  const beforeHash = hashIndex < 0 ? href : href.slice(0, hashIndex);
  const hash = hashIndex < 0 ? '' : href.slice(hashIndex);
  const queryIndex = beforeHash.indexOf('?');
  const pathname = queryIndex < 0 ? beforeHash : beforeHash.slice(0, queryIndex);
  const query = queryIndex < 0 ? '' : beforeHash.slice(queryIndex);

  if (pathname === '/api' || pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    return href;
  }

  const canonicalPath = pathname === '/' || pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `/${locale}${canonicalPath}${query}${hash}`;
}
