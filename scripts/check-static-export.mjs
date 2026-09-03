import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import {join, relative} from 'node:path';

const root = new URL('../out/', import.meta.url).pathname;
const required = ['index.html','404.html','_next','ro/index.html','ru/index.html','ro/aparate-auditive/index.html','ru/aparate-auditive/index.html','ro/test-auditiv/index.html','ru/test-auditiv/index.html','ro/servicii/index.html','ru/servicii/index.html','ro/despre-noi/index.html','ru/despre-noi/index.html','ro/intrebari-frecvente/index.html','ru/intrebari-frecvente/index.html','ro/contact/index.html','ru/contact/index.html'];
const errors = [];
if (!existsSync(root)) errors.push('Directorul out lipsește. Rulează npm run build.');
for (const path of required) if (!existsSync(join(root,path))) errors.push(`Lipsește ${path}`);

function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(join(dir,entry.name)):[join(dir,entry.name)]);}
if (existsSync(root)) {
  const files = walk(root);
  const textFiles = files.filter(file=>/\.(html|js|css|xml|txt|json)$/.test(file));
  const forbidden = [/https?:\/\/localhost(?::\d+)?/i,/\/api\//i,/googleapis/i,/google calendar/i,/GOOGLE_PRIVATE_KEY/i,/BEGIN PRIVATE KEY/i,/selectează un interval/i,/выбрать время/i];
  for (const file of textFiles) {const body=readFileSync(file,'utf8');for(const pattern of forbidden)if(pattern.test(body))errors.push(`${relative(root,file)} conține ${pattern}`);}
  for (const file of files) if (/\.env(?:\.|$)|\.map$/.test(file)) errors.push(`Fișier interzis: ${relative(root,file)}`);
  for (const file of textFiles.filter(file=>file.endsWith('.html'))) {const body=readFileSync(file,'utf8');for(const match of body.matchAll(/(?:src|href)="(\/[^"?#]+)"/g)){const url=match[1];if(url.startsWith('/_next/')||url.startsWith('/images/')||/\.(png|svg|webp|jpg|jpeg|ico)$/.test(url)){const local=join(root,url);if(!existsSync(local))errors.push(`${relative(root,file)} referă asset inexistent: ${url}`);}}}
}
if (errors.length){console.error(errors.join('\n'));process.exit(1);}console.log('Static export valid: rutele, asset-urile și verificările de securitate au trecut.');
