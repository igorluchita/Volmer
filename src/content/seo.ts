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

const roTitles = [
  "Cum vă dați seama că auzul începe să scadă?",
  "De ce aud vocea, dar nu înțeleg toate cuvintele?",
  "De ce este mai greu să înțelegeți vorbirea în zgomot?",
  "Când este recomandat să faceți un test auditiv?",
  "Cum se desfășoară un test auditiv?",
  "Cum alegeți un aparat auditiv potrivit?",
  "RIC vs BTE: care este diferența?",
  "Aparate auditive reîncărcabile: avantaje și limitări",
  "Cum funcționează Bluetooth la aparatele auditive?",
  "Cum se întreține corect un aparat auditiv?",
  "De ce este important reglajul aparatului auditiv?",
  "Cum ajutați o persoană apropiată care începe să audă mai slab?",
];
const ruTitles = [
  "Как заметить, что слух начал снижаться?",
  "Почему слышу голос, но не разбираю все слова?",
  "Почему речь сложнее понимать в шуме?",
  "Когда стоит проверить слух?",
  "Как проходит проверка слуха?",
  "Как выбрать подходящий слуховой аппарат?",
  "RIC и BTE: в чём разница?",
  "Перезаряжаемые слуховые аппараты: плюсы и ограничения",
  "Как работает Bluetooth в слуховых аппаратах?",
  "Правильный уход за слуховым аппаратом",
  "Почему важна точная настройка слухового аппарата?",
  "Как помочь близкому человеку, который стал хуже слышать?",
];
const roSlugs = [
  "semne-auz-slab",
  "aud-vocea-nu-inteleg-cuvintele",
  "vorbirea-in-zgomot",
  "cand-faci-test-auditiv",
  "cum-se-desfasoara-test-auditiv",
  "cum-alegi-aparat-auditiv",
  "ric-bte-intraauricular",
  "aparate-reincarcabile-avantaje",
  "bluetooth-aparate-auditive",
  "intretinere-aparat-auditiv",
  "importanta-reglajului",
  "ajutor-persoana-auz-slab",
];

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  readingTime: string;
  keywords: string[];
  relatedArticles: string[];
  sections: { heading: string; paragraphs: string[] }[];
};
export const blogPosts: Record<Locale, BlogPost[]> = {
  ro: roTitles.map((title, i) => ({
    slug: roSlugs[i],
    title,
    description: `Ghid Volmer: ${title.replace("?", "").toLowerCase()}. Explicații practice și pași responsabili.`,
    publishedAt: "2026-08-10",
    updatedAt: "2026-08-10",
    author: "Echipa Volmer",
    category: [
      "Auz",
      "Ghiduri",
      "Tehnologie",
      "Aparate auditive",
      "Întreținere",
    ][i % 5],
    readingTime: "6 min",
    keywords: [title.split(" ").slice(0, 4).join(" "), "Volmer", "Chișinău"],
    relatedArticles: [roSlugs[(i + 1) % 12], roSlugs[(i + 2) % 12]],
    sections: [
      {
        heading: "Ce merită observat",
        paragraphs: [
          "Schimbările de auz apar adesea treptat. Situațiile concrete — conversații în familie, telefonul, televizorul sau vorbirea într-un local — oferă indicii mai utile decât presupunerile. Un singur semn nu stabilește un diagnostic, dar repetarea dificultăților poate indica nevoia unei evaluări.",
          "Notați când apare dificultatea, cine vorbește și cât zgomot există în jur. Aceste exemple ajută specialistul să înțeleagă nevoia reală și să explice opțiunile fără concluzii pripite.",
        ],
      },
      {
        heading: "Pași practici",
        paragraphs: [
          "Începeți cu o discuție și o evaluare individuală. Dacă se recomandă o soluție auditivă, comparați confortul, forma, autonomia, conectivitatea și ușurința întreținerii. Rezultatele diferă de la persoană la persoană, iar reglajul poate necesita mai multe vizite.",
          "Implicați o persoană apropiată dacă vă este de ajutor și pregătiți întrebări despre utilizarea zilnică. Evitați deciziile bazate doar pe dimensiune sau pe numărul de funcții.",
        ],
      },
      {
        heading: "Întrebări frecvente",
        paragraphs: [
          "Este urgent? Dacă schimbarea este bruscă, unilaterală sau însoțită de alte simptome, cereți îndrumare medicală. Pentru dificultăți progresive, programați o evaluare. Poate un aparat rezolva orice situație? Nu există rezultate universale; beneficiul depinde de nevoi, alegere, reglare și adaptare.",
        ],
      },
      {
        heading: "Concluzie",
        paragraphs: [
          "Informația bună vă ajută să alegeți calm. Sunați la Volmer, la 079 331 839, pentru o discuție și o programare în Chișinău.",
        ],
      },
    ],
  })),
  ru: ruTitles.map((title, i) => ({
    slug: roSlugs[i],
    title,
    description: `Практический материал Volmer: ${title.replace("?", "").toLowerCase()}. Понятные объяснения и ответственные шаги.`,
    publishedAt: "2026-08-10",
    updatedAt: "2026-08-10",
    author: "Команда Volmer",
    category: [
      "Слух",
      "Руководства",
      "Технологии",
      "Слуховые аппараты",
      "Уход",
    ][i % 5],
    readingTime: "6 мин",
    keywords: [title.split(" ").slice(0, 4).join(" "), "Volmer", "Кишинёв"],
    relatedArticles: [roSlugs[(i + 1) % 12], roSlugs[(i + 2) % 12]],
    sections: [
      {
        heading: "На что обратить внимание",
        paragraphs: [
          "Изменения слуха часто развиваются постепенно. Конкретные ситуации — разговор дома, телефон, телевизор или речь в кафе — полезнее догадок. Один признак не является диагнозом, но повторяющиеся сложности могут указывать на пользу оценки слуха.",
          "Запишите, когда возникает трудность, кто говорит и насколько шумно вокруг. Такие примеры помогают специалисту понять реальную потребность и спокойно объяснить варианты.",
        ],
      },
      {
        heading: "Практические шаги",
        paragraphs: [
          "Начните с беседы и индивидуальной оценки. Если рассматривается слуховой аппарат, сравните комфорт, форму, автономность, подключение и уход. Результаты индивидуальны, а настройка иногда требует нескольких визитов.",
          "При желании приходите с близким человеком и заранее составьте вопросы. Не выбирайте решение только по размеру или количеству функций.",
        ],
      },
      {
        heading: "Частые вопросы",
        paragraphs: [
          "Насколько срочно обращаться? При внезапном или одностороннем изменении и дополнительных симптомах нужна медицинская консультация. При постепенных трудностях полезна оценка слуха. Решает ли аппарат любую проблему? Универсального результата нет: важны правильный выбор, настройка и адаптация.",
        ],
      },
      {
        heading: "Вывод",
        paragraphs: [
          "Понятная информация помогает принять спокойное решение. Позвоните Volmer по номеру 079 331 839 для консультации и записи в Кишинёве.",
        ],
      },
    ],
  })),
};
