export type CatalogLocale = "ro" | "ru";
export type LocalText = { ro: string; ru: string };
export const technologyLevels = [
  {level:"9", environments:"8", ro:"Premium", ru:"Премиум"}, {level:"7", environments:"6", ro:"Avansat", ru:"Продвинутый"},
  {level:"5", environments:"4", ro:"Standard", ru:"Стандарт"}, {level:"3", environments:"2", ro:"Esențial", ru:"Базовый"},
  {level:"1", environments:"AutoMic", ro:"Esențial de bază", ru:"Начальный"},
] as const;
export const shellColors = [
  {code:"P2",ro:"Chihlimbar",ru:"Янтарь",color:"#8f684e"},{code:"P4",ro:"Mahon magic",ru:"Магический махагон",color:"#51423d"},
  {code:"P6",ro:"Platină regală",ru:"Роскошная платина",color:"#c8c8c4"},{code:"P7",ro:"Praf de stele",ru:"Звёздная пыль",color:"#7e807f"},
  {code:"P8",ro:"Lavă aprinsă",ru:"Пылающая лава",color:"#484747"},{code:"R8",ro:"Nisip",ru:"Песок",color:"#a99a8d"},
] as const;
export const inEarColors = [
  {code:"26",ro:"Bej",ru:"Бежевый",color:"#ddc89b"},{code:"14",ro:"Tan",ru:"Тан",color:"#c29a64"},{code:"22",ro:"Maro deschis",ru:"Светло-коричневый",color:"#ad7544"},
  {code:"28",ro:"Maro",ru:"Коричневый",color:"#795137"},{code:"06",ro:"Negru",ru:"Чёрный",color:"#232323"},
] as const;
type Model={name:string;form:"RIC"|"BTE"|"ITE";power:LocalText;levels?:readonly string[];colors:readonly string[];note?:LocalText};
export type CatalogFamily={id:string;name:string;platform:LocalText;summary:LocalText;image:string;imageAlt:LocalText;models:readonly Model[]};
const levels=["9","7","5","3","1"] as const, noOne=["9","7","5","3"] as const;
const colors=["P2","P4","P6","P7","P8","R8"] as const, reduced=["P6","P7","P8","R8"] as const, inEar=["26","14","22","28","06"] as const;
const p=(ro:string,ru:string):LocalText=>({ro,ru});
export const hearingAidFamilies:readonly CatalogFamily[]=[
 {id:"smile",name:"Smile",image:"/images/hearing-aids/catalog/moxi-smile.jpg",imageAlt:p("Aparat auditiv RIC Moxi S-R","Слуховой аппарат RIC Moxi S-R"),platform:p("Platforma actuală Unitron","Актуальная платформа Unitron"),summary:p("Modele RIC și intraauriculare, cu niveluri tehnologice pentru medii de ascultare diferite.","Модели RIC и внутриушные аппараты для разных ситуаций прослушивания."),models:[
  {name:"Moxi S-R",form:"RIC",power:p("Acumulator Li-ion","Литий-ионный аккумулятор"),levels,colors,note:p("Conectare directă; Charger RIC S sau ChargerGo RIC S.","Прямое подключение; Charger RIC S или ChargerGo RIC S.")},
  {name:"Insera S-R",form:"ITE",power:p("Acumulator Li-ion","Литий-ионный аккумулятор"),levels:noOne,colors:inEar,note:p("Conectivitate universală; nivelul 1 nu este disponibil.","Универсальное подключение; уровень 1 недоступен.")},
  {name:"Insera S-10 NW O",form:"ITE",power:p("Baterie 10","Батарейка 10"),levels,colors:inEar,note:p("Fără wireless; bobină T opțională.","Без беспроводной связи; телекатушка опционально.")}]},
 {id:"vivante",name:"Vivante",image:"/images/hearing-aids/catalog/moxi-vivante.jpg",imageAlt:p("Aparat auditiv RIC Moxi Vivante","Слуховой аппарат RIC Moxi Vivante"),platform:p("Gamă RIC și BTE","Линейка RIC и BTE"),summary:p("Trei variante Moxi și patru variante Stride.","Три варианта Moxi и четыре варианта Stride."),models:[
  {name:"Moxi V-R",form:"RIC",power:p("Acumulator Li-ion","Литий-ионный аккумулятор"),levels,colors},{name:"Moxi V-RT",form:"RIC",power:p("Acumulator Li-ion + bobină T","Литий-ионный аккумулятор + телекатушка"),levels,colors},{name:"Moxi V-312",form:"RIC",power:p("Baterie 312","Батарейка 312"),levels,colors},
  {name:"Stride V-M",form:"BTE",power:p("Baterie 312 + bobină T","Батарейка 312 + телекатушка"),levels,colors},{name:"Stride V-PR",form:"BTE",power:p("Acumulator Li-ion","Литий-ионный аккумулятор"),levels,colors},{name:"Stride V-SP",form:"BTE",power:p("Baterie 13 + bobină T","Батарейка 13 + телекатушка"),levels,colors},{name:"Stride V-UP",form:"BTE",power:p("Baterie 675 + bobină T","Батарейка 675 + телекатушка"),levels,colors}]},
 {id:"blu",name:"Blu",image:"/images/hearing-aids/catalog/moxi-blu.jpg",imageAlt:p("Aparat auditiv RIC Moxi Blu","Слуховой аппарат RIC Moxi Blu"),platform:p("Gamă disponibilă în portofoliu","Линейка в актуальном портфолио"),summary:p("Modele RIC, retroauriculare și intraauriculare.","Модели RIC, заушные и внутриушные."),models:[
  {name:"Moxi B-312",form:"RIC",power:p("Baterie 312","Батарейка 312"),levels,colors},{name:"Moxi B-R",form:"RIC",power:p("Acumulator Li-ion","Литий-ионный аккумулятор"),levels,colors},{name:"Moxi B-RT",form:"RIC",power:p("Acumulator Li-ion + bobină T","Литий-ионный аккумулятор + телекатушка"),levels,colors},
  {name:"Stride B-PR",form:"BTE",power:p("Acumulator Li-ion","Литий-ионный аккумулятор"),levels,colors},{name:"Stride B-UP",form:"BTE",power:p("Baterie 675","Батарейка 675"),levels,colors},
  {name:"Insera B-312",form:"ITE",power:p("Baterie 312","Батарейка 312"),levels,colors:inEar},{name:"Insera B-312 NW O",form:"ITE",power:p("Baterie 312; fără wireless","Батарейка 312; без беспроводной связи"),levels,colors:inEar},{name:"Insera B-10 NW O",form:"ITE",power:p("Baterie 10; fără wireless","Батарейка 10; без беспроводной связи"),levels,colors:inEar}]},
 {id:"ativo",name:"Ativo",image:"/images/hearing-aids/catalog/ativo-family-premium.png",imageAlt:p("Familia de aparate auditive Ativo","Семейство слуховых аппаратов Ativo"),platform:p("Aparate de bază","Базовые слуховые аппараты"),summary:p("Patru forme cu baterie clasică.","Четыре форм-фактора на обычных батарейках."),models:[
  {name:"Ativo RIC",form:"RIC",power:p("Baterie clasică","Обычная батарейка"),colors:reduced},{name:"Ativo M",form:"BTE",power:p("Baterie clasică","Обычная батарейка"),colors:reduced},{name:"Ativo SP",form:"BTE",power:p("Baterie clasică","Обычная батарейка"),colors:reduced},{name:"Ativo UP",form:"BTE",power:p("Baterie clasică","Обычная батарейка"),colors:reduced}]},
 {id:"scala",name:"SCALA",image:"/images/hearing-aids/catalog/scala-s.jpg",imageAlt:p("Aparat auditiv SCALA","Слуховой аппарат SCALA"),platform:p("Gama SCALA S, V și A","Линейка SCALA S, V и A"),summary:p("Soluții RIC, BTE și intraauriculare; SCALA A este gama de bază cu baterii clasice.","Решения RIC, BTE и внутриушные; SCALA A — базовая линейка на обычных батарейках."),models:[
  {name:"SCALA S-R",form:"RIC",power:p("Acumulator Li-ion","Литий-ионный аккумулятор"),levels,colors:["P4","P6","P7","R8"]},{name:"SCALA S-Dir R",form:"ITE",power:p("Acumulator Li-ion","Литий-ионный аккумулятор"),levels:noOne,colors:inEar},{name:"SCALA S-10 NW O",form:"ITE",power:p("Baterie 10","Батарейка 10"),levels,colors:inEar},
  {name:"SCALA V-312",form:"RIC",power:p("Baterie 312","Батарейка 312"),levels,colors:["P4","P6","P7","R8"]},{name:"SCALA V-M",form:"BTE",power:p("Baterie 312 + bobină T","Батарейка 312 + телекатушка"),levels,colors:["P4","P6","P7","R8"]},{name:"SCALA V-PR",form:"BTE",power:p("Acumulator Li-ion","Литий-ионный аккумулятор"),levels,colors:["P4","P6","P7","R8"]},{name:"SCALA V-SP",form:"BTE",power:p("Baterie 13 + bobină T","Батарейка 13 + телекатушка"),levels,colors:["P4","P6","P7","R8"]},
  {name:"SCALA A RIC",form:"RIC",power:p("Baterie 312","Батарейка 312"),colors:["P6","P7","R8"]},{name:"SCALA A M",form:"BTE",power:p("Baterie 312","Батарейка 312"),colors:["P6","P7","R8"]},{name:"SCALA A SP",form:"BTE",power:p("Baterie 13","Батарейка 13"),colors:["P6","P7","R8"]},{name:"SCALA A UP",form:"BTE",power:p("Baterie 675","Батарейка 675"),colors:["P6","P7","R8"]}]},
] as const;
export const priceClasses=[
 {name:p("Basic / Basic+","Basic / Basic+"),battery:"400–1.000 €",rechargeable:"900–1.100 €"},{name:p("Clasa medie","Средний класс"),battery:"1.150–1.400 €",rechargeable:"1.350–1.400 €"},
 {name:p("Confort","Комфорт"),battery:"1.300–1.400 €",rechargeable:"1.550–1.600 €"},{name:p("Premium","Премиум"),battery:"1.800 €",rechargeable:"1.900–2.100 €"},
] as const;
export const accessories=[
 {name:"TV Connector",image:"/images/hearing-aids/catalog/tv-connector.png",text:p("Transmite wireless sunetul televizorului în aparatele compatibile.","Передаёт звук телевизора по беспроводной связи в совместимые аппараты.")},
 {name:"PartnerMic",image:"/images/hearing-aids/catalog/partner-mic.png",text:p("Microfon cu clips pentru conversații la distanță sau în zgomot.","Клип-микрофон для разговоров на расстоянии или в шуме.")},
 {name:"Remote Control",image:"/images/hearing-aids/catalog/remote-control.png",text:p("Reglarea discretă a volumului și schimbarea programelor.","Незаметная регулировка громкости и переключение программ.")},
 {name:"Stații de încărcare",image:"/images/hearing-aids/catalog/charger.jpg",text:p("Încărcătoare dedicate; compatibilitatea se verifică pe model.","Специальные зарядные устройства; совместимость проверяется по модели.")},
] as const;
