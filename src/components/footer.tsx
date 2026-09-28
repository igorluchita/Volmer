import { getTranslations } from "next-intl/server";
import { Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { BrandLogo } from "./brand-logo";

const pageLinks = [
  ["/test-auditiv", "test"],
  ["/#problema", "symptoms"],
  ["/#problema", "amplifier"],
  ["/#flex-trial", "flexTrial"],
  ["/#de-ce-volmer", "advantages"],
  ["/#companie", "experience"],
  ["/#faq", "faq"],
  ["/blog", "blog"],
] as const;

export async function Footer() {
  const t = await getTranslations("Footer");
  const company = await getTranslations("HomePage.company");
  const hours = await getTranslations("BusinessHours");
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
            {pageLinks.map(([href, key]) => <Link key={key} href={href}>{t(key)}</Link>)}
          </nav>
        </section>
        <section>
          <h2>{t("unitronTitle")}</h2>
          <nav aria-label={t("unitronTitle")}>
            {platformNames.map((platform) => <Link key={platform} href="/aparate-auditive">{t("platform", { name: platform })}</Link>)}
            <Link href="/aparate-auditive">{t("sonova")}</Link>
          </nav>
        </section>
        <section className="site-footer-contact">
          <h2>{t("contactTitle")}</h2>
          <address>
            <a className="site-footer-address" href={siteConfig.googleMapsDirectionsUrl} target="_blank" rel="noreferrer">{siteConfig.address}, {siteConfig.city}, {t("country")}</a>
            <a href={`tel:${siteConfig.phoneInternational}`}>{t("phoneLabel")}: <strong>{siteConfig.phoneDisplay.replaceAll(" ", "")}</strong></a>
            <a href={`mailto:${siteConfig.email}`}>Email: {siteConfig.email}</a>
          </address>
          <p className="site-footer-hours">{hours("weekdays")}: {siteConfig.businessHours[0].hours}, {hours("saturday")}: {siteConfig.businessHours[2].hours}</p>
          <a className="hp-button hp-button-primary site-footer-call" href={`tel:${siteConfig.phoneInternational}`}>{t("quickCall")}</a>
        </section>
      </div>
      <div className="container site-footer-legal">
        © {new Date().getFullYear()} {siteConfig.brandName}. {t("copyright")}
      </div>
    </footer>
  );
}
