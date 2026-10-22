import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | Ferti-Calc',
  description: 'Terms and conditions, disclaimers, and user responsibilities for using Ferti-Calc.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">Terms of Use</h1>
        <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-6">Last updated: October 22, 2026</p>
      </div>

      <div className="space-y-10 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
          <p>
            By using FertiCalc and its calculators, guides, database and content (the “Service”), you agree to these Terms. The Service is owned and operated by Hamad Khan from Lower Dir, Khyber Pakhtunkhwa, Pakistan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. User Responsibilities</h2>
          <p>
            FertiCalc is an informational aid, not agronomic advice or a substitute for soil testing or a qualified local adviser. Verify every result against the current product label, your soil test and local extension guidance. Soil, water, crop stage, climate and regulations affect safe application rates. Start conservatively, trial small areas, and follow manufacturer handling and PPE instructions. You assume responsibility for decisions made using the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Calculator and agronomic disclaimer</h2>
          <p>
            Calculator results and educational material are estimates and general information only, not agronomic, safety, legal, or regulatory advice. Results may be affected by input errors, product composition, water or soil conditions, units, measurement, and mixing. Always follow the current product label and local recommendations, and verify the calculation before use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. No Warranties</h2>
          <p>
            The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without representations or warranties, express or implied. FertiCalc makes no warranty that information or calculations are complete, accurate, current, or suitable for a particular use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Limitation of Liability</h2>
          <p>
            To the extent permitted by applicable law, FertiCalc and its operator are not liable for losses or damages arising from reliance on calculator results, educational content, fertilizer use, crop loss, equipment damage, or inability to use the Service. Nothing in these Terms excludes liability that cannot legally be excluded.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Intellectual Property</h2>
          <p>
            The design, calculation engine logic, written content, and codebase of Ferti-Calc are the intellectual property of its creator, Hamad Khan. You may not scrape, copy, reproduce, or resell the underlying algorithms or content without explicit permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the Islamic Republic of Pakistan. Courts in Khyber Pakhtunkhwa, Pakistan have exclusive jurisdiction, subject to any mandatory consumer rights in your country. Questions can be sent to hamadkhan9996310@gmail.com.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. It is your responsibility to check this page periodically for changes.
          </p>
        </section>
      </div>
    </div>
  );
}
