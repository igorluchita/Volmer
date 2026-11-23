import { catalogData } from "./data";
import type { CatalogData, Product } from "./types";
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function validateCatalog(data: CatalogData): CatalogData {
  const fail = (message: string): never => {
    throw new Error(`Catalog: ${message}`);
  };
  const localized = (value: unknown, field: string) => {
    if (
      !value ||
      typeof value !== "object" ||
      !("ro" in value) ||
      !("ru" in value) ||
      typeof value.ro !== "string" ||
      typeof value.ru !== "string" ||
      !value.ro.trim() ||
      !value.ru.trim()
    )
      fail(`RO/RU required: ${field}`);
  };
  const unique = (values: string[], field: string) => {
    if (values.some((v) => !v.trim()) || new Set(values).size !== values.length)
      fail(`duplicate/empty ${field}`);
  };
  const image = (item: Product["images"][number]) => {
    if (
      !/^\/(?!\/)[^?#]+$/.test(item.src) ||
      /\.\./.test(item.src) ||
      !Number.isFinite(item.width) ||
      !Number.isFinite(item.height) ||
      item.width <= 0 ||
      item.height <= 0
    )
      fail("invalid local image path/dimensions");
    localized(item.alt, "image alt");
  };
  unique(
    data.categories.map((c) => c.id),
    "category ID",
  );
  unique(
    data.categories.map((c) => c.slug),
    "category slug",
  );
  unique(
    data.subcategories.map((c) => c.id),
    "subcategory ID",
  );
  unique(
    data.subcategories.map((c) => `${c.categoryId}/${c.slug}`),
    "subcategory slug",
  );
  unique(
    data.products.map((p) => p.id),
    "product ID",
  );
  unique(
    data.products.map((p) => `${p.categoryId}/${p.slug}`),
    "product slug",
  );
  for (const record of [
    ...data.categories,
    ...data.subcategories,
    ...data.products,
  ]) {
    if (!slugPattern.test(record.slug)) fail(`invalid slug ${record.slug}`);
    if (typeof record.published !== "boolean")
      fail("published must be explicit");
    localized(record.name, "name");
    localized(record.description, "description");
  }
  for (const category of data.categories) {
    if (category.image) image(category.image);
    if (category.seo) {
      localized(category.seo.title, "SEO title");
      localized(category.seo.description, "SEO description");
    }
  }
  for (const sub of data.subcategories)
    if (!data.categories.some((c) => c.id === sub.categoryId))
      fail(`orphan subcategory ${sub.id}`);
  for (const product of data.products) {
    const category = data.categories.find((c) => c.id === product.categoryId);
    if (!category || (product.published && !category.published))
      fail(`invalid category for ${product.id}`);
    if (
      product.subcategoryId &&
      !data.subcategories.some(
        (s) =>
          s.id === product.subcategoryId &&
          s.categoryId === product.categoryId &&
          (!product.published || s.published),
      )
    )
      fail(`invalid subcategory for ${product.id}`);
    localized(product.shortDescription, "short description");
    product.images.forEach(image);
    product.specifications.forEach((s) => {
      localized(s.label, "specification label");
      localized(s.value, "specification value");
    });
    product.features.forEach((f) => localized(f, "feature"));
    if (product.seo) {
      localized(product.seo.title, "SEO title");
      localized(product.seo.description, "SEO description");
    }
    if (
      product.price &&
      (!Number.isFinite(product.price.amount) ||
        product.price.amount < 0 ||
        !/^[A-Z]{3}$/.test(product.price.currency))
    )
      fail(`invalid price for ${product.id}`);
    if (product.price) {
      try {
        new Intl.NumberFormat("ro", {
          style: "currency",
          currency: product.price.currency,
        });
      } catch {
        fail("invalid currency");
      }
    }
    for (const doc of product.documents ?? []) {
      localized(doc.label, "document label");
      if (
        !(
          doc.href.startsWith("/") &&
          !doc.href.startsWith("//") &&
          !doc.href.includes("..")
        ) &&
        !/^https:\/\/[^\s]+$/.test(doc.href)
      )
        fail("unsafe document URL");
    }
    for (const id of product.relatedProductIds ?? [])
      if (id === product.id || !data.products.some((p) => p.id === id))
        fail(`invalid related product ${id}`);
  }
  return data;
}
export function createCatalogRepository(input: CatalogData) {
  const data = validateCatalog(input);
  const categories = data.categories
    .filter((c) => c.published)
    .sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0) || a.slug.localeCompare(b.slug),
    );
  const products = data.products.filter(
    (p) => p.published && categories.some((c) => c.id === p.categoryId),
  );
  return {
    categories,
    products,
    subcategories: data.subcategories.filter(
      (s) => s.published && categories.some((c) => c.id === s.categoryId),
    ),
    category: (slug: string) => categories.find((c) => c.slug === slug),
    product: (categorySlug: string, slug: string) =>
      products.find(
        (p) =>
          p.slug === slug &&
          p.categoryId === categories.find((c) => c.slug === categorySlug)?.id,
      ),
    related: (product: Product) =>
      products
        .filter(
          (p) =>
            p.id !== product.id &&
            (product.relatedProductIds?.includes(p.id) ??
              p.categoryId === product.categoryId),
        )
        .slice(0, 4),
  };
}
export const catalog = createCatalogRepository(catalogData);
export { catalogPath } from "./paths";
