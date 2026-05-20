'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';

interface ProductRecommendationProps {
  targetN: number;
  targetP: number;
  targetK: number;
}

interface ProductCategory {
  id: string;
  name: string;
  description: string;
  idealRatio: [number, number, number]; // [N, P, K] relative weights
  urlSlug: string;
}

const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'veg-hydro',
    name: 'Smart Leafy Greens Hydroponic Setup',
    description: 'Optimized for high-nitrogen vegetative growth, perfect for herbs and leafy greens.',
    idealRatio: [3, 1, 2],
    urlSlug: 'hydroponic-nutrients'
  },
  {
    id: 'bloom-planter',
    name: 'Advanced Bloom Planter Kit',
    description: 'Designed for high-phosphorus flowering and fruiting cycles to maximize yields.',
    idealRatio: [1, 3, 2],
    urlSlug: 'flowering-npk'
  },
  {
    id: 'root-system',
    name: 'Deep Root Aeration Planter',
    description: 'Focuses on phosphorus and potassium balance for robust subsurface root development.',
    idealRatio: [1, 2, 2],
    urlSlug: 'fertilizer-compatibility'
  },
  {
    id: 'general-utility',
    name: 'Home Utility Garden Starter Kit',
    description: 'A perfectly balanced system for general-purpose home gardening and maintenance.',
    idealRatio: [1, 1, 1],
    urlSlug: 'what-is-npk'
  }
];

// Helper to calculate Euclidean distance between two NPK ratios
function calculateProximityScore(userNPK: [number, number, number], targetNPK: [number, number, number]): number {
  // Normalize both vectors to compare the ratios rather than absolute magnitudes
  const userTotal = userNPK[0] + userNPK[1] + userNPK[2] || 1;
  const targetTotal = targetNPK[0] + targetNPK[1] + targetNPK[2] || 1;

  const normalizedUser = userNPK.map(v => v / userTotal);
  const normalizedTarget = targetNPK.map(v => v / targetTotal);

  // Calculate squared distance
  const distanceSq = normalizedUser.reduce((sum, val, i) => sum + Math.pow(val - normalizedTarget[i], 2), 0);

  return Math.sqrt(distanceSq);
}

export default function ProductRecommendation({ targetN, targetP, targetK }: ProductRecommendationProps) {
  const bestMatch = useMemo(() => {
    if (targetN === 0 && targetP === 0 && targetK === 0) {
      return {
        ...PRODUCT_CATEGORIES[3],
        matchPercentage: 100,
      };
    }

    let minScore = Infinity;
    let closestCategory = PRODUCT_CATEGORIES[3];

    for (const cat of PRODUCT_CATEGORIES) {
      const score = calculateProximityScore([targetN, targetP, targetK], cat.idealRatio);
      if (score < minScore) {
        minScore = score;
        closestCategory = cat;
      }
    }

    // Proximity score of 0 means perfect match (100%). Maximum possible distance between two normalized 3D vectors is sqrt(2) ≈ 1.414.
    // Let's calculate ratio match percentage.
    const matchPercentage = Math.max(0, Math.min(100, Math.round((1 - minScore / 1.414) * 100)));

    return {
      ...closestCategory,
      matchPercentage,
    };
  }, [targetN, targetP, targetK]);

  return (
    <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-20/10 text-primary-dark animate-pulse">
          <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          Recommended Setup
        </span>
        <span className="text-xs font-bold text-slate-500 font-mono">
          {bestMatch.matchPercentage}% Ratio Match
        </span>
      </div>

      <h4 className="text-base font-bold text-slate-900 mb-1">{bestMatch.name}</h4>
      <p className="text-xs text-slate-600 mb-4 leading-relaxed">{bestMatch.description}</p>

      <div className="flex items-center justify-between pt-3 border-t border-slate-200/60">
        <div className="text-[11px] text-slate-500 font-medium">
          Ideal Ratio: <span className="font-bold text-slate-700">{bestMatch.idealRatio.join(':')}</span>
        </div>
        <Link
          href={`/guides/${bestMatch.urlSlug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-dark transition-colors"
        >
          View Growth Guide
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}