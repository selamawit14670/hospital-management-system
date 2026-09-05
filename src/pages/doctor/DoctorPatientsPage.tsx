import React, { useState } from 'react';
import { Users, Search, Plus, FileText, Phone, Mail, Filter, ArrowRight } from 'lucide-react';
import type { AppRoute } from '../../types';
import type { PatientDetailedRecord } from '../../types/doctor';
import { ALL_PATIENTS } from '../../services/doctorDashboardService';
import { PatientDetailModal } from '../../components/doctor/PatientDetailModal';

interface DoctorPatientsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const DoctorPatientsPage: React.FC<DoctorPatientsPageProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Male' | 'Female'>('All');
  const [selectedPatient, setSelectedPatient] = useState<PatientDetailedRecord | null>(null);

  const filteredPatients = ALL_PATIENTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.patientId.toLowerCase().includes(search.toLowerCase()) ||
      p.primaryDiagnosis.toLowerCase().includes(search.toLowerCase());
    const matchesGender = genderFilter === 'All' || p.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            My Assigned Patients
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Cohort of 124 patients under your active clinical management and outpatient supervision
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate?.('/doctor/dashboard' as AppRoute)}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            &larr; Back to Dashboard
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient name, ID, or diagnosis..."
            className="w-full bg-slate-50 focus:bg-white text-slate-800 placeholder:text-slate-400 text-sm rounded-xl border border-slate-200 py-2 pl-10 pr-4 transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <span className="text-xs font-medium text-slate-500">Gender:</span>
          {(['All', 'Male', 'Female'] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGenderFilter(g)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                genderFilter === g
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPatients.map((patient) => (
          <div
            key={patient.patientId}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <img
                  src={patient.avatarUrl}
                  alt={patient.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-2xs shrink-0"
                />
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  {patient.patientId}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900">{patient.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {patient.age} yrs • {patient.gender} • Blood Group: <strong className="text-slate-800">{patient.bloodGroup}</strong>
              </p>

              <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-semibold text-slate-800">
                  {patient.primaryDiagnosis}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Last clinical visit: {patient.lastVisit}
                </p>
              </div>

              <div className="mt-3 space-y-1 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{patient.phone}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                {patient.allergies.length} recorded allergies
              </span>
              <button
                type="button"
                onClick={() => setSelectedPatient(patient)}
                className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 hover:border-blue-600 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Record</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Patient Detail Modal */}
      <PatientDetailModal
        patient={selectedPatient}
        isOpen={Boolean(selectedPatient)}
        onClose={() => setSelectedPatient(null)}
        onStartConsultation={(id) => onNavigate?.('/doctor/consultations/new' as AppRoute)}
        onNavigate={onNavigate}
      />
    </div>
  );
};
