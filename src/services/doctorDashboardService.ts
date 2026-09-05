import type {
  DoctorStats,
  DoctorAppointment,
  WaitingPatient,
  PatientDetailedRecord,
  UpcomingAppointment,
  PendingLabResult,
  ClinicalActivity,
} from '../types/doctor';

export const DOCTOR_STATS: DoctorStats = {
  todayAppointments: 8,
  completedAppointments: 3,
  waitingPatients: 3,
  urgentPatients: 2,
  myPatientsTotal: 124,
  newPatientsThisMonth: 8,
  pendingLabResults: 5,
  urgentLabReviews: 2,
};

export const TODAY_APPOINTMENTS: DoctorAppointment[] = [
  {
    id: 'apt-001',
    patientId: 'MC-000001',
    patientName: 'Abebe Kebede',
    patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    time: '08:30 AM',
    date: 'Today',
    reason: 'Blood Pressure Follow-up',
    type: 'Follow-up',
    status: 'Confirmed',
    room: 'Exam Room 3',
  },
  {
    id: 'apt-002',
    patientId: 'MC-000002',
    patientName: 'Sara Desta',
    patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    time: '09:30 AM',
    date: 'Today',
    reason: 'Chest Pain Evaluation',
    type: 'Consultation',
    status: 'Waiting',
    room: 'Exam Room 3',
  },
  {
    id: 'apt-003',
    patientId: 'MC-000003',
    patientName: 'Dawit Bekele',
    patientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    time: '10:30 AM',
    date: 'Today',
    reason: 'Diabetes Follow-up',
    type: 'Follow-up',
    status: 'Confirmed',
    room: 'Exam Room 3',
  },
  {
    id: 'apt-004',
    patientId: 'MC-000004',
    patientName: 'Meron Alemu',
    patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    time: '11:30 AM',
    date: 'Today',
    reason: 'Asthma Review',
    type: 'Checkup',
    status: 'In Consultation',
    room: 'Consultation Suite A',
  },
  {
    id: 'apt-005',
    patientId: 'MC-000005',
    patientName: 'Almaz Tadesse',
    patientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    time: '02:00 PM',
    date: 'Today',
    reason: 'Thyroid Screening',
    type: 'Consultation',
    status: 'Completed',
    room: 'Exam Room 3',
  },
  {
    id: 'apt-006',
    patientId: 'MC-000006',
    patientName: 'Tigist Assefa',
    patientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    time: '02:45 PM',
    date: 'Today',
    reason: 'Acute Dyspnea & Cough',
    type: 'Emergency',
    status: 'Waiting',
    room: 'Triage Room 1',
  },
  {
    id: 'apt-007',
    patientId: 'MC-000007',
    patientName: 'Kassahun Tolessa',
    patientAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    time: '03:45 PM',
    date: 'Today',
    reason: 'Post-Op Knee Replacement Check',
    type: 'Checkup',
    status: 'Confirmed',
    room: 'Exam Room 3',
  },
  {
    id: 'apt-008',
    patientId: 'MC-000008',
    patientName: 'Helen Gebre',
    patientAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&auto=format&fit=crop&q=80',
    time: '04:30 PM',
    date: 'Today',
    reason: 'Hypertension & Lipid Panel Review',
    type: 'Follow-up',
    status: 'Confirmed',
    room: 'Exam Room 3',
  },
];

export const WAITING_QUEUE: WaitingPatient[] = [
  {
    id: 'wq-001',
    patientId: 'MC-000001',
    patientName: 'Abebe Kebede',
    patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    appointmentTime: '09:30 AM',
    reason: 'Blood Pressure Follow-up',
    waitingMinutes: 12,
    priority: 'Normal',
    vitals: { bp: '138/88 mmHg', hr: '74 bpm', temp: '36.8°C', spo2: '98%' },
  },
  {
    id: 'wq-002',
    patientId: 'MC-000002',
    patientName: 'Sara Desta',
    patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    appointmentTime: '10:00 AM',
    reason: 'Chest Pain Evaluation',
    waitingMinutes: 5,
    priority: 'Urgent',
    vitals: { bp: '145/92 mmHg', hr: '88 bpm', temp: '37.1°C', spo2: '96%' },
  },
  {
    id: 'wq-003',
    patientId: 'MC-000006',
    patientName: 'Tigist Assefa',
    patientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    appointmentTime: '10:15 AM',
    reason: 'Acute Dyspnea',
    waitingMinutes: 2,
    priority: 'Critical',
    vitals: { bp: '150/95 mmHg', hr: '104 bpm', temp: '38.4°C', spo2: '92%' },
  },
];

export const ALL_PATIENTS: PatientDetailedRecord[] = [
  {
    patientId: 'MC-000001',
    name: 'Abebe Kebede',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    age: 38,
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '+251 911 234 567',
    email: 'abebe.kebede@medicare.com',
    lastVisit: 'Today',
    primaryDiagnosis: 'Stage 1 Essential Hypertension',
    allergies: ['Penicillin', 'Sulfa drugs'],
    currentMedications: ['Amlodipine 5mg OD', 'Lisinopril 10mg OD'],
    previousDiagnoses: ['Mild Hyperlipidemia (2024)', 'Essential Hypertension (2023)'],
    previousConsultations: [
      {
        id: 'c-01',
        date: '2026-02-15',
        doctorName: 'Dr. Hana Mengistu',
        notes: 'Routine hypertension follow-up. BP slightly elevated at 138/88.',
        treatment: 'Adjusted Lisinopril dose to 10mg. Advised low-sodium diet.',
      },
      {
        id: 'c-02',
        date: '2025-11-20',
        doctorName: 'Dr. Hana Mengistu',
        notes: 'Patient reported mild morning headaches. ECG normal.',
        treatment: 'Initiated Amlodipine 5mg. Scheduled 3-month review.',
      },
    ],
    prescriptions: [
      {
        id: 'rx-01',
        date: '2026-02-15',
        medication: 'Amlodipine Besylate',
        dosage: '5mg',
        frequency: 'Once daily morning',
        duration: '90 days',
        status: 'Active',
      },
      {
        id: 'rx-02',
        date: '2026-02-15',
        medication: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily evening',
        duration: '90 days',
        status: 'Active',
      },
    ],
    labResults: [
      {
        id: 'lab-01',
        date: '2026-03-01',
        testName: 'Complete Blood Count (CBC)',
        resultSummary: 'WBC: 6.8, Hb: 14.2 g/dL, Platelets: 240k - Normal range',
        status: 'Pending Review',
      },
      {
        id: 'lab-02',
        date: '2025-11-21',
        testName: 'Lipid Profile',
        resultSummary: 'Total Chol: 195 mg/dL, HDL: 48, LDL: 118, Trig: 145',
        status: 'Normal',
      },
    ],
  },
  {
    patientId: 'MC-000002',
    name: 'Sara Desta',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    age: 29,
    gender: 'Female',
    bloodGroup: 'A+',
    phone: '+251 912 345 678',
    email: 'sara.desta@medicare.com',
    lastVisit: 'Yesterday',
    primaryDiagnosis: 'Atypical Angina Check',
    allergies: ['Aspirin', 'Iodine contrast agent'],
    currentMedications: ['Metoprolol Succinate 25mg OD', 'Atorvastatin 20mg HS'],
    previousDiagnoses: ['Atypical Chest Pain (2025)', 'Iron Deficiency Anemia (2024)'],
    previousConsultations: [
      {
        id: 'c-03',
        date: '2026-03-04',
        doctorName: 'Dr. Hana Mengistu',
        notes: 'Patient presented with intermittent sharp substernal chest discomfort.',
        treatment: 'Ordered 12-lead ECG and urgent cardiac enzyme blood panel.',
      },
    ],
    prescriptions: [
      {
        id: 'rx-03',
        date: '2026-03-04',
        medication: 'Metoprolol Succinate ER',
        dosage: '25mg',
        frequency: 'Once daily',
        duration: '30 days',
        status: 'Active',
      },
    ],
    labResults: [
      {
        id: 'lab-03',
        date: '2026-03-04',
        testName: 'Blood Chemistry & Lipid Panel',
        resultSummary: 'Troponin I: <0.01 ng/mL (Normal), CK-MB: 1.8 ng/mL',
        status: 'Pending Review',
      },
    ],
  },
  {
    patientId: 'MC-000003',
    name: 'Dawit Bekele',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    age: 45,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '+251 913 456 789',
    email: 'dawit.bekele@medicare.com',
    lastVisit: '2 days ago',
    primaryDiagnosis: 'Type 2 Diabetes Mellitus review',
    allergies: ['None known'],
    currentMedications: ['Metformin 1000mg BD', 'Empagliflozin 10mg OD'],
    previousDiagnoses: ['Type 2 Diabetes (2022)', 'Diabetic Peripheral Neuropathy (2025)'],
    previousConsultations: [
      {
        id: 'c-04',
        date: '2026-03-03',
        doctorName: 'Dr. Hana Mengistu',
        notes: 'Fasting sugars improved. Monitored foot sensation with monofilament test.',
        treatment: 'Continue current antidiabetic regimen. Repeat HbA1c in 3 months.',
      },
    ],
    prescriptions: [
      {
        id: 'rx-04',
        date: '2026-03-03',
        medication: 'Metformin HCl ER',
        dosage: '1000mg',
        frequency: 'Twice daily with meals',
        duration: '90 days',
        status: 'Active',
      },
    ],
    labResults: [
      {
        id: 'lab-04',
        date: '2026-03-02',
        testName: 'HbA1c & Fasting Glucose',
        resultSummary: 'HbA1c: 6.9% (Target <7.0%), Fasting Glucose: 118 mg/dL',
        status: 'Pending Review',
      },
    ],
  },
  {
    patientId: 'MC-000004',
    name: 'Meron Alemu',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    age: 34,
    gender: 'Female',
    bloodGroup: 'AB+',
    phone: '+251 914 567 890',
    email: 'meron.alemu@medicare.com',
    lastVisit: '3 days ago',
    primaryDiagnosis: 'Moderate Persistent Bronchial Asthma',
    allergies: ['Dust mites', 'Ceftriaxone'],
    currentMedications: ['Fluticasone/Salmeterol 250/50 Inhaler 1 puff BD', 'Montelukast 10mg ON'],
    previousDiagnoses: ['Bronchial Asthma (2019)', 'Allergic Rhinitis (2021)'],
    previousConsultations: [
      {
        id: 'c-05',
        date: '2026-03-02',
        doctorName: 'Dr. Hana Mengistu',
        notes: 'Patient noted wheezing during cold evenings. Peak flow 380 L/min.',
        treatment: 'Reinforced inhaler technique with spacer chamber.',
      },
    ],
    prescriptions: [
      {
        id: 'rx-05',
        date: '2026-03-02',
        medication: 'Fluticasone / Salmeterol Inhaler',
        dosage: '250/50 mcg',
        frequency: 'Twice daily',
        duration: '60 days',
        status: 'Active',
      },
    ],
    labResults: [
      {
        id: 'lab-05',
        date: '2026-03-01',
        testName: 'Spirometry Peak Expiratory Flow',
        resultSummary: 'FEV1/FVC: 76%, Post-bronchodilator improvement: +14%',
        status: 'Normal',
      },
    ],
  },
  {
    patientId: 'MC-000005',
    name: 'Almaz Tadesse',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    age: 52,
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '+251 915 678 901',
    email: 'almaz.tadesse@medicare.com',
    lastVisit: 'Today',
    primaryDiagnosis: 'Thyroid Screening & Subclinical Hypothyroidism',
    allergies: ['Codeine'],
    currentMedications: ['Levothyroxine 50mcg OD', 'Calcium + Vit D3 OD'],
    previousDiagnoses: ['Primary Hypothyroidism (2023)', 'Osteopenia (2025)'],
    previousConsultations: [
      {
        id: 'c-06',
        date: '2026-03-05',
        doctorName: 'Dr. Hana Mengistu',
        notes: 'Complaining of lethargy and mild cold intolerance.',
        treatment: 'Ordered serum TSH, Free T4, and neck ultrasound.',
      },
    ],
    prescriptions: [
      {
        id: 'rx-06',
        date: '2026-03-05',
        medication: 'Levothyroxine Sodium',
        dosage: '50mcg',
        frequency: 'Every morning fasting 30 min before food',
        duration: '90 days',
        status: 'Active',
      },
    ],
    labResults: [
      {
        id: 'lab-06',
        date: '2026-03-05',
        testName: 'Thyroid Panel (TSH, FT4)',
        resultSummary: 'TSH: 5.4 mIU/L (High), FT4: 1.1 ng/dL (Normal)',
        status: 'Pending Review',
      },
    ],
  },
  {
    patientId: 'MC-000006',
    name: 'Tigist Assefa',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    age: 41,
    gender: 'Female',
    bloodGroup: 'A-',
    phone: '+251 916 789 012',
    email: 'tigist.assefa@medicare.com',
    lastVisit: 'Today',
    primaryDiagnosis: 'Acute Dyspnea & Respiratory Tract Infection',
    allergies: ['Penicillin G'],
    currentMedications: ['Salbutamol Nebulizer PRN', 'Paracetamol 1g PRN'],
    previousDiagnoses: ['Recurrent Bronchitis (2024)'],
    previousConsultations: [
      {
        id: 'c-07',
        date: '2026-03-05',
        doctorName: 'Dr. Hana Mengistu',
        notes: 'Sudden onset respiratory distress, SpO2 92% on room air.',
        treatment: 'Administered 2L oxygen via nasal cannula. Urgent chest X-ray.',
      },
    ],
    prescriptions: [],
    labResults: [
      {
        id: 'lab-07',
        date: '2026-03-05',
        testName: 'Urgent Arterial Blood Gas (ABG)',
        resultSummary: 'pH: 7.36, pO2: 68 mmHg, pCO2: 44 mmHg, HCO3: 24',
        status: 'Pending Review',
      },
    ],
  },
];

export const UPCOMING_APPOINTMENTS: UpcomingAppointment[] = [
  {
    id: 'up-001',
    patientId: 'MC-000002',
    patientName: 'Sara Desta',
    time: '11:30 AM',
    date: 'Today',
    type: 'General Consultation',
    status: 'Confirmed',
  },
  {
    id: 'up-002',
    patientId: 'MC-000003',
    patientName: 'Dawit Bekele',
    time: '01:00 PM',
    date: 'Today',
    type: 'Diabetes Follow-up',
    status: 'Confirmed',
  },
  {
    id: 'up-003',
    patientId: 'MC-000004',
    patientName: 'Meron Alemu',
    time: '02:30 PM',
    date: 'Today',
    type: 'Routine Checkup',
    status: 'Scheduled',
  },
  {
    id: 'up-004',
    patientId: 'MC-000007',
    patientName: 'Kassahun Tolessa',
    time: '03:45 PM',
    date: 'Today',
    type: 'Post-Op Evaluation',
    status: 'Scheduled',
  },
];

export const PENDING_LAB_RESULTS: PendingLabResult[] = [
  {
    id: 'plr-001',
    patientId: 'MC-000001',
    patientName: 'Abebe Kebede',
    patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    testName: 'CBC (Complete Blood Count)',
    collectedTime: 'Collected Today, 07:45 AM',
    status: 'Pending Review',
    priority: 'Normal',
    department: 'Hematology',
  },
  {
    id: 'plr-002',
    patientId: 'MC-000002',
    patientName: 'Sara Desta',
    patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    testName: 'Blood Chemistry & Lipid Panel',
    collectedTime: 'Collected Today, 08:15 AM',
    status: 'Pending Review',
    priority: 'Urgent',
    department: 'Clinical Biochemistry',
  },
  {
    id: 'plr-003',
    patientId: 'MC-000003',
    patientName: 'Dawit Bekele',
    patientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    testName: 'HbA1c & Fasting Glucose',
    collectedTime: 'Collected Yesterday, 14:20 PM',
    status: 'Pending Review',
    priority: 'Normal',
    department: 'Clinical Biochemistry',
  },
  {
    id: 'plr-004',
    patientId: 'MC-000005',
    patientName: 'Almaz Tadesse',
    patientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    testName: 'Thyroid Panel (TSH, FT4)',
    collectedTime: 'Collected Today, 09:10 AM',
    status: 'Pending Review',
    priority: 'Normal',
    department: 'Endocrinology',
  },
  {
    id: 'plr-005',
    patientId: 'MC-000006',
    patientName: 'Tigist Assefa',
    patientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    testName: 'Arterial Blood Gas (ABG)',
    collectedTime: 'Collected Today, 10:20 AM',
    status: 'Critical Review',
    priority: 'Critical',
    department: 'Critical Care / Pulmonology',
  },
];

export const CLINICAL_ACTIVITIES: ClinicalActivity[] = [
  {
    id: 'act-001',
    time: 'Today, 09:20 AM',
    action: 'Consultation completed',
    patientName: 'Abebe Kebede',
    patientId: 'MC-000001',
    details: 'Follow-up consultation concluded with revised antihypertensive therapy.',
  },
  {
    id: 'act-002',
    time: 'Today, 08:50 AM',
    action: 'Prescription created',
    patientName: 'Sara Desta',
    patientId: 'MC-000002',
    details: 'Issued digital prescription for Metoprolol Succinate ER 25mg.',
  },
  {
    id: 'act-003',
    time: 'Yesterday, 16:30 PM',
    action: 'Lab result reviewed',
    patientName: 'Dawit Bekele',
    patientId: 'MC-000003',
    details: 'Endorsed HbA1c panel and renewed 90-day Metformin regimen.',
  },
  {
    id: 'act-004',
    time: 'Yesterday, 14:15 PM',
    action: 'Clinical note updated',
    patientName: 'Meron Alemu',
    patientId: 'MC-000004',
    details: 'Updated asthma control assessment and peak flow diary notes.',
  },
];

/**
 * Service API methods for Doctor Workspace
 */
export const doctorDashboardService = {
  async getDoctorStats(): Promise<DoctorStats> {
    return Promise.resolve(DOCTOR_STATS);
  },

  async getTodayAppointments(): Promise<DoctorAppointment[]> {
    return Promise.resolve(TODAY_APPOINTMENTS);
  },

  async getWaitingQueue(): Promise<WaitingPatient[]> {
    return Promise.resolve(WAITING_QUEUE);
  },

  async getUpcomingAppointments(): Promise<UpcomingAppointment[]> {
    return Promise.resolve(UPCOMING_APPOINTMENTS);
  },

  async getPendingLabResults(): Promise<PendingLabResult[]> {
    return Promise.resolve(PENDING_LAB_RESULTS);
  },

  async getClinicalActivities(): Promise<ClinicalActivity[]> {
    return Promise.resolve(CLINICAL_ACTIVITIES);
  },

  async searchPatients(query: string): Promise<PatientDetailedRecord[]> {
    const q = query.trim().toLowerCase();
    if (!q) return Promise.resolve(ALL_PATIENTS.slice(0, 4));
    const results = ALL_PATIENTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.patientId.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        p.primaryDiagnosis.toLowerCase().includes(q)
    );
    return Promise.resolve(results);
  },

  async getPatientById(patientId: string): Promise<PatientDetailedRecord | null> {
    const cleanId = patientId.trim().toUpperCase();
    const found = ALL_PATIENTS.find((p) => p.patientId.toUpperCase() === cleanId);
    return Promise.resolve(found || null);
  },

  async getRecentPatients(): Promise<PatientDetailedRecord[]> {
    return Promise.resolve(ALL_PATIENTS.slice(0, 4));
  },
};
