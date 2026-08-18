import Link from 'next/link';

export default function CTA({
  title = 'Ready to put your customer chats on autopilot?',
  subtitle = 'Get a free demo of DialogHive on WhatsApp, Instagram, Messenger and your website — live in days, not months.',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-ink">
      <div className="container-site flex flex-col items-center gap-6 py-16 text-center">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
        <p className="max-w-2xl text-slate-300">{subtitle}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact/" className="btn-primary">
            Get a Free Demo
          </Link>
          <Link
            href="/pricing/"
            className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:border-brand-500 hover:text-brand-400"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
