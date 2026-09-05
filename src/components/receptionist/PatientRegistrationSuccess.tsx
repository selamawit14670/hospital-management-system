import React, { useState } from 'react';
import {
  CheckCircle2,
  IdCard,
  UserPlus,
  Copy,
  Check,
  User,
  Phone,
  Mail,
  MapPin,
  Heart,
  Calendar,
  Briefcase,
  AlertCircle,
  ExternalLink,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import type { RegisteredPatientConfirmation } from '../../types/receptionist';

interface PatientRegistrationSuccessProps {
  confirmation: RegisteredPatientConfirmation;
  onViewPatientCard: () => void;
  onRegisterAnother: () => void;
  onNavigateToCards?: () => void;
}

export const PatientRegistrationSuccess: React.FC<PatientRegistrationSuccessProps> = ({
  confirmation,
  onViewPatientCard,
  onRegisterAnother,
  onNavigateToCards,
}) => {
  const [copied, setCopied] = useState(false);
  const { patientId, formData, calculatedAge, rfidChipId, registeredTimestamp } = confirmation;

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(patientId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedDob = formData.dateOfBirth
    ? new Date(formData.dateOfBirth).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'May 14, 1994';

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-250">
      {/* Top Success Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200/90 rounded-3xl p-6 sm:p-8 shadow-xs text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Enrollment Verified & Synced with Hospital EHR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Patient Registered Successfully!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              A permanent medical record and digital health credential have been generated for{' '}
              <strong className="text-slate-900 font-semibold">{formData.fullName}</strong>.
            </p>
          </div>
        </div>

        {/* Generated Patient ID Badge */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-200/90 shadow-2xs text-center shrink-0 w-full sm:w-auto">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Assigned Patient ID
          </p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="font-mono text-xl sm:text-2xl font-black text-blue-700 tracking-wider">
              {patientId}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              title="Copy Patient ID"
              className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold flex items-center justify-center gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Active Hospital RFID
          </span>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-bold text-slate-900">
            Next Immediate Actions
          </h3>
          <p className="text-xs text-slate-500">
            Issue the digital card to the patient or continue registering new arrivals
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
          {/* View Patient Card */}
          <button
            type="button"
            onClick={onViewPatientCard}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <IdCard className="w-4 h-4" />
            <span>View Patient Card</span>
          </button>

          {/* Register Another Patient */}
          <button
            type="button"
            onClick={onRegisterAnother}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register Another Patient</span>
          </button>
        </div>
      </div>

      {/* Summary Review of All 4 Sections */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Official Intake Summary Record
              </h3>
              <p className="text-xs text-slate-500">
                Registered on {registeredTimestamp} by Reception Desk
              </p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            RFID: {rfidChipId}
          </span>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {/* 1. Personal Information Preview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Section 1: Personal Information</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <img
                src={formData.patientPhoto}
                alt={formData.fullName}
                referrerPolicy="no-referrer"
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-md shrink-0 bg-slate-800"
              />

              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                    {formData.fullName}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-700">
                    {formData.bloodGroup}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                  <span>Gender: <strong className="text-slate-800">{formData.gender}</strong></span>
                  <span>•</span>
                  <span>DOB: <strong className="text-slate-800">{formattedDob}</strong></span>
                  <span>•</span>
                  <span>Age: <strong className="text-slate-800">{calculatedAge} years</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Contact Information & 3. Emergency Contact in 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Section 2: Contact Information */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Section 2: Contact Information
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-400">Phone Number</p>
                    <p className="font-bold text-slate-900 font-mono">{formData.phoneNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-400">Email Address</p>
                    <p className="font-semibold text-slate-800 truncate">{formData.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-400">Residential Address</p>
                    <p className="font-medium text-slate-800 leading-relaxed">{formData.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Emergency Contact */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Section 3: Emergency Contact
              </p>

              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-400">Emergency Contact Name</p>
                    <p className="font-bold text-slate-900">{formData.emergencyContactName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-400">Relationship</p>
                    <p className="font-semibold text-slate-800">{formData.emergencyContactRelationship}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-slate-400">Emergency Phone</p>
                    <p className="font-bold text-slate-900 font-mono">{formData.emergencyContactPhone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Additional Information */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Section 4: Additional Information & Administrative Routing
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <p className="text-[10px] text-slate-400">Marital Status</p>
                <p className="font-bold text-slate-900">{formData.maritalStatus}</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-400">Occupation</p>
                <p className="font-bold text-slate-900">{formData.occupation}</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-400">Official Registration Date</p>
                <p className="font-bold text-slate-900">{formData.registrationDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Billing voucher ETB 350.00 created under Pending Payments desk</span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToCards && (
              <button
                type="button"
                onClick={onNavigateToCards}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer shadow-2xs"
              >
                Go to Patient Cards Desk
              </button>
            )}

            <button
              type="button"
              onClick={onRegisterAnother}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Register Another Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
