export type HearingTestLocale = "ro" | "ru";

type Step = { title: string; description: string; purpose: string };
type Sign = { title: string; description: string; note: string };
type Outcome = { title: string; description: string };
type Faq = { question: string; answer: string };

export const hearingTestPageContent: Record<
  HearingTestLocale,
  {
    hero: { eyebrow: string; title: string; lead: string; statement: string; facts: string[]; cta: string; processLink: string };
    signs: { eyebrow: string; title: string; lead: string; items: Sign[]; conclusion: string };
    process: { eyebrow: string; title: string; steps: Step[]; conclusion: string };
    results: { eyebrow: string; title: string; items: Outcome[] };
    audience: { eyebrow: string; title: string; items: Sign[] };
    preparation: { eyebrow: string; title: string; items: string[]; note: string };
    faq: { eyebrow: string; title: string; items: Faq[] };
    final: { title: string; lead: string; statement: string; cta: string };
    imageAlts: { hero: string; audience: string };
  }
> = {
  ro: {
    hero: {
      eyebrow: "EVALUAREA AUZULUI ÎN CHIȘINĂU",
      title: "Verificarea auzului în Chișinău. Gratuită. Corectă. Pe înțeles.",
      lead: "Dacă ai început să auzi mai slab, ceri des să ți se repete sau te pierzi în conversații, o evaluare a auzului te poate ajuta să înțelegi ce se întâmplă.",
      statement: "La Volmer, fiecare etapă îți este explicată. Discutăm rezultatele și opțiunile, fără presiune.",
      facts: ["Aproximativ 60 de minute", "Consultația și evaluarea sunt gratuite", "Etapele sunt explicate înainte de începere", "Rezultate, opțiuni și alegerea îți aparțin"],
      cta: "Programează o verificare gratuită",
      processLink: "Vezi cum se desfășoară",
    },
    signs: {
      eyebrow: "01 — SEMNE",
      title: "Semne pe care merită să nu le ignori",
      lead: "Schimbările auzului apar adesea treptat. Uneori le observi abia când încep să afecteze situațiile obișnuite.",
      items: [
        { title: "Dai televizorul sau telefonul mai tare", description: "Volumul care înainte era suficient acum pare prea încet.", note: "O evaluare poate clarifica ce se întâmplă." },
        { title: "Ceri des: «Ce? Repetă, te rog»", description: "Se întâmplă la serviciu, în familie sau în conversațiile de zi cu zi.", note: "Menționează situațiile acestea la consultație." },
        { title: "Îți este greu să auzi în zgomot", description: "În restaurant, cafenea sau într-un loc aglomerat auzi sunetele, dar îți este dificil să distingi cuvintele.", note: "Verificarea poate oferi mai multă claritate." },
        { title: "Unele voci nu sunt clare", description: "De exemplu, vocile copiilor, ale femeilor sau vocile mai înalte sunt mai greu de înțeles.", note: "Exemplele concrete ajută la discuția despre auz." },
        { title: "Convorbirile telefonice au devenit dificile", description: "Auzi că persoana vorbește, dar nu distingi întotdeauna cuvintele.", note: "Spune specialistului în ce situații apare dificultatea." },
        { title: "Familia observă schimbări", description: "Cei apropiați îți spun că le este mai greu să comunice cu tine.", note: "Poate fi un motiv să verifici ce se întâmplă." },
      ],
      conclusion: "Aceste semne nu reprezintă un diagnostic. Sunt un motiv să afli mai clar ce se întâmplă cu auzul tău.",
    },
    process: {
      eyebrow: "02 — CUM DECURGE",
      title: "Cinci pași simpli către răspunsuri",
      steps: [
        { title: "Discuția", description: "Vorbim despre situațiile în care îți este mai greu să auzi, despre viața de zi cu zi și despre ce te preocupă.", purpose: "Pentru a înțelege dificultățile pe care vrei să le clarifici." },
        { title: "Explicația etapelor", description: "Îți arătăm cum se desfășoară testarea, ce vei auzi și cum vor fi prezentate rezultatele.", purpose: "Știi dinainte la ce să te aștepți." },
        { title: "Testarea sunetelor", description: "Într-o încăpere confortabilă, asculți sunete de diferite tonalități și intensități și indici când le auzi.", purpose: "Aflăm ce sunete percepi mai ușor și care sunt mai dificile." },
        { title: "Testarea înțelegerii vorbirii", description: "Poți auzi cuvinte în condiții diferite și repeți ce ai înțeles sau indici răspunsul.", purpose: "Perceperea sunetelor și înțelegerea vorbirii sunt lucruri diferite; le discutăm pe ambele." },
        { title: "Explicarea rezultatelor", description: "Parcurgem graficul împreună, discutăm sunetele și frecvențele mai dificile și legătura cu situațiile descrise de tine.", purpose: "Primești explicații și poți discuta opțiunile disponibile." },
      ],
      conclusion: "În aproximativ 60 de minute vei înțelege mai bine ce arată evaluarea despre auzul tău.",
    },
    results: {
      eyebrow: "03 — REZULTATE",
      title: "Patru răspunsuri la întrebările importante",
      items: [
        { title: "Cum percepi diferite sunete", description: "Graficul arată sunetele pe care le percepi mai ușor și pe cele mai dificile, în cadrul testelor efectuate." },
        { title: "În ce situații apar dificultățile", description: "Discutăm ce se întâmplă în liniște, în zgomot sau în conversațiile de zi cu zi." },
        { title: "Dacă este nevoie de ajutor", description: "Uneori auzul este în limitele așteptate; alteori poate fi utilă o evaluare suplimentară sau o soluție auditivă." },
        { title: "Ce opțiuni poți lua în considerare", description: "În funcție de rezultate, discutăm monitorizarea, reglarea aparatului sau alte variante potrivite situației tale." },
      ],
    },
    audience: {
      eyebrow: "04 — PENTRU CINE",
      title: "Când verificarea auzului poate fi utilă",
      items: [
        { title: "Ai observat o schimbare", description: "Ți se pare că auzi mai slab decât înainte și vrei să înțelegi mai bine situația.", note: "" },
        { title: "Îți este greu în zgomot", description: "În liniște te descurci, dar afară, la restaurant sau în grup îți este mai greu să urmărești conversația.", note: "" },
        { title: "Folosești deja un aparat auditiv", description: "Aparatul este vechi, auzul s-a schimbat sau vrei să discuți despre reglaje.", note: "" },
        { title: "Cei apropiați au observat schimbări", description: "Familia vrea să te ajute să faci primul pas și să afli ce se întâmplă.", note: "" },
      ],
    },
    preparation: {
      eyebrow: "05 — PREGĂTIRE",
      title: "Cum te pregătești pentru consultație",
      items: ["Notează una sau două situații în care auzi mai greu.", "Dacă folosești un aparat auditiv, ia-l cu tine.", "Adu rezultatele evaluărilor anterioare, dacă le ai.", "Poți veni împreună cu un membru al familiei."],
      note: "Nu este nevoie de o pregătire specială. Poți adresa întrebările tale în timpul consultației.",
    },
    faq: {
      eyebrow: "06 — FAQ",
      title: "Întrebări și răspunsuri",
      items: [
        { question: "Cât durează verificarea auzului?", answer: "Aproximativ 60 de minute. Este recomandată programarea, ca vizita să se desfășoare fără grabă." },
        { question: "Verificarea este dureroasă?", answer: "Nu. În mod obișnuit, asculți sunete și răspunzi la ce auzi, într-un ritm confortabil." },
        { question: "Cum mă pregătesc?", answer: "Notează situațiile în care auzi mai greu și vino cu întrebările pe care vrei să le discuți." },
        { question: "Ce se întâmplă după evaluare?", answer: "Discutăm rezultatele și opțiunile. Dacă auzul este în limitele așteptate, primești explicații; dacă există dificultăți, poți discuta variantele următoare. Nu există presiune să cumperi." },
        { question: "Pot face verificarea dacă port deja aparat auditiv?", answer: "Da. Putem discuta cum te ajută aparatul, dacă este nevoie de reglare și ce dificultăți ai observat." },
        { question: "Cât de des ar trebui să verific auzul?", answer: "Intervalul depinde de rezultate și de situația fiecărei persoane. Discută cu specialistul despre recomandarea potrivită pentru tine." },
        { question: "De ce aud vocea, dar nu înțeleg cuvintele?", answer: "Înțelegerea vorbirii poate fi influențată de mai mulți factori. Evaluarea poate clarifica ce sunete sunt mai dificile pentru tine." },
        { question: "De ce aud mai greu în zgomot?", answer: "Zgomotul de fundal poate face conversația mai dificilă. Spune specialistului în ce medii observi problema." },
        { question: "Este nevoie de programare?", answer: "Este recomandată, pentru a avea suficient timp pentru discuție și evaluare. Sună la 079 331 839." },
      ],
    },
    final: {
      title: "Verificarea nu este un diagnostic. Este informație pentru o alegere conștientă.",
      lead: "Vei înțelege mai bine ce se întâmplă cu auzul tău, dacă este nevoie de ajutor și ce opțiuni există.",
      statement: "Apoi decizia îți aparține. De aceea, la Volmer începem cu o discuție despre viața ta, nu cu aparatele.",
      cta: "Programează o verificare gratuită",
    },
    imageAlts: { hero: "Audiologul efectuează o evaluare a auzului într-un cabinet", audience: "Specialistă verificând auzul unui pacient într-un cabinet Volmer" },
  },
  ru: {
    hero: {
      eyebrow: "ПРОВЕРКА СЛУХА В КИШИНЁВЕ",
      title: "Проверка слуха в Кишинёве. Бесплатно. Честно. Понятно.",
      lead: "Если вы стали хуже слышать, часто просите повторить или теряетесь в разговорах, проверка слуха поможет разобраться, что происходит.",
      statement: "В Volmer мы объясняем каждый этап. Обсуждаем результаты и возможные варианты — без давления.",
      facts: ["Около 60 минут", "Консультация и проверка бесплатны", "Объясняем этапы до начала", "Результаты, варианты и решение — за вами"],
      cta: "Записаться на бесплатную проверку слуха",
      processLink: "Как проходит проверка",
    },
    signs: {
      eyebrow: "01 — ПРИЗНАКИ",
      title: "Признаки, которые не стоит игнорировать",
      lead: "Изменения слуха часто развиваются постепенно. Иногда их замечают, только когда они начинают влиять на привычные ситуации.",
      items: [
        { title: "Вы делаете телевизор или телефон громче", description: "Громкости, которой раньше хватало, теперь кажется недостаточно.", note: "Проверка поможет понять, что происходит." },
        { title: "Часто спрашиваете: «Что? Повтори, пожалуйста»", description: "На работе, в семье или в повседневном разговоре.", note: "Расскажите об этих ситуациях на консультации." },
        { title: "Трудно слышать в шуме", description: "В ресторане, кафе или людном месте вы слышите звуки, но с трудом различаете слова.", note: "Проверка поможет прояснить ситуацию." },
        { title: "Некоторые голоса звучат неясно", description: "Например, сложнее понимать детские, женские или более высокие голоса.", note: "Конкретные примеры помогут обсудить слух." },
        { title: "Телефонные разговоры стали сложнее", description: "Вы слышите голос, но не всегда различаете слова.", note: "Расскажите специалисту, в каких случаях это происходит." },
        { title: "Близкие замечают изменения", description: "Родные говорят, что им стало труднее общаться с вами.", note: "Это может быть поводом проверить слух." },
      ],
      conclusion: "Эти признаки не являются диагнозом. Это повод узнать, что происходит со слухом.",
    },
    process: {
      eyebrow: "02 — КАК ПРОХОДИТ ПРОВЕРКА",
      title: "Пять простых шагов к ответам",
      steps: [
        { title: "Разговор", description: "Обсудим ситуации, в которых вам труднее слышать, повседневную жизнь и то, что вас беспокоит.", purpose: "Чтобы понять, какие трудности важно прояснить." },
        { title: "Объяснение этапов", description: "Расскажем, как проходит проверка, какие звуки вы услышите и как будут представлены результаты.", purpose: "Вы заранее знаете, чего ожидать." },
        { title: "Проверка звуков", description: "В комфортной комнате вы слушаете звуки разной высоты и громкости и отмечаете, когда их слышите.", purpose: "Так мы узнаём, какие звуки вы воспринимаете легче, а какие труднее." },
        { title: "Проверка понимания речи", description: "Вам могут предложить слова в разных условиях; нужно повторить услышанное или показать, что вы поняли.", purpose: "Восприятие звуков и понимание речи — разные вещи; обсудим оба аспекта." },
        { title: "Объяснение результатов", description: "Вместе посмотрим график, обсудим более сложные звуки и частоты и связь с описанными вами ситуациями.", purpose: "Вы получите понятные объяснения и сможете обсудить варианты." },
      ],
      conclusion: "Примерно за 60 минут вы лучше поймёте, что проверка показывает о вашем слухе.",
    },
    results: {
      eyebrow: "03 — РЕЗУЛЬТАТЫ",
      title: "Четыре ответа на важные вопросы",
      items: [
        { title: "Как вы воспринимаете разные звуки", description: "График показывает звуки, которые вы воспринимаете легче или труднее, в рамках проведённых тестов." },
        { title: "В каких ситуациях возникают трудности", description: "Обсудим, что происходит в тишине, в шуме и в повседневных разговорах." },
        { title: "Нужна ли помощь", description: "Иногда слух в пределах ожидаемого; в других случаях может быть полезна дополнительная оценка или слуховое решение." },
        { title: "Какие варианты можно рассмотреть", description: "В зависимости от результатов обсудим наблюдение, настройку аппарата или другие подходящие варианты." },
      ],
    },
    audience: {
      eyebrow: "04 — КОМУ ПОДОЙДЁТ",
      title: "Когда полезно проверить слух",
      items: [
        { title: "Вы заметили изменения", description: "Кажется, что вы стали слышать хуже, и вы хотите лучше понять ситуацию.", note: "" },
        { title: "Трудно слышать в шуме", description: "В тишине вы справляетесь, но на улице, в ресторане или в компании сложнее следить за разговором.", note: "" },
        { title: "Вы уже пользуетесь аппаратом", description: "Аппарат старый, слух изменился или вы хотите обсудить настройку.", note: "" },
        { title: "Близкие заметили изменения", description: "Родные хотят помочь вам сделать первый шаг и разобраться в ситуации.", note: "" },
      ],
    },
    preparation: {
      eyebrow: "05 — ПОДГОТОВКА",
      title: "Как подготовиться к консультации",
      items: ["Запишите одну-две ситуации, когда вам кажется, что вы слышите хуже.", "Если пользуетесь слуховым аппаратом, возьмите его с собой.", "Возьмите результаты предыдущих проверок, если они есть.", "Можно прийти вместе с членом семьи."],
      note: "Специальная подготовка не нужна. Вы сможете задать свои вопросы во время консультации.",
    },
    faq: {
      eyebrow: "06 — FAQ",
      title: "Вопросы и ответы",
      items: [
        { question: "Сколько длится проверка слуха?", answer: "Около 60 минут. Рекомендуется записаться, чтобы пройти консультацию без спешки." },
        { question: "Проверка болезненна?", answer: "Нет. Обычно вы слушаете звуки и отвечаете на то, что слышите, в комфортном темпе." },
        { question: "Как подготовиться?", answer: "Запишите ситуации, когда вы слышите хуже, и приходите с вопросами, которые хотите обсудить." },
        { question: "Что происходит после проверки?", answer: "Мы обсуждаем результаты и варианты. Если слух в ожидаемых пределах, вы получите объяснение; если есть трудности, обсудим возможные следующие шаги. Покупка не навязывается." },
        { question: "Можно пройти проверку, если я уже ношу аппарат?", answer: "Да. Обсудим, помогает ли аппарат, нужна ли настройка и какие трудности вы замечаете." },
        { question: "Как часто нужно проверять слух?", answer: "Интервал зависит от результатов и индивидуальной ситуации. Обсудите подходящую периодичность со специалистом." },
        { question: "Почему слышу голос, но не понимаю слова?", answer: "На понимание речи могут влиять разные факторы. Проверка поможет выяснить, какие звуки даются вам труднее." },
        { question: "Почему в шуме слышу хуже?", answer: "Фоновый шум может затруднять разговор. Расскажите специалисту, в каких местах это происходит." },
        { question: "Нужно ли записываться?", answer: "Запись рекомендуется, чтобы уделить достаточно времени разговору и проверке. Позвоните по номеру 079 331 839." },
      ],
    },
    final: {
      title: "Проверка — не диагноз. Это информация для осознанного выбора.",
      lead: "Вы лучше поймёте, что происходит со слухом, нужна ли помощь и какие варианты доступны.",
      statement: "А решение останется за вами. Поэтому в Volmer проверка начинается с разговора о вашей жизни, а не с аппаратов.",
      cta: "Записаться на бесплатную проверку слуха",
    },
    imageAlts: { hero: "Специалист проводит проверку слуха в кабинете", audience: "Специалист проверяет слух пациента в кабинете Volmer" },
  },
};
