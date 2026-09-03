import type {Metadata} from 'next';
import Image from 'next/image';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {BatteryCharging, Bluetooth, BrainCircuit, Ear, Gauge, MessageCircle, Phone, RefreshCw, Settings2, ShieldCheck, Smartphone, Sparkles, Volume2} from 'lucide-react';
import {Link} from '@/i18n/navigation';
import {siteConfig} from '@/config/site';
import {hearingAidBenefits, hearingAidCategories, hearingAidFaq, personalizationCriteria, selectionSteps, unitronPlatforms} from '@/content/hearing-aids';

type TextItem={title:string;description:string;benefits?:string[]};
type Copy={hero:{eyebrow:string;title:string;description:string;secondary:string;primaryCta:string;secondaryCta:string;imageAlt:string};unitron:{title:string;text1:string;text2:string;points:string[];flow:string[]};platforms:{title:string;intro:string;note:string;items:Record<string,TextItem>};styles:{title:string;intro:string;note:string;items:Record<string,TextItem>};technology:{title:string;intro:string;items:Record<string,TextItem>};connectivity:{title:string;description:string;flow:string[];note:string};personalization:{title:string;text:string;highlight:string;items:Record<string,string>};selection:{title:string;items:Record<string,TextItem>};sonova:{title:string;text:string};faq:{title:string;items:Record<string,{question:string;answer:string}>};finalCta:{title:string;text:string;primary:string;secondary:string}};
const benefitIcons={conversations:MessageCircle,automatic:BrainCircuit,noise:Volume2,bluetooth:Bluetooth,rechargeable:BatteryCharging,app:Smartphone};
const categoryIcons={ric:Ear,bte:ShieldCheck,ite:Settings2};

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;const t=await getTranslations({locale,namespace:'HearingAidsPage'});return {title:t('metaTitle'),description:t('metaDescription'),alternates:{canonical:`/${locale}/aparate-auditive/`,languages:{'ro-MD':'/ro/aparate-auditive/','ru-MD':'/ru/aparate-auditive/'}}};}

export default async function HearingAidsPage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;setRequestLocale(locale);const t=await getTranslations('HearingAidsPage');const c=t.raw('content') as Copy;return <>
  <section className="unitron-hero"><div className="unitron-container unitron-hero-grid"><div><p className="unitron-eyebrow"><Sparkles size={16}/>{c.hero.eyebrow}</p><h1>{c.hero.title}</h1><p className="unitron-lead">{c.hero.description}</p><p>{c.hero.secondary}</p><div className="unitron-actions"><a className="unitron-primary" href={`tel:${siteConfig.phoneInternational}`}><Phone size={19}/>{c.hero.primaryCta}</a><a className="unitron-secondary" href="#technology">{c.hero.secondaryCta}</a></div></div><div className="unitron-hero-image"><Image src="/images/hearing-aids/unitron-hero.webp" alt={c.hero.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 52vw"/></div></div></section>

  <section className="unitron-section unitron-container"><p className="unitron-index">•••• 01</p><div className="unitron-split"><div><h2>{c.unitron.title}</h2><p className="unitron-lead">{c.unitron.text1}</p><p>{c.unitron.text2}</p><ul className="unitron-checks">{c.unitron.points.map(point=><li key={point}><ShieldCheck/>{point}</li>)}</ul></div><div className="unitron-flow" aria-label={c.unitron.title}>{c.unitron.flow.map((item,index)=><div key={item}><strong>{item}</strong>{index<c.unitron.flow.length-1&&<span aria-hidden="true">↓</span>}</div>)}</div></div></section>

  <section className="unitron-soft unitron-section" id="technology"><div className="unitron-container"><p className="unitron-index">•••• 02</p><h2>{c.platforms.title}</h2><p className="unitron-lead">{c.platforms.intro}</p><div className="unitron-platforms">{unitronPlatforms.map((id,index)=><article key={id}><span>0{index+1}</span><h3>{c.platforms.items[id].title}</h3><p>{c.platforms.items[id].description}</p></article>)}</div><p className="unitron-note">{c.platforms.note}</p></div></section>

  <section className="unitron-section unitron-container"><p className="unitron-index">•••• 03</p><h2>{c.styles.title}</h2><p className="unitron-lead">{c.styles.intro}</p><div className="unitron-types">{hearingAidCategories.map(id=>{const Icon=categoryIcons[id];const item=c.styles.items[id];return <article key={id}><Icon/><h3>{item.title}</h3><p>{item.description}</p><ul>{item.benefits?.map(value=><li key={value}>{value}</li>)}</ul></article>})}</div><p className="unitron-highlight">{c.styles.note}</p></section>

  <section className="unitron-dark unitron-section"><div className="unitron-container"><p className="unitron-index">•••• 04</p><h2>{c.technology.title}</h2><p className="unitron-lead">{c.technology.intro}</p><div className="unitron-benefits">{hearingAidBenefits.map(id=>{const Icon=benefitIcons[id];const item=c.technology.items[id];return <article key={id}><Icon/><h3>{item.title}</h3><p>{item.description}</p></article>})}</div></div></section>

  <section className="unitron-section unitron-container"><div className="unitron-connect"><div><p className="unitron-index">•••• 05</p><h2>{c.connectivity.title}</h2><p className="unitron-lead">{c.connectivity.description}</p><p className="unitron-note">{c.connectivity.note}</p></div><div className="unitron-digital" aria-label={c.connectivity.title}>{c.connectivity.flow.map((item,index)=><div key={item}><span>{index===0?<Smartphone/>:index===1?<Ear/>:<Gauge/>}</span><b>{item}</b>{index<c.connectivity.flow.length-1&&<i aria-hidden="true">↔</i>}</div>)}</div></div></section>

  <section className="unitron-soft unitron-section"><div className="unitron-container unitron-split"><div><p className="unitron-index">•••• 06</p><h2>{c.personalization.title}</h2><p className="unitron-lead">{c.personalization.text}</p><p className="unitron-highlight">{c.personalization.highlight}</p></div><div className="unitron-criteria">{personalizationCriteria.map((id,index)=><article key={id}><b>0{index+1}</b><p>{c.personalization.items[id]}</p></article>)}</div></div></section>

  <section className="unitron-section unitron-container"><p className="unitron-index">•••• 07</p><h2>{c.selection.title}</h2><div className="unitron-steps">{selectionSteps.map((id,index)=>{const item=c.selection.items[id];return <article key={id}><span>{index+1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>})}</div></section>

  <section className="unitron-sonova"><div className="unitron-container"><RefreshCw/><div><h2>{c.sonova.title}</h2><p>{c.sonova.text}</p></div></div></section>

  <section className="unitron-section unitron-container"><p className="unitron-index">•••• 08</p><h2>{c.faq.title}</h2><div className="unitron-faq">{hearingAidFaq.map(id=><details key={id}><summary>{c.faq.items[id].question}</summary><p>{c.faq.items[id].answer}</p></details>)}</div></section>

  <section className="unitron-final unitron-container"><div><h2>{c.finalCta.title}</h2><p>{c.finalCta.text}</p></div><div className="unitron-actions"><a className="unitron-primary" href={`tel:${siteConfig.phoneInternational}`}><Phone size={19}/>{c.finalCta.primary}</a><Link className="unitron-secondary" href="/contact">{c.finalCta.secondary}</Link></div></section>
  </>}
