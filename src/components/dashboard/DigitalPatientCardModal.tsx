import React from 'react';
import {
  X,
  QrCode,
  Droplet,
  Phone,
  ShieldCheck,
  Calendar,
  Download,
  Printer,
  HeartPulse,
} from 'lucide-react';
import type { RecentPatient } from '../../types/dashboard';

interface DigitalPatientCardModalProps {
  patient: RecentPatient | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalPatientCardModal: React.FC<DigitalPatientCardModalProps> = ({
  patient,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Topbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">MediCare Digital Patient Card</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Physical-style Smart Card Simulation */}
        <div className="p-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white p-6 shadow-xl border border-blue-400/20">
            {/* Background watermark motif */}
            <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none">
              <HeartPulse className="w-64 h-64 text-white" />
            </div>

            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-xs">
                  <HeartPulse className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight text-white">MediCare Hospital</h4>
                  <p className="text-[10px] text-blue-200 uppercase tracking-wider">
                    National Health Service Card
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Verified
              </div>
            </div>

            {/* Card Main Body */}
            <div className="flex items-start gap-4">
              {/* Photo & Blood Group */}
              <div className="shrink-0 space-y-2">
                <img
                  src={patient.avatarUrl}
                  alt={patient.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-24 rounded-xl object-cover border-2 border-white/30 shadow-md"
                />
                <div className="flex items-center justify-center gap-1 px-2 py-1 rounded-lg bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-black">
                  <Droplet className="w-3 h-3 fill-rose-400 text-rose-400" />
                  <span>{patient.bloodGroup}</span>
                </div>
              </div>

              {/* Details */}
              <div className="min-w-0 flex-1 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-blue-200/70 uppercase">Full Name</span>
                  <p className="text-base font-extrabold text-white truncate">{patient.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-200">
                  <div>
                    <span className="text-[10px] text-blue-200/70 uppercase">Patient ID</span>
                    <p className="font-mono font-bold text-amber-300">{patient.patientId}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-200/70 uppercase">Gender / Age</span>
                    <p className="font-semibold">
                      {patient.gender}, {patient.age}y
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-blue-200/70 uppercase">Emergency Contact</span>
                  <p className="font-medium text-blue-100 truncate">{patient.emergencyContact}</p>
                </div>
              </div>

              {/* QR Code & Barcode Representation */}
              <div className="shrink-0 hidden sm:flex flex-col items-center justify-between p-2 rounded-xl bg-white text-slate-900 self-stretch">
                <QrCode className="w-14 h-14 text-slate-900" />
                <span className="text-[9px] font-mono font-bold text-slate-500">
                  {patient.patientId}
                </span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-blue-200/80">
              <span>Addis Ababa Central Command</span>
              <span>Issued: Sep 2026</span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between gap-3 mt-5">
            <button
              type="button"
              onClick={() => alert(`Printing card for ${patient.name} (${patient.patientId})`)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print Card</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert(`Card downloaded as PDF for ${patient.name}`)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
