import Image from "next/image";
import { setRequestLocale } from "next-intl/server";

import { site } from "@/config/site";
import { hearingTestContent } from "@/content/hearing-test";
import {
  Clock,
  Ear,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users,
  Volume2,
} from "lucide-react";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/breadcrumbs";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return pageMetadata((await params).locale, "test-auditiv");
}
const copy = {
  ro: {
    eye: "EVALUAREA AUZULUI LA VOLMER",
    title: "Test auditiv și evaluarea auzului în Chișinău",
    lead: "Dacă ai început să auzi mai slab, să ceri oamenilor să repete sau să înțelegi mai greu conversațiile, o evaluare a auzului poate oferi informații utile despre modul în care percepi sunetele.",
    sub: "La Volmer evaluarea este explicată pas cu pas, iar rezultatele sunt discutate într-un limbaj clar.",
    book: "Sună pentru evaluare",
    process: "Vezi cum decurge",
    signs: "Semne că ar fi util să îți verifici auzul",
    signLead:
      "Unele schimbări apar treptat și pot fi observate mai întâi în conversațiile de zi cu zi.",
    signsList: [
      "Dai televizorul sau telefonul mai tare",
      "Ceri frecvent oamenilor să repete",
      "Auzi mai greu conversațiile în zgomot",
      "Auzi vocea, dar unele cuvinte nu sunt clare",
      "Apelurile telefonice au devenit mai dificile",
      "Familia sau colegii observă că auzi mai slab",
    ],
    timeline: "Cum se desfășoară un test auditiv la Volmer",
    steps: [
      [
        "Discuția despre problemele de auz",
        "Discutăm situațiile în care întâmpini dificultăți și stilul tău de viață.",
      ],
      [
        "Pregătirea evaluării",
        "Îți explicăm fiecare etapă înainte de începere.",
      ],
      [
        "Verificarea percepției sunetelor",
        "Sunt prezentate sunete la diferite intensități și frecvențe.",
      ],
      [
        "Verificarea înțelegerii vorbirii",
        "Înțelegerea cuvintelor poate fi verificată dacă această etapă este indicată și disponibilă.",
      ],
      [
        "Explicarea rezultatelor",
        "Primești o explicație clară și discutăm opțiunile următoare.",
      ],
    ],
    results: "Ce informații poate oferi evaluarea auzului?",
    outcomes: [
      "Pragurile de percepție a sunetelor, dacă sunt testate",
      "Diferențele observate între urechea dreaptă și stângă",
      "Dacă este necesară monitorizarea",
      "Ce opțiuni pot fi analizate",
    ],
    audience: "Cui îi este recomandată verificarea auzului?",
    prepare: "Cum te pregătești pentru evaluare?",
    prep: [
      "Notează situațiile în care auzi mai greu.",
      "Adu aparatul auditiv actual, dacă folosești unul.",
      "Poți veni împreună cu un membru al familiei.",
      "Pregătește întrebările la care dorești să primești răspuns.",
    ],
    trust: "O discuție clară, fără presiune",
    final: "Vrei să afli mai clar cum auzi?",
  },
  ru: {
    eye: "ПРОВЕРКА СЛУХА В VOLMER",
    title: "Проверка слуха в Кишинёве",
    lead: "Если вы стали хуже слышать, часто переспрашиваете или с трудом разбираете речь, проверка слуха может дать полезную информацию о восприятии звуков.",
    sub: "В Volmer каждый этап объясняется заранее, а результаты обсуждаются понятным языком.",
    book: "Позвонить для проверки",
    process: "Как проходит проверка",
    signs: "Признаки, при которых полезно проверить слух",
    signLead:
      "Некоторые изменения происходят постепенно и сначала заметны в повседневных разговорах.",
    signsList: [
      "Телевизор или телефон приходится делать громче",
      "Вы часто просите повторить слова",
      "Сложно следить за разговором в шуме",
      "Некоторые голоса звучат неясно",
      "Телефонные разговоры стали сложнее",
      "Семья замечает изменения",
    ],
    timeline: "Как проходит проверка слуха в Volmer",
    steps: [
      [
        "Первичный разговор",
        "Обсуждаем ситуации, в которых возникают трудности, и ваш образ жизни.",
      ],
      ["Подготовка", "Объясняем каждый этап до начала проверки."],
      [
        "Проверка восприятия звуков",
        "Предлагаются звуки разной громкости и частоты.",
      ],
      [
        "Проверка понимания речи",
        "Может проверяться понимание слов в разных звуковых условиях.",
      ],
      [
        "Объяснение результатов",
        "Вы получаете понятное объяснение и обсуждаете дальнейшие варианты.",
      ],
    ],
    results: "Какую информацию может дать проверка слуха?",
    outcomes: [
      "Как воспринимаются разные звуки",
      "В каких ситуациях возникают трудности",
      "Нужно ли наблюдение",
      "Какие варианты можно рассмотреть",
    ],
    audience: "Кому рекомендуется проверка слуха?",
    prepare: "Как подготовиться к проверке?",
    prep: [
      "Запишите ситуации, когда слышите хуже.",
      "Возьмите текущий аппарат, если пользуетесь им.",
      "Можно прийти с членом семьи.",
      "Подготовьте вопросы, на которые хотите получить ответ.",
    ],
    trust: "Ясный разговор без давления",
    final: "Хотите лучше понять, как вы слышите?",
  },
};
export default async function HearingTest({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: active } = await params;
  setRequestLocale(active);
  const locale = active === "ru" ? "ru" : "ro";
  const t = copy[locale];
  const icons = [Volume2, MessageCircle, Ear, Users, Phone, ShieldCheck];
  const testFaq =
    locale === "ro"
      ? [
          [
            "Cât durează un test auditiv?",
            "Durata depinde de etapele disponibile și de întrebările discutate. Pentru vizita ta, Volmer poate confirma timpul orientativ la telefon.",
          ],
          [
            "Este dureroasă evaluarea auzului?",
            "Verificarea percepției sunetelor nu presupune în mod obișnuit proceduri dureroase. Comunică orice disconfort.",
          ],
          [
            "Cum mă pregătesc?",
            "Notează situațiile în care auzi mai greu și pregătește întrebările importante pentru tine.",
          ],
          [
            "Trebuie să aduc aparatul actual?",
            "Da, dacă folosești deja un aparat, este util să îl aduci împreună cu accesoriile relevante.",
          ],
          [
            "Ce se întâmplă după test?",
            "Rezultatele sunt explicate, iar monitorizarea sau soluțiile auditive sunt discutate ca opțiuni, nu obligații.",
          ],
          [
            "Pot face testul dacă folosesc aparat?",
            "Da. Spune echipei ce aparat folosești și ce dificultăți ai observat.",
          ],
          [
            "Cât de des verific auzul?",
            "Frecvența este individuală. Cere recomandarea unui specialist în funcție de schimbările observate și evaluările anterioare.",
          ],
          [
            "De ce aud vocea, dar nu înțeleg cuvintele?",
            "Înțelegerea depinde de percepția diferitelor sunete, claritatea vorbitorului și mediul în care are loc conversația.",
          ],
          [
            "De ce aud mai greu în zgomot?",
            "Zgomotul de fond poate acoperi indicii importante ale vorbirii. O evaluare poate clarifica situațiile dificile.",
          ],
          [
            "Este nevoie de programare?",
            "Da. Programările la Volmer sunt confirmate telefonic la 079 331 839.",
          ],
        ]
      : [
          [
            "Сколько длится проверка слуха?",
            "Продолжительность зависит от доступных этапов и обсуждаемых вопросов. Ориентировочное время уточняется по телефону.",
          ],
          [
            "Проверка болезненна?",
            "Проверка восприятия звуков обычно не предполагает болезненных процедур. Сообщите о любом дискомфорте.",
          ],
          [
            "Как подготовиться?",
            "Запишите ситуации, когда вы слышите хуже, и подготовьте важные вопросы.",
          ],
          [
            "Нужно взять текущий аппарат?",
            "Да, если вы уже пользуетесь аппаратом, возьмите его и необходимые аксессуары.",
          ],
          [
            "Что происходит после проверки?",
            "Результаты объясняются, а наблюдение или слуховые решения обсуждаются как возможные дальнейшие шаги.",
          ],
          [
            "Можно пройти проверку с аппаратом?",
            "Да. Расскажите, каким аппаратом вы пользуетесь и какие трудности замечаете.",
          ],
          [
            "Как часто проверять слух?",
            "Периодичность индивидуальна и зависит от замеченных изменений и предыдущих результатов.",
          ],
          [
            "Почему слышу голос, но не слова?",
            "Понимание зависит от восприятия разных звуков, ясности речи и окружающего шума.",
          ],
          [
            "Почему сложнее слышать в шуме?",
            "Фоновый шум может маскировать важные элементы речи. Проверка помогает уточнить сложные ситуации.",
          ],
          [
            "Нужна ли запись?",
            "Да. Запись в Volmer подтверждается по телефону 079 331 839.",
          ],
        ];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: testFaq.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };
  return (
    <>
      <Breadcrumbs locale={locale} label={t.title} path="test-auditiv" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="hearing-hero">
        <div className="container hearing-hero-grid">
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
              <a className="button ghost" href="#process">
                {t.process}
              </a>
            </div>
          </div>
          <div className="hearing-image">
            <Image
              src={hearingTestContent.heroImage}
              alt="Evaluarea auzului"
              fill
              priority
            />
            <aside>
              <Clock />
              <span>
                {locale === "ro"
                  ? "Durată orientativă: 30–45 minute"
                  : "Ориентировочная длительность: 30–45 минут"}
              </span>
              <span>
                {locale === "ro"
                  ? "Etape explicate clar"
                  : "Понятное объяснение этапов"}
              </span>
              <span>
                {locale === "ro"
                  ? "Programare recomandată"
                  : "Рекомендуется запись"}
              </span>
            </aside>
          </div>
        </div>
      </section>
      <section className="container hearing-section">
        <h2>{t.signs}</h2>
        <p className="lead">{t.signLead}</p>
        <div className="sign-grid">
          {t.signsList.map((item, index) => {
            const Icon = icons[index];
            return (
              <article key={item}>
                <Icon />
                <h3>{item}</h3>
                <p>
                  {locale === "ro"
                    ? "Poate fi util să discuți această situație la o evaluare individuală."
                    : "Эту ситуацию полезно обсудить на индивидуальной проверке."}
                </p>
              </article>
            );
          })}
        </div>
        <p className="disclaimer">
          {locale === "ro"
            ? "Aceste situații nu reprezintă un diagnostic. Evaluarea individuală oferă informații mai clare despre modul în care percepi sunetele."
            : "Эти ситуации не являются диагнозом. Индивидуальная проверка даёт более ясную информацию."}
        </p>
      </section>
      <section className="hearing-timeline" id="process">
        <div className="container">
          <h2>{t.timeline}</h2>
          <div>
            {t.steps.map(([title, description], index) => (
              <article key={title}>
                <b>0{index + 1}</b>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container hearing-section">
        <h2>{t.results}</h2>
        <div className="result-grid">
          {t.outcomes.map((item) => (
            <article key={item}>
              <ShieldCheck />
              <h3>{item}</h3>
              <p>
                {locale === "ro"
                  ? "Informațiile sunt discutate clar, în funcție de situația personală."
                  : "Информация объясняется ясно с учётом вашей ситуации."}
              </p>
            </article>
          ))}
        </div>
        <p className="important">
          {locale === "ro"
            ? "Evaluarea nu te obligă să cumperi un aparat auditiv. Scopul primei întâlniri este să înțelegi mai bine situația și opțiunile disponibile."
            : "Проверка не обязывает покупать слуховой аппарат. Цель первой встречи — лучше понять ситуацию и доступные варианты."}
        </p>
      </section>
      <section className="container audience">
        <div>
          <h2>{t.audience}</h2>
          <ul>
            {(locale === "ro"
              ? [
                  "persoane care observă scăderea auzului",
                  "persoane care aud greu în zgomot sau cer repetarea cuvintelor",
                  "persoane care folosesc deja un aparat auditiv",
                  "familii care observă schimbări ale auzului",
                ]
              : [
                  "люди, заметившие снижение слуха",
                  "люди, которым сложно слышать в шуме или приходится переспрашивать",
                  "пользователи слуховых аппаратов",
                  "семьи, заметившие изменения слуха у близкого",
                ]
            ).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <Image
          src={hearingTestContent.audienceImage}
          alt="Persoane pentru care evaluarea auzului poate fi utilă"
          width={700}
          height={520}
        />
      </section>
      <section className="hearing-soft">
        <div className="container">
          <h2>{t.prepare}</h2>
          <ol>
            {t.prep.map((item, index) => (
              <li key={item}>
                <b>{index + 1}</b>
                {item}
              </li>
            ))}
          </ol>
          <p>
            {locale === "ro"
              ? "Nu este necesară o pregătire specială. Poți aduce documente sau evaluări anterioare relevante."
              : "Специальная подготовка не требуется. Можно принести предыдущие оценки, если они есть."}
          </p>
        </div>
      </section>
      <section className="container trust">
        <h2>{t.trust}</h2>
        <p>
          {locale === "ro"
            ? "Rezultatele sunt explicate individual, iar următorii pași sunt prezentați ca opțiuni, nu ca obligații."
            : "Результаты объясняются индивидуально, а следующие шаги представлены как варианты, а не обязательства."}
        </p>
      </section>
      <section className="container hearing-section">
        <h2>
          {locale === "ro"
            ? "Întrebări despre testarea auzului"
            : "Вопросы о проверке слуха"}
        </h2>
        <div className="unitron-faq">
          {testFaq.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="container final">
        <div>
          <h2>{t.final}</h2>
          <p>
            {locale === "ro"
              ? "Contactează-ne telefonic pentru a stabili ziua și ora evaluării."
              : "Позвоните нам, чтобы выбрать день и время проверки слуха."}
          </p>
        </div>
        <div className="actions">
          <a className="button stone" href={`tel:${site.phoneInternational}`}>
            {locale === "ro"
              ? "Sună pentru programare"
              : "Позвонить для записи"}
          </a>
          <a className="button ghost" href={`tel:${site.phoneInternational}`}>
            <Phone />
            {site.phoneDisplay}
          </a>
        </div>
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
