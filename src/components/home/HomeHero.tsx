import Image from "next/image";
import { Check, Headphones, Phone, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

export async function HomeHero() {
  const t = await getTranslations("HomePage.hero");
  const paragraphs = t.raw("paragraphs") as string[];
  const benefits = t.raw("benefits") as string[];
  const trustChecks = t.raw("trustChecks") as string[];

  return (
    <section className="hp-hero hp-container" aria-labelledby="home-title">
      <div className="hp-hero-grid">
        <div className="hp-hero-copy">
          <p className="hp-hero-eyebrow">
            <Sparkles size={17} aria-hidden="true" />
            {t("eyebrow")}
          </p>
          <h1 id="home-title">
            <span>{t("titleLine1")}</span>
            <span>{t("titleLine2")}</span>
          </h1>
          <p className="hp-hero-subheadline">{t("subheadline")}</p>
          <div className="hp-hero-body">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="hp-hero-benefits" aria-label={t("eyebrow")}>
            {benefits.map((benefit) => (
              <li key={benefit}>
                <span aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
          <div className="hp-hero-actions">
            <a className="hp-button hp-button-primary" href={`tel:${siteConfig.phoneInternational}`}>
              <Phone size={19} aria-hidden="true" />
              {t("primaryCta")}
            </a>
            <a className="hp-button hp-button-secondary" href={`tel:${siteConfig.phoneInternational}`}>
              <Phone size={18} aria-hidden="true" />
              {t("secondaryCta")}
            </a>
          </div>
        </div>

        <div className="hp-hero-media">
          <Image
            src="/images/homepage/hero.webp"
            alt={t("imageAlt")}
            fill
            priority
            sizes="(max-width: 860px) 100vw, 43vw"
          />
          <span className="hp-hero-image-badge">{t("imageBadge")}</span>
          <div className="hp-hero-floating-card">
            <span className="hp-hero-floating-icon" aria-hidden="true">
              <Headphones size={22} />
            </span>
            <span>
              <b>{t("floatingEyebrow")}</b>
              <strong>{t("floatingTitle")}</strong>
            </span>
          </div>
        </div>
      </div>

      <ul className="hp-hero-trust" aria-label={t("eyebrow")}>
        {trustChecks.map((item) => (
          <li key={item}>
            <Check size={17} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
