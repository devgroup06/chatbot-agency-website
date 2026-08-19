import type { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import about from '../../../content/about.json';

export const metadata: Metadata = {
  title: about.seoTitle,
  description: about.seoDescription,
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink py-20">
        <div className="container-site text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {about.heroTitle} <span className="text-brand-500">{about.heroHighlight}</span>{' '}
            {about.heroTitleEnd}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">{about.heroSubtitle}</p>
        </div>
      </section>

      <section className="container-site grid items-center gap-12 py-16 md:grid-cols-2">
        <div>
          <h2 className="section-title">{about.storyTitle}</h2>
          {about.storyParagraphs.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-slate-600">
              {p}
            </p>
          ))}
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
          {about.stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 p-6 text-center">
              <p className="text-4xl font-extrabold text-brand-500">{s.value}</p>
              <p className="mt-2 text-sm font-medium text-slate-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-site">
          <h2 className="section-title text-center">{about.valuesTitle}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {about.values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={about.faqs} title="About DialogHive — FAQs" />
      <CTA
        title="Want to see DialogHive in action?"
        subtitle="Book a free demo and we’ll show you a working AI bot for your exact industry."
      />
    </>
  );
}
