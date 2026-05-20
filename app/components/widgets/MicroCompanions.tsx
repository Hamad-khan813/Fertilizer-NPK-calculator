'use client';

export function MicroCompanions({ targetN, targetP, targetK }: { targetN: number, targetP: number, targetK: number }) {
  const needsCalcium = targetN > 15; // High N depletes Calcium
  const needsMagnesium = targetK > 10; // High K competes with Magnesium
  const needsSulfur = targetP > 15; // High P can lock out Sulfur
  
  if (!needsCalcium && !needsMagnesium && !needsSulfur) return null;

  return (
    <div className="mt-4 p-4 rounded-xl bg-blue-50 text-blue-900 border border-blue-200">
      <h4 className="font-bold flex items-center gap-2 mb-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        Micronutrient Companion List
      </h4>
      <ul className="list-disc list-inside text-sm space-y-1">
        {needsCalcium && <li><strong className="font-semibold">Calcium:</strong> Add Calcium Nitrate to prevent blossom end rot (High N can inhibit Ca uptake).</li>}
        {needsMagnesium && <li><strong className="font-semibold">Magnesium:</strong> Add Magnesium Sulfate (Epsom) to combat K-antagonism from high Potassium levels.</li>}
        {needsSulfur && <li><strong className="font-semibold">Sulfur:</strong> Consider sulfate-based amendments as high Phosphorus can interfere with Sulfur absorption.</li>}
      </ul>
    </div>
  );
}
