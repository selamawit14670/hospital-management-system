import React from 'react';
import { Activity, Plus, Calendar, User, FileText, ArrowRight } from 'lucide-react';
import type { AppRoute } from '../../types';
import { ALL_PATIENTS } from '../../services/doctorDashboardService';

interface DoctorConsultationsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const DoctorConsultationsPage: React.FC<DoctorConsultationsPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Patient Consultations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Clinical case summaries, differential diagnoses, and completed patient consultations
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/doctor/consultations/new' as AppRoute)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Consultation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ALL_PATIENTS.flatMap((p) =>
          p.previousConsultations.map((c) => ({
            ...c,
            patientName: p.name,
            patientId: p.patientId,
            patientAvatar: p.avatarUrl,
          }))
        ).map((cons) => (
          <div
            key={cons.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 space-y-3 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={cons.patientAvatar}
                  alt={cons.patientName}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{cons.patientName}</h3>
                  <span className="font-mono text-[11px] text-slate-500">{cons.patientId}</span>
                </div>
              </div>
              <span className="text-xs text-slate-500 font-medium">{cons.date}</span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              <strong>Notes:</strong> {cons.notes}
            </p>

            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-800">
              <strong>Plan:</strong> {cons.treatment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
