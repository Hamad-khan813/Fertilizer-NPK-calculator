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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-foreground mb-6">
            Calculate Your <span className="text-primary">Perfect</span> NPK Ratio
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Eliminate guesswork in crop nutrition. Get precise fertilizer requirements for any target ratio with our advanced agronomical calculator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#calculator"
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-primary/20 text-lg"
            >
              Get Started Now
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

      {/* Calculator Section */}
      <section id="calculator" className="py-24 relative">
        <div className="absolute inset-0 bg-slate-50 -skew-y-3 origin-right"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Calculator Form */}
            <div className="lg:col-span-7 glass-card p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-900">NPK Calculator</h2>
              </div>
              <Calculator onResult={setResult} onSelectedFertilizer={setSelectedFertilizer} />
            </div>

            {/* Right: Results */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Your Recipe</h2>
              </div>
              <ResultCard result={result} fertilizer={selectedFertilizer} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group">
              <div className="mb-6 w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Database of 52+ Fertilizers</h3>
              <p className="text-slate-600 leading-relaxed">From Urea and DAP to specialized liquid formulations, we cover everything you need for precise mixing.</p>
            </div>

            <div className="group">
              <div className="mb-6 w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Result Analysis</h3>
              <p className="text-slate-600 leading-relaxed">Get exact grams or milliliters required per liter instantly. Our engine identifies limiting nutrients automatically.</p>
            </div>

            <div className="group">
              <div className="mb-6 w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Professional Grade Tool</h3>
              <p className="text-slate-600 leading-relaxed">Trusted by agronomists worldwide. Completely free, no registration required. Science-backed calculations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts Strip */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Expert Nutritional Guides</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">Master the art of fertigation with our expert guides and comparison studies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <BlogPreviewCard
              title="What Is NPK Ratio? A Complete Guide"
              excerpt="NPK stands for Nitrogen, Phosphorus, and Potassium. Learn what each nutrient does and how to choose the right ratio for your soil."
              category="Basics"
              slug="what-is-npk-ratio"
              date="Jan 15, 2024"
              readTime="6 min read"
            />
            <BlogPreviewCard
              title="Urea vs Ammonium Nitrate: Deep Dive"
              excerpt="Comparing cost efficiency, volatilization risk, and root uptake timing for these two dominant nitrogen sources."
              category="Comparison"
              slug="urea-vs-ammonium-nitrate"
              date="Jan 10, 2024"
              readTime="5 min read"
            />
            <BlogPreviewCard
              title="Micronutrient Management"
              excerpt="Beyond NPK: Why Boron, Zinc, and Manganese are critical for maximizing your yield potential this season."
              category="Guides"
              slug=""
              date="Coming Soon"
              readTime="8 min read"
              disabled
            />
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-primary font-bold rounded-xl border border-primary/20 transition-all shadow-sm"
            >
              Explore All Expert Posts
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 premium-gradient"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Need Specific Values?</h2>
          <p className="text-emerald-50 text-xl mb-10 max-w-2xl mx-auto">
            Browse our complete database of 52+ granular and liquid fertilizers with detailed nutrient analysis.
          </p>
          <Link
            href="/fertilizers"
            className="inline-block bg-white hover:bg-emerald-50 text-primary font-bold rounded-xl px-10 py-5 transition-transform hover:scale-105 shadow-2xl text-lg"
          >
            Access Fertilizer Database
          </Link>
        </div>
      </section>
    </div>
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

