import React, { useState } from 'react';
import {
  X,
  User,
  Heart,
  AlertTriangle,
  Pill,
  FileText,
  Activity,
  Calendar,
  FlaskConical,
  Phone,
  Mail,
  ShieldAlert,
  Clock,
  Plus,
  ArrowRight,
  Printer,
} from 'lucide-react';
import type { PatientDetailedRecord } from '../../types/doctor';
import type { AppRoute } from '../../types';

interface PatientDetailModalProps {
  patient: PatientDetailedRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onStartConsultation?: (patientId: string) => void;
  onNavigate?: (path: AppRoute) => void;
}

export const PatientDetailModal: React.FC<PatientDetailModalProps> = ({
  patient,
  isOpen,
  onClose,
  onStartConsultation,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'History'
    | 'Allergies'
    | 'Medications'
    | 'Diagnoses'
    | 'Consultations'
    | 'Prescriptions'
    | 'LabResults'
  >('History');

  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        {/* Modal Header & Patient Bio Banner */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={patient.avatarUrl}
                alt={patient.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-md"
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {patient.name}
                  </h2>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 border border-blue-200">
                    {patient.patientId}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                    Blood: {patient.bloodGroup}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                  <span><strong>{patient.age}</strong> years old</span>
                  <span>•</span>
                  <span>{patient.gender}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {patient.phone}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    {patient.email}
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-medium pt-0.5">
                  Primary Condition: <strong className="text-slate-800">{patient.primaryDiagnosis}</strong>
                </p>
              </div>
            </div>

            {/* Close button & Action */}
            <div className="flex items-center gap-2">
              {onStartConsultation && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onStartConsultation(patient.patientId);
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs cursor-pointer"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Start Consultation</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 bg-slate-50/80 px-4 sm:px-6 flex items-center gap-1 overflow-x-auto scrollbar-none">
          {[
            { id: 'History', label: 'Medical History', icon: FileText },
            { id: 'Allergies', label: 'Allergies', icon: AlertTriangle, count: patient.allergies.length },
            { id: 'Medications', label: 'Current Medications', icon: Pill, count: patient.currentMedications.length },
            { id: 'Diagnoses', label: 'Previous Diagnoses', icon: Heart },
            { id: 'Consultations', label: 'Previous Consultations', icon: Activity, count: patient.previousConsultations.length },
            { id: 'Prescriptions', label: 'Prescriptions', icon: Pill, count: patient.prescriptions.length },
            { id: 'LabResults', label: 'Lab Results', icon: FlaskConical, count: patient.labResults.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 py-3 px-3 border-b-2 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-blue-600 text-blue-700 bg-white shadow-2xs'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-sm text-slate-700">
          {/* Medical History Tab */}
          {activeTab === 'History' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  Clinical Overview
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Patient is currently under management for {patient.primaryDiagnosis}. Last attended the clinic {patient.lastVisit}.
                  Allergic to {patient.allergies.join(', ') || 'No known allergies'}. Adherent to daily oral regimens.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h5 className="font-bold text-xs text-slate-900 mb-1">Key Risk Factors</h5>
                  <ul className="text-xs text-slate-600 list-disc list-inside space-y-1">
                    <li>Cardiovascular risk: Stage 1 Hypertension</li>
                    <li>Family history of premature coronary artery disease</li>
                    <li>Low baseline physical activity levels reported</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white">
                  <h5 className="font-bold text-xs text-slate-900 mb-1">Immunization Status</h5>
                  <ul className="text-xs text-slate-600 list-disc list-inside space-y-1">
                    <li>Hepatitis B series: Complete</li>
                    <li>Annual Influenza Vaccine: Endorsed 2025</li>
                    <li>Tetanus toxoid booster: Active</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Allergies Tab */}
          {activeTab === 'Allergies' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                <p className="text-xs text-rose-800 font-medium">
                  <strong>Critical Drug Alert:</strong> Ensure electronic prescribing safety checks verify against cross-reactivity before dispensing beta-lactams or sulfonamides.
                </p>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {patient.allergies.map((allergy, i) => (
                  <div key={i} className="p-3.5 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span className="font-bold text-slate-900 text-xs">{allergy}</span>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                      High Severity (Anaphylaxis / Angioedema risk)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Medications Tab */}
          {activeTab === 'Medications' && (
            <div className="space-y-3">
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {patient.currentMedications.map((med, i) => (
                  <div key={i} className="p-3.5 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                        <Pill className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs">{med}</p>
                        <p className="text-[11px] text-slate-400">Prescribed by Dr. Hana Mengistu</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active Regimen
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Previous Diagnoses Tab */}
          {activeTab === 'Diagnoses' && (
            <div className="space-y-2">
              {patient.previousDiagnoses.map((diag, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-xs text-slate-900">{diag}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Recorded in EHR</span>
                </div>
              ))}
            </div>
          )}

          {/* Previous Consultations Tab */}
          {activeTab === 'Consultations' && (
            <div className="space-y-3">
              {patient.previousConsultations.map((cons) => (
                <div key={cons.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span className="font-bold text-slate-900">{cons.date}</span>
                    </div>
                    <span className="text-slate-500 font-medium">{cons.doctorName}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">Clinical Notes:</strong> {cons.notes}
                  </p>
                  <p className="text-xs text-blue-700 bg-blue-50/60 p-2 rounded-lg border border-blue-100">
                    <strong>Treatment Plan:</strong> {cons.treatment}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Prescriptions Tab */}
          {activeTab === 'Prescriptions' && (
            <div className="space-y-3">
              {patient.prescriptions.map((rx) => (
                <div key={rx.id} className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900 text-sm">{rx.medication}</p>
                      <span className="text-xs font-mono font-bold bg-slate-100 px-1.5 py-0.2 rounded border">
                        {rx.dosage}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Instructions: {rx.frequency} • Duration: {rx.duration}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Date Prescribed: {rx.date}</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                    {rx.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Lab Results Tab */}
          {activeTab === 'LabResults' && (
            <div className="space-y-3">
              {patient.labResults.map((lab) => (
                <div key={lab.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-sm text-slate-900">{lab.testName}</h5>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                        lab.status === 'Pending Review'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {lab.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-mono bg-slate-50 p-2 rounded-lg border border-slate-200">
                    {lab.resultSummary}
                  </p>
                  <p className="text-[11px] text-slate-400">Specimen Collected: {lab.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            EHR ID: {patient.patientId} • MediCare HIPAA/GDPR Encrypted
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs cursor-pointer shadow-2xs"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};
