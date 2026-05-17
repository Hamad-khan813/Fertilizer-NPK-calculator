import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology | Ferti-Calc',
  description: 'Detailed explanation of how the Ferti-Calc engine calculates NPK ratios, PPM, and EC conversions.',
};

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">Methodology</h1>
        <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-6">Last Updated: May 17, 2026</p>
        <p className="text-xl text-slate-600 leading-relaxed">
          A transparent breakdown of the scientific formulas, baseline assumptions, and calculation algorithms powering the Ferti-Calc engine.
        </p>
      </div>

      <div className="space-y-12 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How the Calculator Works</h2>
          <p>
            The Ferti-Calc algorithm bridges the gap between commercial fertilizer labels and actual elemental plant uptake. It takes your target volume, desired NPK ratio, and chosen fertilizer base, then computes the exact mass (in grams or milliliters) required to achieve specific part-per-million (PPM) concentrations in your reservoir.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Scientific Basis and Formulas</h2>
          <p className="mb-4">Commercial fertilizer bags display P (Phosphorus) and K (Potassium) in their oxide forms: P₂O₅ and K₂O. Plants only absorb the elemental form. We use exact molar mass conversions to calculate true availability:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Elemental Phosphorus (P):</strong> P₂O₅ × 0.4364</li>
            <li><strong>Elemental Potassium (K):</strong> K₂O × 0.8302</li>
          </ul>
          <p className="mt-4">Nitrogen (N) is represented in its true elemental percentage on commercial labels, so no oxide conversion is necessary.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">PPM, EC, and Nutrient Calculations</h2>
          <p>
            We calculate Parts Per Million (PPM) based on the metric weight of the solute in the solvent volume: <strong>1 PPM = 1 mg/L</strong>. 
            When scaling recipes, the engine calculates the mass needed to reach the limiting nutrient's target PPM, and proportionally maps out the resulting PPMs of the other macronutrients to prevent toxicity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Assumptions & Limitations</h2>
          <p>
            Our tool assumes 100% solubility of the provided inputs and calculates based on a neutral water baseline (0 PPM / 0.0 EC). 
            <strong>Limitations:</strong> Local water supplies contain existing minerals (calcium, magnesium) that will affect the final reservoir EC. The calculator does not account for chemical lockouts caused by extreme pH fluctuations or precipitation from mixing incompatible concentrated stock solutions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Our Methodology is Reliable</h2>
          <p>
            By relying strictly on established atomic mass ratios and standard stoichiometric math, our logic eliminates the guesswork of agricultural dosing. It is the same foundational math utilized by commercial greenhouse climate-control computers, made accessible to everyone.
          </p>
        </section>
      </div>
    </div>
  );
}
