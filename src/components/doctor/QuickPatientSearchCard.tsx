import React, { useState } from 'react';
import { Search, X, User, ArrowRight, FileText, Phone, Hash } from 'lucide-react';
import type { PatientDetailedRecord } from '../../types/doctor';
import type { AppRoute } from '../../types';

interface QuickPatientSearchCardProps {
  patients: PatientDetailedRecord[];
  onViewRecord: (patientId: string) => void;
  onNavigate?: (path: AppRoute) => void;
}

export const QuickPatientSearchCard: React.FC<QuickPatientSearchCardProps> = ({
  patients,
  onViewRecord,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter((patient) => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.toLowerCase().trim();
    return (
      patient.name.toLowerCase().includes(q) ||
      patient.patientId.toLowerCase().includes(q) ||
      patient.phone.includes(q) ||
      patient.primaryDiagnosis.toLowerCase().includes(q)
    );
  });

  const quickSamples = ['MC-000001', 'MC-000002', 'MC-000003', 'Sara Desta'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base tracking-tight flex items-center gap-2">
            <Search className="w-4 h-4 text-blue-600" />
            Find Patient Record
          </h3>
          <p className="text-xs text-slate-400">
            Search active patients by name, hospital ID number, or phone
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/doctor/patients' as AppRoute)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          <span>All Patients</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Search Input Box */}
      <div className="relative mb-3">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search patient by name, ID (e.g. MC-000001), or phone..."
          className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 placeholder:text-slate-400 text-sm rounded-xl border border-slate-200/90 py-2.5 pl-10 pr-10 transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Lookup Chips */}
      <div className="flex flex-wrap items-center gap-1.5 mb-4 text-xs text-slate-500">
        <span className="text-[11px] font-medium text-slate-400">Quick ID:</span>
        {quickSamples.map((sample) => (
          <button
            key={sample}
            type="button"
            onClick={() => setSearchQuery(sample)}
            className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 text-[11px] font-mono transition-colors cursor-pointer border border-slate-200/60"
          >
            {sample}
          </button>
        ))}
      </div>

      {/* Results or Helper Area */}
      {searchQuery.trim() ? (
        <div className="space-y-2.5">
          {filteredPatients.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
              No matching patients found for <strong className="text-slate-700">"{searchQuery}"</strong>. Check the patient ID format.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.patientId}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition-all flex items-center justify-between gap-3 bg-white"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={patient.avatarUrl}
                      alt={patient.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-sm truncate">{patient.name}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono bg-slate-100 px-1 py-0.2 rounded text-[10px] border border-slate-200 font-semibold">
                          {patient.patientId}
                        </span>
                        <span>•</span>
                        <span>{patient.age}y / {patient.gender}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 truncate mt-0.5" title={patient.primaryDiagnosis}>
                        {patient.primaryDiagnosis}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onViewRecord(patient.patientId)}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 hover:border-blue-600 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Record</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl bg-slate-50/60 border border-slate-200/70 p-3.5 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400" />
            <span>Type above to view patient allergies, medical history, and past diagnoses.</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">Ctrl + K</span>
        </div>
      )}
    </div>
  );
};
