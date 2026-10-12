# Volmer

Website Next.js bilingv (română/rusă) pentru Volmer, rulat ca aplicație Node.js. Programările din homepage sunt confirmate prin Google Calendar.

## Dezvoltare

```bash
npm install
cp .env.example .env.local
npm run dev
```

Datele comerciale se modifică în `src/config/site.ts`, traducerile în `src/messages`, iar imaginile în `public/images`.

## Deployment

Aplicația necesită hosting cu runtime Node.js compatibil cu versiunea Next.js instalată. Rulează `npm run build`, apoi pornește aplicația cu `npm start` (echivalent cu `next start`). Setează domeniul și variabilele de mediu necesare în panoul hostingului; nu publica fișiere `.env`.

`npm run seo:audit` verifică paginile prerenderizate și semnalele SEO generate la build. Pentru programările Google Calendar vezi pașii de configurare din `deployment/README-UPLOAD.md`.
# SEO Local Volmer

După lansare:

1. Creează și verifică Google Business Profile cu numele Volmer, categoria relevantă pentru aparate auditive, adresa, telefonul, programul și website-ul identice cu site-ul. Adaugă fotografii reale, descrierea completă și serviciile oferite.
2. Creează proprietatea Google Search Console, verifică domeniul și trimite `sitemap.xml`. Urmărește rapoartele Pages, Core Web Vitals și Performance, interogările și folosește URL Inspection pentru paginile importante.
3. Confirmă locația și indicațiile în Google Maps.
4. Configurează Bing Places și, opțional, Apple Business Connect.
5. Menține peste tot NAP identic: Volmer, Str. Mitropolit Varlaam 69, Chișinău, 079 331 839.

Nu se creează sau automatizează profilurile locale din cod. Dacă GA4 este activat, se pot măsura fără date personale clickurile pe telefon, email, Google Maps, CTA pentru aparate auditive, vizualizarea articolului și categoria blogului.
