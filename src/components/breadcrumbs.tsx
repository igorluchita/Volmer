import {siteConfig} from '@/config/site';

export function Breadcrumbs({locale,label,path}:{locale:'ro'|'ru';label:string;path:string}){
  const home=locale==='ro'?'Acasă':'Главная';
  const data={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:home,item:`${siteConfig.siteUrl}/${locale}/`},{'@type':'ListItem',position:2,name:label,item:`${siteConfig.siteUrl}/${locale}/${path}/`} ]};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/><nav className="breadcrumb container" aria-label="Breadcrumb"><a href={`/${locale}/`}>{home}</a> / {label}</nav></>;
}
