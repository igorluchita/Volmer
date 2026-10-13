import Image from 'next/image';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ArrowRight, CalendarDays, Check, Clock3, CreditCard, HeartHandshake, Languages, Mail, MapPin, Phone, ShieldCheck} from 'lucide-react';
import {Breadcrumbs} from '@/components/breadcrumbs';
import {BusinessHours} from '@/components/business-hours';
import {ConsentMap} from '@/components/consent/ConsentMap';
import {QuickContactLinks} from '@/components/quick-contact-links';
import {TrackedMessengerLink} from '@/components/tracked-messenger-link';
import {LeadForm} from '@/components/lead-form';
import {ContactRequestForm} from '@/components/home/ContactRequestForm';
import HearingTest from '@/components/hearing-test-page';
import {siteConfig} from '@/config/site';
import {ageOnDate, type BirthDate} from '@/lib/age';
import {editorialContent, editorialPath, type EditorialLocale, type EditorialType} from '@/content/editorial-pages';
import {hearingAidFamilies, priceClasses, technologyLevels} from '@/content/hearing-aids-catalog';

export async function EditorialPage({locale, type}: {locale: EditorialLocale; type: EditorialType}) {
  setRequestLocale(locale);
  const page = editorialContent(locale, type);
  const t = await getTranslations({locale, namespace: 'EditorialUI'});
  const homeFaq = type === 'faq' ? await getTranslations({locale, namespace: 'HomePage.faq'}) : null;
  const reusedQuestions = homeFaq ? (homeFaq.raw('items') as {question: string; answer: string}[]).filter((_, index) => [0, 4, 5, 8].includes(index)) : [];
  const questions = [...reusedQuestions, ...(page.faqs ?? [])];
  const path = editorialPath(locale, type).split('/')[2];
  if (type === 'test') return <HearingTest locale={locale} path={path} />;
  if (type === 'about') return <AboutPage locale={locale} page={page} />;

  const faqSchema = questions.length ? {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: questions.map(({question, answer}) => ({'@type': 'Question', name: question, acceptedAnswer: {'@type': 'Answer', text: answer}}))
  } : null;
  if (type === 'contact') return <ContactPage locale={locale} page={page} questions={questions} faqSchema={faqSchema} />;
  if (type === 'diaspora') return <DiasporaLanding locale={locale} page={page} faqSchema={faqSchema} />;
  if (type === 'team') return <TeamPage locale={locale} page={page} />;
  return <div className="editorial-page">
    <Breadcrumbs locale={locale} label={page.title} path={path} />
    {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}} />}
    <header className="editorial-hero">
      <div className="container"><p className="editorial-eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.lead}</p>
        <a className="editorial-primary" href={`/${locale}/#booking-form`}>{t('book')} <ArrowRight size={18} aria-hidden="true" /></a>
      </div>
    </header>
    <div className="container editorial-body">
      {type === 'cnam' && <p className="editorial-disclosure">{t('cnamNotice')}</p>}
      {type === 'dementia' && <p className="editorial-disclosure">{t('medicalNotice')}</p>}
      {page.sections.length > 0 && <div className="editorial-section-grid">
        {page.sections.map((section, index) => <section className="editorial-section-card" key={section.title}>
          <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <h2>{section.title}</h2><p>{section.text}</p>
          {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
        </section>)}
      </div>}
      {page.source && <p className="editorial-source">{t('source')}: <a href={page.source.href} target="_blank" rel="noopener noreferrer">{page.source.label}<ArrowRight size={15} aria-hidden="true" /></a></p>}
      {questions.length > 0 && <section className="editorial-faq" aria-labelledby="editorial-faq-title"><h2 id="editorial-faq-title">{t('faqTitle')}</h2>
        {questions.map(({question, answer}) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
      </section>}
      {page.related && <nav className="editorial-related" aria-label={t('related')}><h2>{t('related')}</h2><div>{page.related.map((related) => <a href={editorialPath(locale, related)} key={related}>{editorialContent(locale, related).title}<ArrowRight size={16} aria-hidden="true" /></a>)}</div></nav>}
      <section className="editorial-final"><div><h2>{t('finalTitle')}</h2><p>{t('finalText')}</p></div><a className="editorial-primary" href={`/${locale}/#booking-form`}>{t('book')}<ArrowRight size={18} aria-hidden="true" /></a></section>
    </div>
  </div>;
}

function ContactPage({locale, page, questions, faqSchema}: {locale: EditorialLocale; page: ReturnType<typeof editorialContent>; questions: {question: string; answer: string}[]; faqSchema: object | null}) {
  const ru = locale === 'ru';
  const text = ru ? {
    book: 'Записаться', call: 'Позвонить: 079 331 839', quickTitle: 'Как с нами связаться?', contactKicker: 'КОНТАКТЫ', emailAction: 'Написать письмо',
    phone: 'Телефон', callNow: 'Позвонить сейчас', whatsapp: 'Написать в WhatsApp', viber: 'Написать в Viber', email: 'Электронная почта',
    bookingTitle: 'Онлайн-запись', duration: 'На каждую запись отводится 60 минут — для проверки слуха, объяснений и ваших вопросов.',
    locationTitle: 'Посетите центр Volmer в центре Кишинёва', addressLabel: 'Адрес', hoursTitle: 'Часы работы',
    officeCaption: 'Так выглядит вход в Volmer', directions: 'Построить маршрут в Google Maps',
    prepareTitle: 'Перед визитом', prepare: [
      'Если у вас есть предыдущая аудиограмма, возьмите её с собой.',
      'Если вы уже пользуетесь слуховыми аппаратами, принесите их на приём.',
      'Вспомните ситуации, в которых вам труднее всего слышать: дома, на работе, в компании или в шуме.',
      'Подготовьте вопросы, которые хотите задать специалисту.'
    ],
    visitTitle: 'Что будет на первом визите', visit: [
      ['Обсуждение', 'Поговорим о ситуациях, в которых вы замечаете трудности со слухом, и о ваших вопросах.'],
      ['Проверка слуха', 'Проведём необходимые тесты, чтобы оценить слуховые пороги.'],
      ['Объяснение результатов', 'Обсудим результаты понятным языком и ответим на вопросы.'],
      ['Возможные решения', 'При необходимости расскажем о подходящих вариантах слуховых аппаратов.'],
      ['Следующий шаг', 'Если выбранное решение подходит, обсудим настройку и возможность Flex Trial.']
    ],
    servicesTitle: 'Чем мы можем помочь', services: ['Проверка слуха и консультация', 'Подбор слухового аппарата', 'Настройка и корректировка', 'Поддержка при пользовании слуховым аппаратом', 'Flex Trial — пробный период по согласованию'],
    testLink: 'Как проходит проверка слуха', hearingLink: 'Слуховые аппараты', faqLink: 'Частые вопросы',
    faqTitle: 'Практические вопросы', finalTitle: 'Выберите удобные дату и время', finalText: 'На каждую запись отводится 60 минут.', mapTitle: 'Карта центра Volmer. Google Maps загружается только после согласия на необходимые cookie.'
  } : {
    book: 'Programați-vă', call: 'Sunați: 079 331 839', quickTitle: 'Cum preferați să ne contactați?', contactKicker: 'CONTACT RAPID', emailAction: 'Trimiteți un mesaj',
    phone: 'Telefon', callNow: 'Sunați acum', whatsapp: 'Scrieți-ne pe WhatsApp', viber: 'Scrieți-ne pe Viber', email: 'Email',
    bookingTitle: 'Programare online', duration: 'Rezervăm 60 de minute pentru fiecare programare, ca să avem timp pentru evaluare, explicații și întrebări.',
    locationTitle: 'Vă așteptăm în centrul Chișinăului', addressLabel: 'Adresa', hoursTitle: 'Program',
    officeCaption: 'Așa arată intrarea în oficiul Volmer', directions: 'Deschideți traseul în Google Maps',
    prepareTitle: 'Înainte de vizită', prepare: [
      'Dacă aveți o audiogramă anterioară, o puteți aduce cu dumneavoastră.',
      'Dacă folosiți deja aparate auditive, aduceți-le la programare.',
      'Gândiți-vă la situațiile în care vă este cel mai greu să auziți: acasă, la serviciu, în grup sau în zgomot.',
      'Pregătiți întrebările pe care doriți să ni le adresați.'
    ],
    visitTitle: 'La ce să vă așteptați la prima vizită', visit: [
      ['Discuție', 'Începem cu situațiile în care observați dificultăți de auz și cu întrebările dumneavoastră.'],
      ['Evaluarea auzului', 'Realizăm testele auditive necesare pentru a înțelege pragurile auzului.'],
      ['Explicarea rezultatelor', 'Vă explicăm rezultatele într-un limbaj ușor de înțeles.'],
      ['Opțiuni potrivite', 'Dacă este cazul, discutăm tipurile de aparate și soluțiile potrivite.'],
      ['Următorul pas', 'Dacă o soluție este potrivită, discutăm reglajul și posibilitatea Flex Trial.']
    ],
    servicesTitle: 'Cu ce vă putem ajuta', services: ['Evaluarea auzului și consultație', 'Alegerea aparatului auditiv', 'Reglaj și ajustări', 'Sprijin pentru utilizarea aparatului auditiv', 'Flex Trial — perioadă de testare, discutată cu echipa'],
    testLink: 'Cum se desfășoară evaluarea auzului', hearingLink: 'Aparate auditive', faqLink: 'Întrebări frecvente',
    faqTitle: 'Întrebări practice', finalTitle: 'Alegeți o zi și o oră potrivită', finalText: 'Rezervăm 60 de minute pentru fiecare programare.', mapTitle: 'Harta centrului Volmer. Google Maps se încarcă numai după acordul pentru cookie-urile necesare.'
  };
  const mapUrl = siteConfig.googleMapsEmbedUrl || `https://maps.google.com/maps?q=${encodeURIComponent(`${siteConfig.address}, ${siteConfig.city}`)}&output=embed`;
  const related = [
    {href: `/${locale}/${ru ? 'test-auditiv-gratuit' : 'test-auditiv-gratuit'}/`, label: text.testLink},
    {href: `/${locale}/aparate-auditive/`, label: text.hearingLink},
    {href: editorialPath(locale, 'faq'), label: text.faqLink}
  ];
  return <div className="editorial-page contact-page">
    <Breadcrumbs locale={locale} label={page.title} path="contact" />
    {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}} />}
    <header className="contact-hero"><div className="container contact-hero-inner"><p className="editorial-eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.lead}</p><div className="contact-hero-details"><a href={`tel:${siteConfig.phoneInternational}`}><Phone aria-hidden="true" />{siteConfig.phoneDisplay}</a><span><MapPin aria-hidden="true" />{siteConfig.address}, {siteConfig.city}</span></div><div className="contact-hero-actions"><a className="editorial-primary" href={`/${locale}/#booking-form`}>{text.book}<ArrowRight size={18} aria-hidden="true" /></a><a className="contact-hero-call" href={`tel:${siteConfig.phoneInternational}`}>{text.call}</a></div></div></header>
    <div className="container contact-content">
      <section className="contact-methods" aria-labelledby="contact-methods-title"><div className="contact-section-heading"><p className="contact-kicker">{text.contactKicker}</p><h2 id="contact-methods-title">{text.quickTitle}</h2></div><div className="contact-method-grid">
        <a href={`tel:${siteConfig.phoneInternational}`}><span>{text.phone}</span><strong>{siteConfig.phoneDisplay}</strong><small>{text.callNow}</small><Phone aria-hidden="true" /></a>
        <TrackedMessengerLink messenger="whatsapp" href={siteConfig.quickContact.whatsapp} target="_blank" rel="noopener noreferrer"><span>WhatsApp</span><strong>{text.whatsapp}</strong><small>{ru ? 'Открыть переписку' : 'Deschideți conversația'}</small><ArrowRight aria-hidden="true" /></TrackedMessengerLink>
        <TrackedMessengerLink messenger="viber" href={siteConfig.quickContact.viber}><span>Viber</span><strong>{text.viber}</strong><small>{ru ? 'Открыть переписку' : 'Deschideți conversația'}</small><ArrowRight aria-hidden="true" /></TrackedMessengerLink>
        <a href={`mailto:${siteConfig.email}`}><span>{text.email}</span><strong>{siteConfig.email}</strong><small>{text.emailAction}</small><Mail aria-hidden="true" /></a>
      </div></section>

      <section className="contact-booking-section" id="contact-booking" aria-labelledby="contact-booking-title"><div className="contact-booking-heading"><p className="contact-kicker">{text.bookingTitle}</p><h2 id="contact-booking-title">{text.bookingTitle}</h2><p>{text.duration}</p></div><ContactRequestForm /></section>

      <section className="contact-location" aria-labelledby="contact-location-title"><div className="contact-location-details"><p className="contact-kicker">{text.addressLabel}</p><h2 id="contact-location-title">{text.locationTitle}</h2><div className="contact-address"><MapPin aria-hidden="true" /><div><strong>Volmer</strong><span>{siteConfig.address}</span><span>{siteConfig.city}, {ru ? 'Республика Молдова' : 'Republica Moldova'}</span></div></div><p className="contact-location-line"><Phone aria-hidden="true" /><a href={`tel:${siteConfig.phoneInternational}`}>{siteConfig.phoneDisplay}</a></p><p className="contact-location-line"><Mail aria-hidden="true" /><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p><div className="contact-hours"><h3>{text.hoursTitle}</h3><BusinessHours showWeekdayBreak /></div><a className="contact-directions" href={siteConfig.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer">{text.directions}<ArrowRight size={17} aria-hidden="true" /></a></div><div className="contact-location-media"><figure><Image src="/images/homepage/volmer-office-facade-current.png" alt={ru ? 'Вход в центр Volmer на улице Митрополит Варлаам, 69' : 'Intrarea în centrul Volmer de pe Str. Mitropolit Varlaam 69'} width={1482} height={1061} sizes="(max-width: 900px) calc(100vw - 48px), (max-width: 1200px) 50vw, 650px" /><figcaption>{text.officeCaption}</figcaption></figure><ConsentMap src={mapUrl} className="contact-page-map" title={text.mapTitle} /></div></section>

      <section className="contact-practical-grid"><div className="contact-before-visit"><p className="contact-kicker">{ru ? 'ПОДГОТОВКА' : 'PREGĂTIRE'}</p><h2>{text.prepareTitle}</h2><ul>{text.prepare.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul><p className="contact-recommendation">{ru ? 'Это рекомендации, а не обязательные условия.' : 'Sunt recomandări, nu condiții obligatorii.'}</p></div><div className="contact-services"><p className="contact-kicker">{ru ? 'УСЛУГИ' : 'SERVICII'}</p><h2>{text.servicesTitle}</h2><ul>{text.services.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul></div></section>

      <section className="contact-first-visit" aria-labelledby="contact-first-visit-title"><div className="contact-section-heading"><p className="contact-kicker">{ru ? 'ПЕРВОЕ ПОСЕЩЕНИЕ' : 'PRIMA VIZITĂ'}</p><h2 id="contact-first-visit-title">{text.visitTitle}</h2></div><ol>{text.visit.map(([title, description], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol><a className="contact-more-link" href={`/${locale}/test-auditiv-gratuit/`}>{text.testLink}<ArrowRight size={17} aria-hidden="true" /></a></section>

      <section className="contact-faq" aria-labelledby="contact-faq-title"><h2 id="contact-faq-title">{text.faqTitle}</h2>{questions.map(({question, answer}) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
      <nav className="contact-related" aria-label={ru ? 'Полезные страницы' : 'Pagini utile'}>{related.map((item) => <a key={item.href} href={item.href}>{item.label}<ArrowRight size={16} aria-hidden="true" /></a>)}</nav>
      <section className="contact-final"><div><h2>{text.finalTitle}</h2><p>{text.finalText}</p></div><a className="editorial-primary" href={`/${locale}/#booking-form`}>{text.book}<ArrowRight size={18} aria-hidden="true" /></a></section>
    </div>
  </div>;
}

function TeamPage({locale, page}: {locale: EditorialLocale; page: ReturnType<typeof editorialContent>}) {
  const ru = locale === 'ru';
  const people = ru ? [
    {name: 'Jens Volmer', initials: 'JV', image: '/images/team/jens-volmer.png', birthDate: {year: 1978, month: 4, day: 9}, role: 'Основатель Volmer в Германии и Молдове', detail: ''},
    {name: 'Igor Luchița', initials: 'IL', image: '/images/team/igor-luchita.jpg', birthDate: {year: 2000, month: 8, day: 7}, role: 'Акустик-техник, специалист по слухопротезированию', detail: 'Профильное образование получил в Германии.'},
    {name: 'Timofei Stratanenco', initials: 'TS', image: '/images/team/timofei-stratanenco.png', birthDate: {year: 1993, month: 6, day: 15}, role: 'Основатель Volmer в Молдове', detail: 'Профильное образование получил в Германии.'},
  ] : [
    {name: 'Jens Volmer', initials: 'JV', image: '/images/team/jens-volmer.png', birthDate: {year: 1978, month: 4, day: 9}, role: 'Fondator Volmer în Germania și Moldova', detail: ''},
    {name: 'Igor Luchița', initials: 'IL', image: '/images/team/igor-luchita.jpg', birthDate: {year: 2000, month: 8, day: 7}, role: 'Acustician tehnician audioprotezist', detail: 'Studii de specialitate în Germania.'},
    {name: 'Timofei Stratanenco', initials: 'TS', image: '/images/team/timofei-stratanenco.png', birthDate: {year: 1993, month: 6, day: 15}, role: 'Fondator Volmer Moldova', detail: 'Studii de specialitate în Germania.'},
  ];
  const formatAge = (birthDate: BirthDate) => {
    const age = ageOnDate(birthDate);
    if (ru) {
      const mod100 = age % 100;
      const mod10 = age % 10;
      const years = mod100 >= 11 && mod100 <= 14 ? 'лет' : mod10 === 1 ? 'год' : mod10 >= 2 && mod10 <= 4 ? 'года' : 'лет';
      return `${age} ${years}`;
    }
    return `${age} ani`;
  };
  const profiles = people;
  const germanSpecialists = [
    {name: 'Jochen Schmidt', initials: 'JS', image: '/images/team/jochen-schmidt.png', birthDate: {year: 1983, month: 10, day: 24}, role: ru ? 'Акустик-техник, специалист по слухопротезированию' : 'Acustician tehnician audioprotezist'},
    {name: 'Mareike Fickers', initials: 'MF', image: '/images/team/mareike-fickers.png', birthDate: {year: 1999, month: 3, day: 24}, role: ru ? 'Акустик-техник, специалист по слухопротезированию' : 'Acustician tehnician audioprotezist'},
  ];
  return <div className="editorial-page team-page">
    <Breadcrumbs locale={locale} label={page.title} path="echipa" />
    <header className="editorial-hero"><div className="container"><p className="editorial-eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.lead}</p></div></header>
    <section className="container team-page-content">
      <section className="team-roster-section" aria-labelledby="team-current-title">
        <h2 className="team-roster-title" id="team-current-title">{ru ? 'Команда Volmer' : 'Echipa Volmer'}</h2>
        <div className="team-profile-grid">{profiles.map((person) => <article className="team-profile" key={person.name}>{person.image ? <Image className="team-profile-avatar team-profile-photo" src={person.image} alt={ru ? `Фото ${person.name}` : `Fotografia lui ${person.name}`} width={132} height={132} sizes="(max-width: 760px) 88px, 132px" /> : <div className="team-profile-avatar" aria-hidden="true">{person.initials}</div>}<div><h3>{person.name}</h3>{person.role && <p className="team-profile-role">{person.role}</p>}{person.detail && <p className="team-profile-detail">{person.detail}</p>}<p className="team-profile-detail">{ru ? 'Возраст' : 'Vârsta'}: {formatAge(person.birthDate)}</p></div></article>)}</div>
      </section>
      <section className="team-roster-section team-incoming-section" aria-labelledby="team-germany-title">
        <div className="team-roster-heading"><h2 className="team-roster-title" id="team-germany-title">{ru ? 'Специалисты из Германии' : 'Specialiști din Germania'}</h2><p>{ru ? 'В дальнейшем они также будут работать в Volmer.' : 'În perioada următoare, vor activa și la Volmer.'}</p></div>
        <div className="team-profile-grid">{germanSpecialists.map((person) => <article className="team-profile" key={person.name}>{person.image ? <Image className="team-profile-avatar team-profile-photo" src={person.image} alt={ru ? `Фото ${person.name}` : `Fotografia lui ${person.name}`} width={132} height={132} sizes="(max-width: 760px) 88px, 132px" /> : <div className="team-profile-avatar" aria-hidden="true">{person.initials}</div>}<div><h3>{person.name}</h3><p className="team-profile-role">{person.role}</p><p className="team-profile-detail">{ru ? 'Возраст' : 'Vârsta'}: {formatAge(person.birthDate)}</p></div></article>)}</div>
      </section>
      <section className="team-page-note"><p>{ru ? 'Мы добавляем сведения о специалистах только после подтверждения.' : 'Adăugăm informații despre specialiști doar după confirmare.'}</p><a className="editorial-primary" href={`/${locale}/#contact`}>{ru ? 'Связаться с командой' : 'Contactați echipa'}<ArrowRight size={18} aria-hidden="true" /></a></section>
    </section>
  </div>;
}

function AboutPage({locale, page}: {locale: EditorialLocale; page: ReturnType<typeof editorialContent>}) {
  const ru = locale === 'ru';
  const copy = ru ? {
    heroTitle: 'Немецкий опыт — для слуха в повседневной жизни',
    heroText: 'Volmer Moldova опирается на опыт материнской компании из Лингена, Германия. В Кишинёве сейчас доступны услуги по слуху и слуховым аппаратам; оптическое направление появится позднее.',
    book: 'Записаться на проверку', catalog: 'Слуховые аппараты',
    storyKicker: 'ИСТОРИЯ VOLMER', storyTitle: 'Немецкая компания — и новый этап в Молдове',
    storyText: 'Материнская компания Augenoptik und Hörgeräte Volmer GmbH находится в Лингене (Эмс), Германия. Там Volmer объединяет оптику и слухопротезирование. В Молдове мы начали с одного направления — слуховых аппаратов и связанных с ними услуг.',
    bridgeKicker: 'ОТ ИСТОКОВ К НОВОЙ ГЛАВЕ', germany: 'Германия · Линген (Эмс)', germanyText: 'Магазины Volmer в Германии работают в сфере оптики и слухопротезирования. В ассортименте — очки, солнцезащитные очки, контактные линзы и слуховые системы.', germanyLink: 'Сайт Volmer Optik & Hörakustik в Германии', bridge: 'Опыт · процессы · внимательное отношение', moldova: 'Республика Молдова', moldovaText: 'В Кишинёве сейчас доступны услуги по слуху и слуховым аппаратам. Оптика пока не представлена и появится позднее.',
    whyKicker: 'ПОЧЕМУ МОЛДОВА', whyTitle: 'Начинаем с направления, которому хотим уделить особое внимание',
    whyText: 'В Молдове мы развиваем работу поэтапно. Сейчас Volmer предлагает направление слуха: проверку, консультацию, подбор и настройку слуховых аппаратов. Оптические услуги в стране пока не запущены.',
    todayKicker: 'VOLMER MOLDOVA · СЕГОДНЯ', todayTitle: 'Сегодня Volmer в Молдове — это слух',
    todayIntro: 'В Кишинёве запущено только направление слуха и слуховых аппаратов. Оптические услуги, доступные в Германии, в Молдове пока не предоставляются.',
    serviceItems: [
      ['Проверка слуха и консультация', 'Обсуждаем замеченные трудности, проверяем слух и объясняем результаты.'],
      ['Подбор слухового аппарата', 'Сравниваем модели и функции с учётом результатов проверки и повседневных задач.'],
      ['Настройка и последующие визиты', 'Настраиваем аппарат и обсуждаем корректировки по мере адаптации.'],
      ['Flex Trial', 'Возможность попробовать подходящее решение в обычной жизни в течение двух недель; условия обсуждаются с командой.'],
    ],
    productsTitle: 'Решения Unitron', productsText: 'В каталоге Volmer представлены семейства Smile, Vivante и Blu. Доступные модели и конфигурации уточняются отдельно.', productCta: 'Посмотреть слуховые аппараты',
    processKicker: 'ПОДХОД VOLMER', processTitle: 'Понятный путь — шаг за шагом',
    steps: [
      ['Обсуждаем ситуации', 'Вы рассказываете, где слышать стало труднее.'],
      ['Проверяем слух', 'Объясняем этапы проверки и результаты.'],
      ['Сравниваем варианты', 'Обсуждаем подходящие модели, функции и стоимость.'],
      ['Настраиваем и проверяем', 'Настройка аппарата учитывает результаты проверки и ваши ощущения.'],
      ['Остаёмся на связи', 'Можно вернуться с вопросами и обсудить дальнейшую поддержку.'],
    ],
    valuesKicker: 'ПРИНЦИПЫ РАБОТЫ', valuesTitle: 'Конкретные вещи важнее громких обещаний',
    values: [
      ['Прозрачность', 'Объясняем варианты и стоимость до окончательного решения.'],
      ['Проба', 'Flex Trial помогает оценить решение в повседневных ситуациях до выбора.'],
      ['Индивидуальная настройка', 'Учитываем результаты проверки, особенности слуха и ваш опыт.'],
      ['Поддержка', 'Настройка — не единственный разговор: можно обсудить вопросы после начала использования.'],
    ],
    locationKicker: 'VOLMER MOLDOVA', locationTitle: 'Мы находимся в центре Кишинёва', addressLabel: 'Адрес', phoneLabel: 'Телефон', emailLabel: 'Email', hoursLabel: 'График',
    finalTitle: 'Заметили, что стали хуже слышать?', finalText: 'Начните с проверки слуха и разговора о ситуациях, в которых возникают трудности.', finalBook: 'Записаться на проверку', finalCatalog: 'Слуховые аппараты',
  } : {
    heroTitle: 'Experiență germană pentru auzul de zi cu zi',
    heroText: 'Volmer Moldova pornește de la experiența companiei-mamă din Lingen, Germania. În Chișinău sunt disponibile acum serviciile pentru auz și aparate auditive; optica va fi introdusă ulterior.',
    book: 'Programați o evaluare', catalog: 'Aparate auditive',
    storyKicker: 'POVESTEA VOLMER', storyTitle: 'O companie germană și o nouă etapă în Moldova',
    storyText: 'Compania-mamă, Augenoptik und Hörgeräte Volmer GmbH, are sediul în Lingen (Ems), Germania. Acolo, Volmer reunește optica și audiologia. În Republica Moldova am început cu o singură direcție: aparatele auditive și serviciile legate de auz.',
    bridgeKicker: 'DE LA ORIGINI LA O NOUĂ ETAPĂ', germany: 'Germania · Lingen (Ems)', germanyText: 'Magazinele Volmer din Germania activează în optică și audiologie. Oferta include ochelari, ochelari de soare, lentile de contact și aparate auditive.', germanyLink: 'Site-ul Volmer Optik & Hörakustik din Germania', bridge: 'Experiență · procese · grijă', moldova: 'Republica Moldova', moldovaText: 'În Chișinău sunt disponibile acum servicii pentru auz și aparate auditive. Optica nu este încă disponibilă în Moldova și va fi introdusă ulterior.',
    whyKicker: 'DE CE MOLDOVA', whyTitle: 'Începem cu un domeniu căruia vrem să-i acordăm atenție',
    whyText: 'În Republica Moldova dezvoltăm activitatea etapizat. Acum Volmer oferă servicii de audiologie: evaluarea auzului, consultație, selectarea și adaptarea aparatelor auditive. Serviciile de optică nu sunt încă lansate aici.',
    todayKicker: 'VOLMER MOLDOVA · ASTĂZI', todayTitle: 'Astăzi, Volmer Moldova înseamnă auz',
    todayIntro: 'În Chișinău este lansată deocamdată doar direcția de audiologie și aparate auditive. Serviciile de optică disponibile în Germania nu sunt încă oferite în Moldova.',
    serviceItems: [
      ['Evaluarea auzului și consultație', 'Discutăm dificultățile observate, evaluăm auzul și explicăm rezultatele.'],
      ['Selectarea aparatului auditiv', 'Comparăm modele și funcții în raport cu rezultatele evaluării și situațiile de zi cu zi.'],
      ['Adaptare și vizite ulterioare', 'Configurăm aparatul și discutăm ajustările pe parcursul acomodării.'],
      ['Flex Trial', 'Posibilitatea de a testa soluția potrivită în viața de zi cu zi timp de două săptămâni; condițiile se discută cu echipa.'],
    ],
    productsTitle: 'Soluții Unitron', productsText: 'Catalogul Volmer prezintă familiile Smile, Vivante și Blu. Modelele și configurațiile disponibile se confirmă separat.', productCta: 'Vedeți aparatele auditive',
    processKicker: 'ABORDAREA VOLMER', processTitle: 'Un parcurs clar, pas cu pas',
    steps: [
      ['Discutăm situațiile', 'Ne spuneți unde a devenit mai dificil să auziți.'],
      ['Evaluăm auzul', 'Explicăm pașii evaluării și rezultatele.'],
      ['Comparăm opțiunile', 'Discutăm modelele potrivite, funcțiile și costurile.'],
      ['Adaptăm și verificăm', 'Configurarea aparatului ține cont de evaluare și de experiența dumneavoastră.'],
      ['Rămânem aproape', 'Puteți reveni cu întrebări și putem discuta suportul ulterior.'],
    ],
    valuesKicker: 'PRINCIPII DE LUCRU', valuesTitle: 'Lucrurile concrete contează mai mult decât promisiunile mari',
    values: [
      ['Transparență', 'Explicăm opțiunile și costurile înainte de decizia finală.'],
      ['Testare', 'Flex Trial ajută la evaluarea soluției în situații reale înainte de alegere.'],
      ['Reglaj individual', 'Ținem cont de evaluare, de auz și de experiența dumneavoastră.'],
      ['Suport', 'Discuția nu se încheie la configurare: puteți reveni cu întrebări după ce începeți să folosiți aparatul.'],
    ],
    locationKicker: 'VOLMER MOLDOVA', locationTitle: 'Ne găsiți în centrul Chișinăului', addressLabel: 'Adresă', phoneLabel: 'Telefon', emailLabel: 'Email', hoursLabel: 'Program',
    finalTitle: 'Ați observat că auziți mai greu?', finalText: 'Puteți începe cu o evaluare a auzului și o discuție despre situațiile în care întâmpinați dificultăți.', finalBook: 'Programați evaluarea', finalCatalog: 'Vedeți aparatele auditive',
  };
  const mapUrl = siteConfig.googleMapsEmbedUrl || `https://maps.google.com/maps?q=${encodeURIComponent(`${siteConfig.address}, ${siteConfig.city}`)}&output=embed`;
  const families = hearingAidFamilies.filter((family) => ['smile', 'vivante', 'blu'].includes(family.id));
  return <div className="editorial-page about-page">
    <Breadcrumbs locale={locale} label={page.title} path="despre-noi" />
    <header className="about-hero"><div className="container about-hero-grid"><p className="editorial-eyebrow">{ru ? 'О VOLMER' : 'DESPRE VOLMER'}</p><h1>{copy.heroTitle}</h1><p className="about-hero-lead">{copy.heroText}</p><div className="about-hero-actions"><a className="editorial-primary" href={`/${locale}/#booking-form`}>{copy.book}<ArrowRight size={18} aria-hidden="true" /></a><a className="about-outline-link" href={`/${locale}/aparate-auditive/`}>{copy.catalog}</a></div></div></header>

    <div className="container about-content">
      <section className="about-story"><div><p className="about-kicker">{copy.storyKicker}</p><h2>{copy.storyTitle}</h2></div><p>{copy.storyText}</p></section>

      <section className="about-bridge" aria-label={copy.bridgeKicker}><p className="about-kicker">{copy.bridgeKicker}</p><div className="about-bridge-row"><article><span>01</span><h2>{copy.germany}</h2><p>{copy.germanyText}</p><a className="about-germany-link" href="https://www.optik-volmer.de/uber-uns/filialen/lingen-am-markt" target="_blank" rel="noopener noreferrer">{copy.germanyLink}<ArrowRight size={15} aria-hidden="true" /></a></article><div className="about-bridge-center"><i aria-hidden="true" /><span>{copy.bridge}</span><i aria-hidden="true" /></div><article><span>02</span><h2>{copy.moldova}</h2><p>{copy.moldovaText}</p></article></div></section>

      <section className="about-why"><div><p className="about-kicker">{copy.whyKicker}</p><h2>{copy.whyTitle}</h2></div><p>{copy.whyText}</p></section>

      <section className="about-today" aria-labelledby="about-today-title"><header><p className="about-kicker">{copy.todayKicker}</p><h2 id="about-today-title">{copy.todayTitle}</h2><p>{copy.todayIntro}</p></header><div className="about-service-list">{copy.serviceItems.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div><Check aria-hidden="true" /></article>)}</div><div className="about-products"><div><p className="about-kicker">UNITRON</p><h3>{copy.productsTitle}</h3><p>{copy.productsText}</p><a className="about-text-link" href={`/${locale}/aparate-auditive/`}>{copy.productCta}<ArrowRight size={17} aria-hidden="true" /></a></div><div className="about-family-list">{families.map((family) => <a href={`/${locale}/aparate-auditive/`} key={family.id}><Image src={family.image} alt={family.imageAlt[locale]} width={900} height={600} sizes="(max-width: 700px) 84vw, (max-width: 1100px) 30vw, 220px" /><span>{family.name}</span></a>)}</div></div></section>


      <section className="about-process"><header><p className="about-kicker">{copy.processKicker}</p><h2>{copy.processTitle}</h2></header><ol>{copy.steps.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>

      <section className="about-values"><header><p className="about-kicker">{copy.valuesKicker}</p><h2>{copy.valuesTitle}</h2></header><div>{copy.values.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="about-location" aria-labelledby="about-location-title"><div className="about-location-copy"><p className="about-kicker">{copy.locationKicker}</p><h2 id="about-location-title">{copy.locationTitle}</h2><div className="about-contact-row"><MapPin aria-hidden="true" /><span><strong>{copy.addressLabel}</strong>{siteConfig.address}, {siteConfig.city}</span></div><div className="about-contact-row"><Phone aria-hidden="true" /><span><strong>{copy.phoneLabel}</strong><a href={`tel:${siteConfig.phoneInternational}`}>{siteConfig.phoneDisplay}</a></span></div><div className="about-contact-row"><Mail aria-hidden="true" /><span><strong>{copy.emailLabel}</strong><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></span></div><div className="about-contact-row"><Clock3 aria-hidden="true" /><span><strong>{copy.hoursLabel}</strong><BusinessHours /></span></div><a className="about-map-directions" href={siteConfig.googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer">{ru ? 'Открыть Google Maps' : 'Deschideți Google Maps'}<ArrowRight size={17} aria-hidden="true" /></a></div><div className="about-location-media"><Image src="/images/homepage/volmer-office-facade-current.png" alt={ru ? 'Фасад центра Volmer на улице Митрополит Варлаам 69' : 'Fațada centrului Volmer de pe strada Mitropolit Varlaam 69'} width={1482} height={1061} sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1200px) 55vw, 660px" /><ConsentMap src={mapUrl} className="about-map" /></div></section>

      <section className="about-final"><div><p className="about-kicker">{ru ? 'СЛУХОВЫЕ РЕШЕНИЯ VOLMER' : 'SOLUȚII AUDITIVE VOLMER'}</p><h2>{copy.finalTitle}</h2><p>{copy.finalText}</p></div><div><a className="editorial-primary" href={`/${locale}/#booking-form`}>{copy.finalBook}<ArrowRight size={18} aria-hidden="true" /></a><a className="about-final-secondary" href={`/${locale}/aparate-auditive/`}>{copy.finalCatalog}</a></div></section>
    </div>
  </div>;
}

function PricesPage({locale, page}: {locale: EditorialLocale; page: ReturnType<typeof editorialContent>}) {
  const ru = locale === 'ru';
  const copy = ru ? {
    priceIntro: 'Итоговая стоимость зависит от выбранной модели и конфигурации. Ниже указаны ценовые диапазоны Volmer для основных классов.',
    battery: 'На батарейках', rechargeable: 'Перезаряжаемый',
    range: 'От 400 € до 2 100 € — в зависимости от класса, модели и питания.',
    pricesCta: 'Смотреть цены', booking: 'Записаться на бесплатную проверку',
    technologyTitle: 'Что меняется с ростом технологического уровня?',
    technologyText: 'Различия могут касаться обработки речи и шума в сложной акустической обстановке, автоматизации программ, доступных функций и подключения. Конкретные возможности зависят от семейства и модели.',
    levelsTitle: 'Уровни Unitron', levelsNote: 'Технологические уровни Unitron (9, 7, 5, 3, 1) — не то же самое, что ценовые классы Volmer. Автоматического соответствия между ними нет.',
    trustTitle: 'Более высокая цена не означает, что этот вариант подойдёт именно вам',
    trustText: 'Выбор зависит от ситуаций, в которых вам важно лучше слышать. У человека, который чаще общается дома, могут быть другие потребности, чем у того, кто часто бывает на встречах, за рулём, в поездках, ресторанах и других шумных местах.',
    trustNote: 'Цель оценки — понять, какой уровень технологий нужен именно вам, а не начинать с самого дорогого аппарата.',
    lifeTitle: 'В каких ситуациях вам важно лучше слышать?',
    situations: ['Дома и в спокойной беседе', 'В кругу семьи и небольшой компании', 'На работе и встречах', 'В ресторанах и шумных местах', 'В поездках и активной жизни'],
    powerTitle: 'Батарейка или аккумулятор?',
    batteryPoints: ['Батарейки нужно периодически менять.', 'Заряжать аппарат не требуется.', 'Доступные варианты зависят от модели и класса.'],
    rechargeablePoints: ['В совместимых моделях есть встроенный аккумулятор.', 'Для зарядки используется подходящее к модели устройство.', 'Не нужно регулярно менять батарейки.'],
    shapesTitle: 'Форма аппарата — часть выбора',
    shapesText: 'RIC, BTE и ITE отличаются способом ношения и конструкцией. Подходящая форма зависит от результатов проверки слуха, особенностей уха, необходимой мощности и повседневных предпочтений. Сама форма не задаёт отдельную ценовую категорию.',
    catalogCta: 'Сравнить RIC, BTE и ITE',
    valueTitle: 'Аппарат — это больше, чем устройство',
    valueIntro: 'В Volmer решение начинается с разговора о слухе и повседневных ситуациях. Этапы и стоимость аппарата обсуждаются до окончательного выбора.',
    valueItems: [
      ['Проверка и консультация', 'Первичная оценка слуха и консультация в Volmer бесплатны; результаты объясняются понятным языком.'],
      ['Подбор и настройка', 'Обсуждаем варианты и их функции с учётом результатов оценки и ваших задач.'],
      ['Поддержка', 'На аппараты действует гарантия 2 года; до 4 контрольных визитов в год предусмотрены в течение гарантии согласно условиям Volmer.'],
    ],
    trialTitle: 'Не выбирайте только по фотографии или таблице',
    trialText: 'Flex Trial позволяет попробовать слуховой аппарат в повседневной жизни в течение двух недель. Конкретные условия и подходящие модели обсуждаются с командой Volmer.',
    trialCta: 'Как работает Flex Trial',
    productsTitle: 'Посмотрите аппараты Unitron',
    productsText: 'В каталоге собраны семейства, модели, формы, питание и подтверждённые производителем варианты.',
    productCta: 'Открыть каталог слуховых аппаратов',
    faqTitle: 'Частые вопросы о ценах',
    moreTitle: 'Полезная информация',
    cnam: 'Информация о CNAM', test: 'Проверка слуха', flex: 'Flex Trial',
    finalTitle: 'Выбирайте по своим потребностям, а не только по цене',
    finalText: 'Мы оценим слух, обсудим ситуации, в которых возникают трудности, и представим подходящие варианты и их стоимость до окончательного выбора.',
  } : {
    priceIntro: 'Prețul final depinde de modelul ales și configurație. Mai jos sunt intervalele Volmer pentru principalele clase.',
    battery: 'Cu baterie', rechargeable: 'Reîncărcabil',
    range: 'Între 400 € și 2.100 €, în funcție de clasă, model și tipul de alimentare.',
    pricesCta: 'Vedeți prețurile', booking: 'Programați evaluarea gratuită',
    technologyTitle: 'Ce se schimbă când crește nivelul tehnologic?',
    technologyText: 'Diferențele pot ține de procesarea vorbirii și a zgomotului în medii acustice complexe, automatizarea programelor, funcțiile disponibile și conectivitate. Funcțiile concrete diferă în funcție de familie și model.',
    levelsTitle: 'Nivelurile Unitron', levelsNote: 'Nivelurile tehnologice Unitron (9, 7, 5, 3, 1) nu sunt același lucru cu clasele de preț Volmer. Nu există o corespondență automată între ele.',
    trustTitle: 'Un preț mai mare nu înseamnă automat că aparatul vi se potrivește mai bine',
    trustText: 'Alegerea depinde de situațiile în care aveți nevoie să auziți mai bine. O persoană care comunică mai ales acasă poate avea alte nevoi decât cineva care participă frecvent la întâlniri, conduce, călătorește sau merge în restaurante și alte medii zgomotoase.',
    trustNote: 'Scopul evaluării este să alegem nivelul tehnologic de care aveți nevoie, nu să pornim de la cel mai scump aparat.',
    lifeTitle: 'Unde aveți nevoie să auziți mai bine?',
    situations: ['Acasă și în conversații liniștite', 'În familie și grupuri mici', 'La serviciu și la întâlniri', 'În restaurante și medii zgomotoase', 'În călătorii și viața activă'],
    powerTitle: 'Baterie sau reîncărcabil?',
    batteryPoints: ['Bateriile se înlocuiesc periodic.', 'Aparatul nu necesită încărcare.', 'Variantele disponibile depind de model și clasă.'],
    rechargeablePoints: ['Modelele compatibile au acumulator integrat.', 'Încărcarea se face cu stația potrivită modelului.', 'Nu mai este necesară schimbarea periodică a bateriilor.'],
    shapesTitle: 'Forma aparatului este o parte a alegerii',
    shapesText: 'RIC, BTE și ITE diferă prin construcție și modul de purtare. Forma potrivită depinde de evaluarea auzului, anatomia urechii, puterea necesară și preferințele de zi cu zi. Forma, în sine, nu stabilește o clasă de preț.',
    catalogCta: 'Comparați RIC, BTE și ITE',
    valueTitle: 'Un aparat auditiv înseamnă mai mult decât dispozitivul',
    valueIntro: 'La Volmer, procesul începe cu o discuție despre auz și situațiile de zi cu zi. Etapele și costul aparatului se discută înainte de alegerea finală.',
    valueItems: [
      ['Evaluare și consultație', 'Evaluarea inițială a auzului și consultația la Volmer sunt gratuite; rezultatele sunt explicate clar.'],
      ['Selectare și reglaj', 'Discutăm opțiunile și funcțiile lor în raport cu rezultatele evaluării și nevoile dumneavoastră.'],
      ['Suport', 'Aparatele au garanție de 2 ani; până la 4 vizite de control pe an sunt prevăzute în perioada garanției, conform condițiilor Volmer.'],
    ],
    trialTitle: 'Nu trebuie să alegeți doar dintr-o fotografie sau dintr-un tabel',
    trialText: 'Flex Trial vă permite să testați aparatul auditiv în viața de zi cu zi timp de două săptămâni. Condițiile concrete și modelele potrivite se discută cu echipa Volmer.',
    trialCta: 'Cum funcționează Flex Trial',
    productsTitle: 'Vedeți aparatele Unitron',
    productsText: 'Catalogul prezintă familiile, modelele, formele, tipurile de alimentare și variantele confirmate de producător.',
    productCta: 'Deschideți catalogul aparatelor auditive',
    faqTitle: 'Întrebări frecvente despre prețuri',
    moreTitle: 'Informații utile',
    cnam: 'Informații despre CNAM', test: 'Evaluarea auzului', flex: 'Flex Trial',
    finalTitle: 'Alegeți după nevoile dumneavoastră, nu doar după preț',
    finalText: 'Evaluăm auzul, discutăm situațiile în care întâmpinați dificultăți și vă prezentăm opțiunile potrivite și costurile lor înainte de alegerea finală.',
  };
  const levels = [...technologyLevels].reverse();
  const faqs = page.faqs ?? [];
  const catalogHref = `/${locale}/aparate-auditive/`;
  return <div className="editorial-page prices-page">
    <Breadcrumbs locale={locale} label={page.title} path="preturi" />
    {faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({'@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(({question, answer}) => ({'@type': 'Question', name: question, acceptedAnswer: {'@type': 'Answer', text: answer}}))})}} />}
    <header className="prices-hero"><div className="container prices-hero-inner"><div><p className="editorial-eyebrow">{ru ? 'ЦЕНЫ НА СЛУХОВЫЕ АППАРАТЫ' : 'PREȚURI APARATE AUDITIVE'}</p><h1>{page.title}</h1><p className="prices-hero-lead">{ru ? 'Выбор зависит от технологического уровня, модели, подключения и типа питания.' : 'Alegerea depinde de nivelul tehnologic, model, conectivitate și tipul de alimentare.'}</p><div className="prices-hero-actions"><a className="editorial-primary" href="#pricing">{copy.pricesCta}<ArrowRight size={18} aria-hidden="true" /></a><a className="prices-hero-secondary" href={`/${locale}/#booking-form`}>{copy.booking}</a></div></div></div></header>

    <main className="prices-content container">
      <section className="prices-section prices-main" id="pricing" aria-labelledby="prices-main-title"><header className="prices-section-heading"><p className="prices-kicker">{ru ? 'ЦЕНЫ VOLMER' : 'PREȚURI VOLMER'}</p><h2 id="prices-main-title">{ru ? 'Цены на слуховые аппараты' : 'Prețuri aparate auditive'}</h2><p>{copy.priceIntro}</p></header><div className="prices-grid">{priceClasses.map((item, index) => <article className="prices-card" key={item.name.ro}><span className="prices-card-index">0{index + 1}</span><h3>{item.name[locale]}</h3><div className="prices-option"><span>{copy.battery}</span><strong>{item.battery}</strong></div><div className="prices-option"><span>{copy.rechargeable}</span><strong>{item.rechargeable}</strong></div></article>)}</div><p className="prices-range-note">{copy.range}</p></section>

      <section className="prices-section prices-technology" aria-labelledby="prices-technology-title"><div className="prices-split"><header className="prices-section-heading"><p className="prices-kicker">{ru ? 'ТЕХНОЛОГИЯ' : 'TEHNOLOGIE'}</p><h2 id="prices-technology-title">{copy.technologyTitle}</h2><p>{copy.technologyText}</p></header><div className="prices-level-panel"><h3>{copy.levelsTitle}</h3><ol>{levels.map((level) => <li key={level.level}><strong>{level.level}</strong><span>{level[locale]}</span></li>)}</ol><p>{copy.levelsNote}</p></div></div></section>

      <section className="prices-trust" aria-labelledby="prices-trust-title"><p className="prices-kicker">{ru ? 'ВЫБОР БЕЗ ДАВЛЕНИЯ' : 'ALEGEȚI FĂRĂ PRESIUNE'}</p><h2 id="prices-trust-title">{copy.trustTitle}</h2><p>{copy.trustText}</p><strong>{copy.trustNote}</strong></section>

      <section className="prices-section" aria-labelledby="prices-life-title"><header className="prices-section-heading"><p className="prices-kicker">{ru ? 'ВАША ПОВСЕДНЕВНАЯ ЖИЗНЬ' : 'VIAȚA DE ZI CU ZI'}</p><h2 id="prices-life-title">{copy.lifeTitle}</h2></header><ul className="prices-situations">{copy.situations.map((situation, index) => <li key={situation}><span>0{index + 1}</span>{situation}</li>)}</ul></section>

      <section className="prices-section prices-power" aria-labelledby="prices-power-title"><header className="prices-section-heading"><p className="prices-kicker">{ru ? 'ТИП ПИТАНИЯ' : 'TIPUL DE ALIMENTARE'}</p><h2 id="prices-power-title">{copy.powerTitle}</h2></header><div className="prices-power-grid"><article><span aria-hidden="true">◉</span><h3>{copy.battery}</h3><ul>{copy.batteryPoints.map((point) => <li key={point}>{point}</li>)}</ul></article><article><span aria-hidden="true">↯</span><h3>{copy.rechargeable}</h3><ul>{copy.rechargeablePoints.map((point) => <li key={point}>{point}</li>)}</ul></article></div></section>

      <section className="prices-section prices-shapes" aria-labelledby="prices-shapes-title"><div><p className="prices-kicker">{ru ? 'ФОРМАТЫ' : 'FORME'}</p><h2 id="prices-shapes-title">{copy.shapesTitle}</h2><p>{copy.shapesText}</p><a className="prices-text-link" href={catalogHref}>{copy.catalogCta}<ArrowRight size={17} aria-hidden="true" /></a></div><div className="prices-shape-list"><span>RIC</span><span>BTE</span><span>ITE</span></div></section>

      <section className="prices-section prices-process" aria-labelledby="prices-process-title"><header className="prices-section-heading"><p className="prices-kicker">{ru ? 'ПОДХОД VOLMER' : 'PROCESUL VOLMER'}</p><h2 id="prices-process-title">{copy.valueTitle}</h2><p>{copy.valueIntro}</p></header><div className="prices-process-grid">{copy.valueItems.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="prices-trial" aria-labelledby="prices-trial-title"><div><p className="prices-kicker">FLEX TRIAL</p><h2 id="prices-trial-title">{copy.trialTitle}</h2><p>{copy.trialText}</p></div><a className="prices-light-link" href={editorialPath(locale, 'flex')}>{copy.trialCta}<ArrowRight size={18} aria-hidden="true" /></a></section>

      <section className="prices-section prices-catalog-cta"><a className="editorial-primary" href={catalogHref}>{ru ? 'Смотреть каталог' : 'Vedeți catalogul'}<ArrowRight size={18} aria-hidden="true" /></a></section>

      <section className="prices-section prices-faq" aria-labelledby="prices-faq-title"><header className="prices-section-heading"><p className="prices-kicker">{ru ? 'ПЕРЕД ВЫБОРОМ' : 'ÎNAINTE DE A ALEGE'}</p><h2 id="prices-faq-title">{copy.faqTitle}</h2></header><div className="editorial-faq">{faqs.map(({question, answer}) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

      <nav className="prices-more" aria-label={copy.moreTitle}><h2>{copy.moreTitle}</h2><a href={catalogHref}>{copy.productCta}<ArrowRight size={16} aria-hidden="true" /></a><a href={editorialPath(locale, 'test')}>{copy.test}<ArrowRight size={16} aria-hidden="true" /></a><a href={editorialPath(locale, 'flex')}>{copy.flex}<ArrowRight size={16} aria-hidden="true" /></a><a href={editorialPath(locale, 'cnam')}>{copy.cnam}<ArrowRight size={16} aria-hidden="true" /></a></nav>

      <section className="prices-final"><div><p className="prices-kicker">{ru ? 'СЛЕДУЮЩИЙ ШАГ' : 'URMĂTORUL PAS'}</p><h2>{copy.finalTitle}</h2><p>{copy.finalText}</p></div><div><a className="editorial-primary" href={`/${locale}/#booking-form`}>{copy.booking}<ArrowRight size={18} aria-hidden="true" /></a><a className="prices-final-secondary" href={catalogHref}>{copy.productCta}</a></div></section>
    </main>
  </div>;
}

async function DiasporaLanding({locale, page, faqSchema}: {locale: EditorialLocale; page: ReturnType<typeof editorialContent>; faqSchema: object | null}) {
  const t = await getTranslations({locale, namespace: 'EditorialUI'});
  const ru = locale === 'ru';
  const copy = ru ? {
    subhead: 'Центр слуха Volmer в центре Кишинёва · решения Unitron',
    whatsapp: 'Написать в WhatsApp', callback: 'Попросить перезвонить',
    howEyebrow: 'ПРОСТО ИЗ ДРУГОЙ СТРАНЫ', howTitle: 'Вы организуете. Родитель приходит. Мы остаёмся на связи.',
    steps: [
      ['01', 'Обсудите визит', 'Напишите нам в WhatsApp. Согласуем удобное время и контактный номер родителя.'],
      ['02', 'Родитель приходит в центр', 'В Volmer обсудят трудности со слухом, проведут бесплатную первичную проверку и объяснят результаты.'],
      ['03', 'Получите обратную связь', 'После визита свяжемся с вами, если родитель дал согласие на такой разговор.'],
    ],
    lancetTag: 'ЧТО ГОВОРИТ ИССЛЕДОВАНИЕ', lancetTitle: 'Проверить слух стоит без лишнего откладывания',
    lancetText: 'В докладе Lancet Commission 2024 снижение слуха указано среди 14 потенциально модифицируемых факторов риска деменции. Это популяционная оценка риска, а не диагноз и не обещание, что слуховой аппарат предотвратит деменцию. Проверка помогает понять слух и обсудить подходящие шаги.',
    teamEyebrow: 'КОМАНДА VOLMER', teamTitle: 'Люди, с которыми можно обсудить следующий шаг', teamNote: 'Познакомьтесь с командой и заранее задайте вопросы о визите. Публикуем только подтверждённые сведения о специалистах.', teamRole: 'Команда Volmer', teamRoles: ['Акустик-техник, специалист по слухопротезированию; профильное образование в Германии', 'Основатель Volmer · акустик-техник, специалист по слухопротезированию; профильное образование в Германии'], teamPlaceholder: 'Место для нового сотрудника',
    offerEyebrow: 'ПОНЯТНЫЕ УСЛОВИЯ', offerTitle: 'Что входит и как узнать стоимость',
    offerCards: [
      ['Бесплатная первая оценка', 'Консультация и первичная проверка слуха — около 60 минут.'],
      ['Индивидуальный подбор', 'Форма и модель обсуждаются после оценки и с учётом повседневных ситуаций.'],
      ['Поддержка после выбора', 'Гарантия 2 года. Условия контрольных визитов и настройки объясняются до решения.'],
    ],
    priceNote: 'Цена аппарата зависит от модели и конфигурации. Узнайте актуальную стоимость у команды после проверки. Аппарат приобретается отдельно; рассрочка пока недоступна.',
    reviewsEyebrow: 'ОТЗЫВЫ', reviewsTitle: 'Доверие начинается с честного разговора', reviewsText: 'На сайте пока нет опубликованных и проверенных отзывов клиентов. Мы не используем вымышленные цитаты. Спросите команду о процессе визита и доступных вариантах напрямую.',
    faqTitle: 'Вопросы семей за границей', finalTitle: 'Помогите родителям сделать первый шаг', finalText: 'Напишите нам. Обсудим визит в Volmer и удобный способ связи с родителем.',
    office: 'Так выглядит вход в офис Volmer', addressLabel: 'Адрес центра', directions: 'Построить маршрут', book: 'Связаться с Volmer', source: 'Источник: The Lancet Commission, 2024',
  } : {
    subhead: 'Centrul auditiv Volmer în centrul Chișinăului · soluții Unitron',
    whatsapp: 'Scrieți-ne pe WhatsApp', callback: 'Solicitați să vă sunăm',
    howEyebrow: 'SIMPLU, CHIAR ȘI DE LA DISTANȚĂ', howTitle: 'Dumneavoastră organizați. Părintele vine. Noi păstrăm legătura.',
    steps: [
      ['01', 'Discutați vizita', 'Scrieți-ne pe WhatsApp. Stabilim o oră potrivită și datele de contact ale părintelui.'],
      ['02', 'Părintele vine la centru', 'La Volmer discutăm dificultățile, facem evaluarea auditivă inițială gratuită și explicăm rezultatele.'],
      ['03', 'Primiți vești după vizită', 'Vă contactăm după vizită dacă părintele și-a dat acordul pentru această discuție.'],
    ],
    lancetTag: 'CE SPUNE CERCETAREA', lancetTitle: 'Este util să nu amânați verificarea auzului',
    lancetText: 'Raportul Lancet Commission din 2024 include pierderea auzului între 14 factori potențial modificabili asociați riscului de demență. Este o estimare la nivel de populație, nu un diagnostic și nici o promisiune că aparatul auditiv previne demența. Evaluarea clarifică auzul și pașii care pot fi discutați.',
    teamEyebrow: 'ECHIPA VOLMER', teamTitle: 'Oameni cu care puteți discuta următorul pas', teamNote: 'Cunoașteți echipa și adresați din timp întrebări despre vizită. Publicăm doar informații confirmate despre specialiști.', teamRole: 'Echipa Volmer', teamRoles: ['Acustician tehnician audioprotezist, cu studii de specialitate în Germania', 'Fondator Volmer · acustician tehnician audioprotezist, cu studii de specialitate în Germania'], teamPlaceholder: 'Loc pentru un nou membru',
    offerEyebrow: 'CONDIȚII CLARE', offerTitle: 'Ce include vizita și cum afli costul',
    offerCards: [
      ['Evaluare inițială gratuită', 'Consultația și verificarea inițială a auzului durează aproximativ 60 de minute.'],
      ['Recomandare individuală', 'Forma și modelul se discută după evaluare și în funcție de rutina zilnică.'],
      ['Sprijin după alegere', 'Garanție de 2 ani. Condițiile vizitelor de control și ale reglajelor se explică înainte de decizie.'],
    ],
    priceNote: 'Prețul aparatului depinde de model și configurație. Solicitați echipei costul actual după evaluare. Aparatul se achită separat; ratele nu sunt disponibile momentan.',
    reviewsEyebrow: 'RECENZII', reviewsTitle: 'Încrederea începe cu o discuție sinceră', reviewsText: 'Momentan, site-ul nu are recenzii ale clienților publicate și verificate. Nu folosim citate inventate. Întrebați direct echipa despre vizită și opțiunile disponibile.',
    faqTitle: 'Întrebări pentru familiile de peste hotare', finalTitle: 'Ajutați-vă părinții să facă primul pas', finalText: 'Scrieți-ne. Discutăm vizita la Volmer și o modalitate comodă de a ține legătura cu părintele.',
    office: 'Așa arată intrarea în oficiul Volmer', addressLabel: 'Adresa centrului', directions: 'Deschideți ruta', book: 'Contactați Volmer', source: 'Sursă: The Lancet Commission, 2024',
  };
  const mapUrl = siteConfig.googleMapsEmbedUrl || `https://maps.google.com/maps?q=${encodeURIComponent(`${siteConfig.address}, ${siteConfig.city}`)}&output=embed`;
  const sourceHref = page.source?.href ?? 'https://pubmed.ncbi.nlm.nih.gov/39096926/';
  const sourceLabel = page.source?.label ?? copy.source;
  const team = ['Igor Luchița', 'Timofei Stratanenco', null, null, null];
  return <div className="editorial-page diaspora-landing">
    <Breadcrumbs locale={locale} label={page.title} path={editorialPath(locale, 'diaspora').split('/')[2]} />
    {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}} />}
    <section className="diaspora-hero">
      <div className="container diaspora-hero-grid">
        <div className="diaspora-hero-copy"><p className="editorial-eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p className="diaspora-subhead">{copy.subhead}</p><p className="diaspora-lead">{page.lead}</p>
          <div className="diaspora-hero-actions"><TrackedMessengerLink messenger="whatsapp" className="diaspora-whatsapp" href={siteConfig.quickContact.whatsapp} target="_blank" rel="noopener noreferrer"><Phone size={18} aria-hidden="true" />{copy.whatsapp}</TrackedMessengerLink><a className="diaspora-secondary" href="#diaspora-contact"><HeartHandshake size={18} aria-hidden="true" />{copy.callback}</a></div>
          <p className="diaspora-hero-note"><Check size={17} aria-hidden="true" />{ru ? 'Первичная проверка слуха — бесплатно' : 'Evaluarea inițială a auzului este gratuită'}</p>
        </div>
        <figure className="diaspora-hero-image"><Image src="/images/homepage/mama.webp" alt={ru ? 'Семья разговаривает с пожилыми родителями дома' : 'O familie stă de vorbă cu părinții în vârstă, acasă'} width={680} height={454} priority sizes="(max-width: 800px) 100vw, 48vw" /><figcaption>{ru ? 'Поддержка близких начинается с разговора' : 'Sprijinul celor dragi începe cu o conversație'}</figcaption></figure>
      </div>
    </section>
    <div className="container diaspora-content">
      <section className="diaspora-process" aria-labelledby="diaspora-process-title"><p className="diaspora-kicker">{copy.howEyebrow}</p><h2 id="diaspora-process-title">{copy.howTitle}</h2><div className="diaspora-step-grid">{copy.steps.map(([number, title, text], index) => <article className="diaspora-step" key={number}><span className="diaspora-step-number">{number}</span>{index === 0 ? <Phone aria-hidden="true" /> : index === 1 ? <CalendarDays aria-hidden="true" /> : <HeartHandshake aria-hidden="true" />}<h3>{title}</h3><p>{text}</p></article>)}</div>
        <div className="diaspora-payment"><CreditCard aria-hidden="true" /><p>{ru ? 'Можно оплатить картой, переводом или наличными. Если вы хотите оплатить из-за границы, сначала подтвердите с командой доступный дистанционный способ.' : 'Puteți achita cu cardul, prin transfer sau numerar. Pentru plata din străinătate, confirmați în prealabil cu echipa metoda disponibilă la distanță.'}</p></div>
      </section>
      <section className="diaspora-lancet" aria-labelledby="diaspora-lancet-title"><div className="diaspora-lancet-mark" aria-hidden="true"><ShieldCheck /></div><div><p className="diaspora-kicker">{copy.lancetTag}</p><h2 id="diaspora-lancet-title">{copy.lancetTitle}</h2><p>{copy.lancetText}</p><a href={sourceHref} target="_blank" rel="noopener noreferrer">{copy.source}<ArrowRight size={16} aria-hidden="true" /></a></div></section>
      <section className="diaspora-team" aria-labelledby="diaspora-team-title"><div className="diaspora-section-heading"><div><p className="diaspora-kicker">{copy.teamEyebrow}</p><h2 id="diaspora-team-title">{copy.teamTitle}</h2></div><p>{copy.teamNote}</p></div><div className="diaspora-team-grid">{team.map((name, index) => <article className={`diaspora-person${name ? '' : ' is-placeholder'}`} key={name ?? `member-${index}`}><div className="diaspora-person-mark" aria-hidden="true">{name ? (index === 0 ? 'IL' : 'TS') : '+'}</div><div>{name ? <><h3>{name}</h3><p>{copy.teamRoles[index]}</p></> : <p className="diaspora-person-placeholder">{copy.teamPlaceholder}</p>}</div></article>)}</div><a className="diaspora-team-link" href={editorialPath(locale, 'team')}>{ru ? 'Подробнее о команде' : 'Aflați mai multe despre echipă'}<ArrowRight size={16} aria-hidden="true" /></a></section>
      <section className="diaspora-offer" aria-labelledby="diaspora-offer-title"><p className="diaspora-kicker">{copy.offerEyebrow}</p><h2 id="diaspora-offer-title">{copy.offerTitle}</h2><div className="diaspora-offer-grid">{copy.offerCards.map(([title, text], index) => <article key={title}><span>{index === 0 ? <Clock3 aria-hidden="true" /> : index === 1 ? <Check aria-hidden="true" /> : <ShieldCheck aria-hidden="true" />}</span><h3>{title}</h3><p>{text}</p></article>)}</div><p className="diaspora-price-note"><CreditCard aria-hidden="true" />{copy.priceNote}</p></section>
      <section className="diaspora-reviews" aria-labelledby="diaspora-reviews-title"><div className="diaspora-reviews-icon" aria-hidden="true"><HeartHandshake /></div><div><p className="diaspora-kicker">{copy.reviewsEyebrow}</p><h2 id="diaspora-reviews-title">{copy.reviewsTitle}</h2><p>{copy.reviewsText}</p></div></section>
      <section className="editorial-faq diaspora-faq" aria-labelledby="diaspora-faq-title"><p className="diaspora-kicker">{ru ? 'ВСЁ ВАЖНОЕ — ЗАРАНЕЕ' : 'RĂSPUNSURI, ÎNAINTE DE VIZITĂ'}</p><h2 id="diaspora-faq-title">{copy.faqTitle}</h2>{(page.faqs ?? []).map(({question, answer}) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
      <section className="diaspora-contact" id="diaspora-contact" aria-labelledby="diaspora-contact-title"><div className="diaspora-contact-copy"><p className="diaspora-kicker">{ru ? 'МЫ РЯДОМ В КИШИНЁВЕ' : 'APROAPE DE PĂRINȚII DUMNEAVOASTRĂ, ÎN CHIȘINĂU'}</p><h2 id="diaspora-contact-title">{copy.finalTitle}</h2><p>{copy.finalText}</p><div className="diaspora-contact-details"><p><MapPin aria-hidden="true" /><span><small>{copy.addressLabel}</small><strong>{siteConfig.address}, {siteConfig.city}</strong></span></p><p><Phone aria-hidden="true" /><a href={siteConfig.quickContact.phone}>{siteConfig.phoneDisplay}</a></p><p><Languages aria-hidden="true" /><span>{ru ? 'Русский · Română' : 'Română · Русский'}</span></p><p><Mail aria-hidden="true" /><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p></div><LeadForm /><div className="diaspora-contact-actions"><TrackedMessengerLink messenger="whatsapp" className="diaspora-whatsapp" href={siteConfig.quickContact.whatsapp} target="_blank" rel="noopener noreferrer"><Phone size={18} aria-hidden="true" />{copy.whatsapp}</TrackedMessengerLink><QuickContactLinks variant="inline" /></div><a className="editorial-directions" href={siteConfig.googleMapsDirectionsUrl}>{copy.directions}<ArrowRight size={16} aria-hidden="true" /></a></div><div className="diaspora-location-media"><Image src="/images/homepage/volmer-office-facade-current.png" alt={t('officeAlt')} width={1482} height={1061} sizes="(max-width: 800px) 100vw, (max-width: 1200px) 48vw, 560px" /><ConsentMap src={mapUrl} className="hp-contact-map diaspora-map" /></div></section>
      <section className="diaspora-final"><div><p className="diaspora-kicker">{ru ? 'СЛЕДУЮЩИЙ ШАГ' : 'URMĂTORUL PAS'}</p><h2>{copy.finalTitle}</h2><p>{copy.finalText}</p></div><TrackedMessengerLink messenger="whatsapp" className="diaspora-whatsapp" href={siteConfig.quickContact.whatsapp} target="_blank" rel="noopener noreferrer"><Phone size={18} aria-hidden="true" />{copy.book}</TrackedMessengerLink></section>
    </div>
  </div>;
}
