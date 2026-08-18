import type { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'About Us — The Team Behind Your AI Chatbots',
  description:
    'DialogHive is an AI chatbot agency helping businesses automate customer conversations on WhatsApp, Instagram, Messenger and the web. Learn about our mission, values and how we work.',
  alternates: { canonical: '/about/' },
};

const values = [
  {
    title: 'Customer Conversations First',
    desc: 'A chatbot is only good if it genuinely helps your customer. Every bot we ship is tested against real customer questions before launch.',
  },
  {
    title: 'One Platform, Full Isolation',
    desc: 'Every client runs on our central platform with strict per-business data isolation — your data is yours, always.',
  },
  {
    title: 'AI + Human, Not AI vs Human',
    desc: 'We design hybrid experiences where AI handles the routine and your team handles the personal. Nobody gets stuck talking to a wall.',
  },
  {
    title: 'Measurable Results',
    desc: 'Leads captured, orders confirmed, ratings collected — everything is tracked so you can see exactly what your bot delivers.',
  },
];

const faqs = [
  {
    q: 'Who is behind DialogHive?',
    a: 'DialogHive is built by a team of engineers and conversation designers who have shipped chatbots across restaurants, healthcare, e-commerce, education, real estate and fintech. We run one central platform that powers every client bot with full data isolation.',
  },
  {
    q: 'What makes DialogHive different from DIY chatbot builders?',
    a: 'We are an agency, not just a tool. We set up your bot, train it on your business data, connect your channels, and keep improving it — you get results without learning another piece of software.',
  },
  {
    q: 'Is my business data safe with DialogHive?',
    a: 'Yes. Every business lives in its own isolated space on our platform, channel tokens are encrypted, and we support full data deletion on request — including Meta-compliant deletion callbacks.',
  },
  {
    q: 'Do you work with businesses outside the listed industries?',
    a: 'Absolutely. Besides our industry-trained bots, we offer a fully custom AI mode that can be tailored to any business — tell us your use case on the contact page.',
  },
  {
    q: 'How do I get started with DialogHive?',
    a: 'Book a free demo through our contact page. We will show you a working bot for your industry, discuss pricing, and if you like it, get you live within days.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink py-20">
        <div className="container-site text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            We Make Businesses <span className="text-brand-500">Impossible to Ignore</span> in Chat
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
            DialogHive was born from a simple observation: customers message businesses everywhere —
            WhatsApp, Instagram, Messenger, websites — but most businesses can’t keep up. We fix that
            with AI.
          </p>
        </div>
      </section>

      <section className="container-site grid items-center gap-12 py-16 md:grid-cols-2">
        <div>
          <h2 className="section-title">Our Story</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            We started as engineers building custom chatbots one business at a time. The pattern was
            always the same: missed messages meant missed revenue. A restaurant losing orders at
            midnight. A clinic missing appointment requests on Sunday. A store losing a sale because
            a size question went unanswered for six hours.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            So we built one central AI platform that any business can plug into — with{' '}
            <Link href="/services/#industries" className="font-medium text-brand-600 hover:underline">
              industry-trained bots
            </Link>
            , multi-channel delivery, and a self-service portal. Today DialogHive powers
            conversations for restaurants, hospitals, salons, schools, e-commerce stores, real
            estate agencies, fintechs and workshops.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            Curious what it costs?{' '}
            <Link href="/pricing/" className="font-medium text-brand-600 hover:underline">
              See our pricing
            </Link>{' '}
            or{' '}
            <Link href="/contact/" className="font-medium text-brand-600 hover:underline">
              book a free demo
            </Link>
            .
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ['4', 'Channels per business'],
            ['8+', 'Industry bot engines'],
            ['24/7', 'Always-on AI answers'],
            ['1', 'Portal for everything'],
          ].map(([stat, label]) => (
            <div key={label} className="rounded-2xl border border-slate-200 p-6 text-center">
              <p className="text-4xl font-extrabold text-brand-500">{stat}</p>
              <p className="mt-2 text-sm font-medium text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-site">
          <h2 className="section-title text-center">What We Stand For</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqs} title="About DialogHive — FAQs" />
      <CTA
        title="Want to see DialogHive in action?"
        subtitle="Book a free demo and we’ll show you a working AI bot for your exact industry."
      />
    </>
  );
}
