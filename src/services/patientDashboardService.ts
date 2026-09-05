import type {
  PatientProfileData,
  PatientQuickStats,
  PatientUpcomingAppointment,
  PatientMedicalRecord,
  PatientPrescription,
  PatientLabResult,
  BookAppointmentPayload,
} from '../types/patient';

export const CURRENT_PATIENT_PROFILE: PatientProfileData = {
  id: 'usr_pat_05',
  patientId: 'MC-000001',
  name: 'Abebe Kebede',
  dob: '1988-05-14',
  age: 38,
  gender: 'Male',
  bloodGroup: 'O+',
  phone: '+251 911 234 567',
  email: 'patient@medicare.com',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
  address: 'Bole Subcity, Woreda 03, House #412',
  city: 'Addis Ababa, Ethiopia',
  emergencyContact: {
    name: 'Almaz Kebede',
    relationship: 'Spouse',
    phone: '+251 919 876 543',
  },
  insurance: {
    provider: 'Ethiopian National Health Insurance (CBHI / MedSave)',
    policyNumber: 'ETH-MED-84920',
    status: 'Active',
    coverageType: 'Comprehensive Outpatient & Pharmacy Tier A',
    copayRate: '10% Copay',
  },
  allergies: ['Penicillin', 'Sulfa drugs (Mild rash)'],
  chronicConditions: ['Stage 1 Essential Hypertension (Controlled)', 'Mild Hyperlipidemia'],
  primaryDoctor: {
    name: 'Dr. Hana Mengistu',
    title: 'Senior Attending Physician & Cardiologist',
    department: 'Cardiology & General Internal Medicine',
    room: 'Consultation Suite 304, Block B',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&auto=format&fit=crop&q=80',
  },
  cardIssueDate: 'Jan 10, 2025',
  cardExpiryDate: 'Jan 10, 2028',
  rfidChipId: 'NFC-ETH-84920-X',
};

export const PATIENT_QUICK_STATS: PatientQuickStats = {
  upcomingAppointments: 1,
  activePrescriptions: 3,
  labResults: 4,
  medicalRecords: 6,
  nextAppointmentSummary: 'Tomorrow at 09:30 AM with Dr. Hana Mengistu',
  activePrescriptionNote: '2 daily medications + 1 active supplement',
  latestLabSummary: 'Complete Blood Count (CBC) available',
  lastRecordSummary: 'Cardiology consultation review on Feb 15, 2026',
};

export const INITIAL_UPCOMING_APPOINTMENTS: PatientUpcomingAppointment[] = [
  {
    id: 'pat-apt-101',
    doctorName: 'Dr. Hana Mengistu',
    doctorSpecialty: 'Cardiologist & Internal Medicine Specialist',
    doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&auto=format&fit=crop&q=80',
    department: 'Cardiology & Internal Medicine',
    date: 'Tomorrow, Sep 06, 2026',
    time: '09:30 AM - 10:00 AM',
    location: 'Consultation Suite 304, Level 3 (Block B)',
    status: 'Confirmed',
    reason: 'Hypertension 6-Month Review & Blood Pressure Calibration',
    type: 'In-Person Consultation',
    feeEtb: 450,
    preparationNotes: 'Please bring your home BP log for the past 14 days. No fasting required.',
  },
  {
    id: 'pat-apt-102',
    doctorName: 'Dr. Brook Tesfaye',
    doctorSpecialty: 'Clinical Pathologist',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&auto=format&fit=crop&q=80',
    department: 'Diagnostic Pathology & Lab',
    date: 'Sep 18, 2026',
    time: '08:00 AM - 08:30 AM',
    location: 'Central Phlebotomy Lab #2, Ground Floor',
    status: 'Pending',
    reason: 'Routine Fasting Blood Sugar & Serum Electrolytes',
    type: 'Procedure',
    feeEtb: 320,
    preparationNotes: 'Requires 10-12 hours overnight fasting before arrival. You may drink plain water.',
  },
];

export const INITIAL_MEDICAL_RECORDS: PatientMedicalRecord[] = [
  {
    id: 'rec-001',
    title: 'Cardiology & Hypertension Review',
    recordType: 'Consultation Note',
    doctorName: 'Dr. Hana Mengistu',
    department: 'Cardiology',
    date: 'Feb 15, 2026',
    primaryDiagnosis: 'Stage 1 Essential Hypertension - Good Response to Therapy',
    summary: 'Patient reports no dizziness or headaches. Home BP logs indicate average of 124/80 mmHg. Resting ECG demonstrates normal sinus rhythm with no ST changes.',
    vitals: {
      bloodPressure: '126/82 mmHg',
      heartRate: '72 bpm',
      temperature: '36.7°C',
      weight: '76.4 kg',
      spo2: '99%',
    },
    treatmentPlan: 'Maintain current regimen of Lisinopril 10mg and Amlodipine 5mg. Continue 30 min daily brisk walking. Follow up in 6 months.',
  },
  {
    id: 'rec-002',
    title: 'Annual Comprehensive Health Screening',
    recordType: 'Health Checkup',
    doctorName: 'Dr. Hana Mengistu',
    department: 'General Internal Medicine',
    date: 'Nov 20, 2025',
    primaryDiagnosis: 'Mild Hyperlipidemia & Borderline BP Elevation',
    summary: 'Comprehensive annual physical completed. Heart and lungs clear. Abdomen soft, non-tender. Mild elevation in LDL cholesterol noted.',
    vitals: {
      bloodPressure: '136/88 mmHg',
      heartRate: '78 bpm',
      temperature: '36.8°C',
      weight: '77.8 kg',
      spo2: '98%',
    },
    treatmentPlan: 'Initiate dietary modifications (low sodium, Mediterranean style). Add Lisinopril 10mg daily. Recheck lipids in 3 months.',
  },
  {
    id: 'rec-003',
    title: 'Diagnostic 12-Lead Electrocardiogram (ECG)',
    recordType: 'Diagnostic Report',
    doctorName: 'Dr. Michael Chen',
    department: 'Cardiac Electrophysiology',
    date: 'Nov 20, 2025',
    primaryDiagnosis: 'Normal Sinus Rhythm at 74 bpm',
    summary: 'Axis normal. PR interval 160ms, QRS duration 88ms, QTc 415ms. No signs of left ventricular hypertrophy or ischemic repolarization changes.',
    treatmentPlan: 'Baseline ECG archived in MediCare EHR.',
  },
  {
    id: 'rec-004',
    title: 'Tetanus & Hepatitis B Booster Vaccination',
    recordType: 'Immunization',
    doctorName: 'Sister Almaz',
    department: 'Preventive Health Clinic',
    date: 'Jun 12, 2025',
    primaryDiagnosis: 'Routine Immunization Booster Completed',
    summary: 'Administered 0.5mL Tdap intramuscular in left deltoid. Observed for 15 minutes post-injection with zero adverse reaction.',
    treatmentPlan: 'Next booster due in 2035.',
  },
];

export const INITIAL_PRESCRIPTIONS: PatientPrescription[] = [
  {
    id: 'rx-pat-01',
    medicationName: 'Lisinopril 10mg',
    genericName: 'Lisinopril (ACE Inhibitor)',
    dosage: '10mg Oral Tablet',
    frequency: 'Once daily in the morning',
    instructions: 'Take every morning with a full glass of water. Avoid potassium supplements.',
    doctorName: 'Dr. Hana Mengistu',
    prescribedDate: 'Feb 15, 2026',
    duration: '90 Days',
    refillsRemaining: 2,
    status: 'Active',
    costEtb: 280,
    purpose: 'Blood pressure control & cardiovascular protection',
  },
  {
    id: 'rx-pat-02',
    medicationName: 'Amlodipine Besylate 5mg',
    genericName: 'Amlodipine (Calcium Channel Blocker)',
    dosage: '5mg Oral Tablet',
    frequency: 'Once daily in the evening',
    instructions: 'Take 1 tablet every evening. Can be taken with or without food.',
    doctorName: 'Dr. Hana Mengistu',
    prescribedDate: 'Feb 15, 2026',
    duration: '90 Days',
    refillsRemaining: 2,
    status: 'Active',
    costEtb: 220,
    purpose: 'Vasodilation & peripheral arterial BP moderation',
  },
  {
    id: 'rx-pat-03',
    medicationName: 'Omega-3 EPA/DHA Cardio 1000mg',
    genericName: 'Fish Oil Triglycerides Concentrate',
    dosage: '1000mg Softgel',
    frequency: 'Once daily with meals',
    instructions: 'Take with lunch or dinner to support healthy lipid metabolism.',
    doctorName: 'Dr. Hana Mengistu',
    prescribedDate: 'Nov 20, 2025',
    duration: '60 Days',
    refillsRemaining: 1,
    status: 'Refill Due',
    costEtb: 480,
    purpose: 'Lipid balance & dietary cardiovascular support',
  },
];

export const INITIAL_LAB_RESULTS: PatientLabResult[] = [
  {
    id: 'lab-res-01',
    testName: 'Complete Blood Count (CBC) with Differential',
    category: 'Hematology',
    date: 'Mar 01, 2026',
    orderedBy: 'Dr. Hana Mengistu',
    status: 'Normal',
    summary: 'All leukocyte, erythrocyte, and platelet parameters are within standard reference intervals.',
    specimen: 'Venous Whole Blood (EDTA tube)',
    laboratory: 'MediCare Central Diagnostic Lab, Wing C',
    turnaroundTime: 'Same-day verification (4 hours)',
    parameters: [
      { parameter: 'White Blood Cell (WBC)', value: '6.8', unit: '10^3 / μL', referenceRange: '4.5 - 11.0', status: 'normal' },
      { parameter: 'Red Blood Cell (RBC)', value: '4.95', unit: '10^6 / μL', referenceRange: '4.30 - 5.90', status: 'normal' },
      { parameter: 'Hemoglobin (Hgb)', value: '15.1', unit: 'g/dL', referenceRange: '13.5 - 17.5', status: 'normal' },
      { parameter: 'Hematocrit (Hct)', value: '44.8', unit: '%', referenceRange: '41.0 - 50.0', status: 'normal' },
      { parameter: 'Platelet Count', value: '245', unit: '10^3 / μL', referenceRange: '150 - 450', status: 'normal' },
      { parameter: 'Neutrophils', value: '58.2', unit: '%', referenceRange: '40.0 - 75.0', status: 'normal' },
    ],
  },
  {
    id: 'lab-res-02',
    testName: 'Comprehensive Lipid Profile Panel',
    category: 'Clinical Biochemistry',
    date: 'Feb 12, 2026',
    orderedBy: 'Dr. Hana Mengistu',
    status: 'Completed',
    summary: 'Total cholesterol and LDL levels show notable improvement compared to previous November baseline.',
    specimen: 'Serum (Gold SST gel separator tube)',
    laboratory: 'MediCare Central Diagnostic Lab, Wing C',
    turnaroundTime: '24 hours',
    parameters: [
      { parameter: 'Total Cholesterol', value: '184', unit: 'mg/dL', referenceRange: '< 200', status: 'normal' },
      { parameter: 'HDL ("Good") Cholesterol', value: '52', unit: 'mg/dL', referenceRange: '> 40', status: 'normal' },
      { parameter: 'LDL ("Bad") Cholesterol', value: '108', unit: 'mg/dL', referenceRange: '< 100', status: 'elevated' },
      { parameter: 'Triglycerides', value: '138', unit: 'mg/dL', referenceRange: '< 150', status: 'normal' },
      { parameter: 'Non-HDL Cholesterol', value: '132', unit: 'mg/dL', referenceRange: '< 130', status: 'elevated' },
    ],
  },
  {
    id: 'lab-res-03',
    testName: 'Renal Function & Serum Electrolytes (BUN / Creatinine)',
    category: 'Renal & Electrolytes',
    date: 'Feb 12, 2026',
    orderedBy: 'Dr. Hana Mengistu',
    status: 'Normal',
    summary: 'Glomerular filtration rate and serum creatinine verify healthy renal clearance on ACE inhibitor therapy.',
    specimen: 'Serum (Lithium Heparin tube)',
    laboratory: 'MediCare Central Diagnostic Lab, Wing C',
    turnaroundTime: 'Same-day verification (3 hours)',
    parameters: [
      { parameter: 'Serum Creatinine', value: '0.92', unit: 'mg/dL', referenceRange: '0.70 - 1.30', status: 'normal' },
      { parameter: 'Blood Urea Nitrogen (BUN)', value: '14.0', unit: 'mg/dL', referenceRange: '7.0 - 20.0', status: 'normal' },
      { parameter: 'eGFR (CKD-EPI)', value: '> 90', unit: 'mL/min/1.73m²', referenceRange: '> 60', status: 'normal' },
      { parameter: 'Serum Potassium (K+)', value: '4.3', unit: 'mmol/L', referenceRange: '3.5 - 5.1', status: 'normal' },
      { parameter: 'Serum Sodium (Na+)', value: '141', unit: 'mmol/L', referenceRange: '136 - 145', status: 'normal' },
    ],
  },
  {
    id: 'lab-res-04',
    testName: 'Glycated Hemoglobin (HbA1c) Screening',
    category: 'Metabolic Endocrinology',
    date: 'Nov 20, 2025',
    orderedBy: 'Dr. Hana Mengistu',
    status: 'Normal',
    summary: 'Normal glucose metabolism with no diagnostic indication of prediabetes or insulin resistance.',
    specimen: 'Whole Blood (EDTA tube)',
    laboratory: 'MediCare Central Diagnostic Lab, Wing C',
    turnaroundTime: '24 hours',
    parameters: [
      { parameter: 'Hemoglobin A1c (HbA1c)', value: '5.4', unit: '%', referenceRange: '< 5.7', status: 'normal' },
      { parameter: 'Estimated Average Glucose', value: '108', unit: 'mg/dL', referenceRange: '< 117', status: 'normal' },
    ],
  },
];

export const patientDashboardService = {
  async getProfile(): Promise<PatientProfileData> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...CURRENT_PATIENT_PROFILE }), 50);
    });
  },

  async getStats(): Promise<PatientQuickStats> {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...PATIENT_QUICK_STATS }), 50);
    });
  },

  async getUpcomingAppointments(): Promise<PatientUpcomingAppointment[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...INITIAL_UPCOMING_APPOINTMENTS]), 50);
    });
  },

  async getMedicalRecords(): Promise<PatientMedicalRecord[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...INITIAL_MEDICAL_RECORDS]), 50);
    });
  },

  async getPrescriptions(): Promise<PatientPrescription[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...INITIAL_PRESCRIPTIONS]), 50);
    });
  },

  async getLabResults(): Promise<PatientLabResult[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...INITIAL_LAB_RESULTS]), 50);
    });
  },

  async bookAppointment(payload: BookAppointmentPayload): Promise<{ success: boolean; appointment: PatientUpcomingAppointment }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newApt: PatientUpcomingAppointment = {
          id: `pat-apt-${Date.now()}`,
          doctorName: payload.doctorName,
          doctorSpecialty: 'Specialist Physician',
          doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&auto=format&fit=crop&q=80',
          department: payload.department,
          date: payload.appointmentDate,
          time: payload.appointmentTime,
          location: 'MediCare Outpatient Clinic, Level 2',
          status: 'Confirmed',
          reason: payload.reason,
          type: payload.appointmentType,
          feeEtb: 400,
          preparationNotes: 'Please arrive 10 minutes before your scheduled slot for vital sign check.',
        };
        resolve({ success: true, appointment: newApt });
      }, 300);
    });
  },

  async requestPrescriptionRefill(prescriptionId: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `Refill request for prescription #${prescriptionId} sent to MediCare Pharmacy & Dr. Hana Mengistu. You will receive an SMS notification once approved.`,
        });
      }, 300);
    });
  },
};
