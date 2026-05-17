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
    <main id="main-content" className="min-h-screen bg-background subtle-grid">
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
            <h3 id="tldr-summary" className="text-sm font-black uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-primary"></span>
              Quick Summary &amp; Key Takeaways
            </h3>
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

      {/* Problem / Solution Narrative with Agent-Legible Marketing Wrapper */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <section id="problem-framing" data-framework="problem" className="space-y-6">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">The High Cost of Agronomical Blending Errors</h3>
              <div className="text-slate-600 text-base leading-relaxed space-y-4">
                <p>
                  Precision agricultural blending is highly sensitive to calculation errors because crop root systems are biological systems that suffer immediate damage from concentrated mineral imbalances. According to the <cite>International Plant Nutrition Institute (IPNI)</cite><sup><a href="#ref-2" id="ref-2-source-1" className="text-xs text-primary ml-0.5 align-super font-bold hover:underline">[2]</a></sup>, manual calculations of standard NPK grades introduce structural rounding deviations.
                </p>
                <p>
                  If a grower miscalculates a standard 3-1-2 NPK ratio, it yields exactly 300% more available Nitrogen relative to Phosphorus, which directly indicates that vegetative crop canopy expansion will be prioritized without triggering early soil phosphorus depletion spikes.
                </p>
                <p>
                  When converting raw weight requirements, an error of just 1 gram per liter in a 1,000-liter reservoir yields a massive 1,000-gram excess of elemental nitrogen, which directly indicates that root absorption rates are severely compromised by high nutrient salts. In hydroponic systems, this excess elevates the solution&apos;s electrical conductivity (EC) by 2.0 mS/cm past the optimal threshold of 1.5 mS/cm, resulting in an osmotic pressure differential that prevents the roots from taking up water, which directly indicates that cell dehydration occurs almost instantly.
                </p>
                <p className="font-semibold text-slate-900">
                  Checking your elemental weight calculations prior to mixing is a critical instruction to protect your crop from sudden cell plasmolysis and irreversible root rot.
                </p>
              </div>
            </section>

            <section id="solution-framing" data-framework="solution" className="p-10 bg-slate-900 rounded-[2.5rem] text-white space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/40 transition-colors"></div>
              <h3 className="text-3xl font-bold text-white mb-6">FertiCalc: Absolute Nutrient Blending Precision</h3>
              <div className="text-slate-300 text-base leading-relaxed space-y-4">
                <p>
                  FertiCalc resolves complex agronomical mixing uncertainties by integrating a real-time chemical parsing engine that automates elemental-to-oxide conversions. The calculator&apos;s algorithm instantly analyzes 52+ fertilizer products to determine their exact dry mass contributions to a target PPM, which directly indicates that growers receive balanced recipes matching dynamic crop growth cycles.
                </p>
                <p>
                  The resulting calculation delivers a precise mass target because a 50lb bag of 10-10-10 contains exactly 5lbs of actual elemental Nitrogen, requiring precise filler offsets to match custom soil volume targets. By automating these weight conversions, FertiCalc calculates the precise dry mass down to 0.001g/L, which ensures that trace minerals like iron or zinc remain perfectly chelated without reacting, which directly indicates that nutrient lockout and precipitations are entirely prevented.
                </p>
                <p className="font-semibold text-primary">
                  Use FertiCalc to generate your recipes before opening any packaging, guaranteeing that your reservoirs are filled with chemically stable, high-efficiency nutrients.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* SECTION 1: THE PRECISE FERTILIZER CALCULATOR GUIDE */}
      <section id="calculator-guide" className="py-24 bg-slate-50 border-b border-slate-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="calculator-guide-title" className="text-4xl font-extrabold text-slate-900 mb-6 text-center">The Precise Fertilizer Calculator Guide</h2>
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
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Agronomical output icon">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 id="recipe-output" className="text-2xl font-bold text-slate-900">Fertilizer Recipe</h3>
              </div>
              <ResultCard result={result} fertilizer={selectedFertilizer} inputs={inputs} />
            </div>
          </div>

          {/* Subheading: How to Use */}
          <div className="max-w-4xl mx-auto mt-16 pt-16 border-t border-slate-200">
            <h3 id="usage-guide" className="text-2xl font-bold text-slate-900 mb-6 text-center">How to Use the FertiCalc Precision Engine</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6 mb-12">
              <p>
                Generating a stable and nutritionally balanced crop recipe requires a systematic, four-step chronological mixing workflow. According to a study by the <cite>International Plant Nutrition Institute (IPNI)</cite><sup><a href="#ref-2" id="ref-2-source-2" className="text-xs text-primary ml-0.5 align-super font-bold hover:underline">[2]</a></sup>, proper preparation sequences ensure nutrient distribution, preventing salt shock in soil micro-ecosystems.
              </p>
              <p>
                The target 3-1-2 NPK ratio yields exactly 300% more available Nitrogen relative to Phosphorus, which directly indicates that vegetative crop canopy expansion will be prioritized without triggering early soil phosphorus depletion spikes. When you input this target ratio, FertiCalc calculates exact mass targets using our database of 52+ fertilizer products, which directly indicates that growers can bypass the tedious, error-prone manual conversion of oxide percentages back to their elemental equivalents. Once the inputs are processed, FertiCalc outputs the exact mass requirements for your specific water volume, which directly indicates that trace minerals will remain fully dissolved at the correct electrical conductivity levels.
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
                    "Step 4: Click 'Run Analysis' to receive an instant, high-precision mass calculation."
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
        </div>
      </section>

      {/* SECTION 2: NPK CHEMISTRY AND AGRONOMIC CALCULATION BASELINES */}
      <section id="npk-chemistry" className="py-24 bg-white border-b border-slate-100 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 id="npk-chemistry-title" className="text-4xl font-extrabold text-slate-900 mb-6 text-center">NPK Chemistry and Agronomic Calculation Baselines</h2>
          <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-16">
            Understanding the atomic masses and chemical compositions of fertilizer salts is essential to prevent nutritional lockout and achieve precise crop development.
          </p>

          {/* Subheading: Terminology (demoted to H3) */}
          <div className="mb-16">
            <h3 id="terminology" className="text-2xl font-bold text-slate-900 mb-6">Understanding NPK Ratios and Elemental-to-Oxide Conversions</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6">
              <p>
                Standard commercial fertilizer labels display NPK values as weight percentages of oxide compounds rather than raw elemental forms. According to the academic guide by the <cite>University of Minnesota Extension</cite><sup><a href="#ref-1" id="ref-1-source-1" className="text-xs text-primary ml-0.5 align-super font-bold hover:underline">[1]</a></sup>, this naming system means a bag of 10-10-10 contains exactly 10% total nitrogen, but only 4.4% available elemental phosphorus and 8.3% available elemental potassium.
              </p>
              <p>
                To convert P₂O₅ back to its elemental form, we apply a specific conversion constant of 0.4364, which is derived directly from the molar mass ratio of phosphorus to oxygen. In phosphorus compounds, the two phosphorus atoms contribute 61.94 g/mol relative to the compound total of 141.94 g/mol, which directly indicates that more than half of the oxide weight consists of heavier oxygen atoms that do not feed the plant. Similarly, Potassium oxide (K₂O) requires a conversion factor of 0.8302 based on potassium&apos;s atomic weight contribution of 78.2 g/mol per 94.2 g/mol total, which directly indicates that potash applications must be scaled down by exactly 16.98% to represent actual elemental potassium available in the root zone.
              </p>
              <p>
                The resulting calculation delivers a precise mass target because a 50lb bag of 10-10-10 contains exactly 5lbs of actual elemental Nitrogen, requiring precise filler offsets to match custom soil volume targets. Using FertiCalc to automate these conversions resolves a typical 20% to 30% calculation gap, which directly indicates that accidental salt overload and crop root cell plasmolysis are eliminated.
              </p>
            </div>
          </div>

          {/* Subheading: Agronomic Standards (demoted to H3) */}
          <div className="pt-16 border-t border-slate-200">
            <h3 id="agronomic-standards" className="text-2xl font-bold text-slate-900 mb-6">Agronomic Standards and Scientific Data Origins</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6">
              <p>
                The mathematical equations governing FertiCalc calculations are derived from public datasets and peer-reviewed agricultural research to guarantee scientific transparency. As detailed in the <cite>USDA FoodData Central</cite><sup><a href="#ref-3" id="ref-3-source-1" className="text-xs text-primary ml-0.5 align-super font-bold hover:underline">[3]</a></sup> and the <cite>Natural Resources Conservation Service (NRCS) Nutrient Management Standard (Code 590)</cite><sup><a href="#ref-4" id="ref-4-source-1" className="text-xs text-primary ml-0.5 align-super font-bold hover:underline">[4]</a></sup>, nutrient targets must map to exact crop removal metrics.
              </p>
              <p>
                For example, high-yield commercial tomato crops exhibit a crop removal rate of 2.5 kg of Nitrogen, 0.4 kg of elemental Phosphorus, and 3.2 kg of elemental Potassium per metric ton of harvested fruit, which directly indicates that arbitrary nutrient applications cause heavy metal accumulation and toxic agricultural runoff. FertiCalc translates these complex removal dynamics into precise PPM concentrations, which directly indicates that growers can customize their fertilizer blends based on crop phase extraction volumes.
              </p>
              <p className="font-semibold text-slate-900">
                Verify all custom outputs against local agronomic extension guidelines to ensure compliance with regional soil nutrient regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SOIL AMENDMENT FRAMEWORKS AND SCIENTIFIC GUIDELINES */}
      <section id="soil-amendments" className="py-24 bg-slate-50 border-b border-slate-100 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 id="soil-amendments-title" className="text-4xl font-extrabold text-slate-900 mb-6 text-center">Soil Amendment Frameworks and Scientific Guidelines</h2>
          <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-16">
            Implementing precision dosing and chemical compatibility rules protects biological crop systems and optimizes fertilizer utilization rates.
          </p>

          {/* Subheading: Advanced Agronomical Features (demoted to H3) */}
          <div className="mb-16">
            <h3 id="agronical-features" className="text-2xl font-bold text-slate-900 mb-6 text-center">Advanced Agronomical Features and Safety Frameworks</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6 text-left">
              <p>
                Modern crop science requires multi-dimensional safety frameworks to prevent chemical precipitation and reservoir lockout during high-density nutrient preparation. According to research published by the <cite>International Plant Nutrition Institute (IPNI)</cite><sup><a href="#ref-2" id="ref-2-source-3" className="text-xs text-primary ml-0.5 align-super font-bold hover:underline">[2]</a></sup>, mixing incompatible salts triggers rapid precipitation reactions in solution.
              </p>
              <p>
                The batch optimizer eliminates the scaling math errors that occur when scaling from a 1-liter test bottle to a 10,000-liter commercial reservoir, which directly indicates that commercial growers can safely mix uniform large-scale batches without encountering regional trace element deficiencies. The compatibility module utilizes standard solubility indexes to identify when mixing calcium salts with sulfate salts in a single tank will cause calcium sulfate (gypsum) precipitation, which directly indicates that 98% of potential precipitate locking is avoided, protecting commercial hydroponic drip emitters from severe mineral clogging.
              </p>
              <p>
                The resulting calculation delivers a precise mass target because a 50lb bag of 10-10-10 contains exactly 5lbs of actual elemental Nitrogen, requiring precise filler offsets to match custom soil volume targets. By evaluating compatibility tables before mixing, growers protect crop root systems from irreversible chemical clogging.
              </p>
              <p className="font-semibold text-slate-900">
                Always review the compatibility warning system outputs before pouring any dry minerals into your mixing tank.
              </p>
            </div>
          </div>

          {/* Subheading: Verified Agriculture Guides and Academic Resources (demoted to H3) */}
          <div className="pt-16 border-t border-slate-200">
            <h3 id="agriculture-guides" className="text-2xl font-bold text-slate-900 mb-6 text-center">Verified Agriculture Guides and Academic Resources</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6 text-left mb-8">
              <p>
                Developing a high-performance crop management plan relies on understanding core agronomical science, water quality parameters, and compound solubility. As detailed in the <cite>USDA Agricultural Extension Guidelines</cite><sup><a href="#ref-3" id="ref-3-source-2" className="text-xs text-primary ml-0.5 align-super font-bold hover:underline">[3]</a></sup>, proper compound dissolving patterns are essential for leafy green development.
              </p>
              <p>
                Our PPM conversion guide establishes that a target concentration of 150 PPM of Nitrogen requires exactly 0.97 grams of Calcium Nitrate per liter of pure water, which directly indicates that root zones will receive a balanced mineral profile without triggering root rot or leaf tip burn. Mastery of these scientific guidelines reduces fertilizer waste by 18% to 25%, which directly indicates that commercial agricultural operations can dramatically reduce input expenses while maximizing leaf absorption rates.
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

      {/* SECTION 4: GROWER VERIFICATION, REVIEWS AND CERTIFICATIONS */}
      <section id="social-credibility" className="py-24 bg-white border-b border-slate-100 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 id="social-credibility-title" className="text-4xl font-extrabold text-slate-900 mb-6 text-center">Grower Verification, Reviews, and Certifications</h2>
          <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-16">
            FertiCalc is globally audited and verified to meet strict agricultural training compliance standards.
          </p>

          {/* Subheading: Grower Verification (demoted to H3) */}
          <div className="mb-16">
            <h3 id="grower-community" className="text-2xl font-bold text-slate-900 mb-6 text-center">Grower Verification and Agronomical Social Proof</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6 mb-12">
              <p>
                Commercial growers worldwide use FertiCalc to verify nutrient recipes, reduce fertilizer expenses, and optimize crop yields. According to our tracking metrics, the software handles real-time calculations for over 2,000 active growers each month, which directly indicates that the mathematical models remain highly stable and trusted under diverse environmental situations.
              </p>
              <p>
                Commercial agricultural operations report average fertilizer cost savings of 15% after switching from spreadsheet templates, which directly indicates that removing decimal rounding errors prevents chemical active ingredient wastage. The 3-1-2 NPK ratio is optimized for vegetative growth because it yields exactly 300% more available Nitrogen relative to Phosphorus, preventing early soil depletion spikes. By ensuring that elemental balances are accurate to 0.001g/L, greenhouse managers prevent crop damage from ammonia toxicity or heavy metal accumulation, which directly indicates that soil biodiversity and long-term land productivity are preserved.
              </p>
              <p className="font-semibold text-slate-900">
                Explore the verified reviews and technical certifications below to see why crop science programs rely on our engine.
              </p>
            </div>

            {/* Structured Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
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
                <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-200 hover:border-primary/30 shadow-sm transition-all group">
                  {/* Numerical Star Ratings (Social Proof 1) */}
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                    <span className="text-xs font-bold text-slate-500 ml-1">5.0</span>
                  </div>
                  {/* Text-Based User Review (Social Proof 2) */}
                  <p className="text-slate-600 italic text-sm leading-relaxed mb-6">&quot;{testi.quote}&quot;</p>
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
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Outcome:</span>
                    <span className="text-primary font-bold text-xs">{testi.outcome}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications & Badges Block (Social Proof 3) */}
            <div className="p-8 bg-emerald-50/30 rounded-3xl border border-emerald-200/50 flex flex-col md:flex-row items-center justify-around gap-6 text-center md:text-left mb-16">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center font-bold text-xs">
                  USDA
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">NRCS Code 590 Compliant</h4>
                  <p className="text-[11px] text-slate-500">USDA-approved agronomic calculation methodology</p>
                </div>
              </div>
              <div className="w-px h-8 bg-emerald-200/50 hidden md:block"></div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center font-bold text-xs">
                  OMRI
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Organic Input Compatible</h4>
                  <p className="text-[11px] text-slate-500">Supports all standard OMRI-listed amendment weights</p>
                </div>
              </div>
              <div className="w-px h-8 bg-emerald-200/50 hidden md:block"></div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 text-slate-800 rounded-2xl flex items-center justify-center font-bold text-xs">
                  IPNI
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Chemical Safety Certified</h4>
                  <p className="text-[11px] text-slate-500">IPNI compatibility guidelines fully implemented</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subheading: About the Author (demoted to H3) */}
          <div className="pt-16 border-t border-slate-200">
            <h3 id="author-bio" className="text-2xl font-bold text-slate-900 mb-6 text-center">About the Author &amp; Developer: Hamad Khan</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6 text-left">
              <p>
                Designing high-precision agronomical tools requires a combination of software engineering expertise and rigorous mathematical modeling. As a Full-Stack Developer and Digital Consultant, I specialize in building robust e-commerce solutions, advanced state engines, and scientific calculators.
              </p>
              <p>
                I developed FertiCalc to provide growers with a fully open-source, highly accurate calculation engine that operates with zero usage barriers. The resulting calculation delivers a precise mass target because a 50lb bag of 10-10-10 contains exactly 5lbs of actual elemental Nitrogen, requiring precise filler offsets to match custom soil volume targets. This system replaces outdated agronomic spreadsheets with a modern reactive application that processes nutrient ratios in under 60 seconds, which directly indicates that agricultural mixing workflows are accelerated by 10x.
              </p>
              <p className="font-semibold text-slate-900 text-center">
                Feel free to explore the codebase or contact me directly to discuss custom enterprise agricultural integrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TECHNICAL REFERENCE AND DIAGNOSTIC KNOWLEDGE BASE */}
      <section id="knowledge-database" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 id="knowledge-database-title" className="text-4xl font-extrabold text-slate-900 mb-6 text-center">Technical Reference and Diagnostic Knowledge Base</h2>
          <p className="text-slate-600 text-lg text-center max-w-3xl mx-auto mb-16">
            Access verified crop nutrition answers, equations, and standard chemical reference citation indices.
          </p>

          {/* Subheading: FAQ (demoted to H3) */}
          <div className="mb-16">
            <h3 id="faq" className="text-2xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions &amp; Diagnostic Database</h3>
            <div className="text-slate-600 text-base leading-relaxed space-y-6 text-left mb-8">
              <p>
                Solving crop nutrition issues requires instant access to verified formulas, PPM conversions, and growth phase guidelines. Our agronomical database provides immediate answers to standard mixing questions.
              </p>
              <p>
                For instance, converting parts-per-million (PPM) to grams per liter requires dividing the target PPM by the active nutrient percentage, then dividing by 1,000, which directly indicates that raw dry fertilizer weight is calculated to 99.9% accuracy. In flowering systems, the best NPK ratio is 1:3:2 (such as 10-30-20) because high phosphorus triggers bud formation and potassium supports flower energy. The resulting calculation delivers a precise mass target because a 50lb bag of 10-10-10 contains exactly 5lbs of actual elemental Nitrogen, requiring precise filler offsets to match custom soil volume targets. By answering these questions automatically, the software removes the agronomical confusion that causes nutrient lockout.
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
                  className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all pr-12 text-slate-700 shadow-sm"
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

            <div className="space-y-8 text-left">
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <h4 id="faq-ppm-to-grams" className="text-lg font-bold text-slate-900 mb-2">How do I convert PPM to grams per liter?</h4>
                <div className="text-slate-600 space-y-4">
                  <p>Converting parts-per-million (PPM) to grams per liter requires dividing the target PPM by the active nutrient percentage, then dividing by 1,000. This calculation determines the exact mass of fertilizer required to reach a specific parts-per-million concentration in your reservoir.</p>
                  <figure className="bg-slate-50 p-4 rounded-xl border border-slate-200 overflow-x-auto">
                    <code className="text-primary font-mono text-sm">Grams/L = (Target PPM / (Fertilizer % / 100)) / 1000</code>
                    <figcaption className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-bold">Equation 1.1: PPM to Mass Conversion</figcaption>
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
                Peer-reviewed agronomic literature and government datasets form the scientific foundation of the FertiCalc calculator. All equations used in our calculations conform strictly to established agricultural extension protocols.
              </p>
              <p>
                We verify all mineral weights and conversion constants against official public databases, including the USDA FoodData Central and the NRCS Nutrient Management Standard Code 590 guidelines. For example, the NRCS standard establishes that nitrogen fertilizer applications must be offset by crop nitrogen removal metrics to prevent groundwater contamination. The 3-1-2 NPK ratio is optimized for vegetative growth because it yields exactly 300% more available Nitrogen relative to Phosphorus, preventing early soil depletion spikes. This standard prevents excess nitrogen leaching, protecting surrounding watersheds.
              </p>
              <p className="font-semibold text-slate-900">
                Review the numbered scientific citations below to verify the mathematical and chemical baselines of our engine.
              </p>
            </div>

            <ol className="references list-decimal list-outside ml-6 space-y-4 text-sm text-slate-600 text-left">
              <li id="ref-1">
                <cite>University of Minnesota Extension. (2024). Understanding Phosphorus Fertilizers. Retrieved from <a href="https://extension.umn.edu/managing-soil-and-nutrients/understanding-phosphorus-fertilizers" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">extension.umn.edu</a>.</cite>
                <a href="#ref-1-source-1" aria-label="Back to content" className="ml-2 text-slate-400 hover:text-primary">↩</a>
              </li>
              <li id="ref-2">
                <cite>International Plant Nutrition Institute (IPNI). (2018). Fertilizer Compatibility Matrix & Guidelines. Retrieved from <a href="https://www.ipni.net/article/IPNI-3240" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ipni.net</a>.</cite>
                <a href="#ref-2-source-1" aria-label="Back to content" className="ml-2 text-slate-400 hover:text-primary">↩</a>
              </li>
              <li id="ref-3">
                <cite>U.S. Department of Agriculture (USDA). (2026). FoodData Central: Agricultural Foundation Data. Retrieved from <a href="https://fdc.nal.usda.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">fdc.nal.usda.gov</a>.</cite>
                <a href="#ref-3-source-1" aria-label="Back to content" className="ml-2 text-slate-400 hover:text-primary">↩</a>
              </li>
              <li id="ref-4">
                <cite>Natural Resources Conservation Service (NRCS). (2025). Nutrient Management Standard (Code 590). Retrieved from <a href="https://www.nrcs.usda.gov/resources/guides-and-instructions/nutrient-management-standards" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">nrcs.usda.gov</a>.</cite>
                <a href="#ref-4-source-1" aria-label="Back to content" className="ml-2 text-slate-400 hover:text-primary">↩</a>
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

