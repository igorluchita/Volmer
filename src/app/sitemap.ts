import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { blogPosts, seoPages } from "@/content/seo";
export const dynamic = "force-static";

const pages = [
  "",
  "aparate-auditive",
  "test-auditiv",
  "servicii",
  "despre-noi",
  "intrebari-frecvente",
  "contact",
  "programare",
];
export default function sitemap(): MetadataRoute.Sitemap {
  const base = pages.flatMap((page) =>
    ["ro", "ru"].map((locale) => ({
      url: `${siteConfig.siteUrl}/${locale}/${page ? `${page}/` : ""}`,
      alternates: {
        languages: {
          "ro-MD": `${siteConfig.siteUrl}/ro/${page ? `${page}/` : ""}`,
          "ru-MD": `${siteConfig.siteUrl}/ru/${page ? `${page}/` : ""}`,
          "x-default": `${siteConfig.siteUrl}/ro/${page ? `${page}/` : ""}`,
        },
      },
    })),
  );
  const seo = seoPages.ro.flatMap((page, index) => {
    const ro = `${siteConfig.siteUrl}/ro/${page[0]}/`;
    const ru = `${siteConfig.siteUrl}/ru/${seoPages.ru[index][0]}/`;
    const alternates = {
      languages: { "ro-MD": ro, "ru-MD": ru, "x-default": ro },
    };
    return [
      { url: ro, alternates },
      { url: ru, alternates },
    ];
  });
  const blogIndexRo = `${siteConfig.siteUrl}/ro/blog/`;
  const blogIndexRu = `${siteConfig.siteUrl}/ru/blog/`;
  const blogIndexAlternates = {
    languages: {
      "ro-MD": blogIndexRo,
      "ru-MD": blogIndexRu,
      "x-default": blogIndexRo,
    },
  };
  const blogArticles = blogPosts.ro.flatMap((post, index) => {
    const translated = blogPosts.ru[index];
    const ro = `${siteConfig.siteUrl}/ro/blog/${post.slug}/`;
    const ru = `${siteConfig.siteUrl}/ru/blog/${translated.slug}/`;
    const alternates = {
      languages: { "ro-MD": ro, "ru-MD": ru, "x-default": ro },
    };
    return [
      { url: ro, lastModified: post.updatedAt, alternates },
      { url: ru, lastModified: translated.updatedAt, alternates },
    ];
  });
  const blog = [
    { url: blogIndexRo, alternates: blogIndexAlternates },
    { url: blogIndexRu, alternates: blogIndexAlternates },
    ...blogArticles,
  ];
  return [...base, ...seo, ...blog];
}
