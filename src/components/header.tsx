"use client";

import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Clock3, MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { Link } from "@/i18n/navigation";
import { BrandLogo } from "./brand-logo";
import { localizedBlogPath } from "@/content/blog-locales";
import { usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import {editorialPath, type EditorialType} from '@/content/editorial-routing';

const items = [
  ["/aparate-auditive", "aids"],
  ["/test-auditiv", "test"],
  ["/#problema", "problem"],
  ["/#flex-trial", "flexTrial"],
  ["/#de-ce-volmer", "whyVolmer"],
  ["/#companie", "company"],
  ["/echipa", "team"],
  ["/#faq", "faq"],
  ["/#contact", "contact"],
  ["/blog", "blog"],
] as const;
const editorialNav: Partial<Record<(typeof items)[number][1], EditorialType>> = {
  test: 'test', flexTrial: 'flex', company: 'about', team: 'team', faq: 'faq', contact: 'contact'
};

export function Header() {
  const t = useTranslations("Nav");
  const locale = useLocale() as "ro" | "ru";
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const topbarRef = useRef<HTMLDivElement>(null);
  const other = locale === "ro" ? "ru" : "ro";
  const languagePath = localizedBlogPath(path, locale);

  useEffect(() => {
    const header = headerRef.current;
    const topbar = topbarRef.current;
    if (!header || !topbar) return;

    const syncTopbarHeight = () => {
      header.style.setProperty("--site-topbar-height", `${topbar.offsetHeight}px`);
    };

    syncTopbarHeight();
    const observer = new ResizeObserver(syncTopbarHeight);
    observer.observe(topbar);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open && !languageOpen) return;

    const closeOverlays = () => {
      setOpen(false);
      setLanguageOpen(false);
    };

    window.addEventListener("scroll", closeOverlays, { passive: true });
    return () => window.removeEventListener("scroll", closeOverlays);
  }, [open, languageOpen]);

  return (
    <header ref={headerRef} className="site-header">
      <div ref={topbarRef} className="site-topbar">
        <div className="hp-container site-topbar-inner">
          <div className="site-topbar-group">
            <a className="site-topbar-phone" href={`tel:${siteConfig.phoneInternational}`}>
              <Phone size={15} aria-hidden="true" /> <strong>{siteConfig.phoneDisplay}</strong>
            </a>
            <span className="site-topbar-hours"><Clock3 size={14} aria-hidden="true" />{t("hoursShort")}</span>
            <span className="site-consultation"><span aria-hidden="true">✓</span>{t("consultation")}</span>
          </div>
          <div className="site-topbar-right">
            <span><MapPin size={14} aria-hidden="true" />{siteConfig.address}, {siteConfig.city}</span>
            <NextLink href={editorialPath(locale, 'contact')}>{t("contact")}</NextLink>
          </div>
        </div>
      </div>
      <div className="site-navbar">
        <div className="container site-navbar-inner">
          <BrandLogo />
          <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label={t("principalAria")}>
            {items.map(([href, key]) => {
              const type = editorialNav[key];
              return type
                ? <NextLink key={key} href={editorialPath(locale, type)} onClick={() => setOpen(false)}>{t(key)}</NextLink>
                : <Link key={key} href={href} onClick={() => setOpen(false)}>{t(key)}</Link>;
            })}
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
            <a className="booking-mini" href={`/${locale}/#booking-form`}><Phone size={17} aria-hidden="true" />{t("booking")}</a>
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
