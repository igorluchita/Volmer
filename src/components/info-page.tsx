import {siteConfig} from '@/config/site';
import {Check, Clock, Mail, MapPin, Phone, ShieldCheck} from 'lucide-react';
import {BusinessHours} from './business-hours';

type Kind = 'about' | 'faq' | 'contact';
const copy = {
  ro: {
    about: ['Despre Volmer', 'Conversații clare. Soluții alese cu răbdare.', 'Volmer este un spațiu pentru explicații simple, respectuoase și alegeri individuale.'],
    faq: ['Întrebări frecvente', 'Răspunsuri clare înainte de prima vizită', 'Am adunat întrebările care apar cel mai des despre auz, aparate și suport.'],
    contact: ['Contactează Volmer', 'Suntem aici pentru întrebările tale', 'Pentru programări și informații despre aparate auditive, contactează echipa Volmer prin telefon.']
  },
  ru: {
    about: ['О Volmer', 'Ясные разговоры. Решения без спешки.', 'Volmer — пространство для простых объяснений, уважительного отношения и индивидуального выбора.'],
    faq: ['Частые вопросы', 'Понятные ответы до первого визита', 'Мы собрали частые вопросы о слухе, аппаратах и поддержке.'],
    contact: ['Свяжитесь с Volmer', 'Мы здесь для ваших вопросов', 'Для записи и получения информации о слуховых аппаратах позвоните команде Volmer.']
  }
} as const;

export function InfoPage({kind, locale}: {kind: Kind; locale: 'ro' | 'ru'}) {
  const [eyebrow, title, description] = copy[locale][kind];
  const generic = locale === 'ru' ? ['Индивидуальный разговор', 'Понятные объяснения', 'Поддержка без спешки'] : ['Discuție individuală', 'Explicații clare', 'Suport fără grabă'];
  return <>
    <section className="info-hero"><div className="container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{description}</p><div className="actions"><a className="button stone" href={`tel:${siteConfig.phoneInternational}`}><Phone/>{locale === 'ro' ? 'Sună acum' : 'Позвонить сейчас'}</a><a className="button ghost" href="#details">{locale === 'ro' ? 'Află mai multe' : 'Подробнее'}</a></div></div></section>
    <section className="container info-sections" id="details"><div className="info-grid">{generic.map(item => <article key={item}><Check/><h2>{item}</h2><p>{locale === 'ro' ? 'Fiecare vizită începe cu o discuție atentă și pași explicați clar.' : 'Каждый визит начинается с внимательного разговора и понятных следующих шагов.'}</p></article>)}</div>
      {kind === 'faq' && <section className="blue-panel"><h2>{locale === 'ro' ? 'Cum fac o programare?' : 'Как записаться?'}</h2><p>{locale === 'ro' ? 'Sună echipa Volmer în timpul programului de lucru. Stabilim împreună ziua și ora, iar programarea este confirmată telefonic.' : 'Позвоните команде Volmer в рабочее время. Мы вместе выберем день и время и подтвердим запись по телефону.'}</p></section>}
      <section className="info-grid">{['Confort', 'Claritate', 'Adaptare'].map(item => <article key={item}><ShieldCheck/><h2>{item}</h2><p>{locale === 'ro' ? 'Informațiile sunt orientative și se discută individual.' : 'Информация носит ориентировочный характер и обсуждается индивидуально.'}</p></article>)}</section>
      {kind === 'contact' && <><section className="contact-panel"><h2>{locale === 'ro' ? 'Contactează-ne direct' : 'Свяжитесь с нами напрямую'}</h2><div className="contact-cards"><article><Phone/><small>{locale === 'ro' ? 'Telefon' : 'Телефон'}</small><a href={`tel:${siteConfig.phoneInternational}`}>{siteConfig.phoneDisplay}</a></article><article><Mail/><small>Email</small><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></article><article><MapPin/><small>{locale === 'ro' ? 'Adresă' : 'Адрес'}</small><p>{siteConfig.address}, {siteConfig.city}</p></article><article className="hours-card"><Clock/><small>{locale === 'ro' ? 'Program' : 'График работы'}</small><BusinessHours/></article></div><div className="actions"><a className="button stone" href={`tel:${siteConfig.phoneInternational}`}>{locale === 'ro' ? 'Sună acum' : 'Позвонить сейчас'}</a><a className="button ghost" href={`mailto:${siteConfig.email}`}>{locale === 'ro' ? 'Trimite email' : 'Отправить email'}</a><a className="button ghost" href={siteConfig.googleMapsDirectionsUrl} target="_blank" rel="noreferrer">{locale === 'ro' ? 'Deschide în Google Maps' : 'Открыть в Google Maps'}</a></div></section>{siteConfig.googleMapsEmbedUrl && <iframe className="map" src={siteConfig.googleMapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={locale === 'ro' ? 'Locația Volmer' : 'Расположение Volmer'}/>}</>}
    </section>
    <section className="container final"><div><h2>{locale === 'ro' ? 'Programările sunt confirmate telefonic.' : 'Запись подтверждается по телефону.'}</h2></div><a className="button stone" href={`tel:${siteConfig.phoneInternational}`}>{locale === 'ro' ? 'Sună acum' : 'Позвонить сейчас'}</a></section>
  </>;
}
