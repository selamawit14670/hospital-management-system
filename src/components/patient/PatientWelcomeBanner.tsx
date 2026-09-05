import React from 'react';
import { ShieldCheck, HeartPulse, Stethoscope, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import type { PatientProfileData } from '../../types/patient';

interface PatientWelcomeBannerProps {
  profile: PatientProfileData;
  onBookAppointment: () => void;
  onViewCard: () => void;
}

export const PatientWelcomeBanner: React.FC<PatientWelcomeBannerProps> = ({
  profile,
  onBookAppointment,
  onViewCard,
}) => {
  // Format current date
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-6 sm:p-7 shadow-lg shadow-blue-600/15">
      {/* Background Decorative Shapes */}
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute right-1/4 -bottom-20 w-56 h-56 rounded-full bg-indigo-500/20 blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left: Greeting & Summary */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md text-blue-100 border border-white/20">
              <Calendar className="w-3.5 h-3.5" />
              {todayFormatted}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/20 backdrop-blur-md text-emerald-200 border border-emerald-300/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Patient #{profile.patientId}
            </span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Good morning, {profile.name}
            </h2>
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed mt-1">
              Your overall health summary is <strong className="text-emerald-200 font-semibold">Stable & Controlled</strong>. You have 1 upcoming consultation tomorrow and all recent diagnostic laboratory panels are verified.
            </p>
          </div>

          {/* Quick Health Indicators Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-xs">
              <Stethoscope className="w-4 h-4 text-blue-200 shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] text-blue-200 font-medium truncate">Attending Doctor</p>
                <p className="text-xs font-semibold text-white truncate">{profile.primaryDoctor.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-xs">
              <HeartPulse className="w-4 h-4 text-rose-300 shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] text-blue-200 font-medium truncate">Recent Blood Pressure</p>
                <p className="text-xs font-semibold text-white truncate">126/82 mmHg (Target)</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-xs">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] text-blue-200 font-medium truncate">Active Insurance</p>
                <p className="text-xs font-semibold text-white truncate">{profile.insurance.provider.split('(')[0].trim()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick CTA Buttons */}
        <div className="flex sm:flex-row lg:flex-col gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onBookAppointment}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-blue-700 hover:bg-blue-50 text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-all duration-150 cursor-pointer hover:shadow-md"
          >
            <span>Book Appointment</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onViewCard}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-800/60 hover:bg-blue-800/80 text-white text-xs sm:text-sm font-semibold rounded-xl border border-white/20 transition-all duration-150 cursor-pointer"
          >
            <span>View Digital Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};
