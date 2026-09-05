import React from 'react';
import { Users, Calendar, Clock, CreditCard, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';
import type { ReceptionistStats } from '../../types/receptionist';

interface ReceptionistStatsCardsProps {
  stats: ReceptionistStats;
  onFilterAppointments?: () => void;
  onFilterWaiting?: () => void;
  onFilterPayments?: () => void;
}

export const ReceptionistStatsCards: React.FC<ReceptionistStatsCardsProps> = ({
  stats,
  onFilterAppointments,
  onFilterWaiting,
  onFilterPayments,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {/* 1. Total Patients */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all duration-200 group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Patients
          </span>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {stats.totalPatients.toLocaleString()}
          </span>
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" />
            {stats.totalPatientsChange || '+18 this week'}
          </span>
        </div>

        <p className="mt-2 text-xs text-slate-400 font-medium">
          Master active health record index
        </p>
      </div>

      {/* 2. Today's Appointments */}
      <div
        onClick={onFilterAppointments}
        className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all duration-200 group cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Today&apos;s Appointments
          </span>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {stats.todayAppointments}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
            <CheckCircle2 className="w-3 h-3" />
            {stats.checkedInAppointments || 28} checked in
          </span>
        </div>

        <p className="mt-2 text-xs text-slate-400 font-medium">
          Scheduled consultations & reviews
        </p>
      </div>

      {/* 3. Waiting Patients */}
      <div
        onClick={onFilterWaiting}
        className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-amber-200 transition-all duration-200 group cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Waiting Patients
          </span>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-amber-600 tracking-tight">
            {stats.waitingPatients}
          </span>
          <span className="text-xs font-medium text-slate-500">
            in reception lobby
          </span>
        </div>

        <p className="mt-2 text-xs text-slate-400 font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
          Avg. wait time: ~12 mins
        </p>
      </div>

      {/* 4. Pending Payments */}
      <div
        onClick={onFilterPayments}
        className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-rose-200 transition-all duration-200 group cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Pending Payments
          </span>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {stats.pendingPayments}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
            <AlertCircle className="w-3 h-3" />
            {stats.currency || 'ETB'} {stats.totalPendingAmount?.toLocaleString() || '14,850'}
          </span>
        </div>

        <p className="mt-2 text-xs text-slate-400 font-medium">
          Co-pays, registrations & lab fees
        </p>
      </div>
    </div>
  );
};
