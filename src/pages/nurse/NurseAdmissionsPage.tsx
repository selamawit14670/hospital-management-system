import React from 'react';
import { BedDouble, Clock, Stethoscope, ArrowRight, CheckCircle2, UserPlus } from 'lucide-react';
import type { AppRoute } from '../../types';
import { RECENT_ADMISSIONS } from '../../services/nurseDashboardService';

interface NurseAdmissionsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const NurseAdmissionsPage: React.FC<NurseAdmissionsPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Ward Admissions & Bed Census
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Monitor real-time bed capacity, manage room transfers, and track inpatient intake status
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/nurse/dashboard' as AppRoute)}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          &larr; Back to Dashboard
        </button>
      </div>

      {/* Ward Capacity Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <p className="text-xs text-slate-500 font-semibold uppercase">Total Ward Beds</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">20 Beds</p>
          <p className="text-xs text-blue-600 font-medium mt-1">Ward Station 4</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <p className="text-xs text-slate-500 font-semibold uppercase">Occupied Beds</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">14 Occupied</p>
          <p className="text-xs text-slate-500 font-medium mt-1">70% Occupancy rate</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <p className="text-xs text-slate-500 font-semibold uppercase">Available Beds</p>
          <p className="text-2xl font-extrabold text-blue-600 mt-1">6 Available</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Ready for emergency intake</p>
        </div>
      </div>

      {/* Admissions Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-base text-slate-900">Current Inpatient Intake Records</h2>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {RECENT_ADMISSIONS.length} Intakes Today
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Patient</th>
                <th className="py-3 px-4">Patient ID</th>
                <th className="py-3 px-4">Room & Bed</th>
                <th className="py-3 px-4">Admitting Diagnosis</th>
                <th className="py-3 px-4">Assigned Doctor</th>
                <th className="py-3 px-4">Admission Time</th>
                <th className="py-3 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {RECENT_ADMISSIONS.map((adm) => (
                <tr key={adm.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={adm.patientAvatar}
                        alt={adm.patientName}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 text-xs sm:text-sm">{adm.patientName}</p>
                        <p className="text-[11px] text-slate-400">{adm.age}y • {adm.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                    {adm.patientId}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-xs text-slate-800">
                    {adm.room} • {adm.bed}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-700">
                    {adm.diagnosis}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-700">
                    {adm.assignedDoctor}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    {adm.admissionTime}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                        adm.status === 'Admitted'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {adm.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
