import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {verifiedDocuments, verifiedTeam} from '@/content/verified-assets';

export async function VerifiedTrust({showTeam = false}: {showTeam?: boolean}) {
  if (!verifiedDocuments.length && (!showTeam || !verifiedTeam.length)) return null;
  const t = await getTranslations('EditorialUI');
  return <div className="verified-trust container">
    {verifiedDocuments.length > 0 && <section><h2>{t('documents')}</h2><div className="verified-trust-grid">{verifiedDocuments.map((document) => <figure key={document.imageSrc}>
      <Image src={document.imageSrc} alt={document.alt} width={720} height={960} sizes="(max-width: 760px) 100vw, 33vw" />
      <figcaption>{document.title}</figcaption>
    </figure>)}</div></section>}
    {showTeam && verifiedTeam.length > 0 && <section><h2>{t('team')}</h2><div className="verified-trust-grid">{verifiedTeam.map((member) => <article key={member.name}>
      <Image src={member.imageSrc} alt={member.name} width={640} height={720} sizes="(max-width: 760px) 100vw, 33vw" />
      <h3>{member.name}</h3><p>{member.role}</p><p>{member.qualifications}</p><p>{member.bio}</p>
    </article>)}</div></section>}
  </div>;
}
