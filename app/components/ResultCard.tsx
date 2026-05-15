'use client';

import { CalcResult, Fertilizer } from '../lib/calculate';

interface ResultCardProps {
  result: CalcResult | null;
  fertilizer: Fertilizer | null;
}

    <div className="w-full space-y-6">
      {!result || !fertilizer ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-slate-500 font-medium">
            Configure your targets and click "Run Analysis" to generate your fertilizer recipe.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="premium-gradient px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-white font-bold tracking-wide uppercase text-sm">Analysis Report</h3>
            </div>
            <span className="text-white/80 text-xs font-mono">{new Date().toLocaleDateString()}</span>
          </div>

          <div className="p-6 space-y-8">
            {/* Main Result */}
            <div className="text-center pb-8 border-b border-slate-100">
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Required Amount</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl font-black text-slate-900 tracking-tight">{result.amountG}</span>
                <span className="text-2xl font-bold text-slate-400">{fertilizer.form === 'liquid' ? 'ml' : 'g'}</span>
              </div>
              <p className="mt-4 text-slate-600 font-medium px-4 py-2 bg-slate-50 rounded-full inline-block">
                Using {fertilizer.name}
              </p>
            </div>

            {/* Nutrients Delivered */}
            <div className="space-y-4">
              <h4 className="text-slate-900 font-bold flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Delivered Nutrients
              </h4>
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
            </div>

            {/* Insight Box */}
            <div className="bg-slate-900 rounded-2xl p-5 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <div className="relative z-10 flex items-start gap-4">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Limiting Factor</p>
                  <p className="text-sm font-medium leading-relaxed">
                    {result.limitingNutrient ? (
                      <>The target for <span className="text-primary font-bold">{result.limitingNutrient === 'P' ? 'P₂O₅' : result.limitingNutrient === 'K' ? 'K₂O' : result.limitingNutrient}</span> is the limiting factor in this calculation.</>
                    ) : (
                      "All targets achieved exactly with this application rate."
                    )}
                  </p>
                </div>
              </div>
            </div>

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
    </div>
