# Încărcare pe cPanel / IPHost Silver Start

1. Rulează `npm install`, apoi `npm run build`.
2. Verifică directorul `out/` și testează-l cu `npx serve out`.
3. În File Manager, șterge vechiul conținut din `public_html/`, păstrând fișierele furnizorului dacă sunt necesare.
4. Încarcă numai **conținutul** din `out/`, nu directorul `out` ca subfolder.
5. Copiază `.htaccess` în `public_html/` sau folosește arhiva creată de `npm run package:hosting`.
6. Activează SSL din cPanel și setează domeniul final.
7. Testează toate rutele, ambele limbi, telefonul, emailul, Google Maps și pagina 404.
8. Nu încărca `src/`, `node_modules/`, `.git/`, `.env.local`, `package.json` sau codul sursă.
