import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/config/site";
import { StructuredData } from "@/components/structured-data";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "ro" | "ru")) notFound();
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/`,
      languages: { "ro-MD": "/ro/", "ru-MD": "/ru/", "x-default": "/ro/" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      siteName: siteConfig.brandName,
      url: `/${locale}/`,
      type: "website",
      locale: locale === "ro" ? "ro_MD" : "ru_MD",
      alternateLocale: locale === "ro" ? ["ru_MD"] : ["ro_MD"],
      images: [{ url: siteConfig.logoPath, alt: "Volmer" }],
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
      images: [siteConfig.logoPath],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "ro" | "ru")) notFound();
  setRequestLocale(locale);
  return (
    <NextIntlClientProvider messages={await getMessages()}>
      <a className="skip" href="#content">
        {locale === "ro" ? "Sari la conținut" : "Перейти к содержанию"}
      </a>
      <StructuredData />
      <Header />
      <main id="content">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
