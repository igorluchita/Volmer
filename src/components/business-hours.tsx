import {getTranslations} from 'next-intl/server';

import {siteConfig} from '@/config/site';

export async function BusinessHours({className = ''}: {className?: string}) {
  const t = await getTranslations('BusinessHours');
  return <dl className={`business-hours ${className}`.trim()}>
    {siteConfig.businessHours.map(item => <div key={item.id}>
      <dt>{t(item.daysKey)}</dt>
      <dd>{'hours' in item ? item.hours : t(item.hoursKey)}</dd>
    </div>)}
  </dl>;
}
