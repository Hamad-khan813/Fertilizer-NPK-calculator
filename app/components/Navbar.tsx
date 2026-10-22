'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Calculator' },
  { href: '/guides', label: 'Guides' },
  { href: '/fertilizers', label: 'Fertilizers' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 border-b border-slate-200/60 bg-white shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">Ferti<span className="text-primary">Calc</span></span>
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-xl p-3 text-slate-900 transition-colors hover:bg-slate-100 focus:outline-none md:hidden"
            aria-expanded={isOpen}
            aria-controls="main-navigation-links"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <svg className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div id="main-navigation-links" className={`${isOpen ? 'block pb-4' : 'hidden'} md:block md:pb-0`}>
          <ul className="flex flex-col md:flex-row md:items-center md:justify-end md:gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`block rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors md:px-0 md:py-2 ${active ? 'bg-primary/10 text-primary md:bg-transparent' : 'text-slate-900 hover:bg-slate-50 hover:text-primary md:hover:bg-transparent'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
