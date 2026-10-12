import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Former translated RU slugs remain reachable, but only the shared RO/RU slug is indexable.
const legacyRuSlugs = [
  ['besplatnaya-proverka-sluha', 'test-auditiv-gratuit'],
  ['dlya-semi-za-granitsey', 'pentru-familia-de-peste-hotare'],
  ['sluh-i-dementsiya', 'auzul-si-dementa'],
  ['o-nas', 'despre-noi'],
  ['chastye-voprosy', 'intrebari-frecvente'],
  ['kontakty', 'contact'],
  ['sluhovye-apparaty-kishinev', 'aparate-auditive-chisinau'],
  ['sluhovye-apparaty-moldova', 'aparate-auditive-moldova'],
  ['nastroika-sluhovyh-apparatov', 'reglare-aparate-auditive'],
  ['perezaryazhaemye-sluhovye-apparaty', 'aparate-auditive-reincarcabile'],
  ['sluhovye-apparaty-bluetooth', 'aparate-auditive-bluetooth'],
  ['sluhovye-apparaty-dlya-pozhilyh', 'aparate-auditive-pentru-varstnici'],
  ['nezametnye-sluhovye-apparaty', 'aparate-auditive-discrete'],
  ['politika-konfidentsialnosti', 'politica-de-confidentialitate'],
  ['cookie', 'cookie-uri'],
  ['pravila-i-usloviya', 'termeni-si-conditii'],
] as const;
const legacyRuBlogSlugs = [
  ['priznaki-snizheniya-sluha', 'semne-auz-slab'],
  ['slyshu-golos-ne-razbirayu-slova', 'aud-vocea-nu-inteleg-cuvintele'],
  ['rech-v-shume', 'vorbirea-in-zgomot'],
  ['kogda-proveryat-sluh', 'cand-faci-test-auditiv'],
  ['kak-prohodit-proverka-sluha', 'cum-se-desfasoara-test-auditiv'],
  ['kak-vybrat-sluhovoy-apparat', 'cum-alegi-aparat-auditiv'],
  ['ric-bte-vnutriushnye', 'ric-bte-intraauricular'],
  ['perezaryazhaemye-apparaty', 'aparate-reincarcabile-avantaje'],
  ['bluetooth-v-sluhovyh-apparatah', 'bluetooth-aparate-auditive'],
  ['uhod-za-apparatom', 'intretinere-aparat-auditiv'],
  ['vazhnost-nastroyki', 'importanta-reglajului'],
  ['pomoshch-blizkomu-so-sluhom', 'ajutor-persoana-auz-slab'],
] as const;

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: true,
  experimental: {globalNotFound: true},
  async redirects() {
    return [
      {source: '/ro/programare/', destination: '/ro/#contact', permanent: true},
      {source: '/ru/programare/', destination: '/ru/#contact', permanent: true},
      {source: '/ro/test-auditiv/', destination: '/ro/test-auditiv-gratuit/', permanent: true},
      {source: '/ru/test-auditiv/', destination: '/ru/test-auditiv-gratuit/', permanent: true},
      {source: '/ro/test-auz-chisinau/', destination: '/ro/test-auditiv-gratuit/', permanent: true},
      {source: '/ru/test-auz-chisinau/', destination: '/ru/test-auditiv-gratuit/', permanent: true},
      {source: '/ru/proverka-sluha-kishinev/', destination: '/ru/test-auditiv-gratuit/', permanent: true},
      ...legacyRuSlugs.map(([oldSlug, slug]) => ({source: `/ru/${oldSlug}/`, destination: `/ru/${slug}/`, permanent: true})),
      ...legacyRuBlogSlugs.map(([oldSlug, slug]) => ({source: `/ru/blog/${oldSlug}/`, destination: `/ru/blog/${slug}/`, permanent: true})),
    ];
  },
};

export default createNextIntlPlugin('./src/i18n/request.ts')(nextConfig);
