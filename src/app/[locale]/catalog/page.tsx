import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { CatalogPage } from "@/components/catalog/catalog-page";
import { catalogMetadata } from "@/catalog/seo";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "ro" && locale !== "ru") notFound();
  return catalogMetadata(locale);
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "ro" && locale !== "ru") notFound();
  setRequestLocale(locale);
  return <CatalogPage locale={locale} />;
}
