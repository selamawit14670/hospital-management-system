import React from 'react';
import { BedDouble, Clock, Stethoscope, ArrowRight, UserCheck } from 'lucide-react';
import type { AdmissionRecord } from '../../types/nurse';
import type { AppRoute } from '../../types';

interface RecentAdmissionsCardProps {
  admissions: AdmissionRecord[];
  onViewPatient?: (patientId: string) => void;
  onNavigate?: (path: AppRoute) => void;
}

export const RecentAdmissionsCard: React.FC<RecentAdmissionsCardProps> = ({
  admissions,
  onViewPatient,
  onNavigate,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
            <BedDouble className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base tracking-tight">
              Recent Ward Admissions
            </h3>
            <p className="text-xs text-slate-400">Newly assigned bed intakes and intake documentation</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/nurse/admissions' as AppRoute)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Bed Census</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Admissions List */}
      <div className="divide-y divide-slate-100">
        {admissions.map((adm) => (
          <div
            key={adm.id}
            className="p-4 sm:px-5 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            {/* Left: Patient Info */}
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={adm.patientAvatar}
                alt={adm.patientName}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4
                    onClick={() => onViewPatient?.(adm.patientId)}
                    className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer truncate"
                  >
                    {adm.patientName}
                  </h4>
                  <span className="font-mono text-[10px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded border border-slate-200">
                    {adm.patientId}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                  <span className="font-semibold text-slate-800">{adm.room} • {adm.bed}</span>
                  <span>•</span>
                  <span className="truncate max-w-xs">{adm.diagnosis}</span>
                </div>
              </div>
            </div>

            {/* Right: Doctor, Time & Status */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100 text-xs">
              <div className="flex flex-col sm:items-end">
                <div className="flex items-center gap-1 text-slate-700 font-medium">
                  <Stethoscope className="w-3 h-3 text-slate-400" />
                  <span>{adm.assignedDoctor}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-[11px] mt-0.5">
                  <Clock className="w-3 h-3" />
                  <span>{adm.admissionTime}</span>
                </div>
              </div>

              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                  adm.status === 'Admitted'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}
              >
                {adm.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
