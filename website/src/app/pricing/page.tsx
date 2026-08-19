import type { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import pricing from '../../../content/pricing.json';

export const metadata: Metadata = {
  title: pricing.seoTitle,
  description: pricing.seoDescription,
  alternates: { canonical: '/pricing/' },
};

export default function PricingPage() {
  return (
    <>
      <section className="bg-ink py-20">
        <div className="container-site text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {pricing.heroTitle} <span className="text-brand-500">{pricing.heroHighlight}</span>
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
          {pricing.plans.map((plan) => (
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
                <span className="text-slate-500">{plan.period}</span>
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

      <FAQ items={pricing.faqs} title="Pricing — FAQs" />
      <CTA
        title="Not sure which plan fits your business?"
        subtitle="Tell us about your business and we’ll recommend the right setup — with a free live demo."
      />
    </>
  );
}
