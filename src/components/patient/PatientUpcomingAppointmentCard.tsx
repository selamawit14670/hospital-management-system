import React from 'react';
import { Calendar, Clock, MapPin, User, ChevronRight, Stethoscope, AlertCircle, FileCheck } from 'lucide-react';
import type { PatientUpcomingAppointment } from '../../types/patient';

interface PatientUpcomingAppointmentCardProps {
  appointment: PatientUpcomingAppointment | null;
  onViewDetails: (appointment: PatientUpcomingAppointment) => void;
  onBookNew: () => void;
}

export const PatientUpcomingAppointmentCard: React.FC<PatientUpcomingAppointmentCardProps> = ({
  appointment,
  onViewDetails,
  onBookNew,
}) => {
  if (!appointment) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 flex flex-col items-center justify-center text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">No Scheduled Appointments</h3>
          <p className="text-xs text-slate-500 max-w-sm mt-0.5">
            You do not have any pending consultations scheduled. Book a visit with your physician when needed.
          </p>
        </div>
        <button
          type="button"
          onClick={onBookNew}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
        >
          Book Appointment
        </button>
      </div>
    );
  }

  const getStatusBadge = (status: PatientUpcomingAppointment['status']) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Completed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-900 truncate">
              Upcoming Appointment
            </h3>
            <p className="text-xs text-slate-500 truncate">
              Next scheduled consultation with your attending care team
            </p>
          </div>
        </div>

        <span
          className={`text-xs font-bold px-3 py-1 rounded-full border shrink-0 ${getStatusBadge(
            appointment.status
          )}`}
        >
          ● {appointment.status}
        </span>
      </div>

      {/* Main Appointment Body */}
      <div className="space-y-4">
        {/* Doctor details card row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-3.5 min-w-0">
            <img
              src={appointment.doctorAvatar}
              alt={appointment.doctorName}
              referrerPolicy="no-referrer"
              className="w-13 h-13 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {appointment.doctorName}
                </h4>
                <span className="hidden sm:inline-flex text-[10px] font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                  Attending
                </span>
              </div>
              <p className="text-xs font-semibold text-blue-600 truncate">
                {appointment.department}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {appointment.doctorSpecialty}
              </p>
            </div>
          </div>

          <div className="sm:text-right shrink-0">
            <p className="text-[11px] text-slate-500">Consultation Fee</p>
            <p className="text-sm font-bold text-slate-900">
              ETB {appointment.feeEtb.toFixed(2)}
            </p>
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
              Insurance Covered
            </span>
          </div>
        </div>

        {/* Schedule & Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-150/60">
            <Clock className="w-4 h-4 text-blue-600 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] text-slate-500">Date & Time Slot</p>
              <p className="font-bold text-slate-800 truncate">{appointment.date}</p>
              <p className="text-slate-600 font-medium">{appointment.time}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-150/60">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] text-slate-500">Location & Suite</p>
              <p className="font-bold text-slate-800 truncate">{appointment.location}</p>
              <p className="text-slate-600 font-medium">Outpatient Wing B</p>
            </div>
          </div>
        </div>

        {/* Reason for Visit */}
        <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-blue-900 mb-0.5">
            <FileCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Reason for Visit</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            {appointment.reason}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          Check-in at desk 15 minutes before
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBookNew}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            Book Another
          </button>

          <button
            type="button"
            onClick={() => onViewDetails(appointment)}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
