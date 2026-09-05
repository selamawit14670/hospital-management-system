export type ConsultationType = 'Follow-up' | 'Consultation' | 'Checkup' | 'Emergency' | 'Routine';

export type AppointmentClinicalStatus =
  | 'Confirmed'
  | 'Waiting'
  | 'In Consultation'
  | 'Completed'
  | 'Cancelled';

export type TriagePriority = 'Normal' | 'Urgent' | 'Critical';

export interface DoctorStats {
  todayAppointments: number;
  completedAppointments: number;
  waitingPatients: number;
  urgentPatients: number;
  myPatientsTotal: number;
  newPatientsThisMonth: number;
  pendingLabResults: number;
  urgentLabReviews: number;
}

export interface DoctorAppointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  time: string;
  date: string;
  reason: string;
  type: ConsultationType;
  status: AppointmentClinicalStatus;
  room?: string;
}

export interface WaitingPatient {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  appointmentTime: string;
  reason: string;
  waitingMinutes: number;
  priority: TriagePriority;
  vitals?: {
    bp: string;
    hr: string;
    temp: string;
    spo2: string;
  };
}

export interface PatientDetailedRecord {
  patientId: string;
  name: string;
  avatarUrl: string;
  age: number;
  gender: 'Male' | 'Female';
  bloodGroup: string;
  phone: string;
  email: string;
  lastVisit: string;
  primaryDiagnosis: string;
  allergies: string[];
  currentMedications: string[];
  previousDiagnoses: string[];
  previousConsultations: {
    id: string;
    date: string;
    doctorName: string;
    notes: string;
    treatment: string;
  }[];
  prescriptions: {
    id: string;
    date: string;
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    status: 'Active' | 'Completed' | 'Discontinued';
  }[];
  labResults: {
    id: string;
    date: string;
    testName: string;
    resultSummary: string;
    status: 'Normal' | 'Abnormal' | 'Pending Review';
  }[];
}

export interface UpcomingAppointment {
  id: string;
  patientId: string;
  patientName: string;
  time: string;
  date: string;
  type: string;
  status: 'Confirmed' | 'Scheduled';
}

export interface PendingLabResult {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  testName: string;
  collectedTime: string;
  status: 'Pending Review' | 'Critical Review';
  priority: TriagePriority;
  department: string;
}

export interface ClinicalActivity {
  id: string;
  time: string;
  action: 'Consultation completed' | 'Prescription created' | 'Lab result reviewed' | 'Clinical note updated';
  patientName: string;
  patientId: string;
  details?: string;
}
