import React from 'react';
import { X, FlaskConical, CheckCircle2, Clock, AlertTriangle, Calendar, Printer, ShieldCheck } from 'lucide-react';
import type { PatientLabResult } from '../../types/patient';

interface PatientLabResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: PatientLabResult | null;
}

export const PatientLabResultModal: React.FC<PatientLabResultModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Diagnostic Laboratory Report
              </h3>
              <p className="text-xs text-slate-500">
                Report #{result.id} • Verified Pathology
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Top Panel Banner */}
          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900">
                {result.category}
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                ● {result.status}
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-900">
              {result.testName}
            </h4>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 pt-0.5">
              <span>Specimen: {result.specimen}</span>
              <span>•</span>
              <span>Ordered by: {result.orderedBy}</span>
            </div>
          </div>

          {/* Test Parameters Breakdown */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Diagnostic Biomarkers & Reference Ranges
            </h5>

            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Analyte / Parameter</th>
                    <th className="py-2.5 px-3">Result</th>
                    <th className="py-2.5 px-3">Reference Range</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {result.parameters.map((param, i) => (
                    <tr key={i} className="hover:bg-slate-50/60">
                      <td className="py-2.5 px-3 font-medium text-slate-900">
                        {param.parameter}
                      </td>
                      <td className="py-2.5 px-3 font-bold font-mono">
                        {param.value} <span className="text-[10px] text-slate-500 font-normal">{param.unit}</span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">
                        {param.referenceRange}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            param.status === 'normal'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {param.status === 'normal' ? 'Normal' : 'Elevated'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Clinical Interpretation */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <p className="font-bold text-slate-800">Pathologist Summary</p>
            <p className="text-slate-600 leading-relaxed">
              {result.summary}
            </p>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified by MediCare Central Diagnostic Lab
            </span>
            <span>Turnaround: {result.turnaroundTime}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.print?.()}
            className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
