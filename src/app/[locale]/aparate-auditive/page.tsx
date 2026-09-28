import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  BatteryCharging,
  Bluetooth,
  BrainCircuit,
  Ear,
  MessageCircle,
  Phone,
  Settings2,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Volume2,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  hearingAidBenefits,
  hearingAidCategories,
  hearingAidFaq,
  selectionSteps,
  unitronPlatforms,
} from "@/content/hearing-aids";

type TextItem = { title: string; description: string; benefits?: string[] };
type Copy = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    secondary: string;
    primaryCta: string;
    secondaryCta: string;
    imageAlt: string;
    proof: string;
    breadcrumb: string;
  };
  unitron: {
    title: string;
    text1: string;
    text2: string;
    points: string[];
    flow: string[];
  };
  platforms: {
    title: string;
    intro: string;
    note: string;
    items: Record<string, TextItem>;
  };
  styles: {
    title: string;
    intro: string;
    note: string;
    whenLabel: string;
    items: Record<string, TextItem & { when?: string }>;
  };
  technology: { title: string; intro: string; items: Record<string, TextItem> };
  connectivity: {
    title: string;
    description: string;
    flow: string[];
    note: string;
  };
  personalization: {
    title: string;
    text: string;
    highlight: string;
    items: Record<string, string>;
  };
  selection: { title: string; intro: string; resultLabel: string; result: string; items: Record<string, TextItem> };
  sonova: { title: string; text: string; points: string[] };
  faq: {
    title: string;
    items: Record<string, { question: string; answer: string }>;
  };
  finalCta: { title: string; text: string; primary: string; secondary: string };
};
const benefitIcons = {
  conversations: MessageCircle,
  automatic: BrainCircuit,
  noise: Volume2,
  bluetooth: Bluetooth,
  rechargeable: BatteryCharging,
  app: Smartphone,
};
const categoryIcons = { ric: Ear, bte: ShieldCheck, ite: Settings2 };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HearingAidsPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/aparate-auditive/`,
      languages: {
        "ro-MD": "/ro/aparate-auditive/",
        "ru-MD": "/ru/aparate-auditive/",
        "x-default": "/ro/aparate-auditive/",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `/${locale}/aparate-auditive/`,
      type: "website",
      locale: locale === "ro" ? "ro_MD" : "ru_MD",
      alternateLocale: locale === "ro" ? ["ru_MD"] : ["ro_MD"],
      images: [{ url: siteConfig.logoPath, alt: "Volmer" }],
    },
    twitter: {
      card: "summary",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [siteConfig.logoPath],
    },
  };
}

export default async function HearingAidsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HearingAidsPage");
  const c = t.raw("content") as Copy;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hearingAidFaq.map((id) => ({
      "@type": "Question",
      name: c.faq.items[id].question,
      acceptedAnswer: { "@type": "Answer", text: c.faq.items[id].answer },
    })),
  };
  return (
    <div className="aids-page">
      <Breadcrumbs
        locale={locale === "ru" ? "ru" : "ro"}
        label={c.hero.breadcrumb}
        path="aparate-auditive"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="aids-hero hp-container">
        <div className="aids-hero-copy">
            <p className="unitron-eyebrow">
              <Sparkles size={16} />
              {c.hero.eyebrow}
            </p>
            <h1>{c.hero.title}</h1>
            <p className="unitron-lead">{c.hero.description}</p>
            <p>{c.hero.secondary}</p>
            <div className="unitron-actions">
              <a className="unitron-primary" href="#platforme">
                <Sparkles size={17} />
                {c.hero.primaryCta}
              </a>
              <a className="unitron-secondary" href="#tipuri">
                {c.hero.secondaryCta}
              </a>
            </div>
        </div>
        <div className="aids-hero-visual">
          <div className="unitron-hero-image unitron-hero-video">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={c.hero.imageAlt}
            >
              <source src="/videos/unitron-vista-sr.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="aids-hero-proof"><ShieldCheck aria-hidden="true" /><span>{c.hero.proof}</span></div>
        </div>
      </section>

      <section className="aids-section hp-container" id="platforme">
        <div className="aids-section-heading">
          <p className="aids-index">01 — UNITRON</p>
          <h2>{c.platforms.title}</h2>
          <p>{c.platforms.intro}</p>
        </div>
        <div className="aids-platforms">
          {unitronPlatforms.map((id, index) => (
            <article key={id}>
              <span className="aids-number">0{index + 1}</span>
              <h3>{c.platforms.items[id].title}</h3>
              <p>{c.platforms.items[id].description}</p>
              <div className="aids-platform-image">
                <Image
                  src={`/images/homepage/${id}.webp`}
                  alt={c.platforms.items[id].title}
                  fill
                  sizes="(max-width: 700px) 80vw, 28vw"
                />
              </div>
            </article>
          ))}
        </div>
        <p className="aids-note">{c.platforms.note}</p>
      </section>

      <section className="aids-section aids-section-soft" id="tipuri">
        <div className="hp-container">
          <div className="aids-section-heading">
            <p className="aids-index">02 — FORME</p>
            <h2>{c.styles.title}</h2>
            <p>{c.styles.intro}</p>
          </div>
          <div className="aids-types">
            {hearingAidCategories.map((id, index) => {
              const Icon = categoryIcons[id];
              const item = c.styles.items[id];
              return <article key={id}>
                <div className="aids-type-top"><span className="aids-number">0{index + 1}</span><Icon aria-hidden="true" /></div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>{item.benefits?.map((value) => <li key={value}>{value}</li>)}</ul>
                {item.when && <p className="aids-when"><b>{c.styles.whenLabel}</b> {item.when}</p>}
                <div className="aids-type-image">
                  <Image
                    src={`/images/hearing-aids/${id.toUpperCase()}.png`}
                    alt={item.title}
                    fill
                    sizes="(max-width: 700px) 85vw, 28vw"
                  />
                </div>
              </article>;
            })}
          </div>
          <p className="aids-note">{c.styles.note}</p>
        </div>
      </section>

      <section className="aids-section hp-container" id="technology">
        <div className="aids-section-heading">
          <p className="aids-index">03 — FUNCȚII</p>
          <h2>{c.technology.title}</h2>
          <p>{c.technology.intro}</p>
        </div>
        <div className="aids-benefits">
          {hearingAidBenefits.map((id) => {
            const Icon = benefitIcons[id];
            const item = c.technology.items[id];
            return <article key={id}><Icon aria-hidden="true" /><h3>{item.title}</h3><p>{item.description}</p></article>;
          })}
        </div>
      </section>

      <section className="aids-section aids-section-soft" id="alegere">
        <div className="hp-container">
          <div className="aids-section-heading"><p className="aids-index">04 — VOLMER</p><h2>{c.selection.title}</h2><p>{c.selection.intro}</p></div>
          <div className="aids-steps">
          {selectionSteps.map((id, index) => {
            const item = c.selection.items[id];
            return (
              <article key={id}>
                <span className="aids-step-number">0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            );
          })}
          </div>
          <p className="aids-result"><b>{c.selection.resultLabel}</b> {c.selection.result}</p>
        </div>
      </section>

      <section className="aids-company" id="sonova">
        <div className="hp-container aids-company-inner">
          <p className="aids-index">05 — SONOVA</p>
          <div><h2>{c.sonova.title}</h2><p>{c.sonova.text}</p></div>
          <div className="aids-company-points">{c.sonova.points.map((point) => <p key={point}><ShieldCheck aria-hidden="true" />{point}</p>)}</div>
        </div>
      </section>

      <section className="aids-section hp-container" id="faq">
        <div className="aids-section-heading"><p className="aids-index">06 — FAQ</p><h2>{c.faq.title}</h2></div>
        <div className="aids-faq">
          {hearingAidFaq.map((id) => (
            <details key={id}>
              <summary>{c.faq.items[id].question}</summary>
              <p>{c.faq.items[id].answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="aids-final hp-container" id="contact">
        <div>
          <h2>{c.finalCta.title}</h2>
          <p>{c.finalCta.text}</p>
        </div>
        <div className="unitron-actions">
          <a
            className="unitron-primary"
            href={`tel:${siteConfig.phoneInternational}`}
          >
            <Phone size={19} />
            {c.finalCta.primary}
          </a>
          <Link className="unitron-secondary" href="/#flex-trial">
            {c.finalCta.secondary}
          </Link>
        </div>
      </section>
    </div>
  );
}
