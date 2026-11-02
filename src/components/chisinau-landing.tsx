import Image from 'next/image';
import { ArrowRight, CalendarDays, Check, Headphones, MapPin, Phone, Sparkles } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/config/site';
import { hearingAidFamilies } from '@/content/hearing-aids-catalog';
import './chisinau-landing.css';

type Locale = 'ro' | 'ru';
const copy = {
  ro: {
    title: 'Aparate auditive în Chișinău, alese și reglate pentru auzul dumneavoastră',
    intro: 'La Volmer, alegerea începe cu evaluarea gratuită a auzului. Descoperiți soluțiile Unitron, testați aparatul în viața de zi cu zi prin Flex Trial și beneficiați de reglare individuală și suport.',
    book: 'Programați o evaluare gratuită', catalog: 'Vedeți aparatele auditive', location: 'Chișinău · Str. Mitropolit Varlaam 69',
    why: 'Sprijin clar, de la prima evaluare', benefits: [['Evaluare gratuită', 'Discutăm dificultățile, evaluăm auzul și explicăm rezultatele și opțiunile.'], ['Flex Trial — 2 săptămâni', 'Puteți testa o soluție auditivă în situații reale. Condițiile se discută cu echipa.'], ['Garanție și suport', 'Garanție de 2 ani. Reglările și vizitele de control se oferă conform condițiilor aplicabile.']],
    signs: 'Situații care merită discutate', signIntro: 'Aceste experiențe pot fi un motiv pentru evaluarea auzului, dar nu stabilesc singure un diagnostic.', signsList: ['Conversațiile în familie sunt greu de urmărit.', 'Auziți vocea, dar distingeți greu cuvintele.', 'În restaurant, vorbirea se pierde în zgomot.', 'Cei din jur trebuie să repete des.', 'Televizorul pare prea încet pentru ceilalți.', 'O persoană apropiată evită discuția despre aparatul auditiv.'],
    types: 'Forme diferite, alese individual', typeCards: [['RIC', 'Carcasa stă în spatele urechii, iar receiverul în canalul auditiv.'], ['BTE', 'Aparat retroauricular, cu tub și adaptare acustică potrivită.'], ['ITE și alte forme intraauriculare', 'Soluții personalizate după anatomie, evaluare și modelele disponibile.']],
    families: 'Soluții Unitron din catalogul Volmer', familyIntro: 'Disponibilitatea modelelor și configurațiilor se confirmă separat. Alegerea ține cont de evaluare, anatomia urechii și preferințele dumneavoastră.',
    process: 'Cum decurge evaluarea și alegerea', steps: ['Discutăm situațiile în care auziți mai greu.', 'Evaluăm auzul și explicăm rezultatele.', 'Stabilim ce tip de aparat poate fi potrivit.', 'Alegem și reglăm o soluție adaptată.', 'Verificăm confortul și discutăm ajustările următoare.'], duration: 'Rezervăm aproximativ 60 de minute pentru vizită. Evaluarea nu înlocuiește un diagnostic medical complet.',
    flex: 'Testați aparatul în viața de zi cu zi', flexText: 'Flex Trial oferă posibilitatea de a încerca o soluție auditivă timp de două săptămâni, după reglarea inițială. Observațiile din conversații, de acasă sau de la serviciu se discută cu specialistul, iar ajustările se stabilesc în funcție de experiență. Detaliile și condițiile se confirmă la consultație.',
    about: 'Experiența Volmer', aboutText: 'Compania-mamă Volmer își are originea în Lingen (Ems), Germania, și are peste 20 de ani de experiență. Centrul din Republica Moldova este o etapă distinctă, dedicată serviciilor pentru auz și aparatelor auditive.',
    after: 'Sprijin și după alegere', afterText: 'Garanția de 2 ani, reglările individuale, verificările și serviciile de întreținere urmează condițiile aplicabile. Echipa vă explică detaliile înainte de decizie.',
    find: 'Ne găsiți în centrul Chișinăului', hours: 'Luni–Vineri 09:00–18:00 · Sâmbătă 09:00–13:00 · Duminică închis', maps: 'Deschideți în Google Maps', officeAlt: 'Intrarea reală în centrul Volmer din Chișinău',
    faq: [['Cât costă un aparat auditiv în Chișinău?', 'Prețul depinde de model și configurație. Echipa vă prezintă opțiunile și costul înainte de decizie.'], ['Evaluarea auzului este gratuită?', 'Da. Evaluarea auzului și consultația inițială sunt gratuite.'], ['Pot testa aparatul înainte să îl cumpăr?', 'Flex Trial permite testarea unei soluții în viața de zi cu zi timp de două săptămâni. Se aplică condițiile programului.'], ['Ce aparat este potrivit pentru o persoană în vârstă?', 'Alegerea depinde de evaluare, dexteritate, confort și rutina zilnică. Nu există un model potrivit tuturor.'], ['Există aparate auditive discrete?', 'Da. Unele modele RIC și intraauriculare au forme discrete. Potrivirea depinde de anatomie și de evaluare.'], ['Există aparate reîncărcabile?', 'Catalogul include modele reîncărcabile și modele cu baterii. Disponibilitatea depinde de familie și configurație.'], ['Cum se reglează un aparat auditiv?', 'Specialistul configurează aparatul după evaluare și ajustează setările în funcție de confort și observațiile dumneavoastră.'], ['Unde este centrul Volmer?', 'Ne găsiți pe Str. Mitropolit Varlaam 69, Chișinău.']],
    final: 'Primul pas poate fi o discuție simplă.',
  },
  ru: {
    title: 'Слуховые аппараты в Кишинёве: подбор и настройка с учётом вашего слуха',
    intro: 'В Volmer подбор начинается с бесплатной оценки слуха. Познакомьтесь с решениями Unitron, попробуйте аппарат в повседневной жизни по программе Flex Trial и получите индивидуальную настройку и поддержку.',
    book: 'Записаться на бесплатную оценку', catalog: 'Слуховые аппараты', location: 'Кишинёв · ул. Митрополит Варлаам, 69',
    why: 'Понятная поддержка с первой оценки', benefits: [['Бесплатная оценка', 'Обсудим трудности, проверим слух и объясним результаты и возможные решения.'], ['Flex Trial — 2 недели', 'Вы сможете попробовать слуховое решение в обычных ситуациях. Условия уточняются у команды.'], ['Гарантия и поддержка', 'Гарантия 2 года. Настройка и контрольные визиты предоставляются на применимых условиях.']],
    signs: 'Ситуации, которые стоит обсудить', signIntro: 'Такие ситуации могут стать поводом проверить слух, но сами по себе не являются диагнозом.', signsList: ['Трудно следить за разговорами в семье.', 'Голос слышен, но слова разобрать сложно.', 'В ресторане речь теряется в шуме.', 'Окружающим часто приходится повторять.', 'Телевизор кажется слишком тихим для других.', 'Близкий человек не хочет обсуждать слуховой аппарат.'],
    types: 'Разные формы — индивидуальный подбор', typeCards: [['RIC', 'Корпус располагается за ухом, ресивер — в слуховом канале.'], ['BTE', 'Заушный аппарат с трубкой и подходящей акустической адаптацией.'], ['ITE и другие внутриушные формы', 'Индивидуальные решения с учётом строения уха, оценки и доступных моделей.']],
    families: 'Решения Unitron в каталоге Volmer', familyIntro: 'Наличие моделей и конфигураций уточняется отдельно. При выборе учитываются результаты оценки, строение уха и ваши предпочтения.',
    process: 'Как проходит оценка и подбор', steps: ['Обсудим ситуации, в которых стало труднее слышать.', 'Проверим слух и объясним результаты.', 'Определим, какой тип аппарата может подойти.', 'Подберём и настроим подходящее решение.', 'Проверим комфорт и обсудим следующие корректировки.'], duration: 'На визит отводится около 60 минут. Оценка слуха не заменяет полноценный медицинский диагноз.',
    flex: 'Попробуйте аппарат в повседневной жизни', flexText: 'Flex Trial позволяет попробовать слуховое решение в течение двух недель после первоначальной настройки. Обсудим ваши наблюдения дома, на работе и в разговорах. Корректировки зависят от опыта использования. Подробности и условия уточняются на консультации.',
    about: 'Опыт Volmer', aboutText: 'Материнская компания Volmer основана в Лингене (Эмс), Германия, и имеет более 20 лет опыта. Центр в Республике Молдова — отдельный этап развития, посвящённый слуху и слуховым аппаратам.',
    after: 'Поддержка после подбора', afterText: 'Гарантия 2 года, индивидуальная настройка, проверки и обслуживание предоставляются на применимых условиях. Команда объяснит подробности до принятия решения.',
    find: 'Мы находимся в центре Кишинёва', hours: 'Пн–Пт 09:00–18:00 · Сб 09:00–13:00 · Вс закрыто', maps: 'Открыть в Google Maps', officeAlt: 'Реальный вход в центр Volmer в Кишинёве',
    faq: [['Сколько стоит слуховой аппарат в Кишинёве?', 'Цена зависит от модели и конфигурации. Команда объяснит варианты и стоимость до принятия решения.'], ['Оценка слуха бесплатная?', 'Да. Оценка слуха и первичная консультация бесплатны.'], ['Можно попробовать аппарат до покупки?', 'Flex Trial позволяет попробовать решение в повседневной жизни в течение двух недель. Действуют условия программы.'], ['Какой аппарат подойдёт пожилому человеку?', 'Выбор зависит от оценки слуха, моторики, комфорта и повседневных привычек. Универсального варианта нет.'], ['Есть незаметные слуховые аппараты?', 'Некоторые модели RIC и внутриушные аппараты имеют компактную форму. Выбор зависит от строения уха и оценки.'], ['Есть перезаряжаемые аппараты?', 'В каталоге есть модели с аккумулятором и батарейками. Наличие зависит от семейства и конфигурации.'], ['Как настраивают слуховой аппарат?', 'Специалист настраивает аппарат с учётом оценки, комфорта и ваших наблюдений.'], ['Где находится центр Volmer?', 'Адрес: ул. Митрополит Варлаам, 69, Кишинёв.']],
    final: 'Первый шаг — простой разговор.',
  },
} as const;

export async function ChisinauLanding({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const homeHero = await getTranslations({ locale, namespace: 'HomePage.hero' });
  const trustChecks = homeHero.raw('trustChecks') as string[];
  const ru = locale === 'ru';
  const booking = `/${locale}/#booking-form`;
  const catalog = `/${locale}/aparate-auditive/`;
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: ru ? 'Главная' : 'Acasă', item: `${siteConfig.siteUrl}/${locale}/` },
    { '@type': 'ListItem', position: 2, name: ru ? 'Слуховые аппараты в Кишинёве' : 'Aparate auditive în Chișinău', item: `${siteConfig.siteUrl}/${locale}/aparate-auditive-chisinau/` },
  ] };
  return <div className="chisinau-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    <nav className="ch-breadcrumb container" aria-label={ru ? 'Навигационная цепочка' : 'Fir de navigare'}><a href={`/${locale}/`}>{ru ? 'Главная' : 'Acasă'}</a><span aria-hidden="true">/</span><span>{ru ? 'Слуховые аппараты в Кишинёве' : 'Aparate auditive în Chișinău'}</span></nav>
    <section className="hp-hero hp-container" aria-labelledby="chisinau-hero-title">
      <div className="hp-hero-grid">
        <div className="hp-hero-copy">
          <p className="hp-hero-eyebrow">
            <Sparkles size={17} aria-hidden="true" />
            {homeHero('eyebrow')}
          </p>
          <h1 id="chisinau-hero-title">{t.title}</h1>
          <p className="hp-hero-subheadline">{t.location}</p>
          <div className="hp-hero-body"><p>{t.intro}</p></div>
          <ul className="hp-hero-benefits" aria-label={homeHero('eyebrow')}>
            <li><span aria-hidden="true" />{ru ? 'Бесплатная оценка слуха' : 'Evaluare gratuită a auzului'}</li>
            <li><span aria-hidden="true" />{ru ? 'Две недели Flex Trial' : 'Două săptămâni Flex Trial'}</li>
            <li><span aria-hidden="true" />{ru ? 'Индивидуальная настройка и поддержка' : 'Reglare individuală și suport'}</li>
          </ul>
          <div className="hp-hero-actions">
            <a className="hp-button hp-button-primary" href={booking}><CalendarDays size={19} aria-hidden="true" />{t.book}</a>
            <a className="hp-button hp-button-secondary" href={catalog}>{t.catalog}<ArrowRight size={17} aria-hidden="true" /></a>
          </div>
        </div>

        <div className="hp-hero-media">
          <Image src="/images/homepage/hero.webp" alt={homeHero('imageAlt')} fill priority sizes="(max-width: 860px) calc(100vw - 48px), (max-width: 1200px) 43vw, 540px" />
          <span className="hp-hero-image-badge">{homeHero('imageBadge')}</span>
          <div className="hp-hero-floating-card">
            <span className="hp-hero-floating-icon" aria-hidden="true"><Headphones size={22} /></span>
            <span><b>{homeHero('floatingEyebrow')}</b><strong>{homeHero('floatingTitle')}</strong></span>
          </div>
        </div>
      </div>

      <ul className="hp-hero-trust" aria-label={homeHero('eyebrow')}>
        {trustChecks.map((item) => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}
      </ul>
    </section>
    <section className="ch-section container"><h2>{t.why}</h2><div className="ch-card-grid">{t.benefits.map(([title, body]) => <article className="ch-card" key={title}><span className="ch-index">✓</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section className="ch-section ch-soft"><div className="container"><h2>{t.signs}</h2><p className="ch-section-intro">{t.signIntro}</p><div className="ch-sign-grid">{t.signsList.map((item, i) => <div className="ch-sign" key={item}><span>0{i + 1}</span><p>{item}</p></div>)}</div><a className="ch-inline-link" href={booking}>{t.book}<ArrowRight size={17} /></a></div></section>
    <section className="ch-section container"><h2>{t.types}</h2><div className="ch-card-grid">{t.typeCards.map(([title, body], index) => <article className="ch-type-card" key={title}><Image className="ch-type-image" src={['/images/hearing-aids/generated-ric.png','/images/hearing-aids/generated-bte.png','/images/hearing-aids/generated-ite.png'][index]} alt={ru ? `Иллюстрация слухового аппарата формы ${title}` : `Ilustrație cu aparat auditiv de tip ${title}`} width={768} height={512} sizes="(max-width: 760px) calc(100vw - 80px), 28vw" /><h3>{title}</h3><p>{body}</p></article>)}</div></section>
    <section className="ch-section ch-navy"><div className="container"><h2>{t.families}</h2><p className="ch-section-intro">{t.familyIntro}</p><div className="ch-family-grid">{hearingAidFamilies.map((family) => <a className="ch-family" href={`${catalog}#${family.id}`} key={family.id}><Image src={family.image} alt={family.imageAlt[locale]} width={360} height={260} sizes="(max-width: 650px) 90vw, (max-width: 1000px) 42vw, 24vw" /><h3>{family.name}</h3><p>{family.summary[locale]}</p><span>{ru ? 'Подробнее в каталоге' : 'Detalii în catalog'} <ArrowRight size={16} /></span></a>)}</div><a className="ch-button ch-light" href={catalog}>{t.catalog}<ArrowRight size={17} /></a></div></section>
    <section className="ch-section container"><h2>{t.process}</h2><ol className="ch-steps">{t.steps.map((step, i) => <li key={step}><span>{i + 1}</span><p>{step}</p></li>)}</ol><p className="ch-note">{t.duration}</p><a className="ch-inline-link" href={`/${locale}/test-auditiv-gratuit/`}>{ru ? 'Узнать об оценке слуха' : 'Aflați despre evaluarea auzului'}<ArrowRight size={17} /></a></section>
    <section className="ch-feature"><div className="container ch-feature-inner"><div><p className="ch-eyebrow">FLEX TRIAL</p><h2>{t.flex}</h2><p>{t.flexText}</p><a className="ch-button ch-primary" href={`/${locale}/flex-trial/`}>{ru ? 'О программе Flex Trial' : 'Despre Flex Trial'}<ArrowRight size={17} /></a></div><Image src="/images/homepage/meeting.webp" alt={ru ? 'Консультация в Volmer' : 'Consultație la Volmer'} width={900} height={506} sizes="(max-width: 800px) 100vw, 42vw" /></div></section>
    <section className="ch-section container ch-two-col"><div><h2>{t.about}</h2><p>{t.aboutText}</p><a className="ch-inline-link" href={`/${locale}/despre-noi/`}>{ru ? 'О компании Volmer' : 'Despre Volmer'}<ArrowRight size={17} /></a></div><div className="ch-after"><h2>{t.after}</h2><p>{t.afterText}</p></div></section>
    <section className="ch-location"><div className="container ch-location-grid"><div><h2>{t.find}</h2><p className="ch-address"><MapPin />{siteConfig.address}, {siteConfig.city}, {ru ? 'Республика Молдова' : 'Republica Moldova'}</p><p>{t.hours}</p><p><a href={`tel:${siteConfig.phoneInternational}`}><Phone size={18} />{siteConfig.phoneDisplay}</a></p><p><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p><div className="ch-actions"><a className="ch-button ch-primary" href={booking}>{t.book}</a><a className="ch-button ch-secondary" href={siteConfig.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer">{t.maps}<ArrowRight size={17} /></a></div></div><Image src="/images/homepage/volmer-office-facade-current.png" alt={t.officeAlt} width={1482} height={1061} sizes="(max-width: 800px) calc(100vw - 40px), 48vw" /></div></section>
    <section className="ch-section container"><h2>{ru ? 'Частые вопросы' : 'Întrebări frecvente'}</h2><div className="ch-faq">{t.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
    <section className="ch-final"><div className="container"><h2>{t.final}</h2><p>{t.intro}</p><a className="ch-button ch-primary" href={booking}><CalendarDays size={18} />{t.book}</a></div></section>
  </div>;
}
