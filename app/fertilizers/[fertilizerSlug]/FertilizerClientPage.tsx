'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FertilizerDetails } from '@/lib/fertilizer-data';
import Calculator from '@/app/components/Calculator';
import ResultCard from '@/app/components/ResultCard';
import { Fertilizer, CalcResult } from '@/app/lib/calculate';

interface CalculatorInputs {
  targetN: number;
  targetP: number;
  targetK: number;
  volumeLitres: number;
  fertilizerId: string;
}

interface FertilizerClientPageProps {
  details: FertilizerDetails;
}

export default function FertilizerClientPage({ details }: FertilizerClientPageProps) {
  const [result, setResult] = useState<CalcResult | null>(null);
  const [inputs, setInputs] = useState<CalculatorInputs | null>(null);
  const [selectedFertilizer, setSelectedFertilizer] = useState<Fertilizer | null>(null);

  const handleResult = (newResult: CalcResult | null, newInputs: CalculatorInputs | null) => {
    setResult(newResult);
    setInputs(newInputs);
  };

  // Determine non-zero target fields to pre-fill
  const initialTargetN = details.npkArray[0] > 0 ? details.npkArray[0] : 0;
  const initialTargetP = details.npkArray[1] > 0 ? details.npkArray[1] : 0;
  const initialTargetK = details.npkArray[2] > 0 ? details.npkArray[2] : 0;

  // Render NPK Badge with elegant CSS
  const renderNpkBadge = () => {
    const [n, p, k] = details.npkArray;
    if (n === 0 && p === 0 && k === 0) {
      return (
        <div className="my-8 inline-flex rounded-2xl border border-emerald-200 bg-emerald-50/50 px-6 py-4 text-sm font-bold text-emerald-800">
          No NPK. Supplies Mg and S
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center gap-4 my-8">
        <div className="flex flex-col items-center bg-emerald-50/50 border border-emerald-200 rounded-2xl p-4 w-24 shadow-sm transition-all hover:scale-105">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Nitrogen</span>
          <span className="text-3xl font-black text-emerald-600 mt-1">{n}</span>
          <span className="text-[10px] font-semibold text-emerald-500 mt-0.5">N</span>
        </div>
        <div className="flex flex-col items-center bg-amber-50/50 border border-amber-200 rounded-2xl p-4 w-24 shadow-sm transition-all hover:scale-105">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Phosphate</span>
          <span className="text-3xl font-black text-amber-600 mt-1">{p}</span>
          <span className="text-[10px] font-semibold text-amber-500 mt-0.5">P₂O₅</span>
        </div>
        <div className="flex flex-col items-center bg-blue-50/50 border border-blue-200 rounded-2xl p-4 w-24 shadow-sm transition-all hover:scale-105">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Potash</span>
          <span className="text-3xl font-black text-blue-600 mt-1">{k}</span>
          <span className="text-[10px] font-semibold text-blue-500 mt-0.5">K₂O</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ol className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-500">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          </li>
          <li className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <Link href="/fertilizers" className="hover:text-primary transition-colors">Fertilizers</Link>
          </li>
          <li className="flex items-center gap-1.5 text-slate-900" aria-current="page">
            <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span>{details.name}</span>
          </li>
        </ol>
      </nav>

      {/* Header / Intro */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          {details.name} ({details.npk}) Calculator &amp; Dosage Guide
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
          {details.description}
        </p>

        {renderNpkBadge()}

      </header>

      {/* Embedded Calculator Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-8">
            Pre-configured {details.name} Calculator
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 bg-slate-50/50 rounded-2xl p-6 sm:p-8 border border-slate-100">
              <Calculator
                onResult={handleResult}
                onSelectedFertilizer={setSelectedFertilizer}
                initialFertilizerId={details.id}
                initialVolume={100}
                initialTargetN={initialTargetN > 0 ? 0.1 : 0}
                initialTargetP={initialTargetP > 0 ? 0.1 : 0}
                initialTargetK={initialTargetK > 0 ? 0.1 : 0}
              />
            </div>
            <div className="lg:col-span-5 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-primary rounded-full"></span>
                Calculated Recipe Output
              </h3>
              <ResultCard result={result} fertilizer={selectedFertilizer} inputs={inputs} useCase="general" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section (Details & Internal Links) */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 prose prose-slate max-w-none">
            {/* Section 1: What is it */}
            <div id="step1" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                1. What is {details.name}?
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {details.name} is a fertilizer product. Its listed analysis is <strong>{details.npk}</strong>. On fertilizer labels, the second and third numbers usually represent phosphate (P₂O₅) and potash (K₂O), rather than elemental phosphorus and potassium.
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                When dissolved in water, this fertilizer dissociates into plant-available ionic nutrients. This allows roots to absorb nutrients through the solution. Understanding the exact composition helps reduce mixing errors and supports more predictable application.
              </p>
            </div>

            {/* Section 2: Best Used For */}
            <div id="step2" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                2. Best Used For
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The listed uses depend on the product label, crop, soil or water test, and local recommendations. These examples are not application-rate recommendations:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none pl-0">
                {details.crops.map((crop, idx) => (
                  <li key={idx} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3 text-slate-700 font-semibold shadow-2xs">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{crop}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 3: Solubility & Mixing */}
            <div id="step3" className="scroll-mt-20">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                3. Handling &amp; Mixing Safety
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Follow the current product label and safety data sheet for handling, protective equipment, storage, solubility, and mixing instructions. Product grades and formulations can differ, so confirm details with the manufacturer before preparing a concentrated solution.
              </p>
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 my-6">
                <h4 className="text-lg font-bold text-emerald-800 mb-2">Before mixing</h4>
                <ol className="list-decimal pl-5 space-y-2 text-slate-700 text-sm sm:text-base">
                  <li>Read the product label and safety data sheet before use.</li>
                  <li>Use the protective equipment and handling precautions listed by the manufacturer.</li>
                  <li>Check compatibility instructions before mixing fertilizers, especially in concentrated stock solutions.</li>
                  <li>Use measuring equipment appropriate to the quantity and the product instructions.</li>
                  <li>Store and dispose of the product as directed on its label and by local rules.</li>
                </ol>
              </div>
            </div>

            {/* Section 4: Compatibility Warnings */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                4. Chemical Compatibility &amp; Warnings
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                To prevent chemical reactions that render nutrients unavailable to plants, observe the following compatibility constraints:
              </p>
              <div className="space-y-3">
                {details.compatibilityWarnings.map((warning, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-rose-50 border border-rose-200 rounded-xl p-4 text-rose-800 text-sm sm:text-base">
                    <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="font-semibold leading-relaxed">{warning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Related Fertilizers */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">
                5. Related Fertilizers
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Compare {details.name} with the analyses and product instructions of other fertilizers before planning a blend:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {details.relatedSlugs.map((slug) => {
                  const label = slug
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                  return (
                    <Link
                      key={slug}
                      href={`/fertilizers/${slug}`}
                      className="flex flex-col p-4 bg-slate-50 hover:bg-primary/5 border border-slate-200 hover:border-primary/30 rounded-2xl text-center font-bold text-slate-700 hover:text-primary transition-all hover:scale-[1.02] shadow-xs"
                    >
                      <span className="text-xs uppercase tracking-wider text-slate-400 mb-1">Calculator</span>
                      <span className="text-sm truncate">{label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
