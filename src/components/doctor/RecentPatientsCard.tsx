import React from 'react';
import { Users, FileText, ArrowRight, Calendar, Stethoscope } from 'lucide-react';
import type { PatientDetailedRecord } from '../../types/doctor';
import type { AppRoute } from '../../types';

interface RecentPatientsCardProps {
  patients: PatientDetailedRecord[];
  onViewRecord: (patientId: string) => void;
  onNavigate?: (path: AppRoute) => void;
}

export const RecentPatientsCard: React.FC<RecentPatientsCardProps> = ({
  patients,
  onViewRecord,
  onNavigate,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base tracking-tight">
              Recent Patients
            </h3>
            <p className="text-xs text-slate-400">
              Recently consulted patients and follow-up clinical cases
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/doctor/patients' as AppRoute)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>All Patients</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Patients Table / List */}
      <div className="divide-y divide-slate-100">
        {patients.map((patient) => (
          <div
            key={patient.patientId}
            className="p-4 sm:px-5 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            {/* Left: Avatar & Demographics */}
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={patient.avatarUrl}
                alt={patient.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4
                    onClick={() => onViewRecord(patient.patientId)}
                    className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer truncate"
                  >
                    {patient.name}
                  </h4>
                  <span className="font-mono text-[10px] font-semibold bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded border border-slate-200 shrink-0">
                    {patient.patientId}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                  <span>{patient.age} yrs • {patient.gender}</span>
                  <span>•</span>
                  <span className="text-slate-700 font-medium truncate max-w-xs" title={patient.primaryDiagnosis}>
                    {patient.primaryDiagnosis}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Last Visit + Action */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
              <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 sm:bg-transparent px-2 py-1 rounded sm:p-0">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium text-slate-700">{patient.lastVisit}</span>
              </div>

              <button
                type="button"
                onClick={() => onViewRecord(patient.patientId)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                <span>View Record</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
