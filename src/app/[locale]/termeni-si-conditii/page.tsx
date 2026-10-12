import {LegalPage, legalMetadata} from '@/components/legal-page';
export const dynamicParams = false;
export const generateStaticParams = () => [{locale: 'ro'}, {locale: 'ru'}];
export async function generateMetadata({params}: {params: Promise<{locale: 'ro' | 'ru'}>}) { return legalMetadata((await params).locale, 'terms'); }
export default async function Page({params}: {params: Promise<{locale: 'ro' | 'ru'}>}) { return <LegalPage locale={(await params).locale} type="terms" />; }
