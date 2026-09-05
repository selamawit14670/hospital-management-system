import React, { useState } from 'react';
import { ClipboardList, Search, Eye, FileText } from 'lucide-react';
import type { AppRoute } from '../../types';
import { ALL_PATIENTS } from '../../services/doctorDashboardService';
import { PatientDetailModal } from '../../components/doctor/PatientDetailModal';
import type { PatientDetailedRecord } from '../../types/doctor';

interface NurseMedicalRecordsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const NurseMedicalRecordsPage: React.FC<NurseMedicalRecordsPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientDetailedRecord | null>(null);

  const filtered = ALL_PATIENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.patientId.toLowerCase().includes(search.toLowerCase()) ||
      p.primaryDiagnosis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Inpatient Clinical Chart Records
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Review attending physician diagnosis, treatment regimens, allergy alerts, and lab results
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
            placeholder="Search medical records by patient name or ID..."
            className="w-full bg-slate-50 focus:bg-white text-slate-800 text-sm rounded-xl border border-slate-200 py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Patient</th>
                <th className="py-3 px-4">Patient ID</th>
                <th className="py-3 px-4">Primary Diagnosis</th>
                <th className="py-3 px-4">Allergies</th>
                <th className="py-3 px-4">Last Visit</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map((patient) => (
                <tr key={patient.patientId} className="hover:bg-blue-50/20 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={patient.avatarUrl}
                        alt={patient.name}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 text-xs sm:text-sm">{patient.name}</p>
                        <p className="text-[11px] text-slate-400">{patient.age}y • {patient.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                    {patient.patientId}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-medium text-slate-800">
                    {patient.primaryDiagnosis}
                  </td>
                  <td className="py-3.5 px-4">
                    {patient.allergies && patient.allergies.length > 0 ? (
                      <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        {patient.allergies.join(', ')}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">None</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    {patient.lastVisit}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedPatient(patient)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>View Chart</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PatientDetailModal
        patient={selectedPatient}
        isOpen={Boolean(selectedPatient)}
        onClose={() => setSelectedPatient(null)}
        onNavigate={onNavigate}
      />
    </div>
  );
};
