import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { catalog, catalogPath } from "./repository";
import { catalogMessages } from "./messages";
import type { CatalogLocale } from "./types";
export const catalogOrigin = siteConfig.siteUrl.replace(/\/$/, "");
export function catalogMetadata(
  locale: CatalogLocale,
  categorySlug?: string,
  productSlug?: string,
): Metadata {
  const category = categorySlug ? catalog.category(categorySlug) : undefined;
  const product =
    categorySlug && productSlug
      ? catalog.product(categorySlug, productSlug)
      : undefined;
  const record = product ?? category;
  const title =
    record?.seo?.title[locale] ??
    (record
      ? `${record.name[locale]} | Volmer`
      : catalogMessages[locale].seoTitle);
  const description =
    record?.seo?.description[locale] ??
    product?.shortDescription[locale] ??
    category?.description[locale] ??
    catalogMessages[locale].seoDescription;
  const path = catalogPath(locale, categorySlug, productSlug);
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        "ro-MD": catalogPath("ro", categorySlug, productSlug),
        "ru-MD": catalogPath("ru", categorySlug, productSlug),
        "x-default": catalogPath("ro", categorySlug, productSlug),
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      locale: locale === "ro" ? "ro_MD" : "ru_MD",
      alternateLocale: [locale === "ro" ? "ru_MD" : "ro_MD"],
      images: product?.images.length
        ? product.images.map((i) => ({ url: i.src, alt: i.alt[locale] }))
        : category?.image
          ? [{ url: category.image.src, alt: category.image.alt[locale] }]
          : [{ url: siteConfig.logoPath, alt: "Volmer" }],
    },
    twitter: {
      card: product || category ? "summary_large_image" : "summary",
      title,
      description,
      images: product?.images.length
        ? product.images.map((i) => i.src)
        : category?.image
          ? [category.image.src]
          : [siteConfig.logoPath],
    },
  };
}
export function catalogSitemapEntries() {
  const paths = [
    [],
    ...catalog.categories.map((c) => [c.slug]),
    ...catalog.products.map((p) => [
      catalog.categories.find((c) => c.id === p.categoryId)!.slug,
      p.slug,
    ]),
  ];
  return paths.flatMap(([category, product]) => {
    const ro = `${catalogOrigin}${catalogPath("ro", category, product)}`,
      ru = `${catalogOrigin}${catalogPath("ru", category, product)}`;
    const alternates = {
      languages: { "ro-MD": ro, "ru-MD": ru, "x-default": ro },
    };
    return [
      { url: ro, alternates },
      { url: ru, alternates },
    ];
  });
}
export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
