import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial Policy | Ferti-Calc',
  description: 'How FertiCalc content and calculator changes are prepared, checked, and updated.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">Editorial Policy</h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          FertiCalc is maintained by its owner. This policy explains the limits of the content review process and how corrections can be requested.
        </p>
      </div>

      <div className="space-y-12 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Content and calculations</h2>
          <p>
            Calculator formulas are documented on the Methodology page. Articles and guides are informational material, not a substitute for product-label directions, soil or water testing, or local extension recommendations. No independent expert review is claimed unless a named reviewer is shown on the specific page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Writing, review, and corrections</h2>
          <p>
            Content is prepared and maintained by the site owner. Before relying on a calculation, compare it with the product analysis and verify it for your own conditions. Readers can report errors or suggest updates through the contact page.
          </p>
          <p className="mt-4">TODO(owner): confirm whether AI tools are used for drafting and update this policy to describe the owner&apos;s actual review process.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Sources</h2>
          <p>
            Sources are linked on the pages where they are used. The Methodology page includes a University of Minnesota Extension resource for general nutrient-management context. No university or government body endorses FertiCalc.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Transparency and Disclaimers</h2>
          <p>
            Please report a suspected factual or calculation error by email. The calculator is a planning aid only; users are responsible for checking each result against product instructions and local guidance.
          </p>
        </section>
      </div>
    </div>
  );
}
