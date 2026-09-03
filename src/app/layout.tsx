import type {Metadata} from 'next';
import './globals.css';
import './home-hero.css';
import './hearing-aids-page.css';
import {siteConfig} from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.brandName,
  icons: {icon: siteConfig.logoPath}
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return <html><body>{children}</body></html>;
}
