import React from 'react';
import { Users, Calendar, BedDouble, CreditCard, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import type { DashboardStats } from '../../types/dashboard';

interface StatCardsGridProps {
  stats: DashboardStats;
  isLoading?: boolean;
}

export const StatCardsGrid: React.FC<StatCardsGridProps> = ({ stats, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-34 rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs animate-pulse flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-slate-200 rounded" />
              <div className="h-10 w-10 bg-slate-200 rounded-xl" />
            </div>
            <div className="h-7 w-32 bg-slate-200 rounded" />
            <div className="h-3 w-40 bg-slate-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-6">
      {/* Card 1: Total Patients */}
      <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-blue-200 transition-all duration-200">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Patients
          </span>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/80 group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="mb-2">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {stats.totalPatients.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{stats.patientsGrowth}</span>
        </div>
      </div>

      {/* Card 2: Today's Appointments */}
      <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-200">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Today's Appointments
          </span>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/80 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="mb-2">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {stats.todayAppointments}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {stats.completedAppointments} completed
          </span>
          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1 font-medium text-blue-600">
            <Clock className="w-3.5 h-3.5" />
            {stats.upcomingAppointments} upcoming
          </span>
        </div>
      </div>

      {/* Card 3: Available Beds */}
      <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-sky-200 transition-all duration-200">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Available Beds
          </span>
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100/80 group-hover:scale-105 transition-transform">
            <BedDouble className="w-5 h-5" />
          </div>
        </div>

        <div className="mb-2">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {stats.availableBeds} <span className="text-lg font-normal text-slate-400">/ {stats.totalBeds}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>{stats.admittedToday} patients admitted today</span>
        </div>
      </div>

      {/* Card 4: Total Billed Revenue */}
      <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-200">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Billed Revenue
          </span>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/80 group-hover:scale-105 transition-transform">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="mb-2">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {stats.currency} {stats.totalRevenue.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{stats.paymentsCleared}</span>
        </div>
      </div>
    </div>
  );
};
