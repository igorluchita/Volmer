import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { blogPosts, type Locale } from "@/content/seo";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArrowDown, ArrowRight, BookOpen, Clock3 } from "lucide-react";

export function generateStaticParams() {
  return [{ locale: "ro" }, { locale: "ru" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "ru"
      ? "Блог о слухе и слуховых аппаратах | Volmer"
      : "Blog despre auz și aparate auditive | Volmer";
  const description =
    locale === "ru"
      ? "Понятные материалы о слухе, технологиях и использовании слуховых аппаратов."
      : "Ghiduri clare despre auz, tehnologii și utilizarea aparatelor auditive.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/blog/`,
      languages: {
        "ro-MD": "/ro/blog/",
        "ru-MD": "/ru/blog/",
        "x-default": "/ro/blog/",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/${locale}/blog/`,
      locale: locale === "ro" ? "ro_MD" : "ru_MD",
      alternateLocale: locale === "ro" ? ["ru_MD"] : ["ro_MD"],
      images: [{ url: siteConfig.logoPath, alt: "Volmer" }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [siteConfig.logoPath],
    },
  };
}
export default async function Blog({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw === "ru" ? "ru" : "ro") as Locale;
  setRequestLocale(locale);
  const posts = blogPosts[locale];
  const copy = locale === "ro"
    ? { eyebrow: "VOLMER · JURNALUL AUZULUI", title: "Înțelege mai bine auzul. Alege informat.", lead: "Ghiduri clare și practice despre auz, tehnologii auditive și folosirea aparatelor în viața de zi cu zi.", browse: "Vezi articolele", list: "Articole și ghiduri", read: "Citește articolul", test: "Ai întrebări despre auzul tău?", testLink: "Află cum decurge evaluarea auzului" }
    : { eyebrow: "VOLMER · ЖУРНАЛ О СЛУХЕ", title: "Лучше понимать слух. Выбирать осознанно.", lead: "Понятные и практичные материалы о слухе, технологиях и использовании аппаратов в повседневной жизни.", browse: "Смотреть статьи", list: "Статьи и руководства", read: "Читать статью", test: "Есть вопросы о слухе?", testLink: "Узнайте, как проходит проверка слуха" };
  return (
    <>
      <Breadcrumbs
        locale={locale}
        label={locale === "ro" ? "Blog" : "Блог"}
        path="blog"
      />
      <main className="blog-index-page">
        <section className="blog-index-hero">
          <div className="container blog-index-hero-inner">
            <div>
              <p className="blog-index-eyebrow"><BookOpen size={15} aria-hidden="true" />{copy.eyebrow}</p>
              <h1>{copy.title}</h1>
              <p>{copy.lead}</p>
              <a className="blog-index-hero-link" href="#blog-articles">{copy.browse}<ArrowDown size={16} aria-hidden="true" /></a>
            </div>
            <div className="blog-index-highlight" aria-hidden="true">
              <span>{String(posts.length).padStart(2, "0")}</span>
              <p>{copy.list}</p>
              <div><i /><i /><i /><i /><i /></div>
            </div>
          </div>
        </section>

        <section className="container blog-index-content" id="blog-articles">
          <div className="blog-index-heading">
            <div><p className="blog-index-kicker">VOLMER · {locale === "ro" ? "RESURSE" : "МАТЕРИАЛЫ"}</p><h2>{copy.list}</h2></div>
            <span>{posts.length} {locale === "ro" ? "articole" : "статей"}</span>
          </div>
          <div className="blog-index-grid">
            {posts.map((post, index) => (
              <article className="blog-index-card" key={post.slug}>
                <div className="blog-index-card-top"><span className="blog-index-card-number">{String(index + 1).padStart(2, "0")}</span><span className="blog-index-category">{post.category}</span></div>
                <h3><a href={`/${locale}/blog/${post.slug}/`}>{post.title}</a></h3>
                <p className="blog-index-description">{post.description}</p>
                <div className="blog-index-card-foot">
                  <span><Clock3 size={14} aria-hidden="true" />{post.readingTime}</span>
                  <time dateTime={post.publishedAt}>{new Date(`${post.publishedAt}T00:00:00Z`).toLocaleDateString(locale === "ro" ? "ro-MD" : "ru-MD", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</time>
                  <a href={`/${locale}/blog/${post.slug}/`} aria-label={`${copy.read}: ${post.title}`}><ArrowRight size={17} aria-hidden="true" /></a>
                </div>
              </article>
            ))}
          </div>
          <aside className="blog-index-cta"><div><p>{copy.test}</p><a href={`/${locale}/test-auditiv/`}>{copy.testLink}<ArrowRight size={16} aria-hidden="true" /></a></div><span><BookOpen aria-hidden="true" /></span></aside>
        </section>
      </main>
    </>
  );
}
