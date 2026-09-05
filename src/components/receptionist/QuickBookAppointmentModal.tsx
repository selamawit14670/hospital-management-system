import React, { useState } from 'react';
import { X, CalendarPlus, CheckCircle, Clock, Calendar } from 'lucide-react';
import type { QuickAppointmentFormData } from '../../types/receptionist';

interface QuickBookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: (data: QuickAppointmentFormData) => void;
}

export const QuickBookAppointmentModal: React.FC<QuickBookAppointmentModalProps> = ({
  isOpen,
  onClose,
  onBook,
}) => {
  const [formData, setFormData] = useState<QuickAppointmentFormData>({
    patientId: 'MC-000001',
    patientName: 'Abebe Kebede',
    doctorName: 'Dr. Hana Mengistu',
    department: 'General Medicine',
    time: '11:30 AM',
    type: 'Consultation',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBook(formData);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CalendarPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Book Outpatient Slot
              </h3>
              <p className="text-xs text-slate-500">
                Schedule today or upcoming consultation
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

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Appointment Booked!
            </h4>
            <p className="text-xs text-slate-500">
              Slot confirmed for {formData.patientName} with {formData.doctorName} at {formData.time}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Patient Name & ID *
              </label>
              <input
                type="text"
                required
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                placeholder="e.g. Sara Desta"
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:bg-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="General Medicine">General Medicine</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Neurology">Neurology</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Attending Doctor
                </label>
                <select
                  value={formData.doctorName}
                  onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="Dr. Hana Mengistu">Dr. Hana Mengistu</option>
                  <option value="Dr. Biruk Assefa">Dr. Biruk Assefa</option>
                  <option value="Dr. Aster Paulos">Dr. Aster Paulos</option>
                  <option value="Dr. Yonas Tadesse">Dr. Yonas Tadesse</option>
                  <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Time Slot
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:bg-white focus:outline-none focus:border-blue-500 cursor-pointer font-medium"
                >
                  <option value="09:30 AM">09:30 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Appointment Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus:bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Routine Checkup">Routine Checkup</option>
                  <option value="Lab Review">Lab Review</option>
                  <option value="Emergency Triage">Emergency Triage</option>
                </select>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Confirm Appointment</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
