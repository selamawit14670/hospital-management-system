import React from 'react';
import { FlaskConical, AlertCircle, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import type { PendingLabResult } from '../../types/doctor';
import type { AppRoute } from '../../types';

interface PendingLabResultsCardProps {
  labResults: PendingLabResult[];
  onReviewLab: (labId: string) => void;
  onNavigate?: (path: AppRoute) => void;
}

export const PendingLabResultsCard: React.FC<PendingLabResultsCardProps> = ({
  labResults,
  onReviewLab,
  onNavigate,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
            <FlaskConical className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base tracking-tight flex items-center gap-2">
              Pending Lab Results
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                {labResults.length} pending
              </span>
            </h3>
            <p className="text-xs text-slate-400">Pathology & biochemistry diagnostics awaiting physician sign-off</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/doctor/lab-results' as AppRoute)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>All Results</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Lab list */}
      <div className="divide-y divide-slate-100 flex-1">
        {labResults.map((item) => (
          <div
            key={item.id}
            className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={item.patientAvatar}
                alt={item.patientName}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-900 truncate">{item.patientName}</h4>
                  <span className="font-mono text-[10px] font-semibold bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded border border-slate-200">
                    {item.patientId}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-800 mt-0.5 truncate">{item.testName}</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                  <span>{item.collectedTime}</span>
                  <span>•</span>
                  <span className="text-slate-600">{item.department}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  item.priority === 'Critical'
                    ? 'bg-rose-100 text-rose-800 border-rose-200 animate-pulse'
                    : item.priority === 'Urgent'
                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}
              >
                {item.status}
              </span>

              <button
                type="button"
                onClick={() => {
                  onReviewLab(item.id);
                  onNavigate?.('/doctor/lab-results' as AppRoute);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Review</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
