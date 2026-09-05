import React from 'react';
import { Pill, Plus, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import type { AppRoute } from '../../types';
import { ALL_PATIENTS } from '../../services/doctorDashboardService';

interface DoctorPrescriptionsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const DoctorPrescriptionsPage: React.FC<DoctorPrescriptionsPageProps> = ({ onNavigate }) => {
  const allPrescriptions = ALL_PATIENTS.flatMap((p) =>
    p.prescriptions.map((rx) => ({
      ...rx,
      patientName: p.name,
      patientId: p.patientId,
      patientAvatar: p.avatarUrl,
    }))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            e-Prescriptions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Formulate, digitally sign, and dispense pharmaceutical orders to the hospital pharmacy
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
          <h2 className="font-bold text-base text-slate-900">Active Patient Prescriptions</h2>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            {allPrescriptions.length} Active Rx
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Patient</th>
                <th className="py-3 px-4">Medication & Dosage</th>
                <th className="py-3 px-4">Frequency</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Date Issued</th>
                <th className="py-3 px-6 text-right">Dispense Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {allPrescriptions.map((rx) => (
                <tr key={rx.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={rx.patientAvatar}
                        alt={rx.patientName}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 text-xs sm:text-sm">{rx.patientName}</p>
                        <span className="font-mono text-[10px] text-slate-500">{rx.patientId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900 text-xs sm:text-sm">{rx.medication}</p>
                      <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.2 rounded border font-semibold">
                        {rx.dosage}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">{rx.frequency}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600">{rx.duration}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">{rx.date}</td>
                  <td className="py-3.5 px-6 text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      {rx.status}
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
