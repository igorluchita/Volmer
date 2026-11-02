import {readFile} from 'node:fs/promises';

const expectedPath = new URL('../.next/server/app/sitemap.xml.body', import.meta.url);
const expectedXml = await readFile(expectedPath, 'utf8');
const endpoint = 'https://volmer.md/sitemap.xml';
const response = await fetch(endpoint, {
  headers: {'Accept': 'application/xml'},
  redirect: 'manual',
  signal: AbortSignal.timeout(20_000),
});

if (response.status !== 200) {
  throw new Error(`Sitemapul public răspunde cu HTTP ${response.status}, nu 200.`);
}

const liveXml = await response.text();
const urls = (xml) => [...xml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map((match) => match[1]);
const expected = urls(expectedXml);
const live = urls(liveXml);
const expectedSet = new Set(expected);
const liveSet = new Set(live);
const missing = expected.filter((url) => !liveSet.has(url));
const extra = live.filter((url) => !expectedSet.has(url));

console.log(`Sitemap build: ${expected.length} URL-uri; sitemap public: ${live.length} URL-uri.`);
if (response.headers.has('last-modified')) {
  console.log(`Last-Modified public: ${response.headers.get('last-modified')}`);
}
if (missing.length || extra.length || live.length !== liveSet.size || expected.length !== expectedSet.size) {
  for (const url of missing) console.error(`Lipsește din public: ${url}`);
  for (const url of extra) console.error(`În plus în public: ${url}`);
  if (live.length !== liveSet.size) console.error('Sitemapul public conține URL-uri duplicate.');
  if (expected.length !== expectedSet.size) console.error('Sitemapul generat local conține URL-uri duplicate.');
  process.exitCode = 1;
} else {
  console.log('Sitemapul public corespunde exact buildului local.');
}
