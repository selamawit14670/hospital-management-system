import React from 'react';
import { Clock, Stethoscope, ArrowUpRight, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import type { UpcomingAppointment, AppointmentStatus } from '../../types/dashboard';
import type { AppRoute } from '../../types';

interface UpcomingAppointmentsPanelProps {
  appointments: UpcomingAppointment[];
  onNavigate?: (path: AppRoute) => void;
}

export const UpcomingAppointmentsPanel: React.FC<UpcomingAppointmentsPanelProps> = ({
  appointments,
  onNavigate,
}) => {
  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            Confirmed
          </span>
        );
      case 'Scheduled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3 h-3" />
            Scheduled
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
            Completed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3 h-3" />
            Pending
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Upcoming Consultations & Appointments
            </h3>
            <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
              Today's Queue
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time outpatient consultation itinerary and examination schedules
          </p>
        </div>

        {onNavigate && (
          <button
            type="button"
            onClick={() => onNavigate('/admin/appointments')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
          >
            <span>All Bookings</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Appointment Cards / List */}
      <div className="divide-y divide-slate-100">
        {appointments.map((item) => (
          <div
            key={item.id}
            className="py-3.5 first:pt-1 last:pb-1 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50/70 rounded-xl px-2.5 -mx-2.5 transition-colors"
          >
            {/* Patient & Reason */}
            <div className="flex items-start gap-3 min-w-0">
              <img
                src={item.avatarUrl}
                alt={item.patientName}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0 mt-0.5"
              />

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {item.patientName}
                  </h4>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                    {item.patientId}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-medium line-clamp-1 mt-0.5">
                  <span className="text-slate-400 font-normal">Reason: </span>
                  {item.reason}
                </p>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                  <Stethoscope className="w-3 h-3 text-blue-500" />
                  <span>{item.doctorName}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-medium">{item.department}</span>
                </div>
              </div>
            </div>

            {/* Time & Status Badge */}
            <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/80">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>{item.time}</span>
              </div>

              <div>{getStatusBadge(item.status)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
