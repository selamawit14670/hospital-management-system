import React from 'react';
import { Stethoscope, Clock, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react';
import type { DoctorScheduleItem } from '../../types/dashboard';
import type { AppRoute } from '../../types';

interface DoctorSchedulePanelProps {
  doctors: DoctorScheduleItem[];
  onNavigate?: (path: AppRoute) => void;
}

export const DoctorSchedulePanel: React.FC<DoctorSchedulePanelProps> = ({
  doctors,
  onNavigate,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Doctor's Schedule
            </h3>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              Active Shift
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time on-duty physician presence and consultation windows
          </p>
        </div>

        {onNavigate && (
          <button
            type="button"
            onClick={() => onNavigate('/admin/doctor-schedule')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
          >
            <span>Full Schedule</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Doctor Rows */}
      <div className="divide-y divide-slate-100">
        {doctors.map((doctor) => {
          const isAvailable = doctor.status === 'Available';

          return (
            <div
              key={doctor.id}
              className="py-3 sm:py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 rounded-xl px-2.5 -mx-2.5 transition-colors"
            >
              {/* Doctor Avatar & Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={doctor.avatarUrl}
                    alt={doctor.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs"
                  />
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                      isAvailable ? 'bg-emerald-500' : 'bg-rose-400'
                    }`}
                  />
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {doctor.name}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">{doctor.department}</p>
                </div>
              </div>

              {/* Working Hours & Availability Badge */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                <div className="flex items-center gap-1 text-xs font-medium text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{doctor.workingHours}</span>
                </div>

                {isAvailable ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    Available
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                    <XCircle className="w-3 h-3" />
                    Unavailable
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
