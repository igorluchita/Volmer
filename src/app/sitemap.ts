import type {MetadataRoute} from 'next';
import {siteConfig} from '@/config/site';
import {blogPosts, seoPages, type Locale} from '@/content/seo';
export const dynamic = 'force-static';

const pages = ['', 'aparate-auditive', 'test-auditiv', 'servicii', 'despre-noi', 'intrebari-frecvente', 'contact', 'programare'];
export default function sitemap(): MetadataRoute.Sitemap {
  const base = pages.flatMap(page => ['ro','ru'].map(locale => ({url:`${siteConfig.siteUrl}/${locale}/${page ? `${page}/` : ''}`, alternates:{languages:{'ro-MD':`${siteConfig.siteUrl}/ro/${page ? `${page}/` : ''}`,'ru-MD':`${siteConfig.siteUrl}/ru/${page ? `${page}/` : ''}`,'x-default':`${siteConfig.siteUrl}/ro/${page ? `${page}/` : ''}`}}})));
  const seo = (['ro','ru'] as Locale[]).flatMap(locale=>seoPages[locale].map(page=>({url:`${siteConfig.siteUrl}/${locale}/${page[0]}/`})));
  const blog = (['ro','ru'] as Locale[]).flatMap(locale=>[{url:`${siteConfig.siteUrl}/${locale}/blog/`},...blogPosts[locale].map(post=>({url:`${siteConfig.siteUrl}/${locale}/blog/${post.slug}/`,lastModified:post.updatedAt}))]);
  return [...base,...seo,...blog];
}
