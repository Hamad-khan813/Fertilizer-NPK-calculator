'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import fertilizersData from '@/data/fertilizers.json';
import { Fertilizer } from '@/app/lib/calculate';
import { FERTILIZERS } from '@/lib/fertilizer-data';

export default function FertilizersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const fertilizers = fertilizersData as Fertilizer[];

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return fertilizers;

    const query = searchQuery.toLowerCase();
    return fertilizers.filter(
      (fert) =>
        fert.name.toLowerCase().includes(query) ||
        fert.code.toLowerCase().includes(query)
    );
  }, [searchQuery, fertilizers]);

  // Group by category
  const grouped = useMemo(() => {
    return filtered.reduce(
      (acc, fert) => {
        if (!acc[fert.category]) {
          acc[fert.category] = [];
        }
        acc[fert.category].push(fert);
        return acc;
      },
      {} as Record<string, Fertilizer[]>
    );
  }, [filtered]);

  const categoryOrder = ['nitrogen', 'phosphorus', 'potassium', 'compound', 'micronutrient'];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 to-primary-20/40 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">Fertilizer Database</h1>
          <p className="text-lg text-slate-600">Browse all 52+ fertilizers with complete NPK specifications</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-sticky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <input
            type="text"
            placeholder="Search by name or code (e.g., Urea, 46-0-0)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-slate-600">No fertilizers found matching "{searchQuery}"</p>
          </div>
        ) : (
          categoryOrder.map((category) => {
            const fertsInCategory = grouped[category];
            if (!fertsInCategory || fertsInCategory.length === 0) return null;

            return (
              <div key={category} className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 capitalize">
                  {category === 'nitrogen' && '🌾'}
                  {category === 'phosphorus' && '🌱'}
                  {category === 'potassium' && '💪'}
                  {category === 'compound' && '🧬'}
                  {category === 'micronutrient' && '🔬'}{' '}
                  {category}
                </h2>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-slate-900">Code</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-slate-900">N %</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-slate-900">P₂O₅ %</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-slate-900">K₂O %</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-slate-900">Form</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-slate-900">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fertsInCategory.map((fert: Fertilizer, idx: number) => (
                        <tr key={fert.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">{fert.name}</td>
                          <td className="px-6 py-4 text-center text-sm text-slate-600">{fert.code}</td>
                          <td className="px-6 py-4 text-center text-sm text-slate-600">{fert.N}</td>
                          <td className="px-6 py-4 text-center text-sm text-slate-600">{fert.P}</td>
                          <td className="px-6 py-4 text-center text-sm text-slate-600">{fert.K}</td>
                          <td className="px-6 py-4 text-center text-sm">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                fert.form === 'liquid'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-primary-20 text-primary-dark'
                              }`}
                            >
                              {fert.form === 'liquid' ? '💧 Liquid' : '🪨 Granular'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center text-sm font-semibold">
                            {(() => {
                              const match = FERTILIZERS.find((f) => f.id === fert.id);
                              if (match) {
                                return (
                                  <Link
                                    href={`/fertilizers/${match.slug}`}
                                    className="text-primary hover:text-primary-dark"
                                  >
                                    View Calculator
                                  </Link>
                                );
                              }
                              return (
                                <Link
                                  href={`/?f=${fert.id}`}
                                  className="text-slate-600 hover:text-primary"
                                >
                                  Use
                                </Link>
                              );
                            })()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })
        )}

        <div className="text-center text-sm text-slate-600 mt-12 pt-8 border-t border-slate-200">
          <p>Showing {filtered.length} of {fertilizers.length} fertilizers</p>
        </div>
      </div>
    </div>
  );
}
