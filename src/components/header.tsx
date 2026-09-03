"use client";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "./brand-logo";
import { localizedBlogPath } from "@/content/blog-locales";

const items = [
  ["/", "home"],
  ["/aparate-auditive", "aids"],
  ["/test-auditiv", "test"],
  ["/servicii", "services"],
  ["/despre-noi", "about"],
  ["/blog", "blog"],
  ["/intrebari-frecvente", "faq"],
  ["/contact", "contact"],
] as const;

export function Header() {
  const t = useTranslations("Nav");
  const locale = useLocale() as "ro" | "ru";
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const other = locale === "ro" ? "ru" : "ro";
  const languagePath = localizedBlogPath(path, locale);
  return (
    <header>
      <div className="topline">
        <div className="container">
          <a href={`tel:${siteConfig.phoneInternational}`}>
            {siteConfig.phoneDisplay}
          </a>
          <span>
            {siteConfig.city} · {t("contact")}
          </span>
        </div>
      </div>
      <div className="container bar">
        <BrandLogo />
        <nav
          className={open ? "open" : ""}
          aria-label={locale === "ro" ? "Principal" : "Основная навигация"}
        >
          {items.map(([href, key]) => {
            const active =
              href === "/"
                ? path === "/"
                : path === href || path.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {t(key)}
              </Link>
            );
          })}
          <div className="language-dropdown">
            <button
              type="button"
              className="language-trigger"
              aria-label={t("language")}
              aria-expanded={languageOpen}
              onClick={() => setLanguageOpen(!languageOpen)}
            >
              {locale.toUpperCase()}
              <ChevronDown size={15} />
            </button>
            {languageOpen && (
              <div className="language-menu">
                <NextLink
                  href={`/${other}${languagePath === "/" ? "" : languagePath}/`}
                  onClick={() => setLanguageOpen(false)}
                >
                  {other.toUpperCase()}
                </NextLink>
              </div>
            )}
          </div>
        </nav>
        <div className="header-actions">
          <a
            aria-label={locale === "ro" ? "Sună Volmer" : "Позвонить Volmer"}
            href={`tel:${siteConfig.phoneInternational}`}
          >
            <Phone />
          </a>
          <a
            className="booking-mini"
            href={`tel:${siteConfig.phoneInternational}`}
          >
            {t("booking")}
          </a>
          <button
            className="menu"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
