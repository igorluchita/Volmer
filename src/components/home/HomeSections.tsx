import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { BusinessHours } from "@/components/business-hours";
import { ContactRequestForm } from "@/components/home/ContactRequestForm";

type SituationCard = {
  label: string;
  text: string;
  result: string;
  imageAlt: string;
};

type Outcome = { text: string; imageAlt: string };
type TextCard = { title: string; text: string; quote?: string; features?: string[] };
type Platform = TextCard & {
  label: string;
  badge: string;
  imageAlt: string;
};
type FaqItem = { question: string; answer: string };

const situationImages = [
  "/images/homepage/meeting-video-call.png",
  "/images/homepage/restaurant.webp",
  "/images/homepage/acasa.webp",
];

const outcomeImages = [
  "/images/homepage/conversatie.webp",
  "/images/homepage/galagie.webp",
  "/images/homepage/mama.webp",
];

const platformImages = [
  "/images/homepage/smile.webp",
  "/images/homepage/vivante.webp",
  "/images/homepage/blu.webp",
];

export async function HomeTrustRibbon() {
  const t = await getTranslations("HomePage.trustRibbon");
  const nav = await getTranslations("Nav");
  const items = t.raw("items") as string[];

  return (
    <div className="hp-trust-ribbon">
      <div className="hp-container hp-trust-ribbon-inner">
        <nav className="hp-home-breadcrumb" aria-label={nav("breadcrumbAria")}>
          <Link href="/">{nav("home")}</Link>
          <span aria-hidden="true">/</span>
          <strong>{t("title")}</strong>
        </nav>
        <div>
          {items.map((item, index) => (
            <span key={item}>
              <i className={index === 0 ? "is-green" : "is-blue"} aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function HomeSections() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  const problemCards = t.raw("problem.cards") as SituationCard[];
  const problemSigns = t.raw("problem.signs") as string[];
  const leftPoints = t.raw("comparison.leftPoints") as string[];
  const rightPoints = t.raw("comparison.rightPoints") as string[];
  const flexChecks = t.raw("flexTrial.checks") as string[];
  const outcomes = t.raw("price.outcomes") as Outcome[];
  const priceSteps = t.raw("price.steps") as string[];
  const whyCards = t.raw("whyVolmer.cards") as TextCard[];
  const historyItems = t.raw("company.historyItems") as string[];
  const principles = t.raw("company.principles") as TextCard[];
  const platforms = t.raw("company.platforms") as Platform[];
  const hearingTypes = t.raw("company.types") as TextCard[];
  const faqItems = t.raw("faq.items") as FaqItem[];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <section className="hp-section hp-container hp-surface" id="problema" aria-labelledby="problem-title">
        <header className="hp-section-heading">
          <p className="hp-eyebrow">{t("problem.eyebrow")}</p>
          <h2 id="problem-title">{t("problem.title")}</h2>
          <p>{t("problem.subtitle")}</p>
        </header>
        <div className="hp-situation-grid">
          {problemCards.map((card, index) => (
            <article className="hp-situation-card" key={card.label}>
              <div className="hp-situation-image">
                <Image
                  src={situationImages[index]}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 760px) 100vw, 31vw"
                />
              </div>
              <div className="hp-situation-copy">
                <p className="hp-card-label">{card.label}</p>
                <h3>{card.text}</h3>
                <div className="hp-result">
                  <span>{t("problem.resultLabel")}</span>
                  <strong>→ {card.result}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="hp-dark-panel hp-signs-panel">
          <h3>
            <AlertTriangle size={21} aria-hidden="true" />
            {t("problem.panelTitle")}
          </h3>
          <ul>
            {problemSigns.map((sign) => (
              <li key={sign}>
                <span aria-hidden="true" />
                {sign}
              </li>
            ))}
          </ul>
          <div className="hp-dark-panel-footer">
            <p>{t("problem.disclaimer")}</p>
            <Link className="hp-button hp-button-primary" href="/test-auditiv">
              {t("problem.cta")} <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="hp-section hp-container hp-surface" id="comparison" aria-labelledby="comparison-title">
        <header className="hp-section-heading hp-heading-narrow">
          <p className="hp-eyebrow">{t("comparison.eyebrow")}</p>
          <h2 id="comparison-title">{t("comparison.title")}</h2>
          <p className="hp-section-kicker">{t("comparison.subtitle")}</p>
          <p>{t("comparison.intro")}</p>
          <p>{t("comparison.introMore")}</p>
          <p>{t("comparison.introSolution")}</p>
        </header>
        <div className="hp-comparison-grid">
          <article className="hp-comparison-card is-negative">
            <div className="hp-device-image">
              <Image
                src="/images/homepage/amplificator.webp"
                alt={t("comparison.leftImageAlt")}
                fill
                sizes="(max-width: 760px) 75vw, 34vw"
              />
            </div>
            <h3><span aria-hidden="true">×</span>{t("comparison.leftTitle")}</h3>
            <ul>
              {leftPoints.map((point) => {
                const colon = point.indexOf(":");
                return <li key={point}>{colon > 0 ? <><b>{point.slice(0, colon)}:</b>{point.slice(colon + 1)}</> : point}</li>;
              })}
            </ul>
          </article>
          <article className="hp-comparison-card is-positive">
            <div className="hp-device-image">
              <Image
                src="/images/homepage/aparat.webp"
                alt={t("comparison.rightImageAlt")}
                fill
                sizes="(max-width: 760px) 75vw, 34vw"
              />
            </div>
            <h3><Check size={22} aria-hidden="true" />{t("comparison.rightTitle")}</h3>
            <ul>
              {rightPoints.map((point) => {
                const colon = point.indexOf(":");
                return <li key={point}>{colon > 0 ? <><b>{point.slice(0, colon)}:</b>{point.slice(colon + 1)}</> : point}</li>;
              })}
            </ul>
          </article>
        </div>
        <div className="hp-case-note">
          <p className="hp-card-label">{t("comparison.calloutTitle")}</p>
          <p>{t("comparison.calloutText")}</p>
          <strong>{t("comparison.calloutConclusion")}</strong>
        </div>
        <div className="hp-explainer">
          <p>{t("comparison.bottomText")}</p>
          <Link className="hp-button hp-button-navy" href="#flex-trial">
            {t("comparison.cta")} <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="hp-section hp-container hp-surface" id="flex-trial" aria-labelledby="flex-title">
        <header className="hp-section-heading">
          <p className="hp-eyebrow">{t("flexTrial.eyebrow")}</p>
          <h2 id="flex-title">{t("flexTrial.title")}</h2>
          <p><strong>{t("flexTrial.intro").split(":")[0]}:</strong>{t("flexTrial.intro").slice(t("flexTrial.intro").indexOf(":") + 1)}</p>
        </header>
        <div className="hp-check-strip">
          <strong>{t("flexTrial.checksTitle")}</strong>
          <div>
            {flexChecks.map((item) => (
              <p key={item}><Check size={18} aria-hidden="true" />{item}</p>
            ))}
          </div>
        </div>
        <div className="hp-week-grid">
          <article className="hp-week-card is-a">
            <div><span>{t("flexTrial.weekOneLabel")}</span><b>{t("flexTrial.weekOneBadge")}</b></div>
            <h3>{t("flexTrial.weekOneTitle")}</h3>
            <p>{t("flexTrial.weekOneText")}</p>
          </article>
          <article className="hp-week-card is-b">
            <div><span>{t("flexTrial.weekTwoLabel")}</span><b>{t("flexTrial.weekTwoBadge")}</b></div>
            <h3>{t("flexTrial.weekTwoTitle")}</h3>
            <p>{t("flexTrial.weekTwoText")}</p>
          </article>
        </div>
        <div className="hp-two-notes">
          <article><h3>{t("flexTrial.importanceTitle")}</h3><p>{t("flexTrial.importanceText")}</p></article>
          <article><h3>{t("flexTrial.afterTitle")}</h3><p>{t("flexTrial.afterText")}</p></article>
        </div>
        <div className="hp-flex-banner">
          <strong>{t("flexTrial.banner")}</strong>
          <a className="hp-button hp-button-primary" href={`tel:${siteConfig.phoneInternational}`}>
            {t("flexTrial.cta")} <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="hp-section hp-container hp-surface" id="pret" aria-labelledby="price-title">
        <div className="hp-price-grid">
          <div>
            <header className="hp-section-heading">
              <p className="hp-eyebrow">{t("price.eyebrow")}</p>
              <h2 id="price-title">{t("price.title")}</h2>
              <p className="hp-section-kicker">{t("price.subtitle")}</p>
              <p>{t("price.text")}</p>
            </header>
            <div className="hp-outcome-list">
              {outcomes.map((outcome, index) => (
                <article key={outcome.text}>
                  <Image src={outcomeImages[index]} alt={outcome.imageAlt} width={116} height={78} />
                  <strong>{outcome.text}</strong>
                </article>
              ))}
            </div>
            <a className="hp-button hp-button-primary" href={`tel:${siteConfig.phoneInternational}`}>
              {t("price.cta")}
            </a>
          </div>
          <aside className="hp-risk-card">
            <h3>{t("price.systemTitle")}</h3>
            <ol>
              {priceSteps.map((step, index) => (
                <li key={step}><b>{index + 1}</b><span>{step}</span></li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="hp-section hp-container hp-surface" id="de-ce-volmer" aria-labelledby="why-title">
        <header className="hp-section-heading">
          <p className="hp-eyebrow">{t("whyVolmer.eyebrow")}</p>
          <h2 id="why-title">{t("whyVolmer.title")}</h2>
          <p>{t("whyVolmer.intro")}</p>
        </header>
        <div className="hp-why-grid">
          {whyCards.map((card, index) => (
            <article className={`hp-why-card ${index === 1 ? "is-featured" : ""}`} key={card.title}>
              {index === 1 && <span className="hp-featured-badge">{t("whyVolmer.featuredBadge")}</span>}
              <b className="hp-number-badge">{index + 1}</b>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              {card.quote && <blockquote>{card.quote}</blockquote>}
            </article>
          ))}
        </div>
        <div className="hp-centered-action">
          <a className="hp-button hp-button-navy" href={`tel:${siteConfig.phoneInternational}`}>
            {t("whyVolmer.cta")} <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="hp-section hp-container hp-surface" id="companie" aria-labelledby="company-title">
        <header className="hp-section-heading hp-heading-wide">
          <p className="hp-eyebrow">{t("company.eyebrow")}</p>
          <h2 id="company-title">{t("company.title")}</h2>
          <p className="hp-section-kicker">{t("company.subheadline")}</p>
          <p>{t("company.text")}</p>
        </header>

        <article className="hp-history-card">
          <h3>{t("company.historyTitle")}</h3>
          <p>{t("company.historyText")}</p>
          <div>
            <strong>{t("company.historyListTitle")}</strong>
            <ul>{historyItems.map((item) => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul>
          </div>
        </article>

        <div className="hp-subsection-heading"><span aria-hidden="true" /> <h3>{t("company.principlesTitle")}</h3></div>
        <div className="hp-principles-grid">
          {principles.map((principle, index) => (
            <article key={principle.title}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <h4>{principle.title}</h4>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>
        <p className="hp-principles-strip">{t("company.principlesStrip")}</p>

        <div className="hp-subsection-heading"><span aria-hidden="true" /> <h3>{t("company.unitronTitle")}</h3></div>
        <p className="hp-subsection-intro">{t("company.unitronText")}</p>
        <div className="hp-platform-grid">
          {platforms.map((platform, index) => (
            <article className={`hp-platform-card ${index === 1 ? "is-featured" : ""}`} key={platform.title}>
              <p className="hp-card-label">{platform.label}</p>
              <h4>{platform.title}</h4>
              <p>{platform.text}</p>
              <span>{platform.badge}</span>
              <div className="hp-platform-image">
                <Image
                  src={platformImages[index]}
                  alt={platform.imageAlt}
                  fill
                  sizes="(max-width: 760px) 70vw, 24vw"
                />
              </div>
            </article>
          ))}
        </div>

        <div className="hp-subsection-heading is-green"><span aria-hidden="true" /> <h3>{t("company.typesTitle")}</h3></div>
        <div className="hp-types-grid">
          {hearingTypes.map((type) => (
            <article key={type.title}><h4>{type.title}</h4><p>{type.text}</p>{type.features && <ul>{type.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>}</article>
          ))}
        </div>
        <div className="hp-company-trust">
          <p>{t("company.trustEyebrow")}</p>
          <strong>{t("company.trustText")}</strong>
        </div>
        <div className="hp-centered-action">
          <a className="hp-button hp-button-primary" href={`tel:${siteConfig.phoneInternational}`}>
            <Phone size={18} aria-hidden="true" /> {t("company.cta")}
          </a>
        </div>
      </section>

      <section className="hp-faq hp-container" id="faq" aria-labelledby="faq-title">
        <header className="hp-section-heading">
          <p className="hp-eyebrow">{t("faq.eyebrow")}</p>
          <h2 id="faq-title">{t("faq.title")}</h2>
          <p>{t("faq.intro")}</p>
        </header>
        <div className="hp-faq-list">
          {faqItems.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}<span aria-hidden="true" /></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="hp-contact hp-container" id="contact" aria-labelledby="contact-title">
        <div className="hp-contact-copy">
          <p className="hp-contact-eyebrow"><BadgeCheck size={17} aria-hidden="true" />{t("contact.eyebrow")}</p>
          <h2 id="contact-title">{t("contact.title")}</h2>
          <p>{t("contact.text")}</p>
          <div className="hp-contact-list">
            <a href={`tel:${siteConfig.phoneInternational}`}><Phone aria-hidden="true" /><span><small>{t("contact.phoneLabel")}</small><strong>{siteConfig.phoneDisplay}</strong></span></a>
            <a href={siteConfig.googleMapsDirectionsUrl} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /><span><small>{t("contact.addressLabel")}</small><strong>{siteConfig.address}, {siteConfig.city}</strong></span></a>
            <div><Clock3 aria-hidden="true" /><span><small>{t("contact.hoursLabel")}</small><BusinessHours /></span></div>
            <a href={`mailto:${siteConfig.email}`}><Mail aria-hidden="true" /><span><small>{t("contact.emailLabel")}</small><strong>{siteConfig.email}</strong></span></a>
          </div>
        </div>
        <ContactRequestForm />
        <div className="hp-contact-location">
          <figure className="hp-office-photo">
            <Image
              src="/images/homepage/volmer-office-facade-current.png"
              alt={t("contact.officePhotoAlt")}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <figcaption>{t("contact.officePhotoCaption")}</figcaption>
          </figure>
          <div className="hp-map-frame">
            <div className="hp-map-heading">
              <span><MapPin aria-hidden="true" />{siteConfig.address}, {siteConfig.city}</span>
              <a href={siteConfig.googleMapsDirectionsUrl} target="_blank" rel="noreferrer">{t("contact.mapLink")}</a>
            </div>
            <iframe
              className="hp-contact-map"
              src={siteConfig.googleMapsEmbedUrl || `https://maps.google.com/maps?q=${encodeURIComponent(`${siteConfig.address}, ${siteConfig.city}`)}&output=embed`}
              title={t("contact.mapTitle")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        data-locale={locale}
      />
    </>
  );
}
