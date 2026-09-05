import React, { useState } from 'react';
import { IdCard, ArrowLeft, Search, Eye, Printer, QrCode, Shield } from 'lucide-react';
import type { AppRoute } from '../../types';
import { ALL_PATIENTS } from '../../services/doctorDashboardService';
import { PatientCardModal } from '../../components/receptionist/PatientCardModal';

interface ReceptionistPatientCardsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const ReceptionistPatientCardsPage: React.FC<ReceptionistPatientCardsPageProps> = ({
  onNavigate,
}) => {
  const [search, setSearch] = useState('');
  const [activeCardPatientId, setActiveCardPatientId] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = ALL_PATIENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.patientId.toLowerCase().includes(search.toLowerCase()) ||
      p.bloodGroup.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Patient Digital Health Cards
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Front desk card issuance, identity verification, and RFID/QR lookup
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

      {/* Info notice */}
      <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
          <IdCard className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Front Desk Health Card Terminal
          </h3>
          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
            Verify patient health cards and view card credentials below. Dedicated encrypted QR code scanning and batch printing will be configured in subsequent steps.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient name, card ID, blood type..."
            className="w-full bg-slate-50 focus:bg-white text-slate-800 placeholder:text-slate-400 text-sm rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((patient) => (
          <div
            key={patient.patientId}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={patient.avatarUrl}
                    alt={patient.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 truncate">
                      {patient.name}
                    </h3>
                    <p className="font-mono text-xs font-semibold text-blue-600">
                      {patient.patientId}
                    </p>
                  </div>
                </div>

                <span className="font-bold text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                  {patient.bloodGroup}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Demographics:</span>
                  <span className="font-medium">{patient.age} yrs • {patient.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Clinical Focus:</span>
                  <span className="font-medium truncate max-w-[170px]">
                    {patient.primaryDiagnosis}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Card Status:</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active RFID
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setActiveCardPatientId(patient.patientId);
                  setIsModalOpen(true);
                }}
                className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View & Print Health Card</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <PatientCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        patientId={activeCardPatientId}
      />
    </div>
  );
};
