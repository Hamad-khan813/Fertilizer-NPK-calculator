import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ferti-Calc',
  description: 'Our GDPR-compliant privacy policy detailing how we protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">Privacy Policy</h1>
        <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-6">Effective date: September 21, 2026 · Last updated: September 21, 2026</p>
      </div>

      <div className="space-y-10 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect (Or Don't Collect)</h2>
          <p>
            FertiCalc is a free agricultural calculation tool operated by Hamad Khan from Lower Dir, Khyber Pakhtunkhwa, Pakistan. You do not need an account to use it, and we collect as little information as the Site can function on.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Cookies and Analytics</h2>
          <p>
            We use essential cookies, Google Analytics through Google Tag Manager, local storage for your unit preference, and advertising cookies where advertising is served. You can block cookies in your browser; analytics and advertising cookies are not required for the calculator.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Third-Party Services</h2>
          <p>
            Vercel provides hosting and content delivery. Google Analytics measures aggregate traffic and usage. These providers may process server logs, cookies, device data, browsing data and request metadata under their own privacy policies. We do not sell personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Security</h2>
          <p>
            We use HTTPS and reputable infrastructure, but no internet transmission or storage method is completely secure. Please do not send sensitive personal or financial information by email.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Children's Privacy</h2>
          <p>
            Ferti-Calc is intended for a general audience of agricultural professionals and hobbyists. We do not knowingly collect information from anyone under the age of 13 in compliance with COPPA (Children's Online Privacy Protection Act).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Changes to this Policy</h2>
          <p>
            We may update our Privacy Policy periodically. Any changes will be posted on this page, and the "Last Updated" date at the top will be modified accordingly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Contact Details</h2>
          <p>
            For access, correction, deletion, objection, portability or privacy questions, email <a href="mailto:hamadkhan9996310@gmail.com" className="text-primary hover:underline">hamadkhan9996310@gmail.com</a> with “Privacy Request” in the subject line. We normally respond within 30 days.
          </p>
        </section>
      </div>
    </div>
  );
}
