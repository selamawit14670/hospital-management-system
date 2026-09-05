import React, { useState } from 'react';
import { X, Search, User, Phone, ArrowRight, Eye, Calendar, IdCard } from 'lucide-react';
import { ALL_PATIENTS } from '../../services/doctorDashboardService';
import type { PatientDetailedRecord } from '../../types/doctor';

interface FindPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPatient: (patientId: string) => void;
  onViewCard: (patientId: string) => void;
}

export const FindPatientModal: React.FC<FindPatientModalProps> = ({
  isOpen,
  onClose,
  onSelectPatient,
  onViewCard,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = ALL_PATIENTS.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.patientId.toLowerCase().includes(q) ||
      p.phone.toLowerCase().includes(q) ||
      p.bloodGroup.toLowerCase().includes(q) ||
      p.primaryDiagnosis.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Find Hospital Patient
              </h3>
              <p className="text-xs text-slate-500">
                Search electronic health index by name, ID, or phone
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-slate-100 bg-white shrink-0">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type patient name, phone number, or ID (e.g. MC-000001)..."
              className="w-full bg-slate-50 focus:bg-white text-slate-800 placeholder:text-slate-400 text-sm rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto divide-y divide-slate-100 space-y-1">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <User className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-medium">No patient records found</p>
              <p className="text-xs text-slate-400">
                Try searching with a different name, phone, or ID keyword.
              </p>
            </div>
          ) : (
            results.map((patient) => (
              <div
                key={patient.patientId}
                className="py-3 px-2 flex items-center justify-between hover:bg-blue-50/40 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={patient.avatarUrl}
                    alt={patient.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-slate-900 truncate">
                        {patient.name}
                      </p>
                      <span className="font-mono text-[11px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                        {patient.patientId}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">
                      {patient.age} yrs • {patient.gender} • Blood: {patient.bloodGroup} • {patient.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <button
                    type="button"
                    onClick={() => {
                      onViewCard(patient.patientId);
                      onClose();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    title="View Digital Patient Card"
                  >
                    <IdCard className="w-3.5 h-3.5 text-slate-500" />
                    <span className="hidden sm:inline">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectPatient(patient.patientId);
                      onClose();
                    }}
                    className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Record</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Found {results.length} patient profile(s)</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
