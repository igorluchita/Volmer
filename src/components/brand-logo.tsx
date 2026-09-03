import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import {site} from '@/config/site';

export function BrandLogo({footer=false}:{footer?:boolean}){return <Link className={`brand-logo${footer?' footer-logo':''}`} href="/" aria-label={site.brandName}><Image src={site.logoPath} alt="Volmer" width={180} height={52} sizes={footer?'130px':'180px'} priority={!footer}/></Link>}
