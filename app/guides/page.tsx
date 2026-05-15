import Link from 'next/link';
import { getAllGuides } from '@/lib/guides';

export const metadata = {
  title: 'Agriculture Guides — FertiCalc Resource Center',
  description: 'Master crop nutrition with our professional guides. From NPK basics to advanced hydroponic nutrient management.',
};

export default async function GuidesPage() {
  const guides = await getAllGuides();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-100 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Agriculture <span className="text-primary">Guides</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            Science-backed resources to help you master fertilizer math, soil chemistry, and crop productivity.
          </p>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {guides.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-lg text-slate-500">Our expert team is currently drafting new guides. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <Link 
                key={guide.slug} 
                href={`/guides/${guide.slug}`}
                className="group glass-card p-8 flex flex-col hover:border-primary/30 transition-all hover:translate-y-[-4px]"
              >
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">
                    {guide.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">
                  {guide.title}
                </h2>
                <p className="text-slate-600 mb-8 flex-grow line-clamp-3 leading-relaxed">
                  {guide.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                  <span className="text-sm font-medium text-slate-400">{guide.readTime} read</span>
                  <span className="text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Guide <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Apply your knowledge now</h2>
          <p className="text-emerald-50 text-lg mb-10 opacity-90">
            Our precision NPK calculator is free, instant, and uses the same science found in these guides.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-white text-primary font-bold px-10 py-4 rounded-xl shadow-xl hover:scale-105 transition-transform"
          >
            Go to Calculator →
          </Link>
        </div>
      </section>
    </div>
  );
}
