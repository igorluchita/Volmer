import { describe, expect, it } from "vitest";
import {
  catalog,
  createCatalogRepository,
  validateCatalog,
} from "./repository";
import { filterProducts, formatPrice } from "./query";
import { catalogMetadata, catalogProductSchema, catalogSitemapEntries, jsonLd } from "./seo";
import type { CatalogData, LocalizedText, Product } from "./types";
const text = (s: string): LocalizedText => ({ ro: s, ru: `RU ${s}` });
function fixture(): CatalogData {
  const product = (id: string, amount?: number): Product => ({
    id,
    slug: id,
    categoryId: "test-category",
    name: text(id === "a" ? "Știință" : id),
    shortDescription: text("test"),
    description: text("test"),
    images: [],
    specifications: [],
    features: [],
    published: true,
    ...(amount === undefined ? {} : { price: { amount, currency: "MDL" } }),
  });
  return {
    categories: [
      {
        id: "test-category",
        slug: "test-category",
        name: text("test category"),
        description: text("test"),
        published: true,
      },
    ],
    subcategories: [
      {
        id: "test-sub",
        slug: "test-sub",
        categoryId: "test-category",
        name: text("test"),
        description: text("test"),
        published: true,
      },
    ],
    products: [
      { ...product("a", 100), brand: "TEST", subcategoryId: "test-sub" },
      product("b", 200),
      product("c"),
      { ...product("draft", 50), published: false },
    ],
  };
}
describe("catalog publication boundary", () => {
  it("publishes only the current bilingual catalog inventory", () => {
    expect(catalog.categories.length).toBeGreaterThan(0);
    expect(catalog.products.length).toBeGreaterThan(0);
    const entries = catalogSitemapEntries();
    expect(entries).toHaveLength(2 * (1 + catalog.categories.length + catalog.products.length));
    expect(entries.map((e) => e.url)).toContain("https://volmer.md/ro/catalog/");
    expect(entries.map((e) => e.url)).toContain("https://volmer.md/ru/catalog/");
    expect(catalog.category("missing")).toBeUndefined();
    expect(catalog.product("missing", "missing")).toBeUndefined();
  });
  it("excludes drafts and rejects publishing under a draft category", () => {
    const data = fixture();
    expect(createCatalogRepository(data).products).toHaveLength(3);
    data.categories[0].published = false;
    expect(() => validateCatalog(data)).toThrow(/category/);
  });
  it("rejects collisions, orphan relationships, missing translations and invalid prices", () => {
    const duplicate = fixture();
    duplicate.products[1].slug = "a";
    expect(() => validateCatalog(duplicate)).toThrow(/duplicate/);
    const orphan = fixture();
    orphan.products[0].subcategoryId = "absent";
    expect(() => validateCatalog(orphan)).toThrow(/subcategory/);
    const translated = fixture();
    translated.products[0].name.ru = "";
    expect(() => validateCatalog(translated)).toThrow(/RO\/RU/);
    const priced = fixture();
    priced.products[0].price!.amount = NaN;
    expect(() => validateCatalog(priced)).toThrow(/price/);
  });
  it("rejects unsafe assets and document URLs", () => {
    const data = fixture();
    data.products[0].documents = [
      { label: text("test"), href: "javascript:alert(1)" },
    ];
    expect(() => validateCatalog(data)).toThrow(/unsafe/);
  });
});
describe("catalog queries and SEO", () => {
  it("gives every published catalog URL distinct localized metadata and truthful offers", () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const locale of ["ro", "ru"] as const) {
      const routes = [
        catalogMetadata(locale),
        ...catalog.categories.map((category) => catalogMetadata(locale, category.slug)),
        ...catalog.products.map((product) => {
          const category = catalog.categories.find((item) => item.id === product.categoryId)!;
          const schema = catalogProductSchema(locale, category, product);
          if (product.price && product.commercialVerified) {
            expect(schema?.offers.price).toBe(product.price.amount);
            expect(schema?.offers.priceCurrency).toBe(product.price.currency);
            expect(schema?.offers.availability).toBe("https://schema.org/InStock");
            expect(schema?.offers.availableDeliveryMethod).toBe(
              "https://schema.org/OnSitePickup",
            );
            expect(schema?.offers.hasMerchantReturnPolicy).toMatchObject({
              applicableCountry: "MD",
              merchantReturnDays: 15,
            });
            expect(schema).not.toHaveProperty("aggregateRating");
          } else expect(schema).toBeNull();
          return catalogMetadata(locale, category.slug, product.slug);
        }),
      ];
      for (const metadata of routes) {
        const title = String(metadata.title), description = metadata.description!;
        expect(titles.has(title)).toBe(false);
        expect(descriptions.has(description)).toBe(false);
        titles.add(title);
        descriptions.add(description);
        expect(metadata.alternates?.languages).toHaveProperty("ro-MD");
        expect(metadata.alternates?.languages).toHaveProperty("ru-MD");
      }
    }
    expect(titles.size).toBe(catalogSitemapEntries().length);
  });
  it("filters translated names, category, subcategory, brand and actual prices", () => {
    const items = createCatalogRepository(fixture()).products;
    expect(
      filterProducts(items, "ro", { query: "stiinta" }).map((p) => p.id),
    ).toEqual(["a"]);
    expect(
      filterProducts(items, "ru", {
        query: "RU",
        brand: "TEST",
        subcategoryId: "test-sub",
      }).map((p) => p.id),
    ).toEqual(["a"]);
    expect(filterProducts(items, "ro", { min: 150 }).map((p) => p.id)).toEqual([
      "b",
    ]);
    expect(filterProducts(items, "ro", { categoryId: "absent" })).toEqual([]);
    expect(
      filterProducts(items, "ro", { sort: "price-desc" }).map((p) => p.id),
    ).toEqual(["b", "a", "c"]);
    expect(formatPrice(undefined, "ro")).toBeUndefined();
  });
  it("uses reciprocal metadata and safely serializes JSON-LD", () => {
    expect(catalogMetadata("ru").alternates).toEqual({
      canonical: "/ru/catalog/",
      languages: {
        "ro-MD": "/ro/catalog/",
        "ru-MD": "/ru/catalog/",
        "x-default": "/ro/catalog/",
      },
    });
    expect(jsonLd({ name: "</script>" })).not.toContain("<");
  });
  it("uses large social images for product/category metadata", () => {
    expect(catalogMetadata("ro", "protectie-auditiva").twitter).toMatchObject({
      card: "summary_large_image",
    });
    expect(
      catalogMetadata("ro", "protectie-auditiva", "alpine-sleepdeep").openGraph?.images,
    ).toBeDefined();
  });
});
