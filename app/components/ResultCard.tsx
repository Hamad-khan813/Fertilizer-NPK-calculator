'use client';

import { useState } from 'react';
import { CalcResult, Fertilizer } from '../lib/calculate';
import { useUnitSystem } from './UnitSystemProvider';
import { generateMarkdownReport, UseCase } from '../lib/seoEntities';
import { LogApplicationModal } from './tracker/LogApplicationModal';
import ProductRecommendation from './ProductRecommendation';

interface ResultCardProps {
  result: CalcResult | null;
  fertilizer: Fertilizer | null;
  inputs?: {
    targetN: number;
    targetP: number;
    targetK: number;
    volumeLitres: number;
    fertilizerId: string;
  } | null;
  useCase?: UseCase;
}

export default function ResultCard({ result, fertilizer, inputs, useCase = 'general' }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [mdCopied, setMdCopied] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { system } = useUnitSystem();

  const getShareUrl = () => {
    if (!inputs) return '';
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ferti-calc.vercel.app';
    const params = new URLSearchParams({
      n: inputs.targetN.toString(),
      p: inputs.targetP.toString(),
      k: inputs.targetK.toString(),
      v: inputs.volumeLitres.toString(),
      f: inputs.fertilizerId
    });
    return `${baseUrl}/?${params.toString()}`;
  };

  const handleCopy = () => {
    const url = getShareUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMarkdownCopy = () => {
    if (!result || !inputs || !fertilizer) return;
    const isLiquid = fertilizer.form === 'liquid';
    const md = generateMarkdownReport(result, inputs, system, isLiquid, useCase);
    navigator.clipboard.writeText(md);
    setMdCopied(true);
    setTimeout(() => setMdCopied(false), 2000);
  };

  const handleTweet = () => {
    if (!result || !fertilizer) return;
    const text = `I just calculated my fertilizer recipe using @ferticalc — ${result.amountG}${fertilizer.form === 'liquid' ? 'ml' : 'g'} for my target ratio 🍅 Try it free:`;
    const url = getShareUrl();
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="w-full space-y-6">
      {!result || !fertilizer ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-slate-500 font-medium">
            Configure your targets and click &quot;Run Analysis&quot; to generate your fertilizer recipe.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="premium-gradient px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-slate-100/20 p-2 rounded-lg backdrop-blur-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-white font-bold tracking-wide uppercase text-sm">Analysis Report</h3>
            </div>
            <span className="text-slate-100 text-xs font-mono">{new Date().toLocaleDateString()}</span>
          </div>

          <div className="p-6 space-y-8">
            {/* Main Result */}
            <div className="text-center pb-8 border-b border-slate-100" aria-live="polite">
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Required Amount</p>
              <div className="flex items-baseline justify-center gap-2">
                {(() => {
                  const g = result.amountG;
                  const isLiquid = fertilizer.form === 'liquid';
                  
                  let displayAmount = g.toString();
                  let displayUnit = isLiquid ? 'ml' : 'g';

                  if (system === 'imperial') {
                    if (isLiquid) {
                      if (g < 3785.41) {
                        displayAmount = (g / 29.5735).toFixed(2);
                        displayUnit = 'fl oz';
                      } else {
                        displayAmount = (g / 3785.41).toFixed(2);
                        displayUnit = 'gal';
                      }
                    } else {
                      if (g < 453.592) {
                        displayAmount = (g / 28.3495).toFixed(2);
                        displayUnit = 'oz';
                      } else {
                        displayAmount = (g / 453.592).toFixed(2);
                        displayUnit = 'lbs';
                      }
                    }
                  } else {
                    if (g >= 1000) {
                      displayAmount = (g / 1000).toFixed(2);
                      displayUnit = isLiquid ? 'L' : 'kg';
                    }
                  }

                  return (
                    <>
                      <span className="text-6xl font-black text-slate-900 tracking-tight">{displayAmount}</span>
                      <span className="text-2xl font-bold text-slate-600">{displayUnit}</span>
                    </>
                  );
                })()}
              </div>
              <p className="mt-4 text-slate-600 font-medium px-4 py-2 bg-slate-50 rounded-full inline-block">
                Using {fertilizer.name}
              </p>
            </div>

            {/* Nutrients Delivered */}
            <figure className="space-y-4">
              <figcaption className="text-slate-900 font-bold flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Delivered Nutrients
              </figcaption>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'N', val: result.actualN, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'P₂O₅', val: result.actualP, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { label: 'K₂O', val: result.actualK, color: 'text-amber-600', bg: 'bg-amber-50' },
                ].map((item) => (
                  <div key={item.label} className={`${item.bg} rounded-xl p-4 transition-transform hover:scale-105 cursor-default`}>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${item.color} mb-1`}>{item.label}</p>
                    <p className="text-xl font-black text-slate-900">{item.val}%</p>
                  </div>
                ))}
              </div>
            </figure>

            {/* Insight Box */}
            <figure className="bg-slate-900 rounded-2xl p-5 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="bg-primary-20 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <figcaption className="text-slate-600 text-xs font-bold uppercase tracking-widest mb-1">Limiting Factor</figcaption>
                  <p className="text-sm font-medium leading-relaxed">
                    {result.limitingNutrient ? (
                      <>The target for <span className="text-primary font-bold">{result.limitingNutrient === 'P' ? 'P₂O₅' : result.limitingNutrient === 'K' ? 'K₂O' : result.limitingNutrient}</span> is the limiting factor in this calculation.</>
                    ) : (
                      "All targets achieved exactly with this application rate."
                    )}
                  </p>
                </div>
              </div>
            </figure>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <button
                onClick={handleMarkdownCopy}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-emerald-500 text-emerald-700 bg-emerald-50 font-bold hover:bg-emerald-100 transition-all active:scale-95 sm:col-span-1"
              >
                {mdCopied ? "Copied!" : "📋 Markdown"}
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95 sm:col-span-1"
              >
                {copied ? "Copied!" : "🔗 Copy Link"}
              </button>
              <button
                onClick={handleTweet}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1DA1F2] text-white font-bold hover:brightness-110 transition-all active:scale-95 sm:col-span-1"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Share
              </button>
            </div>

            {/* Save to Tracker */}
            <button
              onClick={() => setShowSaveModal(true)}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
              💾 Save to Tracker
            </button>

            {/* Product Recommendation based on Target NPK */}
            {inputs && (
              <ProductRecommendation 
                targetN={inputs.targetN} 
                targetP={inputs.targetP} 
                targetK={inputs.targetK} 
              />
            )}

            {/* Warnings/Notes */}
            {(result.warning || fertilizer.notes) && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                {result.warning && (
                  <div className="flex items-start gap-3 text-amber-600 bg-amber-50 p-4 rounded-xl border border-amber-100">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-xs font-semibold leading-relaxed">{result.warning}</p>
                  </div>
                )}
                {fertilizer.notes && (
                  <p className="text-xs text-slate-500 italic leading-relaxed pl-1">
                    Note: {fertilizer.notes}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Save Modal */}
      {result && fertilizer && inputs && (
        <LogApplicationModal
          isOpen={showSaveModal}
          onClose={() => setShowSaveModal(false)}
          result={result}
          inputs={inputs}
          fertilizer={fertilizer}
          useCase={useCase}
        />
      )}
    </div>
  );
}
