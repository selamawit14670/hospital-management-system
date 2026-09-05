import React from 'react';
import { UserPlus, CalendarPlus, Search, IdCard, Zap } from 'lucide-react';

interface ReceptionistQuickActionsProps {
  onRegisterPatient: () => void;
  onBookAppointment: () => void;
  onFindPatient: () => void;
  onPatientCard: () => void;
}

export const ReceptionistQuickActions: React.FC<ReceptionistQuickActionsProps> = ({
  onRegisterPatient,
  onBookAppointment,
  onFindPatient,
  onPatientCard,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Front Desk Quick Actions
            </h2>
            <p className="text-xs text-slate-500">
              Rapid admissions, instant scheduling, and patient lookup tools
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {/* 1. Register Patient */}
        <button
          type="button"
          onClick={onRegisterPatient}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-blue-500/20 transition-all duration-150 cursor-pointer text-center group"
        >
          <UserPlus className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
          <span>Register Patient</span>
        </button>

        {/* 2. Book Appointment */}
        <button
          type="button"
          onClick={onBookAppointment}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer text-center group"
        >
          <CalendarPlus className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110 text-blue-600" />
          <span>Book Appointment</span>
        </button>

        {/* 3. Find Patient */}
        <button
          type="button"
          onClick={onFindPatient}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer text-center group"
        >
          <Search className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110 text-slate-500" />
          <span>Find Patient</span>
        </button>

        {/* 4. Patient Card */}
        <button
          type="button"
          onClick={onPatientCard}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer text-center group"
        >
          <IdCard className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110 text-slate-500" />
          <span>Patient Card</span>
        </button>
      </div>
    </div>
  );
};
