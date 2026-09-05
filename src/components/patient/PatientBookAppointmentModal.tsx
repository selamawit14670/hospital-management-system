import React, { useState } from 'react';
import { X, Calendar, Clock, Stethoscope, CheckCircle2, User, Building2, AlertCircle } from 'lucide-react';
import type { BookAppointmentPayload } from '../../types/patient';

interface PatientBookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookSuccess: (payload: BookAppointmentPayload) => void;
}

export const PatientBookAppointmentModal: React.FC<PatientBookAppointmentModalProps> = ({
  isOpen,
  onClose,
  onBookSuccess,
}) => {
  const [department, setDepartment] = useState('Cardiology & Internal Medicine');
  const [doctorName, setDoctorName] = useState('Dr. Hana Mengistu');
  const [appointmentDate, setAppointmentDate] = useState('2026-09-12');
  const [appointmentTime, setAppointmentTime] = useState('10:00 AM');
  const [appointmentType, setAppointmentType] = useState<'In-Person Consultation' | 'Telehealth'>('In-Person Consultation');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      setError('Please provide a brief reason for your consultation.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      onBookSuccess({
        department,
        doctorName,
        appointmentDate: 'Sep 12, 2026',
        appointmentTime,
        appointmentType,
        reason,
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

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
                Book an Appointment
              </h3>
              <p className="text-xs text-slate-500">
                Schedule a consultation at MediCare Hospital
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Department */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Medical Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="Cardiology & Internal Medicine">Cardiology & Internal Medicine</option>
              <option value="Diagnostic Pathology & Lab">Diagnostic Pathology & Lab</option>
              <option value="General Outpatient Care">General Outpatient Care</option>
              <option value="Neurology & Stroke Clinic">Neurology & Stroke Clinic</option>
              <option value="Orthopedics & Joint Care">Orthopedics & Joint Care</option>
            </select>
          </div>

          {/* Attending Physician */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Attending Physician
            </label>
            <select
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="Dr. Hana Mengistu">Dr. Hana Mengistu (Cardiologist - Primary Care)</option>
              <option value="Dr. Brook Tesfaye">Dr. Brook Tesfaye (Pathologist)</option>
              <option value="Dr. Robert Garcia">Dr. Robert Garcia (General Medicine)</option>
              <option value="Dr. Michael Chen">Dr. Michael Chen (Cardiac Electrophysiologist)</option>
            </select>
          </div>

          {/* Date & Time Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Time Slot
              </label>
              <select
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="08:30 AM">08:30 AM - Morning Slot</option>
                <option value="10:00 AM">10:00 AM - Morning Slot</option>
                <option value="02:00 PM">02:00 PM - Afternoon Slot</option>
                <option value="04:00 PM">04:00 PM - Evening Slot</option>
              </select>
            </div>
          </div>

          {/* Consultation Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Consultation Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAppointmentType('In-Person Consultation')}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                  appointmentType === 'In-Person Consultation'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                In-Person Hospital Visit
              </button>
              <button
                type="button"
                onClick={() => setAppointmentType('Telehealth')}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                  appointmentType === 'Telehealth'
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Virtual Telehealth Call
              </button>
            </div>
          </div>

          {/* Reason for Visit */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Reason for Visit / Clinical Symptoms
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Routine blood pressure check, medication adjustment, or chest discomfort follow-up..."
              className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Fee & Insurance Notice */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
            <span className="text-slate-600 font-medium">Estimated Copay (ETB):</span>
            <span className="font-bold text-slate-900">
              ETB 450.00 <span className="text-[10px] text-emerald-600 font-normal">(CBHI Covered)</span>
            </span>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
