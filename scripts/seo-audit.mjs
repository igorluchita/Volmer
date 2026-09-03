import {readdir,readFile,stat} from 'node:fs/promises';
import {join,relative,resolve} from 'node:path';

const out=resolve('out');
async function walk(dir){const files=[];for(const name of await readdir(dir)){const path=join(dir,name);(await stat(path)).isDirectory()?files.push(...await walk(path)):files.push(path)}return files}
const htmlFiles=(await walk(out)).filter(file=>file.endsWith('.html')&&!file.endsWith('404.html')&&!file.includes('/404/')&&!file.includes('_not-found'));
const errors=[];const titles=new Map();const descriptions=new Map();
const routeFor=file=>'/'+relative(out,file).replace(/index\.html$/,'').replace(/\.html$/,'');
const existsRoute=route=>{const clean=route.split(/[?#]/)[0];if(!clean.startsWith('/'))return true;return htmlFiles.some(file=>routeFor(file)===clean||routeFor(file)===`${clean}/`)};
for(const file of htmlFiles){
  const html=await readFile(file,'utf8');const route=routeFor(file);if(route==='/')continue;
  const title=html.match(/<title>(.*?)<\/title>/s)?.[1];const description=html.match(/<meta name="description" content="(.*?)"/s)?.[1];const canon=html.match(/<link rel="canonical" href="(.*?)"/s)?.[1];const h1=(html.match(/<h1[ >]/g)||[]).length;
  if(!title)errors.push(`${route}: title lipsă`);if(!description)errors.push(`${route}: description lipsă`);if(!canon)errors.push(`${route}: canonical lipsă`);if(h1!==1)errors.push(`${route}: ${h1} elemente H1`);if(!html.includes('hrefLang="ro-MD"')&&!html.includes('hrefLang="ru-MD"'))errors.push(`${route}: hreflang lipsă`);if(/localhost/i.test(html))errors.push(`${route}: conține localhost`);
  for(const img of html.matchAll(/<img\b[^>]*>/g))if(!/\balt="[^"]+"/.test(img[0]))errors.push(`${route}: imagine fără alt`);
  for(const link of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)){const href=link[1];if(href.startsWith('/')&&!href.startsWith('/_next/')&&!existsRoute(href))errors.push(`${route}: link intern rupt ${href}`)}
  if(title){const list=titles.get(title)||[];list.push(route);titles.set(title,list)}if(description){const list=descriptions.get(description)||[];list.push(route);descriptions.set(description,list)}
}
for(const [title,routes] of titles)if(routes.length>2)errors.push(`title duplicat: ${title} (${routes.join(', ')})`);
for(const [description,routes] of descriptions)if(routes.length>2)errors.push(`description duplicată (${routes.join(', ')})`);
const sitemap=await readFile(join(out,'sitemap.xml'),'utf8');for(const file of htmlFiles){const route=routeFor(file);if(route!=='/'&&!sitemap.includes(route))errors.push(`${route}: lipsește din sitemap`)}
if(errors.length){console.error(`SEO audit eșuat (${errors.length}):\n${errors.join('\n')}`);process.exit(1)}
console.log(`SEO audit valid: ${htmlFiles.length-1} pagini publice verificate.`);
