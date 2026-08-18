'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Demo request from ${data.get('name')} — ${data.get('business')}`);
    const body = encodeURIComponent(
      [
        `Name: ${data.get('name')}`,
        `Email: ${data.get('email')}`,
        `Business: ${data.get('business')}`,
        `Channels: ${data.get('channels')}`,
        '',
        `${data.get('message')}`,
      ].join('\n')
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus('sent');
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 p-8 shadow-sm">
      <div className="grid gap-5">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">
            Your Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            placeholder="you@business.com"
          />
        </div>
        <div>
          <label htmlFor="business" className="mb-1.5 block text-sm font-semibold text-ink">
            Business Name & Type
          </label>
          <input
            id="business"
            name="business"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            placeholder="e.g. Spice Garden — Restaurant"
          />
        </div>
        <div>
          <label htmlFor="channels" className="mb-1.5 block text-sm font-semibold text-ink">
            Channels You Want
          </label>
          <select
            id="channels"
            name="channels"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option>All channels (WhatsApp, Instagram, Messenger, Website)</option>
            <option>WhatsApp only</option>
            <option>Website widget only</option>
            <option>WhatsApp + Website</option>
            <option>Instagram + Messenger</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            placeholder="Tell us about your business and what you want the chatbot to do…"
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          Request Free Demo
        </button>
        {status === 'sent' && (
          <p className="text-center text-sm font-medium text-brand-700">
            Your email app should open now — just hit send. We’ll reply within one business day.
          </p>
        )}
      </div>
    </form>
  );
}
