'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { nav } from '@/lib/site';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between">
        <Link href="/" aria-label="DialogHive home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-600"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact/" className="btn-primary !px-4 !py-2">
            Get a Free Demo
          </Link>
        </nav>

        <button
          className="rounded-md border border-slate-200 p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white md:hidden" aria-label="Mobile navigation">
          <div className="container-site flex flex-col gap-1 py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact/" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Get a Free Demo
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
