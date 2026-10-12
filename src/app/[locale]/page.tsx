import { setRequestLocale } from "next-intl/server";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeSections, HomeTrustRibbon } from "@/components/home/HomeSections";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="hp-page">
      <HomeTrustRibbon />
      <HomeHero />
      <HomeSections />
    </div>
  );
}
