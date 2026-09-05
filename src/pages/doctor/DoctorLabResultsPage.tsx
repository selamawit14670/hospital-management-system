import React, { useState } from 'react';
import { FlaskConical, CheckCircle2, AlertTriangle, Eye, ArrowRight, Check } from 'lucide-react';
import type { AppRoute } from '../../types';
import { PENDING_LAB_RESULTS } from '../../services/doctorDashboardService';

interface DoctorLabResultsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const DoctorLabResultsPage: React.FC<DoctorLabResultsPageProps> = ({ onNavigate }) => {
  const [endorsedIds, setEndorsedIds] = useState<string[]>([]);

  const toggleEndorse = (id: string) => {
    setEndorsedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Pathology & Lab Diagnostics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Clinical blood counts, biochemistry panels, toxicology, and diagnostic imaging requiring doctor review
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/doctor/dashboard' as AppRoute)}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          &larr; Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-rose-600" />
            <h2 className="font-bold text-base text-slate-900">Diagnostic Reports to Review</h2>
          </div>
          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            {PENDING_LAB_RESULTS.length - endorsedIds.length} Pending Doctor Signature
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Patient</th>
                <th className="py-3 px-4">Patient ID</th>
                <th className="py-3 px-4">Test Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Date / Time</th>
                <th className="py-3 px-4">Triage Priority</th>
                <th className="py-3 px-6 text-right">Physician Sign-Off</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {PENDING_LAB_RESULTS.map((lab) => {
                const isEndorsed = endorsedIds.includes(lab.id);
                return (
                  <tr key={lab.id} className="hover:bg-blue-50/20 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={lab.patientAvatar}
                          alt={lab.patientName}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                          {lab.patientName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                      {lab.patientId}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-xs sm:text-sm text-slate-900">
                      {lab.testName}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">
                      {lab.department}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">
                      {lab.collectedTime}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                          lab.priority === 'Critical'
                            ? 'bg-rose-100 text-rose-800 border-rose-200 animate-pulse'
                            : lab.priority === 'Urgent'
                            ? 'bg-amber-100 text-amber-800 border-amber-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {lab.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => toggleEndorse(lab.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isEndorsed
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                        }`}
                      >
                        {isEndorsed ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Reviewed & Signed</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Review & Endorse</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
