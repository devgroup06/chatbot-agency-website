import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-site flex flex-col items-center py-28 text-center">
      <p className="text-6xl font-extrabold text-brand-500">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink">Page Not Found</h1>
      <p className="mt-3 max-w-md text-slate-600">
        The page you’re looking for doesn’t exist. Try the homepage, or explore our services and
        blog.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="btn-primary">
          Go Home
        </Link>
        <Link href="/blog/" className="btn-secondary">
          Read the Blog
        </Link>
      </div>
    </section>
  );
}
