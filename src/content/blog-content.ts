export type Locale = 'ro' | 'ru';
type Section = {heading: string; paragraphs: string[]};
type Article = {slug: string; title: string; description: string; category: string; sections: Section[]; next: 'test' | 'aids' | 'contact'; source: {label: string; url: string}};
const nidcdAids = {label: 'NIDCD — Hearing Aids', url: 'https://www.nidcd.nih.gov/health/hearing-aids'};
const whoHearing = {label: 'OMS — Deafness and hearing loss', url: 'https://www.who.int/news-room/fact-sheets/detail/deafness-and-hearing-loss'};
const nidcdSudden = {label: 'NIDCD — Sudden Deafness', url: 'https://www.nidcd.nih.gov/health/sudden-deafness'};
export const articles: Record<Locale, Article[]> = {
  ro: [
    {slug:'semne-auz-slab',title:'Cum vă dați seama că auzul începe să scadă?',description:'Semnele pierderii auzului în conversații, la telefon și în zgomot; când este utilă verificarea auzului.',category:'Auz și simptome',next:'test',source:whoHearing,sections:[
      {heading:'Semne care se repetă',paragraphs:['Cereți des să vi se repete cuvintele, măriți televizorul sau înțelegeți mai greu vocile când vorbesc mai multe persoane? Aceste situații pot indica o scădere a auzului, chiar dacă încă auziți unele sunete bine.','Notați unde apar dificultățile și dacă afectează o ureche sau ambele. Un test auditiv poate arăta ce frecvențe au devenit mai greu de auzit.']},
      {heading:'Când cereți ajutor',paragraphs:['Pentru schimbări treptate, programați o evaluare a auzului. Dacă auzul scade brusc, mai ales într-o singură ureche, solicitați prompt consult medical; nu așteptați o programare obișnuită.']}
    ]},
    {slug:'aud-vocea-nu-inteleg-cuvintele',title:'De ce aud vocea, dar nu înțeleg toate cuvintele?',description:'De ce vocea se aude, dar cuvintele rămân neclare și ce poate arăta o audiogramă.',category:'Auz și simptome',next:'test',source:whoHearing,sections:[
      {heading:'Volumul și claritatea sunt lucruri diferite',paragraphs:['Puteți auzi că cineva vorbește, dar să pierdeți consoane și să ghiciți cuvintele din context. Dificultatea este adesea mai vizibilă când interlocutorul vorbește încet, de la distanță sau fără contact vizual. Cauzele pot fi diferite și nu se stabilesc doar din acest semn.']},
      {heading:'Ce puteți face',paragraphs:['Spuneți la evaluare în ce situații înțelegeți greu și aduceți exemple concrete. Audiometria măsoară pragurile auditive; specialistul vă poate explica audiograma și dacă sunt necesare examinări suplimentare. Până atunci, rugați interlocutorul să vorbească clar, cu fața spre dumneavoastră.']}
    ]},
    {slug:'vorbirea-in-zgomot',title:'De ce este mai greu să înțelegeți vorbirea în zgomot?',description:'Conversațiile în restaurant sau în familie pot deveni dificile înainte ca pierderea auzului să fie evidentă.',category:'Auz și simptome',next:'test',source:whoHearing,sections:[
      {heading:'Zgomotul acoperă detaliile vorbirii',paragraphs:['Într-un local, la o masă cu mai multe persoane sau în trafic, vocile se suprapun. Dacă anumite sunete ale vorbirii se aud mai slab, creierul primește mai puține indicii pentru a separa cuvintele. Oboseala și distanța pot agrava dificultatea.']},
      {heading:'Pași practici',paragraphs:['Stați mai aproape de persoana care vorbește și alegeți un loc cu mai puțin zgomot. Dacă problema persistă, verificați auzul și descrieți exact mediile dificile. Un aparat auditiv, când este indicat, necesită reglare pentru aceste situații; nu promite înțelegere perfectă în orice zgomot.']}
    ]},
    {slug:'cand-faci-test-auditiv',title:'Când este recomandat să faceți un test auditiv?',description:'Aflați când merită verificat auzul și când o schimbare bruscă necesită evaluare medicală urgentă.',category:'Testarea auzului',next:'test',source:nidcdSudden,sections:[
      {heading:'Când verificarea ajută',paragraphs:['Faceți o evaluare dacă repetați frecvent „ce?”, creșteți volumul televizorului, evitați conversațiile în grup sau cei apropiați observă schimbări. Este utilă și când apar dificultăți la telefon sau la serviciu. Nu trebuie să așteptați o pierdere severă a auzului.']},
      {heading:'Semne care cer consult medical rapid',paragraphs:['Pierderea bruscă a auzului, mai ales unilaterală, este o situație medicală urgentă. Contactați cât mai repede un medic ORL. Un test gratuit programat pentru altă zi nu înlocuiește această evaluare.']}
    ]},
    {slug:'cum-se-desfasoara-test-auditiv',title:'Cum se desfășoară un test auditiv?',description:'Pașii unei verificări a auzului: discuție, audiometrie, audiogramă și explicația rezultatelor.',category:'Testarea auzului',next:'test',source:whoHearing,sections:[
      {heading:'De la discuție la măsurare',paragraphs:['La început descrieți ce auziți greu și în ce situații. În audiometrie, răspundeți când percepeți sunete la intensități și frecvențe diferite. Rezultatele se notează pe o audiogramă, separat pentru fiecare ureche.']},
      {heading:'Cum folosiți rezultatul',paragraphs:['Cereți să vi se explice ce arată audiograma și ce nu poate stabili singură. În funcție de rezultat, specialistul poate discuta opțiuni auditive ori recomanda un consult medical. La Volmer puteți programa o verificare gratuită a auzului în Chișinău.']}
    ]},
    {slug:'cum-alegi-aparat-auditiv',title:'Cum alegeți un aparat auditiv potrivit?',description:'Alegerea unui aparat pentru auz după audiogramă, confort, utilizare zilnică și buget, nu doar după preț.',category:'Alegerea aparatului',next:'aids',source:nidcdAids,sections:[
      {heading:'Porniți de la nevoile reale',paragraphs:['Audiograma, anatomia urechii și conversațiile pe care vreți să le înțelegeți ghidează alegerea. Discutați dacă folosiți telefonul, cât de des sunteți în zgomot și cât de ușor puteți manevra un aparat mic. RIC, BTE și intraauricularele au compromisuri diferite.']},
      {heading:'Întrebări înainte de cumpărare',paragraphs:['Cereți explicații despre alimentare, conectivitate, reglare, întreținere, garanție și prețul configurației recomandate. Proba și adaptarea pot clarifica confortul. Disponibilitatea unui model și costul final se confirmă la Volmer.']}
    ]},
    {slug:'ric-bte-intraauricular',title:'RIC vs BTE: care este diferența?',description:'Comparație între aparatele auditive RIC, retroauriculare BTE și intraauriculare, cu criterii practice de alegere.',category:'Tipuri de aparate',next:'aids',source:nidcdAids,sections:[
      {heading:'Unde stă aparatul',paragraphs:['RIC are carcasa în spatele urechii și receptorul în canal. BTE are componentele principale în spatele urechii și transmite sunetul prin tub sau mulaj. Un model intraauricular se așază în ureche. Dimensiunea nu spune singură care va funcționa mai bine.']},
      {heading:'Ce influențează alegerea',paragraphs:['Contează pierderea de auz, forma canalului, cerumenul, dexteritatea și puterea necesară. Întrebați cum se curăță, cum se schimbă consumabilele și dacă modelul are funcțiile dorite. Specialistul poate compara variantele după evaluare.']}
    ]},
    {slug:'aparate-reincarcabile-avantaje',title:'Aparate auditive reîncărcabile: avantaje și limitări',description:'Când merită un aparat auditiv reîncărcabil și ce verificați la autonomie, încărcător și călătorii.',category:'Tehnologia aparatelor',next:'aids',source:nidcdAids,sections:[
      {heading:'Când sunt comode',paragraphs:['Modelele reîncărcabile elimină schimbarea frecventă a bateriilor mici. Pot fi mai ușor de folosit pentru persoanele cu dexteritate redusă, dacă stația de încărcare este simplu de manevrat. Autonomia depinde de model și de funcțiile folosite.']},
      {heading:'Ce verificați înainte de alegere',paragraphs:['Întrebați cât durează o încărcare, ce se întâmplă în călătorii și care este procedura dacă încărcătorul sau acumulatorul necesită service. Comparați cu variantele pe baterii; alegerea depinde de rutina dumneavoastră, nu doar de tehnologie.']}
    ]},
    {slug:'bluetooth-aparate-auditive',title:'Cum funcționează Bluetooth la aparatele auditive?',description:'Conectarea aparatelor auditive la telefon: compatibilitate, apeluri, aplicații și limitele funcțiilor Bluetooth.',category:'Tehnologia aparatelor',next:'aids',source:nidcdAids,sections:[
      {heading:'Ce permite conexiunea',paragraphs:['Unele aparate pot transmite apeluri sau alte sunete de pe telefon și pot fi controlate dintr-o aplicație. Funcțiile diferă între modele; Bluetooth în descriere nu garantează automat apeluri hands-free sau compatibilitate cu orice telefon.']},
      {heading:'Verificați împreună dispozitivele',paragraphs:['Aduceți la consultație modelul telefonului și întrebați ce funcții sunt disponibile pentru combinația concretă. Cereți o demonstrație a conectării și explicații pentru reconectare, actualizări și consumul bateriei.']}
    ]},
    {slug:'intretinere-aparat-auditiv',title:'Cum se întreține corect un aparat auditiv?',description:'Curățarea zilnică, filtrele, umiditatea și semnele că aparatul auditiv are nevoie de verificare.',category:'Îngrijire și reglare',next:'contact',source:nidcdAids,sections:[
      {heading:'O rutină simplă',paragraphs:['Ștergeți aparatul conform instrucțiunilor modelului și verificați dacă orificiile sunt blocate de cerumen. Păstrați-l ferit de umezeală și căldură excesivă. Filtrele și domurile se schimbă numai cu variante compatibile.']},
      {heading:'Când cereți verificare',paragraphs:['Dacă sunetul slăbește, întrerupe sau aparatul nu pornește, verificați alimentarea și consumabilele indicate de producător. Nu introduceți obiecte ascuțite în aparat. Pentru curățare, accesorii sau service, contactați Volmer cu modelul exact al aparatului.']}
    ]},
    {slug:'importanta-reglajului',title:'De ce este important reglajul aparatului auditiv?',description:'Reglajul și adaptarea aparatului auditiv după audiogramă și experiențele din viața de zi cu zi.',category:'Îngrijire și reglare',next:'contact',source:nidcdAids,sections:[
      {heading:'Audiograma este punctul de plecare',paragraphs:['Aparatul se configurează în funcție de rezultatele evaluării și de nevoile de comunicare. Volumul mai mare nu înseamnă automat vorbire mai clară; confortul și sunetele cotidiene contează la fel de mult.']},
      {heading:'Adaptarea cere feedback',paragraphs:['Notați când vocea pare prea puternică, când zgomotul deranjează sau când nu înțelegeți la telefon. Aceste exemple ajută la ajustări. Pot fi necesare mai multe vizite pe măsură ce vă obișnuiți cu aparatul.']}
    ]},
    {slug:'ajutor-persoana-auz-slab',title:'Cum ajutați o persoană apropiată care începe să audă mai slab?',description:'Pași respectuoși pentru a sprijini un părinte sau bunic cu dificultăți de auz în Moldova.',category:'Familie și sprijin',next:'test',source:whoHearing,sections:[
      {heading:'Începeți cu situații concrete',paragraphs:['Spuneți calm ce ați observat: apeluri ratate, televizor prea tare sau conversații dificile la masă. Întrebați ce simte persoana, fără a decide în locul ei. Vorbiți clar, cu fața spre ea, și reduceți zgomotul din jur.']},
      {heading:'Ajutați fără presiune',paragraphs:['Oferiți-vă să programați împreună o verificare a auzului și să însoțiți persoana dacă dorește. Dacă locuiți peste hotare iar părinții sunt în Moldova, puteți discuta cu ei pașii unei vizite la Volmer în Chișinău; alegerea aparatului rămâne individuală.']}
    ]}
  ],
  ru: [
    {slug:'semne-auz-slab',title:'Как заметить, что слух начал снижаться?',description:'Повторные просьбы говорить громче, трудности с речью в шуме и другие поводы проверить слух.',category:'Слух и симптомы',next:'test',source:whoHearing,sections:[
      {heading:'Повседневные признаки',paragraphs:['Вы всё чаще переспрашиваете, повышаете громкость телевизора или с трудом следите за разговором нескольких людей? Это может быть признаком снижения слуха, даже если отдельные звуки слышны хорошо.','Запишите, где возникают трудности и касаются ли они одного или обоих ушей. Проверка слуха поможет выяснить, какие звуки стали менее различимыми.']},
      {heading:'Когда обратиться за помощью',paragraphs:['При постепенных изменениях запишитесь на оценку слуха. Если слух ухудшился внезапно, особенно на одно ухо, срочно обратитесь к врачу, не дожидаясь обычной записи.']}
    ]},
    {slug:'aud-vocea-nu-inteleg-cuvintele',title:'Почему слышу голос, но не разбираю все слова?',description:'Почему голос слышен, а речь неразборчива, и что может показать аудиограмма.',category:'Слух и симптомы',next:'test',source:whoHearing,sections:[
      {heading:'Громкость и разборчивость различаются',paragraphs:['Можно слышать голос и при этом пропускать согласные звуки, угадывая слова по смыслу. Это особенно заметно, если собеседник говорит тихо, издалека или отвернувшись. По одному признаку определить причину нельзя.']},
      {heading:'Что делать дальше',paragraphs:['Расскажите специалисту, в каких ситуациях трудно понимать речь. Аудиометрия измеряет пороги слышимости, а аудиограмма показывает результат для каждого уха. Попросите объяснить её и уточните, нужны ли дополнительные обследования.']}
    ]},
    {slug:'vorbirea-in-zgomot',title:'Почему речь сложнее понимать в шуме?',description:'Почему разговоры в кафе и компании становятся трудными и как действовать.',category:'Слух и симптомы',next:'test',source:whoHearing,sections:[
      {heading:'Фоновый шум скрывает детали речи',paragraphs:['В ресторане или за большим столом голоса накладываются друг на друга. Если часть звуков речи слышна слабее, отличать слова становится сложнее. Расстояние до говорящего и усталость тоже влияют на понимание.']},
      {heading:'Практические шаги',paragraphs:['Садитесь ближе к собеседнику и выбирайте более тихое место. Если трудности повторяются, проверьте слух и приведите примеры таких ситуаций. Слуховой аппарат при наличии показаний настраивают под реальные условия, но идеальная разборчивость в любом шуме не гарантирована.']}
    ]},
    {slug:'cand-faci-test-auditiv',title:'Когда стоит проверить слух?',description:'Поводы записаться на проверку слуха и симптомы, требующие срочной консультации врача.',category:'Проверка слуха',next:'test',source:nidcdSudden,sections:[
      {heading:'Не ждите выраженной потери слуха',paragraphs:['Проверка полезна, если вы часто переспрашиваете, увеличиваете громкость телевизора, избегаете разговоров в компании или близкие замечают перемены. Трудности по телефону и на работе тоже стоит обсудить.']},
      {heading:'Когда нужен врач без промедления',paragraphs:['Внезапное снижение слуха, особенно с одной стороны, требует срочной медицинской помощи. Как можно быстрее обратитесь к ЛОР-врачу: плановая бесплатная проверка не заменяет такую консультацию.']}
    ]},
    {slug:'cum-se-desfasoara-test-auditiv',title:'Как проходит проверка слуха?',description:'Беседа, аудиометрия, аудиограмма и объяснение результатов проверки слуха.',category:'Проверка слуха',next:'test',source:whoHearing,sections:[
      {heading:'От беседы к измерению',paragraphs:['Сначала вы рассказываете, что стало трудно слышать. При аудиометрии вы отмечаете звуки разной громкости и частоты. Результат заносят в аудиограмму отдельно для каждого уха.']},
      {heading:'Что означает результат',paragraphs:['Попросите объяснить, что показывает аудиограмма и какие выводы по ней сделать нельзя. В зависимости от результата специалист обсудит варианты помощи или порекомендует медицинское обследование. В Volmer можно записаться на бесплатную проверку слуха в Кишинёве.']}
    ]},
    {slug:'cum-alegi-aparat-auditiv',title:'Как выбрать подходящий слуховой аппарат?',description:'Выбор по аудиограмме, удобству, повседневным задачам и цене, а не только по размеру.',category:'Выбор аппарата',next:'aids',source:nidcdAids,sections:[
      {heading:'Начните с собственных потребностей',paragraphs:['Аудиограмма, строение уха и привычные разговоры помогают выбрать аппарат. Расскажите, как вы пользуетесь телефоном, бываете ли в шуме и удобно ли управлять маленьким устройством. У RIC, BTE и внутриушных моделей разные особенности.']},
      {heading:'Вопросы перед покупкой',paragraphs:['Уточните питание, подключение, настройку, уход, гарантию и стоимость предложенной конфигурации. Пробное использование помогает оценить комфорт. Наличие модели и окончательную цену уточняйте в Volmer.']}
    ]},
    {slug:'ric-bte-intraauricular',title:'RIC и BTE: в чём разница?',description:'Практическое сравнение RIC, заушных BTE и внутриушных слуховых аппаратов.',category:'Типы аппаратов',next:'aids',source:nidcdAids,sections:[
      {heading:'Как устроены разные формы',paragraphs:['У RIC корпус находится за ухом, а ресивер — в слуховом проходе. У BTE основные части расположены за ухом, звук поступает через трубку или вкладыш. Внутриушная модель размещается в ухе. Малый размер сам по себе не означает лучший результат.']},
      {heading:'Как сравнивать',paragraphs:['Имеют значение аудиограмма, форма слухового прохода, ушная сера, удобство управления и необходимая мощность. Спросите о чистке, замене расходных материалов и нужных функциях. Подходящую форму выбирают после оценки слуха.']}
    ]},
    {slug:'aparate-reincarcabile-avantaje',title:'Перезаряжаемые слуховые аппараты: плюсы и ограничения',description:'Когда удобна зарядка и что проверить перед выбором: автономность, зарядное устройство, поездки.',category:'Технологии аппаратов',next:'aids',source:nidcdAids,sections:[
      {heading:'Чем удобна зарядка',paragraphs:['Перезаряжаемые модели не требуют регулярной замены маленьких батареек. Это может быть удобно людям, которым трудно обращаться с мелкими деталями. Время работы зависит от модели и включённых функций.']},
      {heading:'Вопросы перед выбором',paragraphs:['Уточните, как долго аппарат работает после зарядки, как заряжать его в поездке и что делать при неисправности аккумулятора или зарядного устройства. Сравните этот вариант с аппаратом на сменных батарейках.']}
    ]},
    {slug:'bluetooth-aparate-auditive',title:'Как работает Bluetooth в слуховых аппаратах?',description:'Подключение к телефону, звонки, приложения и совместимость слуховых аппаратов.',category:'Технологии аппаратов',next:'aids',source:nidcdAids,sections:[
      {heading:'Какие возможности бывают',paragraphs:['Некоторые аппараты передают звук звонков или другого содержимого телефона и позволяют менять настройки через приложение. Наличие Bluetooth не означает, что любая модель поддерживает звонки без телефона в руках или совместима с каждым смартфоном.']},
      {heading:'Проверьте свою комбинацию устройств',paragraphs:['Назовите специалисту модель телефона и попросите показать доступные функции. Полезно узнать, как восстановить соединение, влияют ли обновления телефона на работу и как подключение расходует заряд.']}
    ]},
    {slug:'intretinere-aparat-auditiv',title:'Правильный уход за слуховым аппаратом',description:'Ежедневная чистка, защита от влаги, замена фильтров и признаки неисправности.',category:'Уход и настройка',next:'contact',source:nidcdAids,sections:[
      {heading:'Простая ежедневная привычка',paragraphs:['Протирайте аппарат по инструкции к вашей модели и следите, чтобы отверстия не забивались ушной серой. Берегите его от влаги и сильного нагрева. Используйте только совместимые фильтры и вкладыши.']},
      {heading:'Когда нужна помощь',paragraphs:['Если звук стал слабым, прерывается или аппарат не включается, проверьте питание и расходные детали, указанные производителем. Не чистите аппарат острыми предметами. Для проверки и обслуживания сообщите Volmer точную модель устройства.']}
    ]},
    {slug:'importanta-reglajului',title:'Почему важна точная настройка слухового аппарата?',description:'Настройка по аудиограмме и обратной связи о звуках в повседневной жизни.',category:'Уход и настройка',next:'contact',source:nidcdAids,sections:[
      {heading:'Аудиограмма — отправная точка',paragraphs:['Настройки подбирают с учётом проверки слуха и ваших задач общения. Повышение громкости не всегда улучшает разборчивость речи: важны также комфорт и восприятие обычных звуков.']},
      {heading:'Расскажите, что происходит дома',paragraphs:['Записывайте, когда голос звучит слишком громко, шум мешает или по телефону плохо слышно. Такие примеры помогают специалисту уточнить настройки. По мере привыкания к аппарату может понадобиться несколько визитов.']}
    ]},
    {slug:'ajutor-persoana-auz-slab',title:'Как помочь близкому человеку, который стал хуже слышать?',description:'Как поддержать родителей или пожилых родственников в Молдове без давления.',category:'Семья и поддержка',next:'test',source:whoHearing,sections:[
      {heading:'Говорите о конкретных ситуациях',paragraphs:['Спокойно расскажите, что заметили: пропущенные звонки, слишком громкий телевизор или трудности за общим столом. Спросите, как человек сам воспринимает ситуацию. Говорите лицом к нему и уменьшайте фоновый шум.']},
      {heading:'Предложите помощь с проверкой',paragraphs:['Можно вместе записаться на проверку слуха и при желании прийти на неё вдвоём. Если вы живёте за границей, обсудите с родителями в Молдове поездку в Volmer в Кишинёве. Решение о слуховом аппарате должно учитывать желания и результаты оценки самого человека.']}
    ]}
  ]
};
