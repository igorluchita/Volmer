import {articles} from './blog-content';
export type Locale = "ro" | "ru";

export const seoPages = {
  ro: [
    [
      "aparate-auditive-chisinau",
      "Aparate auditive în Chișinău",
      "Consultanță locală pentru alegerea și reglarea aparatelor auditive în Chișinău.",
      "Alegerea unei soluții auditive pornește de la situațiile în care comunicarea a devenit dificilă, nu de la un model ales în grabă. La Volmer puteți discuta despre evaluarea auzului, opțiuni Unitron, confort și conectivitate.",
      "Ce primiți la o consultație",
      "Discutăm rutina zilnică, evaluăm nevoile și explicăm diferențele dintre forme și funcții. Recomandarea este individuală, iar disponibilitatea se confirmă telefonic.",
    ],
    [
      "aparate-auditive-moldova",
      "Aparate auditive în Republica Moldova",
      "Informații clare despre aparate auditive Unitron, evaluare și suport oferite de Volmer în Chișinău.",
      "Persoanele din Republica Moldova care caută o soluție auditivă pot vizita centrul Volmer din Chișinău. O alegere responsabilă include evaluare, probă, reglare și suport ulterior.",
      "Cum alegeți responsabil",
      "Contează dificultățile auditive, mediile frecvente, dexteritatea, telefonul folosit și preferințele personale. Nu există un aparat universal potrivit tuturor.",
    ],
  ],
  ru: [
    [
      "aparate-auditive-chisinau",
      "Слуховые аппараты в Кишинёве",
      "Консультация по выбору и настройке слуховых аппаратов в Кишинёве.",
      "Выбор слухового решения начинается с повседневных ситуаций, в которых стало сложнее общаться. В Volmer можно обсудить оценку слуха, решения Unitron, комфорт и подключение к телефону.",
      "Что включает консультация",
      "Мы обсуждаем ваш распорядок, объясняем различия между формами аппаратов и определяем важные функции. Рекомендация всегда индивидуальна.",
    ],
    [
      "aparate-auditive-moldova",
      "Слуховые аппараты в Молдове",
      "Полезная информация о слуховых аппаратах Unitron и поддержке Volmer в Кишинёве.",
      "Жители Республики Молдова могут обратиться в центр Volmer в Кишинёве. Ответственный выбор включает оценку, настройку и последующую поддержку.",
      "Как выбирать",
      "Важны особенности слуха, привычные звуковые ситуации, удобство управления и совместимость с телефоном. Универсального аппарата для всех нет.",
    ],
  ],
} as const;

const relatedSlugs = [
  ['aud-vocea-nu-inteleg-cuvintele', 'cand-faci-test-auditiv'],
  ['vorbirea-in-zgomot', 'cum-se-desfasoara-test-auditiv'],
  ['aud-vocea-nu-inteleg-cuvintele', 'importanta-reglajului'],
  ['semne-auz-slab', 'cum-se-desfasoara-test-auditiv'],
  ['cand-faci-test-auditiv', 'cum-alegi-aparat-auditiv'],
  ['ric-bte-intraauricular', 'aparate-reincarcabile-avantaje'],
  ['cum-alegi-aparat-auditiv', 'aparate-reincarcabile-avantaje'],
  ['cum-alegi-aparat-auditiv', 'bluetooth-aparate-auditive'],
  ['cum-alegi-aparat-auditiv', 'aparate-reincarcabile-avantaje'],
  ['importanta-reglajului', 'cum-alegi-aparat-auditiv'],
  ['intretinere-aparat-auditiv', 'cum-alegi-aparat-auditiv'],
  ['semne-auz-slab', 'cand-faci-test-auditiv'],
] as const;
function readingTime(post: (typeof articles)['ro'][number], locale: Locale) {
  const words = `${post.description} ${post.sections.flatMap(section => section.paragraphs).join(' ')}`.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} ${locale === 'ro' ? 'min' : 'мин'}`;
}
export const blogPosts = {
  ro: articles.ro.map((post, index) => ({...post, readingTime: readingTime(post, 'ro'), relatedArticles: [...relatedSlugs[index]]})),
  ru: articles.ru.map((post, index) => ({...post, readingTime: readingTime(post, 'ru'), relatedArticles: [...relatedSlugs[index]]})),
};
export type BlogPost = (typeof blogPosts)['ro'][number];
