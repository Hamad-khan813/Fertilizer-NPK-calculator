'use client';

import { useState } from 'react';
import Link from 'next/link';
import Calculator from './components/Calculator';
import ResultCard from './components/ResultCard';
import { CalcResult, Fertilizer } from './lib/calculate';

export default function Home() {
  const [result, setResult] = useState<CalcResult | null>(null);
  const [inputs, setInputs] = useState<any>(null);
  const [selectedFertilizer, setSelectedFertilizer] = useState<Fertilizer | null>(null);

  const handleResult = (res: CalcResult | null, ins: any) => {
    setResult(res);
    setInputs(ins);
  };

  return (
    <div className="min-h-screen bg-background subtle-grid">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-foreground mb-6">
            Free <span className="text-primary">NPK Fertilizer</span> Calculator
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            Professional-grade nutrient planning for any crop. Calculate precise grams-per-liter recipes instantly. No registration required.
          </p>
          
          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm font-semibold text-slate-500">
            <span className="flex items-center gap-1">✓ 52+ fertilizers in database</span>
            <span className="flex items-center gap-1">✓ Used by 2,000+ growers monthly</span>
            <span className="flex items-center gap-1">✓ No signup required</span>
            <span className="flex items-center gap-1">✓ Accurate to 0.001g/L</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#calculator"
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-primary-20 text-lg"
            >
              Start Calculating →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Calculator Interface */}
      <section id="calculator" className="py-20 relative scroll-mt-20">
        <div className="absolute inset-0 bg-slate-50 -skew-y-3 origin-right"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 glass-card p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Precision mixing icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Precision Engine</h2>
              </div>
              <Calculator onResult={handleResult} onSelectedFertilizer={setSelectedFertilizer} />
            </div>

            <div className="lg:col-span-5 sticky top-24">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Agronomical output icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Fertilizer Recipe</h2>
              </div>
              <ResultCard result={result} fertilizer={selectedFertilizer} inputs={inputs} />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Batch Optimization</h3>
              <p className="text-slate-600">Scale from 1L bottles to 10,000L commercial reservoirs with zero math errors.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Nutrient Compatibility</h3>
              <p className="text-slate-600">Built-in logic to prevent chemical precipitation and nutrient lockout.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Precision Dosing</h3>
              <p className="text-slate-600">Accurate to 0.001g for sensitive crops and high-value hydroponic systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Guides Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Popular Agriculture Guides</h2>
              <p className="text-slate-600 text-lg">Master the science of crop nutrition with our expert-verified resources.</p>
            </div>
            <Link href="/guides" className="text-primary font-bold hover:underline hidden sm:block">View All Guides →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GuideCard 
              title="What is NPK?" 
              description="Understanding the three numbers that define plant health and yield."
              href="/guides/what-is-npk"
            />
            <GuideCard 
              title="Foliar Spray Guide" 
              description="Safe application rates for Urea and micronutrients."
              href="/guides/foliar-spray-guide"
            />
            <GuideCard 
              title="PPM Conversion" 
              description="Master the math of parts-per-million for hydroponics."
              href="/guides/ppm-conversion"
            />
            <GuideCard 
              title="Hydroponic Nutrients" 
              description="Custom recipes for high-value hydroponic systems."
              href="/guides/hydroponic-nutrients"
            />
          </div>
        </div>
      </section>

      {/* Short FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div className="p-6 bg-slate-50 rounded-2xl">
              <h3 className="text-lg font-bold text-slate-900 mb-2">How do I convert PPM to grams per liter?</h3>
              <p className="text-slate-600">Grams/L = (Target PPM / (Fertilizer % / 100)) / 1000. Our engine does this math automatically.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl">
              <h3 className="text-lg font-bold text-slate-900 mb-2">What is the best NPK for flowering?</h3>
              <p className="text-slate-600">Plants typically need higher Phosphorus and Potassium (e.g., 1:3:2 ratio) during the bloom phase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Optimize Your Yield?</h2>
          <p className="text-xl text-emerald-50 mb-10">Join 2,000+ growers using FertiCalc for professional-grade nutrient planning.</p>
          <Link
            href="#calculator"
            className="inline-block bg-white text-primary font-bold rounded-xl px-12 py-5 transition-transform hover:scale-105 shadow-xl text-lg"
          >
            Start Calculating →
          </Link>
        </div>
      </section>
    </div>
  );
}

function GuideCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/50 hover:shadow-md transition-all group">
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary">{title}</h3>
      <p className="text-sm text-slate-600 mb-4">{description}</p>
      <span className="text-primary text-xs font-bold flex items-center gap-1">Read Guide <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></span>
    </Link>
  );
}

function BlogPreviewCard({
  title,
  excerpt,
  category,
  slug,
  date,
  readTime,
  disabled = false,
}: {
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  date: string;
  readTime: string;
  disabled?: boolean;
}) {
  const categoryColors: Record<string, string> = {
    Basics: 'bg-blue-100 text-blue-800',
    Comparisons: 'bg-purple-100 text-purple-800',
    Guides: 'bg-green-100 text-green-800',
  };

  const content = (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow p-6 h-full flex flex-col text-left">
      <div className="mb-4">
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[category] || 'bg-gray-100 text-gray-800'}`}>
          {category}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 flex-grow">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{excerpt}</p>
      <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
        <span>{date}</span>
        <span>{readTime}</span>
      </div>
    </div>
  );

  if (disabled) {
    return content;
  }

  return <Link href={`/blog/${slug}`}>{content}</Link>;
}
