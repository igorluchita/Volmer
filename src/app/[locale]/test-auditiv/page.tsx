import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, Check, Clock3, Mail, Phone, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { hearingTestPageContent } from "@/content/hearing-test-page";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return pageMetadata((await params).locale, "test-auditiv");
}

export default async function HearingTest({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "ru" ? "ru" : "ro";
  setRequestLocale(locale);
  const content = hearingTestPageContent[locale];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main className="hearing-test-page">
      <Breadcrumbs locale={locale} label={content.hero.title} path="test-auditiv" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="hearing-test-hero" aria-labelledby="hearing-test-title">
        <div className="container hearing-test-hero-grid">
          <div className="hearing-test-hero-copy">
            <p className="hearing-test-eyebrow"><span />{content.hero.eyebrow}</p>
            <h1 id="hearing-test-title">{content.hero.title}</h1>
            <p className="hearing-test-lead">{content.hero.lead}</p>
            <p className="hearing-test-statement">{content.hero.statement}</p>
            <div className="hearing-test-actions">
              <a className="hearing-test-primary" href={`tel:${siteConfig.phoneInternational}`}>
                <Phone size={17} aria-hidden="true" />{content.hero.cta}
              </a>
              <a className="hearing-test-secondary" href="#hearing-test-process">
                {content.hero.processLink}<ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="hearing-test-hero-art">
            <Image
              src="/images/pages/hearing-test/hearing-test-hero-photo.png"
              alt={content.imageAlts.hero}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 44vw"
            />
            <div className="hearing-test-facts">
              <p><Clock3 aria-hidden="true" /><strong>{content.hero.facts[0]}</strong></p>
              {content.hero.facts.slice(1).map((fact) => (
                <p key={fact}><Check aria-hidden="true" />{fact}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container hearing-test-section" aria-labelledby="hearing-test-signs-title">
        <div className="hearing-test-heading">
          <p className="hearing-test-index">{content.signs.eyebrow}</p>
          <h2 id="hearing-test-signs-title">{content.signs.title}</h2>
          <p>{content.signs.lead}</p>
        </div>
        <div className="hearing-test-sign-grid">
          {content.signs.items.map((item, index) => (
            <article key={item.title}>
              <span className="hearing-test-card-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p className="hearing-test-card-note">{item.note}</p>
            </article>
          ))}
        </div>
        <p className="hearing-test-callout"><ShieldCheck aria-hidden="true" />{content.signs.conclusion}</p>
      </section>

      <section className="hearing-test-process" id="hearing-test-process" aria-labelledby="hearing-test-process-title">
        <div className="container">
          <div className="hearing-test-heading">
            <p className="hearing-test-index">{content.process.eyebrow}</p>
            <h2 id="hearing-test-process-title">{content.process.title}</h2>
          </div>
          <div className="hearing-test-step-grid">
            {content.process.steps.map((step, index) => (
              <article key={step.title}>
                <span className="hearing-test-step-number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div><b>{locale === "ro" ? "De ce?" : "Зачем?"}</b><span>{step.purpose}</span></div>
              </article>
            ))}
          </div>
          <p className="hearing-test-process-note"><Clock3 aria-hidden="true" />{content.process.conclusion}</p>
        </div>
      </section>

      <section className="container hearing-test-section" aria-labelledby="hearing-test-results-title">
        <div className="hearing-test-heading">
          <p className="hearing-test-index">{content.results.eyebrow}</p>
          <h2 id="hearing-test-results-title">{content.results.title}</h2>
        </div>
        <div className="hearing-test-result-grid">
          {content.results.items.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container hearing-test-audience" aria-labelledby="hearing-test-audience-title">
        <div className="hearing-test-audience-copy">
          <p className="hearing-test-index">{content.audience.eyebrow}</p>
          <h2 id="hearing-test-audience-title">{content.audience.title}</h2>
          <div className="hearing-test-audience-list">
            {content.audience.items.map((item) => (
              <article key={item.title}><Check aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.description}</p></div></article>
            ))}
          </div>
        </div>
        <Image
          className="hearing-test-audience-image"
          src="/images/pages/hearing-test/hearing-consultation.png"
          alt={content.imageAlts.audience}
          width={700}
          height={520}
        />
      </section>

      <section className="hearing-test-preparation" aria-labelledby="hearing-test-preparation-title">
        <div className="container">
          <div className="hearing-test-heading">
            <p className="hearing-test-index">{content.preparation.eyebrow}</p>
            <h2 id="hearing-test-preparation-title">{content.preparation.title}</h2>
          </div>
          <ol>
            {content.preparation.items.map((item, index) => (
              <li key={item}><span>0{index + 1}</span>{item}</li>
            ))}
          </ol>
          <p className="hearing-test-prep-note">{content.preparation.note}</p>
        </div>
      </section>

      <section className="container hearing-test-section hearing-test-faq" aria-labelledby="hearing-test-faq-title">
        <div className="hearing-test-heading">
          <p className="hearing-test-index">{content.faq.eyebrow}</p>
          <h2 id="hearing-test-faq-title">{content.faq.title}</h2>
        </div>
        <div className="hearing-test-faq-list">
          {content.faq.items.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}<span aria-hidden="true" /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="container hearing-test-final" aria-labelledby="hearing-test-final-title">
        <div>
          <p className="hearing-test-index">{locale === "ro" ? "07 — ALEGEREA TA" : "07 — ВАШ ВЫБОР"}</p>
          <h2 id="hearing-test-final-title">{content.final.title}</h2>
          <p>{content.final.lead}</p>
          <p>{content.final.statement}</p>
        </div>
        <div className="hearing-test-final-actions">
          <a className="hearing-test-primary" href={`tel:${siteConfig.phoneInternational}`}><Phone size={17} aria-hidden="true" />{content.final.cta}</a>
          <a className="hearing-test-email" href={`mailto:${siteConfig.email}`}><Mail size={16} aria-hidden="true" />{siteConfig.email}</a>
        </div>
      </section>
    </main>
  );
}
