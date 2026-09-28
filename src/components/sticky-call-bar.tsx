import { Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { StickyRequestForm } from "@/components/sticky-request-form";

export async function StickyCallBar() {
  const t = await getTranslations("HomePage.sticky");

  return (
    <aside className="sticky-callbar" aria-label={t("label")}>
      <div className="container sticky-callbar-inner">
        <strong><span aria-hidden="true" />{t("label")}</strong>
        <StickyRequestForm
          namePlaceholder={t("namePlaceholder")}
          phonePlaceholder={t("phonePlaceholder")}
          submitLabel={t("requestButton")}
          formLabel={t("label")}
        />
        <a className="sticky-mobile-call" href={`tel:${siteConfig.phoneInternational}`}>
          <Phone size={18} aria-hidden="true" />
          <span className="sticky-desktop-label">{t("button")}</span>
          <span className="sticky-mobile-label">{t("mobileButton")}</span>
        </a>
      </div>
    </aside>
  );
}
