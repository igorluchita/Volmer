import type { CatalogLocale } from "./types";
export function catalogPath(
  locale: CatalogLocale,
  category?: string,
  product?: string,
) {
  return `/${locale}/catalog/${category ? `${category}/` : ""}${product ? `${product}/` : ""}`;
}
