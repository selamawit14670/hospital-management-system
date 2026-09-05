import React, { useState } from 'react';
import {
  Calendar,
  Search,
  Clock,
  CheckCircle,
  Stethoscope,
  ChevronRight,
  UserCheck,
  Building,
} from 'lucide-react';
import type { ReceptionistAppointment } from '../../types/receptionist';

interface ReceptionistAppointmentsTableProps {
  appointments: ReceptionistAppointment[];
  onCheckIn: (appointmentId: string) => void;
  onViewPatient: (patientId: string) => void;
}

export const ReceptionistAppointmentsTable: React.FC<ReceptionistAppointmentsTableProps> = ({
  appointments,
  onCheckIn,
  onViewPatient,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Confirmed' | 'Checked-in' | 'In Consultation'>('All');

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.department.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === 'All') return true;
    return apt.status === statusFilter;
  });

  const getStatusBadge = (status: ReceptionistAppointment['status']) => {
    switch (status) {
      case 'Checked-in':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3 h-3" />
            Checked-in
          </span>
        );
      case 'In Consultation':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Stethoscope className="w-3 h-3" />
            In Consultation
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            Completed
          </span>
        );
      case 'Confirmed':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3 h-3" />
            Confirmed
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Table Header & Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Today&apos;s Appointments
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                {appointments.length} Total
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Scheduled outpatient appointments, triage arrivals, and check-in desk
            </p>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Search box */}
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patient, ID, doctor..."
              className="w-full bg-slate-50 focus:bg-white text-slate-800 placeholder:text-slate-400 text-xs rounded-xl border border-slate-200 py-2 pl-8 pr-3 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center bg-slate-100/80 p-0.5 rounded-xl text-xs overflow-x-auto">
            {(['All', 'Confirmed', 'Checked-in', 'In Consultation'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === tab
                    ? 'bg-white text-blue-700 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop & Tablet Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-6">Patient</th>
              <th className="py-3 px-4">Patient ID</th>
              <th className="py-3 px-4">Doctor</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 sm:px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-400 text-xs">
                  No appointments found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((apt) => (
                <tr
                  key={apt.id}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  {/* Patient */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={apt.patientAvatar}
                        alt={apt.patientName}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">
                          {apt.patientName}
                        </p>
                        <p className="text-xs text-slate-400">
                          {apt.patientAge} yrs • {apt.patientGender}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Patient ID */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded-md">
                      {apt.patientId}
                    </span>
                  </td>

                  {/* Doctor */}
                  <td className="py-3.5 px-4">
                    <div className="min-w-0">
                      <p className="font-medium text-slate-800 truncate">
                        {apt.doctorName}
                      </p>
                      {apt.room && (
                        <p className="text-[11px] text-slate-400">{apt.room}</p>
                      )}
                    </div>
                  </td>

                  {/* Department */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-700">
                      <Building className="w-3 h-3 text-slate-400" />
                      {apt.department}
                    </span>
                  </td>

                  {/* Time */}
                  <td className="py-3.5 px-4">
                    <div className="inline-flex items-center gap-1.5 font-medium text-slate-800 text-xs bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{apt.time}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">{getStatusBadge(apt.status)}</td>

                  {/* Action */}
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <div className="inline-flex items-center justify-end gap-2">
                      {apt.status === 'Confirmed' ? (
                        <button
                          type="button"
                          onClick={() => onCheckIn(apt.id)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Check In</span>
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium px-2 py-1 bg-slate-50 rounded-lg">
                          {apt.status === 'Checked-in' ? 'In Queue' : 'Active'}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => onViewPatient(apt.patientId)}
                        title="View Patient Record"
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
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
