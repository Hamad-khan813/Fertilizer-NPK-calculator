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
            The #1 Free <span className="text-primary">NPK Fertilizer</span> Calculator
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Eliminate guesswork in your crop nutrition strategy. Get precise, laboratory-grade fertilizer requirements for any target NPK ratio with our advanced agronomical engine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#calculator"
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-primary/20 text-lg"
            >
              Start Calculating
            </Link>
            <Link
              href="/fertilizers"
              className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-xl border border-slate-200 transition-all text-lg"
            >
              Browse 52+ Fertilizers
            </Link>
          </div>
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
                <h2 className="text-3xl font-bold text-slate-900">Run Your Nutrient Analysis</h2>
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
                <h2 className="text-3xl font-bold text-slate-900">Final Fertilizer Recipe</h2>
              </div>
              <ResultCard result={result} fertilizer={selectedFertilizer} />
            </div>
          </div>
        </div>
      </section>

      {/* Deep Educational Content (SEO Gold) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-slate">
            <h2 className="text-4xl font-bold text-slate-900 mb-8">Understanding Fertilizer NPK: The Ultimate Guide to Nutrient Ratios</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">What is NPK and Why Does It Matter?</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Every bag of fertilizer features three prominent numbers, such as 10-10-10 or 46-0-0. These represent the percentage of **Nitrogen (N)**, **Phosphorus (P₂O₅)**, and **Potassium (K₂O)** by weight. Understanding these ratios is critical for maximizing yield and preventing environmental runoff.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex gap-3">
                    <span className="font-bold text-emerald-600 shrink-0">N (Nitrogen):</span>
                    <span>Responsible for vegetative growth, leaf development, and vibrant green color. Critical during early growth stages.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-purple-600 shrink-0">P (Phosphorus):</span>
                    <span>Drives root development, flowering, and seed production. Vital for energy transfer within the plant.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-amber-600 shrink-0">K (Potassium):</span>
                    <span>Improves overall plant health, disease resistance, and water regulation. Essential for quality fruit and tuber development.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">How Our NPK Calculator Works</h3>
                <p className="text-slate-600 mb-4">
                  Calculating fertilizer dilution manually is prone to error. Our tool uses agronomical formulas to solve for the binding nutrient:
                </p>
                <div className="bg-white p-6 rounded-xl border border-slate-200 font-mono text-sm mb-6">
                  Amount (g/L) = (Target % / Fertilizer %) × 10
                </div>
                <p className="text-slate-600">
                  By inputting your target NPK and choosing from our <Link href="/fertilizers" className="text-primary font-bold underline">comprehensive database</Link>, the engine automatically identifies which nutrient is the "limiting factor" to ensure you never over-apply or under-feed your crops.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Fertigation Strategies */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Advanced Fertigation & Nutrient Planning</h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">Master the technical nuances of professional crop nutrition and precision application.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Precision Mixing",
                text: "Learn how to blend granular and liquid fertilizers to hit complex target ratios without causing precipitation in your stock tanks.",
                icon: "🧪"
              },
              {
                title: "pH & Nutrient Uptake",
                text: "Discover why pH regulation is as important as the NPK ratio itself. Maximize bioavailability through precision balancing.",
                icon: "🌡️"
              },
              {
                title: "Seasonal Requirements",
                text: "Adjust your NPK strategy based on crop lifecycle—from high nitrogen in vegetative stages to high potassium during fruiting.",
                icon: "🌱"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Solutions Section (Commercial Intent) */}
      <section className="py-24 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Commercial Grade</span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">Professional Fertilizer Formulation Software</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Step up to **Precision Agriculture** with tools designed for commercial growers. Our calculation engine handles complex formulations that standard apps miss, ensuring zero nutrient lockout and maximum bioavailability.
              </p>
              <div className="space-y-6">
                {[
                  { t: "Batch Optimization", d: "Scale recipes for 1,000L+ tanks with exact solubility tracking." },
                  { t: "Nutrient Compatibility", d: "Automatic warnings for Calcium/Sulfate precipitation." },
                  { t: "Precision Dosing", d: "Accurate to 0.001g for high-value specialty crops." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary-20 flex items-center justify-center text-primary shrink-0 mt-1">✓</div>
                    <div>
                      <h4 className="font-bold text-white">{item.t}</h4>
                      <p className="text-slate-500 text-sm">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary-20 blur-3xl rounded-full"></div>
              <div className="relative glass-card border-white/10 p-2 overflow-hidden">
                <div className="bg-slate-800 rounded-xl p-8 border border-white/5">
                  <div className="flex justify-between items-center mb-8">
                    <div className="h-2 w-24 bg-slate-700 rounded"></div>
                    <div className="h-6 w-6 rounded-full bg-primary-20"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-10 w-full bg-slate-700/50 rounded-lg animate-pulse"></div>
                    <div className="h-10 w-3/4 bg-slate-700/50 rounded-lg animate-pulse"></div>
                    <div className="h-32 w-full bg-primary-20 rounded-lg border border-primary-20 flex items-center justify-center">
                      <span className="text-primary text-xs font-bold tracking-tighter">PRECISION_MODE: ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (Rich Snippet Optimization) */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {[
              {
                q: "How much Urea per liter of water for foliar spray?",
                a: "For most plants, a safe concentration is 5g to 10g of Urea (46-0-0) per 1 liter of water. Always apply during cooler hours to prevent leaf burn. Our NPK calculator for lawn and garden crops handles these specific dilution rates automatically."
              },
              {
                q: "How do I convert PPM to grams per liter of fertilizer?",
                a: "To convert PPM to grams per liter, use the formula: Grams/L = (Target PPM / (Fertilizer % / 100)) / 1000. Our professional fertilizer blend calculator performs this conversion in the background so you can focus on target NPK ratios."
              },
              {
                q: "What is the best NPK ratio for the flowering stage?",
                a: "During the flowering stage, plants typically require higher Phosphorus (P) and Potassium (K) to drive bud development. A ratio like 1:3:2 (e.g., 5-15-10) is common in both soil and hydroponic nutrient calculators."
              },
              {
                q: "Can I mix different fertilizers together safely?",
                a: "Yes, but awareness of compatibility is key. For example, do not mix Calcium Nitrate with Magnesium Sulfate in a single concentrate tank as they will react to form insoluble Gypsum. Always use a compatibility calculator logic before mixing."
              }
            ].map((item, i) => (
              <div key={i} className="border-b border-slate-100 pb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Q: {item.q}</h3>
                <p className="text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Blog Guides */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
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
      <section className="py-24 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 hero-gradient opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to Optimize Your Yield?</h2>
          <p className="text-emerald-50 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of growers using FertiCalc for precise, professional-grade nutrient management.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="#calculator"
              className="bg-white text-primary font-bold rounded-xl px-10 py-5 transition-transform hover:scale-105 shadow-2xl text-lg"
            >
              Back to Calculator
            </Link>
            <Link
              href="/fertilizers"
              className="bg-emerald-800 text-white font-bold rounded-xl px-10 py-5 transition-transform hover:scale-105 shadow-2xl text-lg border border-emerald-700"
            >
              Explore Database
            </Link>
          </div>
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow p-6 h-full flex flex-col">
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

// force-deploy-v2
