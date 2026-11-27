import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { catalog, catalogPath } from "./repository";
import { catalogMessages } from "./messages";
import type { CatalogLocale, Category, Product } from "./types";
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
      ? `${record.name[locale]} – ${locale === "ro" ? "Moldova" : "Молдова"} | Volmer`
      : catalogMessages[locale].seoTitle);
  const description =
    record?.seo?.description[locale] ??
    product?.shortDescription[locale] ??
    category?.description[locale] ??
    catalogMessages[locale].seoDescription;
  const path = catalogPath(locale, categorySlug, productSlug);
  return {
    metadataBase: new URL(catalogOrigin),
    title,
    description,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
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
      siteName: siteConfig.brandName,
      locale: locale === "ro" ? "ro_MD" : "ru_MD",
      alternateLocale: [locale === "ro" ? "ru_MD" : "ro_MD"],
      images: product?.images.length
        ? product.images.map((i) => ({
            url: i.src,
            alt: i.alt[locale],
            width: i.width,
            height: i.height,
          }))
        : category?.image
          ? [
              {
                url: category.image.src,
                alt: category.image.alt[locale],
                width: category.image.width,
                height: category.image.height,
              },
            ]
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

// Only verified, publicly displayed prices qualify for our Product/Offer markup.
// Quote-only pages remain indexable WebPages without an incomplete rich result.
export function catalogProductSchema(
  locale: CatalogLocale,
  category: Category,
  product: Product,
) {
  if (!product.commercialVerified || !product.price) return null;
  const url = `${catalogOrigin}${catalogPath(locale, category.slug, product.slug)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name[locale],
    description: product.shortDescription[locale],
    url,
    category: category.name[locale],
    ...(product.brand
      ? { brand: { "@type": "Brand", name: product.brand } }
      : {}),
    ...(product.model ? { model: product.model } : {}),
    ...(product.images.length
      ? { image: product.images.map((i) => `${catalogOrigin}${i.src}`) }
      : {}),
    offers: {
      "@type": "Offer",
      url,
      price: product.price.amount,
      priceCurrency: product.price.currency,
      availability: "https://schema.org/InStock",
      availableDeliveryMethod: "https://schema.org/OnSitePickup",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "MD",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 15,
      },
      seller: {
        "@type": "Organization",
        name: siteConfig.brandName,
        url: catalogOrigin,
        telephone: siteConfig.phoneInternational,
      },
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
