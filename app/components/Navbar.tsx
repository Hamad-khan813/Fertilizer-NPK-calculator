'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const navLinks = [
    { href: '/', label: 'Calculator' },
    { href: '/guides', label: 'Guides', isDropdown: true },
    { href: '/fertilizers', label: 'Fertilizers' },
    { href: '/blog', label: 'Blogs' },
  ];

  const guideLinks = [
    { href: '/guides/what-is-npk', label: 'What is NPK?' },
    { href: '/guides/foliar-spray-guide', label: 'Foliar Spray Guide' },
    { href: '/guides/ppm-conversion', label: 'PPM Conversion' },
    { href: '/guides/flowering-npk', label: 'Flowering NPK' },
    { href: '/guides/fertilizer-compatibility', label: 'Fertilizer Compatibility' },
    { href: '/guides/hydroponic-nutrients', label: 'Hydroponic Nutrients' },
  ];

  return (
    <nav role="navigation" aria-label="Main Navigation" className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-lg shadow-primary/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">Ferti<span className="text-primary">Calc</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group/item">
                <Link
                  href={link.href}
                  className={`text-sm font-bold tracking-wide uppercase transition-all relative py-2 flex items-center gap-1 ${
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-slate-600 hover:text-primary'
                  }`}
                >
                  {link.label}
                  {link.isDropdown && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  )}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover/item:w-full'}`}></span>
                </Link>

                {link.isDropdown && (
                  <div className="absolute top-full left-0 w-64 bg-white border border-slate-100 shadow-xl rounded-2xl py-4 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all translate-y-2 group-hover/item:translate-y-0 z-50">
                    {guideLinks.map((guide) => (
                      <Link
                        key={guide.href}
                        href={guide.href}
                        className="block px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50"
                      >
                        {guide.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <svg
                className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[80vh] opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-2">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-4 py-3 rounded-xl text-base font-bold uppercase tracking-wider ${
                    isActive(link.href)
                      ? 'bg-primary/10 text-primary border-l-4 border-primary'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  onClick={() => !link.isDropdown && setIsOpen(false)}
                >
                  {link.label}
                </Link>
                {link.isDropdown && (
                  <div className="pl-8 mt-2 space-y-1">
                    {guideLinks.map((guide) => (
                      <Link
                        key={guide.href}
                        href={guide.href}
                        className="block py-2 text-slate-500 font-medium text-sm hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {guide.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
