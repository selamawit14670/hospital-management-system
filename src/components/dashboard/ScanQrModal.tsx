import React, { useState } from 'react';
import { X, QrCode, Search, CheckCircle2, AlertCircle, Sparkles, User, IdCard } from 'lucide-react';
import type { RecentPatient } from '../../types/dashboard';

interface ScanQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  patients: RecentPatient[];
  onSelectPatient: (patient: RecentPatient) => void;
}

export const ScanQrModal: React.FC<ScanQrModalProps> = ({
  isOpen,
  onClose,
  patients,
  onSelectPatient,
}) => {
  const [manualQuery, setManualQuery] = useState('');
  const [scannedPatient, setScannedPatient] = useState<RecentPatient | null>(null);

  if (!isOpen) return null;

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualQuery.trim()) return;

    const found = patients.find(
      (p) =>
        p.patientId.toLowerCase() === manualQuery.trim().toLowerCase() ||
        p.name.toLowerCase().includes(manualQuery.trim().toLowerCase())
    );

    if (found) {
      setScannedPatient(found);
    } else {
      alert(`No registered patient found matching "${manualQuery}". Try MC-000001 or Abebe.`);
    }
  };

  const handleSimulateScan = (patient: RecentPatient) => {
    setScannedPatient(patient);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Hospital QR Card Scanner</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewfinder Simulator */}
        <div className="p-6">
          <div className="relative aspect-video rounded-2xl bg-slate-950 flex flex-col items-center justify-center overflow-hidden border-2 border-slate-800 shadow-inner">
            {/* Viewfinder corner brackets */}
            <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-blue-400 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-blue-400 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-blue-400 rounded-br-lg" />

            {/* Laser animated sweep line */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] animate-pulse" />

            {/* Center target icon */}
            <div className="flex flex-col items-center gap-2 z-10 text-center px-4">
              <QrCode className="w-12 h-12 text-slate-600 animate-pulse" />
              <p className="text-xs text-slate-400 font-medium">
                Point MediCare physical QR card toward optical camera lens
              </p>
            </div>
          </div>

          {/* Quick Simulation Options */}
          <div className="mt-4">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Quick Demonstration Scans:
            </p>
            <div className="flex flex-wrap gap-2">
              {patients.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSimulateScan(p)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 text-xs font-semibold text-slate-700 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  <span>{p.name.split(' ')[0]} ({p.patientId})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Manual Input Fallback */}
          <form onSubmit={handleManualSearch} className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Or type Patient ID (e.g. MC-000001)..."
                value={manualQuery}
                onChange={(e) => setManualQuery(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Verify
            </button>
          </form>

          {/* Scanned Patient Result Preview */}
          {scannedPatient && (
            <div className="mt-5 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-900">Valid Patient Identified</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700">
                  {scannedPatient.patientId}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <img
                  src={scannedPatient.avatarUrl}
                  alt={scannedPatient.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl object-cover border border-emerald-200"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900">{scannedPatient.name}</p>
                  <p className="text-[11px] text-slate-500">
                    {scannedPatient.gender}, {scannedPatient.age} yrs • Blood: {scannedPatient.bloodGroup}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-3 pt-2 border-t border-emerald-200/60">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectPatient(scannedPatient);
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  <IdCard className="w-3.5 h-3.5" />
                  <span>Open Digital Card</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
