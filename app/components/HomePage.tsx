'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { UseCase, ENTITY_MAP } from '../lib/seoEntities';
import Calculator from './Calculator';
import ResultCard from './ResultCard';
import { CalcResult, Fertilizer, calcAmount } from '../lib/calculate';
import { useUnitSystem } from './UnitSystemProvider';
import fertilizersData from '../data/fertilizers.json';

interface CalculatorInputs {
  targetN: number;
  targetP: number;
  targetK: number;
  volumeLitres: number;
  fertilizerId: string;
}

const DEFAULT_INPUTS: CalculatorInputs = {
  targetN: 0.1,
  targetP: 0,
  targetK: 0,
  volumeLitres: 1,
  fertilizerId: '66',
};
const DEFAULT_FERTILIZER = fertilizersData.find((fertilizer) => fertilizer.id === DEFAULT_INPUTS.fertilizerId) as Fertilizer | undefined;
const DEFAULT_RESULT = DEFAULT_FERTILIZER
  ? calcAmount({ ...DEFAULT_INPUTS, fertilizer: DEFAULT_FERTILIZER })
  : null;

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

  // Resolve usecase from cropType if available
  const resolvedUseCase = cropType ? getUseCaseFromCrop(cropType) : (initialUseCase as UseCase);
  const [useCase, setUseCase] = useState<UseCase>(resolvedUseCase);
  
  const [result, setResult] = useState<CalcResult | null>(DEFAULT_RESULT);
  const [inputs, setInputs] = useState<CalculatorInputs | null>(DEFAULT_INPUTS);
  const [selectedFertilizer, setSelectedFertilizer] = useState<Fertilizer | null>(DEFAULT_FERTILIZER ?? null);

  const { setSystem } = useUnitSystem();
  useEffect(() => {
    const queryUseCase = new URLSearchParams(window.location.search).get('useCase');
    if (queryUseCase && queryUseCase in ENTITY_MAP) {
      setUseCase(queryUseCase as UseCase);
    }
  }, []);

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
    const params = new URLSearchParams(window.location.search);
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
            {cropType ? (
              <>
                Fertilizer Calculator for <span className="text-primary">{slugToLabel(cropType)}</span>
              </>
            ) : (
              <>
                <span className="text-primary">NPK Fertilizer</span> Calculator
              </>
            )}
          </h1>
          <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-slate-600 mb-8 font-semibold uppercase tracking-wider">
            <span>By Hamad Khan • Updated: <time dateTime="2026-10-22">October 22, 2026</time></span>
          </div>
          <p className="text-xl hero-description text-slate-600 mb-4 max-w-3xl mx-auto leading-relaxed font-medium">
            Free NPK fertilizer calculator for home gardens and hydroponic growers. Convert fertilizer bag labels, oxide values, and target ratios into practical amounts in grams, ounces, pounds, or kilograms.
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
                })),
                ...(ENTITY_MAP[useCase].schemaType === 'WebApplication' ? {
                  'applicationCategory': 'UtilitiesApplication',
                  'operatingSystem': 'Any',
                  'browserRequirements': 'Requires JavaScript',
                  'offers': {
                    '@type': 'Offer',
                    'price': '0',
                    'priceCurrency': 'USD'
                  }
                } : {})
              })
            }}
          />

          <div className="mb-10 p-8 bg-emerald-50/50 backdrop-blur-sm border border-primary/20 rounded-3xl text-left max-w-4xl mx-auto shadow-sm">
            <h2 id="tldr-summary" className="text-sm font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-primary"></span>
              Quick Summary
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start gap-3 text-slate-700 font-medium">
                <span className="text-primary font-bold">01.</span>
                <p>Use the calculator to convert fertilizer labels and target ratios into practical amounts.</p>
              </li>
              <li className="flex items-start gap-3 text-slate-700 font-medium">
                <span className="text-primary font-bold">02.</span>
                <p>Check the oxide conversions and units before applying any product to a crop or solution.</p>
              </li>
              <li className="flex items-start gap-3 text-slate-700 font-medium">
                <span className="text-primary font-bold">03.</span>
                <p>Review the product label, soil test, and local extension guidance before final application.</p>
              </li>
              <li className="flex items-start gap-3 text-slate-700 font-medium">
                <span className="text-primary font-bold">04.</span>
                <p>Use this calculator as a planning tool; it does not replace the product label or local agronomic advice.</p>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm font-semibold text-slate-500">
            <span className="flex items-center gap-1">✓ {fertilizersData.length} fertilizer products</span>
            <span className="flex items-center gap-1">✓ No signup required</span>
            <span className="flex items-center gap-1">✓ Metric and imperial units</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#calculator-guide"
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all hover:scale-105 shadow-lg shadow-primary-20 text-lg"
            >
              Start Calculating →
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-600 max-w-2xl mx-auto">
            Results are estimates for planning. Always follow the product label and local extension guidance. Soil testing is recommended.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
          <nav className="table-of-contents max-w-4xl mx-auto px-6 py-4 my-8 bg-slate-50 border border-slate-200 rounded-3xl" aria-label="On this page">
        <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
          <span className="w-8 h-px bg-primary"></span>
          On this page
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
              <h3 className="text-3xl font-bold text-slate-900 mb-6">The Cost of Mixing Errors</h3>
              <div className="text-slate-600 text-base leading-relaxed space-y-4">
                <p>
                  Traditional mixing can lead to calculation mistakes when fertilizer labels use oxide values for phosphorus and potassium. Manual calculations are also easy to round incorrectly, which can distort the effective nutrient amount in a tank or soil solution.
                </p>
                <p>
                  The calculator is meant to help check the math before application. It does not replace the product label, soil test, or local agronomic guidance.
                </p>
              </div>
            </section>

            <section id="agronomic-solution" data-framework="solution" className="p-10 bg-slate-900 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/40 transition-colors"></div>
              <h3 className="text-3xl font-bold text-white mb-6">FertiCalc: a simple fertilizer planning tool</h3>
              <div className="text-slate-300 text-base leading-relaxed space-y-4">
                <p>
                  This calculator helps convert target NPK values, fertilizer analysis, and solution volume into a practical recipe. It is designed for quick planning checks and label comparisons.
                </p>
                <p>
                  You can use it to estimate the amount of product needed for a target concentration before final mixing or application.
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
            Enter target nutrient concentrations, solution volume, and a fertilizer analysis to estimate a mixing amount.
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
                  <h3 id="precision-engine" className="text-2xl font-bold text-slate-900">Fertilizer Calculator</h3>
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
                A basic fertilizer plan starts with the crop, the target nutrient percentage, and the irrigation or solution volume. The calculator uses the chosen product analysis and converts oxide values to practical nutrient amounts before scaling the recipe.
              </p>
              <p>
                A 3-1-2 fertilizer ratio contains three parts nitrogen for each part phosphate by label ratio. The final rate should still be checked against the product label, the crop stage, and the soil or water test before mixing.
              </p>
              <p className="font-semibold text-slate-900">
                These steps are a useful planning sequence, but final use still depends on product label instructions and local guidance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h4 className="text-lg font-bold text-slate-900 mb-6">Four-Step Chronological Methodology</h4>
                <ol className="space-y-4">
                  {[
                    "Step 1: Choose a target nutrient ratio for the crop or growth stage you are planning.",
                    "Step 2: Select the fertilizer source from the database, matching the product analysis to the label.",
                    "Step 3: Enter the total solution or treatment volume in liters or gallons.",
                    "Step 4: Review the output and confirm it against the product label, soil test, and local extension advice before applying it."
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
                  Ratio examples (not crop recommendations)
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
                        <td className="px-4 py-3 text-emerald-800 font-mono text-[10px] leading-tight">A 3-1-2 label ratio has 3 parts nitrogen, 1 part phosphate (P₂O₅), and 2 parts potash (K₂O). This describes the label ratio, not a crop recommendation.</td>
                      </tr>
                      <tr className="border-b border-slate-50">
                        <td className="px-4 py-3 font-bold text-slate-700">Flowering Phase</td>
                        <td className="px-4 py-3 text-emerald-800 font-mono text-[10px] leading-tight">A 1-3-2 label ratio has 1 part nitrogen, 3 parts phosphate (P₂O₅), and 2 parts potash (K₂O). This is an example of label order, not a flowering recommendation.</td>
                      </tr>
                      <tr className="border-b border-slate-50">
                        <td className="px-4 py-3 font-bold text-slate-700">Root Vegetables</td>
                        <td className="px-4 py-3 text-emerald-800 font-mono text-[10px] leading-tight">A 1-2-2 label ratio has 1 part nitrogen, 2 parts phosphate (P₂O₅), and 2 parts potash (K₂O). It is not a crop-specific recommendation.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-bold text-slate-700">General Growth</td>
                        <td className="px-4 py-3 text-emerald-800 font-mono text-[10px] leading-tight">A 1-1-1 label ratio has equal parts nitrogen, phosphate (P₂O₅), and potash (K₂O). It is not a universal crop recommendation.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Common crop calculators</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['tomato','corn','wheat','potato','soybean','rice','bermudagrass','bluegrass'].map((crop) => (
                <Link key={crop} href={`/calculator/${crop}`} className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-primary/50 hover:shadow-md transition-all text-center group">
                  <span className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors block leading-snug">{slugToLabel(crop)}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Specific Fertilizer Calculators Section */}
          <div className="mt-12 pt-12 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Specific Fertilizer Calculators</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[
                { slug: "urea-46-0-0", name: "Urea (46-0-0)" },
                { slug: "calcium-nitrate-15-5-0-0", name: "Calcium Nitrate (15.5-0-0)" },
                { slug: "dap-18-46-0", name: "DAP (18-46-0)" },
                { slug: "mop-0-0-60", name: "MOP (0-0-60)" },
                { slug: "potassium-sulfate-0-0-50", name: "Potassium Sulfate (0-0-50)" },
                { slug: "ammonium-nitrate-34-0-0", name: "Ammonium Nitrate (34-0-0)" },
                { slug: "ammonium-sulfate-21-0-0", name: "Ammonium Sulfate (21-0-0)" },
                { slug: "map-11-52-0", name: "MAP (11-52-0)" },
                { slug: "potassium-nitrate-13-0-46", name: "Potassium Nitrate (13-0-46)" },
                { slug: "magnesium-sulfate-epsom", name: "Epsom Salt" }
              ].map(({ slug, name }) => (
                <Link
                  key={slug}
                  href={`/fertilizers/${slug}`}
                  className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-primary/50 hover:shadow-md transition-all text-center group flex flex-col justify-center items-center"
                >
                  <span className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors block mb-1 leading-snug">
                    {name} Calculator
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    Dosage Guide
                  </span>
                </Link>
              ))}
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
                Commercial fertilizer labels display NPK values as oxide weight percentages, not raw elemental forms. A <cite>University of Minnesota Extension</cite> guide<sup><a href="#ref-1" id="ref-1-source-1" className="text-xs text-slate-900 ml-0.5 align-super font-bold hover:underline">[1]</a></sup> explains this difference. For example, a 10-10-10 NPK blend contains 10% each of nitrogen, phosphate, and potash by label basis, while the elemental plant-available amounts are lower when converted from oxide values.
              </p>
              <p>
                To express P₂O₅ as elemental phosphorus, multiply by 0.4364. The factor follows from the relative molar masses of phosphorus and oxygen in P₂O₅. To express K₂O as elemental potassium, multiply by 0.8302. These conversions change the reported mass units; they do not estimate how much nutrient a plant will absorb.
              </p>
              <p>
                A 50 lb bag of 10-10-10 contains 5 lb of nitrogen, 5 lb of phosphate (P₂O₅), and 5 lb of potash (K₂O) by label analysis. Elemental phosphorus and potassium amounts are lower after converting from oxide units.
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
                Formulas are based on standard fertilizer label conventions and unit conversions. See the Methodology page for formulas and examples.
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
                The calculator can help estimate how much fertilizer is needed for a range of solution volumes. Compatibility checks are useful for spotting precipitation risks, such as calcium and sulfate combinations, but the final mix still needs to follow the product label and local recommendations.
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
                      <td>Useful as a planning estimate for calculating a target concentration in solution.</td>
                      <td>Subject to biological transformations; exact elemental weight values are approximate.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Subheading: Agriculture guides */}
          <div className="pt-16 border-t border-slate-200">
            <h3 id="agriculture-guides" className="text-2xl font-bold text-slate-900 mb-6 text-center">Related agriculture guides</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6 text-left mb-8">
              <p>
                Successful crop management depends on the product label, the crop stage, and the soil or water test. Extension guidance usually covers the practical range for application, while the calculator is best used as a planning estimate before final dosing.
              </p>
              <p>
                To convert a target ppm into a practical fertilizer amount, use the selected fertilizer analysis, the solution volume, and the target nutrient value. The final decision should still be checked against local recommendations and label instructions.
              </p>
              <p className="font-semibold text-slate-900">
                Use the guides below as references, not as a replacement for the product label or a soil test.
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
            A simple calculation tool for planning fertilizer amounts. Use it alongside product labels, soil tests, and local extension guidance.
          </p>

          {/* Subheading: About the Author (demoted to H3) */}
          <div className="pt-16 border-t border-slate-200">
            <h3 id="author-bio" className="text-2xl font-bold text-slate-900 mb-6 text-center">About the Author &amp; Developer: Hamad Khan</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6 text-left">
              <p>
                FertiCalc was built by Hamad Khan, a software developer. The formulas use standard fertilizer label conversions and published extension guidance, and the calculator is intended as a planning tool for home gardeners and hydroponic growers.
              </p>
              <p>
                The site exists to make fertilizer math easier to check and compare, not to replace a product label, a soil test, or local agronomic guidance.
              </p>
              <p className="font-semibold text-slate-900 text-center">
                TODO(owner): add any real agronomy qualifications, collaborators or reviewers if they exist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL REFERENCE AND DIAGNOSTIC KNOWLEDGE BASE */}
      <section id="knowledge-database" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h3 id="knowledge-database-title" className="text-3xl font-bold text-slate-900 mb-6 text-center">Reference Notes</h3>
          <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-16">
            Simple reference notes for nutrient conversion and fertilizer planning.
          </p>

          {/* Subheading: FAQ (demoted to H3) */}
          <div className="mb-16">
            <h3 id="faq" className="text-2xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions &amp; Diagnostic Database</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6 text-left mb-8">
              <p>
                Converting ppm to grams per liter requires working from the target nutrient percentage, the product analysis, and the water volume. This is a useful planning step, but final applications should still match the fertilizer label and local recommendations.
              </p>
              <p>
                A 1:3:2 ratio is a common reference for a flowering or fruiting crop, but nutrient needs vary with crop stage, soil test, and the chosen product. The calculator helps estimate the amount, not decide the final application plan.
              </p>
              <p className="font-semibold text-slate-900">
                Search the FAQ below for references and examples, then validate the final rate with the label and extension guidance.
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
                  <p>Our calculator performs this calculation automatically for the fertilizer and volume you select, and it is best used as a planning estimate.</p>
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
                The calculator uses standard fertilizer label conventions and unit conversions. It does not claim to replace extension guidance or a soil test.
              </p>
              <p>
                Formulas are based on standard fertilizer label conventions and unit conversions. See the Methodology page.
              </p>
              <p className="font-semibold text-slate-900">
                Review the references below and the Methodology page for the formulas used in the calculator.
              </p>
            </div>

            <ol className="references list-decimal list-outside ml-6 space-y-4 text-sm text-slate-600 text-left">
              <li id="ref-1">
                <cite>University of Minnesota Extension. Understanding phosphorus fertilizers. Available at <a href="https://extension.umn.edu/how/manage-soil-nutrients" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">extension.umn.edu</a>.</cite>
              </li>
              <li id="ref-2">
                <cite>Natural Resources Conservation Service. Nutrient Management Standard (Code 590). Available at <a href="https://www.nrcs.usda.gov/resources/guides-and-instructions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">nrcs.usda.gov</a>.</cite>
              </li>
              <li id="ref-3">
                <cite>University of California Agriculture and Natural Resources. Fertilizer management and nitrogen use guidance. Available at <a href="https://ucanr.edu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ucanr.edu</a>.</cite>
              </li>
              <li id="ref-4">
                <cite>Colorado State University Extension. Soil testing and nutrient management basics. Available at <a href="https://extension.colostate.edu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">extension.colostate.edu</a>.</cite>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 id="cta" className="text-4xl font-bold mb-6">Ready to Optimize Your Yield?</h3>
          <p className="text-xl text-emerald-50 mb-10">Use FertiCalc for practical fertilizer planning and label checks.</p>
          <div className="mb-8">
            <time dateTime="2026-10-22" className="text-xs text-primary-20 opacity-80 bg-white/10 px-3 py-1 rounded-full">
              Last Updated: October 22, 2026
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
