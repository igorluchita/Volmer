import {Check, ClipboardCheck, Clock3, HeartHandshake, ShieldCheck} from 'lucide-react';

export function FlexTrialPlan({locale}: {locale: 'ro' | 'ru'}) {
  const ru = locale === 'ru';
  const copy = ru ? {
    eyebrow: 'FLEX TRIAL · 2 НЕДЕЛИ',
    title: 'Проверьте аппарат в обычной жизни',
    intro: 'В рамках Flex Trial можно бесплатно попробовать слуховой аппарат в течение двух недель. Команда объяснит условия программы на консультации.',
    checksTitle: 'Что вы проверите за это время',
    checks: ['Как аппарат работает дома, на улице, на встречах и в ресторане', 'Комфортно ли носить его в течение дня', 'Помогает ли он лучше слышать собеседников'],
    weekOne: 'НЕДЕЛЯ 01', deviceA: 'АППАРАТ A', weekOneTitle: 'Сначала попробуйте аппарат A',
    weekOneText: 'Первые дни могут потребовать привыкания: звуки иногда кажутся непривычными. Носите аппарат в важных для вас ситуациях и отмечайте, что стало лучше, что мешает и какие вопросы появились.',
    weekTwo: 'НЕДЕЛЯ 02', deviceB: 'АППАРАТ B', weekTwoTitle: 'Затем попробуйте аппарат B',
    weekTwoText: 'Повторите те же ситуации с другим аппаратом или платформой. Сравните комфорт, разборчивость речи и то, как каждый вариант подходит вашему обычному дню.',
    whyTitle: 'Почему важно сравнить в жизни',
    whyText: 'В кабинете можно проверить настройку, а повседневный опыт помогает заметить, как аппарат ведёт себя дома, на работе и в разговоре. Решение можно принять после пробы, без спешки.',
    afterTitle: 'После двух недель',
    afterText: 'Обсудите с командой свои наблюдения и выберите дальнейший шаг. Опыт пробы поможет принять более обоснованное решение.',
    note: 'Доступность моделей A и B, а также точные условия и срок пробы подтвердите с командой Volmer до её начала.',
    banner: 'Попробуйте до окончательного решения',
    cta: 'Записаться на консультацию',
  } : {
    eyebrow: 'FLEX TRIAL · 2 SĂPTĂMÂNI',
    title: 'Testați aparatul în viața de zi cu zi',
    intro: 'Prin Flex Trial puteți încerca gratuit un aparat auditiv de probă timp de două săptămâni. Echipa vă explică la consultație condițiile programului.',
    checksTitle: 'Ce verificați în această perioadă',
    checks: ['Cum funcționează aparatul acasă, afară, la ședințe și în restaurant', 'Dacă este confortabil să îl purtați pe parcursul zilei', 'Dacă vă ajută să auziți mai bine interlocutorii'],
    weekOne: 'SĂPTĂMÂNA 01', deviceA: 'APARATUL A', weekOneTitle: 'Începeți cu aparatul A',
    weekOneText: 'Primele zile pot necesita acomodare: unele sunete pot părea neobișnuite. Purtați aparatul în situațiile importante pentru dumneavoastră și notați ce s-a îmbunătățit, ce vă incomodează și ce întrebări au apărut.',
    weekTwo: 'SĂPTĂMÂNA 02', deviceB: 'APARATUL B', weekTwoTitle: 'Apoi încercați aparatul B',
    weekTwoText: 'Repetați aceleași situații cu un alt aparat sau o altă platformă. Comparați confortul, claritatea vorbirii și felul în care fiecare variantă se potrivește zilei dumneavoastră.',
    whyTitle: 'De ce contează comparația în viața reală',
    whyText: 'În cabinet se poate verifica reglajul, iar experiența de zi cu zi vă ajută să observați cum se comportă aparatul acasă, la serviciu și în conversații. Puteți decide după probă, fără grabă.',
    afterTitle: 'După două săptămâni',
    afterText: 'Discutați cu echipa ce ați observat și alegeți pasul următor. Experiența din timpul probei vă ajută să luați o decizie mai informată.',
    note: 'Disponibilitatea aparatelor A și B, precum și condițiile și durata exactă a probei se confirmă cu echipa Volmer înainte de începere.',
    banner: 'Testați înainte de decizia finală',
    cta: 'Programați o consultație',
  };

  return (
    <section className="flex-trial-plan container" aria-labelledby="flex-trial-plan-title">
      <header className="flex-trial-plan-heading">
        <p>{copy.eyebrow}</p>
        <h2 id="flex-trial-plan-title">{copy.title}</h2>
        <div>{copy.intro}</div>
      </header>

      <div className="flex-trial-checks">
        <h3>{copy.checksTitle}</h3>
        <ul>{copy.checks.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
      </div>

      <div className="flex-trial-weeks">
        <article className="flex-trial-week flex-trial-week-a">
          <div className="flex-trial-week-top"><span>{copy.weekOne}</span><b>{copy.deviceA}</b></div>
          <h3>{copy.weekOneTitle}</h3>
          <p>{copy.weekOneText}</p>
        </article>
        <article className="flex-trial-week flex-trial-week-b">
          <div className="flex-trial-week-top"><span>{copy.weekTwo}</span><b>{copy.deviceB}</b></div>
          <h3>{copy.weekTwoTitle}</h3>
          <p>{copy.weekTwoText}</p>
        </article>
      </div>

      <div className="flex-trial-outcomes">
        <article><span><HeartHandshake aria-hidden="true" /></span><h3>{copy.whyTitle}</h3><p>{copy.whyText}</p></article>
        <article><span><ClipboardCheck aria-hidden="true" /></span><h3>{copy.afterTitle}</h3><p>{copy.afterText}</p></article>
      </div>

      <p className="flex-trial-note"><ShieldCheck aria-hidden="true" />{copy.note}</p>
      <div className="flex-trial-banner"><p><Clock3 aria-hidden="true" /><strong>{copy.banner}</strong></p><a href={`/${locale}/#booking-form`}>{copy.cta}</a></div>
    </section>
  );
}
