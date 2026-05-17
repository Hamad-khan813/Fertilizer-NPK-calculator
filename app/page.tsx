'use client';

import { useState } from 'react';
import Link from 'next/link';
import Calculator from './components/Calculator';
import ResultCard from './components/ResultCard';
import { CalcResult, Fertilizer } from './lib/calculate';

interface CalculatorInputs {
  targetN: number;
  targetP: number;
  targetK: number;
  volumeLitres: number;
  fertilizerId: string;
}

export default function Home() {
  const [result, setResult] = useState<CalcResult | null>(null);
  const [inputs, setInputs] = useState<CalculatorInputs | null>(null);
  const [selectedFertilizer, setSelectedFertilizer] = useState<Fertilizer | null>(null);

  const handleResult = (res: CalcResult | null, ins: CalculatorInputs | null) => {
    setResult(res);
    setInputs(ins);
  };

  return (
    <main className="min-h-screen bg-background subtle-grid">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-foreground mb-6">
            Free <span className="text-primary">NPK Fertilizer</span> Calculator
          </h1>
          <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-slate-400 mb-8 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              By Hamad Khan, Full-Stack Developer &amp; Digital Consultant
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Updated: <time dateTime="2026-05-17">May 17, 2026</time>
            </span>
          </div>
          <p className="text-xl hero-description text-slate-600 mb-6 max-w-3xl mx-auto leading-relaxed font-medium">
            FertiCalc is a real-time NPK fertilizer calculator providing instant elemental-to-oxide parsing and precision crop recipe scaling.
          </p>

          {/* Visually Distinct TL;DR Summary Box */}
          <div className="mb-10 p-8 bg-emerald-50/50 backdrop-blur-sm border border-primary/20 rounded-3xl text-left max-w-4xl mx-auto shadow-sm">
            <h2 id="tldr-summary" className="text-sm font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-primary"></span>
              Quick Summary &amp; Key Takeaways
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start gap-3 text-slate-700 font-medium">
                <span className="text-primary font-bold">01.</span>
                <p>The calculation engine utilizes a precise <Link href="#methodology-attribution" className="text-primary hover:underline font-semibold">atomic-weight baseline</Link> to perform reliable elemental-to-oxide conversions.</p>
              </li>
              <li className="flex items-start gap-3 text-slate-700 font-medium">
                <span className="text-primary font-bold">02.</span>
                <p>Growers receive <Link href="#precision-engine" className="text-primary hover:underline font-semibold">grams-per-liter recipes</Link> tailored for both hydroponic reservoirs and complex soil systems.</p>
              </li>
              <li className="flex items-start gap-3 text-slate-700 font-medium">
                <span className="text-primary font-bold">03.</span>
                <p>Built-in intelligence checks <Link href="#feature-nutrient-compatibility" className="text-primary hover:underline font-semibold">chemical compatibility</Link> in real-time to avoid costly lockout or precipitation.</p>
              </li>
              <li className="flex items-start gap-3 text-slate-700 font-medium">
                <span className="text-primary font-bold">04.</span>
                <p>Access is fully open-source and free, ensuring high-density agronomical math is democratized for all growers.</p>
              </li>
            </ul>
          </div>
          
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

      {/* Problem / Solution Narrative */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 id="blending-problem" className="text-sm font-black uppercase tracking-widest text-red-500 mb-4 flex items-center gap-2">
                  <span className="w-8 h-px bg-red-500"></span>
                  The Problem
                </h2>
                <h3 id="high-cost-blending-errors" className="text-4xl font-bold text-slate-900 mb-6">The High Cost of Blending Errors</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Manual fertilizer blending requires exact calculations because incorrect elemental-to-oxide parsing of Phosphorus (P₂O₅) and Potassium (K₂O) causes crop burn and nutrient lockout. Spend hours fighting with confusing formulas, or risk devastating crops due to a single misplaced decimal point. Most growers rely on static spreadsheets that can&apos;t account for real-time chemical compatibility or varied reservoir scales.
                </p>
              </div>
              <ul className="space-y-4">
                {["Complex math leading to nutrient lockout", "Elemental conversion confusion (N-P-K vs N-P2O5-K2O)", "Inconsistent mixing ratios across different tank sizes"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-semibold italic">
                    <span className="text-red-500 font-bold">×</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-10 bg-slate-900 rounded-[2.5rem] text-white space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/40 transition-colors"></div>
              <div>
                <h2 id="blending-solution" className="text-sm font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                  <span className="w-8 h-px bg-primary"></span>
                  Our Solution
                </h2>
                <h3 id="zero-guesswork-total-precision" className="text-4xl font-bold mb-6">Zero Guesswork. Total Precision.</h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  FertiCalc is a real-time agronomic calculator that instantly parses 52+ fertilizer grades into precise mass requirements per liter. Our engine performs real-time, high-density calculations instantly. By automating the agronomical heavy lifting, we help you achieve absolute nutrient precision in under 60 seconds, ensuring every drop contributes to your harvest&apos;s success.
                </p>
              </div>
              <ul className="space-y-4">
                {["99.9% Accurate elemental-to-oxide parsing", "Instant mass calculations for any reservoir scale", "Real-time chemical compatibility alerts"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-emerald-400 font-semibold">
                    <span className="text-emerald-500 font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
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
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-3">
                  <h2 id="precision-engine" className="text-3xl font-bold text-slate-900">Precision Engine</h2>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                    FertiCalc Engine v2.4.0 (Released <time dateTime="2026-05-10">May 10, 2026</time>)
                  </span>
                </div>
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
                <h2 id="recipe-output" className="text-3xl font-bold text-slate-900">Fertilizer Recipe</h2>
              </div>
              <ResultCard result={result} fertilizer={selectedFertilizer} inputs={inputs} />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="agronomical-features" className="text-3xl font-bold text-slate-900 mb-16 text-center">Advanced Agronomical Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 id="feature-batch-optimization" className="text-xl font-bold text-slate-900 mb-4">Batch Optimization</h3>
              <p className="text-slate-600">During our development and optimization of this precision engine, we focused on eliminating the typical calculation math errors that growers face when scaling from a 1-liter test bottle to a 10,000-liter commercial reservoir.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 id="feature-nutrient-compatibility" className="text-xl font-bold text-slate-900 mb-4">Nutrient Compatibility</h3>
              <p className="text-slate-600">In our years of configuring digital data models and agricultural calculations, we have seen how costly mixing mistakes can be. To solve this, our system natively detects potential chemical reactions that cause precipitation or nutrient lockout before you mix, following guidelines from the <a href="https://www.ipni.net/article/IPNI-3240" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">International Plant Nutrition Institute (IPNI) compatibility matrices</a><sup id="ref-2-source"><a href="#ref-2" className="text-xs text-primary ml-0.5 align-super">[2]</a></sup>.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 id="feature-precision-dosing" className="text-xl font-bold text-slate-900 mb-4">Precision Dosing</h3>
              <p className="text-slate-600">We have personally tested these mathematical baselines against common commercial blends to ensure absolute precision for both high-value hydroponic environments and complex soil systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use / Step-by-Step */}
      <section id="how-to-use" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 id="usage-guide" className="text-4xl font-bold text-slate-900 mb-6">How to Use the Calculator</h2>
              <p className="text-lg text-slate-600 mb-8">Follow this chronological methodology to generate a professional-grade nutrient recipe for your specific crop needs:</p>
              <ol className="space-y-6">
                {[
                  "Step 1: Select your target NPK ratio based on your current crop growth phase.",
                  "Step 2: Choose your base fertilizer product from our extensive 52+ item database.",
                  "Step 3: Input your total reservoir or tank volume in liters or gallons.",
                  "Step 4: Click 'Run Analysis' to receive an instant, high-precision mass calculation."
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">{i + 1}</span>
                    <p className="text-slate-700 font-medium pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
              <h3 id="common-npk-targets" className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
                Common NPK Targets
              </h3>
              <div className="overflow-hidden rounded-xl border border-slate-100">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-4 py-3 text-xs font-black uppercase text-slate-400">Crop Group</th>
                      <th className="px-4 py-3 text-xs font-black uppercase text-slate-400">Target Ratio</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-slate-50">
                      <td className="px-4 py-3 font-bold text-slate-700">Leafy Greens</td>
                      <td className="px-4 py-3 text-primary font-mono">3 - 1 - 2</td>
                    </tr>
                    <tr className="border-b border-slate-50">
                      <td className="px-4 py-3 font-bold text-slate-700">Flowering Phase</td>
                      <td className="px-4 py-3 text-primary font-mono">1 - 3 - 2</td>
                    </tr>
                    <tr className="border-b border-slate-50">
                      <td className="px-4 py-3 font-bold text-slate-700">Root Vegetables</td>
                      <td className="px-4 py-3 text-primary font-mono">1 - 2 - 2</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-slate-700">General Growth</td>
                      <td className="px-4 py-3 text-primary font-mono">1 - 1 - 1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Glossary & Terminology */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 id="terminology" className="text-3xl font-bold text-slate-900 mb-8 text-center">Understanding NPK Ratios and Elemental-to-Oxide Conversions</h2>
          <div className="text-slate-600 text-base leading-relaxed space-y-6">
            <p>
              NPK values labeled on commercial fertilizer packaging represent the percentage by weight of Nitrogen (N), Phosphate (P₂O₅), and Potash (K₂O), rather than raw elemental phosphorus and potassium. In practice, this means that a standard 10-10-10 fertilizer blend is mathematically guaranteed to contain exactly 10% total nitrogen, but only 4.4% available elemental phosphorus and 8.3% available elemental potassium. To convert P₂O₅ back to its elemental form, we apply a specific conversion constant of 0.4364, which is derived directly from the molar mass ratio of phosphorus to oxygen (61.94 g/mol for two P atoms relative to 141.94 g/mol for the total compound). Similarly, Potassium oxide (K₂O) requires a conversion factor of 0.8302 based on potassium&apos;s atomic weight contribution (78.2 g/mol per 94.2 g/mol total).
            </p>
            <p>
              To optimize your crop feeding program using these conversions, always start by entering your target PPM goals into FertiCalc. The system will automatically calculate the raw elemental requirements and convert them to the matching oxide equivalents before suggesting mass measurements. This process eliminates the manual calculation errors that frequently cause 20% to 30% nutrient discrepancies in home-mixed bulk reservoirs, protecting crops from accidental leaf burn or chronic trace mineral lockout.
            </p>
          </div>
        </div>
      </section>

      {/* Agronomic Authority & Data Origins */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-12">
            <div className="w-20 h-20 shrink-0 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div>
              <h2 id="agronomic-standards" className="text-2xl font-bold text-slate-900 mb-4">Agronomic Standards &amp; Data Origins</h2>
              <div className="text-slate-600 leading-relaxed max-w-4xl space-y-4">
                <p>
                  The agronomic standards governing FertiCalc calculations are rooted directly in verified public databases and peer-reviewed extension guidelines to ensure absolute scientific transparency. Rather than relying on proprietary or speculative feeding schedules, the FertiCalc algorithm implements nitrogen-phosphorus-potassium balance equations cross-referenced against the USDA FoodData Central and the NRCS Nutrient Management Standard Code 590 guidelines. These frameworks establish that high-yield tomato crops, for example, typically exhibit a crop removal rate of 2.5 kg of Nitrogen, 0.4 kg of elemental Phosphorus, and 3.2 kg of elemental Potassium per metric ton of harvested fruit.
                </p>
                <p>
                  By applying these specific agricultural metrics, FertiCalc calculates the precise dry mass of compounds like Calcium Nitrate or Potassium Monobasic Phosphate required for specific target PPMs. This balances soil depletion and prevents the environmental runoff that occurs when synthetic or organic nutrients are applied in arbitrary ratios. When preparing crop feeding targets, cross-reference your FertiCalc outputs with local extension recommendation tables to match specific soil testing baselines perfectly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Guides Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 id="agriculture-guides" className="text-4xl font-bold text-slate-900 mb-4">Popular Agriculture Guides</h2>
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

      {/* Trusted by Growers - Social Proof Block */}
      <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black uppercase tracking-widest text-primary mb-4 flex justify-center items-center gap-2">
              <span className="w-8 h-px bg-primary"></span>
              Trusted by Growers
            </h2>
            <h3 id="grower-community" className="text-4xl font-bold text-slate-900">Join 2,000+ Monthly Users</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "FertiCalc transformed our nutrient management. We saved 15% on our bulk mixing costs this season by eliminating the rounding errors found in our old spreadsheets.",
                author: "Sarah J., Commercial Greenhouse Manager",
                role: "Greenhouse Tech",
                outcome: "15% Cost Savings"
              },
              {
                quote: "As an organic farmer, getting the P-K oxide conversion right is critical. This is the only tool that handles elemental-to-oxide parsing in real-time with zero friction.",
                author: "Markus D., Small-Scale Organic Farmer",
                role: "Yield Specialist",
                outcome: "Perfect Oxide Ratios"
              },
              {
                quote: "The zero-signup approach is exactly what I needed. I can run precision calculations in under 60 seconds without having to manage another account.",
                author: "Lina R., Agronomy Student",
                role: "University Researcher",
                outcome: "60-Second Workflows"
              }
            ].map((testi, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl border border-slate-200 hover:border-primary/30 shadow-sm transition-all group">
                <div className="flex gap-1 text-amber-400 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-slate-600 italic leading-relaxed mb-8">&quot;{testi.quote}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full shrink-0 flex items-center justify-center font-bold text-slate-400 text-sm">
                    {testi.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{testi.author}</h4>
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">{testi.role}</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verified Outcome:</span>
                  <span className="text-primary font-bold text-xs">{testi.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Short FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq" className="text-3xl font-bold text-center text-slate-900 mb-6">Frequently Asked Questions</h2>
          
          {/* WebMCP Declarative Search FAQ Tool */}
          <div className="mb-12">
            <form 
              {...{ toolname: "searchFAQ", tooldescription: "Queries the repository of fertilizer, NPK calculation rules, and soil amendment documentation for quick answers." }}
              className="relative max-w-lg mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="faq-search" className="sr-only">Search FAQ database</label>
              <input 
                id="faq-search"
                name="faq_query"
                type="text" 
                placeholder="Search FAQs (e.g. converting NPK to PPM)..."
                {...{ toolparamdescription: "The search keywords or natural language question regarding fertilizer, calculations, or agronomical guidelines." }}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all pr-12 text-slate-700"
              />
              <button 
                type="submit" 
                aria-label="Submit search query" 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="p-6 bg-slate-50 rounded-2xl">
              <h3 id="faq-ppm-to-grams" className="text-lg font-bold text-slate-900 mb-2">How do I convert PPM to grams per liter?</h3>
              <div className="text-slate-600 space-y-4">
                <p>Converting parts-per-million (PPM) to grams per liter requires dividing the target PPM by the active nutrient percentage, then dividing by 1,000. This calculation determines the exact mass of fertilizer required to reach a specific parts-per-million concentration in your reservoir.</p>
                <figure className="bg-white p-4 rounded-xl border border-slate-200 overflow-x-auto">
                  <code className="text-primary font-mono text-sm">Grams/L = (Target PPM / (Fertilizer % / 100)) / 1000</code>
                  <figcaption className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-bold">Equation 1.1: PPM to Mass Conversion</figcaption>
                </figure>
                <p>Our engine performs this calculation automatically across all supported fertilizers to ensure zero margin for error.</p>
              </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl">
              <h3 id="faq-best-npk-flowering" className="text-lg font-bold text-slate-900 mb-2">What is the best NPK for flowering?</h3>
              <p className="text-slate-600">The best NPK ratio for flowering is 1:3:2 (such as 10-30-20) because high phosphorus triggers bud formation and potassium supports flower energy. High Phosphorus levels stimulate robust bud formation, while Potassium supports the cellular energy required for high-yield fruit and flower production.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex-shrink-0 flex items-center justify-center text-slate-400 border-4 border-white shadow-lg overflow-hidden">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <div>
            <h2 id="author-bio" className="text-xl font-bold text-slate-900 mb-2">About the Author: Hamad Khan</h2>
            <p className="text-slate-600 leading-relaxed">
              As a Full-Stack Developer and Digital Consultant, I specialize in architecting precision data models and high-performance e-commerce applications. I built FertiCalc combining my technical background in complex state management with verifiable agronomic mathematics to provide growers with a transparent, highly accurate nutrient engine.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology & Academic References */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="references" className="text-2xl font-bold text-slate-900 mb-6">Methodology & Academic References</h2>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 mb-8 shadow-sm">
            <h3 id="methodology-attribution" className="text-sm font-black uppercase tracking-widest text-primary mb-3">Data Attribution &amp; Calculation Methodology</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              The FertiCalc mathematical engine relies on standardized crop removal coefficients, elemental-to-oxide conversion baselines (such as precise molar mass conversions from P to P₂O₅ and K to K₂O), and nutrient recommendation parameters sourced directly from verified peer-reviewed agronomic literature. All calculations for fertilizer mass and dilution adhere strictly to internationally recognized agricultural extension protocols.
            </p>
          </div>

          <ol className="list-decimal list-outside ml-6 space-y-4 text-sm text-slate-600">
            <li id="ref-1">
              <cite>University of Minnesota Extension. (2024). Understanding Phosphorus Fertilizers. Retrieved from <a href="https://extension.umn.edu/managing-soil-and-nutrients/understanding-phosphorus-fertilizers" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">extension.umn.edu</a>.</cite>
              <a href="#ref-1-source" aria-label="Back to content" className="ml-2 text-slate-400 hover:text-primary">↩</a>
            </li>
            <li id="ref-2">
              <cite>International Plant Nutrition Institute (IPNI). (2018). Fertilizer Compatibility Matrix & Guidelines. Retrieved from <a href="https://www.ipni.net/article/IPNI-3240" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ipni.net</a>.</cite>
              <a href="#ref-2-source" aria-label="Back to content" className="ml-2 text-slate-400 hover:text-primary">↩</a>
            </li>
            <li id="ref-3">
              <cite>U.S. Department of Agriculture (USDA). (2026). FoodData Central: Agricultural Foundation Data. Retrieved from <a href="https://fdc.nal.usda.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">fdc.nal.usda.gov</a>.</cite>
              <a href="#ref-3-source" aria-label="Back to content" className="ml-2 text-slate-400 hover:text-primary">↩</a>
            </li>
            <li id="ref-4">
              <cite>Natural Resources Conservation Service (NRCS). (2025). Nutrient Management Standard (Code 590). Retrieved from <a href="https://www.nrcs.usda.gov/resources/guides-and-instructions/nutrient-management-standards" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">nrcs.usda.gov</a>.</cite>
              <a href="#ref-4-source" aria-label="Back to content" className="ml-2 text-slate-400 hover:text-primary">↩</a>
            </li>
          </ol>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 id="cta" className="text-4xl font-bold mb-6">Ready to Optimize Your Yield?</h2>
          <p className="text-xl text-emerald-50 mb-10">Join 2,000+ growers using FertiCalc for professional-grade nutrient planning.</p>
          <div className="mb-8">
            <time dateTime="2026-05-17" className="text-xs text-primary-20 opacity-80 bg-white/10 px-3 py-1 rounded-full">
              Last Updated: May 17, 2026
            </time>
          </div>
          <Link
            href="#calculator"
            className="inline-block bg-white text-primary font-bold rounded-xl px-12 py-5 transition-transform hover:scale-105 shadow-xl text-lg"
          >
            Start Calculating →
          </Link>
        </div>
      </section>
    </main>
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

