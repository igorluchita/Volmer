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
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import {QuickContactLinks} from '@/components/quick-contact-links';
import {GoogleTagManagerBody, GoogleTagManagerHead} from '@/components/google-tag-manager';
import '../globals.css';
import '../home-hero.css';
import '../home-page.css';
import '../hearing-aids-page.css';
import '../blog-test-pages.css';
import '../editorial-pages.css';
import '../contact-booking.css';

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
    metadataBase: new URL(siteConfig.siteUrl),
    applicationName: siteConfig.brandName,
    icons: {icon: [{url: siteConfig.faviconPath, type: 'image/png', sizes: '512x512'}], apple: [{url: siteConfig.faviconPath, type: 'image/png', sizes: '512x512'}]},
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
  const common = await getTranslations({ locale, namespace: "Common" });
  return (
    <html lang={locale}>
      <head><GoogleTagManagerHead /></head>
      <body>
    <GoogleTagManagerBody />
    <NextIntlClientProvider messages={await getMessages()}>
      <ConsentProvider>
      <div lang={locale}>
        <a className="skip" href="#content">
          {common("skip")}
        </a>
        <StructuredData />
        <Header />
        <main id="content" tabIndex={-1}>{children}</main>
        <Footer />
        <QuickContactLinks />
      </div>
      </ConsentProvider>
    </NextIntlClientProvider>
      </body>
    </html>
  );
}
