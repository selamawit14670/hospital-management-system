import React, { useState } from 'react';
import { Calendar, Clock, Play, User, Filter, ArrowRight, CheckCircle, Search } from 'lucide-react';
import type { AppRoute } from '../../types';
import type { DoctorAppointment } from '../../types/doctor';
import { TODAY_APPOINTMENTS } from '../../services/doctorDashboardService';

interface DoctorAppointmentsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const DoctorAppointmentsPage: React.FC<DoctorAppointmentsPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'All' | 'Waiting' | 'Confirmed' | 'Completed'>('All');
  const [search, setSearch] = useState('');

  const filtered = TODAY_APPOINTMENTS.filter((apt) => {
    const matchesFilter =
      filter === 'All' ? true : apt.status === filter;
    const matchesSearch =
      apt.patientName.toLowerCase().includes(search.toLowerCase()) ||
      apt.patientId.toLowerCase().includes(search.toLowerCase()) ||
      apt.reason.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Doctor Appointments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Consultation schedule, patient queue, and clinical examination sessions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate?.('/doctor/dashboard' as AppRoute)}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            &larr; Back to Dashboard
          </button>
        </div>
      </div>

      {/* Filters and search */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search appointment by patient, ID, or clinical reason..."
            className="w-full bg-slate-50 focus:bg-white text-slate-800 placeholder:text-slate-400 text-sm rounded-xl border border-slate-200 py-2 pl-10 pr-4 transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
          />
        </div>

        <div className="flex items-center gap-2">
          {(['All', 'Waiting', 'Confirmed', 'Completed'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Time</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Patient ID</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map((apt) => (
                <tr key={apt.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-slate-900 text-xs whitespace-nowrap">
                    {apt.time}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={apt.patientAvatar}
                        alt={apt.patientName}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                        {apt.patientName}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                    {apt.patientId}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-700 max-w-xs truncate">
                    {apt.reason}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border">
                      {apt.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                        apt.status === 'Waiting'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : apt.status === 'Confirmed'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => onNavigate?.('/doctor/consultations/new' as AppRoute)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Start Consultation</span>
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
