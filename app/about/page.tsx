import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About Us | Ferti-Calc',
    description: 'Learn about Ferti-Calc, our mission to democratize precision agriculture, and the story behind our professional-grade NPK fertilizer calculator.',
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
          Precision nutrient math, free and open to every grower
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          FertiCalc is a free NPK fertilizer calculator built to close the gap between fertilizer labels and the nutrients a crop actually receives.
        </p>
      </div>

      <div className="space-y-16">
        {/* Why We Created It */}
        <section className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why We Created Ferti-Calc</h2>
          <div className="text-slate-600 space-y-4 leading-relaxed">
            <p>
              Fertilizer labels commonly report phosphorus and potassium as P₂O₅ and K₂O rather than elemental nutrients. FertiCalc converts those values, scales recipes for tanks and areas, and helps growers make the arithmetic easier to verify.
            </p>
            <p>
              The database covers common nitrogen, phosphorus, potassium, compound and organic sources. The tools include unit conversions, recipe scaling, crop-specific calculators, compatibility indicators and risk guidance. No account, signup or paywall is required.
            </p>
          </div>
        </section>

        {/* Mission and Values */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Our Mission & Values</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Scientific Accuracy</h3>
              <p className="text-sm text-slate-600 leading-relaxed">No guesswork. Our engine relies on strict atomic-weight baselines for exact part-per-million (PPM) balancing and dilution ratios.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Sustainable Growing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">By calculating exact dosing requirements, we help farmers drastically reduce chemical waste and prevent toxic soil accumulation.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Open Accessibility</h3>
              <p className="text-sm text-slate-600 leading-relaxed">High-tech agriculture shouldn't be hidden behind a paywall. Our tools are 100% free, requiring no sign-ups or subscriptions.</p>
            </div>
          </div>
        </section>

        {/* Who It's For & Features */}
        <section className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Who Is This For?</h2>
            <ul className="space-y-3">
              {[
                "Hydroponic Growers balancing delicate reservoir PPMs",
                "Soil Farmers calculating bulk acreage applications",
                "Home Gardeners mixing custom liquid feeds",
                "Commercial Cultivators managing large-scale fertigation",
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
                "Database of 52+ commercial fertilizers",
                "Instant elemental-to-oxide parsing",
                "Auto-detection of the limiting nutrient",
                "Precision scaling to 0.001 grams per liter",
                "Mobile-friendly, lightning-fast architecture",
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
                FertiCalc is built and maintained by Hamad Khan, a full-stack developer based in Lower Dir, Khyber Pakhtunkhwa, Pakistan.
              </p>
              <p>
                It is an independent one-person project and is not owned by, sponsored by, or affiliated with a fertilizer manufacturer, distributor or retailer. FertiCalc provides arithmetic and reference information; it cannot replace a soil test, water analysis, local regulations or professional agronomic advice.
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
