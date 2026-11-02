import Image from 'next/image';
import Link from 'next/link';
import {ArrowLeft, ArrowUpRight, Ear, MapPin, Phone} from 'lucide-react';

import {siteConfig} from '@/config/site';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-orb" aria-hidden="true" />
      <div className="not-found-shell">
        <Link href="/ro/" className="not-found-logo" aria-label="Volmer — pagina principală">
          <Image src={siteConfig.logoPath} alt="Volmer" width={1370} height={358} priority />
        </Link>

        <section className="not-found-layout" aria-labelledby="not-found-title">
          <div className="not-found-copy">
            <p className="not-found-eyebrow"><span /> EROARE 404</p>
            <h1 id="not-found-title">Pagina nu a fost găsită</h1>
            <p className="not-found-lead">
              Adresa poate fi incorectă sau pagina s-a mutat. Alegeți o pagină de mai jos
              sau contactați echipa Volmer.
            </p>

            <p className="not-found-ru" lang="ru">
              <strong>Страница не найдена.</strong> Перейдите на главную страницу или
              свяжитесь с командой Volmer.
            </p>

            <nav className="not-found-actions" aria-label="Pagini utile">
              <Link className="not-found-primary" href="/ro/">
                <ArrowLeft size={18} aria-hidden="true" />
                Pagina principală
              </Link>
              <Link className="not-found-secondary" href="/ro/aparate-auditive/">
                <Ear size={18} aria-hidden="true" />
                Aparate auditive
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <Link className="not-found-language" href="/ru/">Русская версия</Link>
            </nav>
          </div>

          <div className="not-found-visual">
            <Image
              src="/images/homepage/hero.webp"
              alt="O bunică și nepoata ei discută împreună."
              fill
              priority
              sizes="(max-width: 760px) 100vw, 48vw"
            />
            <div className="not-found-visual-note">
              <span className="not-found-note-icon"><Ear size={19} aria-hidden="true" /></span>
              <span><strong>Suntem aici să vă ajutăm.</strong><small>Volmer · Chișinău</small></span>
            </div>
          </div>
        </section>

        <div className="not-found-contact">
          <a href={`tel:${siteConfig.phoneInternational}`}>
            <Phone size={17} aria-hidden="true" />
            {siteConfig.phoneDisplay}
          </a>
          <span>
            <MapPin size={17} aria-hidden="true" />
            {siteConfig.address}, {siteConfig.city}
          </span>
        </div>
      </div>
    </main>
  );
}
