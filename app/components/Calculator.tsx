'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Fertilizer, CalcResult, calcAmount } from '../lib/calculate';
import fertilizersData from '../data/fertilizers.json';

interface CalculatorProps {
  onResult: (result: CalcResult | null, inputs: any) => void;
  onSelectedFertilizer: (fertilizer: Fertilizer | null) => void;
}

function CalculatorContent({ onResult, onSelectedFertilizer }: CalculatorProps) {
  const searchParams = useSearchParams();
  const [targetN, setTargetN] = useState<number>(10);
  const [targetP, setTargetP] = useState<number>(5);
  const [targetK, setTargetK] = useState<number>(10);
  const [volumeLitres, setVolumeLitres] = useState<number>(1);
  const [selectedFertilizerId, setSelectedFertilizerId] = useState<string>(
    fertilizersData.length > 0 ? fertilizersData[0].id : ''
  );

  const fertilizers = fertilizersData as Fertilizer[];
  const selectedFertilizer = fertilizers.find((f) => f.id === selectedFertilizerId) || null;

  useEffect(() => {
    onSelectedFertilizer(selectedFertilizer);
  }, [selectedFertilizer, onSelectedFertilizer]);

  // Load from URL params
  useEffect(() => {
    const n = searchParams.get('n');
    const p = searchParams.get('p');
    const k = searchParams.get('k');
    const v = searchParams.get('v');
    const f = searchParams.get('f');

    if (n) setTargetN(parseFloat(n));
    if (p) setTargetP(parseFloat(p));
    if (k) setTargetK(parseFloat(k));
    if (v) setVolumeLitres(parseFloat(v));
    if (f) setSelectedFertilizerId(f);
  }, [searchParams]);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!selectedFertilizer) {
      onResult(null, null);
      return;
    }

    const result = calcAmount({
      targetN,
      targetP,
      targetK,
      volumeLitres,
      fertilizer: selectedFertilizer,
    });

    onResult(result, { targetN, targetP, targetK, volumeLitres, fertilizerId: selectedFertilizerId });
  };

  // Run initial calculation if params are present
  useEffect(() => {
    if (searchParams.toString()) {
      handleCalculate();
    }
  }, [searchParams, selectedFertilizerId]);

  // Imperative WebMCP Tool Registration
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).navigator?.modelContext?.registerTool) {
      try {
        (window as any).navigator.modelContext.registerTool({
          toolname: "calculateNPKMix",
          tooldescription: "Computes the precise percentage weights and mixing values for Nitrogen (N), Phosphorus (P), and Potassium (K) based on user crop targets",
          inputSchema: {
            type: "object",
            properties: {
              targetN: { type: "number", description: "Target Nitrogen percentage (0-100)" },
              targetP: { type: "number", description: "Target Phosphorus (P2O5) percentage (0-100)" },
              targetK: { type: "number", description: "Target Potassium (K2O) percentage (0-100)" },
              volume: { type: "number", description: "Total water reservoir volume in litres" },
              fertilizerId: { type: "string", description: "The ID of the source fertilizer from the database" }
            },
            required: ["targetN", "targetP", "targetK", "volume", "fertilizerId"]
          },
          execute: async (params: any) => {
            const fert = fertilizers.find(f => f.id === params.fertilizerId);
            if (!fert) throw new Error("Fertilizer not found");
            
            const calcRes = calcAmount({
              targetN: params.targetN,
              targetP: params.targetP,
              targetK: params.targetK,
              volumeLitres: params.volume,
              fertilizer: fert,
            });

            return JSON.stringify({
              success: true,
              result: calcRes,
              inputs: params
            });
          }
        });
      } catch (err) {
        console.warn("WebMCP registration failed:", err);
      }
    }
  }, [fertilizers]);

  // Group fertilizers by category
  const groupedFertilizers = fertilizers.reduce(
    (acc, fert) => {
      if (!acc[fert.category]) {
        acc[fert.category] = [];
      }
      acc[fert.category].push(fert);
      return acc;
    },
    {} as Record<string, Fertilizer[]>
  );

  const categoryOrder = ['nitrogen', 'phosphorus', 'potassium', 'compound', 'micronutrient'];

  return (
    <div className="w-full">
      <form 
        onSubmit={handleCalculate} 
        className="space-y-8"
        {...{ 
          toolname: "calculateNPKMix",
          tooldescription: "Computes the precise percentage weights and mixing values for Nitrogen (N), Phosphorus (P), and Potassium (K) based on user crop targets",
          toolautosubmit: "true" 
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Target N */}
          <div>
            <label htmlFor="targetN" className="block text-sm font-semibold text-slate-700 mb-2">
              Target N <span className="text-xs text-slate-400 font-normal">(%)</span>
            </label>
            <div className="relative">
              <input
                id="targetN"
                name="nitrogen_input"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={targetN}
                onChange={(e) => setTargetN(parseFloat(e.target.value) || 0)}
                className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                placeholder="0–100"
                aria-label="Target Nitrogen percentage"
                {...{ toolparamdescription: "The desired target percentage of Nitrogen, entered as a float from 0 to 100." }}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">N</span>
            </div>
          </div>

          {/* Target P */}
          <div>
            <label htmlFor="targetP" className="block text-sm font-semibold text-slate-700 mb-2">
              Target P <span className="text-xs text-slate-400 font-normal">(% P₂O₅)</span>
            </label>
            <div className="relative">
              <input
                id="targetP"
                name="phosphorus_input"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={targetP}
                onChange={(e) => setTargetP(parseFloat(e.target.value) || 0)}
                className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                placeholder="0–100"
                aria-label="Target Phosphorus percentage"
                {...{ toolparamdescription: "The desired target percentage of Phosphorus (P2O5), entered as a float from 0 to 100." }}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">P₂O₅</span>
            </div>
          </div>

          {/* Target K */}
          <div>
            <label htmlFor="targetK" className="block text-sm font-semibold text-slate-700 mb-2">
              Target K <span className="text-xs text-slate-400 font-normal">(% K₂O)</span>
            </label>
            <div className="relative">
              <input
                id="targetK"
                name="potassium_input"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={targetK}
                onChange={(e) => setTargetK(parseFloat(e.target.value) || 0)}
                className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                placeholder="0–100"
                aria-label="Target Potassium percentage"
                {...{ toolparamdescription: "The desired target percentage of Potassium (K2O), entered as a float from 0 to 100." }}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">K₂O</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Volume */}
          <div>
            <label htmlFor="volume" className="block text-sm font-semibold text-slate-700 mb-2">
              Target Volume <span className="text-xs text-slate-400 font-normal">(litres)</span>
            </label>
            <div className="relative">
              <input
                id="volume"
                name="volume_litres"
                type="number"
                min="0.1"
                step="0.1"
                value={volumeLitres}
                onChange={(e) => setVolumeLitres(parseFloat(e.target.value) || 1)}
                className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                placeholder="1"
                aria-label="Target volume in litres"
                {...{ toolparamdescription: "The total target volume of the nutrient solution in litres." }}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Fertilizer Dropdown */}
          <div>
            <label htmlFor="fertilizer" className="block text-sm font-semibold text-slate-700 mb-2">
              Select Source Fertilizer
            </label>
            <div className="relative">
              <select
                id="fertilizer"
                name="fertilizer_id"
                value={selectedFertilizerId}
                onChange={(e) => setSelectedFertilizerId(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
                aria-label="Select source fertilizer from database"
                {...{ toolparamdescription: "The unique identifier of the source fertilizer to be used in the calculation." }}
              >
                <option value="">-- Choose a fertilizer --</option>
                {categoryOrder.map((category) => {
                  const fertsInCategory = groupedFertilizers[category];
                  if (!fertsInCategory || fertsInCategory.length === 0) return null;

                  return (
                    <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
                      {fertsInCategory.map((fert) => (
                        <option key={fert.id} value={fert.id}>
                          {fert.name} ({fert.code})
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          type="submit"
          className="w-full py-4 px-6 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-primary-20 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          aria-label="Calculate fertilizer amount and run agronomical analysis"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Run Analysis
        </button>
      </form>
    </div>
  );
}

export default function Calculator(props: CalculatorProps) {
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading Calculator...</div>}>
      <CalculatorContent {...props} />
    </Suspense>
  );
}
