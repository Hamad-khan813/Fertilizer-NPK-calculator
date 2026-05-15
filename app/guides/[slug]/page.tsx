import Link from 'next/link';
import { getGuideBySlug, getAllGuides } from '@/lib/guides';
import Script from 'next/script';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const guides = await getAllGuides();
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const guide = await getGuideBySlug(slug);
    return {
      title: guide.title,
      description: guide.excerpt,
      alternates: {
        canonical: `/guides/${guide.slug}`,
      },
    };
  } catch {
    return {
      title: 'Guide Not Found',
    };
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const guide = await getGuideBySlug(slug);
    const allGuides = await getAllGuides();
    const relatedGuides = allGuides.filter((g) => g.slug !== guide.slug).slice(0, 3);

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": guide.title,
      "datePublished": "2026-05-15",
      "dateModified": "2026-05-15",
      "author": {
        "@type": "Organization",
        "name": "FertiCalc"
      }
    };

    return (
      <div className="min-h-screen bg-white">
        {/* Article Header */}
        <div className="bg-slate-50 border-b border-slate-100 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-primary font-bold flex items-center gap-2 mb-8 hover:underline">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to Calculator
            </Link>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              {guide.title}
            </h1>
            <div className="flex items-center gap-6 text-slate-500 font-medium">
              <span>Last Updated: May 2026</span>
              <span>•</span>
              <span>{guide.readTime}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <div 
                className="prose prose-slate prose-lg max-w-none
                  prose-headings:text-slate-900 prose-headings:font-bold
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
                  prose-li:text-slate-600 prose-li:mb-2
                  prose-strong:text-slate-900
                  prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                  prose-table:border prose-table:border-slate-200
                  prose-th:bg-slate-50 prose-th:p-4 prose-td:p-4 prose-td:border-t prose-td:border-slate-100"
                dangerouslySetInnerHTML={{ __html: guide.htmlContent }}
              />

              {/* Related Reading */}
              {relatedGuides.length > 0 && (
                <div className="mt-20 pt-12 border-t border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Reading</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {relatedGuides.map((g) => (
                      <Link key={g.slug} href={`/guides/${g.slug}`} className="group">
                        <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{g.title}</h3>
                        <p className="text-sm text-slate-500 mt-2 line-clamp-2">{g.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar CTA */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24">
                <div className="bg-primary rounded-3xl p-8 text-white shadow-2xl shadow-primary/20 overflow-hidden relative">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                  <h3 className="text-2xl font-bold mb-4 relative z-10">Try Our Free NPK Calculator</h3>
                  <p className="text-emerald-50 mb-8 relative z-10 opacity-90">
                    Apply the science from this guide instantly. Calculate precise grams-per-liter recipes for any crop.
                  </p>
                  <Link 
                    href="/" 
                    className="block w-full bg-white text-primary font-bold py-4 rounded-xl text-center hover:scale-[1.02] transition-transform shadow-lg"
                  >
                    Start Calculating →
                  </Link>
                </div>

                <div className="mt-8 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4">Why use FertiCalc?</h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      52+ Fertilizers in database
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Accuracy to 0.001g/L
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Professional Agronomy Logic
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <Script
          id="guide-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </div>
    );
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Guide Not Found</h1>
          <p className="text-slate-600 mb-8">The guide you're looking for doesn't exist.</p>
          <Link href="/" className="bg-primary text-white px-8 py-3 rounded-xl font-bold">Back to Home</Link>
        </div>
      </div>
    );
  }
}
