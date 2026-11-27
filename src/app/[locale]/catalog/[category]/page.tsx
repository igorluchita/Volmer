import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CatalogPage } from "@/components/catalog/catalog-page";
import { catalog } from "@/catalog/repository";
import { catalogMetadata } from "@/catalog/seo";
type Props = { params: Promise<{ locale: string; category: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return catalog.categories.map((c) => ({ category: c.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { locale, category } = await params;
  if ((locale !== "ro" && locale !== "ru") || !catalog.category(category))
    notFound();
  return catalogMetadata(locale, category);
}
export default async function Page({ params }: Props) {
  const { locale, category } = await params;
  if (locale !== "ro" && locale !== "ru") notFound();
  const record = catalog.category(category);
  if (!record) notFound();
  setRequestLocale(locale);
  return <CatalogPage locale={locale} category={record} />;
}
