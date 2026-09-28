import type { Metadata } from "next";
const copy = {
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
} as const;
export function pageMetadata(
  locale: string,
  page: keyof typeof copy,
): Metadata {
  const lang = locale === "ru" ? "ru" : "ro";
  const [title, description] = copy[page][lang];
  const slug = page;
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
