import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const siteUrl = "https://volmer.md";
const out = resolve(".next/server/app");
async function walk(dir) {
  const files = [];
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    (await stat(path)).isDirectory()
      ? files.push(...(await walk(path)))
      : files.push(path);
  }
  return files;
}
const allFiles = await walk(out);
const htmlFiles = allFiles.filter(
    (file) =>
      file.endsWith(".html") &&
      !file.endsWith("404.html") &&
      !file.includes("/404/") &&
      !file.includes("_not-found") &&
      !file.includes("_global-error"),
);
const errors = [];
const warnings = [];
const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();
const records = new Map();
const decode = (value) =>
  value
    ?.replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
const routeFor = (file) =>
  (() => {
    const route = relative(out, file)
      .replace(/index\.html$/, "")
      .replace(/\.html$/, "");
    return route ? `/${route.replace(/\/?$/, "/")}` : "/";
  })();
const add = (map, key, route) => {
  if (!key) return;
  const list = map.get(key) || [];
  list.push(route);
  map.set(key, list);
};
const existsRoute = (route) => {
  const clean = route.split(/[?#]/)[0];
  if (!clean.startsWith("/")) return true;
  const normalized = clean.endsWith("/") ? clean : `${clean}/`;
  return htmlFiles.some((file) => routeFor(file) === normalized);
};
const meta = (html, property, value) =>
  decode(
    html
      .match(
        new RegExp(
          `<meta[^>]+${property}="${value}"[^>]+content="([^"]*)"|<meta[^>]+content="([^"]*)"[^>]+${property}="${value}"`,
          "i",
        ),
      )
      ?.slice(1)
      .find(Boolean),
  );
const link = (html, rel) =>
  decode(
    html
      .match(
        new RegExp(
          `<link[^>]+rel="${rel}"[^>]+href="([^"]+)"|<link[^>]+href="([^"]+)"[^>]+rel="${rel}"`,
          "i",
        ),
      )
      ?.slice(1)
      .find(Boolean),
  );

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const route = routeFor(file);
  if (route === "/") continue;
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1]);
  const description = meta(html, "name", "description");
  const robots = meta(html, "name", "robots") || "";
  const canonical = link(html, "canonical");
  const h1 = (html.match(/<h1[ >]/gi) || []).length;
  const headingLevels = [...html.matchAll(/<h([1-6])\b/gi)].map((match) =>
    Number(match[1]),
  );
  const language =
    html.match(/<div[^>]+lang="(ro|ru)"/i)?.[1] ||
    html.match(/<html[^>]+lang="(ro|ru)"/i)?.[1];
  const alternates = {};
  for (const tag of html.matchAll(/<link\b[^>]*rel="alternate"[^>]*>/gi)) {
    const hreflang = tag[0].match(/hrefLang="([^"]+)"/i)?.[1];
    const href = decode(tag[0].match(/href="([^"]+)"/i)?.[1]);
    if (hreflang && href) alternates[hreflang] = href;
  }
  const isLeadThankYou = /^\/(ro|ru)\/multumim\/$/.test(route);
  if (isLeadThankYou) {
    if (!/\bnoindex\b/i.test(robots) || !/\bfollow\b/i.test(robots))
      errors.push(`${route}: pagina thank-you trebuie să fie noindex, follow`);
    if (!title) errors.push(`${route}: title lipsă`);
    if (!description) errors.push(`${route}: description lipsă`);
    if (canonical !== `${siteUrl}${route}`)
      errors.push(`${route}: canonical incorect (${canonical || "lipsește"})`);
    if (h1 !== 1) errors.push(`${route}: ${h1} elemente H1`);
    if (language !== (route.startsWith("/ru/") ? "ru" : "ro"))
      errors.push(`${route}: limba documentului incorectă (${language || "lipsește"})`);
    continue;
  }
  records.set(`${siteUrl}${route}`, { route, alternates, language });
  if (!title) errors.push(`${route}: title lipsă`);
  if (!description) errors.push(`${route}: description lipsă`);
  if (canonical !== `${siteUrl}${route}`)
    errors.push(`${route}: canonical incorect (${canonical || "lipsește"})`);
  if (h1 !== 1) errors.push(`${route}: ${h1} elemente H1`);
  for (let index = 1; index < headingLevels.length; index++)
    if (headingLevels[index] > headingLevels[index - 1] + 1)
      errors.push(
        `${route}: salt în ierarhia heading H${headingLevels[index - 1]} → H${headingLevels[index]}`,
      );
  if (language !== (route.startsWith("/ru/") ? "ru" : "ro"))
    errors.push(`${route}: limba documentului incorectă (${language || "lipsește"})`);
  for (const code of ["ro-MD", "ru-MD", "x-default"])
    if (!alternates[code]) errors.push(`${route}: hreflang ${code} lipsește`);
  const ogTitle = meta(html, "property", "og:title"),
    ogDescription = meta(html, "property", "og:description"),
    ogUrl = meta(html, "property", "og:url"),
    ogType = meta(html, "property", "og:type"),
    ogImage = meta(html, "property", "og:image"),
    ogLocale = meta(html, "property", "og:locale");
  if (!ogTitle || !ogDescription || !ogType || !ogImage)
    errors.push(`${route}: Open Graph incomplet`);
  if (ogUrl !== `${siteUrl}${route}`)
    errors.push(`${route}: og:url incorect (${ogUrl || "lipsește"})`);
  if (ogLocale !== (language === "ro" ? "ro_MD" : "ru_MD"))
    errors.push(`${route}: og:locale incorect (${ogLocale || "lipsește"})`);
  if (
    !meta(html, "name", "twitter:card") ||
    !meta(html, "name", "twitter:title") ||
    !meta(html, "name", "twitter:description")
  )
    errors.push(`${route}: Twitter Card incomplet`);
  if (/\bnoindex\b/i.test(robots))
    errors.push(`${route}: noindex accidental`);
  if (/localhost|example\.md/i.test(html))
    errors.push(`${route}: domeniu de test prezent`);
  if (!(html.match(/<a\b[^>]*href="\//g) || []).length)
    errors.push(`${route}: fără linkuri interne`);
  for (const img of html.matchAll(/<img\b[^>]*>/gi))
    if (!/\balt="[^"]+"/.test(img[0]))
      errors.push(`${route}: imagine fără alt`);
  const structuredTypes = new Set();
  for (const script of html.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
  )) {
    try {
      const parsed = JSON.parse(script[1]);
      const collect = (value) => {
        if (!value || typeof value !== "object") return;
        if (typeof value["@type"] === "string")
          structuredTypes.add(value["@type"]);
        for (const child of Object.values(value))
          if (typeof child === "object") collect(child);
      };
      collect(parsed);
    } catch {
      errors.push(`${route}: JSON-LD invalid`);
    }
  }
  if (/^\/(ro|ru)\/blog\/[^/]+\/$/.test(route))
    for (const type of ["BlogPosting", "BreadcrumbList"])
      if (!structuredTypes.has(type))
        errors.push(`${route}: schema ${type} lipsește`);
  for (const anchor of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
    const href = decode(anchor[1]);
    if (href.startsWith("/") && !href.startsWith("/_next/")) {
      if (!existsRoute(href)) errors.push(`${route}: link intern rupt ${href}`);
      const clean = href.split(/[?#]/)[0];
      if (clean !== "/" && !clean.endsWith("/") && !/\.[a-z0-9]+$/i.test(clean))
        errors.push(`${route}: link fără trailing slash ${href}`);
    }
  }
  add(titles, title, route);
  add(descriptions, description, route);
  add(canonicals, canonical, route);
}
for (const [value, routes] of titles)
  if (routes.length > 1)
    errors.push(`title duplicat: ${value} (${routes.join(", ")})`);
for (const [, routes] of descriptions)
  if (routes.length > 1)
    errors.push(`description duplicată (${routes.join(", ")})`);
for (const [value, routes] of canonicals)
  if (routes.length > 1)
    errors.push(`canonical duplicat: ${value} (${routes.join(", ")})`);
for (const [url, record] of records) {
  const pairedRoute = record.route.replace(/^\/(ro|ru)\//, (_, locale) => locale === 'ro' ? '/ru/' : '/ro/');
  const pairedUrl = `${siteUrl}${pairedRoute}`;
  if (!records.has(pairedUrl)) errors.push(`${record.route}: pagina pereche RO/RU cu același slug lipsește`);
  const roUrl = `${siteUrl}${record.route.replace(/^\/ru\//, '/ro/')}`;
  const ruUrl = `${siteUrl}${record.route.replace(/^\/ro\//, '/ru/')}`;
  if (record.alternates['ro-MD'] !== roUrl || record.alternates['ru-MD'] !== ruUrl || record.alternates['x-default'] !== roUrl)
    errors.push(`${record.route}: hreflang nu indică pagina echivalentă cu același slug`);
  for (const [code, target] of Object.entries(record.alternates)) {
    if (code === "x-default") continue;
    const targetRecord = records.get(target);
    if (!targetRecord) {
      errors.push(`${record.route}: hreflang țintă inexistentă ${target}`);
      continue;
    }
    const reciprocalCode = record.language === "ro" ? "ro-MD" : "ru-MD";
    if (targetRecord.alternates[reciprocalCode] !== url)
      errors.push(
        `${record.route}: hreflang nereciproc cu ${targetRecord.route}`,
      );
  }
}

const incomingLinks = new Map([...records.values()].map(({route}) => [route, 0]));
for (const file of htmlFiles) {
  const sourceRoute = routeFor(file);
  const html = await readFile(file, 'utf8');
  for (const anchor of html.matchAll(/<a\b[^>]*href="(\/(?:ro|ru)\/[^"?#]*)/gi)) {
    const target = anchor[1].endsWith('/') ? anchor[1] : `${anchor[1]}/`;
    if (target !== sourceRoute && incomingLinks.has(target)) incomingLinks.set(target, incomingLinks.get(target) + 1);
  }
}
for (const [route, count] of incomingLinks)
  if (count === 0) errors.push(`${route}: pagină orfană, fără link intern de intrare`);

const sitemap = await readFile(join(out, "sitemap.xml.body"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
  decode(match[1]),
);
for (const url of sitemapUrls)
  if (!url.startsWith(`${siteUrl}/`)) errors.push(`sitemap: URL extern ${url}`);
for (const route of ["/ro/multumim/", "/ru/multumim/"])
  if (sitemapUrls.includes(`${siteUrl}${route}`))
    errors.push(`${route}: pagina thank-you noindex nu trebuie să fie în sitemap`);
if (new Set(sitemapUrls).size !== sitemapUrls.length)
  errors.push("sitemap: URL-uri duplicate");
for (const [url, { route }] of records)
  if (!sitemapUrls.includes(url)) errors.push(`${route}: lipsește din sitemap`);
const robots = await readFile(join(out, "robots.txt.body"), "utf8");
if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`))
  errors.push("robots.txt: sitemap incorect");
if (/example\.md|localhost/i.test(sitemap + robots))
  errors.push("sitemap/robots: domeniu nepermis");
const notFound = await readFile(join(out, "_not-found.html"), "utf8");
if (!/noindex/i.test(notFound)) errors.push("pagina 404: noindex lipsește");
for (const href of ["/ro/", "/ro/aparate-auditive/"])
  if (!notFound.includes(`href="${href}"`))
    errors.push(`pagina 404: link lipsă ${href}`);
const publicFiles = await walk(resolve("public"));
for (const file of publicFiles) {
  if (
    (await stat(file)).size > 1024 * 1024 &&
    /\.(avif|gif|jpe?g|png|webp)$/i.test(file)
  )
    warnings.push(`${relative(resolve("public"), file)} depășește 1 MB`);
}

if (errors.length) {
  console.error(`SEO audit eșuat (${errors.length}):\n${errors.join("\n")}`);
  process.exit(1);
}
console.log(
  `SEO audit valid: ${records.size} pagini publice, ${sitemapUrls.length} URL-uri în sitemap.${warnings.length ? `\nAvertismente:\n${warnings.join("\n")}` : ""}`,
);
