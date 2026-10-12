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
      lead: "Dacă ați început să auziți mai slab, cereți des să vi se repete sau vă pierdeți în conversații, o evaluare a auzului vă poate ajuta să înțelegeți ce se întâmplă.",
      statement: "La Volmer, fiecare etapă vă este explicată. Discutăm rezultatele și opțiunile, fără presiune.",
      facts: ["Aproximativ 60 de minute", "Consultația și evaluarea sunt gratuite", "Etapele sunt explicate înainte de începere", "Rezultatele, opțiunile și alegerea vă aparțin"],
      cta: "Programați o verificare gratuită",
      processLink: "Vedeți cum se desfășoară",
    },
    signs: {
      eyebrow: "01 — SEMNE",
      title: "Semne pe care merită să nu le ignorați",
      lead: "Schimbările auzului apar adesea treptat. Uneori sunt observate abia când încep să afecteze situațiile obișnuite.",
      items: [
        { title: "Dați televizorul sau telefonul mai tare", description: "Volumul care înainte era suficient acum pare prea încet.", note: "O evaluare poate clarifica ce se întâmplă." },
        { title: "Cereți des: «Ce? Repetați, vă rog»", description: "Se întâmplă la serviciu, în familie sau în conversațiile de zi cu zi.", note: "Menționați aceste situații la consultație." },
        { title: "Vă este greu să auziți în zgomot", description: "În restaurant, cafenea sau într-un loc aglomerat auziți sunetele, dar vă este dificil să distingeți cuvintele.", note: "Verificarea poate oferi mai multă claritate." },
        { title: "Unele voci nu sunt clare", description: "De exemplu, vocile copiilor, ale femeilor sau vocile mai înalte sunt mai greu de înțeles.", note: "Exemplele concrete ajută la discuția despre auz." },
        { title: "Convorbirile telefonice au devenit dificile", description: "Auziți că persoana vorbește, dar nu distingeți întotdeauna cuvintele.", note: "Spuneți specialistului în ce situații apare dificultatea." },
        { title: "Familia observă schimbări", description: "Cei apropiați vă spun că le este mai greu să comunice cu dumneavoastră.", note: "Poate fi un motiv să verificați ce se întâmplă." },
      ],
      conclusion: "Aceste semne nu reprezintă un diagnostic. Sunt un motiv să aflați mai clar ce se întâmplă cu auzul dumneavoastră.",
    },
    process: {
      eyebrow: "02 — CUM DECURGE",
      title: "Cinci pași simpli către răspunsuri",
      steps: [
        { title: "Discuția", description: "Vorbim despre situațiile în care vă este mai greu să auziți, despre viața de zi cu zi și despre ce vă preocupă.", purpose: "Pentru a înțelege dificultățile pe care doriți să le clarificați." },
        { title: "Explicația etapelor", description: "Vă arătăm cum se desfășoară testarea, ce veți auzi și cum vor fi prezentate rezultatele.", purpose: "Veți ști dinainte la ce să vă așteptați." },
        { title: "Testarea sunetelor", description: "Într-o încăpere confortabilă, veți asculta sunete de diferite tonalități și intensități și veți indica atunci când le auziți.", purpose: "Aflăm ce sunete percepeți mai ușor și care sunt mai dificile." },
        { title: "Testarea înțelegerii vorbirii", description: "Veți auzi cuvinte în condiții diferite și veți repeta ce ați înțeles sau veți indica răspunsul.", purpose: "Perceperea sunetelor și înțelegerea vorbirii sunt lucruri diferite; le discutăm pe ambele." },
        { title: "Explicarea rezultatelor", description: "Parcurgem graficul împreună, discutăm sunetele și frecvențele mai dificile și legătura cu situațiile descrise de dumneavoastră.", purpose: "Veți primi explicații și veți putea discuta opțiunile disponibile." },
      ],
      conclusion: "În aproximativ 60 de minute veți înțelege mai bine ce arată evaluarea despre auzul dumneavoastră.",
    },
    results: {
      eyebrow: "03 — REZULTATE",
      title: "Patru răspunsuri la întrebările importante",
      items: [
        { title: "Cum percepeți diferite sunete", description: "Graficul arată sunetele pe care le percepeți mai ușor și pe cele mai dificile, în cadrul testelor efectuate." },
        { title: "În ce situații apar dificultățile", description: "Discutăm ce se întâmplă în liniște, în zgomot sau în conversațiile de zi cu zi." },
        { title: "Dacă este nevoie de ajutor", description: "Uneori auzul este în limitele așteptate; alteori poate fi utilă o evaluare suplimentară sau o soluție auditivă." },
        { title: "Ce opțiuni puteți lua în considerare", description: "În funcție de rezultate, discutăm monitorizarea, reglarea aparatului sau alte variante potrivite situației dumneavoastră." },
      ],
    },
    audience: {
      eyebrow: "04 — PENTRU CINE",
      title: "Când verificarea auzului poate fi utilă",
      items: [
        { title: "Ați observat o schimbare", description: "Vi se pare că auziți mai slab decât înainte și doriți să înțelegeți mai bine situația.", note: "" },
        { title: "Vă este greu în zgomot", description: "În liniște vă descurcați, dar afară, la restaurant sau în grup vă este mai greu să urmăriți conversația.", note: "" },
        { title: "Folosiți deja un aparat auditiv", description: "Aparatul este vechi, auzul s-a schimbat sau doriți să discutați despre reglaje.", note: "" },
        { title: "Cei apropiați au observat schimbări", description: "Familia dorește să vă ajute să faceți primul pas și să aflați ce se întâmplă.", note: "" },
      ],
    },
    preparation: {
      eyebrow: "05 — PREGĂTIRE",
      title: "Cum vă pregătiți pentru consultație",
      items: ["Notați una sau două situații în care auziți mai greu.", "Dacă folosiți un aparat auditiv, aduceți-l cu dumneavoastră.", "Aduceți rezultatele evaluărilor anterioare, dacă le aveți.", "Puteți veni împreună cu un membru al familiei."],
      note: "Nu este nevoie de o pregătire specială. Puteți adresa întrebările dumneavoastră în timpul consultației.",
    },
    faq: {
      eyebrow: "06 — FAQ",
      title: "Întrebări și răspunsuri",
      items: [
        { question: "Cât durează verificarea auzului?", answer: "Aproximativ 60 de minute. Este recomandată programarea, ca vizita să se desfășoare fără grabă." },
        { question: "Verificarea este dureroasă?", answer: "Nu. În mod obișnuit, veți asculta sunete și veți răspunde la ceea ce auziți, într-un ritm confortabil." },
        { question: "Cum mă pregătesc?", answer: "Notați situațiile în care auziți mai greu și veniți cu întrebările pe care doriți să le discutați." },
        { question: "Ce se întâmplă după evaluare?", answer: "Discutăm rezultatele și opțiunile. Dacă auzul este în limitele așteptate, veți primi explicații; dacă există dificultăți, veți putea discuta variantele următoare. Nu există presiune să cumpărați." },
        { question: "Pot face verificarea dacă port deja aparat auditiv?", answer: "Da. Putem discuta cum vă ajută aparatul, dacă este nevoie de reglare și ce dificultăți ați observat." },
        { question: "Cât de des ar trebui să verific auzul?", answer: "Intervalul depinde de rezultate și de situația fiecărei persoane. Discutați cu specialistul despre recomandarea potrivită pentru dumneavoastră." },
        { question: "De ce aud vocea, dar nu înțeleg cuvintele?", answer: "Înțelegerea vorbirii poate fi influențată de mai mulți factori. Evaluarea poate clarifica ce sunete sunt mai dificile pentru dumneavoastră." },
        { question: "De ce aud mai greu în zgomot?", answer: "Zgomotul de fundal poate face conversația mai dificilă. Spuneți specialistului în ce medii observați problema." },
        { question: "Este nevoie de programare?", answer: "Este recomandată, pentru a avea suficient timp pentru discuție și evaluare. Sunați la 079 331 839." },
      ],
    },
    final: {
      title: "Verificarea nu este un diagnostic. Este informație pentru o alegere conștientă.",
      lead: "Veți înțelege mai bine ce se întâmplă cu auzul dumneavoastră, dacă este nevoie de ajutor și ce opțiuni există.",
      statement: "Apoi decizia vă aparține. De aceea, la Volmer începem cu o discuție despre viața dumneavoastră, nu cu aparatele.",
      cta: "Programați o verificare gratuită",
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
