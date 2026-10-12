import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import {setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {leadThankYouMetadata} from '../../../lib/leads/thank-you';

type Locale = 'ro' | 'ru';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: candidate} = await params;
  if (!routing.locales.includes(candidate as Locale)) notFound();
  const locale = candidate as Locale;
  return leadThankYouMetadata(locale);
}

export default async function ThankYouPage({params}: {params: Promise<{locale: string}>}) {
  const {locale: candidate} = await params;
  if (!routing.locales.includes(candidate as Locale)) notFound();
  const locale = candidate as Locale;
  setRequestLocale(locale);
  return <div className="container lead-thank-you">
    <section className="lead-thank-you-card" aria-labelledby="thank-you-title">
      <span className="lead-thank-you-mark" aria-hidden="true">✓</span>
      <h1 id="thank-you-title">{locale === 'ro' ? 'Mulțumim pentru solicitare' : 'Спасибо за обращение'}</h1>
      <p>{locale === 'ro'
        ? 'Am primit solicitarea dumneavoastră. Echipa Volmer vă va contacta folosind metoda selectată.'
        : 'Мы получили вашу заявку. Команда Volmer свяжется с вами выбранным способом.'}</p>
      <Link className="editorial-primary" href="/">{locale === 'ro' ? 'Înapoi la pagina principală' : 'Вернуться на главную'}</Link>
    </section>
  </div>;
}
