# Catalogul Volmer RO/RU

Datele publice sunt în `src/catalog/data.ts`; momentan includ 4 categorii și 14 produse RO/RU, adăugate din fotografiile furnizate. Prețurile sunt intenționat necompletate. Imaginile optimizate sunt în `public/images/catalog/`, iar manifestul dimensiunilor este `src/catalog/image-assets.ts`. Nu importați datele de test în această sursă.

## Arhitectură

- `types.ts`: Category, Subcategory, Product, ProductImage și traduceri obligatorii RO/RU.
- `repository.ts`: validare, relații și selecția înregistrărilor publicate.
- `query.ts`: filtrare și formatarea prețurilor; `paths.ts`: URL-uri.
- `seo.ts`: metadata, canonical, hreflang și inventarul sitemapului.
- `src/components/catalog`: șabloane server, carduri și grila cu filtre client.
- `src/app/[locale]/catalog`: index static și rute dinamice de categorie/produs cu pre-generarea înregistrărilor publicate.

Rute: `/{locale}/catalog/`, `/{locale}/catalog/{category.slug}/`, `/{locale}/catalog/{category.slug}/{product.slug}/`. Aceleași sluguri stabile se folosesc în ambele limbi. Conținutul și metadata sunt traduse. Subcategoriile sunt filtre, fără rute separate. Un slug de produs este unic în categoria lui; ID-urile sunt unice în fiecare colecție. Nu schimbați slugul după publicare fără o migrare explicită de URL-uri.

## Adăugarea unei categorii

1. Editați `src/catalog/data.ts` și adăugați în `categories` un obiect conform tipului `Category`.
2. Completați `id`, `slug` (litere mici ASCII, cifre și cratimă), `name: {ro, ru}`, `description: {ro, ru}` și `published: false`.
3. Opțional: `order`, `image`, `seo: {title: {ro, ru}, description: {ro, ru}}`.
4. Imaginile se copiază în `public/`; `src` este calea publică începând cu `/`, cu `width`, `height` pozitive și `alt: {ro, ru}` descriptive. Nu folosiți URL-uri externe de imagine fără extinderea explicită a politicii de imagini.
5. Verificați traducerile și setați `published: true`. Categoria apare automat în grid, filtre și sitemap după build/deploy. O categorie publicată fără produse arată starea goală. Categoria absentă sau draft răspunde 404.

O subcategorie se adaugă în `subcategories` cu `id`, `categoryId` existent, `slug`, `name: {ro, ru}`, `description: {ro, ru}`, `published`. Ea apare în filtre când are produse publicate asociate.

## Adăugarea unui produs

1. Adăugați în `products` un obiect conform tipului `Product`, cu `published: false`.
2. Completați `id`, `slug`, `categoryId`, `name: {ro, ru}`, `shortDescription: {ro, ru}`, `description: {ro, ru}`, `images: []`, `specifications: []`, `features: []`.
3. Opțional: `brand`, `model`, `subcategoryId` din aceeași categorie, `price: {amount, currency}`, unde moneda are trei litere majuscule. Fără preț apare textul localizat „Preț la cerere”. Valoarea 0 este acceptată explicit, nu tratată ca lipsă.
4. Pentru fiecare imagine folosiți ProductImage de mai sus. Fără imagini apare un placeholder neutru; nu se inventează fotografie sau specificații.
5. Specificații: `{label: {ro, ru}, value: {ro, ru}}`. Caracteristici: `{ro, ru}`. Descrierile sunt text simplu, cu linii noi; nu HTML.
6. Documente opționale: `documents: [{label: {ro, ru}, href}]`; fișiere în `public/` sau URL HTTPS verificat. Documentele PDF trebuie să fie reale și autorizate pentru publicare.
7. Produse similare: `relatedProductIds` cu ID-uri existente. Dacă lipsește, se aleg maximum patru produse publicate din aceeași categorie. Un array gol dezactivează recomandările.
8. `commercialVerified: true` se setează numai după confirmarea datelor comerciale. Product JSON-LD se emite numai când există un preț real și verificat, inclus într-un `Offer`; produsele cu preț la cerere nu emit Product JSON-LD incomplet. Ofertele publicate folosesc politica Volmer confirmată: disponibil în stoc, ridicare exclusiv din magazin și retur în 15 zile; aceste informații sunt afișate și pe pagina produsului. Nu se declară costuri sau termene de livrare prin curier, taxe/metode de retur, evaluări sau recenzii fără confirmare.
9. Publicați categoria și subcategoria necesare înainte de `published: true` pe produs. Pagina și sitemapul se actualizează la următorul build/deploy.

Filtrele se creează doar din produsele publicate. Catalogul curent folosește categoria, subcategoria și marca; subcategoriile grupează dopurile după utilizare și bateriile după mărime. Intervalele de preț sunt disponibile când există o singură monedă sau după selectarea monedei, pentru a evita compararea sumelor în monede diferite. Păstrați prețul absent până la confirmare; interfața afișează mesajul localizat că prețul va fi adăugat ulterior. Filtrele rămân în memoria paginii, fără URL-uri suplimentare indexabile.

## Verificare înainte de deployment

Rulați `npm run typecheck`, `npm test`, `npm run lint`, `npm run i18n:check`, `npm run build`, `npm run seo:audit`. Verificați în build indexurile RO/RU, 404 pentru ID-uri inexistente, sitemapul și metadata. Pentru conținut nou verificați și vizual pagina la 320, 375, 768, 1024 și 1440 px. Testele cu produse fictive există doar în `src/catalog/catalog.test.ts` și nu sunt publicate.

Nu există coș, checkout sau comenzi online. CTA folosește formularul existent de programare `/{locale}/#booking-form`. Acest modul nu schimbă integrarea formularului.

Pentru migrarea la CMS, înlocuiți furnizorul din repository păstrând tipurile și contractul de selecție publică; pentru I/O asincron adaptați apelurile server și sitemapul la await. UI și filtrele primesc în continuare aceleași obiecte serializabile.
