import React, { useState } from 'react';
import {
  Calendar,
  Play,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import type { DoctorAppointment, AppointmentClinicalStatus } from '../../types/doctor';
import type { AppRoute } from '../../types';

interface TodayAppointmentsTableProps {
  appointments: DoctorAppointment[];
  onStartConsultation: (appointment: DoctorAppointment) => void;
  onViewPatient: (patientId: string) => void;
  onNavigate?: (path: AppRoute) => void;
}

export const TodayAppointmentsTable: React.FC<TodayAppointmentsTableProps> = ({
  appointments,
  onStartConsultation,
  onViewPatient,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'All' | 'Waiting' | 'Confirmed' | 'Completed'>('All');

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === 'All') return true;
    if (filter === 'Waiting') return apt.status === 'Waiting';
    if (filter === 'Confirmed') return apt.status === 'Confirmed';
    if (filter === 'Completed') return apt.status === 'Completed';
    return true;
  });

  const getStatusBadge = (status: AppointmentClinicalStatus) => {
    switch (status) {
      case 'Waiting':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600 animate-spin" />
            Waiting
          </span>
        );
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            Confirmed
          </span>
        );
      case 'In Consultation':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
            In Consultation
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Follow-up':
        return 'bg-sky-50 text-sky-700 border-sky-100';
      case 'Consultation':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Checkup':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Emergency':
        return 'bg-rose-50 text-rose-700 border-rose-100 font-bold';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div id="today-appointments-section" className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Today's Appointments
              </h2>
              <p className="text-xs text-slate-400">
                8 scheduled clinical patient visits for today
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills & View All Link */}
        <div className="flex flex-wrap items-center gap-2">
          {(['All', 'Waiting', 'Confirmed', 'Completed'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {f}
              {f === 'Waiting' && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white font-bold">
                  2
                </span>
              )}
            </button>
          ))}

          <button
            type="button"
            onClick={() => onNavigate?.('/doctor/appointments' as AppRoute)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 ml-2 cursor-pointer"
          >
            <span>Full Schedule</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-6">Patient</th>
              <th className="py-3 px-4">Patient ID</th>
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Reason</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right pr-6">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredAppointments.map((apt) => {
              const canStartConsultation = apt.status === 'Waiting' || apt.status === 'Confirmed';
              return (
                <tr
                  key={apt.id}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  {/* Patient Info with Avatar & Room */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={apt.patientAvatar}
                        alt={apt.patientName}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                          {apt.patientName}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {apt.room || 'General Clinic'}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Patient ID */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {apt.patientId}
                    </span>
                  </td>

                  {/* Time */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {apt.time}
                    </div>
                  </td>

                  {/* Reason */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="text-xs font-medium text-slate-700 truncate" title={apt.reason}>
                      {apt.reason}
                    </p>
                  </td>

                  {/* Type */}
                  <td className="py-3.5 px-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getTypeBadge(apt.type)}`}>
                      {apt.type}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    {getStatusBadge(apt.status)}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right pr-6">
                    {canStartConsultation ? (
                      <button
                        type="button"
                        onClick={() => onStartConsultation(apt)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs hover:shadow transition-all duration-150 cursor-pointer shrink-0"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Start Consultation</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onViewPatient(apt.patientId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium transition-all duration-150 cursor-pointer shrink-0"
                      >
                        <User className="w-3 h-3 text-slate-400" />
                        <span>View Patient</span>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
