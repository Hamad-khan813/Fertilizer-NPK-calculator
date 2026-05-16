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
              Precision-grade nutritional tools for the modern agricultural community. Our science-backed algorithms eliminate guesswork in crop nutrition.
            </p>
            <address className="not-italic text-sm space-y-3">
              <p className="flex items-start gap-3">
                <svg className="w-5 h-5 text-slate-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>123 Agri Lane, Harvest City, NY 10001</span>
              </p>
              <p className="flex items-center gap-3">
                <svg className="w-5 h-5 text-slate-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <a href="mailto:support@ferti-calc.vercel.app" className="hover:text-primary transition-colors">support@ferti-calc.vercel.app</a>
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
                <li><Link href="/editorial-policy" className="hover:text-primary transition-colors">Editorial & Methodology</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Use</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium text-slate-500">
            &copy; {new Date().getFullYear()} FertiCalc. Built for the Agricultural Community by Hamad Khan.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="https://twitter.com/ferticalc" target="_blank" rel="noopener noreferrer" aria-label="Visit our X (Twitter) profile" className="text-slate-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/company/ferti-calc" target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn page" className="text-slate-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
