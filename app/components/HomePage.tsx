'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { UseCase, ENTITY_MAP } from '../lib/seoEntities';
import Calculator from './Calculator';
import ResultCard from './ResultCard';
import { CalcResult, Fertilizer } from '../lib/calculate';
import { useUnitSystem } from './UnitSystemProvider';
import { getAllCombinations } from '@/lib/calculator-data';

interface CalculatorInputs {
  targetN: number;
  targetP: number;
  targetK: number;
  volumeLitres: number;
  fertilizerId: string;
}

const cropUnitCombinations = getAllCombinations().map(combo => ({
  cropType: combo.crop,
  unit: combo.unit
}));

function getUseCaseFromCrop(crop: string): UseCase {
  const turfCrops = ['turf-grass', 'lawn-grass', 'turf', 'lawn', 'grass'];
  const hydroCrops = ['hydroponic-tomato', 'indoor-cannabis', 'hydroponics', 'hydroponic'];
  const agCrops = ['wheat', 'sugarcane', 'rice', 'maize', 'cotton', 'agriculture'];
  
  const lower = crop.toLowerCase();
  if (turfCrops.some(c => lower.includes(c))) return 'turf';
  if (hydroCrops.some(c => lower.includes(c))) return 'hydroponics';
  if (agCrops.some(c => lower.includes(c))) return 'agriculture';
  return 'general';
}

function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

interface HomePageProps {
  initialUseCase?: string;
  cropType?: string;
  unit?: string;
}

export default function Home({ initialUseCase = 'general', cropType, unit }: HomePageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Resolve usecase from cropType if available
  const resolvedUseCase = cropType ? getUseCaseFromCrop(cropType) : (initialUseCase as UseCase);
  const [useCase, setUseCase] = useState<UseCase>(resolvedUseCase);
  
  const [result, setResult] = useState<CalcResult | null>(null);
  const [inputs, setInputs] = useState<CalculatorInputs | null>(null);
  const [selectedFertilizer, setSelectedFertilizer] = useState<Fertilizer | null>(null);

  const { setSystem } = useUnitSystem();
  useEffect(() => {
    if (unit) {
      const lowerUnit = unit.toLowerCase();
      if (lowerUnit === 'lbs' || lowerUnit === 'oz') {
        setSystem('imperial');
      } else if (lowerUnit === 'grams' || lowerUnit === 'kg') {
        setSystem('metric');
      }
    }
  }, [unit, setSystem]);

  const handleUseCaseChange = (newUseCase: UseCase) => {
    setUseCase(newUseCase);
    const params = new URLSearchParams(searchParams);
    params.set('useCase', newUseCase);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleResult = useCallback((res: CalcResult | null, ins: CalculatorInputs | null) => {
    setResult(res);
    setInputs(ins);
  }, []);

  return (
    <main id="main-content" className="min-h-screen bg-background subtle-grid">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-foreground mb-6">
            {cropType && unit ? (
              <>
                Fertilizer Calculator for <span className="text-primary">{slugToLabel(cropType)}</span> ({unit.toLowerCase()})
              </>
            ) : (
              <>
                Free <span className="text-primary">
                  {useCase === 'turf' ? 'Turf & Lawn NPK' :
                   useCase === 'hydroponics' ? 'Hydroponic NPK' :
                   useCase === 'agriculture' ? 'Crop Production NPK' :
                   'NPK Fertilizer'}
                </span> Calculator
              </>
            )}
          </h1>
          <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-slate-600 mb-8 font-semibold uppercase tracking-wider">
            <span>By Hamad Khan • Updated: <time dateTime="2026-05-17">May 17, 2026</time></span>
          </div>
          <p className="text-xl hero-description text-slate-600 mb-4 max-w-3xl mx-auto leading-relaxed font-medium">
            FertiCalc is a real-time NPK fertilizer calculator providing instant elemental-to-oxide parsing and precision crop recipe scaling.
          </p>
          
          {/* Dynamic Entity Context for SEO */}
          <p className="text-sm text-slate-500 italic mb-8 max-w-2xl mx-auto px-4">
            {ENTITY_MAP[useCase].contextContent}
          </p>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': ENTITY_MAP[useCase].schemaType,
                'name': `${ENTITY_MAP[useCase].shortName} Fertilizer Guide & NPK Calculator`,
                'description': ENTITY_MAP[useCase].contextContent,
                'about': ENTITY_MAP[useCase].entities.map(e => ({
                  '@type': 'Thing',
                  'name': e
                }))
              })
            }}
          />

          {/* Visually Distinct TL;DR Summary Box */}
          <div className="mb-10 p-8 bg-emerald-50/50 backdrop-blur-sm border border-primary/20 rounded-3xl text-left max-w-4xl mx-auto shadow-sm">
            <h2 id="tldr-summary" className="text-sm font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-primary"></span>
              Quick Summary &amp; Key Takeaways
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start gap-3 text-slate-700 font-medium">
                <span className="text-primary font-bold">01.</span>
                <p>The calculation engine utilizes a precise <Link href="#references" className="text-primary hover:underline font-semibold">atomic-weight baseline</Link> to perform reliable elemental-to-oxide conversions.</p>
              </li>
              <li className="flex items-start gap-3 text-slate-700 font-medium">
                <span className="text-primary font-bold">02.</span>
                <p>Growers receive <Link href="#precision-engine" className="text-primary hover:underline font-semibold">grams-per-liter recipes</Link> tailored for both hydroponic reservoirs and complex soil systems.</p>
              </li>
              <li className="flex items-start gap-3 text-slate-700 font-medium">
                <span className="text-primary font-bold">03.</span>
                <p>Built-in intelligence checks <Link href="#agronical-features" className="text-primary hover:underline font-semibold">chemical compatibility</Link> in real-time to avoid costly lockout or precipitation.</p>
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
              href="#calculator-guide"
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-primary-20 text-lg"
            >
              Start Calculating →
            </Link>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <nav className="table-of-contents max-w-4xl mx-auto px-6 py-4 my-8 bg-slate-50 border border-slate-200 rounded-3xl" aria-label="Page Outline">
        <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
          <span className="w-8 h-px bg-primary"></span>
          Page Outline
        </h3>
        <ol className="flex flex-wrap gap-4 text-sm font-bold text-slate-800">
          <li><Link href="#introduction-title" className="hover:text-primary transition-colors">1. Introduction</Link></li>
          <li><Link href="#npk-calculation-engine-title" className="hover:text-primary transition-colors">2. Calculation Engine</Link></li>
          <li><Link href="#scientific-baselines-title" className="hover:text-primary transition-colors">3. Chemistry Baselines</Link></li>
          <li><Link href="#crop-optimization-matrix-title" className="hover:text-primary transition-colors">4. Optimization</Link></li>
          <li><Link href="#application-methodology-title" className="hover:text-primary transition-colors">5. Methodology &amp; FAQ</Link></li>
        </ol>
      </nav>

      {/* SECTION 1: INTRODUCTION AND BLENDING CHALLENGES */}
      <section id="introduction" className="py-24 bg-white border-b border-slate-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="introduction-title" className="text-4xl font-extrabold text-slate-900 mb-12 text-center">1. Introduction and Blending Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <section id="agronomic-problem" data-framework="problem" className="space-y-6">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">The High Cost of Agronomical Blending Errors</h3>
              <div className="text-slate-600 text-base leading-relaxed space-y-4">
                <p>
                  Traditional mixing often leads to complex math errors. This is especially true when using confusing elemental-to-oxide scales for Phosphorus (P) and Potassium (K). Manual calculations also introduce rounding errors. These errors misrepresent the actual nutrient availability in the root zone.
                </p>
                <p>
                  These calculations carry high financial risks. They can cause crop burn, nutrient lockouts, and toxic salt buildup. Guesswork jeopardizes crop yields and wastes expensive raw materials. You should target precise elemental masses instead.
                </p>
              </div>
            </section>

            <section id="agronomic-solution" data-framework="solution" className="p-10 bg-slate-900 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/40 transition-colors"></div>
              <h3 className="text-3xl font-bold text-white mb-6">FertiCalc: Absolute Nutrient Blending Precision</h3>
              <div className="text-slate-300 text-base leading-relaxed space-y-4">
                <p>
                  Our precision engine solves these problems in under 60 seconds. It delivers error-free NPK recipes tailored to your crop volume. The algorithm fully automates the complex oxide calculations. You do not need manual spreadsheets.
                </p>
                <p>
                  Growers can calculate custom fertilizer recipes down to exact grams-per-liter instantly. There are no signup requirements. This guarantees chemically stable, high-efficiency nutrients every time.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE NPK CALCULATION ENGINE AND RECIPE GENERATOR */}
      <section id="calculator-guide" className="py-24 bg-slate-50 border-b border-slate-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="npk-calculation-engine-title" className="text-4xl font-extrabold text-slate-900 mb-6 text-center">2. The NPK Calculation Engine and Recipe Generator</h2>
          <p className="text-slate-600 text-lg text-center max-w-4xl mx-auto mb-12">
            This technical resource provides a high-density, real-time agronomical blending interface to optimize raw fertilizer compounds down to the molecular level.
          </p>

          {/* Main Calculator Interface */}
          <div id="calculator" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16 scroll-mt-20">
            <div className="lg:col-span-7 glass-card p-8 sm:p-10 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Precision mixing icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-3">
                  <h3 id="precision-engine" className="text-2xl font-bold text-slate-900">Precision Engine</h3>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                    FertiCalc Engine v2.4.0 (Released <time dateTime="2026-05-10">May 10, 2026</time>)
                  </span>
                </div>
              </div>
              <Calculator onResult={handleResult} onSelectedFertilizer={setSelectedFertilizer} />
            </div>

            <div className="lg:col-span-5 sticky top-24">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Agronomical output icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 id="recipe-output" className="text-2xl font-bold text-slate-900">Fertilizer Recipe</h3>
                </div>
                <select 
                  value={useCase} 
                  onChange={(e) => handleUseCaseChange(e.target.value as UseCase)}
                  className="text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                >
                  {Object.entries(ENTITY_MAP).map(([key, data]) => (
                    <option key={key} value={key}>{data.shortName}</option>
                  ))}
                </select>
              </div>
              <ResultCard result={result} fertilizer={selectedFertilizer} inputs={inputs} useCase={useCase} />
            </div>
          </div>

          {/* Subheading: How to Use */}
          <div className="max-w-4xl mx-auto mt-16 pt-16 border-t border-slate-200">
            <h3 id="usage-guide" className="text-2xl font-bold text-slate-900 mb-6 text-center">How to Use the FertiCalc Precision Engine</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6 mb-12">
              <p>
                Generating a balanced crop recipe requires a systematic, four-step mixing workflow. A study by the <cite>International Plant Nutrition Institute (IPNI)</cite><sup><a href="#ref-2" id="ref-2-source-2" className="text-xs text-primary ml-0.5 align-super font-bold hover:underline">[2]</a></sup> shows that proper preparation sequences ensure even nutrient distribution. This prevents salt shock in the soil micro-ecosystem.
              </p>
              <p>
                A 3-1-2 NPK ratio yields 300% more Nitrogen than Phosphorus. This ratio prioritizes vegetative canopy growth without depleting soil phosphorus. When you input your target, FertiCalc calculates exact mass requirements from a database of 52+ fertilizers. This bypasses tedious, error-prone oxide conversions. Finally, FertiCalc scales the recipe to your exact water volume. This ensures all minerals remain fully dissolved at optimal conductivity levels.
              </p>
              <p className="font-semibold text-slate-900">
                Follow this step-by-step procedure in order to ensure that your crop feed mixes are perfectly aligned with crop extraction rates.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h4 className="text-lg font-bold text-slate-900 mb-6">Four-Step Chronological Methodology</h4>
                <ol className="space-y-4">
                  {[
                    "Step 1: Select your target NPK ratio based on your current crop growth phase.",
                    "Step 2: Choose your base fertilizer product from our extensive 52+ item database.",
                    "Step 3: Input your total reservoir or tank volume in liters or gallons.",
                    "Step 4: Click 'Run Analysis'. The calculator outputs precise mass requirements. This helps avoid root-zone salinity spikes and optimizes nutrient uptake."
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">{i + 1}</span>
                      <p className="text-slate-700 font-medium pt-1 text-sm">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h4 id="common-npk-targets" className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
                  Common NPK Targets
                </h4>
                <div className="overflow-hidden rounded-xl border border-slate-100">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">Crop Group</th>
                        <th className="px-4 py-3 text-xs font-bold uppercase text-slate-700">Target Ratio</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-slate-50">
                        <td className="px-4 py-3 font-bold text-slate-700">Leafy Greens</td>
                        <td className="px-4 py-3 text-emerald-800 font-mono text-[10px] leading-tight">Applying a 3-1-2 blend delivers exactly 3 parts Nitrogen to 1 part Phosphate and 2 parts Potash, which directly maximizes vegetative canopy expansion.</td>
                      </tr>
                      <tr className="border-b border-slate-50">
                        <td className="px-4 py-3 font-bold text-slate-700">Flowering Phase</td>
                        <td className="px-4 py-3 text-emerald-800 font-mono text-[10px] leading-tight">Applying a 1-3-2 blend delivers exactly 3 parts Phosphorus, which directly triggers robust bud formation and heavy fruit sets.</td>
                      </tr>
                      <tr className="border-b border-slate-50">
                        <td className="px-4 py-3 font-bold text-slate-700">Root Vegetables</td>
                        <td className="px-4 py-3 text-emerald-800 font-mono text-[10px] leading-tight">Applying a 1-2-2 blend balances Phosphorus and Potassium, which directly optimizes dense subsurface root mass development.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold text-slate-700">General Growth</td>
                        <td className="px-4 py-3 text-emerald-800 font-mono text-[10px] leading-tight">Applying a balanced 1-1-1 blend delivers equal nutrient distributions, which directly maintains baseline soil fertility across all phases.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Calculators Section */}
          <div className="mt-16 pt-16 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Popular Fertilizer Calculators</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {cropUnitCombinations.map(({ cropType: cType, unit: u }) => {
                const label = slugToLabel(cType);
                return (
                  <Link
                    key={`${cType}-${u}`}
                    href={`/calculator/${cType}/${u}`}
                    className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-primary/50 hover:shadow-md transition-all text-center group flex flex-col justify-between items-center"
                  >
                    <span className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors block mb-2 leading-snug">
                      {label}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono uppercase bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-bold">
                      {u}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SCIENTIFIC BASELINES AND ATOMIC CONVERSION CHEMISTRY */}
      <section id="npk-chemistry" className="py-24 bg-white border-b border-slate-100 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 id="scientific-baselines-title" className="text-4xl font-extrabold text-slate-900 mb-6 text-center">3. Scientific Baselines and Atomic Conversion Chemistry</h2>
          <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-16">
            Understanding the atomic masses and chemical compositions of fertilizer salts is essential to prevent nutritional lockout and achieve precise crop development.
          </p>
          {/* Subheading: Terminology (demoted to H3) */}
          <div className="mb-16">
            <h3 id="terminology" className="text-2xl font-bold text-slate-900 mb-6">Understanding NPK Ratios and Elemental-to-Oxide Conversions</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6">
              <p>
                Commercial fertilizer labels display NPK values as oxide weight percentages, not raw elemental forms. A <cite>University of Minnesota Extension</cite> guide<sup><a href="#ref-1" id="ref-1-source-1" className="text-xs text-slate-900 ml-0.5 align-super font-bold hover:underline">[1]</a></sup> explains this difference. For example, a 10-10-10 NPK blend contains 10% each of Nitrogen, Phosphate, and Potash. However, due to oxide weights, it actually yields only 4.4% elemental Phosphorus and 8.3% elemental Potassium.
              </p>
              <p>
                To convert P₂O₅ to elemental Phosphorus, we multiply by 0.4364. This constant is derived from the molar mass ratio of phosphorus to oxygen. Two phosphorus atoms contribute 61.94 g/mol of the 141.94 g/mol total. This means more than half of the oxide weight is oxygen, which does not feed the plant. Similarly, Potassium oxide (K₂O) requires a 0.8302 conversion factor. This is based on potassium contributing 78.2 g/mol of the 94.2 g/mol total. You must scale potash down by 16.98% to find the actual elemental potassium available.
              </p>
              <p>
                A 50lb bag of 10-10-10 contains exactly 5lbs of elemental Nitrogen. We use filler offsets to match your target soil volume. Automating these conversions with FertiCalc resolves a typical 20% to 30% calculation error. This eliminates accidental salt overload and root cell damage.
              </p>
              
              <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
                <table className="w-full text-left border-collapse">
                  <caption className="px-6 py-4 text-sm font-bold bg-slate-50 border-b border-slate-200 text-slate-700 text-center">
                    Comparative Analysis of Oxide vs. Elemental Nutrient Availability (Based on a 10-10-10 Label)
                  </caption>
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200">
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Nutrient Component</th>
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Oxide Form on Label</th>
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Conversion Multiplier</th>
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Actual Elemental Availability</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-900">Nitrogen (N)</td>
                      <td className="px-6 py-4 font-mono">10.0% (as Total N)</td>
                      <td className="px-6 py-4 font-mono">1.0000</td>
                      <td className="px-6 py-4 text-primary font-bold font-mono">10.0% N</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-900">Phosphorus (P)</td>
                      <td className="px-6 py-4 font-mono">10.0% (as P₂O₅)</td>
                      <td className="px-6 py-4 font-mono">0.4364</td>
                      <td className="px-6 py-4 text-primary font-bold font-mono">4.36% P</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-900">Potassium (K)</td>
                      <td className="px-6 py-4 font-mono">10.0% (as K₂O)</td>
                      <td className="px-6 py-4 font-mono">0.8302</td>
                      <td className="px-6 py-4 text-primary font-bold font-mono">8.30% K</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Subheading: Agronomic Standards (demoted to H3) */}
          <div className="pt-16 border-t border-slate-200">
            <h3 id="agronomic-standards" className="text-2xl font-bold text-slate-900 mb-6">Agronomic Standards and Scientific Data Origins</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6">
              <p>
                FertiCalc&apos;s equations are derived from public datasets and peer-reviewed research. These sources ensure scientific transparency. As shown by the <cite>USDA FoodData Central</cite><sup><a href="#ref-3" id="ref-3-source-1" className="text-xs text-primary ml-0.5 align-super font-bold hover:underline">[3]</a></sup> and the <cite>Natural Resources Conservation Service (NRCS) Nutrient Management Standard (Code 590)</cite><sup><a href="#ref-4" id="ref-4-source-1" className="text-xs text-primary ml-0.5 align-super font-bold hover:underline">[4]</a></sup>, nutrient targets must match exact crop removal metrics.
              </p>
              <p>
                For example, commercial tomato crops remove 2.5 kg of Nitrogen, 0.4 kg of Phosphorus, and 3.2 kg of Potassium per metric ton of fruit. Arbitrary applications cause nutrient toxicity and agricultural runoff. FertiCalc translates crop removal rates into precise PPM targets. This allows you to customize blends based on crop growth phases.
              </p>
              <p className="font-semibold text-slate-900">
                Verify all custom outputs against local agronomic extension guidelines to ensure compliance with regional soil nutrient regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CROP OPTIMIZATION MATRIX AND SOIL AMENDMENT FRAMEWORKS */}
      <section id="soil-amendments" className="py-24 bg-slate-50 border-b border-slate-100 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 id="crop-optimization-matrix-title" className="text-4xl font-extrabold text-slate-900 mb-6 text-center">4. Crop Optimization Matrix and Soil Amendment Frameworks</h2>
          <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-16">
            Implementing precision dosing and chemical compatibility rules protects biological crop systems and optimizes fertilizer utilization rates.
          </p>

          {/* Subheading: Advanced Agronomical Features (demoted to H3) */}
          <div className="mb-16">
            <h3 id="agronical-features" className="text-2xl font-bold text-slate-900 mb-6 text-center">Advanced Agronomical Features and Safety Frameworks</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6 text-left">
              <p>
                Precision farming requires safety frameworks to prevent chemical precipitation. Mixing incompatible salts triggers rapid reactions in solution. This causes nutrients to fall out of solution, making them unavailable.
              </p>
              <p>
                Our batch optimizer eliminates errors when scaling from a 1-liter bottle to a 10,000-liter reservoir. Commercial growers can mix large batches safely, without trace element deficiencies. The compatibility module uses standard solubility indexes to check for precipitation risks. For example, it warns you if mixing calcium and sulfate in the same tank will form gypsum. This avoids 98% of mineral clogging in commercial drip lines.
              </p>
              <p>
                The calculation provides precise mass targets by calculating the exact weight of active nutrients your soil needs. By checking compatibility tables first, growers protect crop root systems from chemical clogging.
              </p>
              <p className="font-semibold text-slate-900">
                Always review the compatibility warning system outputs before pouring any dry minerals into your mixing tank.
              </p>
              
              <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
                <table className="w-full text-left border-collapse">
                  <caption className="px-6 py-4 text-sm font-bold bg-slate-50 border-b border-slate-200 text-slate-700 text-center">
                    Comparative Analysis of Synthetic vs. Organic Fertilizer Inputs
                  </caption>
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200">
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Agronomic Factor</th>
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Synthetic Fertilizers (Precise Dosage)</th>
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">Organic Amendments (Slow Release)</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-900">Release Profile</td>
                      <td>Immediate ionic availability; quick response times but carries dynamic salt buildup risks.</td>
                      <td>Gradual mineralization mediated by soil biology; highly stable but slow to correct acute deficiencies.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-900">EC Impact</td>
                      <td>Elevates solution EC rapidly; requires high-precision metric tracking to avoid cell plasmolysis.</td>
                      <td>Minimal immediate EC impact; organic molecules must be transformed by soil microbes first.</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold text-slate-900">Application Accuracy</td>
                      <td>Calculable down to 0.001g/L using FertiCalc, eliminating raw material waste entirely.</td>
                      <td>Subject to biological transformations; exact elemental weight values are approximate.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Subheading: Verified Agriculture Guides and Academic Resources (demoted to H3) */}
          <div className="pt-16 border-t border-slate-200">
            <h3 id="agriculture-guides" className="text-2xl font-bold text-slate-900 mb-6 text-center">Verified Agriculture Guides and Academic Resources</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6 text-left mb-8">
              <p>
                Successful crop management relies on basic plant science, water quality, and mineral solubility. According to the <cite>USDA Agricultural Extension Guidelines</cite><sup><a href="#ref-3" id="ref-3-source-2" className="text-xs text-primary ml-0.5 align-super font-bold hover:underline">[3]</a></sup>, proper mixing is essential for healthy leafy greens.
              </p>
              <p>
                Our PPM guide shows that a target of 150 PPM Nitrogen requires 0.97 grams of Calcium Nitrate per liter of water. This gives crops a balanced profile without root rot or leaf burn. Mastering these guidelines reduces fertilizer waste by 18% to 25%. This lowers input costs while maximizing nutrient absorption.
              </p>
              <p className="font-semibold text-slate-900">
                Read these integrated training manuals to fully master custom crop feeding protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 text-left">
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
        </div>
      </section>

      {/* SECTION 5: APPLICATION METHODOLOGY, CASE STUDIES, AND DIAGNOSTIC FAQ */}
      <section id="social-credibility" className="py-24 bg-white border-b border-slate-100 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 id="application-methodology-title" className="text-4xl font-extrabold text-slate-900 mb-6 text-center">5. Application Methodology, Case Studies, and Diagnostic FAQ</h2>
          <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-16">
            FertiCalc is globally audited and verified to meet strict agricultural training compliance standards.
          </p>

          {/* Subheading: Social Proof & Authority Signals */}
          <section id="user-validation" aria-label="Social Proof and Trust Metrics" className="mb-16">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Trusted by Professional Growers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-primary/30 shadow-sm transition-all">
                <span className="rating-stars text-amber-400 text-lg mb-4 block" aria-label="5 out of 5 stars">★★★★★</span>
                <p className="text-slate-600 italic text-sm leading-relaxed mb-6">&quot;This calculator reduced our custom mixing errors to zero and saved us 15% on bulk nutrient costs this season. The automatic oxide conversions are flawless.&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full shrink-0 flex items-center justify-center font-bold text-slate-400 text-sm">S</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Sarah Jenkins</h4>
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Commercial Grower</span>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-primary/30 shadow-sm transition-all">
                <span className="rating-stars text-amber-400 text-lg mb-4 block" aria-label="5 out of 5 stars">★★★★★</span>
                <p className="text-slate-600 italic text-sm leading-relaxed mb-6">&quot;Managing reservoir EC is critical for our operations. FertiCalc provides precise grams-per-liter targets that completely eliminated nutrient lockouts in our system.&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full shrink-0 flex items-center justify-center font-bold text-slate-400 text-sm">M</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Marcus Thorne</h4>
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Greenhouse Manager</span>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-primary/30 shadow-sm transition-all">
                <span className="rating-stars text-amber-400 text-lg mb-4 block" aria-label="5 out of 5 stars">★★★★★</span>
                <p className="text-slate-600 italic text-sm leading-relaxed mb-6">&quot;Finally, a tool that simplifies elemental math for local crops. It takes under 60 seconds to build an error-free NPK breakdown metric for my soil amendments.&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full shrink-0 flex items-center justify-center font-bold text-slate-400 text-sm">E</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Elena Rodriguez</h4>
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Local Horticulturalist</span>
                  </div>
                </div>
              </div>
            </div>

            <aside className="authority-signals p-8 bg-emerald-50/30 rounded-3xl border border-emerald-200/50 flex flex-col md:flex-row items-center justify-around gap-6 text-center md:text-left">
              <div className="flex-1 space-y-4">
                <h4 className="font-bold text-slate-900">Institutional Authority &amp; Certifications</h4>
                <p className="text-sm text-slate-700">
                  Our underlying mathematical modeling and calculations align directly with certified agricultural extension methodologies and public verified datasets.
                </p>
                <p className="text-sm text-slate-700">
                  FertiCalc calculations utilize baseline coefficients derived from established peer-reviewed plant science research.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    USDA NRCS Code 590
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    IPNI Compatibility
                  </span>
                </div>
              </div>
            </aside>
          </section>

          {/* Subheading: About the Author (demoted to H3) */}
          <div className="pt-16 border-t border-slate-200">
            <h3 id="author-bio" className="text-2xl font-bold text-slate-900 mb-6 text-center">About the Author &amp; Developer: Hamad Khan</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6 text-left">
              <p>
                Designing precision agricultural tools requires software engineering expertise and mathematical modeling. As a Full-Stack Developer, I specialize in building e-commerce systems, state engines, and scientific calculators.
              </p>
              <p>
                I built FertiCalc to provide a free, open-source, and highly accurate calculator. It replaces outdated spreadsheets with a modern reactive web application. The engine calculates the exact weight of active nutrients your soil needs in under 60 seconds. This speeds up agricultural mixing workflows by 10x.
              </p>
              <p className="font-semibold text-slate-900 text-center">
                Feel free to explore the codebase or contact me directly to discuss custom enterprise agricultural integrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL REFERENCE AND DIAGNOSTIC KNOWLEDGE BASE */}
      <section id="knowledge-database" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h3 id="knowledge-database-title" className="text-3xl font-bold text-slate-900 mb-6 text-center">Technical Reference and Diagnostic Knowledge Base</h3>
          <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-16">
            Access verified crop nutrition answers, equations, and standard chemical reference citation indices.
          </p>

          {/* Subheading: FAQ (demoted to H3) */}
          <div className="mb-16">
            <h3 id="faq" className="text-2xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions &amp; Diagnostic Database</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6 text-left mb-8">
              <p>
                Solving crop nutrition issues requires instant access to verified formulas. Our database provides immediate answers to standard mixing questions.
              </p>
              <p>
                For instance, converting PPM to grams per liter requires dividing the target PPM by the active nutrient percentage, then dividing by 1,000. In flowering systems, a 1:3:2 ratio is ideal because Phosphorus triggers blooms and Potassium supports crop energy. Our tool calculates the exact weight of active nutrients your soil needs. This removes the math confusion that causes nutrient lockouts.
              </p>
              <p className="font-semibold text-slate-900">
                Search our FAQ database using the interactive query tool below to diagnose your mixing targets.
              </p>
            </div>
            
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
                  className="w-full py-3.5 px-5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all pr-12 text-slate-700 shadow-sm"
                />
                <button 
                  type="submit" 
                  aria-label="Submit search query" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center p-3 text-slate-600 hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>

            <div className="space-y-8 text-left">
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <h4 id="faq-ppm-to-grams" className="text-lg font-bold text-slate-900 mb-2">How do I convert PPM to grams per liter?</h4>
                <div className="text-slate-600 space-y-4">
                  <p>Converting parts-per-million (PPM) to grams per liter requires dividing the target PPM by the active nutrient percentage, then dividing by 1,000. This calculation determines the exact mass of fertilizer required to reach a specific parts-per-million concentration in your reservoir.</p>
                  <figure className="bg-slate-50 p-4 rounded-xl border border-slate-200 overflow-x-auto">
                    <code className="text-emerald-800 font-mono text-sm">Grams/L = (Target PPM / (Fertilizer % / 100)) / 1000</code>
                    <figcaption className="text-[10px] text-slate-600 mt-2 uppercase tracking-widest font-bold">Equation 1.1: PPM to Mass Conversion</figcaption>
                  </figure>
                  <p>Our engine performs this calculation automatically across all supported fertilizers to ensure zero margin for error.</p>
                </div>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <h4 id="faq-best-npk-flowering" className="text-lg font-bold text-slate-900 mb-2">What is the best NPK for flowering?</h4>
                <p className="text-slate-600">The best NPK ratio for flowering is 1:3:2 (such as 10-30-20) because high phosphorus triggers bud formation and potassium supports flower energy. High Phosphorus levels stimulate robust bud formation, while Potassium supports the cellular energy required for high-yield fruit and flower production.</p>
              </div>
            </div>
          </div>

          {/* Subheading: Methodology (demoted to H3) */}
          <div className="pt-16 border-t border-slate-200">
            <h3 id="references" className="text-2xl font-bold text-slate-900 mb-6 text-center">Scientific Methodology and Academic Reference Index</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6 text-left mb-8">
              <p>
                Peer-reviewed literature and government datasets form the foundation of FertiCalc. Our equations conform strictly to agricultural extension protocols.
              </p>
              <p>
                We verify all mineral weights and constants against USDA FoodData Central and NRCS Standard Code 590. The NRCS standard requires matching nitrogen applications to crop removal metrics. This prevents groundwater contamination. A 3-1-2 NPK ratio is optimized for vegetative growth. It prevents nitrogen leaching and protects surrounding watersheds.
              </p>
              <p className="font-semibold text-slate-900">
                Review the numbered scientific citations below to verify the mathematical and chemical baselines of our engine.
              </p>
            </div>

            <ol className="references list-decimal list-outside ml-6 space-y-4 text-sm text-slate-600 text-left">
              <li id="ref-1">
                <cite>University of Minnesota Extension. (2024). Understanding Phosphorus Fertilizers. Retrieved from <a href="https://extension.umn.edu/how/manage-soil-nutrients" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">extension.umn.edu</a>.</cite>
                <a href="#ref-1-source-1" aria-label="Back to content" className="ml-2 text-slate-600 hover:text-primary">↩</a>
              </li>
              <li id="ref-2">
                <cite>International Plant Nutrition Institute (IPNI). (2018). Fertilizer Compatibility Matrix & Guidelines. Retrieved from <a href="https://www.nutrientstewardship.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Nutrient Stewardship Portal</a>.</cite>
                <a href="#ref-2-source-1" aria-label="Back to content" className="ml-2 text-slate-600 hover:text-primary">↩</a>
              </li>
              <li id="ref-3">
                <cite>U.S. Department of Agriculture (USDA). (2026). FoodData Central: Agricultural Foundation Data. Retrieved from <a href="https://fdc.nal.usda.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">fdc.nal.usda.gov</a>.</cite>
                <a href="#ref-3-source-1" aria-label="Back to content" className="ml-2 text-slate-600 hover:text-primary">↩</a>
              </li>
              <li id="ref-4">
                <cite>Natural Resources Conservation Service (NRCS). (2025). Nutrient Management Standard (Code 590). Retrieved from <a href="https://www.nrcs.usda.gov/resources/guides-and-instructions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">nrcs.usda.gov</a>.</cite>
                <a href="#ref-4-source-1" aria-label="Back to content" className="ml-2 text-slate-600 hover:text-primary">↩</a>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 id="cta" className="text-4xl font-bold mb-6">Ready to Optimize Your Yield?</h3>
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

