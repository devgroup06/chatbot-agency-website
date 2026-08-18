import type { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import { site } from '@/lib/site';
import { getAllPosts, formatDate } from '@/lib/blog';

export const metadata: Metadata = {
  title: `AI Chatbot Agency — WhatsApp, Instagram, Messenger & Website Bots`,
  description:
    'DialogHive is an AI chatbot agency. We launch AI assistants on WhatsApp, Instagram DM, Facebook Messenger and your website that answer customers 24/7, capture leads and grow sales.',
  alternates: { canonical: '/' },
};

const channels = [
  {
    name: 'WhatsApp',
    desc: 'Official WhatsApp Cloud API bots with template broadcasts, order updates and appointment reminders.',
    href: '/services/#whatsapp',
  },
  {
    name: 'Instagram DM',
    desc: 'Reply to DMs and story mentions instantly, qualify followers into buyers.',
    href: '/services/#instagram',
  },
  {
    name: 'Facebook Messenger',
    desc: 'Automate your page inbox with AI answers, menus and lead flows.',
    href: '/services/#messenger',
  },
  {
    name: 'Website Widget',
    desc: 'A lightweight chat widget for your site — one script tag, no dependencies.',
    href: '/services/#website',
  },
];

const features = [
  {
    title: '24/7 AI Answers',
    desc: 'An AI assistant trained on your business data answers every question instantly — day or night, in your brand voice.',
  },
  {
    title: 'Lead Capture',
    desc: 'Every conversation can become a lead. Names, numbers and intent are captured automatically and sent to your portal.',
  },
  {
    title: 'Broadcasts & Reminders',
    desc: 'Scheduled WhatsApp broadcasts and automated reminders bring customers back — bookings, offers, follow-ups.',
  },
  {
    title: 'Industry-Trained Bots',
    desc: 'Purpose-built flows for restaurants, clinics, salons, schools, e-commerce, real estate, fintech and workshops.',
  },
  {
    title: 'Client Portal & Analytics',
    desc: 'See conversations, leads, orders and chat ratings in a clean self-service portal with real analytics.',
  },
  {
    title: 'Human Handoff',
    desc: 'Hybrid mode lets your team jump into any conversation the moment a customer needs a human.',
  },
];

const industries = [
  'Restaurants',
  'E-commerce',
  'Hospitals & Clinics',
  'Salons & Spas',
  'Schools & Institutes',
  'Real Estate',
  'Fintech',
  'Car Workshops',
];

const faqs = [
  {
    q: 'What is DialogHive?',
    a: 'DialogHive is an AI chatbot agency platform. We build and manage AI chatbots that talk to your customers on WhatsApp, Facebook Messenger, Instagram DM and your website — all from one system, with your business data powering every answer.',
  },
  {
    q: 'Which channels do DialogHive chatbots support?',
    a: 'One bot works everywhere: the official WhatsApp Cloud API, Facebook Messenger, Instagram DM, and an embeddable website chat widget that installs with a single script tag.',
  },
  {
    q: 'How long does it take to launch a chatbot?',
    a: 'Most businesses go live within a few days. We onboard your business data, connect your channels, test the bot with you, and launch — no coding needed on your side.',
  },
  {
    q: 'Can the chatbot hand over to a human agent?',
    a: 'Yes. Hybrid mode combines AI answers with human takeover, so your team can step into any conversation from the client portal whenever a customer needs personal attention.',
  },
  {
    q: 'Does DialogHive work for my industry?',
    a: 'We have industry-trained bots for restaurants, e-commerce stores, hospitals, salons, schools, real estate, fintech and car workshops — plus a fully custom AI mode for any other business.',
  },
  {
    q: 'How much does it cost?',
    a: 'Plans start at $49/month and scale with your channels and message volume. See the Pricing page for full details, or contact us for a custom quote.',
  },
];

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #f59e0b 0, transparent 40%), radial-gradient(circle at 80% 70%, #d97706 0, transparent 45%)',
          }}
          aria-hidden="true"
        />
        <div className="container-site relative flex flex-col items-center gap-6 py-24 text-center">
          <span className="rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-400">
            AI Chatbot Agency
          </span>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Your Business, Answering Every Customer.{' '}
            <span className="text-brand-500">Automatically.</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            {site.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact/" className="btn-primary">
              Get a Free Demo
            </Link>
            <Link
              href="/services/"
              className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:border-brand-500 hover:text-brand-400"
            >
              Explore Services
            </Link>
          </div>
          <p className="text-xs text-slate-400">
            Trusted by restaurants, clinics, stores, salons &amp; more · No credit card required for demo
          </p>
        </div>
      </section>

      {/* Channels */}
      <section className="container-site py-16" aria-labelledby="channels-title">
        <h2 id="channels-title" className="section-title text-center">
          One AI Assistant. Every Channel.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
          Your customers already message you. DialogHive makes sure every message gets an instant,
          accurate answer — on{' '}
          <Link href="/services/" className="font-medium text-brand-600 hover:underline">
            all four major channels
          </Link>
          .
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-brand-500 hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-ink">{c.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{c.desc}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand-600">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-16" aria-labelledby="features-title">
        <div className="container-site">
          <h2 id="features-title" className="section-title text-center">
            Everything a Modern Business Needs to Automate Chat
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/15 text-brand-600">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-600">
            See how these features map to your business on our{' '}
            <Link href="/services/" className="font-medium text-brand-600 hover:underline">
              Services
            </Link>{' '}
            and{' '}
            <Link href="/pricing/" className="font-medium text-brand-600 hover:underline">
              Pricing
            </Link>{' '}
            pages.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="container-site py-16" aria-labelledby="how-title">
        <h2 id="how-title" className="section-title text-center">
          Live in 3 Simple Steps
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            {
              step: '1',
              title: 'Share Your Business Info',
              desc: 'Menu, services, prices, timings, policies — we turn your business data into your bot’s brain.',
            },
            {
              step: '2',
              title: 'Connect Your Channels',
              desc: 'We link WhatsApp, Messenger, Instagram and add one script tag to your website. Secure OAuth, no passwords shared.',
            },
            {
              step: '3',
              title: 'Go Live & Grow',
              desc: 'Your AI assistant starts answering, capturing leads and sending reminders — you watch results in the portal.',
            },
          ].map((s) => (
            <div key={s.step} className="relative rounded-2xl border border-slate-200 p-6">
              <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-ink">
                {s.step}
              </span>
              <h3 className="mt-2 text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="bg-slate-50 py-16" aria-labelledby="industries-title">
        <div className="container-site text-center">
          <h2 id="industries-title" className="section-title">
            Built for Your Industry
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Every industry talks to customers differently. Our{' '}
            <Link href="/services/#industries" className="font-medium text-brand-600 hover:underline">
              industry-trained bots
            </Link>{' '}
            speak your customers’ language from day one.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {industries.map((i) => (
              <span
                key={i}
                className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700"
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Latest blog posts */}
      {latestPosts.length > 0 && (
        <section className="container-site py-16" aria-labelledby="blog-title">
          <div className="flex items-end justify-between">
            <h2 id="blog-title" className="section-title">
              From the Blog
            </h2>
            <Link href="/blog/" className="text-sm font-semibold text-brand-600 hover:underline">
              View all posts →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {latestPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}/`}
                className="rounded-2xl border border-slate-200 p-6 transition hover:border-brand-500 hover:shadow-md"
              >
                <p className="text-xs text-slate-500">{formatDate(p.date)}</p>
                <h3 className="mt-2 text-lg font-bold leading-snug text-ink">{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600">{p.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <FAQ items={faqs} />
      <CTA />
    </>
  );
}
