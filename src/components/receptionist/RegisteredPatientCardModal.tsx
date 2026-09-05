import React, { useState } from 'react';
import { X, IdCard, QrCode, Shield, CheckCircle2, Printer, Phone, Heart, Download } from 'lucide-react';
import type { RegisteredPatientConfirmation } from '../../types/receptionist';

interface RegisteredPatientCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  registeredPatient: RegisteredPatientConfirmation | null;
}

export const RegisteredPatientCardModal: React.FC<RegisteredPatientCardModalProps> = ({
  isOpen,
  onClose,
  registeredPatient,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  if (!isOpen || !registeredPatient) return null;

  const { patientId, formData, calculatedAge, rfidChipId, registeredTimestamp } = registeredPatient;

  const handleCopyId = () => {
    navigator.clipboard?.writeText?.(patientId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      window.print?.();
    }, 400);
  };

  // Format date of birth nicely
  const formattedDob = formData.dateOfBirth
    ? new Date(formData.dateOfBirth).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'May 14, 1994';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <IdCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Official Patient Health Card
              </h3>
              <p className="text-xs text-slate-500">
                Issued by MediCare Admissions Registry • ID: {patientId}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Physical Card Representation */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white p-6 shadow-2xl border border-blue-700/50">
            {/* Watermarks */}
            <div className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />
            <div className="absolute right-4 top-4 opacity-15 pointer-events-none">
              <Shield className="w-32 h-32 text-white" />
            </div>

            {/* Top row */}
            <div className="flex items-center justify-between relative z-10 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-md">
                  +
                </div>
                <div>
                  <p className="font-extrabold text-sm tracking-wider uppercase text-white">
                    MediCare Health System
                  </p>
                  <p className="text-[10px] text-blue-300 font-medium">
                    National Smart Patient Registry
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white border border-white/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                RFID: {rfidChipId}
              </span>
            </div>

            {/* Patient Info */}
            <div className="flex items-center gap-4 relative z-10">
              <img
                src={formData.patientPhoto}
                alt={formData.fullName}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white/50 shadow-md shrink-0 bg-slate-800"
              />

              <div className="min-w-0 space-y-1">
                <div>
                  <p className="text-[10px] uppercase font-semibold text-blue-300 tracking-wider">
                    Full Legal Name
                  </p>
                  <h4 className="font-bold text-lg text-white truncate leading-tight">
                    {formData.fullName}
                  </h4>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-blue-200">
                    ID: {patientId}
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-blue-200">{formData.gender}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] pt-0.5">
                  <span className="text-blue-100">DOB: {formattedDob} ({calculatedAge} yrs)</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-500 font-bold text-white text-[11px]">
                    {formData.bloodGroup}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Details & QR Code */}
            <div className="mt-6 pt-4 border-t border-white/20 flex items-end justify-between relative z-10 gap-4">
              <div className="space-y-1 text-xs text-blue-200 min-w-0">
                <p className="text-white font-semibold flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-blue-300" />
                  {formData.phoneNumber}
                </p>
                <p className="text-[11px] text-blue-300 truncate">
                  Emergency: {formData.emergencyContactName} ({formData.emergencyContactRelationship})
                </p>
                <p className="text-[10px] text-blue-400 font-mono">
                  Issued: {registeredTimestamp}
                </p>
              </div>

              <div className="bg-white p-2 rounded-2xl shadow-md shrink-0 text-center">
                <QrCode className="w-14 h-14 text-slate-900" />
                <span className="block text-[8px] font-mono font-bold text-slate-600 mt-0.5">
                  SCAN FOR EHR
                </span>
              </div>
            </div>
          </div>

          {/* Quick Registration Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Emergency Contact</p>
              <p className="font-bold text-slate-900">
                {formData.emergencyContactName} ({formData.emergencyContactRelationship})
              </p>
              <p className="text-blue-600 font-mono">{formData.emergencyContactPhone}</p>
            </div>

            <div>
              <p className="text-[11px] text-slate-500 font-medium">Residential Address</p>
              <p className="font-bold text-slate-900 line-clamp-2">{formData.address}</p>
              <p className="text-slate-500">{formData.email}</p>
            </div>

            <div>
              <p className="text-[11px] text-slate-500 font-medium">Occupation & Marital Status</p>
              <p className="text-slate-800 font-semibold">
                {formData.occupation} • {formData.maritalStatus}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-slate-500 font-medium">Card Security Status</p>
              <p className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Active & Hospital Synced
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopyId}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200/70 rounded-xl transition-colors cursor-pointer"
          >
            {copied ? '✓ Copied ID' : 'Copy Patient ID'}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isPrinting ? 'Printing...' : 'Print Card'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
