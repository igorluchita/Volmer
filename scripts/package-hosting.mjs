import {createWriteStream, existsSync, readdirSync, statSync, copyFileSync, mkdirSync, unlinkSync} from 'node:fs';
import {join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {ZipArchive} from 'archiver';

const project = new URL('../', import.meta.url).pathname;
const out = join(project,'out');
const deployment = join(project,'deployment');
const zipPath = join(deployment,'volmer-static-site.zip');
const run = spawnSync(process.platform==='win32'?'npm.cmd':'npm',['run','build'],{cwd:project,stdio:'inherit'});
if(run.status!==0)process.exit(run.status??1);
if(!existsSync(join(out,'index.html')))throw new Error('out/index.html lipsește.');
copyFileSync(join(deployment,'.htaccess'),join(out,'.htaccess'));
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(join(dir,entry.name)):[join(dir,entry.name)]);}
const files=walk(out).map(path=>({path,size:statSync(path).size}));const total=files.reduce((sum,file)=>sum+file.size,0);
console.log(`Dimensiune totală: ${(total/1024/1024).toFixed(2)} MB`);console.log(`Număr fișiere: ${files.length}`);console.log('Cele mai mari 20 de fișiere:');for(const file of [...files].sort((a,b)=>b.size-a.size).slice(0,20))console.log(`${(file.size/1024/1024).toFixed(2)} MB  ${relative(out,file.path)}`);
if(total>750*1024*1024)console.warn('WARNING: directorul out depășește 750 MB.');if(total>900*1024*1024)throw new Error('Împachetarea este blocată peste 900 MB.');if(files.length>60000)console.warn('WARNING: peste 60.000 de fișiere.');for(const file of files.filter(f=>/\.(png|jpe?g|webp|avif|svg)$/i.test(f.path)&&f.size>1024*1024))console.warn(`WARNING imagine >1 MB: ${relative(out,file.path)}`);
mkdirSync(deployment,{recursive:true});if(existsSync(zipPath))unlinkSync(zipPath);
await new Promise((resolve,reject)=>{const output=createWriteStream(zipPath);const archive=new ZipArchive({zlib:{level:9}});output.on('close',resolve);archive.on('error',reject);archive.pipe(output);archive.directory(out,false);archive.finalize();});
console.log(`Arhivă creată: ${zipPath}`);
