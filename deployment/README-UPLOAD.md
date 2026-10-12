# Deployment Volmer pe IPHost cPanel / Passenger

Aplicația rulează ca Next.js server-side (nu static export). API-urile de programări și lead-uri necesită runtime Node.js. Nu folosi directorul `out/`, arhiva veche `volmer-static-site.zip`, `npm start` pe hosting sau un server custom.

## 1. Pregătește pachetul local

Din rădăcina proiectului, cu Node.js 22+ și dependențele instalate:

```bash
npm ci
npm run build
npm run deployment:prepare
```

Scriptul copiază output-ul Next standalone generat în `.next/standalone/`, apoi adaugă `public/` și `.next/static/` în locurile în care serverul standalone Next le servește automat. Verifică fișierele necesare și refuză pachetul dacă detectează fișiere `.env`, credențiale sau chei private. Nu suprascrie automat un director `deployment/volmer-app/` existent; mută-l într-o locație sigură înainte de o nouă pregătire.

Directorul rezultat pentru upload este:

```text
deployment/volmer-app/
├── server.js             # generat de Next.js standalone; nu îl edita
├── package.json          # generat de Next.js
├── node_modules/         # dependențele runtime urmărite de Next.js
├── public/               # asset-urile publice ale site-ului (fără public/.htaccess static vechi)
└── .next/                # serverul Next, static/, build manifest și output runtime
```

Încarcă **conținutul** lui `deployment/volmer-app/` în:
`/home/volmermd/volmer-app/`. Păstrează inclusiv directorul ascuns `.next/`. Nu încărca proiectul-sursă, `out/`, `.env*`, `.git/`, arhiva statică veche sau fișierele Google de service account.

## 2. Configurează cPanel

În **cPanel → Setup Node.js App** creează/editează aplicația cu:

- Node.js version: `22.23.2`
- Application mode: `Production`
- Application root: `volmer-app`
- Application URL: domeniul `volmer.md`, path gol (`/`)
- Application startup file: `server.js`

Acesta trebuie să fie `server.js` generat în `.next/standalone/` și plasat în rădăcina aplicației. Nu crea un Passenger/custom server. Next standalone citește variabilele `PORT` și `HOSTNAME` din mediul procesului; nu seta port sau host hardcodat. Dacă Passenger nu pornește acest entry point ori nu furnizează interfața/portul așteptat, oprește configurarea și confirmă mecanismul suportat cu IPHost; nu înlocui entry point-ul Next cu un workaround.

**Compatibilitate Passenger de confirmat la IPHost:** documentația cPanel descrie `app.js` ca fișier implicit și menționează configurarea `PassengerStartupFile` pentru alt nume de entry point. Interfața IPHost trebuie deci să accepte `server.js` sau furnizorul să confirme că îl înregistrează pentru Passenger. Pachetul a fost testat ca proces Node autonom; asta nu validează integrarea Passenger specifică hostingului.

Înregistrează logul Passenger unde este disponibil:
`/home/volmermd/logs/passenger.log`.

## 3. Environment variables

Introdu valorile în interfața **Setup Node.js App → Environment variables**. Nu pune secrete în repository, în pachet sau în variabile `NEXT_PUBLIC_*`.

### Required pentru funcțiile corespunzătoare

- `NODE_ENV=production` — selectează și Application mode `Production` în cPanel.
- `NEXT_PUBLIC_SITE_URL=https://volmer.md` — URL-ul public folosit pentru canonical, hreflang, sitemap și structured data.
- `GOOGLE_CALENDAR_ID` — ID-ul calendarului folosit de programări.
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` — emailul contului de serviciu partajat cu calendarul.
- `GOOGLE_PRIVATE_KEY` — cheia privată a service account-ului.
- `TELEGRAM_BOT_TOKEN` — tokenul secret primit de la BotFather.
- `TELEGRAM_CHAT_ID` — ID-ul grupului Telegram în care intră notificările; pentru grupuri și supergrupuri este de regulă negativ.

Fără cele trei variabile Google, aplicația poate porni, dar disponibilitatea și crearea programărilor vor răspunde cu eroare de configurare. `GOOGLE_PRIVATE_KEY` poate fi introdusă ca un singur string cu newline-urile reprezentate literal prin `\n`; aplicația le transformă la runtime în newline-uri reale. Nu adăuga ghilimele suplimentare în jurul valorii decât dacă UI-ul cPanel le cere explicit.

Botul Telegram trebuie adăugat în grup și trebuie să poată trimite mesaje. Dacă variabilele Telegram lipsesc sau Telegram nu răspunde, programarea rămâne salvată în Google Calendar; eroarea notificării apare numai în logul serverului. După modificarea variabilelor, repornește aplicația.

### Optional / viitor

- `VOLMER_LEAD_WEBHOOK_URL` și `VOLMER_LEAD_WEBHOOK_TOKEN` — se configurează împreună numai când destinația de lead este pregătită; tokenul este secret și trebuie să rămână server-side.
- `NEXT_PUBLIC_TELEGRAM_USERNAME` — username Telegram public, fără `@`; în lipsă se folosește linkul Telegram bazat pe numărul public al companiei, sub rezerva setărilor de confidențialitate Telegram.
- `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` — URL embed opțional pentru hartă.
- `NEXT_PUBLIC_GOOGLE_MAPS_DIRECTIONS_URL` — link opțional pentru indicații; există fallback în cod.

Durata programării este în prezent configurată în cod la 60 de minute; `APPOINTMENT_DURATION_MINUTES` nu este citită de aplicație și nu trebuie setată cu presupunerea că schimbă durata.

## 4. Restart

După upload sau schimbarea variabilelor, folosește acțiunea **Restart** din interfața **Setup Node.js App**, dacă este disponibilă pentru aplicație. Nu presupune existența unei comenzi shell cPanel care nu este documentată de IPHost. Verifică statusul aplicației și Passenger log după restart.

## 5. Checklist după deployment

Deschide și verifică:

- <https://volmer.md/>
- <https://volmer.md/ro/>
- <https://volmer.md/ru/>
- <https://volmer.md/ro/contact/>
- <https://volmer.md/ru/contact/>
- <https://volmer.md/ro/aparate-auditive/>
- <https://volmer.md/sitemap.xml>
- <https://volmer.md/robots.txt>

Verifică în browser/network și în cPanel:

- CSS, JS din `/_next/static/...`, logo și imagini din `/images/...` se încarcă fără 404;
- schimbarea RO/RU păstrează pagina echivalentă;
- redirecturile vechi folosesc destinația corectă;
- pagina 404 răspunde corect;
- bannerul de consent apare și Google Maps rămâne blocată până la consimțământ;
- GTM se încarcă după Consent Mode;
- endpointul de disponibilitate (`GET /api/appointments/availability?month=YYYY-MM`) răspunde cu intervale când credentialele Google sunt configurate;
- contactul și formularul lead se comportă potrivit configurației destinației.

Nu trimite o programare reală în calendarul de producție în timpul testelor locale. Pentru testarea post-deploy a creării evenimentului, coordonează un interval dedicat și verifică apoi evenimentul în calendar.

## 6. Ce nu se încarcă

Nu încărca `.env`, `.env.local`, `.env.development.local`, `.env.production.local`, chei JSON Google, chei private, tokens, `.git/`, teste locale sau output-ul static vechi. Secretele se introduc doar prin Environment variables din cPanel.
