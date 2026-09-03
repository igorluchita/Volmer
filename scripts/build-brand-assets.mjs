import {rename} from 'node:fs/promises';
import sharp from 'sharp';

const source = 'public/logo-volmer-clean.png';
const temporaryLogo = 'public/logo-volmer-complete.tmp.png';
const logoWidth = 1370;
const logoHeight = 358;

const marks = Buffer.from(`<svg width="127" height="358" viewBox="0 0 127 358" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="blue" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0878ee"/>
      <stop offset="1" stop-color="#0754bd"/>
    </linearGradient>
  </defs>
  <g transform="translate(2 275) skewX(-8)" fill="url(#blue)" stroke="#061d42" stroke-width="2">
    <rect x="0" y="0" width="29" height="48" rx="4"/>
    <rect x="42" y="0" width="29" height="48" rx="4"/>
    <rect x="84" y="0" width="29" height="48" rx="4"/>
  </g>
</svg>`);

await sharp({create:{width:logoWidth,height:logoHeight,channels:4,background:{r:0,g:0,b:0,alpha:0}}})
  .composite([{input:source,left:0,top:0},{input:marks,left:1243,top:0}])
  .png()
  .toFile(temporaryLogo);
await rename(temporaryLogo, source);

const faviconLogo = await sharp(source)
  .resize({width:472,height:472,fit:'inside',withoutEnlargement:false})
  .png()
  .toBuffer();
const faviconMeta = await sharp(faviconLogo).metadata();
await sharp({create:{width:512,height:512,channels:4,background:{r:255,g:255,b:255,alpha:0}}})
  .composite([{input:faviconLogo,left:20,top:Math.round((512-(faviconMeta.height ?? 0))/2)}])
  .png()
  .toFile('public/favicon.png');
