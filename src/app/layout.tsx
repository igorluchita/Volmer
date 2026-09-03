import type { Metadata } from "next";
import "./globals.css";
import "./home-hero.css";
import "./hearing-aids-page.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.brandName,
  icons: {
    icon: [
      { url: siteConfig.faviconPath, type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: siteConfig.faviconPath, type: "image/png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
