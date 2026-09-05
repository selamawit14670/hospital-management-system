import React, { useState } from 'react';
import { Users, Search, ArrowLeft, Eye, IdCard, Phone, Calendar } from 'lucide-react';
import type { AppRoute } from '../../types';
import { ALL_PATIENTS } from '../../services/doctorDashboardService';
import { PatientDetailModal } from '../../components/doctor/PatientDetailModal';
import { PatientCardModal } from '../../components/receptionist/PatientCardModal';
import type { PatientDetailedRecord } from '../../types/doctor';

interface ReceptionistPatientsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const ReceptionistPatientsPage: React.FC<ReceptionistPatientsPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientDetailedRecord | null>(null);
  const [cardPatientId, setCardPatientId] = useState<string | undefined>(undefined);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const filtered = ALL_PATIENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.patientId.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.toLowerCase().includes(search.toLowerCase()) ||
      p.primaryDiagnosis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Hospital Patients Master Index
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Admissions, patient directory, digital card verification, and quick lookup
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/receptionist/dashboard' as AppRoute)}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient name, ID, phone, or location..."
            className="w-full bg-slate-50 focus:bg-white text-slate-800 placeholder:text-slate-400 text-sm rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              Registered Patients ({filtered.length})
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">Patient</th>
                <th className="py-3.5 px-4">Patient ID</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Blood Group</th>
                <th className="py-3.5 px-4">Diagnosis / Department</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
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
                        <p className="font-semibold text-slate-900">{patient.name}</p>
                        <p className="text-xs text-slate-400">
                          {patient.age} yrs • {patient.gender}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                      {patient.patientId}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-mono text-slate-600">
                    {patient.phone}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 font-bold text-xs text-slate-700">
                      {patient.bloodGroup}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-medium text-slate-700 truncate max-w-[180px]">
                    {patient.primaryDiagnosis}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="inline-flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setCardPatientId(patient.patientId);
                          setIsCardModalOpen(true);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        title="View Health Card"
                      >
                        <IdCard className="w-3.5 h-3.5 text-slate-500" />
                        <span>Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPatient(patient)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPatient && (
        <PatientDetailModal
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
          patient={selectedPatient}
        />
      )}

      <PatientCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        patientId={cardPatientId}
      />
    </div>
  );
};
