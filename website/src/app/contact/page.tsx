import type { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact — Book a Free AI Chatbot Demo',
  description:
    'Contact DialogHive to book a free demo of an AI chatbot for your business — WhatsApp, Instagram, Messenger and website. We reply within one business day.',
  alternates: { canonical: '/contact/' },
};

const faqs = [
  {
    q: 'How fast will you reply to my message?',
    a: 'We reply to every inquiry within one business day — usually much faster. Demo requests are prioritized.',
  },
  {
    q: 'What happens in the free demo?',
    a: 'We show you a live AI chatbot configured for your industry, walk through the client portal, discuss your channels and volumes, and answer all questions. No commitment, no credit card.',
  },
  {
    q: 'What information should I include in my message?',
    a: 'Your business type, which channels you want (WhatsApp, Instagram, Messenger, website), and roughly how many customer messages you get per day. That lets us prepare a relevant demo and accurate quote.',
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Yes — every plan includes support, and Growth and Scale plans include priority support. See the Pricing page for details.',
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink py-20">
        <div className="container-site text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Let’s Build Your <span className="text-brand-500">AI Assistant</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
            Book a free demo or ask us anything. Check our{' '}
            <Link href="/pricing/" className="font-semibold text-brand-400 hover:underline">
              pricing
            </Link>{' '}
            and{' '}
            <Link href="/services/" className="font-semibold text-brand-400 hover:underline">
              services
            </Link>{' '}
            first if you’d like — then tell us about your business.
          </p>
        </div>
      </section>

      <section className="container-site grid gap-12 py-16 md:grid-cols-2">
        <div>
          <h2 className="section-title">Get in Touch</h2>
          <p className="mt-4 text-slate-600">
            Fill in the form and our team will get back to you within one business day with a demo
            slot and a tailored recommendation.
          </p>
          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/15 text-brand-600">
                ✉️
              </div>
              <div>
                <p className="font-semibold text-ink">Email</p>
                <a href={`mailto:${site.email}`} className="text-sm text-brand-600 hover:underline">
                  {site.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/15 text-brand-600">
                📞
              </div>
              <div>
                <p className="font-semibold text-ink">Phone &amp; WhatsApp</p>
                {site.phones.map((p) => (
                  <p key={p.tel} className="text-sm text-slate-600">
                    <span className="font-medium text-slate-500">{p.label}</span>{' '}
                    <a href={`tel:${p.tel}`} className="text-brand-600 hover:underline">
                      {p.display}
                    </a>
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/15 text-brand-600">
                📍
              </div>
              <div>
                <p className="font-semibold text-ink">Office</p>
                <p className="text-sm text-slate-600">{site.address.full}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/15 text-brand-600">
                ⏱️
              </div>
              <div>
                <p className="font-semibold text-ink">Response Time</p>
                <p className="text-sm text-slate-600">Within 1 business day</p>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </section>

      <FAQ items={faqs} title="Contact — FAQs" />
    </>
  );
}
