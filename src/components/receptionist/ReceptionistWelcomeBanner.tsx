import React from 'react';
import { Sparkles, Clock, Users, ShieldCheck, MapPin } from 'lucide-react';
import type { ReceptionistStats } from '../../types/receptionist';

interface ReceptionistWelcomeBannerProps {
  name?: string;
  stats?: ReceptionistStats;
}

export const ReceptionistWelcomeBanner: React.FC<ReceptionistWelcomeBannerProps> = ({
  name = 'Selamawit',
  stats,
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Extract first name for friendly greeting
  const displayName = name.includes(' ') ? name.split(' ')[0] : name;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-5 sm:p-6 shadow-md shadow-blue-500/15">
      {/* Subtle decorative background circles */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute right-36 -top-10 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Welcome Copy */}
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-blue-100 mb-1 border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-200" />
            <span>Admissions & Front Desk Terminal #1</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-normal text-blue-100">Live Intake Online</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            Good morning, {displayName}
            <Sparkles className="w-5 h-5 text-amber-300 shrink-0 hidden sm:inline" />
          </h1>

          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
            Manage today&apos;s registrations, appointments, and patient services.
          </p>
        </div>

        {/* Right Info Badges */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start md:self-center">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-xs text-white">
            <Clock className="w-4 h-4 text-blue-200" />
            <span className="font-medium">{currentDate}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-xs text-white">
            <Users className="w-4 h-4 text-emerald-300" />
            <span className="font-medium">
              {stats?.waitingPatients ?? 14} in waiting lobby
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-blue-100">
            <MapPin className="w-3.5 h-3.5 text-blue-200" />
            <span>Main Lobby • Gate A</span>
          </div>
        </div>
      </div>
    </div>
  );
};
