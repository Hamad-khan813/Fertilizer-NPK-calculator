'use client';

export function RunoffRisk({ targetP }: { targetP: number }) {
  if (targetP === 0) return null;

  const isHighRisk = targetP > 20;
  const isMedRisk = targetP > 10 && targetP <= 20;

  let colorClass = 'bg-green-50 text-green-900 border-green-200';
  let iconColor = 'text-green-600';
  let riskLevel = 'Low (Safe)';
  let desc = 'Phosphorus levels are within agronomical safety bounds for minimal watershed impact.';

  if (isHighRisk) {
    colorClass = 'bg-red-50 text-red-900 border-red-200';
    iconColor = 'text-red-600';
    riskLevel = 'High (Algal Bloom Danger)';
    desc = 'Extreme phosphorus levels detected. Ensure heavy soil incorporation and avoid surface application near waterways.';
  } else if (isMedRisk) {
    colorClass = 'bg-yellow-50 text-yellow-900 border-yellow-200';
    iconColor = 'text-yellow-600';
    riskLevel = 'Moderate';
    desc = 'Elevated phosphorus. Monitor local regulations regarding P-runoff in your watershed.';
  }

  return (
    <div className={`mt-4 p-4 rounded-xl border ${colorClass}`}>
      <h4 className="font-bold flex items-center gap-2 mb-1">
        <svg className={`w-5 h-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        Environmental Runoff Risk Score: {riskLevel}
      </h4>
      <p className="text-sm">{desc}</p>
    </div>
  );
}
