import type {MetadataRoute} from 'next';
import {site} from '@/config/site';
export const dynamic = 'force-static';

export default function manifest():MetadataRoute.Manifest{return {name:site.brandName,short_name:site.brandName,description:'Aparate auditive și evaluarea auzului în Chișinău',start_url:'/',display:'standalone',background_color:'#ffffff',theme_color:'#29408e',icons:[{src:site.logoPath,type:'image/png'}]};}
