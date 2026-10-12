export type QuickContactLinksConfig = {
  phone: string;
  whatsapp: string;
  viber: string;
  telegramUsername: string;
  telegram: string;
};

export function createQuickContactLinks(phoneInternational: string, configuredUsername = ''): QuickContactLinksConfig {
  const digits = phoneInternational.replace(/\D/g, '');
  const candidate = configuredUsername.trim().replace(/^@/, '');
  const telegramUsername = /^[A-Za-z0-9_]{5,32}$/.test(candidate) ? candidate : '';
  return {
    phone: `tel:${phoneInternational}`,
    whatsapp: `https://wa.me/${digits}`,
    viber: `viber://chat?number=%2B${digits}`,
    telegramUsername,
    telegram: telegramUsername ? `https://t.me/${telegramUsername}` : `https://t.me/+${digits}`
  };
}

export function configuredContactChannels<T extends {href: string}>(channels: T[]): T[] {
  return channels.filter((channel) => channel.href.trim().length > 0);
}
