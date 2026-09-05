import React, { useState } from 'react';
import { Users, BedDouble, Search, HeartPulse, Eye, ArrowLeft } from 'lucide-react';
import type { AppRoute } from '../../types';
import { NURSE_PATIENT_QUEUE } from '../../services/nurseDashboardService';
import { ALL_PATIENTS } from '../../services/doctorDashboardService';
import { PatientDetailModal } from '../../components/doctor/PatientDetailModal';
import { RecordVitalsModal } from '../../components/nurse/RecordVitalsModal';
import type { PatientDetailedRecord } from '../../types/doctor';
import type { NurseQueuePatient } from '../../types/nurse';

interface NursePatientsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const NursePatientsPage: React.FC<NursePatientsPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientDetailedRecord | null>(null);
  const [vitalsPatient, setVitalsPatient] = useState<NurseQueuePatient | null>(null);

  const filtered = NURSE_PATIENT_QUEUE.filter(
    (p) =>
      p.patientName.toLowerCase().includes(search.toLowerCase()) ||
      p.patientId.toLowerCase().includes(search.toLowerCase()) ||
      p.roomBed.toLowerCase().includes(search.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Assigned Ward Inpatients
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Inpatients allocated to Ward Station #4 under nursing care and continuous clinical monitoring
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/nurse/dashboard' as AppRoute)}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          &larr; Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient name, ID, room, or condition..."
            className="w-full bg-slate-50 focus:bg-white text-slate-800 placeholder:text-slate-400 text-sm rounded-xl border border-slate-200 py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((patient) => (
          <div
            key={patient.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <img
                  src={patient.patientAvatar}
                  alt={patient.patientName}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-2xs shrink-0"
                />
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  {patient.patientId}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900">{patient.patientName}</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {patient.age} yrs • {patient.gender}
              </p>

              <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <BedDouble className="w-3.5 h-3.5 text-blue-600" />
                  <span>{patient.roomBed}</span>
                </div>
                <p className="text-slate-600">
                  <span className="text-slate-400">Condition:</span> {patient.condition}
                </p>
                <p className="text-slate-500 text-[11px]">
                  Doctor: {patient.doctorName}
                </p>
              </div>

              {patient.vitalsSummary && (
                <div className="mt-3 p-2.5 rounded-xl bg-blue-50/50 border border-blue-100/80 flex items-center justify-between text-xs text-slate-700">
                  <span>BP: <strong>{patient.vitalsSummary.bp}</strong></span>
                  <span>HR: <strong>{patient.vitalsSummary.hr}</strong></span>
                  <span>SpO2: <strong>{patient.vitalsSummary.spo2}%</strong></span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  const found = ALL_PATIENTS.find((p) => p.patientId === patient.patientId) || ALL_PATIENTS[0];
                  setSelectedPatient(found);
                }}
                className="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>View EHR</span>
              </button>

              <button
                type="button"
                onClick={() => setVitalsPatient(patient)}
                className="py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
              >
                <HeartPulse className="w-3.5 h-3.5" />
                <span>Vitals</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <PatientDetailModal
        patient={selectedPatient}
        isOpen={Boolean(selectedPatient)}
        onClose={() => setSelectedPatient(null)}
        onNavigate={onNavigate}
      />

      <RecordVitalsModal
        isOpen={Boolean(vitalsPatient)}
        onClose={() => setVitalsPatient(null)}
        selectedPatient={vitalsPatient}
        patientsList={NURSE_PATIENT_QUEUE}
        onSaveVitals={() => {}}
      />
    </div>
  );
};
