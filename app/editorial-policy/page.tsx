import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial Policy | Ferti-Calc',
  description: 'Our commitment to scientific accuracy, transparent calculation methods, and trusted agricultural sources.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">Editorial Policy</h1>
        <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-6">Last Updated: May 17, 2026</p>
        <p className="text-xl text-slate-600 leading-relaxed">
          At Ferti-Calc, we are dedicated to providing the agricultural community with accurate, transparent, and scientifically sound information.
        </p>
      </div>

      <div className="space-y-12 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Commitment to Accuracy</h2>
          <p>
            Precision is critical in agriculture. We ensure that every calculation, ratio, and educational guide provided on our platform is rooted in validated horticultural science. Our content goes through a strict review process to verify atomic-weight baselines and conversion ratios before publication.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Content Creation & Review Process</h2>
          <p>
            All educational content and calculator logic is developed by agronomic tech specialists. When we publish a new guide or add a feature, we:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Cross-reference formulas against standard agricultural textbooks and university extension documentation.</li>
            <li>Test calculator outputs against real-world, commercial hydroponic and soil-based scenarios.</li>
            <li>Regularly update our fertilizer database to reflect the latest manufacturer specifications.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Sources and Standards</h2>
          <p>
            We do not rely on anecdotal evidence. Our references include peer-reviewed scientific studies, university agricultural extensions (such as the University of Minnesota and Cornell University), and standard compliance documentation from the USDA NRCS.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Transparency and Disclaimers</h2>
          <p>
            While we strive for 100% accuracy, agricultural environments vary widely. The outputs provided by Ferti-Calc should be used as a primary guideline, but growers should always verify pH and EC levels manually before widespread application. Ferti-Calc is an educational tool and does not replace certified agronomist consultation.
          </p>
        </section>
      </div>
    </div>
  );
}
