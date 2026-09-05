import React, { useState } from 'react';
import { Calendar, ArrowLeft, CalendarPlus, Search, Clock, UserCheck } from 'lucide-react';
import type { AppRoute } from '../../types';
import { ReceptionistAppointmentsTable } from '../../components/receptionist/ReceptionistAppointmentsTable';
import { QuickBookAppointmentModal } from '../../components/receptionist/QuickBookAppointmentModal';
import { PatientDetailModal } from '../../components/doctor/PatientDetailModal';
import { receptionistDashboardService, TODAY_APPOINTMENTS_DATA } from '../../services/receptionistDashboardService';
import { ALL_PATIENTS } from '../../services/doctorDashboardService';
import type { PatientDetailedRecord } from '../../types/doctor';
import type { ReceptionistAppointment } from '../../types/receptionist';

interface ReceptionistAppointmentsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const ReceptionistAppointmentsPage: React.FC<ReceptionistAppointmentsPageProps> = ({
  onNavigate,
}) => {
  const [appointments, setAppointments] = useState<ReceptionistAppointment[]>(TODAY_APPOINTMENTS_DATA);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientDetailedRecord | null>(null);

  const handleCheckIn = async (appointmentId: string) => {
    await receptionistDashboardService.checkInAppointment(appointmentId);
    const updated = await receptionistDashboardService.getAppointments();
    setAppointments(updated);
  };

  const handleBook = async (formData: any) => {
    await receptionistDashboardService.bookAppointment(formData);
    const updated = await receptionistDashboardService.getAppointments();
    setAppointments(updated);
  };

  const handleViewPatient = (patientId: string) => {
    const record = ALL_PATIENTS.find((p) => p.patientId === patientId);
    if (record) {
      setSelectedPatient(record);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Front Desk Appointments Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Outpatient scheduling, check-in queue management, and physician office routing
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsBookModalOpen(true)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('/receptionist/dashboard' as AppRoute)}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <ReceptionistAppointmentsTable
        appointments={appointments}
        onCheckIn={handleCheckIn}
        onViewPatient={handleViewPatient}
      />

      <QuickBookAppointmentModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onBook={handleBook}
      />

      {selectedPatient && (
        <PatientDetailModal
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
          patient={selectedPatient}
        />
      )}
    </div>
  );
};
