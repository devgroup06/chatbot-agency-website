import JsonLd from './JsonLd';

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * FAQ section with schema.org FAQPage structured data (SEO rich results).
 * Answers are plain text in JSON-LD; rendered answers may include simple links via `render`.
 */
export default function FAQ({
  items,
  title = 'Frequently Asked Questions',
}: {
  items: FaqItem[];
  title?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <section className="container-site py-16" aria-labelledby="faq-title">
      <JsonLd data={jsonLd} />
      <h2 id="faq-title" className="section-title text-center">
        {title}
      </h2>
      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-slate-200 bg-white p-5 open:border-brand-500 open:shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
              {item.q}
              <span className="text-brand-500 transition group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
