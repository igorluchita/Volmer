import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { blogPosts, type Locale } from "@/content/seo";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import {editorialPath} from '@/content/editorial-routing';
import {PageFeatureHero} from '@/components/page-feature-hero';

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
    ? { eyebrow: "VOLMER · JURNALUL AUZULUI", title: "Înțelegeți mai bine auzul. Alegeți informat.", lead: "Ghiduri clare și practice despre auz, tehnologii auditive și folosirea aparatelor în viața de zi cu zi.", browse: "Vedeți articolele", list: "Articole și ghiduri", read: "Citiți articolul", test: "Aveți întrebări despre auz?", testLink: "Aflați cum decurge evaluarea auzului" }
    : { eyebrow: "VOLMER · ЖУРНАЛ О СЛУХЕ", title: "Лучше понимать слух. Выбирать осознанно.", lead: "Понятные и практичные материалы о слухе, технологиях и использовании аппаратов в повседневной жизни.", browse: "Смотреть статьи", list: "Статьи и руководства", read: "Читать статью", test: "Есть вопросы о слухе?", testLink: "Узнайте, как проходит проверка слуха" };
  return (
    <>
      <Breadcrumbs
        locale={locale}
        label={locale === "ro" ? "Blog" : "Блог"}
        path="blog"
      />
      <div className="blog-index-page">
        <PageFeatureHero
          eyebrow={copy.eyebrow}
          title={copy.title}
          lead={copy.lead}
          benefits={locale === 'ru'
            ? [`${posts.length} статей и руководств`, 'Материалы о слухе и технологиях', 'Практические советы на каждый день']
            : [`${posts.length} articole și ghiduri`, 'Materiale despre auz și tehnologii auditive', 'Sfaturi practice pentru fiecare zi']}
          image="/images/homepage/hero.webp"
          imageAlt={locale === 'ru' ? 'Семья разговаривает дома' : 'O familie stă de vorbă acasă'}
          imageBadge={locale === 'ru' ? 'VOLMER · СЛУХ' : 'VOLMER · AUZ'}
          cardEyebrow={locale === 'ru' ? 'ЖУРНАЛ О СЛУХЕ' : 'JURNALUL AUZULUI'}
          cardTitle={locale === 'ru' ? 'Выбирайте, опираясь на понятную информацию' : 'Alegeți informat, cu explicații clare'}
          primaryHref="#blog-articles"
          primaryLabel={copy.browse}
          primaryIcon="down"
          secondaryHref={editorialPath(locale, 'test')}
          secondaryLabel={copy.testLink}
        />

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
          <aside className="blog-index-cta"><div><p>{copy.test}</p><a href={editorialPath(locale, 'test')}>{copy.testLink}<ArrowRight size={16} aria-hidden="true" /></a></div><span><BookOpen aria-hidden="true" /></span></aside>
        </section>
      </div>
    </>
  );
}
