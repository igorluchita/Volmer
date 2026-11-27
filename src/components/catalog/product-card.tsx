import Link from "next/link";
import type { CatalogLocale, Category, Product } from "@/catalog/types";
import { catalogPath } from "@/catalog/paths";
import { formatPrice } from "@/catalog/query";
import { catalogMessages } from "@/catalog/messages";
import { CatalogPhoto } from "./catalog-photo";
export function ProductCard({
  product,
  category,
  locale,
  compare,
}: {
  product: Product;
  category: Category;
  locale: CatalogLocale;
  compare?: { selected: boolean; disabled: boolean; toggle: () => void };
}) {
  const image = product.images[0],
    t = catalogMessages[locale];
  return (
    <article className={`vc-card${compare?.selected ? " vc-card--selected" : ""}`}>
      <Link
        className="vc-card-link"
        href={catalogPath(locale, category.slug, product.slug)}
      >
        <div className="vc-card-image">
          {image ? (
            <CatalogPhoto
              image={image}
              alt={image.alt[locale]}
              sizes="(max-width: 600px) 90vw, (max-width: 1024px) 45vw, 30vw"
            />
          ) : (
            <span className="vc-placeholder">{t.noImage}</span>
          )}
        </div>
        <div className="vc-card-body">
          <h3>{product.name[locale]}</h3>
          <strong>{formatPrice(product.price, locale) ?? product.priceOnRequest?.[locale] ?? t.unavailable}</strong>
        </div>
      </Link>
      {compare && <button type="button" className="vc-compare-toggle" aria-pressed={compare.selected} disabled={compare.disabled} onClick={compare.toggle}>
        <span aria-hidden="true">{compare.selected ? "✓" : "+"}</span>
        {compare.selected ? t.comparing : t.addCompare}
      </button>}
    </article>
  );
}
