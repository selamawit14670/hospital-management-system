import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import type { AppRoute } from '../types';
import type {
  ReceptionistStats,
  ReceptionistAppointment,
  WaitingPatient,
  RecentlyRegisteredPatient,
  PendingPayment,
  QuickPatientFormData,
  QuickAppointmentFormData,
} from '../types/receptionist';
import {
  receptionistDashboardService,
  RECEPTIONIST_STATS,
  TODAY_APPOINTMENTS_DATA,
  WAITING_PATIENTS_DATA,
  RECENTLY_REGISTERED_DATA,
  PENDING_PAYMENTS_DATA,
} from '../services/receptionistDashboardService';
import { ALL_PATIENTS } from '../services/doctorDashboardService';
import type { PatientDetailedRecord } from '../types/doctor';

import { ReceptionistWelcomeBanner } from '../components/receptionist/ReceptionistWelcomeBanner';
import { ReceptionistStatsCards } from '../components/receptionist/ReceptionistStatsCards';
import { ReceptionistQuickActions } from '../components/receptionist/ReceptionistQuickActions';
import { ReceptionistAppointmentsTable } from '../components/receptionist/ReceptionistAppointmentsTable';
import { ReceptionistWaitingPatientsCard } from '../components/receptionist/ReceptionistWaitingPatientsCard';
import { ReceptionistRecentPatientsTable } from '../components/receptionist/ReceptionistRecentPatientsTable';
import { ReceptionistPendingPaymentsCard } from '../components/receptionist/ReceptionistPendingPaymentsCard';

import { QuickRegisterModal } from '../components/receptionist/QuickRegisterModal';
import { QuickBookAppointmentModal } from '../components/receptionist/QuickBookAppointmentModal';
import { FindPatientModal } from '../components/receptionist/FindPatientModal';
import { PatientCardModal } from '../components/receptionist/PatientCardModal';
import { CollectPaymentModal } from '../components/receptionist/CollectPaymentModal';
import { PatientDetailModal } from '../components/doctor/PatientDetailModal';

interface ReceptionistDashboardPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const ReceptionistDashboardPage: React.FC<ReceptionistDashboardPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  // Primary state loaded from receptionist service
  const [stats, setStats] = useState<ReceptionistStats>(RECEPTIONIST_STATS);
  const [appointments, setAppointments] = useState<ReceptionistAppointment[]>(TODAY_APPOINTMENTS_DATA);
  const [waitingPatients, setWaitingPatients] = useState<WaitingPatient[]>(WAITING_PATIENTS_DATA);
  const [recentPatients, setRecentPatients] = useState<RecentlyRegisteredPatient[]>(RECENTLY_REGISTERED_DATA);
  const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>(PENDING_PAYMENTS_DATA);

  // Modals state
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isFindModalOpen, setIsFindModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [activeCardPatientId, setActiveCardPatientId] = useState<string | undefined>(undefined);

  const [selectedPaymentToCollect, setSelectedPaymentToCollect] = useState<PendingPayment | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [selectedPatientRecord, setSelectedPatientRecord] = useState<PatientDetailedRecord | null>(null);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);

  // Load state on mount
  useEffect(() => {
    receptionistDashboardService.getStats().then(setStats);
    receptionistDashboardService.getAppointments().then(setAppointments);
    receptionistDashboardService.getWaitingPatients().then(setWaitingPatients);
    receptionistDashboardService.getRecentPatients().then(setRecentPatients);
    receptionistDashboardService.getPendingPayments().then(setPendingPayments);
  }, []);

  // Action: Check In appointment
  const handleCheckInAppointment = async (appointmentId: string) => {
    const res = await receptionistDashboardService.checkInAppointment(appointmentId);
    if (res.success) {
      const [updatedApts, updatedWaiting, updatedStats] = await Promise.all([
        receptionistDashboardService.getAppointments(),
        receptionistDashboardService.getWaitingPatients(),
        receptionistDashboardService.getStats(),
      ]);
      setAppointments(updatedApts);
      setWaitingPatients(updatedWaiting);
      setStats(updatedStats);
    }
  };

  // Action: Update waiting status (Call to room, send to vitals, etc.)
  const handleUpdateWaitingStatus = async (patientId: string, newStatus: WaitingPatient['status']) => {
    await receptionistDashboardService.updateWaitingStatus(patientId, newStatus);
    const updated = await receptionistDashboardService.getWaitingPatients();
    setWaitingPatients(updated);
  };

  // Action: Open View Patient Detail modal
  const handleViewPatient = (patientId: string) => {
    const record = ALL_PATIENTS.find((p) => p.patientId === patientId);
    if (record) {
      setSelectedPatientRecord(record);
      setIsPatientModalOpen(true);
    } else {
      // Create lightweight fallback record if newly registered
      const recent = recentPatients.find((r) => r.patientId === patientId);
      if (recent) {
        const fallback: PatientDetailedRecord = {
          patientId: recent.patientId,
          name: recent.name,
          age: recent.age,
          gender: recent.gender,
          bloodGroup: recent.bloodGroup || 'O+',
          phone: recent.phone,
          email: `${recent.name.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
          lastVisit: 'Today',
          primaryDiagnosis: recent.department || 'Outpatient Registration',
          avatarUrl: recent.avatarUrl,
          allergies: ['No known drug allergies recorded'],
          currentMedications: [],
          previousDiagnoses: [],
          previousConsultations: [],
          prescriptions: [],
          labResults: [],
        };
        setSelectedPatientRecord(fallback);
        setIsPatientModalOpen(true);
      }
    }
  };

  // Action: Open Collect Payment modal
  const handleOpenCollectPayment = (payment: PendingPayment) => {
    setSelectedPaymentToCollect(payment);
    setIsPaymentModalOpen(true);
  };

  // Action: Confirm Payment Collection
  const handleConfirmCollect = async (paymentId: string) => {
    await receptionistDashboardService.collectPayment(paymentId);
    const [updatedPayments, updatedStats] = await Promise.all([
      receptionistDashboardService.getPendingPayments(),
      receptionistDashboardService.getStats(),
    ]);
    setPendingPayments(updatedPayments);
    setStats(updatedStats);
  };

  // Action: Quick Register Patient
  const handleQuickRegister = async (formData: QuickPatientFormData) => {
    await receptionistDashboardService.registerPatient(formData);
    const [updatedRecent, updatedPayments, updatedStats] = await Promise.all([
      receptionistDashboardService.getRecentPatients(),
      receptionistDashboardService.getPendingPayments(),
      receptionistDashboardService.getStats(),
    ]);
    setRecentPatients(updatedRecent);
    setPendingPayments(updatedPayments);
    setStats(updatedStats);
  };

  // Action: Quick Book Appointment
  const handleQuickBook = async (formData: QuickAppointmentFormData) => {
    await receptionistDashboardService.bookAppointment(formData);
    const [updatedApts, updatedStats] = await Promise.all([
      receptionistDashboardService.getAppointments(),
      receptionistDashboardService.getStats(),
    ]);
    setAppointments(updatedApts);
    setStats(updatedStats);
  };

  // Action: Open Patient Card
  const handleOpenCard = (patientId?: string) => {
    setActiveCardPatientId(patientId);
    setIsCardModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* 1. Welcome Banner */}
      <ReceptionistWelcomeBanner
        name={user?.name || 'Selamawit'}
        stats={stats}
      />

      {/* 2. Statistics Cards */}
      <ReceptionistStatsCards
        stats={stats}
        onFilterAppointments={() => {
          const el = document.getElementById('section-appointments');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onFilterWaiting={() => {
          const el = document.getElementById('section-waiting');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onFilterPayments={() => {
          const el = document.getElementById('section-payments');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Quick Actions */}
      <ReceptionistQuickActions
        onRegisterPatient={() => setIsRegisterModalOpen(true)}
        onBookAppointment={() => setIsBookModalOpen(true)}
        onFindPatient={() => setIsFindModalOpen(true)}
        onPatientCard={() => handleOpenCard()}
      />

      {/* 4. Today's Appointments */}
      <div id="section-appointments">
        <ReceptionistAppointmentsTable
          appointments={appointments}
          onCheckIn={handleCheckInAppointment}
          onViewPatient={handleViewPatient}
        />
      </div>

      {/* Two Column Grid: Waiting Patients & Pending Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* 5. Waiting Patients */}
        <div id="section-waiting">
          <ReceptionistWaitingPatientsCard
            waitingPatients={waitingPatients}
            onUpdateStatus={handleUpdateWaitingStatus}
            onViewPatient={handleViewPatient}
          />
        </div>

        {/* 7. Pending Payments */}
        <div id="section-payments">
          <ReceptionistPendingPaymentsCard
            payments={pendingPayments}
            onCollectPayment={handleOpenCollectPayment}
            onPrintReceipt={(pay) => {
              handleOpenCollectPayment(pay);
            }}
          />
        </div>
      </div>

      {/* 6. Recently Registered Patients */}
      <div id="section-recent-patients">
        <ReceptionistRecentPatientsTable
          patients={recentPatients}
          onViewPatient={handleViewPatient}
          onRegisterNew={() => setIsRegisterModalOpen(true)}
        />
      </div>

      {/* Modals */}
      <QuickRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleQuickRegister}
      />

      <QuickBookAppointmentModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onBook={handleQuickBook}
      />

      <FindPatientModal
        isOpen={isFindModalOpen}
        onClose={() => setIsFindModalOpen(false)}
        onSelectPatient={handleViewPatient}
        onViewCard={(pId) => handleOpenCard(pId)}
      />

      <PatientCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        patientId={activeCardPatientId}
      />

      <CollectPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => {
          setIsPaymentModalOpen(false);
          setSelectedPaymentToCollect(null);
        }}
        payment={selectedPaymentToCollect}
        onConfirmCollect={handleConfirmCollect}
      />

      {selectedPatientRecord && (
        <PatientDetailModal
          isOpen={isPatientModalOpen}
          onClose={() => {
            setIsPatientModalOpen(false);
            setSelectedPatientRecord(null);
          }}
          patient={selectedPatientRecord}
          onStartConsultation={(pId) => {
            setIsPatientModalOpen(false);
            handleOpenCard(pId);
          }}
        />
      )}
    </div>
  );
};
