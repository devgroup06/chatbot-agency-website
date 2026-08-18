import type { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'Pricing — Simple Plans for AI Chatbots',
  description:
    'DialogHive pricing: transparent monthly plans for AI chatbots on WhatsApp, Instagram, Messenger and your website. Start at $49/month — leads, broadcasts and analytics included.',
  alternates: { canonical: '/pricing/' },
};

const plans = [
  {
    name: 'Starter',
    price: '$49',
    tagline: 'For small businesses starting with chat automation',
    highlight: false,
    features: [
      'Website chat widget',
      '1 social channel (WhatsApp or Messenger)',
      'AI answers trained on your business data',
      'Lead capture & email alerts',
      'Client portal access',
      'Standard support',
    ],
  },
  {
    name: 'Growth',
    price: '$99',
    tagline: 'For growing businesses on multiple channels',
    highlight: true,
    features: [
      'Everything in Starter',
      'All 4 channels: WhatsApp, Messenger, Instagram, Website',
      'Industry-trained bot flows',
      'WhatsApp broadcasts & reminders',
      'Order notifications & chat ratings',
      'Analytics dashboard',
      'Priority support',
    ],
  },
  {
    name: 'Scale',
    price: '$249',
    tagline: 'For high-volume businesses and multi-location brands',
    highlight: false,
    features: [
      'Everything in Growth',
      'Custom automation flows',
      'Multiple locations / brands',
      'Human-takeover hybrid mode',
      'Custom AI persona & advanced training',
      'Dedicated account manager',
    ],
  },
];

const faqs = [
  {
    q: 'Is there a setup fee?',
    a: 'Standard onboarding is included in every plan — we set up your bot, train it on your business data and connect your channels. Complex custom automation flows may carry a one-time setup fee, quoted upfront.',
  },
  {
    q: 'Can I change or cancel my plan anytime?',
    a: 'Yes. Plans are month-to-month with Stripe billing. Upgrade, downgrade or cancel from your client portal whenever you like — no long-term contracts.',
  },
  {
    q: 'Are WhatsApp message costs included?',
    a: 'Platform usage is included in your plan. WhatsApp/Meta may charge conversation fees on their side depending on your volume and country; we help you estimate these before launch.',
  },
  {
    q: 'What counts as a channel?',
    a: 'Each place your bot talks to customers: WhatsApp, Facebook Messenger, Instagram DM, and your website widget. The Growth plan includes all four.',
  },
  {
    q: 'Do you offer custom or agency pricing?',
    a: 'Yes — for agencies, franchises and multi-location businesses we build custom packages. Contact us with your requirements and we will prepare a quote.',
  },
  {
    q: 'Is there a free trial or demo?',
    a: 'We offer a free live demo with a bot configured for your industry, so you can see exactly how it will talk to your customers before you pay anything.',
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-ink py-20">
        <div className="container-site text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Simple Pricing. <span className="text-brand-500">Serious Results.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
            Every plan includes AI answers, lead capture and the client portal. Not sure which fits?{' '}
            <Link href="/contact/" className="font-semibold text-brand-400 hover:underline">
              Talk to us
            </Link>{' '}
            — we’ll recommend honestly.
          </p>
        </div>
      </section>

      <section className="container-site py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.highlight
                  ? 'border-brand-500 shadow-lg ring-1 ring-brand-500'
                  : 'border-slate-200'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-ink">
                  Most Popular
                </span>
              )}
              <h2 className="text-xl font-bold text-ink">{plan.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{plan.tagline}</p>
              <p className="mt-5">
                <span className="text-4xl font-extrabold text-ink">{plan.price}</span>
                <span className="text-slate-500">/month</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact/"
                className={`mt-8 ${plan.highlight ? 'btn-primary' : 'btn-secondary'} w-full`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-slate-600">
          All plans cover the services described on our{' '}
          <Link href="/services/" className="font-medium text-brand-600 hover:underline">
            Services page
          </Link>
          . Learn more about how we work on the{' '}
          <Link href="/about/" className="font-medium text-brand-600 hover:underline">
            About page
          </Link>
          .
        </p>
      </section>

      <FAQ items={faqs} title="Pricing — FAQs" />
      <CTA
        title="Not sure which plan fits your business?"
        subtitle="Tell us about your business and we’ll recommend the right setup — with a free live demo."
      />
    </>
  );
}
