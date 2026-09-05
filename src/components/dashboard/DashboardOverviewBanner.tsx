import React from 'react';
import { UserPlus, QrCode, ShieldCheck, Activity } from 'lucide-react';
import { Button } from '../common/Button';

interface DashboardOverviewBannerProps {
  onRegisterPatient: () => void;
  onScanQrCard: () => void;
}

export const DashboardOverviewBanner: React.FC<DashboardOverviewBannerProps> = ({
  onRegisterPatient,
  onScanQrCard,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white shadow-lg shadow-blue-900/10 p-5 sm:p-6 mb-6">
      {/* Subtle background glow & geometric motif */}
      <div className="absolute -right-12 -top-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/3 -bottom-16 w-56 h-56 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        {/* Left: Console Tag & Hospital Operations Summary */}
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-blue-100 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-200" />
            <span>Administrator Executive Console</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-xs">
            MediCare Hospital Operations Overview
          </h2>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>
              System health normal. Hospital operations and patient services are running normally.
            </span>
          </div>
        </div>

        {/* Right: Primary Fast-Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={onScanQrCard}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 text-white text-xs sm:text-sm font-semibold border border-white/25 shadow-xs backdrop-blur-sm transition-all duration-150 cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-blue-200" />
            <span>Scan QR Card</span>
          </button>

          <button
            type="button"
            onClick={onRegisterPatient}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 active:bg-blue-100 text-xs sm:text-sm font-bold shadow-md shadow-black/10 transition-all duration-150 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-blue-600" />
            <span>Register Patient</span>
          </button>
        </div>
      </div>
    </div>
  );
};
