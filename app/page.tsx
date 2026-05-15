'use client';

import { useState } from 'react';
import Link from 'next/link';
import Calculator from './components/Calculator';
import ResultCard from './components/ResultCard';
import { CalcResult, Fertilizer } from './lib/calculate';

export default function Home() {
  const [result, setResult] = useState<CalcResult | null>(null);
  const [selectedFertilizer, setSelectedFertilizer] = useState<Fertilizer | null>(null);

  return (
    <div className="min-h-screen bg-background subtle-grid">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 sm:pt-32 sm:pb-40">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-foreground mb-6">
            Stop Guessing, Start <span className="text-primary">Growing</span>: The Ultimate NPK Fertilizer Calculator
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Eliminate nutrient lockout and maximize harvest potential. Our agronomical engine calculates precise grams-per-liter recipes based on stoichiometry, not guesswork.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#calculator"
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-primary-20 text-lg"
            >
              Access Calculation Engine
            </Link>
            <Link
              href="/fertilizers"
              className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-xl border border-slate-200 transition-all text-lg"
            >
              Explore Nutrient Database
            </Link>
          </div>
        </div>
      </section>

      {/* The 'Why' Section: The Problem of Nutrient Imbalance */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">The High Cost of Manual Nutrient Calculation</h2>
          <p className="text-lg text-slate-600 leading-relaxed text-justify sm:text-center">
            In modern agriculture, a 5% error in your **NPK ratio** can mean the difference between record-breaking yields and total crop failure. Most growers rely on generic labels or complex spreadsheets that fail to account for the **Bioavailability** of nutrients. This leads to the "Nutrient Gap"—a state where plants are over-fertilized with mobile nutrients like Nitrogen while suffering from a lockout of critical micronutrients. Our tool solves this by applying **Liebig's Law of the Minimum** in real-time. By identifying the "Binding Nutrient," we ensure that your target **Soil Health** and **Crop Yield** goals are met with laboratory precision, preventing environmental runoff and reducing fertilizer waste by up to 30%.
          </p>
        </div>
      </section>

      {/* Main Calculator Interface */}
      <section id="calculator" className="py-24 relative scroll-mt-20">
        <div className="absolute inset-0 bg-slate-50 -skew-y-3 origin-right"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 glass-card p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Precision Formulation</h2>
              </div>
              <Calculator onResult={setResult} onSelectedFertilizer={setSelectedFertilizer} />
            </div>

            <div className="lg:col-span-5 sticky top-24">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Agronomical Output</h2>
              </div>
              <ResultCard result={result} fertilizer={selectedFertilizer} />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep-Dives */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {/* Feature 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">World-Class Nutrient Database Integration</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Our platform isn't just a calculator; it's a gateway to an expansive, verified database of 52+ fertilizer formulations. From common salts like Potassium Nitrate and Urea to complex liquid concentrates, every entry includes precise weight percentages for N, P2O5, and K2O. This data is critical because search engines and agronomists alike value accuracy. By selecting from our <Link href="/fertilizers" className="text-primary font-bold hover:underline">Internal Fertilizer Database</Link>, you leverage stoichiometry to ensure your final dilution matches the plant's metabolic needs exactly.
                </p>
                <div className="flex items-center gap-4 text-primary font-bold">
                  <span>Explore Database</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
              <div className="bg-slate-50 rounded-3xl p-12 border border-slate-100">
                <div className="grid grid-cols-2 gap-4">
                  {['Nitrogen', 'Phosphorus', 'Potassium', 'Calcium', 'Magnesium', 'Sulfur'].map((n) => (
                    <div key={n} className="bg-white p-4 rounded-xl border border-slate-200 font-semibold text-slate-700 shadow-sm">{n}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
              <div className="lg:order-2">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Dynamic Limiting Nutrient Analysis</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Value in crop nutrition comes from balance, not quantity. Our engine identifies the "Limiting Factor" in your desired ratio instantly. If you target a high-Potassium bloom phase, the calculator determines exactly which salt hits the target first, adjusting the entire recipe to prevent excess Nitrogen accumulation. This feature is vital for <Link href="/blog/urea-vs-ammonium-nitrate" className="text-primary font-bold hover:underline">Nutrient Source Optimization</Link>, helping you choose between Urea, Nitrate, or Ammonium sources based on seasonal uptake efficiency.
                </p>
              </div>
              <div className="lg:order-1 bg-primary/5 rounded-3xl p-12 border border-primary/10">
                <div className="space-y-4">
                  <div className="h-4 w-full bg-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-full"></div>
                  </div>
                  <div className="h-4 w-full bg-secondary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-3/4"></div>
                  </div>
                  <div className="h-4 w-full bg-amber-500/20 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Professional Fertigation Scaling</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Scaling from a 1L test bottle to a 10,000L commercial fertigation tank is where most errors occur. Our software automates the volume-to-mass conversion, providing outputs in grams per total volume. This is essential for precision agriculture, where high-value crops like cannabis, greenhouse tomatoes, or hydroponic berries require strict EC (Electrical Conductivity) and pH management. Our <Link href="/blog" className="text-primary font-bold hover:underline">Expert Agriculture Guides</Link> provide the supporting science for these large-scale operations.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full"></div>
                <div className="relative bg-slate-900 rounded-3xl p-8 text-white">
                  <div className="text-2xl font-mono mb-4 text-primary">SCALE_ENGINE: READY</div>
                  <div className="text-slate-400 text-sm font-mono">Input: 10,000L Reservoir</div>
                  <div className="text-slate-400 text-sm font-mono">Output: 12.45kg Solu-K</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced FAQ (Search Snippet Optimized) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Expert Agronomy FAQ</h2>
          <div className="space-y-8">
            {[
              {
                q: "Why does my fertilizer recipe cause cloudiness in the tank?",
                a: "Cloudiness (precipitation) usually occurs when Calcium is mixed with Sulfates or Phosphates in a concentrated form. Our calculator helps prevent this by providing precise dilution rates and guidance on mixing order."
              },
              {
                q: "What is the difference between P and P2O5 in calculations?",
                a: "Fertilizer labels use P2O5, which is only 43% elemental Phosphorus. Our engine handles these conversions automatically to ensure you don't under-apply P."
              },
              {
                q: "How often should I recalibrate my NPK ratio?",
                a: "Nutrient requirements shift between vegetative and reproductive stages. We recommend recalculating every 2-3 weeks as the crop lifecycle progresses."
              },
              {
                q: "Is Urea safe for foliar application?",
                a: "Yes, but concentration is key. Use our tool to ensure your mix remains below 1% to avoid biuret toxicity or salt burn."
              },
              {
                q: "How do I calculate fertilizer for lawn vs. hydroponics?",
                a: "Lawns require slower-release sources, while hydroponics need 100% water-soluble salts. Our database allows you to select the specific source for either application."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Q: {item.q}</h3>
                <p className="text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Learning Resources */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-left">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Deep Learning Resources</h2>
              <p className="text-slate-600 text-lg">Step-by-step tutorials from agronomists and commercial growers.</p>
            </div>
            <Link href="/blog" className="text-primary font-bold flex items-center gap-2 hover:underline">
              View All Expert Guides
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BlogPreviewCard
              title="What Is NPK Ratio? A Complete Guide"
              excerpt="Master the three numbers that define your crop's health. Learn about P2O5 and K2O conversions."
              category="Basics"
              slug="what-is-npk-ratio"
              date="Jan 15, 2024"
              readTime="6 min read"
            />
            <BlogPreviewCard
              title="Urea vs Ammonium Nitrate: Performance Comparison"
              excerpt="Which nitrogen source is most efficient for your soil type and temperature?"
              category="Comparison"
              slug="urea-vs-ammonium-nitrate"
              date="Jan 10, 2024"
              readTime="5 min read"
            />
            <BlogPreviewCard
              title="Micronutrient Management Beyond NPK"
              excerpt="Boron, Iron, and Zinc: The secret to unlocking maximum yield potential."
              category="Guides"
              slug="micronutrient-management"
              date="Coming Soon"
              readTime="8 min read"
              disabled
            />
          </div>
        </div>
      </section>

      {/* Final Conversion CTA */}
      <section className="py-24 relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 hero-gradient opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">Achieve Stoichiometric Precision</h2>
          <p className="text-emerald-50 text-xl mb-10 max-w-2xl mx-auto">
            Stop relying on generic labels. Use the same precision tools as commercial agronomists to maximize your crop potential today.
          </p>
          <Link
            href="#calculator"
            className="bg-white text-primary font-bold rounded-xl px-12 py-6 transition-transform hover:scale-105 shadow-2xl text-xl"
          >
            Launch NPK Engine Now
          </Link>
        </div>
      </section>
    </div>
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
    Comparison: 'bg-purple-100 text-purple-800',
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
