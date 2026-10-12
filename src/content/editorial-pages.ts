import {hearingTestPageContent} from './hearing-test-page';
import type {EditorialLocale, EditorialType} from './editorial-routing';
export {editorialPath, editorialTypeFor, editorialTypes} from './editorial-routing';
export type {EditorialLocale, EditorialType} from './editorial-routing';
type Section = {title: string; text: string; points?: string[]};
type Faq = {question: string; answer: string};
export type EditorialPage = {title: string; description: string; eyebrow: string; lead: string; sections: Section[]; faqs?: Faq[]; source?: {label: string; href: string}; related?: EditorialType[]};

// TODO(content): Add confirmed CNAM details, staff credentials and authorization scans only after Volmer supplies verifiable material.
const content: Record<EditorialLocale, Record<EditorialType, EditorialPage>> = {
  ro: {
    test: {title: 'Test auditiv gratuit în Chișinău', description: 'Evaluarea auzului la Volmer: gratuită, explicată pas cu pas și programabilă online.', eyebrow: 'EVALUAREA AUZULUI', lead: 'Aflați ce auziți bine, ce este mai dificil și ce opțiuni aveți, fără presiune.', sections: []},
    diaspora: {title: 'Ajutați-vă părinții din Moldova să audă mai clar', description: 'Organizați de la distanță o evaluare auditivă pentru părinții dumneavoastră la centrul Volmer din Chișinău. Aflați cum decurg vizita, plata și sprijinul ulterior.', eyebrow: 'PENTRU FAMILIA DE PESTE HOTARE', lead: 'Sunteți departe, dar puteți face primul pas pentru părinții dumneavoastră. Echipa Volmer îi primește în centrul Chișinăului, explică rezultatele și discută opțiunile fără presiune.', sections: [], source: {label: 'The Lancet Commission 2024 — raport despre prevenția și îngrijirea demenței', href: 'https://pubmed.ncbi.nlm.nih.gov/39096926/'}, faqs: [
      {question: 'Pot organiza vizita dacă locuiesc în altă țară?', answer: 'Da. Contactați-ne pe WhatsApp sau telefon și spuneți-ne pentru cine doriți vizita. Stabilim împreună detaliile și datele de contact ale părintelui.'},
      {question: 'Cum pot achita din străinătate?', answer: 'Acceptăm plata cu cardul, prin transfer bancar sau numerar la oficiu. Pentru plata de la distanță, contactați echipa înainte de vizită pentru a confirma metoda și detaliile actuale. Ratele nu sunt disponibile momentan.'},
      {question: 'Ce include vizita și cât durează?', answer: 'Consultația și evaluarea inițială sunt gratuite și durează aproximativ 60 de minute. Discutăm observațiile, verificăm auzul și explicăm rezultatele. Aparatul, dacă este recomandat și ales, se achită separat; costul depinde de model.'},
      {question: 'Cât costă aparatul auditiv?', answer: 'Prețul depinde de model și configurație. După evaluare, echipa prezintă opțiunile disponibile și costurile înainte de orice decizie.'},
      {question: 'Ce garanție și suport sunt incluse?', answer: 'Aparatele au garanție de 2 ani. Sunt incluse până la 4 vizite de control pe an în perioada garanției, conform condițiilor explicate la consultație.'},
      {question: 'În ce limbi putem comunica?', answer: 'Puteți scrie echipei în română sau rusă. Pentru limba preferată a părintelui, anunțați-ne când organizați vizita.'},
      {question: 'Veți suna după fiecare vizită?', answer: 'Putem ține legătura cu dumneavoastră după vizită, cu acordul părintelui. Respectăm confidențialitatea și nu transmitem informații despre sănătatea lui fără consimțământ.'}
    ]},
    flex: {title: 'Flex Trial: testați aparatul în viața de zi cu zi', description: 'Aflați cum puteți încerca o soluție auditivă Unitron înainte de decizia finală la Volmer Chișinău.', eyebrow: 'TESTAȚI ÎNAINTE SĂ DECIDEȚI', lead: 'Sunetul din cabinet este doar începutul. O probă în situațiile dumneavoastră reale vă poate arăta cum se simte aparatul acasă, în conversații și afară.', sections: [
      {title: 'Mai întâi, evaluarea', text: 'Discutăm unde este mai greu să auziți și evaluăm auzul. Rezultatele ne ajută să alegem o soluție care poate fi reglată pentru nevoile dumneavoastră.'},
      {title: 'Aparatul este ajustat pentru dumneavoastră', text: 'Setările inițiale sunt făcute în funcție de evaluare și de confortul dumneavoastră. Veți primi explicații despre folosire și despre ce merită să observați în timpul probei.'},
      {title: 'Testați în situații reale', text: 'Folosiți aparatul în conversații obișnuite și notați unde sunetul este clar sau încă dificil. Această experiență este mai utilă decât o decizie grăbită.'},
      {title: 'Discutăm rezultatul împreună', text: 'La revenire, vorbim despre ce ați observat și ce ajustări pot ajuta. Decizia finală vine după ce înțelegeți ce vi se potrivește. Condițiile concrete ale probei sunt confirmate la consultație.'}
    ], related: ['test', 'contact']},
    dementia: {title: 'Auzul și sănătatea cognitivă: ce știm și ce nu știm', description: 'Informații prudente despre legătura dintre pierderea auzului și sănătatea cognitivă, cu surse medicale.', eyebrow: 'AUZ ȘI SĂNĂTATE', lead: 'Dificultățile de auz pot afecta conversațiile și participarea socială. Cercetarea studiază și legătura lor cu schimbările cognitive, dar o asociere nu dovedește automat o cauză.', sections: [
      {title: 'O legătură studiată, nu o promisiune', text: 'Studiile observaționale au găsit asocieri între pierderea auzului și riscul de declin cognitiv. Pot interveni și alți factori; aceste rezultate nu înseamnă că un aparat auditiv previne sau tratează demența.'},
      {title: 'Ce a arătat un studiu clinic', text: 'În studiul ACHIEVE, intervenția auditivă nu a redus declinul cognitiv în întregul grup analizat. Un beneficiu a fost observat într-un subgrup cu risc mai mare. Rezultatele nu permit promisiuni individuale.'},
      {title: 'De ce merită verificat auzul', text: 'O evaluare poate clarifica dificultățile de comunicare și opțiunile pentru auz. Dacă există și schimbări de memorie, orientare sau comportament, discutați cu un medic.'},
      {title: 'Informație, nu diagnostic', text: 'Această pagină nu înlocuiește o evaluare medicală și nu recomandă un tratament pentru demență. Alegerea unei soluții auditive se face după evaluarea auzului și discuția cu un specialist.'}
    ], source: {label: 'Studiul clinic ACHIEVE, publicat în The Lancet', href: 'https://pubmed.ncbi.nlm.nih.gov/37478886/'}, related: ['test', 'faq']},
    cnam: {title: 'CNAM și aparatele auditive: unde verificați informațiile actuale', description: 'Ghid prudent pentru verificarea informațiilor oficiale despre sprijinul pentru dispozitive medicale în Moldova.', eyebrow: 'INFORMAȚII OFICIALE', lead: 'Regulile programelor publice se pot schimba. Pentru o decizie financiară, consultați lista și condițiile publicate de CNAM înainte să presupuneți că un aparat este compensat.', sections: [
      {title: 'Ce se poate verifica oficial', text: 'CNAM publică liste și ghiduri pentru dispozitive medicale compensate. Existența unui mecanism general nu confirmă automat includerea unui anumit aparat auditiv sau eligibilitatea unei persoane.'},
      {title: 'Ce să întrebați înainte de a decide', text: 'Verificați denumirea exactă a dispozitivului, condițiile de eligibilitate, pașii necesari și data la care informația este valabilă. Pentru răspunsuri oficiale, contactați CNAM sau instituția competentă.'},
      {title: 'Cum vă ajută evaluarea la Volmer', text: 'Evaluarea auzului vă poate ajuta să înțelegeți nevoile auditive și opțiunile tehnice. Nu echivalează cu o confirmare a compensării sau a drepturilor în cadrul unui program public.'}
    ], source: {label: 'CNAM — lista dispozitivelor medicale compensate', href: 'https://cnam.md/beneficiari/medicamente-compensate-as/lista-dispozitivelor-medicale-compensate/'}, related: ['test', 'contact']},
    about: {title: 'Volmer Moldova: soluții auditive în Chișinău', description: 'Despre compania-mamă Volmer din Germania și serviciile actuale din Chișinău: audiologie și aparate auditive. Str. Mitropolit Varlaam 69.', eyebrow: 'DESPRE VOLMER', lead: 'Experiență germană pentru auzul de zi cu zi. În Republica Moldova, Volmer începe cu serviciile dedicate auzului.', sections: [], related: ['test', 'contact', 'faq']},
    team: {title: 'Echipa de specialiști Volmer', description: 'Cunoașteți echipa Volmer din Chișinău și specialiștii în audioprotezare.', eyebrow: 'OAMENII VOLMER', lead: 'Specialiștii noștri explică rezultatele evaluării și discută opțiunile auditive potrivite, fără presiune.', sections: []},
    faq: {title: 'Întrebări frecvente despre auz și aparate auditive', description: 'Răspunsuri clare despre evaluarea auzului, programarea online, aparate, probă și îngrijirea de zi cu zi.', eyebrow: 'ÎNTREBĂRI ȘI RĂSPUNSURI', lead: 'Am adunat răspunsuri la întrebările pe care oamenii le pun înainte și după evaluarea auzului.', sections: [], faqs: [
      ...hearingTestPageContent.ro.faq.items,
      {question: 'Ce este Flex Trial?', answer: 'Este posibilitatea de a încerca o soluție auditivă în viața de zi cu zi înainte de decizia finală. Detaliile probei se stabilesc la consultație.'},
      {question: 'Cum fac o programare online?', answer: 'Pe pagina principală alegeți o dată și o oră disponibile, completați datele solicitate și primiți confirmarea pe site.'},
      {question: 'Ce aduc la evaluare?', answer: 'Dacă aveți rezultate anterioare sau folosiți deja un aparat auditiv, le puteți aduce. Notați și situațiile în care auziți mai greu.'},
      {question: 'Cum este ales aparatul potrivit?', answer: 'După evaluare discutăm forma, tehnologia, rutina zilnică și preferințele dumneavoastră. Nu există un singur model potrivit pentru fiecare persoană.'},
      {question: 'Pot reveni pentru ajustări?', answer: 'Da. Dacă sunetul sau confortul nu sunt potrivite, discutați cu echipa Volmer despre reglajele necesare.'}
    ], related: ['test', 'flex', 'contact']},
    contact: {title: 'Contact Volmer în Chișinău', description: 'Contactați Volmer la Str. Mitropolit Varlaam 69, Chișinău. Consultați telefonul și programul și faceți o programare pentru evaluarea auzului.', eyebrow: 'CONTACT', lead: 'Suntem pe Str. Mitropolit Varlaam 69. Ne puteți suna, ne puteți scrie sau vă puteți programa online pentru evaluarea auzului și consultație.', sections: [], faqs: [
      {question: 'Este necesară programarea?', answer: 'Pentru a alege din timp o zi și o oră potrivite, puteți folosi formularul de programare online de pe această pagină sau ne puteți contacta telefonic.'},
      {question: 'Cât durează o programare?', answer: 'Rezervăm 60 de minute pentru fiecare programare, astfel încât să existe timp pentru evaluare, explicații și întrebări.'},
      {question: 'Ce să aduc la prima vizită?', answer: 'Dacă aveți o audiogramă anterioară sau folosiți deja aparate auditive, le puteți aduce. Vă poate ajuta să vă gândiți și la situațiile în care vă este cel mai greu să auziți.'},
      {question: 'Unde se află Volmer?', answer: 'Ne găsiți pe Str. Mitropolit Varlaam 69, în Chișinău. Fotografia intrării și linkul către Google Maps vă ajută să identificați locația și să deschideți traseul.'},
      {question: 'Pot programa online?', answer: 'Da. Alegeți o dată și un interval disponibile în formularul de pe această pagină, completați datele și confirmați programarea.'}
    ], related: ['test', 'about']}
  },
  ru: {
    test: {title: 'Бесплатная проверка слуха в Кишинёве', description: 'Проверка слуха в Volmer: бесплатно, понятно и с возможностью онлайн-записи.', eyebrow: 'ПРОВЕРКА СЛУХА', lead: 'Узнайте, какие звуки воспринимаются легко, что вызывает трудности и какие есть варианты.', sections: []},
    diaspora: {title: 'Помогите родителям в Молдове лучше слышать', description: 'Организуйте проверку слуха для родителей в центре Volmer в Кишинёве, даже если вы живёте за границей. Узнайте о визите, оплате и дальнейшей поддержке.', eyebrow: 'ДЛЯ СЕМЬИ ЗА ГРАНИЦЕЙ', lead: 'Вы далеко, но можете сделать первый шаг для близких. Команда Volmer встретит их в центре Кишинёва, объяснит результаты и спокойно расскажет о возможных решениях.', sections: [], source: {label: 'Комиссия The Lancet 2024 — доклад о профилактике и лечении деменции', href: 'https://pubmed.ncbi.nlm.nih.gov/39096926/'}, faqs: [
      {question: 'Можно ли организовать визит из другой страны?', answer: 'Да. Напишите нам в WhatsApp или позвоните. Расскажите, кому нужна проверка, и мы согласуем детали и контакты вашего родителя.'},
      {question: 'Как оплатить из-за границы?', answer: 'Оплатить можно картой, банковским переводом или наличными в центре. Для дистанционной оплаты заранее свяжитесь с командой, чтобы подтвердить доступный способ и актуальные реквизиты. Рассрочка пока недоступна.'},
      {question: 'Что входит в визит и сколько он длится?', answer: 'Первичная консультация и проверка слуха бесплатны и занимают около 60 минут. Мы обсуждаем наблюдения, проверяем слух и объясняем результаты. Слуховой аппарат, если он будет рекомендован и выбран, оплачивается отдельно.'},
      {question: 'Сколько стоит слуховой аппарат?', answer: 'Стоимость зависит от модели и конфигурации. После проверки команда расскажет о доступных вариантах и цене до принятия решения.'},
      {question: 'Какая гарантия и поддержка предусмотрены?', answer: 'На аппараты действует гарантия 2 года. В течение гарантийного периода включено до 4 контрольных визитов в год; условия объясняются на консультации.'},
      {question: 'На каких языках можно общаться?', answer: 'Команде можно написать на румынском или русском. Сообщите заранее, на каком языке родителю будет удобнее общаться.'},
      {question: 'Вы позвоните после каждого визита?', answer: 'Мы можем связываться с вами после визита с согласия родителя. Мы соблюдаем конфиденциальность и не передаём сведения о его здоровье без разрешения.'}
    ]},
    flex: {title: 'Flex Trial: попробуйте аппарат в обычной жизни', description: 'Как попробовать слуховое решение Unitron до окончательного выбора в Volmer Кишинёв.', eyebrow: 'ПОПРОБУЙТЕ ПЕРЕД РЕШЕНИЕМ', lead: 'Звучание в кабинете — только начало. Проба в привычных ситуациях покажет, как аппарат помогает дома, в разговоре и вне дома.', sections: [
      {title: 'Сначала проверка слуха', text: 'Обсуждаем ситуации, в которых трудно слышать, и проверяем слух. Результаты помогают подобрать решение, которое можно настроить под ваши потребности.'},
      {title: 'Индивидуальная настройка', text: 'Первоначальные настройки учитывают результаты проверки и ваш комфорт. Мы объясняем, как пользоваться аппаратом и что наблюдать во время пробы.'},
      {title: 'Проба в реальной жизни', text: 'Пользуйтесь аппаратом в обычных разговорах и отмечайте, где звук стал яснее, а где ещё есть трудности. Такой опыт полезнее поспешного решения.'},
      {title: 'Обсудим впечатления', text: 'При повторной встрече поговорим о вашем опыте и возможных корректировках. Окончательное решение принимается после того, как вы разберётесь в вариантах. Конкретные условия пробы уточняются на консультации.'}
    ], related: ['test', 'contact']},
    dementia: {title: 'Слух и когнитивное здоровье: что известно и что нет', description: 'Осторожный разбор связи между снижением слуха и когнитивным здоровьем со ссылкой на медицинское исследование.', eyebrow: 'СЛУХ И ЗДОРОВЬЕ', lead: 'Трудности со слухом могут мешать разговорам и общению. Исследователи изучают и их связь с когнитивными изменениями, но статистическая связь не доказывает причинность.', sections: [
      {title: 'Связь изучается, но гарантий нет', text: 'Наблюдательные исследования находят связь между потерей слуха и риском когнитивного снижения. На результаты влияют и другие факторы; это не означает, что слуховой аппарат предотвращает или лечит деменцию.'},
      {title: 'Что показало клиническое исследование', text: 'В исследовании ACHIEVE вмешательство в отношении слуха не снизило когнитивное снижение во всей изученной группе. Польза наблюдалась в подгруппе с более высоким риском. Эти результаты не позволяют давать индивидуальные обещания.'},
      {title: 'Почему стоит проверить слух', text: 'Проверка может прояснить трудности общения и возможные варианты помощи. Если появились изменения памяти, ориентации или поведения, обратитесь к врачу.'},
      {title: 'Информация, а не диагноз', text: 'Эта страница не заменяет медицинское обследование и не предлагает лечения деменции. Слуховое решение выбирают после проверки слуха и консультации специалиста.'}
    ], source: {label: 'Клиническое исследование ACHIEVE, The Lancet', href: 'https://pubmed.ncbi.nlm.nih.gov/37478886/'}, related: ['test', 'faq']},
    cnam: {title: 'CNAM и слуховые аппараты: где проверить актуальные правила', description: 'Как проверить официальную информацию о программах поддержки медицинских изделий в Молдове.', eyebrow: 'ОФИЦИАЛЬНАЯ ИНФОРМАЦИЯ', lead: 'Условия государственных программ могут меняться. Перед финансовым решением проверьте актуальные списки и правила CNAM, не предполагая, что конкретный аппарат компенсируется.', sections: [
      {title: 'Что можно проверить официально', text: 'CNAM публикует списки и руководства по компенсируемым медицинским изделиям. Наличие общего механизма не подтверждает включение конкретного слухового аппарата или право отдельного человека на компенсацию.'},
      {title: 'Что уточнить заранее', text: 'Проверьте точное название изделия, условия получения, необходимые шаги и дату действия информации. За официальным ответом обратитесь в CNAM или уполномоченное учреждение.'},
      {title: 'Чем поможет проверка в Volmer', text: 'Проверка слуха поможет понять слуховые потребности и технические варианты. Она не является подтверждением права на компенсацию по государственной программе.'}
    ], source: {label: 'CNAM — список компенсируемых медицинских изделий', href: 'https://cnam.md/beneficiari/medicamente-compensate-as/lista-dispozitivelor-medicale-compensate/'}, related: ['test', 'contact']},
    about: {title: 'Volmer в Молдове: слуховые решения в Кишинёве', description: 'О компании Volmer в Германии и услугах в Кишинёве: проверка слуха и слуховые аппараты. Адрес: ул. Митрополит Варлаам, 69.', eyebrow: 'О VOLMER', lead: 'Немецкий опыт — для слуха в повседневной жизни. В Молдове Volmer начинает с услуг, связанных со слухом.', sections: [], related: ['test', 'contact', 'faq']},
    team: {title: 'Специалисты команды Volmer', description: 'Познакомьтесь с командой Volmer в Кишинёве и специалистами по слухопротезированию.', eyebrow: 'КОМАНДА VOLMER', lead: 'Наши специалисты объясняют результаты проверки слуха и обсуждают подходящие решения без давления.', sections: []},
    faq: {title: 'Частые вопросы о слухе и слуховых аппаратах', description: 'Понятные ответы о проверке слуха, онлайн-записи, аппаратах, пробе и повседневном уходе.', eyebrow: 'ВОПРОСЫ И ОТВЕТЫ', lead: 'Здесь собраны ответы на вопросы, которые люди задают до и после проверки слуха.', sections: [], faqs: [
      ...hearingTestPageContent.ru.faq.items,
      {question: 'Что такое Flex Trial?', answer: 'Это возможность попробовать слуховое решение в обычной жизни до окончательного выбора. Подробности обсуждаются на консультации.'},
      {question: 'Как записаться онлайн?', answer: 'На главной странице выберите свободные дату и время, заполните форму и получите подтверждение на сайте.'},
      {question: 'Что взять с собой на проверку?', answer: 'Если есть прежние результаты проверки или вы уже пользуетесь аппаратом, возьмите их с собой. Вспомните ситуации, в которых трудно слышать.'},
      {question: 'Как подбирают подходящий аппарат?', answer: 'После проверки мы обсуждаем форму, технологии, вашу повседневную жизнь и предпочтения. Одной модели для всех не существует.'},
      {question: 'Можно ли вернуться для настройки?', answer: 'Да. Если звучание или комфорт не подходят, обсудите с командой Volmer возможные корректировки.'}
    ], related: ['test', 'flex', 'contact']},
    contact: {title: 'Контакты Volmer в Кишинёве', description: 'Свяжитесь с Volmer по адресу ул. Митрополит Варлаам 69, Кишинёв. Телефон, график работы и онлайн-запись на проверку слуха.', eyebrow: 'КОНТАКТЫ', lead: 'Мы находимся на улице Митрополит Варлаам, 69. Позвоните, напишите или запишитесь онлайн на проверку слуха и консультацию.', sections: [], faqs: [
      {question: 'Нужно ли записываться заранее?', answer: 'Чтобы выбрать удобные дату и время, воспользуйтесь формой онлайн-записи на этой странице или свяжитесь с нами по телефону.'},
      {question: 'Сколько длится приём?', answer: 'На каждую запись отводится 60 минут, чтобы хватило времени на проверку, объяснения и ваши вопросы.'},
      {question: 'Что взять с собой на первый визит?', answer: 'Если у вас есть предыдущая аудиограмма или вы уже пользуетесь слуховыми аппаратами, возьмите их с собой. Также полезно вспомнить ситуации, в которых вам труднее всего слышать.'},
      {question: 'Где находится Volmer?', answer: 'Мы находимся по адресу: ул. Митрополит Варлаам, 69, Кишинёв. Фотография входа и ссылка на Google Maps помогут найти центр и построить маршрут.'},
      {question: 'Можно ли записаться онлайн?', answer: 'Да. Выберите свободные дату и время в форме на этой странице, заполните данные и подтвердите запись.'}
    ], related: ['test', 'about']}
  }
};

export function editorialContent(locale: EditorialLocale, type: EditorialType): EditorialPage {
  return content[locale][type];
}
