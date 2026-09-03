import {setRequestLocale} from 'next-intl/server';
import {InfoPage} from '@/components/info-page';
import {pageMetadata} from '@/lib/metadata';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){return pageMetadata((await params).locale,'contact')}
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale:active}=await params;setRequestLocale(active);const locale=active==='ru'?'ru':'ro';return <InfoPage kind="contact" locale={locale}/>}
