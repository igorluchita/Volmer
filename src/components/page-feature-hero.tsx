import Image from 'next/image';
import {ArrowDown, ArrowRight, CalendarDays, Headphones, Sparkles} from 'lucide-react';

type PageFeatureHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  benefits: string[];
  image: string;
  imageAlt: string;
  imageBadge: string;
  cardEyebrow: string;
  cardTitle: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  primaryIcon?: 'calendar' | 'down';
};

export function PageFeatureHero(props: PageFeatureHeroProps) {
  return (
    <section className="hp-hero hp-container page-feature-hero" aria-labelledby="page-feature-title">
      <div className="hp-hero-grid">
        <div className="hp-hero-copy">
          <p className="hp-hero-eyebrow"><Sparkles size={17} aria-hidden="true" />{props.eyebrow}</p>
          <h1 id="page-feature-title">{props.title}</h1>
          <p className="hp-hero-subheadline">{props.lead}</p>
          <ul className="hp-hero-benefits" aria-label={props.eyebrow}>
            {props.benefits.map((benefit) => <li key={benefit}><span aria-hidden="true" />{benefit}</li>)}
          </ul>
          <div className="hp-hero-actions">
            <a className="hp-button hp-button-primary" href={props.primaryHref}>{props.primaryIcon === 'down' ? <ArrowDown size={19} aria-hidden="true" /> : <CalendarDays size={19} aria-hidden="true" />}{props.primaryLabel}</a>
            <a className="hp-button hp-button-secondary" href={props.secondaryHref}>{props.secondaryLabel}<ArrowRight size={17} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="hp-hero-media page-feature-hero-media">
          <Image src={props.image} alt={props.imageAlt} fill priority sizes="(max-width: 860px) calc(100vw - 48px), (max-width: 1200px) 43vw, 540px" />
          <span className="hp-hero-image-badge">{props.imageBadge}</span>
          <div className="hp-hero-floating-card">
            <span className="hp-hero-floating-icon" aria-hidden="true"><Headphones size={22} /></span>
            <span><b>{props.cardEyebrow}</b><strong>{props.cardTitle}</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}
