import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Ferti-Calc',
  description: 'Get in touch with the Ferti-Calc team for feedback, bugs, and collaborations.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">Contact Us</h1>
        <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-6">Last Updated: May 17, 2026</p>
        <p className="text-xl text-slate-600 leading-relaxed">
          FertiCalc is independently maintained by Hamad Khan. Messages go directly to the developer behind the tool.
        </p>
      </div>

      <div className="space-y-12">
        <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How Can We Help?</h2>
          <div className="text-slate-600 space-y-4 leading-relaxed">
            <p><strong>Calculation errors:</strong> Include the page, exact inputs, result received and expected result, with a source where possible.</p>
            <p><strong>Requests:</strong> Suggest fertilizers, crops, features or guide topics.</p>
            <p><strong>Technical problems:</strong> Include your browser, device, page URL and a screenshot if possible.</p>
            <p><strong>Privacy and partnerships:</strong> Use the email below for privacy requests, integrations and freelance enquiries.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Get In Touch</h2>
          <div className="text-slate-600 leading-relaxed mb-6">
            <p>The best way to reach us is via email:</p>
            <p className="text-xl font-bold text-primary mt-2">
              <a href="mailto:hamadkhan9996310@gmail.com" className="hover:underline">hamadkhan9996310@gmail.com</a>
            </p>
          </div>
          <div className="bg-emerald-50 text-emerald-800 p-6 rounded-2xl border border-emerald-100">
            <h3 className="font-bold mb-2">Expected Response Time</h3>
            <p className="text-sm">Please allow <strong>1 to 2 business days</strong> for a response.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
