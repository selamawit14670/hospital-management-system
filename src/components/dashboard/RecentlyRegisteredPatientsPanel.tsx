import React from 'react';
import { IdCard, Phone, Droplet, User, ArrowUpRight } from 'lucide-react';
import type { RecentPatient } from '../../types/dashboard';
import type { AppRoute } from '../../types';

interface RecentlyRegisteredPatientsPanelProps {
  patients: RecentPatient[];
  onViewCard: (patient: RecentPatient) => void;
  onNavigate?: (path: AppRoute) => void;
}

export const RecentlyRegisteredPatientsPanel: React.FC<RecentlyRegisteredPatientsPanelProps> = ({
  patients,
  onViewCard,
  onNavigate,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Recently Registered Patients
            </h3>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              New Intakes
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Latest digital biometric cards and admissions issued
          </p>
        </div>

        {onNavigate && (
          <button
            type="button"
            onClick={() => onNavigate('/admin/patients')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
          >
            <span>All Patients</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Patient List */}
      <div className="divide-y divide-slate-100">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 rounded-xl px-2.5 -mx-2.5 transition-colors"
          >
            {/* Left: Avatar + Name + ID + Bio */}
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={patient.avatarUrl}
                alt={patient.name}
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
              />

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {patient.name}
                  </h4>
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 shrink-0">
                    {patient.patientId}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 mt-0.5">
                  <span>
                    {patient.gender}, {patient.age} yrs
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-rose-600">
                    <Droplet className="w-3 h-3 text-rose-500 fill-rose-500" />
                    Blood: {patient.bloodGroup}
                  </span>
                  <span className="text-slate-300 hidden md:inline">•</span>
                  <span className="inline-flex items-center gap-1 text-slate-500 hidden md:inline-flex">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {patient.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: View Card Button */}
            <div className="flex items-center justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onViewCard(patient)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all duration-150 cursor-pointer shadow-2xs active:scale-95"
              >
                <IdCard className="w-3.5 h-3.5 text-blue-600" />
                <span>View Card</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
