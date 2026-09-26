import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { BrandLogo } from "./brand-logo";
import { BusinessHours } from "./business-hours";

const pageLinks = [
  ["/aparate-auditive", "aids"],
  ["/test-auditiv", "test"],
  ["/servicii", "services"],
  ["/despre-noi", "about"],
  ["/blog", "blog"],
  ["/intrebari-frecvente", "faq"],
] as const;

export async function Footer() {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Nav");
  const company = await getTranslations("HomePage.company");
  const platformNames = (company.raw("platforms") as { title: string }[]).map((platform) => platform.title);

  return (
    <footer className="site-footer">
      <div className="container site-footer-grid">
        <div className="site-footer-brand">
          <BrandLogo footer />
          <p>{t("note")}</p>
          <strong>{t("germanStandard")}</strong>
        </div>
        <section>
          <h2>{t("pagesTitle")}</h2>
          <nav aria-label={t("pagesTitle")}>
            {pageLinks.map(([href, key]) => <Link key={href} href={href}>{nav(key)}</Link>)}
          </nav>
        </section>
        <section>
          <h2>{t("unitronTitle")}</h2>
          <nav aria-label={t("unitronTitle")}>
            <Link href="/aparate-auditive">{t("hearingAids")}</Link>
            {platformNames.map((platform) => <Link key={platform} href="/aparate-auditive">{platform}</Link>)}
            <Link href="/aparate-auditive">{t("sonova")}</Link>
          </nav>
        </section>
        <section className="site-footer-contact">
          <h2>{t("contactTitle")}</h2>
          <address>
            <a href={siteConfig.googleMapsDirectionsUrl} target="_blank" rel="noreferrer"><MapPin size={17} aria-hidden="true" />{siteConfig.address}, {siteConfig.city}</a>
            <a href={`tel:${siteConfig.phoneInternational}`}><Phone size={17} aria-hidden="true" />{siteConfig.phoneDisplay}</a>
            <a href={`mailto:${siteConfig.email}`}><Mail size={17} aria-hidden="true" />{siteConfig.email}</a>
          </address>
          <BusinessHours />
          <a className="hp-button hp-button-primary site-footer-call" href={`tel:${siteConfig.phoneInternational}`}>{nav("booking")}</a>
        </section>
      </div>
      <div className="container site-footer-legal">
        © {new Date().getFullYear()} {siteConfig.brandName}. {t("copyright")}
      </div>
    </footer>
  );
}
