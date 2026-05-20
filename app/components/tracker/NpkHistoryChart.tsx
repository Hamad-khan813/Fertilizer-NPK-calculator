'use client';

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { NpkLog } from '../../hooks/useNpkLogs';

export function NpkHistoryChart({ logs }: { logs: NpkLog[] }) {
  const data = useMemo(() => {
    // Sort logs chronologically
    const sorted = [...logs].sort((a, b) => new Date(a.application_date).getTime() - new Date(b.application_date).getTime());
    
    // Group by date or just map to flat data structure
    return sorted.map(log => ({
      date: new Date(log.application_date).toLocaleDateString(),
      N: log.target_n,
      P: log.target_p,
      K: log.target_k,
    }));
  }, [logs]);

  if (!logs || logs.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
        <p className="text-slate-500 font-medium">No application history found. Start logging to see trends.</p>
      </div>
    );
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
          <Line type="monotone" dataKey="N" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Nitrogen (N)" />
          <Line type="monotone" dataKey="P" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Phosphorus (P)" />
          <Line type="monotone" dataKey="K" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Potassium (K)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
