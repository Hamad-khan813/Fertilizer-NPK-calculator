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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
            Calculate Your Perfect NPK Ratio
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get exact fertilizer amounts for any target NPK ratio. Free tool trusted by farmers and agronomists worldwide.
          </p>
          <Link
            href="#calculator"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-8 py-4 transition-colors text-lg"
          >
            Use Calculator
          </Link>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Calculator Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">NPK Calculator</h2>
            <Calculator onResult={setResult} onSelectedFertilizer={setSelectedFertilizer} />
          </div>

          {/* Right: Results */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Results</h2>
            <ResultCard result={result} fertilizer={selectedFertilizer} />
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-white py-16 sm:py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">52+ Fertilizers</h3>
              <p className="text-gray-600">Comprehensive database of granular and liquid fertilizers</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Results</h3>
              <p className="text-gray-600">Get exact amounts in seconds with zero guesswork</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Forever</h3>
              <p className="text-gray-600">No accounts, no limits, no ads — completely free</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts Strip */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">From Our Blog</h2>
          <p className="text-gray-600 text-lg">Learn tips, comparisons, and best practices for fertilizer application</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <BlogPreviewCard
            title="What Is NPK Ratio? A Complete Guide"
            excerpt="NPK stands for Nitrogen, Phosphorus, and Potassium. Learn what each nutrient does and how to choose the right ratio."
            category="Basics"
            slug="what-is-npk-ratio"
            date="Jan 15, 2024"
            readTime="6 min read"
          />
          <BlogPreviewCard
            title="Urea vs Ammonium Nitrate: Which Is Right?"
            excerpt="Compare cost, volatilization risk, and application timing for these two nitrogen fertilizers."
            category="Comparison"
            slug="urea-vs-ammonium-nitrate"
            date="Jan 10, 2024"
            readTime="5 min read"
          />
          <BlogPreviewCard
            title="Coming Soon"
            excerpt="More expert guides on fertilizer selection, application timing, and crop nutrition strategies."
            category="Guides"
            slug=""
            date="Soon"
            readTime="-"
            disabled
          />
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="inline-block text-green-600 hover:text-green-700 font-semibold flex items-center gap-2"
          >
            Explore All Posts
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Explore All Fertilizers</h2>
          <p className="text-green-50 text-lg mb-6 max-w-2xl mx-auto">
            Browse our complete database of 52+ fertilizers with detailed N, P₂O₅, and K₂O values
          </p>
          <Link
            href="/fertilizers"
            className="inline-block bg-white hover:bg-gray-100 text-green-600 font-semibold rounded-lg px-8 py-4 transition-colors"
          >
            View Fertilizer Database →
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

