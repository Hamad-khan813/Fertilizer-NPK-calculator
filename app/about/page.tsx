import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About FertiCalc',
    description: 'Learn who maintains FertiCalc, why it was built, and how its fertilizer calculations work.',
    alternates: {
      canonical: 'https://ferti-calc.vercel.app/about',
    },
  };
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">
          About FertiCalc
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          FertiCalc is an independent fertilizer calculation tool maintained by software developer Hamad Khan.
        </p>
      </div>

      <div className="space-y-16">
        {/* Why We Created It */}
        <section className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why the site exists</h2>
          <div className="text-slate-600 space-y-4 leading-relaxed">
            <p>
              Fertilizer labels commonly express phosphate as P₂O₅ and potash as K₂O. The calculator helps users translate a target nutrient concentration and solution volume into an estimated product mass using the selected fertilizer analysis.
            </p>
            <p>
              The output is arithmetic for planning. It does not determine what a crop needs and it does not replace a product label, soil or water test, or local agronomic advice.
            </p>
          </div>
        </section>

        {/* Mission and Values */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">How the tool works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Fertilizer analysis</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Product nutrient percentages are used to estimate the mass needed for the target concentration.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Oxide conversions</h3>
              <p className="text-sm text-slate-600 leading-relaxed">The methodology page documents the standard factors used to convert P₂O₅ and K₂O to elemental P and K.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">User responsibility</h3>
              <p className="text-sm text-slate-600 leading-relaxed">The estimate must be checked against the product instructions and local recommendations before use.</p>
            </div>
          </div>
        </section>

        {/* Who It's For & Features */}
        <section className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Who Is This For?</h2>
            <ul className="space-y-3">
              {[
                "Home and garden growers",
                "Hydroponic hobbyists",
                "Users checking fertilizer label arithmetic",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Features</h2>
            <ul className="space-y-3">
              {[
                "Fertilizer analysis lookup",
                "Metric and imperial unit options",
                "Limiting-nutrient calculation",
                "Oxide-to-element conversions",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* About the Creator */}
        <section className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl mt-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 text-slate-800 opacity-50">
            <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Meet the Creator</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
              <p>
                FertiCalc was built by Hamad Khan, a software developer. The formulas use standard fertilizer label conversions and unit calculations; see the Methodology page for details.
              </p>
              <p>
                TODO(owner): add any real agronomy qualifications, collaborators or reviewers if they exist.
              </p>
              <div className="pt-6">
                <Link href="/" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition-colors">
                  Try the Calculator
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
