import { getTranslations } from "next-intl/server";
import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { BrandLogo } from "./brand-logo";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";
import {legalPath} from '@/content/legal-pages';
import {getLocale} from 'next-intl/server';
import {editorialPath, type EditorialType} from '@/content/editorial-routing';

const pageLinks = [
  ["/test-auditiv", "test"],
  ["/#problema", "symptoms"],
  ["/#problema", "amplifier"],
  ["/#flex-trial", "flexTrial"],
  ["/#de-ce-volmer", "advantages"],
  ["/#companie", "experience"],
  ["/echipa", "team"],
  ["/aparate-auditive", "hearingAids"],
  ["/#faq", "faq"],
  ["/blog", "blog"],
  ["/pentru-familia-de-peste-hotare", "diaspora"],
  ["/auzul-si-dementa", "dementia"],
  ["/cnam", "cnam"],
  ["/contact", "contactPage"],
] as const;
const pageLinkColumns = [pageLinks.slice(0, 7), pageLinks.slice(7)] as const;
const editorialFooter: Partial<Record<(typeof pageLinks)[number][1], EditorialType>> = {
  test: 'test', flexTrial: 'flex', experience: 'about', team: 'team', faq: 'faq', diaspora: 'diaspora', dementia: 'dementia', cnam: 'cnam', contactPage: 'contact'
};

export async function Footer() {
  const t = await getTranslations("Footer");
  const hours = await getTranslations("BusinessHours");
  const locale = (await getLocale()) === 'ru' ? 'ru' : 'ro';

  return (
    <footer className="site-footer">
      <div className="container site-footer-grid">
        <div className="site-footer-brand">
          <BrandLogo footer />
          <p>{t("note")}</p>
          <strong>{t("germanStandard")}</strong>
        </div>
        {pageLinkColumns.map((column, index) => {
          const title = index === 0 ? t("pagesTitle") : t("morePagesTitle");
          return <section key={title}>
            <h2>{title}</h2>
            <nav aria-label={title}>
              {column.map(([href, key]) => {
                const type = editorialFooter[key];
                return type ? <a key={key} href={editorialPath(locale, type)}>{t(key)}</a> : <Link key={key} href={href}>{t(key)}</Link>;
              })}
            </nav>
          </section>;
        })}
        <section className="site-footer-contact">
          <h2>{t("contactTitle")}</h2>
          <address>
            <a className="site-footer-address" href={siteConfig.googleMapsDirectionsUrl} target="_blank" rel="noreferrer">{siteConfig.address}, {siteConfig.city}, {t("country")}</a>
            <a href={`tel:${siteConfig.phoneInternational}`}>{t("phoneLabel")}: <strong>{siteConfig.phoneDisplay.replaceAll(" ", "")}</strong></a>
            <a href={`mailto:${siteConfig.email}`}>Email: {siteConfig.email}</a>
          </address>
          <p className="site-footer-hours">{hours("weekdays")}: {siteConfig.businessHours[0].hours}, {hours("saturday")}: {siteConfig.businessHours[1].hours}</p>
          <a className="hp-button hp-button-primary site-footer-call" href={`tel:${siteConfig.phoneInternational}`}>{t("quickCall")}</a>
        </section>
      </div>
      <div className="container site-footer-legal">
        <span>© {new Date().getFullYear()} {siteConfig.brandName}. {t("copyright")}</span>
        <nav className="site-footer-policy-links" aria-label={t('legalLinks')}>
          <a href={legalPath(locale, 'privacy')}>{t('privacyPolicy')}</a>
          <a href={legalPath(locale, 'cookies')}>{t('cookies')}</a>
          <a href={legalPath(locale, 'terms')}>{t('terms')}</a>
          <CookieSettingsButton />
        </nav>
      </div>
    </footer>
  );
}
