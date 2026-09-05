import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import type { AppRoute } from '../types';
import type {
  PatientProfileData,
  PatientQuickStats,
  PatientUpcomingAppointment,
  PatientMedicalRecord,
  PatientPrescription,
  PatientLabResult,
  BookAppointmentPayload,
} from '../types/patient';
import {
  patientDashboardService,
  CURRENT_PATIENT_PROFILE,
  PATIENT_QUICK_STATS,
  INITIAL_UPCOMING_APPOINTMENTS,
  INITIAL_MEDICAL_RECORDS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_LAB_RESULTS,
} from '../services/patientDashboardService';

import { PatientWelcomeBanner } from '../components/patient/PatientWelcomeBanner';
import { PatientQuickStatsCards } from '../components/patient/PatientQuickStatsCards';
import { PatientDigitalCardPreview } from '../components/patient/PatientDigitalCardPreview';
import { PatientUpcomingAppointmentCard } from '../components/patient/PatientUpcomingAppointmentCard';
import { PatientQuickActions } from '../components/patient/PatientQuickActions';
import { PatientRecentMedicalRecords } from '../components/patient/PatientRecentMedicalRecords';
import { PatientRecentPrescriptions } from '../components/patient/PatientRecentPrescriptions';
import { PatientRecentLabResults } from '../components/patient/PatientRecentLabResults';

import { PatientFullCardModal } from '../components/patient/PatientFullCardModal';
import { PatientAppointmentDetailModal } from '../components/patient/PatientAppointmentDetailModal';
import { PatientBookAppointmentModal } from '../components/patient/PatientBookAppointmentModal';
import { PatientMedicalRecordModal } from '../components/patient/PatientMedicalRecordModal';
import { PatientLabResultModal } from '../components/patient/PatientLabResultModal';

interface PatientDashboardPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const PatientDashboardPage: React.FC<PatientDashboardPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  // Primary Patient State
  const [profile, setProfile] = useState<PatientProfileData>(CURRENT_PATIENT_PROFILE);
  const [stats, setStats] = useState<PatientQuickStats>(PATIENT_QUICK_STATS);
  const [upcomingAppointments, setUpcomingAppointments] = useState<PatientUpcomingAppointment[]>(INITIAL_UPCOMING_APPOINTMENTS);
  const [medicalRecords, setMedicalRecords] = useState<PatientMedicalRecord[]>(INITIAL_MEDICAL_RECORDS);
  const [prescriptions, setPrescriptions] = useState<PatientPrescription[]>(INITIAL_PRESCRIPTIONS);
  const [labResults, setLabResults] = useState<PatientLabResult[]>(INITIAL_LAB_RESULTS);

  // Modals state
  const [isFullCardModalOpen, setIsFullCardModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState<PatientUpcomingAppointment | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState<PatientMedicalRecord | null>(null);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  const [selectedLabResult, setSelectedLabResult] = useState<PatientLabResult | null>(null);
  const [isLabModalOpen, setIsLabModalOpen] = useState(false);

  // Toast / notification banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync profile name from auth context if available
  useEffect(() => {
    if (user?.name && user.role === 'Patient') {
      setProfile((prev) => ({
        ...prev,
        name: user.name,
      }));
    }
  }, [user]);

  // Load from service
  useEffect(() => {
    patientDashboardService.getProfile().then(setProfile);
    patientDashboardService.getStats().then(setStats);
    patientDashboardService.getUpcomingAppointments().then(setUpcomingAppointments);
    patientDashboardService.getMedicalRecords().then(setMedicalRecords);
    patientDashboardService.getPrescriptions().then(setPrescriptions);
    patientDashboardService.getLabResults().then(setLabResults);
  }, []);

  // Handlers
  const handleViewAppointmentDetails = (apt: PatientUpcomingAppointment) => {
    setSelectedAppointment(apt);
    setIsAppointmentModalOpen(true);
  };

  const handleViewRecord = (rec: PatientMedicalRecord) => {
    setSelectedRecord(rec);
    setIsRecordModalOpen(true);
  };

  const handleViewLabReport = (lab: PatientLabResult) => {
    setSelectedLabResult(lab);
    setIsLabModalOpen(true);
  };

  const handleRequestRefill = async (prescription: PatientPrescription) => {
    const res = await patientDashboardService.requestPrescriptionRefill(prescription.id);
    setToastMessage(`Refill requested for ${prescription.medicationName}. MediCare pharmacy notified.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleBookSuccess = async (payload: BookAppointmentPayload) => {
    const res = await patientDashboardService.bookAppointment(payload);
    if (res.success) {
      setUpcomingAppointments((prev) => [res.appointment, ...prev]);
      setStats((prev) => ({
        ...prev,
        upcomingAppointments: prev.upcomingAppointments + 1,
        nextAppointmentSummary: `${res.appointment.date} at ${res.appointment.time} with ${res.appointment.doctorName}`,
      }));
      setToastMessage(`Appointment confirmed with ${payload.doctorName} for ${payload.appointmentDate}.`);
      setTimeout(() => setToastMessage(null), 5000);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Primary upcoming appointment is the earliest confirmed one
  const nextAppointment = upcomingAppointments[0] || null;

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 min-w-0 max-w-full overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-blue-600 text-white shadow-lg text-xs sm:text-sm font-semibold flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-200">
          <span>✓ {toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-white/80 hover:text-white ml-3 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. Welcome Banner */}
      <PatientWelcomeBanner
        profile={profile}
        onBookAppointment={() => setIsBookModalOpen(true)}
        onViewCard={() => setIsFullCardModalOpen(true)}
      />

      {/* 2. Quick Stats Cards */}
      <PatientQuickStatsCards
        stats={stats}
        onNavigateSection={scrollToSection}
      />

      {/* 3. Main Split Grid: Upcoming Appointment Card + Digital Patient Card Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-w-0">
        {/* Left: Upcoming Appointment (7 cols on lg) */}
        <div className="lg:col-span-7 min-w-0 flex flex-col">
          <PatientUpcomingAppointmentCard
            appointment={nextAppointment}
            onViewDetails={handleViewAppointmentDetails}
            onBookNew={() => setIsBookModalOpen(true)}
          />
        </div>

        {/* Right: Digital Patient Card Preview (5 cols on lg) */}
        <div className="lg:col-span-5 min-w-0 flex flex-col">
          <PatientDigitalCardPreview
            profile={profile}
            onViewFullCard={() => setIsFullCardModalOpen(true)}
          />
        </div>
      </div>

      {/* 4. Quick Actions */}
      <PatientQuickActions
        onBookAppointment={() => setIsBookModalOpen(true)}
        onViewDigitalCard={() => setIsFullCardModalOpen(true)}
        onViewMedicalRecords={() => {
          if (medicalRecords.length > 0) {
            handleViewRecord(medicalRecords[0]);
          } else {
            scrollToSection('medical-records-section');
          }
        }}
        onViewPrescriptions={() => scrollToSection('prescriptions-section')}
      />

      {/* 5. Medical Records & Active Prescriptions (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        {/* Recent Medical Records */}
        <div className="min-w-0">
          <PatientRecentMedicalRecords
            records={medicalRecords}
            onViewRecord={handleViewRecord}
            onViewAll={() => {
              if (onNavigate) {
                onNavigate('/patient/medical-records');
              } else {
                scrollToSection('medical-records-section');
              }
            }}
          />
        </div>

        {/* Recent Prescriptions */}
        <div className="min-w-0">
          <PatientRecentPrescriptions
            prescriptions={prescriptions}
            onRequestRefill={handleRequestRefill}
            onViewAll={() => {
              if (onNavigate) {
                onNavigate('/patient/prescriptions');
              } else {
                scrollToSection('prescriptions-section');
              }
            }}
          />
        </div>
      </div>

      {/* 6. Recent Lab Results */}
      <div className="min-w-0">
        <PatientRecentLabResults
          labResults={labResults}
          onViewReport={handleViewLabReport}
          onViewAll={() => {
            if (onNavigate) {
              onNavigate('/patient/lab-results');
            } else {
              scrollToSection('lab-results-section');
            }
          }}
        />
      </div>

      {/* Modals */}
      <PatientFullCardModal
        isOpen={isFullCardModalOpen}
        onClose={() => setIsFullCardModalOpen(false)}
        profile={profile}
      />

      <PatientAppointmentDetailModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        appointment={selectedAppointment}
        onReschedule={() => {
          setTimeout(() => setIsAppointmentModalOpen(false), 800);
          setIsBookModalOpen(true);
        }}
      />

      <PatientBookAppointmentModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onBookSuccess={handleBookSuccess}
      />

      <PatientMedicalRecordModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        record={selectedRecord}
      />

      <PatientLabResultModal
        isOpen={isLabModalOpen}
        onClose={() => setIsLabModalOpen(false)}
        result={selectedLabResult}
      />
    </div>
  );
};
