import React from 'react';
import { Clock, Bell, HeartPulse, Stethoscope, ChevronRight, User } from 'lucide-react';
import type { WaitingPatient } from '../../types/receptionist';

interface ReceptionistWaitingPatientsCardProps {
  waitingPatients: WaitingPatient[];
  onUpdateStatus: (patientId: string, newStatus: WaitingPatient['status']) => void;
  onViewPatient?: (patientId: string) => void;
}

export const ReceptionistWaitingPatientsCard: React.FC<ReceptionistWaitingPatientsCardProps> = ({
  waitingPatients,
  onUpdateStatus,
  onViewPatient,
}) => {
  const getStatusBadge = (status: WaitingPatient['status']) => {
    switch (status) {
      case 'Called':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 animate-pulse">
            <Bell className="w-3 h-3" />
            Called
          </span>
        );
      case 'Vitals Ready':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
            <HeartPulse className="w-3 h-3" />
            Vitals Ready
          </span>
        );
      case 'In Consultation':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
            <Stethoscope className="w-3 h-3" />
            In Office
          </span>
        );
      case 'Waiting':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
            <Clock className="w-3 h-3" />
            Waiting
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Waiting Patients
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                {waitingPatients.length} Waiting
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Live reception lobby queue, triage order, and physician call-in
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-500">
          <span className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Live Queue Station
          </span>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-6">Patient</th>
              <th className="py-3 px-4">Arrival Time</th>
              <th className="py-3 px-4">Appointment</th>
              <th className="py-3 px-4">Doctor</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 sm:px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {waitingPatients.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                  No patients currently waiting in the lobby.
                </td>
              </tr>
            ) : (
              waitingPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-amber-50/20 transition-colors group"
                >
                  {/* Patient */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={patient.patientAvatar}
                          alt={patient.patientName}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <span className="absolute -bottom-1 -right-1 px-1 py-0.2 bg-slate-900 text-white font-mono text-[9px] font-bold rounded">
                          {patient.queueNumber}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">
                          {patient.patientName}
                        </p>
                        <p className="text-xs text-slate-400">
                          {patient.patientId}
                          {patient.priority === 'Priority' && (
                            <span className="ml-1.5 text-[10px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">
                              Priority
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Arrival Time */}
                  <td className="py-3.5 px-4">
                    <div className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{patient.arrivalTime}</span>
                    </div>
                  </td>

                  {/* Appointment */}
                  <td className="py-3.5 px-4">
                    <span className="text-xs text-slate-800 font-medium">
                      {patient.appointment}
                    </span>
                  </td>

                  {/* Doctor */}
                  <td className="py-3.5 px-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-800">
                        {patient.doctor}
                      </p>
                      {patient.room && (
                        <p className="text-[11px] text-slate-400">{patient.room}</p>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">{getStatusBadge(patient.status)}</td>

                  {/* Action */}
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <div className="inline-flex items-center justify-end gap-1.5">
                      {patient.status === 'Waiting' && (
                        <button
                          type="button"
                          onClick={() => onUpdateStatus(patient.patientId, 'Called')}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold border border-blue-200 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Bell className="w-3 h-3" />
                          <span>Call</span>
                        </button>
                      )}

                      {patient.status === 'Called' && (
                        <button
                          type="button"
                          onClick={() => onUpdateStatus(patient.patientId, 'In Consultation')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold border border-emerald-200 transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Stethoscope className="w-3 h-3" />
                          <span>Send to Room</span>
                        </button>
                      )}

                      {patient.status === 'Vitals Ready' && (
                        <button
                          type="button"
                          onClick={() => onUpdateStatus(patient.patientId, 'Called')}
                          className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold border border-indigo-200 transition-colors cursor-pointer"
                        >
                          Notify Doctor
                        </button>
                      )}

                      {onViewPatient && (
                        <button
                          type="button"
                          onClick={() => onViewPatient(patient.patientId)}
                          title="View Profile"
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
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
