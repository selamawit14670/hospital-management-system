import React, { useState } from 'react';
import { X, IdCard, Printer, QrCode, Shield, CheckCircle2, User, Phone } from 'lucide-react';
import { ALL_PATIENTS } from '../../services/doctorDashboardService';
import type { PatientDetailedRecord } from '../../types/doctor';

interface PatientCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId?: string;
}

export const PatientCardModal: React.FC<PatientCardModalProps> = ({
  isOpen,
  onClose,
  patientId,
}) => {
  const [selectedId, setSelectedId] = useState(patientId || ALL_PATIENTS[0]?.patientId || 'MC-000001');

  if (!isOpen) return null;

  const patient = ALL_PATIENTS.find((p) => p.patientId === selectedId) || ALL_PATIENTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <IdCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                MediCare Digital Health Card
              </h3>
              <p className="text-xs text-slate-500">
                Front desk verification & instant card issuance
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Patient Selector */}
        <div className="px-5 pt-4">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Select Patient to View / Print Card
          </label>
          <select
            value={patient.patientId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            {ALL_PATIENTS.map((p) => (
              <option key={p.patientId} value={p.patientId}>
                {p.name} ({p.patientId}) - {p.gender}, {p.age} yrs
              </option>
            ))}
          </select>
        </div>

        {/* Physical Digital Card Preview */}
        <div className="p-5">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-5 shadow-xl border border-blue-700/50">
            {/* Holographic Watermark */}
            <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="absolute right-4 top-4 opacity-20">
              <Shield className="w-20 h-20 text-white" />
            </div>

            {/* Top row */}
            <div className="flex items-center justify-between relative z-10 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-white text-xs">
                  +
                </div>
                <div>
                  <p className="font-bold text-xs tracking-wider uppercase text-white">
                    MediCare Health
                  </p>
                  <p className="text-[9px] text-blue-200 font-medium">
                    National Hospital Network
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-white border border-white/20">
                RFID-CHIP ACTIVE
              </span>
            </div>

            {/* Main Info */}
            <div className="flex items-center gap-4 relative z-10">
              <img
                src={patient.avatarUrl}
                alt={patient.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover border-2 border-white/40 shadow-md shrink-0"
              />

              <div className="min-w-0 space-y-0.5">
                <h4 className="font-bold text-base text-white truncate leading-tight">
                  {patient.name}
                </h4>
                <p className="font-mono text-xs font-semibold text-blue-200 tracking-wider">
                  {patient.patientId}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-blue-100 pt-1">
                  <span>Age: {patient.age}</span>
                  <span>•</span>
                  <span>{patient.gender}</span>
                  <span>•</span>
                  <span className="font-bold bg-white/20 px-1.5 py-0.2 rounded text-white">
                    {patient.bloodGroup}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom row: QR code placeholder & emergency */}
            <div className="mt-5 pt-3 border-t border-white/15 flex items-end justify-between relative z-10">
              <div className="text-[10px] text-blue-200 space-y-0.5">
                <p className="text-white font-medium">Primary Clinical Care:</p>
                <p>{patient.primaryDiagnosis}</p>
                <p className="font-mono">Contact: {patient.phone}</p>
              </div>

              <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center shadow-md">
                <QrCode className="w-10 h-10 text-slate-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Card Status: <strong className="text-emerald-600">Active</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => alert(`Printing card for ${patient.name} (${patient.patientId})...`)}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Patient Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
