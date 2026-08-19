import settings from '../../content/settings.json';

/**
 * Brand and contact details are editable from the CMS (/admin/ → Site Settings),
 * so they live in content/settings.json. The URL, keywords and nav are structural
 * and stay in code.
 */
export const site = {
  ...settings,
  url: 'https://dialoghive.com',
  keywords: [
    'AI chatbot',
    'WhatsApp chatbot',
    'Instagram DM automation',
    'Facebook Messenger bot',
    'website chat widget',
    'chatbot agency',
    'customer support automation',
    'lead generation chatbot',
  ],
};

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/services/', label: 'Services' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contact/', label: 'Contact' },
];
