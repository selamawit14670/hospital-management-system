import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Stethoscope, AlertCircle, FileText, CheckCircle2, Phone, Video } from 'lucide-react';
import type { PatientUpcomingAppointment } from '../../types/patient';

interface PatientAppointmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: PatientUpcomingAppointment | null;
  onReschedule?: () => void;
}

export const PatientAppointmentDetailModal: React.FC<PatientAppointmentDetailModalProps> = ({
  isOpen,
  onClose,
  appointment,
  onReschedule,
}) => {
  const [showRescheduleSuccess, setShowRescheduleSuccess] = useState(false);

  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Appointment Details
              </h3>
              <p className="text-xs text-slate-500">
                Outpatient consultation record #{appointment.id}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Doctor Profile Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <img
              src={appointment.doctorAvatar}
              alt={appointment.doctorName}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-slate-900 truncate">
                  {appointment.doctorName}
                </h4>
                <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  Verified MD
                </span>
              </div>
              <p className="text-xs font-semibold text-blue-600">
                {appointment.department}
              </p>
              <p className="text-xs text-slate-500">
                {appointment.doctorSpecialty}
              </p>
            </div>
          </div>

          {/* Schedule & Location Details */}
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-150">
              <span className="flex items-center gap-2 text-slate-600 font-medium">
                <Clock className="w-4 h-4 text-blue-600" />
                Date & Time
              </span>
              <span className="font-bold text-slate-900">
                {appointment.date} • {appointment.time}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-150">
              <span className="flex items-center gap-2 text-slate-600 font-medium">
                <MapPin className="w-4 h-4 text-rose-500" />
                Clinic Location
              </span>
              <span className="font-bold text-slate-900 text-right">
                {appointment.location}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-150">
              <span className="flex items-center gap-2 text-slate-600 font-medium">
                <Stethoscope className="w-4 h-4 text-purple-600" />
                Consultation Type
              </span>
              <span className="font-bold text-slate-900">
                {appointment.type}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-150">
              <span className="flex items-center gap-2 text-slate-600 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Consultation Fee
              </span>
              <div className="text-right">
                <span className="font-bold text-slate-900 text-sm">
                  ETB {appointment.feeEtb.toFixed(2)}
                </span>
                <p className="text-[10px] text-emerald-600 font-semibold">
                  Direct billing to Ethiopian CBHI / MedSave
                </p>
              </div>
            </div>
          </div>

          {/* Reason for Visit */}
          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs space-y-1">
            <p className="font-bold text-blue-900 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              Reason for Consultation
            </p>
            <p className="text-slate-700 leading-relaxed">
              {appointment.reason}
            </p>
          </div>

          {/* Preparation Instructions */}
          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-1">
            <p className="font-bold text-amber-900 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              Preparation Instructions
            </p>
            <p className="text-amber-800 leading-relaxed">
              {appointment.preparationNotes}
            </p>
          </div>

          {showRescheduleSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
              ✓ Reschedule request received. Front desk will contact you via SMS.
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setShowRescheduleSuccess(true);
              onReschedule?.();
            }}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200/70 rounded-xl transition-colors cursor-pointer"
          >
            Request Reschedule
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
