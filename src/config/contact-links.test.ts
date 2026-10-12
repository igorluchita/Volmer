import {describe, expect, it} from 'vitest';
import {configuredContactChannels, createQuickContactLinks} from './contact-links';

describe('configured direct contact links', () => {
  it('centralizes required phone, WhatsApp, and Viber destinations', () => {
    expect(createQuickContactLinks('+37379331839')).toEqual({
      phone: 'tel:+37379331839',
      whatsapp: 'https://wa.me/37379331839',
      viber: 'viber://chat?number=%2B37379331839',
      telegramUsername: '',
      telegram: 'https://t.me/+37379331839'
    });
  });

  it('uses the business phone for Telegram until a valid username is configured', () => {
    const links = createQuickContactLinks('+37379331839');
    const channels = configuredContactChannels([{name: 'WhatsApp', href: links.whatsapp}, {name: 'Telegram', href: links.telegram}]);
    expect(channels.map((channel) => channel.name)).toEqual(['WhatsApp', 'Telegram']);
    expect(links.telegram).toBe('https://t.me/+37379331839');
    expect(createQuickContactLinks('+37379331839', '@volmer_help').telegram).toBe('https://t.me/volmer_help');
    expect(createQuickContactLinks('+37379331839', '+37379331839').telegram).toBe('https://t.me/+37379331839');
  });
});
