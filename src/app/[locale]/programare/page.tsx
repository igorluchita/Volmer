import {setRequestLocale} from 'next-intl/server';
import {Clock, MapPin, Phone} from 'lucide-react';
import {siteConfig} from '@/config/site';
import {BusinessHours} from '@/components/business-hours';
import {pageMetadata} from '@/lib/metadata';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}){return pageMetadata((await params).locale,'programare')}

export default async function AppointmentByPhone({params}:{params:Promise<{locale:string}>}) {
  const {locale:active}=await params; setRequestLocale(active); const locale=active==='ru'?'ru':'ro';
  const ru = locale === 'ru';
  return <section className="container page phone-appointment">
    <p className="rune">•••• VOLMER</p>
    <h1>{ru ? 'Запишитесь на консультацию по телефону' : 'Programează o consultație prin telefon'}</h1>
    <p className="lead">{ru ? 'Позвоните нам в рабочее время. Команда Volmer согласует удобный день и время и подтвердит запись по телефону.' : 'Sună-ne în timpul programului de lucru. Echipa Volmer va stabili împreună cu tine ziua și ora și va confirma programarea telefonic.'}</p>
    <div className="contact-panel"><div><a href={`tel:${siteConfig.phoneInternational}`}><Phone/>{siteConfig.phoneDisplay}</a><div><Clock/><BusinessHours/></div><p><MapPin/>{siteConfig.city}, {siteConfig.address}</p></div></div>
    <div className="actions"><a className="button stone" href={`tel:${siteConfig.phoneInternational}`}><Phone/>{ru ? 'Позвонить сейчас' : 'Sună acum'}</a><a className="button ghost" href={siteConfig.googleMapsDirectionsUrl} target="_blank" rel="noreferrer"><MapPin/>{ru ? 'Посмотреть расположение' : 'Vezi locația'}</a></div>
  </section>;
}
