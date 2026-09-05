import React, { useState, useEffect } from 'react';
import type { AppRoute } from '../types';
import type {
  DashboardStats,
  TrendDataPoint,
  DepartmentStat,
  CalendarScheduleItem,
  DoctorScheduleItem,
  RecentPatient,
  UpcomingAppointment,
} from '../types/dashboard';

import {
  dashboardService,
  DEMO_DASHBOARD_STATS,
  DEMO_TRENDS_7D,
  DEMO_DEPARTMENTS,
  DEMO_SCHEDULE_EVENTS,
} from '../services/dashboardService';
import { doctorService, DEMO_DOCTORS_SCHEDULE } from '../services/doctorService';
import { patientService, DEMO_RECENT_PATIENTS } from '../services/patientService';
import { appointmentService, DEMO_UPCOMING_APPOINTMENTS } from '../services/appointmentService';

import { DashboardOverviewBanner } from '../components/dashboard/DashboardOverviewBanner';
import { StatCardsGrid } from '../components/dashboard/StatCardsGrid';
import { TotalTrendsChart } from '../components/dashboard/TotalTrendsChart';
import { PatientsByDepartmentChart } from '../components/dashboard/PatientsByDepartmentChart';
import { CalendarSchedulePanel } from '../components/dashboard/CalendarSchedulePanel';
import { DoctorSchedulePanel } from '../components/dashboard/DoctorSchedulePanel';
import { RecentlyRegisteredPatientsPanel } from '../components/dashboard/RecentlyRegisteredPatientsPanel';
import { UpcomingAppointmentsPanel } from '../components/dashboard/UpcomingAppointmentsPanel';

import { DigitalPatientCardModal } from '../components/dashboard/DigitalPatientCardModal';
import { ScanQrModal } from '../components/dashboard/ScanQrModal';
import { RegisterPatientModal } from '../components/dashboard/RegisterPatientModal';

interface DashboardPageProps {
  onNavigate: (path: AppRoute) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  // Data States
  const [stats, setStats] = useState<DashboardStats>(DEMO_DASHBOARD_STATS);
  const [trendPeriod, setTrendPeriod] = useState<'7d' | '30d'>('7d');
  const [trendData, setTrendData] = useState<TrendDataPoint[]>(DEMO_TRENDS_7D);
  const [departments, setDepartments] = useState<DepartmentStat[]>(DEMO_DEPARTMENTS);
  const [totalDepartmentPatients, setTotalDepartmentPatients] = useState<number>(340);
  const [schedule, setSchedule] = useState<CalendarScheduleItem[]>(DEMO_SCHEDULE_EVENTS.default);
  const [doctors, setDoctors] = useState<DoctorScheduleItem[]>(DEMO_DOCTORS_SCHEDULE);
  const [patients, setPatients] = useState<RecentPatient[]>(DEMO_RECENT_PATIENTS);
  const [appointments, setAppointments] = useState<UpcomingAppointment[]>(DEMO_UPCOMING_APPOINTMENTS);
  const [isLoading, setIsLoading] = useState(false);

  // Modal States
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedPatientForCard, setSelectedPatientForCard] = useState<RecentPatient | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  // Initial Data Fetching via Services Layer
  useEffect(() => {
    let isMounted = true;
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        const [statsData, deptData, docData, patData, apptData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getPatientsByDepartment(),
          doctorService.getDoctorsSchedule(),
          patientService.getRecentlyRegisteredPatients(),
          appointmentService.getUpcomingAppointments(),
        ]);

        if (isMounted) {
          setStats(statsData);
          setDepartments(deptData.departments);
          setTotalDepartmentPatients(deptData.total);
          setDoctors(docData);
          setPatients(patData);
          setAppointments(apptData);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDashboardData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle Trends Period Filter Change
  const handlePeriodChange = async (period: '7d' | '30d') => {
    setTrendPeriod(period);
    try {
      const data = await dashboardService.getTotalTrends(period);
      setTrendData(data);
    } catch (err) {
      console.error('Failed to update trend period:', err);
    }
  };

  // Handle Calendar Date Selection Change
  const handleCalendarDateChange = async (dateStr: string) => {
    try {
      const newSchedule = await dashboardService.getScheduleForDate(dateStr);
      setSchedule(newSchedule);
    } catch (err) {
      console.error('Failed to load schedule for date:', err);
    }
  };

  // Handle "View Card" click
  const handleViewCard = (patient: RecentPatient) => {
    setSelectedPatientForCard(patient);
    setIsCardModalOpen(true);
  };

  // Handle QR Scan result
  const handleSelectScannedPatient = (patient: RecentPatient) => {
    setSelectedPatientForCard(patient);
    setIsCardModalOpen(true);
  };

  // Handle New Patient Registration
  const handleRegisterSuccess = (newPatient: RecentPatient) => {
    setPatients((prev) => [newPatient, ...prev]);
    setStats((prev) => ({
      ...prev,
      totalPatients: prev.totalPatients + 1,
    }));
    // Open card for the newly registered patient
    setSelectedPatientForCard(newPatient);
    setIsCardModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Dashboard Welcome / Overview Area */}
      <DashboardOverviewBanner
        onRegisterPatient={() => setIsRegisterModalOpen(true)}
        onScanQrCard={() => setIsQrScannerOpen(true)}
      />

      {/* 2. Four Statistics Cards (Total Patients, Today's Appointments, Beds, Revenue in ETB) */}
      <StatCardsGrid stats={stats} isLoading={isLoading} />

      {/* 3. Middle Section: Bento Grid containing Total Trends, Patients by Dept, and Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Total Trends Chart (5 columns on lg) */}
        <div className="lg:col-span-5 flex flex-col">
          <TotalTrendsChart
            data={trendData}
            selectedPeriod={trendPeriod}
            onPeriodChange={handlePeriodChange}
          />
        </div>

        {/* Patients by Department Donut Chart (3 columns on lg) */}
        <div className="lg:col-span-3 flex flex-col">
          <PatientsByDepartmentChart
            departments={departments}
            totalPatients={totalDepartmentPatients}
          />
        </div>

        {/* Calendar & Schedule Panel (4 columns on lg) */}
        <div className="lg:col-span-4 flex flex-col">
          <CalendarSchedulePanel
            schedule={schedule}
            onDateChange={handleCalendarDateChange}
          />
        </div>
      </div>

      {/* 4. Doctor's Schedule Panel */}
      <DoctorSchedulePanel doctors={doctors} onNavigate={onNavigate} />

      {/* 5. Bottom Section: Recently Registered Patients & Upcoming Consultations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Recently Registered Patients (6 columns on lg) */}
        <div className="lg:col-span-6 flex flex-col">
          <RecentlyRegisteredPatientsPanel
            patients={patients}
            onViewCard={handleViewCard}
            onNavigate={onNavigate}
          />
        </div>

        {/* Upcoming Consultations & Appointments (6 columns on lg) */}
        <div className="lg:col-span-6 flex flex-col">
          <UpcomingAppointmentsPanel
            appointments={appointments}
            onNavigate={onNavigate}
          />
        </div>
      </div>

      {/* Modals & Dialogs */}
      <DigitalPatientCardModal
        patient={selectedPatientForCard}
        isOpen={isCardModalOpen}
        onClose={() => {
          setIsCardModalOpen(false);
          setSelectedPatientForCard(null);
        }}
      />

      <ScanQrModal
        isOpen={isQrScannerOpen}
        onClose={() => setIsQrScannerOpen(false)}
        patients={patients}
        onSelectPatient={handleSelectScannedPatient}
      />

      <RegisterPatientModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </div>
  );
};
