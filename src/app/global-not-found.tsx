import type {Metadata} from 'next';
import './globals.css';
import NotFound from './(root)/not-found';

export const metadata: Metadata = {
  title: 'Pagina nu a fost găsită | Volmer',
  description: 'Adresa accesată nu a fost găsită. Reveniți la Volmer sau contactați echipa din Chișinău.',
};

export default function GlobalNotFound() {
  return <html lang="ro"><body><NotFound /></body></html>;
}
