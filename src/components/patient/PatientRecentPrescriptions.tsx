import React from 'react';
import { Pill, AlertCircle, CheckCircle2, RotateCw, Stethoscope, ChevronRight } from 'lucide-react';
import type { PatientPrescription } from '../../types/patient';

interface PatientRecentPrescriptionsProps {
  prescriptions: PatientPrescription[];
  onRequestRefill: (prescription: PatientPrescription) => void;
  onViewAll?: () => void;
}

export const PatientRecentPrescriptions: React.FC<PatientRecentPrescriptionsProps> = ({
  prescriptions,
  onRequestRefill,
  onViewAll,
}) => {
  return (
    <div id="prescriptions-section" className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Pill className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-900 truncate">
              Recent Prescriptions
            </h3>
            <p className="text-xs text-slate-500 truncate">
              Active pharmacy medications, daily dosage, and refill orders
            </p>
          </div>
        </div>

        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer shrink-0"
          >
            View All ({prescriptions.length})
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-3">
        {prescriptions.map((rx) => {
          const isRefillDue = rx.status === 'Refill Due';
          return (
            <div
              key={rx.id}
              className="p-4 rounded-xl border border-slate-150/80 hover:border-emerald-200 bg-slate-50/40 hover:bg-emerald-50/20 transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              {/* Drug Main Info */}
              <div className="flex items-start gap-3.5 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isRefillDue ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  <Pill className="w-5 h-5" />
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {rx.medicationName}
                    </h4>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        isRefillDue
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      ● {rx.status}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {rx.refillsRemaining} refills left
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium">
                    {rx.dosage} • <span className="text-slate-600">{rx.instructions}</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Stethoscope className="w-3 h-3 text-slate-400" />
                      Prescribed by {rx.doctorName}
                    </span>
                    <span>•</span>
                    <span>Issued {rx.prescribedDate}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-700">
                      ETB {rx.costEtb.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={() => onRequestRefill(rx)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-2xs ${
                    isRefillDue
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-white hover:bg-emerald-600 hover:text-white text-slate-700 border border-slate-200 hover:border-emerald-600'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{isRefillDue ? 'Refill Now' : 'Request Refill'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
