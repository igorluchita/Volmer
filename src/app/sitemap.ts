import type { MetadataRoute } from "next";
import { siteConfig } from "../config/site";
import { blogPosts, seoPages } from "../content/seo";
import {legalPath, legalTypes} from '../content/legal-pages';
import {editorialPath, editorialTypes} from '../content/editorial-pages';
export const dynamic = "force-static";
const canonicalOrigin = "https://volmer.md";

const pages = [
  "",
  "aparate-auditive",
];
export default function sitemap(): MetadataRoute.Sitemap {
  const configuredOrigin = new URL(siteConfig.siteUrl);
  if (configuredOrigin.origin !== canonicalOrigin || configuredOrigin.pathname !== "/" || configuredOrigin.search || configuredOrigin.hash) {
    throw new Error(`Sitemap site URL must use ${canonicalOrigin}.`);
  }
  const siteUrl = canonicalOrigin;
  if (seoPages.ro.length !== seoPages.ru.length || blogPosts.ro.length !== blogPosts.ru.length) {
    throw new Error("Sitemap translation inventories must have matching RO/RU pairs.");
  }
  const base = pages.flatMap((page) =>
    ["ro", "ru"].map((locale) => ({
      url: `${siteUrl}/${locale}/${page ? `${page}/` : ""}`,
      alternates: {
        languages: {
          "ro-MD": `${siteUrl}/ro/${page ? `${page}/` : ""}`,
          "ru-MD": `${siteUrl}/ru/${page ? `${page}/` : ""}`,
          "x-default": `${siteUrl}/ro/${page ? `${page}/` : ""}`,
        },
      },
    })),
  );
  const seo = seoPages.ro.flatMap((page, index) => {
    const ro = `${siteUrl}/ro/${page[0]}/`;
    const ru = `${siteUrl}/ru/${seoPages.ru[index][0]}/`;
    const alternates = {
      languages: { "ro-MD": ro, "ru-MD": ru, "x-default": ro },
    };
    return [
      { url: ro, alternates },
      { url: ru, alternates },
    ];
  });
  const blogIndexRo = `${siteUrl}/ro/blog/`;
  const blogIndexRu = `${siteUrl}/ru/blog/`;
  const blogIndexAlternates = {
    languages: {
      "ro-MD": blogIndexRo,
      "ru-MD": blogIndexRu,
      "x-default": blogIndexRo,
    },
  };
  const blogArticles = blogPosts.ro.flatMap((post, index) => {
    const translated = blogPosts.ru[index];
    const ro = `${siteUrl}/ro/blog/${post.slug}/`;
    const ru = `${siteUrl}/ru/blog/${translated.slug}/`;
    const alternates = {
      languages: { "ro-MD": ro, "ru-MD": ru, "x-default": ro },
    };
    return [
      { url: ro, alternates },
      { url: ru, alternates },
    ];
  });
  const blog = [
    { url: blogIndexRo, alternates: blogIndexAlternates },
    { url: blogIndexRu, alternates: blogIndexAlternates },
    ...blogArticles,
  ];
  const legal = legalTypes.flatMap((type) => {
    const ro = `${siteUrl}${legalPath('ro', type)}`;
    const ru = `${siteUrl}${legalPath('ru', type)}`;
    const alternates = {languages: {'ro-MD': ro, 'ru-MD': ru, 'x-default': ro}};
    return [{url: ro, alternates}, {url: ru, alternates}];
  });
  const editorial = editorialTypes.flatMap((type) => {
    const ro = `${siteUrl}${editorialPath('ro', type)}`;
    const ru = `${siteUrl}${editorialPath('ru', type)}`;
    const alternates = {languages: {'ro-MD': ro, 'ru-MD': ru, 'x-default': ro}};
    return [{url: ro, alternates}, {url: ru, alternates}];
  });
  const entries = [...base, ...seo, ...blog, ...legal, ...editorial];
  const urls = new Set(entries.map(({url}) => url));

  if (urls.size !== entries.length) {
    throw new Error('Sitemap contains duplicate URLs.');
  }

  for (const entry of entries) {
    const parsedUrl = new URL(entry.url);
    const path = parsedUrl.pathname;
    if (parsedUrl.origin !== canonicalOrigin || parsedUrl.protocol !== "https:" || !path.endsWith('/') || parsedUrl.search || parsedUrl.hash || parsedUrl.username || parsedUrl.password) {
      throw new Error(`Sitemap URL is not canonical: ${entry.url}`);
    }
    for (const [language, alternate] of Object.entries(entry.alternates?.languages ?? {})) {
      if (!urls.has(alternate)) {
        throw new Error(`Sitemap ${language} alternate is not an active URL: ${alternate}`);
      }
    }
    const locale = path.split("/")[1];
    if (locale !== "ro" && locale !== "ru") throw new Error(`Sitemap URL has unsupported locale: ${entry.url}`);
    const peerLocale = locale === "ro" ? "ru" : "ro";
    const peerUrl = `${canonicalOrigin}${path.replace(/^\/(ro|ru)\//, `/${peerLocale}/`)}`;
    const expectedRomanian = locale === "ro" ? entry.url : peerUrl;
    const expectedRussian = locale === "ru" ? entry.url : peerUrl;
    const languages = entry.alternates?.languages;
    if (languages?.["ro-MD"] !== expectedRomanian || languages?.["ru-MD"] !== expectedRussian || languages?.["x-default"] !== expectedRomanian || !urls.has(peerUrl)) {
      throw new Error(`Sitemap hreflang pair is invalid: ${entry.url}`);
    }
  }

  return entries;
}
