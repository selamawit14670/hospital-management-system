import type { TriagePriority } from './doctor';

export type VitalStatus = 'Normal' | 'Warning' | 'Critical';

export interface NurseVitalRecord {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  roomBed: string;
  bp: string; // e.g. "120/80"
  hr: number; // bpm
  temp: number; // Celsius, e.g. 37.1
  spo2: number; // percentage, e.g. 98
  rr: number; // breaths/min, e.g. 16
  status: VitalStatus;
  recordedAt: string;
  notes?: string;
}

export interface NurseQueuePatient {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  age: number;
  gender: string;
  roomBed: string;
  doctorName: string;
  condition: string;
  priority: TriagePriority;
  status: 'Waiting' | 'Bed Assigned' | 'Vitals Due' | 'In Care' | 'Observation';
  admissionTime: string;
  allergies?: string[];
  vitalsSummary?: {
    bp: string;
    hr: number;
    temp: number;
    spo2: number;
  };
}

export type NursingTaskType =
  | 'Check Vital Signs'
  | 'Administer Medication'
  | 'Prepare Patient'
  | 'Update Nursing Notes'
  | 'Wound Dressing'
  | 'IV Cannulation';

export interface NursingTask {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  roomBed: string;
  title: string;
  type: NursingTaskType;
  dueTime: string;
  priority: 'Normal' | 'Urgent' | 'High Priority';
  completed: boolean;
  notes?: string;
}

export interface AdmissionRecord {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  age: number;
  gender: string;
  room: string;
  bed: string;
  admissionTime: string;
  assignedDoctor: string;
  status: 'Admitted' | 'In Triage' | 'Discharge Pending' | 'ICU Transfer';
  diagnosis: string;
}

export interface NursingActivity {
  id: string;
  action: string;
  patientName: string;
  patientId: string;
  roomBed: string;
  time: string;
  type: 'Vitals' | 'Medication' | 'Care' | 'Admission' | 'Note';
  details: string;
}

export interface NurseStats {
  assignedPatients: number;
  patientsWaiting: number;
  admissionsToday: number;
  tasksPending: number;
  criticalAlerts: number;
  vitalsCompleted: number;
}
