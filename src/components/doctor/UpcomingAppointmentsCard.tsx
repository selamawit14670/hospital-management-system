import React from 'react';
import { Calendar, Clock, ArrowRight, CheckCircle2, CalendarCheck } from 'lucide-react';
import type { UpcomingAppointment } from '../../types/doctor';
import type { AppRoute } from '../../types';

interface UpcomingAppointmentsCardProps {
  appointments: UpcomingAppointment[];
  onViewAppointment?: (aptId: string) => void;
  onNavigate?: (path: AppRoute) => void;
}

export const UpcomingAppointmentsCard: React.FC<UpcomingAppointmentsCardProps> = ({
  appointments,
  onViewAppointment,
  onNavigate,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200">
            <CalendarCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base tracking-tight">
              Upcoming Appointments
            </h3>
            <p className="text-xs text-slate-400">Next clinical consults scheduled for today</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/doctor/appointments' as AppRoute)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        >
          Calendar
        </button>
      </div>

      {/* Appointment items */}
      <div className="p-4 space-y-2.5 flex-1">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-blue-200 hover:shadow-2xs transition-all flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Time block */}
              <div className="w-16 text-center py-1 px-2 rounded-lg bg-white border border-slate-200 text-slate-800 font-bold text-xs shrink-0 shadow-2xs">
                {apt.time}
              </div>

              <div className="min-w-0">
                <p className="font-bold text-sm text-slate-900 truncate">{apt.patientName}</p>
                <p className="text-xs text-slate-500 truncate">{apt.type}</p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  apt.status === 'Confirmed'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {apt.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
