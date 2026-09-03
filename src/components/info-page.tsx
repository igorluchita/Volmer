import { siteConfig } from "@/config/site";
import { Check, Clock, Mail, MapPin, Phone } from "lucide-react";
import { BusinessHours } from "./business-hours";
import { Breadcrumbs } from "./breadcrumbs";

type Kind = "about" | "faq" | "contact";
const copy = {
  ro: {
    about: [
      "Despre Volmer",
      "Volmer — aparate auditive și evaluarea auzului în Chișinău",
      "Volmer este un centru specializat în soluții pentru auz din Chișinău, unde oferim evaluarea auzului, consultanță pentru alegerea aparatelor auditive, reglare și suport ulterior.",
    ],
    faq: [
      "Întrebări frecvente",
      "Întrebări frecvente despre auz și aparate auditive",
      "Răspunsuri la întrebările pe care le primim despre verificarea auzului, alegerea aparatului, reglare, întreținere și adaptare.",
    ],
    contact: [
      "Contactează Volmer",
      "Contact Volmer — aparate auditive în Chișinău",
      "Pentru programări, verificarea auzului, informații despre aparate auditive Unitron, reglare sau service, contactează echipa Volmer.",
    ],
  },
  ru: {
    about: [
      "О Volmer",
      "Volmer — слуховые аппараты и проверка слуха в Кишинёве",
      "Volmer — центр решений для слуха в Кишинёве: проверка слуха, консультация по выбору аппарата, индивидуальная настройка и дальнейшая поддержка.",
    ],
    faq: [
      "Частые вопросы",
      "Вопросы о слухе и слуховых аппаратах",
      "Ответы на частые вопросы о проверке слуха, выборе аппарата, настройке, уходе и привыкании.",
    ],
    contact: [
      "Свяжитесь с Volmer",
      "Контакты Volmer — слуховые аппараты в Кишинёве",
      "Для записи на проверку слуха, консультации по аппаратам Unitron, настройки или сервиса позвоните команде Volmer.",
    ],
  },
} as const;

export function InfoPage({
  kind,
  locale,
}: {
  kind: Kind;
  locale: "ro" | "ru";
}) {
  const [eyebrow, title, description] = copy[locale][kind];
  const generic =
    locale === "ru"
      ? [
          "Обсуждаем реальные трудности",
          "Проверяем слух и объясняем результаты",
          "Подбираем, настраиваем и поддерживаем",
        ]
      : [
          "Ascultăm dificultățile reale",
          "Evaluăm auzul și explicăm rezultatele",
          "Comparăm, reglăm și oferim suport",
        ];
  const faqItems =
    locale === "ru"
      ? [
          [
            "Как понять, что слух стал хуже?",
            "Частые просьбы повторить, высокая громкость телевизора и трудности в шуме могут быть поводом проверить слух.",
          ],
          [
            "Почему я слышу голос, но не разбираю слова?",
            "На понимание речи влияют особенности слуха, тембр голоса, расстояние и фоновый шум. Индивидуальная проверка помогает уточнить ситуацию.",
          ],
          [
            "Как проходит проверка слуха?",
            "Сначала обсуждаются замеченные трудности, затем проверяется восприятие звуков. Доступные этапы объясняются до начала.",
          ],
          [
            "Больно ли проверять слух?",
            "Проверка восприятия звуков обычно не предполагает болезненных действий. Сообщите специалисту о любом дискомфорте.",
          ],
          [
            "Как выбрать слуховой аппарат?",
            "Учитываются результаты проверки, ситуации общения, удобство управления, питание, размер и нужные функции.",
          ],
          [
            "Что такое RIC и BTE?",
            "RIC размещает ресивер в слуховом канале, а BTE — основные компоненты за ухом. У каждой формы есть практические особенности.",
          ],
          [
            "Есть ли перезаряжаемые аппараты?",
            "Да, отдельные модели используют аккумулятор. Доступность и автономность нужно уточнять для конкретного решения.",
          ],
          [
            "Можно ли подключить аппарат к телефону?",
            "Совместимые модели могут поддерживать звонки, аудио или управление через приложение. Совместимость проверяется отдельно.",
          ],
          [
            "Что такое Unitron?",
            "Unitron — производитель слуховых аппаратов, входящий в международную группу Sonova.",
          ],
          [
            "Сколько стоит слуховой аппарат?",
            "Цена зависит от технологии, конфигурации и функций. Актуальные варианты и цены уточняйте в Volmer.",
          ],
          [
            "Почему нужна настройка?",
            "Настройка адаптирует аппарат к результатам проверки и реальным ситуациям. Иногда требуется несколько последовательных корректировок.",
          ],
          [
            "Почему собственный голос звучит иначе?",
            "В начале использования восприятие своего голоса может измениться. Это стоит обсудить при последующей настройке.",
          ],
          [
            "Как чистить аппарат?",
            "Ежедневно используйте только рекомендованные средства и следуйте инструкции для конкретной модели. Влага и острые предметы могут повредить аппарат.",
          ],
          [
            "Что делать, если аппарат не работает?",
            "Проверьте питание, заряд, фильтр и видимые загрязнения. Если проблема сохраняется, обратитесь на техническую проверку.",
          ],
          [
            "Нужна ли запись?",
            "Да, позвоните в Volmer по номеру 079 331 839, чтобы согласовать день и время.",
          ],
        ]
      : [
          [
            "Cum îmi dau seama că aud mai slab?",
            "Volumul mai mare la televizor, cererea frecventă de repetare și dificultățile în zgomot pot fi motive pentru verificarea auzului.",
          ],
          [
            "De ce aud vocea, dar nu înțeleg cuvintele?",
            "Înțelegerea vorbirii poate fi influențată de modul în care percepi sunetele, vocea interlocutorului, distanță și zgomotul de fond.",
          ],
          [
            "Cum decurge un test auditiv?",
            "Începem cu situațiile observate, apoi verificăm percepția sunetelor. Etapele disponibile sunt explicate înainte de începere.",
          ],
          [
            "Este dureroasă evaluarea auzului?",
            "Verificarea percepției sunetelor nu presupune în mod obișnuit proceduri dureroase. Orice disconfort trebuie comunicat specialistului.",
          ],
          [
            "Cum aleg un aparat auditiv?",
            "Contează evaluarea auzului, situațiile de comunicare, ușurința folosirii, alimentarea, dimensiunea și funcțiile necesare.",
          ],
          [
            "Ce înseamnă RIC și BTE?",
            "La RIC receptorul este în canal, iar la BTE componentele principale sunt în spatele urechii. Fiecare formă are avantaje practice diferite.",
          ],
          [
            "Există aparate auditive reîncărcabile?",
            "Da, anumite modele folosesc acumulator. Autonomia și disponibilitatea trebuie confirmate pentru soluția concretă.",
          ],
          [
            "Pot conecta aparatul la telefon?",
            "Modelele compatibile pot permite apeluri, streaming sau control prin aplicație. Compatibilitatea se verifică separat.",
          ],
          [
            "Ce este Unitron?",
            "Unitron este un producător de aparate auditive din cadrul grupului internațional Sonova.",
          ],
          [
            "Cât costă un aparat auditiv?",
            "Prețul depinde de tehnologie, configurație și caracteristici. Pentru soluțiile și prețurile actuale, contactează Volmer.",
          ],
          [
            "De ce este necesară reglarea aparatului?",
            "Reglarea adaptează aparatul la evaluare și la experiența din viața reală. Pot fi utile mai multe ajustări succesive.",
          ],
          [
            "De ce vocea mea sună diferit?",
            "La început, propria voce poate fi percepută diferit. Situația merită discutată la reglajul următor.",
          ],
          [
            "Cum curăț aparatul auditiv?",
            "Folosește doar instrumentele recomandate și urmează instrucțiunile modelului. Umezeala și obiectele ascuțite îl pot deteriora.",
          ],
          [
            "Ce fac dacă aparatul nu funcționează?",
            "Verifică alimentarea, încărcarea, filtrul și murdăria vizibilă. Dacă problema continuă, solicită o verificare tehnică.",
          ],
          [
            "Este nevoie de programare?",
            "Da. Sună echipa Volmer la 079 331 839 pentru a stabili și confirma telefonic ziua și ora.",
          ],
        ];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };
  return (
    <>
      {kind === "faq" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Breadcrumbs locale={locale} label={title} path={kind === "about" ? "despre-noi" : kind === "faq" ? "intrebari-frecvente" : "contact"}/>
      <section className="info-hero">
        <div className="container">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead">{description}</p>
          <div className="actions">
            <a
              className="button stone"
              href={`tel:${siteConfig.phoneInternational}`}
            >
              <Phone />
              {locale === "ro" ? "Sună acum" : "Позвонить сейчас"}
            </a>
            <a className="button ghost" href="#details">
              {locale === "ro" ? "Află mai multe" : "Подробнее"}
            </a>
          </div>
        </div>
      </section>
      <section className="container info-sections" id="details">
        <div className="info-grid">
          {generic.map((item) => (
            <article key={item}>
              <Check />
              <h2>{item}</h2>
              <p>
                {locale === "ro"
                  ? "Recomandările pornesc de la situațiile concrete, evaluarea auzului și preferințele persoanei."
                  : "Рекомендации основаны на реальных ситуациях, проверке слуха и предпочтениях человека."}
              </p>
            </article>
          ))}
        </div>
        {kind === "faq" && (
          <section className="unitron-faq">
            <h2>
              {locale === "ro"
                ? "Auz, testare, aparate și întreținere"
                : "Слух, проверка, аппараты и уход"}
            </h2>
            {faqItems.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </section>
        )}
        {kind === "about" && (
          <section className="blue-panel">
            <h2>
              {locale === "ro"
                ? "De ce Volmer lucrează cu Unitron"
                : "Почему Volmer работает с Unitron"}
            </h2>
            <p>
              {locale === "ro"
                ? "Unitron este un producător de aparate auditive din grupul Sonova. Alegem soluțiile disponibile după evaluarea auzului, nevoile zilnice și funcțiile relevante pentru fiecare persoană."
                : "Unitron — производитель слуховых аппаратов группы Sonova. Доступные решения сравниваются с учётом проверки слуха, повседневных потребностей и важных функций."}
            </p>
          </section>
        )}
        {kind === "contact" && (
          <>
            <section className="contact-panel">
              <h2>
                {locale === "ro"
                  ? "Contactează-ne direct"
                  : "Свяжитесь с нами напрямую"}
              </h2>
              <p className="contact-intro">
                {locale === "ro"
                  ? "Ne găsești pe Str. Mitropolit Varlaam 69, în Chișinău."
                  : "Мы находимся по адресу: ул. Митрополит Варлаам 69, Кишинёв."}
              </p>
              <div className="contact-cards">
                <article>
                  <Phone />
                  <small>{locale === "ro" ? "Telefon" : "Телефон"}</small>
                  <a href={`tel:${siteConfig.phoneInternational}`}>
                    {siteConfig.phoneDisplay}
                  </a>
                </article>
                <article>
                  <Mail />
                  <small>Email</small>
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </article>
                <article>
                  <MapPin />
                  <small>{locale === "ro" ? "Adresă" : "Адрес"}</small>
                  <p>
                    {siteConfig.address}, {siteConfig.city}
                  </p>
                </article>
                <article className="hours-card">
                  <Clock />
                  <small>{locale === "ro" ? "Program" : "График работы"}</small>
                  <BusinessHours />
                </article>
              </div>
              <div className="actions">
                <a
                  className="button stone"
                  href={`tel:${siteConfig.phoneInternational}`}
                >
                  {locale === "ro" ? "Sună acum" : "Позвонить сейчас"}
                </a>
                <a className="button ghost" href={`mailto:${siteConfig.email}`}>
                  {locale === "ro" ? "Trimite email" : "Отправить email"}
                </a>
                <a
                  className="button ghost"
                  href={siteConfig.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {locale === "ro"
                    ? "Deschide în Google Maps"
                    : "Открыть в Google Maps"}
                </a>
              </div>
            </section>
            {siteConfig.googleMapsEmbedUrl && (
              <iframe
                className="map"
                src={siteConfig.googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={
                  locale === "ro" ? "Locația Volmer" : "Расположение Volmer"
                }
              />
            )}
          </>
        )}
      </section>
      <section className="container final">
        <div>
          <h2>
            {locale === "ro"
              ? "Programările sunt confirmate telefonic."
              : "Запись подтверждается по телефону."}
          </h2>
        </div>
        <a
          className="button stone"
          href={`tel:${siteConfig.phoneInternational}`}
        >
          {locale === "ro" ? "Sună acum" : "Позвонить сейчас"}
        </a>
      </section>
    </>
  );
}
