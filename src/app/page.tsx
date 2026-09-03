import Link from 'next/link';

export default function RootPage() {
  return <>
    <meta httpEquiv="refresh" content="0;url=/ro/"/>
    <script dangerouslySetInnerHTML={{__html: "window.location.replace('/ro/')"}}/>
    <main className="root-redirect" aria-live="polite">
      <p>Se deschide pagina Volmer…</p>
      <Link href="/ro/">Continuă către pagina principală</Link>
    </main>
  </>;
}
