import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Ear, MapPin, MessageCircle, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-glow" aria-hidden="true" />
      <section className="not-found-card">
        <Link
          href="/ro/"
          className="not-found-logo"
          aria-label="Volmer — pagina principală"
        >
          <Image
            src={siteConfig.logoPath}
            alt="Volmer"
            width={1370}
            height={358}
            priority
          />
        </Link>
        <p className="not-found-code">EROARE 404</p>
        <h1>Pagina nu a fost găsită</h1>
        <p className="not-found-lead">
          Adresa poate fi incorectă sau pagina a fost mutată. Poți reveni la
          pagina principală ori ne poți contacta telefonic.
        </p>
        <p className="not-found-ru" lang="ru">
          <strong>Страница не найдена.</strong> Вернитесь на главную страницу
          или позвоните команде Volmer.
        </p>
        <div className="not-found-actions">
          <Link className="button stone" href="/ro/">
            <ArrowLeft size={19} />
            Pagina principală
          </Link>
          <Link className="button ghost" href="/ro/aparate-auditive/">
            <Ear size={19} />
            Aparate auditive
          </Link>
          <Link className="button ghost" href="/ro/contact/">
            <MessageCircle size={19} />
            Contact
          </Link>
          <Link className="button ghost" href="/ru/">
            Русская версия
          </Link>
        </div>
        <div className="not-found-contact">
          <a href={`tel:${siteConfig.phoneInternational}`}>
            <Phone size={17} />
            {siteConfig.phoneDisplay}
          </a>
          <span>
            <MapPin size={17} />
            {siteConfig.address}, {siteConfig.city}
          </span>
        </div>
      </section>
    </main>
  );
}
