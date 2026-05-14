'use client';

import { CalcResult, Fertilizer } from '../lib/calculate';

interface ResultCardProps {
  result: CalcResult | null;
  fertilizer: Fertilizer | null;
}

export default function ResultCard({ result, fertilizer }: ResultCardProps) {
  if (!result || !fertilizer) {
    return (
      <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-gray-500 text-sm">
          Fill in the form and click "Calculate" to see results here.
        </p>
      </div>
    );
  }

  const isLiquid = fertilizer.form === 'liquid';
  const unitLabel = isLiquid ? 'ml' : 'grams';
  const unitSymbol = isLiquid ? 'ml' : 'g';

  return (
    <div className="w-full bg-emerald-50 border border-emerald-200 rounded-lg p-6 space-y-6">
      {/* Fertilizer Info */}
      <div className="border-b border-emerald-200 pb-4">
        <div className="flex items-center gap-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
              isLiquid ? 'bg-blue-500' : 'bg-green-500'
            }`}
          >
            {isLiquid ? 'Liquid' : 'Granular'}
          </span>
          <div>
            <p className="font-semibold text-gray-900">{fertilizer.name}</p>
            <p className="text-sm text-gray-600">{fertilizer.code}</p>
          </div>
        </div>
      </div>

      {/* Amount to Use */}
      <div className="bg-white rounded-lg p-4 border border-emerald-100">
        <p className="text-sm text-gray-600 mb-1">Amount to Use</p>
        <p className="text-3xl font-bold text-emerald-600">
          {result.amountG} {unitSymbol}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          {isLiquid ? '(assuming density ~1 g/ml)' : ''}
        </p>
      </div>

      {/* Actual NPK Delivered */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-lg p-3 border border-emerald-100">
          <p className="text-xs text-gray-600 font-medium uppercase">Actual N</p>
          <p className="text-lg font-bold text-gray-900 mt-1">{result.actualN}%</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-emerald-100">
          <p className="text-xs text-gray-600 font-medium uppercase">Actual P₂O₅</p>
          <p className="text-lg font-bold text-gray-900 mt-1">{result.actualP}%</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-emerald-100">
          <p className="text-xs text-gray-600 font-medium uppercase">Actual K₂O</p>
          <p className="text-lg font-bold text-gray-900 mt-1">{result.actualK}%</p>
        </div>
      </div>

      {/* Limiting Nutrient */}
      {result.limitingNutrient && (
        <div className="bg-white rounded-lg p-4 border border-emerald-100">
          <p className="text-sm text-gray-600 mb-1">Limiting Nutrient</p>
          <p className="font-semibold text-gray-900">
            {result.limitingNutrient === 'P' ? 'P₂O₅' : result.limitingNutrient === 'K' ? 'K₂O' : result.limitingNutrient}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            This nutrient determines how much fertilizer is needed.
          </p>
        </div>
      )}

      {/* Notes */}
      {fertilizer.notes && (
        <div className="bg-white rounded-lg p-4 border border-emerald-100">
          <p className="text-sm text-gray-600 mb-2 font-medium">Notes</p>
          <p className="text-sm text-gray-700">{fertilizer.notes}</p>
        </div>
      )}

      {/* Warning */}
      {result.warning && (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
          <p className="text-xs font-semibold text-amber-900 uppercase mb-1">⚠️ Warning</p>
          <p className="text-sm text-amber-900">{result.warning}</p>
        </div>
      )}
    </div>
  );
}
