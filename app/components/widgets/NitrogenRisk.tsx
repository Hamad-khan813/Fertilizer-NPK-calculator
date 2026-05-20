'use client';
import { useState } from 'react';

export function NitrogenRisk({ nValue }: { nValue: number }) {
  const [method, setMethod] = useState<'surface' | 'incorporated'>('surface');
  
  if (nValue <= 0) return null;

  const lossPercentage = method === 'surface' ? 30 : 5;
  const lostN = (nValue * (lossPercentage / 100)).toFixed(2);
  
  return (
    <div className="mt-4 p-4 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          Nitrogen Volatilization Estimator
        </h4>
        <select 
          value={method} 
          onChange={(e) => setMethod(e.target.value as 'surface' | 'incorporated')}
          className="text-sm border-amber-300 bg-white rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="surface">Surface Broadcast</option>
          <option value="incorporated">Soil Incorporated</option>
        </select>
      </div>
      <p className="text-sm">Applying <strong className="font-black">{nValue}%</strong> Nitrogen via {method === 'surface' ? 'surface broadcast' : 'soil incorporation'} yields a <strong className="font-black">~{lossPercentage}%</strong> volatilization loss (<strong className="font-black">{lostN}%</strong> N lost to atmosphere).</p>
    </div>
  );
}
