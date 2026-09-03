import type { Metadata } from "next";
const copy = {
  about: {
    ro: [
      "Despre Volmer | Aparate auditive în Chișinău",
      "Volmer este un centru de soluții pentru auz în Chișinău: evaluare, aparate auditive Unitron, reglare și suport ulterior.",
    ],
    ru: [
      "О Volmer | Слуховые аппараты в Кишинёве",
      "Volmer — центр решений для слуха в Кишинёве: проверка слуха, аппараты Unitron, индивидуальная настройка и поддержка.",
    ],
  },
  faq: {
    ro: [
      "Întrebări despre aparate auditive și auz | Volmer",
      "Răspunsuri clare despre evaluarea auzului, aparate auditive, reglare și programări la Volmer.",
    ],
    ru: [
      "Вопросы о слухе и слуховых аппаратах | Volmer",
      "Понятные ответы об оценке слуха, аппаратах, настройке и записи в Volmer.",
    ],
  },
  programare: {
    ro: [
      "Programare telefonică pentru evaluarea auzului | Volmer",
      "Sună Volmer pentru a programa evaluarea auzului sau o consultație despre aparate auditive în Chișinău.",
    ],
    ru: [
      "Запись на оценку слуха по телефону | Volmer",
      "Позвоните в Volmer, чтобы записаться на оценку слуха или консультацию в Кишинёве.",
    ],
  },
  contact: {
    ro: [
      "Contact Volmer | Aparate auditive Chișinău",
      "Volmer, Str. Mitropolit Varlaam 69, Chișinău. Telefon 079 331 839. Programări pentru evaluarea auzului, aparate auditive, reglare și service.",
    ],
    ru: [
      "Контакты Volmer | Слуховые аппараты Кишинёв",
      "Volmer, ул. Митрополит Варлаам 69, Кишинёв. Проверка слуха, аппараты Unitron, настройка и сервис. Запись по телефону.",
    ],
  },
  "test-auditiv": {
    ro: [
      "Test auditiv în Chișinău | Verificarea auzului | Volmer",
      "Test auditiv și evaluarea auzului în Chișinău. Verifică modul în care percepi sunetele și înțelegi vorbirea. Programare telefonică la Volmer.",
    ],
    ru: [
      "Проверка слуха в Кишинёве | Volmer",
      "Проверка слуха в Кишинёве: оценка восприятия звуков и понимания речи. Запись по телефону в Volmer.",
    ],
  },
  servicii: {
    ro: [
      "Reglare și service aparate auditive în Chișinău | Volmer",
      "Reglare, ajustare, service, curățare și întreținere pentru aparate auditive în Chișinău. Suport pentru aparate Unitron.",
    ],
    ru: [
      "Настройка и сервис слуховых аппаратов в Кишинёве | Volmer",
      "Настройка, регулировка, обслуживание и чистка слуховых аппаратов в Кишинёве. Поддержка подключения к телефону.",
    ],
  },
} as const;
export function pageMetadata(
  locale: string,
  page: keyof typeof copy,
): Metadata {
  const lang = locale === "ru" ? "ru" : "ro";
  const [title, description] = copy[page][lang];
  const slug =
    page === "about"
      ? "despre-noi"
      : page === "faq"
        ? "intrebari-frecvente"
        : page;
  const path = `/${lang}/${slug}/`;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        "ro-MD": `/ro/${slug}/`,
        "ru-MD": `/ru/${slug}/`,
        "x-default": `/ro/${slug}/`,
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      locale: lang === "ro" ? "ro_MD" : "ru_MD",
      alternateLocale: lang === "ro" ? ["ru_MD"] : ["ro_MD"],
      images: [{ url: "/logo-volmer-clean.png", alt: "Volmer" }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/logo-volmer-clean.png"],
    },
  };
}
