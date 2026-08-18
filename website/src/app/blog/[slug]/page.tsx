import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import CTA from '@/components/CTA';
import { getAllPosts, getPost, formatDate } from '@/lib/blog';
import { site } from '@/lib/site';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `${site.url}/blog/${post.slug}/`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author, url: site.url },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${site.url}/logo.svg` },
    },
    mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site.url}/blog/` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${site.url}/blog/${post.slug}/` },
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <article className="container-site max-w-3xl py-16">
        <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-600">
            Home
          </Link>{' '}
          /{' '}
          <Link href="/blog/" className="hover:text-brand-600">
            Blog
          </Link>{' '}
          / <span className="text-slate-700">{post.title}</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose-blog mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />

        <div className="mt-12 rounded-2xl border border-brand-200 bg-brand-50 p-6">
          <h2 className="text-lg font-bold text-ink">Want this working for your business?</h2>
          <p className="mt-2 text-sm text-slate-600">
            DialogHive builds AI chatbots for WhatsApp, Instagram, Messenger and websites — see our{' '}
            <Link href="/services/" className="font-medium text-brand-600 underline">
              services
            </Link>
            ,{' '}
            <Link href="/pricing/" className="font-medium text-brand-600 underline">
              pricing
            </Link>{' '}
            or{' '}
            <Link href="/contact/" className="font-medium text-brand-600 underline">
              book a free demo
            </Link>
            .
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-site pb-16">
          <h2 className="text-2xl font-bold text-ink">Related Posts</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}/`}
                className="rounded-2xl border border-slate-200 p-6 transition hover:border-brand-500 hover:shadow-md"
              >
                <p className="text-xs text-slate-500">{formatDate(p.date)}</p>
                <h3 className="mt-2 font-bold leading-snug text-ink">{p.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
