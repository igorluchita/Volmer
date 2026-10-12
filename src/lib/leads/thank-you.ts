import type {Metadata} from 'next';

export function leadThankYouMetadata(locale: 'ro' | 'ru'): Metadata {
  const title = locale === 'ro' ? 'Mulțumim pentru solicitare | Volmer' : 'Спасибо за обращение | Volmer';
  const description = locale === 'ro'
    ? 'Confirmarea primirii solicitării către echipa Volmer.'
    : 'Подтверждение получения вашей заявки командой Volmer.';
  return {
    title,
    description,
    robots: {index: false, follow: true},
    alternates: {canonical: `/${locale}/multumim/`},
    openGraph: {title, description, url: `/${locale}/multumim/`, type: 'website'}
  };
}
