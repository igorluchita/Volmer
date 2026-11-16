"use client";

import {useLocale, useTranslations} from "next-intl";
import {ChevronDown, Clock3, MapPin, Menu, Phone, X} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import NextLink from "next/link";
import {BrandLogo} from "./brand-logo";
import {localizedBlogPath} from "@/content/blog-locales";
import {usePathname} from "@/i18n/navigation";
import {siteConfig} from "@/config/site";
import {editorialPath, type EditorialLocale} from "@/content/editorial-routing";
import {localizedNavigationHref} from "@/lib/localized-navigation";

type NavKey = "aids" | "allAids" | "flexTrial" | "test" | "diaspora" | "about" |
  "whyVolmer" | "company" | "team" | "information" | "faq" | "blog";
type NavItem =
  | {key: NavKey; href: string; children?: never}
  | {key: NavKey; children: {key: NavKey; href: string}[]; href?: never};

function navigationItems(locale: EditorialLocale): NavItem[] {
  return [
    {key: "aids", children: [
      {key: "allAids", href: localizedNavigationHref(locale, "/aparate-auditive")},
      {key: "flexTrial", href: editorialPath(locale, "flex")},
    ]},
    {key: "test", href: editorialPath(locale, "test")},
    {key: "diaspora", href: editorialPath(locale, "diaspora")},
    {key: "about", children: [
      {key: "whyVolmer", href: localizedNavigationHref(locale, "/#de-ce-volmer")},
      {key: "company", href: editorialPath(locale, "about")},
      {key: "team", href: editorialPath(locale, "team")},
    ]},
    {key: "information", children: [
      {key: "faq", href: editorialPath(locale, "faq")},
      {key: "blog", href: localizedNavigationHref(locale, "/blog")},
    ]},
  ];
}

export function Header() {
  const t = useTranslations("Nav");
  const locale = useLocale() as EditorialLocale;
  const path = usePathname();
  const items = navigationItems(locale);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<NavKey | null>(null);
  const [desktopGroup, setDesktopGroup] = useState<NavKey | null>(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const topbarRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const desktopTriggers = useRef<Partial<Record<NavKey, HTMLButtonElement | null>>>({});
  const suppressDesktopFocusOpen = useRef(false);
  const other = locale === "ro" ? "ru" : "ro";
  const languagePath = localizedBlogPath(path, locale);

  useEffect(() => {
    const header = headerRef.current;
    const topbar = topbarRef.current;
    if (!header || !topbar) return;
    const syncTopbarHeight = () => header.style.setProperty("--site-topbar-height", `${topbar.offsetHeight}px`);
    syncTopbarHeight();
    const observer = new ResizeObserver(syncTopbarHeight);
    observer.observe(topbar);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileGroup(null);
    setDesktopGroup(null);
    setLanguageOpen(false);
  }, [path, locale]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMobileOpen(false);
        setMobileGroup(null);
        setDesktopGroup(null);
        setLanguageOpen(false);
        return;
      }
      if (!(event.target as Element).closest(".desktop-nav")) setDesktopGroup(null);
      if (!(event.target as Element).closest(".language-dropdown")) setLanguageOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        setMobileGroup(null);
        menuButtonRef.current?.focus();
      } else if (desktopGroup) {
        setDesktopGroup(null);
        suppressDesktopFocusOpen.current = true;
        desktopTriggers.current[desktopGroup]?.focus();
        window.setTimeout(() => { suppressDesktopFocusOpen.current = false; }, 0);
      } else if (languageOpen) {
        setLanguageOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, desktopGroup, languageOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileGroup(null);
  };

  return (
    <header ref={headerRef} className={`site-header${mobileOpen ? " mobile-menu-open" : ""}`}>
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
            <NextLink href={editorialPath(locale, "contact")}>{t("contact")}</NextLink>
          </div>
        </div>
      </div>
      <div className="site-navbar">
        <div className="container site-navbar-inner">
          <BrandLogo locale={locale} />
          <nav className="main-nav desktop-nav" aria-label={t("principalAria")}>
            {items.map((item) => item.children ? (
              <div
                className={`desktop-nav-group${desktopGroup === item.key ? " is-expanded" : ""}`}
                key={item.key}
                onMouseEnter={() => setDesktopGroup(item.key)}
                onMouseLeave={() => setDesktopGroup(null)}
                onFocusCapture={() => {
                  if (!suppressDesktopFocusOpen.current) setDesktopGroup(item.key);
                }}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDesktopGroup(null);
                }}
              >
                <button
                  ref={(element) => { desktopTriggers.current[item.key] = element; }}
                  type="button"
                  className="desktop-nav-trigger"
                  aria-expanded={desktopGroup === item.key}
                  aria-controls={`desktop-${item.key}-menu`}
                  onClick={() => setDesktopGroup(item.key)}
                >
                  {t(item.key)} <ChevronDown size={15} aria-hidden="true" />
                </button>
                <div className="desktop-nav-menu" id={`desktop-${item.key}-menu`}>
                  {item.children.map((child) => (
                    <NextLink key={child.key} href={child.href} onClick={() => setDesktopGroup(null)}>
                      {t(child.key)}
                    </NextLink>
                  ))}
                </div>
              </div>
            ) : (
              <NextLink key={item.key} href={item.href}>{t(item.key)}</NextLink>
            ))}
          </nav>

          <div className="header-actions">
            <div className="language-dropdown">
              <button type="button" className="language-trigger" aria-label={t("language")}
                aria-expanded={languageOpen} onClick={() => setLanguageOpen((value) => !value)}>
                {locale.toUpperCase()} <ChevronDown size={15} aria-hidden="true" />
              </button>
              {languageOpen && (
                <div className="language-menu">
                  <NextLink href={`/${other}${languagePath === "/" ? "" : languagePath}/`}
                    onClick={() => setLanguageOpen(false)}>{other.toUpperCase()}</NextLink>
                </div>
              )}
            </div>
            <a className="booking-mini" href={`/${locale}/#booking-form`}>
              <Phone size={17} aria-hidden="true" />{t("booking")}
            </a>
            <button ref={menuButtonRef} type="button" className="menu" aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-panel"
              aria-label={mobileOpen ? t("closeMenuAria") : t("menuAria")}
              onClick={() => setMobileOpen((value) => !value)}>
              {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div id="mobile-navigation-panel" className={`mobile-navigation-panel${mobileOpen ? " is-open" : ""}`}>
          <nav className="mobile-nav" aria-label={t("principalAria")}>
            {items.map((item) => item.children ? (
              <div className="mobile-nav-group" key={item.key}>
                <button type="button" className="mobile-nav-trigger"
                  aria-expanded={mobileGroup === item.key}
                  aria-controls={`mobile-${item.key}-menu`}
                  onClick={() => setMobileGroup((current) => current === item.key ? null : item.key)}>
                  {t(item.key)} <ChevronDown size={17} aria-hidden="true" />
                </button>
                <div id={`mobile-${item.key}-menu`} className="mobile-nav-submenu"
                  hidden={mobileGroup !== item.key}>
                  {item.children.map((child) => (
                    <NextLink key={child.key} href={child.href} onClick={closeMobile}>{t(child.key)}</NextLink>
                  ))}
                </div>
              </div>
            ) : (
              <NextLink className="mobile-nav-link" key={item.key} href={item.href}
                onClick={closeMobile}>{t(item.key)}</NextLink>
            ))}
          </nav>
          <div className="mobile-nav-footer">
            <a className="mobile-nav-phone" href={`tel:${siteConfig.phoneInternational}`} onClick={closeMobile}>
              <Phone size={18} aria-hidden="true" /> {siteConfig.phoneDisplay}
            </a>
            <a className="booking-mini mobile-nav-booking" href={`/${locale}/#booking-form`}
              onClick={closeMobile}>{t("booking")}</a>
          </div>
        </div>
      </div>
    </header>
  );
}
