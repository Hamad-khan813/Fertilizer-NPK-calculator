import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ferti-Calc',
  description: 'Information about cookies, analytics, hosting, saved application records, and privacy requests for FertiCalc.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">Privacy Policy</h1>
        <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-6">Last updated: October 22, 2026</p>
      </div>

      <div className="space-y-10 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information and records</h2>
          <p>
            FertiCalc is operated by Hamad Khan from Lower Dir, Khyber Pakhtunkhwa, Pakistan. The calculator can be used without an account. If you choose to save an application in the tracker, the information you submit (which may include fertilizer, amounts, targets, dates, and notes) is sent to the configured Supabase service and associated with your authenticated account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Cookies and Analytics</h2>
          <p>
            The site sets a `unit-system` cookie to remember the metric or imperial preference. The Google Tag Manager container ID assigned to this site is GTM-TJK3D923, but its script is currently disabled pending a consent management platform. TODO(owner): select and configure a Google-certified consent management platform and connect it to Consent Mode v2 before enabling analytics or advertising tags.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Hosting and third-party services</h2>
          <p>
            Vercel provides hosting and content delivery. Supabase processes tracker records when you use that feature. Google services may receive browsing, device, cookie, and request information if applicable tags are enabled. Each provider processes information under its own terms and privacy policy. TODO(owner): document verified provider retention periods and any additional services enabled in production.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Third-party advertising</h2>
          <p>
            If advertising is enabled, third-party vendors, including Google, may use cookies to serve ads based on prior visits to this or other websites. Users can review or change ad personalization settings at <a className="text-primary hover:underline" href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. Advertising tags should be governed by the selected consent platform where required.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data security and retention</h2>
          <p>
            Service providers may retain server logs and submitted tracker data as described in their policies. TODO(owner): set and publish retention periods for tracker data, logs, and support email. No internet transmission or storage method is completely secure. Please do not send sensitive personal or financial information by email.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Children&apos;s privacy</h2>
          <p>
            The site is intended for general audiences and is not designed to collect personal information from children. Contact us if you believe a child has submitted personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Your privacy requests</h2>
          <p>
            Depending on applicable law, you may have rights to request access, correction, deletion, or restriction of personal information. Contact us using the details below; we may need to verify your request.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Changes and contact</h2>
          <p>
            This policy may be updated as the site changes; the updated date above will reflect revisions. For privacy questions or requests, email <a href="mailto:hamadkhan9996310@gmail.com" className="text-primary hover:underline">hamadkhan9996310@gmail.com</a> with “Privacy Request” in the subject line. TODO(owner): replace this Gmail address with a domain email.
          </p>
        </section>
      </div>
    </div>
  );
}
