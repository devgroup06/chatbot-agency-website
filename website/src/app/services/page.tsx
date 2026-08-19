import type { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import services from '../../../content/services.json';

export const metadata: Metadata = {
  title: services.seoTitle,
  description: services.seoDescription,
  alternates: { canonical: '/services/' },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ink py-20">
        <div className="container-site text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {services.heroTitle} <span className="text-brand-500">{services.heroHighlight}</span>
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
        {services.services.map((s, idx) => (
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

      <FAQ items={services.faqs} title="Services — FAQs" />
      <CTA />
    </>
  );
}
