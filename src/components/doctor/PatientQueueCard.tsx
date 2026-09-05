import React from 'react';
import { Clock, AlertTriangle, AlertCircle, Play, UserCheck, HeartPulse } from 'lucide-react';
import type { WaitingPatient, TriagePriority } from '../../types/doctor';
import type { AppRoute } from '../../types';

interface PatientQueueCardProps {
  queue: WaitingPatient[];
  onStartConsultation: (patient: WaitingPatient) => void;
  onViewPatient: (patientId: string) => void;
  onNavigate?: (path: AppRoute) => void;
}

export const PatientQueueCard: React.FC<PatientQueueCardProps> = ({
  queue,
  onStartConsultation,
  onViewPatient,
  onNavigate,
}) => {
  const getPriorityBadge = (priority: TriagePriority) => {
    switch (priority) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 animate-pulse">
            <AlertTriangle className="w-3 h-3 text-rose-600" />
            Critical
          </span>
        );
      case 'Urgent':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            Urgent
          </span>
        );
      case 'Normal':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            Normal
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base tracking-tight flex items-center gap-2">
              Patient Queue
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                {queue.length} waiting
              </span>
            </h3>
            <p className="text-xs text-slate-400">Patients checked in and waiting in the lobby</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/doctor/appointments' as AppRoute)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        >
          View all
        </button>
      </div>

      {/* Queue List */}
      <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-120">
        {queue.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <UserCheck className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-medium">No patients waiting in queue</p>
          </div>
        ) : (
          queue.map((patient) => (
            <div
              key={patient.id}
              className={`p-4 rounded-xl border transition-all duration-150 ${
                patient.priority === 'Critical'
                  ? 'border-rose-200 bg-rose-50/40 hover:bg-rose-50/70'
                  : patient.priority === 'Urgent'
                  ? 'border-amber-200 bg-amber-50/30 hover:bg-amber-50/60'
                  : 'border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-2xs'
              }`}
            >
              {/* Top Row: Patient Info & Priority */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <img
                    src={patient.patientAvatar}
                    alt={patient.patientName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <h4
                      onClick={() => onViewPatient(patient.patientId)}
                      className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {patient.patientName}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono bg-white px-1.5 py-0.2 rounded border border-slate-200 text-[11px]">
                        {patient.patientId}
                      </span>
                      <span>•</span>
                      <span>Slot: {patient.appointmentTime}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0">{getPriorityBadge(patient.priority)}</div>
              </div>

              {/* Chief Complaint / Reason */}
              <div className="mb-2.5">
                <p className="text-xs text-slate-700 font-medium line-clamp-1">
                  <span className="text-slate-400 font-normal">Reason:</span> {patient.reason}
                </p>
              </div>

              {/* Vitals summary if recorded */}
              {patient.vitals && (
                <div className="mb-3 px-2.5 py-1.5 rounded-lg bg-white/80 border border-slate-200/80 flex items-center justify-between text-[11px] text-slate-600">
                  <span className="flex items-center gap-1 font-medium">
                    <HeartPulse className="w-3 h-3 text-rose-500" />
                    BP: <strong>{patient.vitals.bp}</strong>
                  </span>
                  <span>HR: <strong>{patient.vitals.hr}</strong></span>
                  <span>SpO2: <strong>{patient.vitals.spo2}</strong></span>
                </div>
              )}

              {/* Bottom Row: Waiting Time & Action */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Waiting {patient.waitingMinutes} min</span>
                </div>

                <button
                  type="button"
                  onClick={() => onStartConsultation(patient)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-2xs"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Call In / Start</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
