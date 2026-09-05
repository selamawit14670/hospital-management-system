import React from 'react';
import { Calendar, Clock, UserCheck, Stethoscope, ArrowRight } from 'lucide-react';
import type { AppRoute } from '../../types';
import { NURSE_PATIENT_QUEUE } from '../../services/nurseDashboardService';

interface NurseAppointmentsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const NurseAppointmentsPage: React.FC<NurseAppointmentsPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Clinic Check-in & Appointments Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Verify patient arrival, perform pre-consultation vitals screening, and allocate triage priority
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

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-base text-slate-900">Today's Appointment Screening Schedule</h2>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            {NURSE_PATIENT_QUEUE.length} Checked In
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Patient</th>
                <th className="py-3 px-4">Patient ID</th>
                <th className="py-3 px-4">Allocated Station</th>
                <th className="py-3 px-4">Attending Doctor</th>
                <th className="py-3 px-4">Screening Status</th>
                <th className="py-3 px-6 text-right">Triage Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {NURSE_PATIENT_QUEUE.map((patient) => (
                <tr key={patient.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={patient.patientAvatar}
                        alt={patient.patientName}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 text-xs sm:text-sm">{patient.patientName}</p>
                        <p className="text-[11px] text-slate-400">{patient.age}y • {patient.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                    {patient.patientId}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-semibold text-slate-800">
                    {patient.roomBed}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-700">
                    {patient.doctorName}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => onNavigate?.('/nurse/dashboard' as AppRoute)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Screen Vitals</span>
                    </button>
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
