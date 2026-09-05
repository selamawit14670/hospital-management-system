import React from 'react';
import { Calendar, Stethoscope, Clock, AlertCircle } from 'lucide-react';
import type { AppRoute } from '../../types';

interface DoctorWelcomeBannerProps {
  doctorName?: string;
  department?: string;
  todayCount: number;
  waitingCount: number;
  urgentCount: number;
  onViewAppointments: () => void;
  onNavigate?: (path: AppRoute) => void;
}

export const DoctorWelcomeBanner: React.FC<DoctorWelcomeBannerProps> = ({
  doctorName = 'Dr. Hana Mengistu',
  department = 'General Medicine',
  todayCount = 8,
  waitingCount = 3,
  urgentCount = 2,
  onViewAppointments,
  onNavigate,
}) => {
  // Extract first name for greeting
  const cleanName = doctorName.startsWith('Dr.') ? doctorName : `Dr. ${doctorName}`;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-5 sm:p-7 shadow-sm">
      {/* Decorative subtle medical background elements */}
      <div className="absolute -right-6 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute right-24 top-0 w-32 h-32 rounded-full bg-blue-400/20 blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Clinical Title & Subtitle */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/15 text-blue-100 backdrop-blur-xs border border-white/20">
              <Stethoscope className="w-3.5 h-3.5 text-blue-200" />
              DOCTOR CLINICAL WORKSPACE
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-blue-100/90 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {department} Clinic • Suite 3A
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
            Good morning, {cleanName}
          </h1>

          <p className="text-sm sm:text-base text-blue-100 font-normal leading-relaxed">
            You have <strong className="font-semibold text-white">{todayCount} appointments</strong> scheduled today and{' '}
            <strong className="font-semibold text-white">{waitingCount} patients waiting</strong> for consultation.
          </p>

          {urgentCount > 0 && (
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-200 bg-amber-500/20 px-3 py-1 rounded-lg border border-amber-300/30">
              <AlertCircle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>
                <strong>{urgentCount} patients</strong> in the queue require urgent triage attention.
              </span>
            </div>
          )}
        </div>

        {/* Right CTA Actions */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onViewAppointments}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-semibold text-sm shadow-sm hover:shadow transition-all duration-150 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>View Today's Appointments</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('/doctor/consultations/new' as AppRoute)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-800/60 hover:bg-blue-800/80 text-white font-semibold text-sm border border-white/20 backdrop-blur-xs transition-all duration-150 cursor-pointer"
          >
            <Clock className="w-4 h-4 text-blue-200" />
            <span>Active Queue ({waitingCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
