'use client';

import { useState } from 'react';
import { useNpkLogs } from '../../hooks/useNpkLogs';
import { CalcResult, Fertilizer } from '../../lib/calculate';
import { UseCase } from '../../lib/seoEntities';

interface LogApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: CalcResult;
  inputs: any;
  fertilizer: Fertilizer;
  useCase: UseCase;
}

export function LogApplicationModal({ isOpen, onClose, result, inputs, fertilizer, useCase }: LogApplicationModalProps) {
  const { addLog } = useNpkLogs();
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addLog({
        use_case: useCase,
        fertilizer_id: inputs.fertilizerId,
        amount_g: result.amountG,
        volume_l: inputs.volumeLitres,
        target_n: inputs.targetN,
        target_p: inputs.targetP,
        target_k: inputs.targetK,
        notes: notes || null
      });
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to save log. Please ensure you are logged in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Save to Tracker</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-600 mb-4">
            <p><strong>Fertilizer:</strong> {fertilizer.name}</p>
            <p><strong>Target NPK:</strong> {inputs.targetN}-{inputs.targetP}-{inputs.targetK}</p>
            <p><strong>Calculated Amount:</strong> {result.amountG} {fertilizer.form === 'liquid' ? 'ml' : 'g'}</p>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-semibold text-slate-700 mb-1">Observation Notes (Optional)</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none h-24"
              placeholder="e.g. Applied during week 3 of flowering phase..."
            ></textarea>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Log'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
