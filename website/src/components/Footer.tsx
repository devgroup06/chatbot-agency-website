import Link from 'next/link';
import Logo from './Logo';
import { site } from '@/lib/site';

const columns = [
  {
    title: 'Company',
    links: [
      { href: '/about/', label: 'About Us' },
      { href: '/contact/', label: 'Contact' },
      { href: '/blog/', label: 'Blog' },
      { href: '/pricing/', label: 'Pricing' },
    ],
  },
  {
    title: 'Services',
    links: [
      { href: '/services/#whatsapp', label: 'WhatsApp Chatbots' },
      { href: '/services/#instagram', label: 'Instagram DM Automation' },
      { href: '/services/#messenger', label: 'Messenger Bots' },
      { href: '/services/#website', label: 'Website Chat Widget' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { href: '/services/#industries', label: 'Industry Chatbots' },
      { href: '/services/#broadcasts', label: 'Broadcasts & Reminders' },
      { href: '/services/#leads', label: 'Lead Generation' },
      { href: '/services/#analytics', label: 'Analytics & Reporting' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-300">
      <div className="container-site grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Link href="/" aria-label="DialogHive home">
            <Logo light />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {site.tagline}. One AI assistant for every channel your customers already use.
          </p>
          <address className="mt-4 space-y-1.5 text-sm not-italic text-slate-400">
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-brand-400">
                {site.email}
              </a>
            </p>
            {site.phones.map((p) => (
              <p key={p.tel}>
                <span className="text-slate-500">{p.label}</span>{' '}
                <a href={`tel:${p.tel}`} className="hover:text-brand-400">
                  {p.display}
                </a>
              </p>
            ))}
            <p className="pt-1">{site.address.full}</p>
          </address>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              {col.title}
            </h3>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-slate-400 transition hover:text-brand-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-slate-800">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} DialogHive. All rights reserved.</p>
          <p>
            AI chatbots for WhatsApp, Instagram, Messenger &amp; websites —{' '}
            <Link href="/contact/" className="hover:text-brand-400">
              book a free demo
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
