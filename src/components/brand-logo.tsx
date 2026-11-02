import Image from 'next/image';
import NextLink from 'next/link';
import {site} from '@/config/site';
import type {Locale} from '@/content/seo';

export function BrandLogo({footer=false, locale}:{footer?:boolean; locale:Locale}){return <NextLink className={`brand-logo${footer?' footer-logo':''}`} href={`/${locale}/`} aria-label={site.brandName}><Image src={footer?'/logo-volmer-clean.png':site.logoPath} alt="Volmer" width={1370} height={358} sizes={footer?'256px':'270px'}/></NextLink>}
