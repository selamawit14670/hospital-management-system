import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import type { AppRoute } from '../types';
import type {
  DoctorStats,
  DoctorAppointment,
  WaitingPatient,
  PatientDetailedRecord,
  UpcomingAppointment,
  PendingLabResult,
  ClinicalActivity,
} from '../types/doctor';
import {
  doctorDashboardService,
  DOCTOR_STATS,
  TODAY_APPOINTMENTS,
  WAITING_QUEUE,
  ALL_PATIENTS,
  UPCOMING_APPOINTMENTS,
  PENDING_LAB_RESULTS,
  CLINICAL_ACTIVITIES,
} from '../services/doctorDashboardService';

import { DoctorWelcomeBanner } from '../components/doctor/DoctorWelcomeBanner';
import { DoctorStatsCards } from '../components/doctor/DoctorStatsCards';
import { TodayAppointmentsTable } from '../components/doctor/TodayAppointmentsTable';
import { PatientQueueCard } from '../components/doctor/PatientQueueCard';
import { QuickPatientSearchCard } from '../components/doctor/QuickPatientSearchCard';
import { RecentPatientsCard } from '../components/doctor/RecentPatientsCard';
import { UpcomingAppointmentsCard } from '../components/doctor/UpcomingAppointmentsCard';
import { PendingLabResultsCard } from '../components/doctor/PendingLabResultsCard';
import { ClinicalActivityCard } from '../components/doctor/ClinicalActivityCard';
import { PatientDetailModal } from '../components/doctor/PatientDetailModal';

interface DoctorDashboardPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const DoctorDashboardPage: React.FC<DoctorDashboardPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  // State loaded from doctor service
  const [stats, setStats] = useState<DoctorStats>(DOCTOR_STATS);
  const [todayAppointments, setTodayAppointments] = useState<DoctorAppointment[]>(TODAY_APPOINTMENTS);
  const [patientQueue, setPatientQueue] = useState<WaitingPatient[]>(WAITING_QUEUE);
  const [allPatients, setAllPatients] = useState<PatientDetailedRecord[]>(ALL_PATIENTS);
  const [recentPatients, setRecentPatients] = useState<PatientDetailedRecord[]>(ALL_PATIENTS.slice(0, 4));
  const [upcomingAppointments, setUpcomingAppointments] = useState<UpcomingAppointment[]>(UPCOMING_APPOINTMENTS);
  const [pendingLabResults, setPendingLabResults] = useState<PendingLabResult[]>(PENDING_LAB_RESULTS);
  const [clinicalActivities, setClinicalActivities] = useState<ClinicalActivity[]>(CLINICAL_ACTIVITIES);

  // Selected patient for detailed record modal
  const [selectedPatient, setSelectedPatient] = useState<PatientDetailedRecord | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Fetch service data on mount
  useEffect(() => {
    doctorDashboardService.getDoctorStats().then(setStats);
    doctorDashboardService.getTodayAppointments().then(setTodayAppointments);
    doctorDashboardService.getWaitingQueue().then(setPatientQueue);
    doctorDashboardService.getRecentPatients().then(setRecentPatients);
    doctorDashboardService.getUpcomingAppointments().then(setUpcomingAppointments);
    doctorDashboardService.getPendingLabResults().then(setPendingLabResults);
    doctorDashboardService.getClinicalActivities().then(setClinicalActivities);
  }, []);

  // Handle viewing a patient's EHR record
  const handleViewPatientRecord = async (patientId: string) => {
    const patient = await doctorDashboardService.getPatientById(patientId);
    if (patient) {
      setSelectedPatient(patient);
      setIsDetailModalOpen(true);
    } else {
      // Fallback
      onNavigate?.('/doctor/patients' as AppRoute);
    }
  };

  // Handle starting a consultation
  const handleStartConsultation = (appointmentOrPatient: DoctorAppointment | WaitingPatient | string) => {
    let patientId = '';
    if (typeof appointmentOrPatient === 'string') {
      patientId = appointmentOrPatient;
    } else {
      patientId = appointmentOrPatient.patientId;
    }

    // Navigate to new consultation workspace
    onNavigate?.('/doctor/consultations/new' as AppRoute);
  };

  // Smooth scroll down to today's appointments table
  const handleScrollToAppointments = () => {
    const el = document.getElementById('today-appointments-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate?.('/doctor/appointments' as AppRoute);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-7 pb-10">
      {/* 1. Clinical Welcome Banner */}
      <DoctorWelcomeBanner
        doctorName={user?.name || 'Dr. Hana Mengistu'}
        department={user?.hospital || 'General Medicine'}
        todayCount={stats.todayAppointments}
        waitingCount={stats.waitingPatients}
        urgentCount={stats.urgentPatients}
        onViewAppointments={handleScrollToAppointments}
        onNavigate={onNavigate}
      />

      {/* 2. Doctor Statistics Cards */}
      <DoctorStatsCards stats={stats} onNavigate={onNavigate} />

      {/* 3. Main Clinical Layout: Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Primary Clinical Stream (7-8 columns on desktop) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Today's Appointments Table */}
          <TodayAppointmentsTable
            appointments={todayAppointments}
            onStartConsultation={handleStartConsultation}
            onViewPatient={handleViewPatientRecord}
            onNavigate={onNavigate}
          />

          {/* Quick Patient Search Card */}
          <QuickPatientSearchCard
            patients={allPatients}
            onViewRecord={handleViewPatientRecord}
            onNavigate={onNavigate}
          />

          {/* Recent Patients */}
          <RecentPatientsCard
            patients={recentPatients}
            onViewRecord={handleViewPatientRecord}
            onNavigate={onNavigate}
          />
        </div>

        {/* Right Secondary Clinical Stream (4-5 columns on desktop) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Patient Queue Card */}
          <PatientQueueCard
            queue={patientQueue}
            onStartConsultation={handleStartConsultation}
            onViewPatient={handleViewPatientRecord}
            onNavigate={onNavigate}
          />

          {/* Upcoming Appointments Card */}
          <UpcomingAppointmentsCard
            appointments={upcomingAppointments}
            onNavigate={onNavigate}
          />

          {/* Pending Lab Results Card */}
          <PendingLabResultsCard
            labResults={pendingLabResults}
            onReviewLab={(labId) => onNavigate?.('/doctor/lab-results' as AppRoute)}
            onNavigate={onNavigate}
          />

          {/* Recent Clinical Activity Card */}
          <ClinicalActivityCard
            activities={clinicalActivities}
            onViewPatient={handleViewPatientRecord}
            onNavigate={onNavigate}
          />
        </div>
      </div>

      {/* Detailed Patient Record Modal */}
      <PatientDetailModal
        patient={selectedPatient}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onStartConsultation={handleStartConsultation}
        onNavigate={onNavigate}
      />
    </div>
  );
};
