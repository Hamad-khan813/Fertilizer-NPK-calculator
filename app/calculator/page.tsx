import type { Metadata } from 'next';
import Link from 'next/link';
import { CROPS } from '@/lib/calculator-data';

export const metadata: Metadata = {
  title: 'Fertiliser Calculators by Crop | FertiCalc',
  description: 'Browse fertiliser calculators tailored to every crop and unit system. Choose a crop then calculate NPK fertilizer rates in grams, kg, lbs, or ounces.',
  alternates: {
    canonical: 'https://ferti-calc.vercel.app/calculator',
  },
};

export default function CalculatorRootPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Crop Fertilizer Calculators
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          Select a crop calculator for quick NPK planning. The unit system can be adjusted inside the calculator so you can work in grams, kilograms, ounces, or pounds as needed.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {CROPS.slice(0, 8).map((crop) => (
            <section key={crop.slug} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">{crop.label}</h2>
              <Link
                href={`/calculator/${crop.slug}`}
                className="inline-flex rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                Open calculator
              </Link>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
