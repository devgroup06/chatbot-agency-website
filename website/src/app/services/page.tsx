import type { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'Services — WhatsApp, Instagram, Messenger & Website Chatbots',
  description:
    'Explore DialogHive services: WhatsApp Cloud API chatbots, Instagram DM automation, Facebook Messenger bots, website chat widgets, broadcasts, reminders, lead generation and analytics.',
  alternates: { canonical: '/services/' },
};

const services = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Chatbots',
    desc: 'Automate your most important channel with the official WhatsApp Cloud API. Your AI assistant answers product questions, takes orders and bookings, and sends confirmations — all inside the chat your customers already use daily.',
    points: [
      'Official WhatsApp Cloud API (green-tick compatible)',
      'AI answers trained on your business data',
      'Template broadcasts for offers and updates',
      'Order confirmations and appointment reminders',
    ],
  },
  {
    id: 'messenger',
    name: 'Facebook Messenger Bots',
    desc: 'Turn your Facebook page inbox into a sales machine. Every comment-to-DM, ad click and page message gets an instant, on-brand response with menus, quick replies and AI answers.',
    points: [
      'Instant replies to page messages 24/7',
      'Secure OAuth page linking — no passwords shared',
      'Lead capture flows built into the chat',
      'Human takeover from the client portal',
    ],
  },
  {
    id: 'instagram',
    name: 'Instagram DM Automation',
    desc: 'Followers DM you about price, size, availability, appointments. Our Instagram automation answers immediately and converts interest into leads and sales while it’s hot.',
    points: [
      'Auto-replies to DMs and story mentions',
      'AI answers with your catalog and pricing',
      'Qualify followers into booked appointments',
      'Works with your existing Instagram business account',
    ],
  },
  {
    id: 'website',
    name: 'Website Chat Widget',
    desc: 'A fast, lightweight chat widget for your website — installed with a single script tag, no dependencies, fully branded to your business. The same AI brain that powers your social channels powers your site.',
    points: [
      'One-line install on any website or CMS',
      'Custom colors, greeting and branding',
      'Captures name and contact before or during chat',
      'Chat ratings to measure customer satisfaction',
    ],
  },
  {
    id: 'industries',
    name: 'Industry-Trained Bots',
    desc: 'Generic bots give generic answers. Ours ship with flows designed for your industry: menu and ordering for restaurants, appointment booking for clinics and salons, catalog and order tracking for e-commerce, admissions for schools, listings for real estate, and more.',
    points: [
      'Restaurant, e-commerce, hospital, salon bots',
      'School, real estate, fintech, car workshop bots',
      'AI-only, rule-based, hybrid and automation modes',
      'Fully custom flows for any other business',
    ],
  },
  {
    id: 'broadcasts',
    name: 'Broadcasts & Reminders',
    desc: 'Bring customers back automatically. Schedule WhatsApp template broadcasts for offers and announcements, and set automated reminders for appointments, renewals and follow-ups.',
    points: [
      'Scheduled WhatsApp template broadcasts',
      'Automated appointment & payment reminders',
      'Audience targeting from your conversation history',
      'Delivery tracking in the portal',
    ],
  },
  {
    id: 'leads',
    name: 'Lead Generation & Orders',
    desc: 'Every chat is a chance to win a customer. DialogHive captures leads with contact details and intent, confirms orders, and notifies your team instantly — nothing slips through.',
    points: [
      'Automatic lead capture from every channel',
      'Order confirmation notifications',
      'Lead list with export in the client portal',
      'Instant email alerts to your team',
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics & Reporting',
    desc: 'Know exactly what your bot is doing for you: conversations handled, leads captured, ratings collected, busiest hours and top questions — all in a clean dashboard.',
    points: [
      'Conversation and message analytics',
      'Chat ratings and satisfaction tracking',
      'Lead and order reporting',
      'Per-channel performance breakdown',
    ],
  },
];

const faqs = [
  {
    q: 'Can I use one chatbot across WhatsApp, Instagram, Messenger and my website?',
    a: 'Yes — that is exactly how DialogHive works. One AI assistant, trained once on your business data, answers on all four channels. You manage everything from a single portal.',
  },
  {
    q: 'Do I need the official WhatsApp Business API?',
    a: 'We set it up for you. DialogHive uses the official WhatsApp Cloud API, which supports automated replies, template broadcasts and reminders — fully compliant with WhatsApp policies.',
  },
  {
    q: 'How does the website chat widget install?',
    a: 'With one script tag. Copy a single line of code into your site (WordPress, Shopify, custom — anything), and the branded widget appears instantly. No plugins or dependencies.',
  },
  {
    q: 'What if the AI cannot answer a question?',
    a: 'In hybrid mode the bot gracefully hands the conversation to your team, and you get notified. You can reply from the client portal, and the AI resumes when you are done.',
  },
  {
    q: 'Can I send promotional broadcasts to my customers?',
    a: 'Yes. You can schedule WhatsApp template broadcasts to opted-in customers for offers, announcements and reminders, with delivery tracking — see our Pricing page for included volumes.',
  },
  {
    q: 'Do you build custom automation flows?',
    a: 'Yes. Beyond industry templates, we design custom automation flows — multi-step booking, ordering, qualification or support journeys tailored to your exact process.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ink py-20">
        <div className="container-site text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Chatbot Services That <span className="text-brand-500">Grow Your Business</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
            From WhatsApp to your website — every service below is included in our platform and
            managed for you. Compare plans on the{' '}
            <Link href="/pricing/" className="font-semibold text-brand-400 hover:underline">
              pricing page
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="container-site space-y-10 py-16">
        {services.map((s, idx) => (
          <article
            key={s.id}
            id={s.id}
            className="grid scroll-mt-24 gap-8 rounded-2xl border border-slate-200 p-8 md:grid-cols-2"
          >
            <div>
              <span className="text-sm font-bold text-brand-600">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-1 text-2xl font-bold text-ink">{s.name}</h2>
              <p className="mt-3 leading-relaxed text-slate-600">{s.desc}</p>
              <Link href="/contact/" className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline">
                Get this for my business →
              </Link>
            </div>
            <ul className="space-y-3 self-center">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-slate-700">
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <FAQ items={faqs} title="Services — FAQs" />
      <CTA />
    </>
  );
}
