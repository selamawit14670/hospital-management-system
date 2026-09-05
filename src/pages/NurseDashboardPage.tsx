import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import type { AppRoute } from '../types';
import type {
  NurseStats,
  NurseQueuePatient,
  NurseVitalRecord,
  NursingTask,
  AdmissionRecord,
  NursingActivity,
} from '../types/nurse';
import {
  nurseDashboardService,
  NURSE_STATS,
  NURSE_PATIENT_QUEUE,
  RECENT_VITALS,
  NURSING_TASKS,
  RECENT_ADMISSIONS,
  RECENT_NURSING_ACTIVITIES,
} from '../services/nurseDashboardService';
import { ALL_PATIENTS } from '../services/doctorDashboardService';
import type { PatientDetailedRecord } from '../types/doctor';

import { NurseWelcomeBanner } from '../components/nurse/NurseWelcomeBanner';
import { NurseStatsCards } from '../components/nurse/NurseStatsCards';
import { NursePatientQueueTable } from '../components/nurse/NursePatientQueueTable';
import { VitalSignsMonitorCard } from '../components/nurse/VitalSignsMonitorCard';
import { NursingTasksCard } from '../components/nurse/NursingTasksCard';
import { RecentAdmissionsCard } from '../components/nurse/RecentAdmissionsCard';
import { RecentNursingActivityCard } from '../components/nurse/RecentNursingActivityCard';
import { RecordVitalsModal } from '../components/nurse/RecordVitalsModal';
import { PatientDetailModal } from '../components/doctor/PatientDetailModal';

interface NurseDashboardPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const NurseDashboardPage: React.FC<NurseDashboardPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  // State loaded from nurse dashboard service
  const [stats, setStats] = useState<NurseStats>(NURSE_STATS);
  const [queue, setQueue] = useState<NurseQueuePatient[]>(NURSE_PATIENT_QUEUE);
  const [vitals, setVitals] = useState<NurseVitalRecord[]>(RECENT_VITALS);
  const [tasks, setTasks] = useState<NursingTask[]>(NURSING_TASKS);
  const [admissions, setAdmissions] = useState<AdmissionRecord[]>(RECENT_ADMISSIONS);
  const [activities, setActivities] = useState<NursingActivity[]>(RECENT_NURSING_ACTIVITIES);

  // Modals state
  const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false);
  const [vitalsPatient, setVitalsPatient] = useState<NurseQueuePatient | null>(null);

  const [selectedPatientRecord, setSelectedPatientRecord] = useState<PatientDetailedRecord | null>(null);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);

  useEffect(() => {
    nurseDashboardService.getNurseStats().then(setStats);
    nurseDashboardService.getPatientQueue().then(setQueue);
    nurseDashboardService.getRecentVitals().then(setVitals);
    nurseDashboardService.getNursingTasks().then(setTasks);
    nurseDashboardService.getRecentAdmissions().then(setAdmissions);
    nurseDashboardService.getRecentActivities().then(setActivities);
  }, []);

  // Action: Open Record Vitals Modal
  const handleOpenRecordVitals = (patient?: NurseQueuePatient) => {
    setVitalsPatient(patient || queue[0] || null);
    setIsVitalsModalOpen(true);
  };

  // Action: Save Vitals
  const handleSaveVitals = (newVital: Partial<NurseVitalRecord>) => {
    const fullRecord: NurseVitalRecord = {
      id: `vit-${Date.now()}`,
      patientId: newVital.patientId || 'MC-000001',
      patientName: newVital.patientName || 'Patient',
      patientAvatar: newVital.patientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      roomBed: newVital.roomBed || 'Room 204 • Bed A',
      bp: newVital.bp || '120/80',
      hr: newVital.hr || 72,
      temp: newVital.temp || 36.8,
      spo2: newVital.spo2 || 98,
      rr: newVital.rr || 16,
      status: newVital.status || 'Normal',
      recordedAt: 'Just now',
      notes: newVital.notes,
    };

    setVitals((prev) => [fullRecord, ...prev]);

    // Update patient in queue if present
    setQueue((prev) =>
      prev.map((p) =>
        p.patientId === fullRecord.patientId
          ? {
              ...p,
              status: 'In Care',
              vitalsSummary: {
                bp: fullRecord.bp,
                hr: fullRecord.hr,
                temp: fullRecord.temp,
                spo2: fullRecord.spo2,
              },
            }
          : p
      )
    );

    // Add to activity log
    const newActivity: NursingActivity = {
      id: `act-${Date.now()}`,
      action: `Vital Signs Recorded (${fullRecord.bp}, ${fullRecord.spo2}% SpO2)`,
      patientName: fullRecord.patientName,
      patientId: fullRecord.patientId,
      roomBed: fullRecord.roomBed,
      time: 'Just now',
      type: 'Vitals',
      details: fullRecord.notes || `Assessed as ${fullRecord.status}. Hemodynamics charted in MAR.`,
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  // Action: View Patient Record
  const handleViewPatient = (patientId: string) => {
    const found = ALL_PATIENTS.find((p) => p.patientId === patientId) || ALL_PATIENTS[0];
    setSelectedPatientRecord(found);
    setIsPatientModalOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-7 pb-10">
      {/* 1. Nurse Clinical Welcome Banner */}
      <NurseWelcomeBanner
        nurseName={user?.name || 'Sister Almaz'}
        wardName={user?.hospital || 'Inpatient Care & Trauma Ward'}
        assignedCount={stats.assignedPatients}
        waitingCount={stats.patientsWaiting}
        criticalCount={stats.criticalAlerts}
        onRecordVitalsClick={() => handleOpenRecordVitals()}
        onNavigate={onNavigate}
      />

      {/* 2. Nurse Statistics Cards */}
      <NurseStatsCards stats={stats} onNavigate={onNavigate} />

      {/* 3. Main Nurse Clinical Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Primary Care Stream (7-8 columns on desktop) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Today's Patient Queue */}
          <NursePatientQueueTable
            patients={queue}
            onViewPatient={handleViewPatient}
            onRecordVitals={handleOpenRecordVitals}
            onNavigate={onNavigate}
          />

          {/* Vital Signs Monitor Card */}
          <VitalSignsMonitorCard
            vitals={vitals}
            onLogVitalsClick={() => handleOpenRecordVitals()}
            onViewPatient={handleViewPatient}
            onNavigate={onNavigate}
          />

          {/* Recent Admissions Card */}
          <RecentAdmissionsCard
            admissions={admissions}
            onViewPatient={handleViewPatient}
            onNavigate={onNavigate}
          />
        </div>

        {/* Right Secondary Care Stream (4-5 columns on desktop) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Nursing Tasks Card */}
          <NursingTasksCard
            tasks={tasks}
            onNavigate={onNavigate}
          />

          {/* Recent Nursing Activity Card */}
          <RecentNursingActivityCard
            activities={activities}
            onViewPatient={handleViewPatient}
            onNavigate={onNavigate}
          />
        </div>
      </div>

      {/* Record Vitals Modal */}
      <RecordVitalsModal
        isOpen={isVitalsModalOpen}
        onClose={() => setIsVitalsModalOpen(false)}
        selectedPatient={vitalsPatient}
        patientsList={queue}
        onSaveVitals={handleSaveVitals}
      />

      {/* Patient Detail Modal */}
      <PatientDetailModal
        patient={selectedPatientRecord}
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
};
