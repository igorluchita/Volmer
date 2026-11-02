import Image from 'next/image';
import { ArrowRight, CalendarDays, Check, Clock3, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/config/site';
import { blogPosts } from '@/content/seo';
import { hearingAidFamilies, type CatalogLocale } from '@/content/hearing-aids-catalog';
import { hearingAidCategories, hearingAidFaq, selectionSteps } from '@/content/hearing-aids';
import { Breadcrumbs } from '@/components/breadcrumbs';
import './moldova-landing.css';

type LocalizedContent = {
  styles: {
    title: string;
    intro: string;
    items: Record<string, { title: string; description: string; when?: string }>;
  };
  selection: {
    title: string;
    intro: string;
    items: Record<string, { title: string; description: string }>;
  };
  faq: { title: string; items: Record<string, { question: string; answer: string }> };
};

const copy = {
  ro: {
    eyebrow: 'CENTRUL VOLMER · CHIȘINĂU',
    title: 'Aparate auditive în Republica Moldova',
    lead: 'Evaluarea auzului, alegerea unei soluții Unitron și reglarea ei individuală — cu sprijinul echipei Volmer din Chișinău.',
    heroAlt: 'Bunic și nepoată într-o conversație apropiată',
    book: 'Programați evaluarea gratuită',
    catalog: 'Explorați catalogul',
    location: 'Str. Mitropolit Varlaam 69, Chișinău',
    trust: [
      ['Evaluare gratuită', 'Discuție și verificarea auzului'],
      ['Aproximativ 60 min', 'Timp rezervat pentru vizită'],
      ['Flex Trial', 'Probă de două săptămâni, conform condițiilor'],
    ],
    supportKicker: 'DE LA PRIMA DISCUȚIE',
    supportTitle: 'Un parcurs clar, adaptat auzului și vieții dumneavoastră',
    supportLead: 'Centrul Volmer este în Chișinău. Aici puteți discuta despre auz, explora aparatele disponibile și primi sprijin după alegere.',
    supportCards: [
      ['01', 'Înțelegem situațiile dificile', 'Pornim de la conversațiile, locurile și momentele în care auzul vă încurcă. Exemplele concrete ajută la o discuție mai bună.'],
      ['02', 'Evaluăm și explicăm', 'Verificarea oferă informații despre auz. Specialistul explică rezultatele și opțiunile; evaluarea nu înlocuiește un diagnostic medical complet.'],
      ['03', 'Alegem și ajustăm', 'Comparați forme și funcții din catalog. Dacă alegeți un aparat, setările se fac individual și pot fi revizuite după experiența de utilizare.'],
    ],
    familiesKicker: 'CATALOG UNITRON',
    familiesTitle: 'Familii de aparate disponibile prin Volmer',
    familiesLead: 'Catalogul include forme și configurații diferite. Disponibilitatea exactă se confirmă la consultație, iar recomandarea pornește de la evaluarea auzului.',
    familyAction: 'Vezi familia în catalog',
    allCatalog: 'Deschideți catalogul complet',
    formsKicker: 'FORME ȘI POTRIVIRE',
    formsAction: 'Citiți despre opțiuni în catalog',
    processKicker: 'ALEGERE INDIVIDUALĂ',
    resultLabel: 'Scopul este o alegere informată:',
    resultText: 'nu există un singur aparat potrivit tuturor.',
    flexKicker: 'PROBĂ ÎN VIAȚA DE ZI CU ZI',
    flexTitle: 'Descoperiți cum vi se potrivește aparatul în situații reale',
    flexText: 'Flex Trial poate oferi două săptămâni pentru a testa o soluție auditivă după reglarea inițială. Notați ce observați acasă, la serviciu și în conversații; detaliile și condițiile programului se confirmă cu echipa.',
    flexAction: 'Aflați despre Flex Trial',
    careKicker: 'SPRIJIN ÎN CONTINUARE',
    careTitle: 'Reglare și suport după alegere',
    careText: 'Confortul și înțelegerea sunetelor se pot schimba pe măsură ce folosiți aparatul. Volmer oferă reglare, verificare și întreținere conform condițiilor explicate la consultație.',
    aboutTitle: 'Experiență germană, centru local în Chișinău',
    aboutText: 'Compania-mamă Volmer își are originea în Lingen (Ems), Germania, și are peste 20 de ani de experiență. Centrul din Republica Moldova oferă servicii dedicate auzului și aparatelor auditive.',
    officeAlt: 'Intrarea în centrul Volmer din Chișinău',
    guidesKicker: 'INFORMAȚII UTILE',
    guidesTitle: 'Ghiduri despre auz și aparate auditive',
    readGuide: 'Citiți ghidul',
    faqTitle: 'Întrebări despre aparatele auditive',
    contactKicker: 'VĂ AȘTEPTĂM LA CHIȘINĂU',
    contactTitle: 'Începeți cu o discuție despre auzul dumneavoastră',
    contactText: 'Alegeți o oră pentru evaluare sau sunați-ne dacă doriți să clarificați ceva înainte de vizită.',
    address: 'Adresă',
    hours: 'Program',
    weekdays: 'Luni–Vineri',
    saturday: 'Sâmbătă',
    closed: 'Duminică închis',
    directions: 'Deschideți Google Maps',
    call: 'Sunați la',
  },
  ru: {
    eyebrow: 'ЦЕНТР VOLMER · КИШИНЁВ',
    title: 'Слуховые аппараты в Республике Молдова',
    lead: 'Проверка слуха, выбор решения Unitron и индивидуальная настройка — с поддержкой команды Volmer в Кишинёве.',
    heroAlt: 'Дедушка и внучка беседуют',
    book: 'Записаться на бесплатную проверку',
    catalog: 'Посмотреть каталог',
    location: 'Кишинёв, ул. Митрополит Варлаам, 69',
    trust: [
      ['Бесплатная проверка', 'Беседа и оценка слуха'],
      ['Около 60 минут', 'Время для спокойного визита'],
      ['Flex Trial', 'Пробный период две недели на условиях программы'],
    ],
    supportKicker: 'С ПЕРВОГО РАЗГОВОРА',
    supportTitle: 'Понятный путь с учётом слуха и вашей повседневной жизни',
    supportLead: 'Центр Volmer находится в Кишинёве. Здесь можно обсудить слух, познакомиться с доступными аппаратами и получить поддержку после выбора.',
    supportCards: [
      ['01', 'Обсудим сложные ситуации', 'Начнём с разговоров, мест и моментов, в которых стало труднее слышать. Конкретные примеры помогают лучше понять задачу.'],
      ['02', 'Проверим и объясним', 'Проверка даст информацию о слухе. Специалист объяснит результаты и варианты; она не заменяет полноценный медицинский диагноз.'],
      ['03', 'Подберём и настроим', 'Сравните формы и функции из каталога. Если вы выберете аппарат, настройки выполняются индивидуально и могут корректироваться по мере использования.'],
    ],
    familiesKicker: 'КАТАЛОГ UNITRON',
    familiesTitle: 'Семейства аппаратов в каталоге Volmer',
    familiesLead: 'В каталоге представлены разные формы и конфигурации. Наличие уточняется на консультации, а подбор начинается с проверки слуха.',
    familyAction: 'Семейство в каталоге',
    allCatalog: 'Открыть полный каталог',
    formsKicker: 'ФОРМА И ПОСАДКА',
    formsAction: 'Подробнее о вариантах в каталоге',
    processKicker: 'ИНДИВИДУАЛЬНЫЙ ПОДБОР',
    resultLabel: 'Цель — осознанный выбор:',
    resultText: 'единственного подходящего всем аппарата нет.',
    flexKicker: 'ПРОБА В ПОВСЕДНЕВНОЙ ЖИЗНИ',
    flexTitle: 'Оцените аппарат в привычных ситуациях',
    flexText: 'Flex Trial может предоставить две недели для тестирования слухового решения после первоначальной настройки. Отмечайте впечатления дома, на работе и в разговорах; подробности и условия программы уточняются у команды.',
    flexAction: 'О программе Flex Trial',
    careKicker: 'ПОСЛЕДУЮЩАЯ ПОДДЕРЖКА',
    careTitle: 'Настройка и помощь после выбора',
    careText: 'Комфорт и восприятие звуков могут меняться по мере использования аппарата. Volmer предлагает настройку, проверку и обслуживание на условиях, объяснённых на консультации.',
    aboutTitle: 'Немецкий опыт и местный центр в Кишинёве',
    aboutText: 'Материнская компания Volmer основана в Лингене (Эмс), Германия, и имеет более 20 лет опыта. Центр в Республике Молдова занимается услугами для слуха и слуховыми аппаратами.',
    officeAlt: 'Вход в центр Volmer в Кишинёве',
    guidesKicker: 'ПОЛЕЗНАЯ ИНФОРМАЦИЯ',
    guidesTitle: 'Материалы о слухе и слуховых аппаратах',
    readGuide: 'Читать материал',
    faqTitle: 'Вопросы о слуховых аппаратах',
    contactKicker: 'ЖДЁМ ВАС В КИШИНЁВЕ',
    contactTitle: 'Начните с разговора о вашем слухе',
    contactText: 'Выберите время для проверки или позвоните, если хотите что-то уточнить перед визитом.',
    address: 'Адрес',
    hours: 'График работы',
    weekdays: 'Понедельник–пятница',
    saturday: 'Суббота',
    closed: 'Воскресенье — выходной',
    directions: 'Открыть Google Maps',
    call: 'Позвонить:',
  },
} as const;

export async function MoldovaLanding({ locale }: { locale: CatalogLocale }) {
  const t = copy[locale];
  const translations = await getTranslations({ locale, namespace: 'HearingAidsPage' });
  const content = translations.raw('content') as LocalizedContent;
  const faqs = hearingAidFaq.map((key) => content.faq.items[key]);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
  const localeBlogs = blogPosts[locale];

  return <main className="moldova-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <Breadcrumbs locale={locale} label={t.title} path="aparate-auditive-moldova" />

    <section className="md-hero">
      <div className="md-wrap md-hero-grid">
        <div className="md-hero-copy">
          <p className="md-eyebrow"><MapPin size={15} aria-hidden="true" />{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="md-lead">{t.lead}</p>
          <p className="md-location"><MapPin size={17} aria-hidden="true" />{t.location}</p>
          <div className="md-actions">
            <a className="md-button md-button-primary" href={`/${locale}/#booking-form`}><CalendarDays size={18} aria-hidden="true" />{t.book}</a>
            <a className="md-button md-button-secondary" href={`/${locale}/aparate-auditive/#catalog`}>{t.catalog}<ArrowRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="md-hero-visual">
          <Image src="/images/homepage/hero.webp" alt={t.heroAlt} fill priority sizes="(max-width: 760px) 100vw, 52vw" />
          <div className="md-image-caption"><ShieldCheck size={18} aria-hidden="true" /><span>{locale === 'ro' ? 'Alegere și sprijin, pas cu pas' : 'Подбор и поддержка — шаг за шагом'}</span></div>
        </div>
      </div>
      <div className="md-wrap md-trust-row">
        {t.trust.map(([title, description], index) => <article className="md-trust-card" key={title}><span>0{index + 1}</span><div><strong>{title}</strong><p>{description}</p></div></article>)}
      </div>
    </section>

    <section className="md-section md-wrap">
      <header className="md-heading"><p className="md-kicker">{t.supportKicker}</p><h2>{t.supportTitle}</h2><p>{t.supportLead}</p></header>
      <div className="md-support-grid">
        {t.supportCards.map(([number, title, description]) => <article className="md-support-card" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}
      </div>
    </section>

    <section className="md-family-band" id="catalog">
      <div className="md-wrap md-section">
        <header className="md-heading"><p className="md-kicker">{t.familiesKicker}</p><h2>{t.familiesTitle}</h2><p>{t.familiesLead}</p></header>
        <div className="md-family-grid">
          {hearingAidFamilies.map((family) => <article className="md-family-card" key={family.id}>
            <a className="md-family-image" href={`/${locale}/aparate-auditive/#${family.id}`} aria-label={`${t.familyAction}: ${family.name}`}>
              <Image src={family.image} alt={family.imageAlt[locale]} fill sizes="(max-width: 680px) 90vw, (max-width: 1000px) 45vw, 25vw" />
            </a>
            <div className="md-family-copy"><p>{family.platform[locale]}</p><h3>{family.name}</h3><span>{family.summary[locale]}</span><a href={`/${locale}/aparate-auditive/#${family.id}`}>{t.familyAction}<ArrowRight size={15} aria-hidden="true" /></a></div>
          </article>)}
        </div>
        <a className="md-text-link" href={`/${locale}/aparate-auditive/`}>{t.allCatalog}<ArrowRight size={16} aria-hidden="true" /></a>
      </div>
    </section>

    <section className="md-section md-wrap md-forms">
      <header className="md-heading"><p className="md-kicker">{t.formsKicker}</p><h2>{content.styles.title}</h2><p>{content.styles.intro}</p></header>
      <div className="md-form-grid">
        {hearingAidCategories.map((key) => {
          const item = content.styles.items[key];
          return <article className="md-form-card" key={key}>
            <div className="md-form-image"><Image src={`/images/hearing-aids/${key.toUpperCase()}.png`} alt={item.title} fill sizes="(max-width: 680px) 85vw, 30vw" /></div>
            <h3>{item.title}</h3><p>{item.description}</p>{item.when && <p className="md-form-note">{item.when}</p>}
          </article>;
        })}
      </div>
      <a className="md-text-link" href={`/${locale}/aparate-auditive/#tipuri`}>{t.formsAction}<ArrowRight size={16} aria-hidden="true" /></a>
    </section>

    <section className="md-process-band">
      <div className="md-wrap md-section">
        <header className="md-heading"><p className="md-kicker">{t.processKicker}</p><h2>{content.selection.title}</h2><p>{content.selection.intro}</p></header>
        <div className="md-steps">
          {selectionSteps.map((key, index) => <article key={key}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{content.selection.items[key].title}</h3><p>{content.selection.items[key].description}</p></div></article>)}
        </div>
        <p className="md-result"><Check size={18} aria-hidden="true" /><strong>{t.resultLabel}</strong> {t.resultText}</p>
      </div>
    </section>

    <section className="md-section md-wrap md-trial-grid">
      <div className="md-trial-photo"><Image src="/images/homepage/meeting.webp" alt={locale === 'ro' ? 'Discuție de familie într-un apel video' : 'Семейный разговор по видеосвязи'} fill sizes="(max-width: 760px) 100vw, 46vw" /></div>
      <div className="md-trial-copy"><p className="md-kicker">{t.flexKicker}</p><h2>{t.flexTitle}</h2><p>{t.flexText}</p><a className="md-text-link" href={`/${locale}/flex-trial/`}>{t.flexAction}<ArrowRight size={16} aria-hidden="true" /></a></div>
    </section>

    <section className="md-about-band">
      <div className="md-wrap md-about-grid">
        <div><p className="md-kicker">{t.careKicker}</p><h2>{t.careTitle}</h2><p>{t.careText}</p><h3>{t.aboutTitle}</h3><p>{t.aboutText}</p></div>
        <Image src="/images/homepage/volmer-office-facade-current.png" alt={t.officeAlt} width={900} height={620} sizes="(max-width: 760px) 100vw, 48vw" />
      </div>
    </section>

    <section className="md-section md-wrap">
      <header className="md-heading"><p className="md-kicker">{t.guidesKicker}</p><h2>{t.guidesTitle}</h2></header>
      <div className="md-guide-grid">
        {localeBlogs.slice(0, 3).map((post, index) => <article className="md-guide-card" key={post.slug}>
          <div className={`md-guide-art md-guide-art-${index + 1}`} aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span></div>
          <p>{post.category}</p><h3>{post.title}</h3><span>{post.description}</span><a href={`/${locale}/blog/${post.slug}/`}>{t.readGuide}<ArrowRight size={15} aria-hidden="true" /></a>
        </article>)}
      </div>
    </section>

    <section className="md-faq-band">
      <div className="md-wrap md-section md-faq">
        <header className="md-heading"><p className="md-kicker">FAQ</p><h2>{t.faqTitle}</h2></header>
        {faqs.map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}
      </div>
    </section>

    <section className="md-contact-band" id="contact">
      <div className="md-wrap md-contact-grid">
        <div className="md-contact-copy"><p className="md-kicker">{t.contactKicker}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p><a className="md-button md-button-primary" href={`/${locale}/#booking-form`}><CalendarDays size={18} aria-hidden="true" />{t.book}</a><a className="md-phone-link" href={`tel:${siteConfig.phoneInternational}`}><Phone size={18} aria-hidden="true" />{t.call} {siteConfig.phoneDisplay}</a></div>
        <div className="md-address-card"><div className="md-address-icon"><MapPin size={22} aria-hidden="true" /></div><p>{t.address}</p><strong>{siteConfig.address}, {siteConfig.city}, {locale === 'ro' ? 'Republica Moldova' : 'Молдова'}</strong><a href={siteConfig.googleMapsDirectionsUrl} target="_blank" rel="noreferrer">{t.directions}<ArrowRight size={15} aria-hidden="true" /></a><hr /><p><Clock3 size={16} aria-hidden="true" />{t.hours}</p><strong>{t.weekdays}: {siteConfig.businessHours[0].hours}<br />{t.saturday}: {siteConfig.businessHours[1].hours}<br />{t.closed}</strong></div>
      </div>
    </section>
  </main>;
}
