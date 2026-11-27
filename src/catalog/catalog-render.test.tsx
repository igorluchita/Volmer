import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import type { CatalogData } from "./types";
vi.mock("@/catalog/repository", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./repository")>();
  const t = (v: string) => ({ ro: v, ru: `RU ${v}` });
  const data: CatalogData = {
    categories: [
      {
        id: "fixture",
        slug: "fixture",
        name: t("Fixture category"),
        description: t("Category description"),
        published: true,
      },
    ],
    subcategories: [],
    products: [
      {
        id: "fixture-product",
        slug: "fixture-product",
        categoryId: "fixture",
        name: t("Fixture product"),
        shortDescription: t("Short description"),
        description: t("Description"),
        images: [],
        specifications: [{ label: t("Test label"), value: t("Test value") }],
        features: [t("Test feature")],
        published: true,
        commercialVerified: true,
        price: { amount: 123, currency: "MDL" },
      },
    ],
  };
  return { ...actual, catalog: actual.createCatalogRepository(data) };
});
import { catalog } from "./repository";
import { CatalogPage } from "@/components/catalog/catalog-page";
import { catalogMetadata, catalogSitemapEntries, jsonLd } from "./seo";
function schemas(html: string) {
  return [
    ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g),
  ].map((match) => JSON.parse(match[1]));
}
describe("catalog templates using test-only data", () => {
  it("renders one H1, actual category links and ItemList", () => {
    const html = renderToStaticMarkup(<CatalogPage locale="ro" />);
    expect(html.match(/<h1>/g)).toHaveLength(1);
    expect(html).toContain("/ro/catalog/fixture/fixture-product/");
    expect(schemas(html).some((s) => s["@type"] === "ItemList")).toBe(true);
  });
  it("renders category template and reciprocal metadata", () => {
    const html = renderToStaticMarkup(
      <CatalogPage locale="ru" category={catalog.categories[0]} />,
    );
    expect(html).toContain("RU Fixture category");
    expect(catalogMetadata("ru", "fixture").alternates?.canonical).toBe(
      "/ru/catalog/fixture/",
    );
    expect(catalogSitemapEntries()).toHaveLength(6);
  });
  it("renders verified Product/Offer with confirmed purchase terms", () => {
    const html = renderToStaticMarkup(
      <CatalogPage
        locale="ro"
        category={catalog.categories[0]}
        product={catalog.products[0]}
      />,
    );
    const product = schemas(html).find((s) => s["@type"] === "Product");
    expect(product.offers.price).toBe(123);
    expect(product.offers.availability).toBe("https://schema.org/InStock");
    expect(product.offers.availableDeliveryMethod).toBe(
      "https://schema.org/OnSitePickup",
    );
    expect(product.offers.hasMerchantReturnPolicy).toMatchObject({
      applicableCountry: "MD",
      merchantReturnDays: 15,
    });
    expect(html).toContain("Disponibil · Preluare din magazin · Retur în 15 zile");
    expect(html).toContain("Imagine indisponibilă");
    expect(html).toContain("Specificații tehnice");
    expect(html).toContain("Test value");
  });
  it("omits Product rich-result markup when price is not verified", () => {
    const product = {
      ...catalog.products[0],
      commercialVerified: false,
      price: undefined,
    };
    const html = renderToStaticMarkup(
      <CatalogPage
        locale="ro"
        category={catalog.categories[0]}
        product={product}
      />,
    );
    const productSchema = schemas(html).find((s) => s["@type"] === "Product");
    expect(productSchema).toBeUndefined();
    expect(html).toContain("Prețul va fi adăugat ulterior");
  });
  it("escapes JSON-LD without changing content after parsing", () => {
    expect(JSON.parse(jsonLd({ name: "</script>" })).name).toBe("</script>");
  });
});
