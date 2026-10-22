import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology | Ferti-Calc',
  description: 'Formulas and assumptions used to estimate fertilizer mass, nutrient concentration, and oxide conversions.',
};

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">Methodology</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          The calculator applies fertilizer analysis percentages to a solution volume. It estimates mass; it does not recommend a crop-specific nutrient target.
        </p>
      </div>

      <div className="space-y-12 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How the Calculator Works</h2>
          <p>
            Targets are entered as percent weight per volume (% w/v). For a selected nutrient, the required product mass is calculated as: target percentage divided by the product nutrient percentage, multiplied by solution volume in millilitres. The calculator uses 1 litre = 1,000 millilitres.
          </p>
          <p className="mt-4"><strong>Example:</strong> To make 1 litre at 0.1% nitrogen using urea labelled 46% N: (0.1 ÷ 46) × 1,000 = about 2.17 g urea. The estimate assumes the listed analysis is correct.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Scientific Basis and Formulas</h2>
          <p className="mb-4">Fertilizer labels commonly express phosphate and potash as P₂O₅ and K₂O. To express those values as elemental phosphorus and potassium, multiply by these approximate molar-mass factors:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Elemental Phosphorus (P):</strong> P₂O₅ × 0.4364</li>
            <li><strong>Elemental Potassium (K):</strong> K₂O × 0.8302</li>
          </ul>
          <p className="mt-4">For example, a 10% P₂O₅ label value corresponds to about 4.364% elemental P; 10% K₂O corresponds to about 8.302% elemental K. Nitrogen is listed as N and does not use these oxide factors.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">PPM, EC, and Nutrient Calculations</h2>
          <p>
            For dilute water solutions, 1 ppm is commonly approximated as 1 mg/L. To convert a target nutrient concentration to product mass, first convert the target ppm to grams per litre (ppm ÷ 1,000), then divide by the nutrient fraction in the fertilizer and multiply by the solution volume in litres.
          </p>
          <p className="mt-4"><strong>Example:</strong> 100 ppm nitrogen is 0.1 g N/L. With a 46% N product, 0.1 ÷ 0.46 = about 0.217 g product per litre.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Fertilizer bag percentage</h2>
          <p>A labelled nutrient percentage is a mass fraction. Product mass multiplied by the nutrient percentage as a decimal gives the nutrient mass.</p>
          <p className="mt-4"><strong>Example:</strong> 100 g of a 10-10-10 fertilizer contains 10 g of nitrogen by its label analysis, 10 g P₂O₅, and 10 g K₂O.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Key Assumptions & Limitations</h2>
          <p>
            The calculator uses the selected product&apos;s listed analysis and does not account for background nutrients in soil or water, product impurities, incomplete dissolution, density differences for liquids, pH effects, or reactions between concentrated stock solutions. Product mass is displayed as millilitres for liquids using an approximate density assumption; check the product label and measure carefully.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">References</h2>
          <p>For fertilizer planning and soil testing, see the University of Minnesota Extension&apos;s <a className="text-primary underline" href="https://extension.umn.edu/how/manage-soil-nutrients" target="_blank" rel="noopener noreferrer">soil nutrient guidance</a>. The calculations above describe unit arithmetic and standard oxide conversion factors; they are not crop recommendations.</p>
          <p className="mt-4">TODO(owner): add a relevant, verified technical source for fertilizer compatibility notes.</p>
        </section>
      </div>
    </div>
  );
}
