import useSWR from 'swr';

export interface NpkLog {
  id: string;
  user_id: string;
  application_date: string;
  use_case: string;
  fertilizer_id: string;
  amount_g: number;
  volume_l: number;
  target_n: number;
  target_p: number;
  target_k: number;
  notes: string | null;
  created_at: string;
}

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
});

export function useNpkLogs() {
  const isConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const { data, error, isLoading, mutate } = useSWR<NpkLog[]>(isConfigured ? '/api/npk-logs' : null, fetcher);

  const addLog = async (logData: Partial<NpkLog>) => {
    if (!isConfigured) {
      console.warn('Supabase is not configured. Log was not saved.');
      return null;
    }
    const res = await fetch('/api/npk-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logData),
    });
    
    if (!res.ok) throw new Error('Failed to add log');
    const newLog = await res.json();
    
    // Optimistic update
    mutate((currentData) => [newLog, ...(currentData || [])], false);
    return newLog;
  };

  const deleteLog = async (id: string) => {
    if (!isConfigured) return;
    await fetch(`/api/npk-logs/${id}`, { method: 'DELETE' });
    mutate((currentData) => (currentData || []).filter(log => log.id !== id), false);
  };

  return {
    logs: data,
    isLoading,
    isError: error,
    addLog,
    deleteLog,
    mutate
  };
}
