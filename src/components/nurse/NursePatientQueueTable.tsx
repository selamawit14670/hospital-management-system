import React from 'react';
import {
  Users,
  Eye,
  HeartPulse,
  AlertTriangle,
  AlertCircle,
  BedDouble,
  User,
  Stethoscope,
  Clock,
  ArrowRight,
} from 'lucide-react';
import type { NurseQueuePatient } from '../../types/nurse';
import type { TriagePriority } from '../../types/doctor';
import type { AppRoute } from '../../types';

interface NursePatientQueueTableProps {
  patients: NurseQueuePatient[];
  onViewPatient: (patientId: string) => void;
  onRecordVitals: (patient: NurseQueuePatient) => void;
  onNavigate?: (path: AppRoute) => void;
}

export const NursePatientQueueTable: React.FC<NursePatientQueueTableProps> = ({
  patients,
  onViewPatient,
  onRecordVitals,
  onNavigate,
}) => {
  const getPriorityBadge = (priority: TriagePriority) => {
    switch (priority) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 animate-pulse whitespace-nowrap">
            <AlertTriangle className="w-3 h-3 text-rose-600" />
            Critical
          </span>
        );
      case 'Urgent':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 whitespace-nowrap">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            Urgent
          </span>
        );
      case 'Normal':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
            Normal
          </span>
        );
    }
  };

  const getStatusBadge = (status: NurseQueuePatient['status']) => {
    switch (status) {
      case 'Vitals Due':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
            Vitals Due
          </span>
        );
      case 'In Care':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap">
            In Care
          </span>
        );
      case 'Bed Assigned':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 whitespace-nowrap">
            Bed Assigned
          </span>
        );
      case 'Waiting':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
            Waiting
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 sm:px-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight flex items-center gap-2">
              Today's Patient Queue
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                {patients.length} Active
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Ward inpatient triage queue, bed allocation status, and vital sign checks
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/nurse/patients' as AppRoute)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          <span>All Inpatients</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Desktop & Tablet Table (Hidden on small mobile for clean card reflow) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-6">Patient</th>
              <th className="py-3 px-4">Patient ID</th>
              <th className="py-3 px-4">Room / Bed</th>
              <th className="py-3 px-4">Doctor</th>
              <th className="py-3 px-4">Condition</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-blue-50/20 transition-colors">
                {/* Patient */}
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={patient.patientAvatar}
                      alt={patient.patientName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">
                        {patient.patientName}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {patient.age}y • {patient.gender}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Patient ID */}
                <td className="py-3.5 px-4 font-mono text-xs font-semibold text-slate-600">
                  {patient.patientId}
                </td>

                {/* Room / Bed */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                    <BedDouble className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{patient.roomBed}</span>
                  </div>
                </td>

                {/* Doctor */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-xs text-slate-700">
                    <Stethoscope className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{patient.doctorName}</span>
                  </div>
                </td>

                {/* Condition */}
                <td className="py-3.5 px-4 text-xs font-medium text-slate-700 max-w-xs">
                  <span className="line-clamp-1" title={patient.condition}>
                    {patient.condition}
                  </span>
                </td>

                {/* Priority */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  {getPriorityBadge(patient.priority)}
                </td>

                {/* Status */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  {getStatusBadge(patient.status)}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-6 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onViewPatient(patient.patientId)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>View</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onRecordVitals(patient)}
                      className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                    >
                      <HeartPulse className="w-3.5 h-3.5" />
                      <span>Record Vitals</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout (Visible on small screens) */}
      <div className="block md:hidden divide-y divide-slate-100">
        {patients.map((patient) => (
          <div key={patient.id} className="p-4 space-y-3">
            {/* Top row: Avatar, Name, ID, Priority */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <img
                  src={patient.patientAvatar}
                  alt={patient.patientName}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{patient.patientName}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono bg-slate-100 px-1.5 py-0.2 rounded font-semibold text-[11px]">
                      {patient.patientId}
                    </span>
                    <span>•</span>
                    <span>{patient.age}y / {patient.gender}</span>
                  </div>
                </div>
              </div>
              <div className="shrink-0">{getPriorityBadge(patient.priority)}</div>
            </div>

            {/* Room, Doctor & Condition */}
            <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1.5 border border-slate-200/60">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <BedDouble className="w-3.5 h-3.5 text-blue-600" />
                  {patient.roomBed}
                </span>
                {getStatusBadge(patient.status)}
              </div>
              <p className="text-slate-600">
                <span className="text-slate-400">Doctor:</span> {patient.doctorName}
              </p>
              <p className="text-slate-700 font-medium">
                <span className="text-slate-400">Condition:</span> {patient.condition}
              </p>
            </div>

            {/* Actions: View Patient & Record Vitals */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => onViewPatient(patient.patientId)}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>View Patient</span>
              </button>

              <button
                type="button"
                onClick={() => onRecordVitals(patient)}
                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
              >
                <HeartPulse className="w-3.5 h-3.5" />
                <span>Record Vitals</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
