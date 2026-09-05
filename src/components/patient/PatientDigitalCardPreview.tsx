import React from 'react';
import { IdCard, QrCode, Shield, ExternalLink, Sparkles, CheckCircle2, User } from 'lucide-react';
import type { PatientProfileData } from '../../types/patient';

interface PatientDigitalCardPreviewProps {
  profile: PatientProfileData;
  onViewFullCard: () => void;
}

export const PatientDigitalCardPreview: React.FC<PatientDigitalCardPreviewProps> = ({
  profile,
  onViewFullCard,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 flex flex-col justify-between">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <IdCard className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-900 truncate">
              Digital Patient Card
            </h3>
            <p className="text-xs text-slate-500 truncate">
              Hospital NFC verification & emergency triage ID
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewFullCard}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer shrink-0"
        >
          <span>View Full Card</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* The Physical Card Simulation */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-5 sm:p-6 shadow-xl border border-blue-800/40">
        {/* Holographic / Lighting accents */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-blue-500/15 blur-2xl pointer-events-none" />
        <div className="absolute right-3 top-3 opacity-15 pointer-events-none">
          <Shield className="w-28 h-28 text-white" />
        </div>

        {/* Top Header of Card */}
        <div className="flex items-center justify-between relative z-10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/30">
              +
            </div>
            <div>
              <p className="font-extrabold text-xs tracking-wider uppercase text-white">
                MediCare Health System
              </p>
              <p className="text-[10px] text-blue-300 font-medium">
                National Smart Patient ID
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            RFID ACTIVE
          </span>
        </div>

        {/* Patient Demographic Information */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5 min-w-0">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-white/40 shadow-lg shrink-0"
            />

            <div className="min-w-0 space-y-1">
              <div>
                <p className="text-[10px] uppercase font-semibold tracking-wider text-blue-300">
                  Patient Name
                </p>
                <h4 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                  {profile.name}
                </h4>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono font-bold text-blue-200 tracking-wide">
                  {profile.patientId}
                </span>
                <span className="text-white/40">•</span>
                <span className="text-blue-100/90">{profile.gender}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics (DOB & Blood Group) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 w-full sm:w-auto shrink-0 bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/15">
            <div>
              <p className="text-[9px] uppercase font-semibold text-blue-200 tracking-wider">
                Date of Birth
              </p>
              <p className="text-xs font-bold text-white whitespace-nowrap mt-0.5">
                May 14, 1988
              </p>
              <p className="text-[10px] text-blue-300">Age: {profile.age} yrs</p>
            </div>

            <div className="pl-3 border-l border-white/15">
              <p className="text-[9px] uppercase font-semibold text-blue-200 tracking-wider">
                Blood Group
              </p>
              <div className="inline-flex items-center gap-1.5 mt-0.5">
                <span className="px-2 py-0.5 rounded-md bg-rose-500/80 text-white font-extrabold text-xs tracking-wider">
                  {profile.bloodGroup}
                </span>
              </div>
              <p className="text-[10px] text-emerald-300 font-medium">Rh Positive</p>
            </div>
          </div>
        </div>

        {/* Footer: QR Code & Security Bar */}
        <div className="mt-5 pt-3.5 border-t border-white/15 flex items-center justify-between gap-3 relative z-10">
          <div className="space-y-0.5 min-w-0">
            <p className="text-[10px] text-blue-200 truncate">
              Primary Clinic: <strong className="text-white font-medium">{profile.primaryDoctor.department}</strong>
            </p>
            <p className="text-[10px] text-blue-300/80 font-mono truncate">
              Policy: {profile.insurance.policyNumber}
            </p>
          </div>

          {/* QR Code Container */}
          <div
            onClick={onViewFullCard}
            className="flex items-center gap-2 bg-white rounded-xl p-1.5 shadow-md cursor-pointer hover:scale-105 transition-transform shrink-0"
            title="Scan QR Code to view verified health records"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-slate-900 rounded-lg text-white">
              <QrCode className="w-7 h-7 text-white" />
            </div>
            <div className="hidden sm:block pr-2 text-left">
              <p className="text-[9px] font-bold text-slate-900 uppercase leading-tight">
                Scan QR
              </p>
              <p className="text-[8px] text-slate-500 font-medium leading-tight">
                Emergency ID
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Hint */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
        <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Verified for all MediCare inpatient & pharmacy branches
        </span>
        <button
          type="button"
          onClick={onViewFullCard}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline cursor-pointer"
        >
          [View Full Card]
        </button>
      </div>
    </div>
  );
};
