'use client';

import { useState, useEffect } from 'react';
import { Fertilizer, CalcResult, calcAmount } from '../lib/calculate';
import fertilizersData from '../data/fertilizers.json';

interface CalculatorProps {
  onResult: (result: CalcResult | null) => void;
  onSelectedFertilizer: (fertilizer: Fertilizer | null) => void;
}

export default function Calculator({ onResult, onSelectedFertilizer }: CalculatorProps) {
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

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFertilizer) {
      onResult(null);
      return;
    }

    const result = calcAmount({
      targetN,
      targetP,
      targetK,
      volumeLitres,
      fertilizer: selectedFertilizer,
    });

    onResult(result);
  };

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
      <form onSubmit={handleCalculate} className="space-y-6">
        {/* Target N */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target N (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={targetN}
            onChange={(e) => setTargetN(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0–100"
          />
        </div>

        {/* Target P */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target P (% as P₂O₅)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={targetP}
            onChange={(e) => setTargetP(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0–100"
          />
        </div>

        {/* Target K */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target K (% as K₂O)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={targetK}
            onChange={(e) => setTargetK(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0–100"
          />
        </div>

        {/* Volume */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Volume (litres)
          </label>
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={volumeLitres}
            onChange={(e) => setVolumeLitres(parseFloat(e.target.value) || 1)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="1"
          />
        </div>

        {/* Fertilizer Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Fertilizer
          </label>
          <select
            value={selectedFertilizerId}
            onChange={(e) => setSelectedFertilizerId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        </div>

        {/* Calculate Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Calculate
        </button>
      </form>
    </div>
  );
}
