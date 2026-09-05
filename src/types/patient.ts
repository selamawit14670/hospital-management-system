export interface PatientEmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface PatientInsurance {
  provider: string;
  policyNumber: string;
  status: 'Active' | 'Expiring' | 'Pending';
  coverageType: string;
  copayRate: string;
}

export interface PatientProfileData {
  id: string;
  patientId: string;
  name: string;
  dob: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  phone: string;
  email: string;
  avatarUrl: string;
  address: string;
  city: string;
  emergencyContact: PatientEmergencyContact;
  insurance: PatientInsurance;
  allergies: string[];
  chronicConditions: string[];
  primaryDoctor: {
    name: string;
    title: string;
    department: string;
    room: string;
    avatarUrl: string;
  };
  cardIssueDate: string;
  cardExpiryDate: string;
  rfidChipId: string;
}

export interface PatientQuickStats {
  upcomingAppointments: number;
  activePrescriptions: number;
  labResults: number;
  medicalRecords: number;
  nextAppointmentSummary: string;
  activePrescriptionNote: string;
  latestLabSummary: string;
  lastRecordSummary: string;
}

export interface PatientUpcomingAppointment {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  department: string;
  date: string;
  time: string;
  location: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  reason: string;
  type: 'In-Person Consultation' | 'Telehealth' | 'Follow-up' | 'Procedure';
  feeEtb: number;
  preparationNotes: string;
}

export interface PatientMedicalRecord {
  id: string;
  title: string;
  recordType: 'Consultation Note' | 'Discharge Summary' | 'Diagnostic Report' | 'Immunization' | 'Health Checkup';
  doctorName: string;
  department: string;
  date: string;
  primaryDiagnosis: string;
  summary: string;
  vitals?: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    weight: string;
    spo2?: string;
  };
  treatmentPlan: string;
}

export interface PatientPrescription {
  id: string;
  medicationName: string;
  genericName: string;
  dosage: string;
  frequency: string;
  instructions: string;
  doctorName: string;
  prescribedDate: string;
  duration: string;
  refillsRemaining: number;
  status: 'Active' | 'Refill Due' | 'Completed';
  costEtb: number;
  purpose: string;
}

export interface LabResultParameter {
  parameter: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'elevated' | 'low';
}

export interface PatientLabResult {
  id: string;
  testName: string;
  category: string;
  date: string;
  orderedBy: string;
  status: 'Normal' | 'Pending Review' | 'Completed' | 'Attention Required';
  summary: string;
  specimen: string;
  laboratory: string;
  turnaroundTime: string;
  parameters: LabResultParameter[];
}

export interface BookAppointmentPayload {
  doctorName: string;
  department: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: 'In-Person Consultation' | 'Telehealth';
  reason: string;
}
