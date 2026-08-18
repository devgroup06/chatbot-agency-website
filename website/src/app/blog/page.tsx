import type { Metadata } from 'next';
import Link from 'next/link';
import CTA from '@/components/CTA';
import { getAllPosts, formatDate } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — Chatbot & AI Customer Engagement Insights',
  description:
    'Guides and insights on AI chatbots, WhatsApp automation, Instagram DM marketing, customer support automation and lead generation — from the DialogHive team.',
  alternates: { canonical: '/blog/' },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="bg-ink py-20">
        <div className="container-site text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            The DialogHive <span className="text-brand-500">Blog</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
            Practical guides on chat automation, AI customer support and growing sales through
            conversations. New posts published daily.
          </p>
        </div>
      </section>

      <section className="container-site py-16">
        {posts.length === 0 ? (
          <p className="text-center text-slate-600">No posts yet — check back soon.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}/`}
                className="flex flex-col rounded-2xl border border-slate-200 p-6 transition hover:border-brand-500 hover:shadow-md"
              >
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{p.readingMinutes} min read</span>
                </div>
                <h2 className="mt-3 text-lg font-bold leading-snug text-ink">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.description}</p>
                {p.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>

      <CTA
        title="Reading about chatbots is good. Having one is better."
        subtitle="Get a free demo of an AI assistant built for your business — live on WhatsApp, Instagram, Messenger and your website."
      />
    </>
  );
}
