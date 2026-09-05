import React from 'react';
import { UserPlus, Eye, Phone, Calendar, ChevronRight } from 'lucide-react';
import type { RecentlyRegisteredPatient } from '../../types/receptionist';

interface ReceptionistRecentPatientsTableProps {
  patients: RecentlyRegisteredPatient[];
  onViewPatient: (patientId: string) => void;
  onRegisterNew?: () => void;
}

export const ReceptionistRecentPatientsTable: React.FC<ReceptionistRecentPatientsTableProps> = ({
  patients,
  onViewPatient,
  onRegisterNew,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <UserPlus className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Recently Registered Patients
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                {patients.length} Recent
              </span>
            </div>
            <p className="text-xs text-slate-500">
              New outpatient enrollments, KYC entries, and digital health cards created
            </p>
          </div>
        </div>

        {onRegisterNew && (
          <button
            type="button"
            onClick={onRegisterNew}
            className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold border border-blue-200 transition-colors cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>New Patient</span>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-6">Patient</th>
              <th className="py-3 px-4">Patient ID</th>
              <th className="py-3 px-4">Registration Date</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4 sm:px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {patients.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                  No recently registered patients found.
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-blue-50/20 transition-colors group"
                >
                  {/* Patient */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={patient.avatarUrl}
                        alt={patient.name}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">
                          {patient.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {patient.age} yrs • {patient.gender}
                          {patient.bloodGroup && ` • ${patient.bloodGroup}`}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Patient ID */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                      {patient.patientId}
                    </span>
                  </td>

                  {/* Registration Date */}
                  <td className="py-3.5 px-4">
                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{patient.registrationDate}</span>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="py-3.5 px-4">
                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-mono">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{patient.phone}</span>
                    </div>
                  </td>

                  {/* Action: [View Patient] */}
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <button
                      type="button"
                      onClick={() => onViewPatient(patient.patientId)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-blue-50 text-blue-600 text-xs font-semibold border border-slate-200 hover:border-blue-200 shadow-2xs transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Patient</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
