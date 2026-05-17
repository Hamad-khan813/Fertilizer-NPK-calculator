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
        <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-6">Last Updated: May 17, 2026</p>
      </div>

      <div className="space-y-10 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect (Or Don't Collect)</h2>
          <p>
            Ferti-Calc is designed to respect your privacy. You can use our calculator without creating an account or providing any personally identifiable information (PII). We do not collect names, email addresses, or phone numbers unless you voluntarily contact our support team.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Cookies and Analytics</h2>
          <p>
            We use minimal cookies necessary for the functionality of the site. We also use standard web analytics (such as Google Analytics) to understand how visitors interact with our website. These tools collect anonymized data, including browser type, geographic region, and pages visited, to help us improve user experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Third-Party Services</h2>
          <p>
            Our website is hosted on Vercel, which may collect standard server logs (IP addresses) for security and performance routing. We do not sell, trade, or otherwise transfer your data to outside parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Security</h2>
          <p>
            We implement standard security measures, including SSL encryption (HTTPS), to maintain the safety of your connection to our servers. Because we do not store personal profiles or payment information, your risk profile when using Ferti-Calc is exceptionally low.
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
            If there are any questions regarding this privacy policy, you may contact us at: <br />
            <strong>Email:</strong> <a href="mailto:hamadkhan.hmd1@gmail.com" className="text-primary hover:underline">hamadkhan.hmd1@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
