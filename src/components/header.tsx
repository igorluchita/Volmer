"use client";

import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import NextLink from "next/link";
import { Link } from "@/i18n/navigation";
import { BrandLogo } from "./brand-logo";
import { localizedBlogPath } from "@/content/blog-locales";
import { usePathname } from "@/i18n/navigation";

const items = [
  ["/aparate-auditive", "aids"],
  ["/#problem", "problem"],
  ["/#flex-trial", "flexTrial"],
  ["/#price", "price"],
  ["/#why-volmer", "whyVolmer"],
  ["/#company", "company"],
  ["/#faq", "faq"],
  ["/#contact", "contact"],
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
    <header className="site-header">
      <div className="site-navbar">
        <div className="container site-navbar-inner">
          <BrandLogo />
          <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label={t("principalAria")}>
            {items.map(([href, key]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <div className="language-dropdown">
              <button
                type="button"
                className="language-trigger"
                aria-label={t("language")}
                aria-expanded={languageOpen}
                onClick={() => setLanguageOpen((value) => !value)}
              >
                {locale.toUpperCase()} <ChevronDown size={15} aria-hidden="true" />
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
            <Link className="booking-mini" href="/#contact">{t("booking")}</Link>
            <button
              type="button"
              className="menu"
              aria-expanded={open}
              aria-label={open ? t("closeMenuAria") : t("menuAria")}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
