import type { CatalogLocale, Product } from "./types";
export function formatPrice(price: Product["price"], locale: CatalogLocale) {
  return price
    ? new Intl.NumberFormat(locale === "ro" ? "ro-MD" : "ru-MD", {
        style: "currency",
        currency: price.currency,
        currencyDisplay: "code",
      }).format(price.amount)
    : undefined;
}
export interface CatalogFilters {
  query?: string;
  categoryId?: string;
  subcategoryId?: string;
  brand?: string;
  min?: number;
  max?: number;
  currency?: string;
  sort?: "name" | "price-asc" | "price-desc";
}
export function filterProducts(
  products: Product[],
  locale: CatalogLocale,
  filters: CatalogFilters,
) {
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase(locale)
      .trim();
  const searchTerms = normalize(filters.query ?? "").split(/\s+/).filter(Boolean);
  const result = products.filter(
    (p) =>
      (!searchTerms.length || (() => {
        const searchableText = normalize([
          p.name[locale],
          p.brand ?? "",
          p.model ?? "",
          p.shortDescription[locale],
          p.description[locale],
        ].join(" "));
        return searchTerms.every((term) => searchableText.includes(term));
      })()) &&
      (!filters.categoryId || p.categoryId === filters.categoryId) &&
      (!filters.subcategoryId || p.subcategoryId === filters.subcategoryId) &&
      (!filters.brand || p.brand === filters.brand) &&
      (!filters.currency || p.price?.currency === filters.currency) &&
      (filters.min === undefined ||
        (!!p.price && p.price.amount >= filters.min)) &&
      (filters.max === undefined ||
        (!!p.price && p.price.amount <= filters.max)),
  );
  return result.sort((a, b) => {
    if (filters.sort?.startsWith("price")) {
      if (!a.price && b.price) return 1;
      if (a.price && !b.price) return -1;
      if (a.price && b.price && a.price.currency === b.price.currency)
        return (
          (a.price.amount - b.price.amount) *
          (filters.sort === "price-desc" ? -1 : 1)
        );
    }
    return a.name[locale].localeCompare(b.name[locale], locale);
  });
}
