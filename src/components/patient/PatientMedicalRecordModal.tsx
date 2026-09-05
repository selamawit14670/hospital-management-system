import React from 'react';
import { X, FileText, Stethoscope, Calendar, Activity, Printer, Download, CheckCircle2 } from 'lucide-react';
import type { PatientMedicalRecord } from '../../types/patient';

interface PatientMedicalRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PatientMedicalRecord | null;
}

export const PatientMedicalRecordModal: React.FC<PatientMedicalRecordModalProps> = ({
  isOpen,
  onClose,
  record,
}) => {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Medical Record #{record.id}
              </h3>
              <p className="text-xs text-slate-500">
                MediCare Electronic Health Record (EHR)
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

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Header Overview */}
          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-900">
                {record.recordType}
              </span>
              <span className="text-[11px] text-purple-700 font-medium">
                Recorded {record.date}
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-900">
              {record.title}
            </h4>
            <p className="text-xs text-slate-600">
              {record.doctorName} • {record.department}
            </p>
          </div>

          {/* Primary Diagnosis */}
          <div className="space-y-1 text-xs">
            <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Primary Clinical Diagnosis
            </p>
            <p className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-slate-900">
              {record.primaryDiagnosis}
            </p>
          </div>

          {/* Clinical Summary */}
          <div className="space-y-1 text-xs">
            <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Physician Consultation Notes
            </p>
            <p className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">
              {record.summary}
            </p>
          </div>

          {/* Vitals Signs if present */}
          {record.vitals && (
            <div className="space-y-1 text-xs">
              <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Recorded Vital Signs
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <p className="text-[10px] text-slate-500">Blood Pressure</p>
                  <p className="font-bold text-slate-900">{record.vitals.bloodPressure}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <p className="text-[10px] text-slate-500">Heart Rate</p>
                  <p className="font-bold text-slate-900">{record.vitals.heartRate}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <p className="text-[10px] text-slate-500">Body Temp</p>
                  <p className="font-bold text-slate-900">{record.vitals.temperature}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <p className="text-[10px] text-slate-500">Weight</p>
                  <p className="font-bold text-slate-900">{record.vitals.weight}</p>
                </div>
              </div>
            </div>
          )}

          {/* Treatment Plan */}
          <div className="space-y-1 text-xs">
            <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Treatment Plan & Next Steps
            </p>
            <p className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-900 leading-relaxed font-medium">
              {record.treatmentPlan}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.print?.()}
            className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print EHR Record</span>
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
  );
};
