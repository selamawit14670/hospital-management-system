import React from 'react';
import { Stethoscope, HeartPulse, Activity, BedDouble, AlertCircle, Plus } from 'lucide-react';
import type { AppRoute } from '../../types';

interface NurseWelcomeBannerProps {
  nurseName?: string;
  wardName?: string;
  assignedCount?: number;
  waitingCount?: number;
  criticalCount?: number;
  onRecordVitalsClick?: () => void;
  onNavigate?: (path: AppRoute) => void;
}

export const NurseWelcomeBanner: React.FC<NurseWelcomeBannerProps> = ({
  nurseName = 'Sister Almaz',
  wardName = 'Inpatient Care & Trauma Ward',
  assignedCount = 14,
  waitingCount = 6,
  criticalCount = 1,
  onRecordVitalsClick,
  onNavigate,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-5 sm:p-7 md:p-8 shadow-md">
      {/* Subtle Background Pattern */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute right-1/4 -top-12 w-48 h-48 rounded-full bg-blue-400/20 blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Column: Greeting & Info */}
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-blue-100 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ward Station #4 • Shift A (07:00 – 15:30)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Good morning, {nurseName}
          </h1>

          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Here is today's patient care overview. You have{' '}
            <strong className="text-white font-semibold">{assignedCount} inpatients</strong> under active
            ward monitoring, with <strong className="text-white font-semibold">{waitingCount} patients</strong>{' '}
            pending triage & vitals sign-off.
          </p>

          {/* Clinical Quick Triage Counters */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 border border-white/20 font-medium">
              <BedDouble className="w-3.5 h-3.5 text-blue-200" />
              <span>{assignedCount} Inpatients</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 border border-white/20 font-medium">
              <HeartPulse className="w-3.5 h-3.5 text-blue-200" />
              <span>{waitingCount} Waiting Vitals</span>
            </div>

            {criticalCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/30 border border-rose-300/40 text-rose-100 font-semibold animate-pulse">
                <AlertCircle className="w-3.5 h-3.5 text-rose-300" />
                <span>{criticalCount} Critical Alert</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Quick Clinical Actions */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onRecordVitalsClick}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-blue-700" />
            <span>Record Vitals</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('/nurse/admissions' as AppRoute)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm border border-white/25 transition-all backdrop-blur-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <BedDouble className="w-4 h-4" />
            <span>Bed Census</span>
          </button>
        </div>
      </div>
    </div>
  );
};
