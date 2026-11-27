"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type {
  Category,
  Product,
  CatalogLocale,
} from "@/catalog/types";
import { filterProducts, type CatalogFilters } from "@/catalog/query";
import { catalogMessages } from "@/catalog/messages";
import { ProductCard } from "./product-card";
export function ProductGrid({
  products,
  categories,
  locale,
  categoryId,
}: {
  products: Product[];
  categories: Category[];
  locale: CatalogLocale;
  categoryId?: string;
}) {
  const t = catalogMessages[locale];
  const [filters, setFilters] = useState<CatalogFilters>({ categoryId });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const comparisonRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (comparisonOpen) comparisonRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }, [comparisonOpen]);
  const update = (patch: Partial<CatalogFilters>) =>
    setFilters((current) => ({ ...current, ...patch }));
  const result = useMemo(
    () => filterProducts(products, locale, filters),
    [products, locale, filters],
  );
  const selected = selectedIds.map((id) => products.find((p) => p.id === id)).filter((p): p is Product => Boolean(p));
  const selectedSpecs = [...new Set(selected.flatMap((p) => p.specifications.map((s) => s.label[locale])))];
  const toggleCompare = (id: string) => {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 3 ? [...current, id] : current);
  };
  return (
    <section className={`vc-products${categoryId ? " vc-products--category" : ""}`} id="products" aria-labelledby="vc-products-title">
      <div className="vc-section-heading">
        <div>{categoryId && <p className="vc-category-section-kicker">02 / {t.explore}</p>}<h2 id="vc-products-title">{t.products}</h2></div>
        <span role="status" aria-live="polite">
          {result.length} {t.ofProducts} {products.length}
        </span>
      </div>
      <form className="vc-filters" onSubmit={(e) => e.preventDefault()}>
        <label className="vc-search">
          {t.search}
          <input
            type="search"
            value={filters.query ?? ""}
            onChange={(e) => update({ query: e.target.value })}
          />
        </label>
      </form>
      <div className="vc-compare-intro"><span>{t.compareHint}</span><span>{selected.length} / 3</span></div>
      {result.length ? (
        <div className="vc-grid">
          {result.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              category={categories.find((c) => c.id === product.categoryId)!}
              locale={locale}
              compare={{ selected: selectedIds.includes(product.id), disabled: selectedIds.length >= 3 && !selectedIds.includes(product.id), toggle: () => toggleCompare(product.id) }}
            />
          ))}
        </div>
      ) : (
        <p className="vc-no-results">{t.noResults}</p>
      )}
      {selected.length > 0 && <div className="vc-compare-dock" role="region" aria-label={t.compareProducts}>
        <div><strong>{t.compareProducts}</strong><span>{selected.map((p) => p.name[locale]).join(" · ")}</span></div>
        <div className="vc-compare-actions"><button type="button" onClick={() => setComparisonOpen((open) => !open)}>{comparisonOpen ? t.closeCompare : t.openCompare} <span aria-hidden="true">↗</span></button><button type="button" className="vc-compare-clear" onClick={() => { setSelectedIds([]); setComparisonOpen(false); }}>{t.clearCompare}</button></div>
      </div>}
      {comparisonOpen && selected.length > 0 && <section ref={comparisonRef} className="vc-compare-panel" aria-labelledby="vc-compare-title">
        <div className="vc-section-heading"><h3 id="vc-compare-title">{t.compareProducts}</h3><button type="button" onClick={() => setComparisonOpen(false)} aria-label={t.closeCompare}>×</button></div>
        <div className="vc-compare-scroll"><table><thead><tr><th scope="col">{t.attribute}</th>{selected.map((p) => <th scope="col" key={p.id}>{p.name[locale]}</th>)}</tr></thead><tbody>
          <tr><th scope="row">{t.description}</th>{selected.map((p) => <td key={p.id}>{p.shortDescription[locale]}</td>)}</tr>
          {selectedSpecs.map((label) => <tr key={label}><th scope="row">{label}</th>{selected.map((p) => <td key={p.id}>{p.specifications.find((s) => s.label[locale] === label)?.value[locale] ?? "—"}</td>)}</tr>)}
        </tbody></table></div>
        <p>{t.compareNotice}</p>
      </section>}
    </section>
  );
}
