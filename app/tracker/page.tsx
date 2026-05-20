'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useNpkLogs, NpkLog } from '../hooks/useNpkLogs';
import { NpkHistoryChart } from '../components/tracker/NpkHistoryChart';
import { Trash2, ArrowLeft, TrendingUp, Calendar, FlaskConical } from 'lucide-react';

export default function TrackerPage() {
  const { logs, isLoading, isError, deleteLog } = useNpkLogs();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this application log?')) return;
    setDeletingId(id);
    try {
      await deleteLog(id);
    } finally {
      setDeletingId(null);
    }
  };

  // Compute summary stats
  const totalApplications = logs?.length || 0;
  const avgN = totalApplications > 0 ? (logs!.reduce((s, l) => s + l.target_n, 0) / totalApplications).toFixed(1) : '—';
  const avgP = totalApplications > 0 ? (logs!.reduce((s, l) => s + l.target_p, 0) / totalApplications).toFixed(1) : '—';
  const avgK = totalApplications > 0 ? (logs!.reduce((s, l) => s + l.target_k, 0) / totalApplications).toFixed(1) : '—';

  return (
    <main id="main-content" className="min-h-screen bg-background subtle-grid py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary transition-colors mb-3">
              <ArrowLeft className="w-4 h-4" />
              Back to Calculator
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              NPK <span className="text-primary">Application Tracker</span>
            </h1>
            <p className="text-slate-500 mt-1 font-medium">Monitor your historical nutrient applications and track trends over time.</p>
          </div>
        </div>

        {/* Auth / Loading State */}
        {isError && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center mb-8">
            <FlaskConical className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-slate-900 mb-1">Sign in to Track Applications</h2>
            <p className="text-sm text-slate-600 mb-4">Connect your Supabase account to start logging and visualizing your fertilizer usage over time.</p>
            <p className="text-xs text-slate-400">Ensure <code className="bg-slate-100 px-1.5 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="bg-slate-100 px-1.5 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> are set in your <code className="bg-slate-100 px-1.5 py-0.5 rounded">.env.local</code>.</p>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">
                  <Calendar className="w-4 h-4" /> Total Logs
                </div>
                <p className="text-3xl font-extrabold text-slate-900">{totalApplications}</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center gap-2 text-blue-500 text-xs font-bold uppercase tracking-widest mb-2">
                  <TrendingUp className="w-4 h-4" /> Avg N
                </div>
                <p className="text-3xl font-extrabold text-blue-600">{avgN}</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">
                  <TrendingUp className="w-4 h-4" /> Avg P
                </div>
                <p className="text-3xl font-extrabold text-amber-600">{avgP}</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-2">
                  <TrendingUp className="w-4 h-4" /> Avg K
                </div>
                <p className="text-3xl font-extrabold text-emerald-600">{avgK}</p>
              </div>
            </div>

            {/* Chart */}
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-6">NPK Trend Over Time</h2>
              <NpkHistoryChart logs={logs || []} />
            </section>

            {/* Log Table */}
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">Application History</h2>
              </div>
              {(!logs || logs.length === 0) ? (
                <div className="p-12 text-center">
                  <FlaskConical className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">No application logs yet.</p>
                  <p className="text-sm text-slate-400 mt-1">Run a calculation and click &quot;💾 Save to Tracker&quot; to start logging.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-3 text-xs font-bold uppercase text-slate-500">Date</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase text-slate-500">Fertilizer</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase text-slate-500">NPK</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase text-slate-500">Amount</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase text-slate-500">Volume</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase text-slate-500">Notes</th>
                        <th className="px-6 py-3 text-xs font-bold uppercase text-slate-500 w-16"></th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-50">
                      {logs.map((log: NpkLog) => (
                        <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-mono text-slate-700 whitespace-nowrap">
                            {new Date(log.application_date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-900 whitespace-nowrap">{log.fertilizer_id}</td>
                          <td className="px-6 py-4 font-mono text-primary whitespace-nowrap">{log.target_n}-{log.target_p}-{log.target_k}</td>
                          <td className="px-6 py-4 text-slate-700 whitespace-nowrap">{log.amount_g}g</td>
                          <td className="px-6 py-4 text-slate-700 whitespace-nowrap">{log.volume_l}L</td>
                          <td className="px-6 py-4 text-slate-500 max-w-[200px] truncate">{log.notes || '—'}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDelete(log.id)}
                              disabled={deletingId === log.id}
                              className="text-slate-300 hover:text-red-500 transition-colors disabled:opacity-50"
                              aria-label="Delete log"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
