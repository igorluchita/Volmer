import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CatalogPage } from "@/components/catalog/catalog-page";
import { catalog } from "@/catalog/repository";
import { catalogMetadata } from "@/catalog/seo";
type Props = {
  params: Promise<{ locale: string; category: string; product: string }>;
};
export const dynamicParams = false;
export function generateStaticParams() {
  return (["ro", "ru"] as const).flatMap((locale) =>
    catalog.products.flatMap((product) => {
      const category = catalog.categories.find(
        (item) => item.id === product.categoryId,
      );
      return category
        ? [{ locale, category: category.slug, product: product.slug }]
        : [];
    }),
  );
}
export async function generateMetadata({ params }: Props) {
  const { locale, category, product } = await params;
  if (
    (locale !== "ro" && locale !== "ru") ||
    !catalog.product(category, product)
  )
    notFound();
  return catalogMetadata(locale, category, product);
}
export default async function Page({ params }: Props) {
  const { locale, category, product } = await params;
  if (locale !== "ro" && locale !== "ru") notFound();
  const c = catalog.category(category),
    p = catalog.product(category, product);
  if (!c || !p) notFound();
  setRequestLocale(locale);
  return <CatalogPage locale={locale} category={c} product={p} />;
}
