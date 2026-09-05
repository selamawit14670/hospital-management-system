import React, { useState } from 'react';
import {
  Activity,
  User,
  Heart,
  AlertTriangle,
  FileText,
  Pill,
  Clock,
  CheckCircle2,
  ArrowLeft,
  Save,
  Send,
  HeartPulse,
} from 'lucide-react';
import type { AppRoute } from '../../types';
import { ALL_PATIENTS } from '../../services/doctorDashboardService';

interface DoctorConsultationNewPageProps {
  onNavigate?: (path: AppRoute) => void;
  patientId?: string;
}

export const DoctorConsultationNewPage: React.FC<DoctorConsultationNewPageProps> = ({
  onNavigate,
  patientId = 'MC-000001',
}) => {
  const patient = ALL_PATIENTS.find((p) => p.patientId === patientId) || ALL_PATIENTS[0];

  const [chiefComplaint, setChiefComplaint] = useState(
    'Patient presents for blood pressure management follow-up. Reports occasional mild morning tension headaches.'
  );
  const [clinicalNotes, setClinicalNotes] = useState(
    'Physical Examination:\n- General appearance: Alert, oriented x3, in no acute distress.\n- Cardiovascular: Regular rate and rhythm, S1/S2 present, no murmurs.\n- Vitals today: BP 138/88 mmHg, HR 74 bpm, Temp 36.8°C, SpO2 98% on room air.\n\nAssessment:\n- Essential Hypertension (Stage 1), sub-optimally controlled on current monotherapy.\n\nPlan:\n- Adjust Lisinopril to 10mg daily.\n- Continue Amlodipine 5mg.\n- Schedule follow-up appointment in 4 weeks.'
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Bar Navigation & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate?.('/doctor/dashboard' as AppRoute)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Doctor Dashboard</span>
        </button>

        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            Status: In Progress
          </span>
          <span className="text-xs text-slate-400 font-mono">Session ID: #CNS-8294</span>
        </div>
      </div>

      {/* Patient Info Preview Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={patient.avatarUrl}
              alt={patient.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500/20 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900">{patient.name}</h1>
                <span className="font-mono text-xs font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                  {patient.patientId}
                </span>
                <span className="text-xs font-bold bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200">
                  {patient.bloodGroup}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {patient.age} years old • {patient.gender} • Phone: {patient.phone}
              </p>
              <p className="text-xs text-slate-700 font-medium mt-0.5">
                Primary Diagnosis: <span className="font-semibold text-blue-800">{patient.primaryDiagnosis}</span>
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 sm:max-w-xs">
            <div className="flex items-center gap-1 text-slate-600 font-medium">
              <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
              <span>Current Vitals:</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              BP: 138/88 mmHg • HR: 74 bpm • Temp: 36.8°C
            </p>
          </div>
        </div>

        {/* Allergy Alert Banner */}
        {patient.allergies.length > 0 && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-800">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              <strong>Known Patient Allergies:</strong> {patient.allergies.join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Consultation Documentation Form */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-5">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            Clinical Consultation Documentation
          </h2>
          <p className="text-xs text-slate-400">
            Record subjective patient history, physical examination notes, and treatment assessment
          </p>
        </div>

        {/* Chief Complaint */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Chief Complaint & Reason for Consultation
          </label>
          <input
            type="text"
            value={chiefComplaint}
            onChange={(e) => setChiefComplaint(e.target.value)}
            className="w-full bg-slate-50 focus:bg-white text-slate-800 text-sm rounded-xl border border-slate-200 p-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
          />
        </div>

        {/* Clinical Notes */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Clinical Examination Notes & Assessment (SOAP)
          </label>
          <textarea
            rows={8}
            value={clinicalNotes}
            onChange={(e) => setClinicalNotes(e.target.value)}
            className="w-full bg-slate-50 focus:bg-white text-slate-800 font-mono text-xs rounded-xl border border-slate-200 p-3.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 leading-relaxed"
          />
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {isSaved && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                Draft saved successfully
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-slate-500" />
              <span>Save Draft</span>
            </button>

            <button
              type="button"
              onClick={() => {
                handleSave();
                setTimeout(() => onNavigate?.('/doctor/dashboard' as AppRoute), 800);
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>End Consultation & Return</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
