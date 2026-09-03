import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { site } from "@/config/site";
import {
  Ear,
  MessageCircle,
  Package,
  Phone,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  ToolCase,
  Users,
  Wrench,
} from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/breadcrumbs";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return pageMetadata((await params).locale, "servicii");
}
const text = {
  ro: {
    eye: "SERVICIILE VOLMER",
    title:
      "Reglare, service și întreținere pentru aparate auditive în Chișinău",
    lead: "Servicii Volmer de la prima evaluare până la reglajele și verificările ulterioare.",
    sub: "Oferim evaluarea auzului, consultanță pentru alegerea aparatului auditiv, fitting și reglare individuală, verificare tehnică, curățare și suport pentru utilizarea zilnică. Dacă nu știi de unde să începi, sună-ne și explică problema întâlnită.",
    book: "Sună pentru un serviciu",
    discover: "Descoperă serviciile",
    quick: "Cu ce te putem ajuta?",
    quickLead: "Alege situația care se apropie cel mai mult de nevoia ta.",
    catalog: "Servicii adaptate fiecărei etape",
    catalogLead:
      "Poți veni atât pentru prima verificare a auzului, cât și pentru reglarea, întreținerea sau verificarea unui aparat pe care îl folosești deja.",
    support: "Adaptarea nu se termină în ziua achiziției",
    supportText:
      "Experiența reală apare acasă, la serviciu, pe stradă și în locuri aglomerate. Reglajele ulterioare ajută la adaptarea soluției la aceste situații.",
    final: "Nu știi ce serviciu trebuie să alegi?",
  },
  ru: {
    eye: "УСЛУГИ VOLMER",
    title: "Настройка, сервис и обслуживание слуховых аппаратов в Кишинёве",
    lead: "Услуги Volmer от первой проверки слуха до последующих настроек и технического обслуживания.",
    sub: "Мы предлагаем проверку слуха, консультацию по выбору аппарата, индивидуальную настройку, чистку, техническую проверку и помощь в ежедневном использовании.",
    book: "Позвонить для услуги",
    discover: "Посмотреть услуги",
    quick: "Чем мы можем помочь?",
    quickLead: "Выберите ситуацию, наиболее близкую к вашей потребности.",
    catalog: "Услуги для каждого этапа",
    catalogLead:
      "Можно прийти как на первую проверку слуха, так и на настройку, уход или проверку уже используемого аппарата.",
    support: "Адаптация не заканчивается в день покупки",
    supportText:
      "Реальный опыт появляется дома, на работе, на улице и в шумных местах. Последующие настройки помогают адаптировать решение.",
    final: "Не знаете, какую услугу выбрать?",
  },
};
const serviceDefinitions = [
  ["hearing-evaluation", Ear],
  ["hearing-aid-consultation", MessageCircle],
  ["hearing-aid-consultation", SlidersHorizontal],
  ["adjustment", Settings2],
  ["adjustment", Wrench],
  ["service", Sparkles],
  ["service", ToolCase],
  ["service", Package],
  ["service", Phone],
  ["hearing-aid-consultation", Users],
] as const;
const serviceCopy = {
  ro: [
    [
      "Evaluarea auzului",
      "Verificăm modul în care percepi sunetele și discutăm dificultățile de comunicare.",
    ],
    [
      "Consultanță pentru alegerea aparatului auditiv",
      "Comparăm tipurile și caracteristicile aparatelor potrivite nevoilor tale.",
    ],
    [
      "Selectarea și testarea soluției",
      "Analizăm soluțiile disponibile și funcțiile relevante pentru stilul de viață și evaluare.",
    ],
    [
      "Fitting și reglare inițială",
      "Configurăm aparatul și explicăm utilizarea, comenzile și întreținerea de bază.",
    ],
    [
      "Reglaje și optimizare",
      "Ajustăm aparatul după experiența reală: conversații, zgomot, telefon sau propria voce.",
    ],
    [
      "Curățare și întreținere",
      "Curățăm componentele accesibile și explicăm întreținerea corectă.",
    ],
    [
      "Service și verificare tehnică",
      "Verificăm funcționarea aparatului și problemele tehnice uzuale.",
    ],
    [
      "Consumabile și accesorii",
      "Filtre, dome-uri, baterii și accesorii compatibile, în funcție de aparat.",
    ],
    [
      "Conectare la telefon",
      "Ajutăm la conectarea aparatelor compatibile la smartphone și aplicație.",
    ],
    [
      "Consultație pentru familie",
      "Explicăm familiei cum poate sprijini persoana în perioada de adaptare.",
    ],
  ],
  ru: [
    [
      "Проверка слуха",
      "Проверяем восприятие звуков и обсуждаем сложности в общении.",
    ],
    [
      "Консультация по выбору аппарата",
      "Сравниваем типы и характеристики аппаратов с учётом ваших потребностей.",
    ],
    [
      "Подбор и проба решения",
      "Рассматриваем доступные решения и функции, важные для вашего образа жизни.",
    ],
    [
      "Первичная настройка",
      "Программируем аппарат и объясняем управление и базовый уход.",
    ],
    [
      "Регулировка и оптимизация",
      "Корректируем аппарат по реальному опыту: речь, шум, телефон и собственный голос.",
    ],
    [
      "Чистка и обслуживание",
      "Чистим доступные компоненты и объясняем правильный уход.",
    ],
    [
      "Сервис и техническая проверка",
      "Проверяем работу аппарата и распространённые технические проблемы.",
    ],
    [
      "Расходные материалы",
      "Фильтры, вкладыши, батарейки и совместимые аксессуары.",
    ],
    [
      "Подключение к телефону",
      "Помогаем подключить совместимый аппарат к смартфону и приложению.",
    ],
    [
      "Консультация для семьи",
      "Объясняем близким, как поддержать человека в период привыкания.",
    ],
  ],
} as const;
export default async function Services({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: active } = await params;
  setRequestLocale(active);
  const locale = active === "ru" ? "ru" : "ro";
  const t = text[locale];
  const services = serviceDefinitions.map(
    ([id, Icon], index) =>
      [
        serviceCopy[locale][index][0],
        serviceCopy[locale][index][1],
        id,
        Icon,
      ] as const,
  );
  return (
    <>
      <Breadcrumbs locale={locale} label={t.title} path="servicii" />
      <section className="services-hero">
        <div className="container services-hero-grid">
          <div>
            <p className="eyebrow">{t.eye}</p>
            <h1>{t.title}</h1>
            <p className="lead">{t.lead}</p>
            <p>{t.sub}</p>
            <div className="actions">
              <a
                className="button stone"
                href={`tel:${site.phoneInternational}`}
              >
                {t.book}
              </a>
              <a className="button ghost" href="#services">
                {t.discover}
              </a>
            </div>
          </div>
          <div className="services-image">
            <Image
              src="/images/pages/services/services-hero.svg"
              alt="Servicii Volmer"
              fill
              priority
            />
            <aside>
              <b>Evaluare și consultație</b>
              <b>Reglare individuală</b>
              <b>Întreținere și suport</b>
            </aside>
          </div>
        </div>
      </section>
      <section className="container service-quick">
        <h2>{t.quick}</h2>
        <p>{t.quickLead}</p>
        <div>
          {services.slice(0, 6).map(([name, , id, Icon]) => (
            <a href={`#${id}`} key={id}>
              <Icon />
              {name}
            </a>
          ))}
        </div>
      </section>
      <section className="container services-catalog" id="services">
        <h2>{t.catalog}</h2>
        <p className="lead">{t.catalogLead}</p>
        <div>
          {services.map(([name, description, id, Icon]) => (
            <article id={id} key={name}>
              <Icon />
              <h3>{name}</h3>
              <p>{description}</p>
              <a href={`tel:${site.phoneInternational}`}>
                {locale === "ro"
                  ? "Sună pentru serviciu"
                  : "Позвонить для услуги"}
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="container hearing-section">
        <h2>
          {locale === "ro"
            ? "Când este nevoie de reglarea aparatului auditiv?"
            : "Когда нужна настройка слухового аппарата?"}
        </h2>
        <p className="lead">
          {locale === "ro"
            ? "Solicită o ajustare dacă vorbirea nu este suficient de clară, sunetele par prea puternice sau ascuțite, propria voce sună neobișnuit, aparatul ajută mai puțin în zgomot ori conexiunea la telefon nu funcționează corect."
            : "Обратитесь за регулировкой, если речь остаётся неясной, звуки кажутся слишком громкими или резкими, собственный голос звучит непривычно, аппарат хуже помогает в шуме или подключение к телефону работает неправильно."}
        </p>
        <a className="button stone" href={`tel:${site.phoneInternational}`}>
          {locale === "ro" ? "Sună pentru reglare" : "Позвонить для настройки"}
        </a>
      </section>
      <section className="service-support">
        <div className="container">
          <h2>{t.support}</h2>
          <p>{t.supportText}</p>
          <div>
            {(locale === "ro"
              ? [
                  "Ascultăm dificultățile întâmpinate",
                  "Comparăm soluțiile",
                  "Reglăm aparatul",
                  "Oferim suport ulterior",
                ]
              : [
                  "Обсуждаем возникшие трудности",
                  "Сравниваем решения",
                  "Настраиваем аппарат",
                  "Оказываем дальнейшую поддержку",
                ]
            ).map((item) => (
              <b key={item}>{item}</b>
            ))}
          </div>
        </div>
      </section>
      <section className="container final">
        <div>
          <h2>{t.final}</h2>
          <p>
            {locale === "ro"
              ? "Sună echipa Volmer pentru o recomandare personalizată."
              : "Позвоните команде Volmer для персональной рекомендации."}
          </p>
        </div>
        <a className="button stone" href={`tel:${site.phoneInternational}`}>
          {t.book}
        </a>
      </section>
      {site.demoMode && (
        <p className="container demo-badge">
          {locale === "ro"
            ? "Pagină demonstrativă pregătită pentru personalizarea finală."
            : "Демонстрационная страница подготовлена для окончательной персонализации."}
        </p>
      )}
    </>
  );
}
