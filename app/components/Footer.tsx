import Link from 'next/link';

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand & Contact */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <span className="text-xl font-black text-white tracking-tight">Ferti<span className="text-primary">Calc</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              A fertilizer calculation tool for checking label analyses and planning nutrient mixes.
            </p>
            <address className="not-italic text-sm space-y-3">
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 text-slate-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Lower Dir, Khyber Pakhtunkhwa, Pakistan</span>
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 text-slate-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <a href="mailto:hamadkhan9996310@gmail.com" className="hover:text-primary transition-colors">hamadkhan9996310@gmail.com</a>
              </p>
            </address>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-white uppercase tracking-widest text-xs mb-6">Explore</h3>
              <ul className="space-y-4 text-sm">
                <li><Link href="/" className="hover:text-primary transition-colors">Home Calculator</Link></li>
                <li><Link href="/fertilizers" className="hover:text-primary transition-colors">Fertilizer Database</Link></li>
                <li><Link href="/user-guide" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-white uppercase tracking-widest text-xs mb-6">Learning</h3>
              <ul className="space-y-4 text-sm">
                <li><Link href="/guides/what-is-npk" className="hover:text-primary transition-colors">What is NPK?</Link></li>
                <li><Link href="/guides/foliar-spray-guide" className="hover:text-primary transition-colors">Foliar Spray Guide</Link></li>
                <li><Link href="/guides/ppm-conversion" className="hover:text-primary transition-colors">PPM Conversion</Link></li>
                <li><Link href="/guides/flowering-npk" className="hover:text-primary transition-colors">Flowering NPK</Link></li>
              </ul>
            </div>

            {/* Compliance */}
            <div>
              <h3 className="font-bold text-white uppercase tracking-widest text-xs mb-6">Company</h3>
              <ul className="space-y-4 text-sm">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                <li><Link href="/editorial-policy" className="hover:text-primary transition-colors">Editorial Policy</Link></li>
                <li><Link href="/methodology" className="hover:text-primary transition-colors">Methodology</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Use</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium text-slate-500">
            &copy; {new Date().getFullYear()} FertiCalc. Maintained by Hamad Khan.
          </p>
        </div>
      </div>
    </footer>
  );
}
