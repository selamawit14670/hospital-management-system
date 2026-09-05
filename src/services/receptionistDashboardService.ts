import type {
  ReceptionistStats,
  ReceptionistAppointment,
  WaitingPatient,
  RecentlyRegisteredPatient,
  PendingPayment,
  QuickPatientFormData,
  QuickAppointmentFormData,
} from '../types/receptionist';

export const RECEPTIONIST_STATS: ReceptionistStats = {
  totalPatients: 1428,
  todayAppointments: 42,
  waitingPatients: 14,
  pendingPayments: 8,
  totalPatientsChange: '+18 this week',
  checkedInAppointments: 28,
  totalPendingAmount: 14850,
  currency: 'ETB',
};

export const TODAY_APPOINTMENTS_DATA: ReceptionistAppointment[] = [
  {
    id: 'rec-apt-101',
    patientId: 'MC-000001',
    patientName: 'Abebe Kebede',
    patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    patientAge: 48,
    patientGender: 'Male',
    patientPhone: '+251 91 123 4567',
    doctorName: 'Dr. Hana Mengistu',
    doctorSpecialty: 'Internal Medicine',
    department: 'General Medicine',
    time: '08:30 AM',
    status: 'In Consultation',
    type: 'Follow-up',
    room: 'Room 204',
  },
  {
    id: 'rec-apt-102',
    patientId: 'MC-000002',
    patientName: 'Sara Desta',
    patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    patientAge: 34,
    patientGender: 'Female',
    patientPhone: '+251 92 345 6789',
    doctorName: 'Dr. Biruk Assefa',
    doctorSpecialty: 'Cardiologist',
    department: 'Cardiology',
    time: '09:00 AM',
    status: 'Checked-in',
    type: 'Consultation',
    room: 'Room 102',
  },
  {
    id: 'rec-apt-103',
    patientId: 'MC-000003',
    patientName: 'Dawit Bekele',
    patientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    patientAge: 52,
    patientGender: 'Male',
    patientPhone: '+251 93 456 7890',
    doctorName: 'Dr. Hana Mengistu',
    doctorSpecialty: 'Internal Medicine',
    department: 'General Medicine',
    time: '09:30 AM',
    status: 'Confirmed',
    type: 'Routine Checkup',
    room: 'Room 204',
  },
  {
    id: 'rec-apt-104',
    patientId: 'MC-000004',
    patientName: 'Tigist Haile',
    patientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    patientAge: 29,
    patientGender: 'Female',
    patientPhone: '+251 94 567 8901',
    doctorName: 'Dr. Aster Paulos',
    doctorSpecialty: 'Pediatrician',
    department: 'Pediatrics',
    time: '10:00 AM',
    status: 'Confirmed',
    type: 'Vaccination & Wellness',
    room: 'Pediatric Bay B',
  },
  {
    id: 'rec-apt-105',
    patientId: 'MC-000005',
    patientName: 'Yared Shimelis',
    patientAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    patientAge: 41,
    patientGender: 'Male',
    patientPhone: '+251 95 678 9012',
    doctorName: 'Dr. Yonas Tadesse',
    doctorSpecialty: 'Orthopedic Surgeon',
    department: 'Orthopedics',
    time: '10:30 AM',
    status: 'Checked-in',
    type: 'Post-Op Review',
    room: 'Ortho Suite 3',
  },
  {
    id: 'rec-apt-106',
    patientId: 'MC-000006',
    patientName: 'Martha Lemma',
    patientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    patientAge: 62,
    patientGender: 'Female',
    patientPhone: '+251 96 789 0123',
    doctorName: 'Dr. Biruk Assefa',
    doctorSpecialty: 'Cardiologist',
    department: 'Cardiology',
    time: '11:15 AM',
    status: 'Confirmed',
    type: 'ECG Review',
    room: 'Room 102',
  },
  {
    id: 'rec-apt-107',
    patientId: 'MC-000007',
    patientName: 'Solomon Tesfaye',
    patientAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    patientAge: 38,
    patientGender: 'Male',
    patientPhone: '+251 97 890 1234',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialty: 'Neurologist',
    department: 'Neurology',
    time: '11:45 AM',
    status: 'Confirmed',
    type: 'Headache Evaluation',
    room: 'Neuro Lab 1',
  },
  {
    id: 'rec-apt-108',
    patientId: 'MC-000008',
    patientName: 'Bethelhem Girma',
    patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    patientAge: 27,
    patientGender: 'Female',
    patientPhone: '+251 98 901 2345',
    doctorName: 'Dr. Aster Paulos',
    doctorSpecialty: 'Obstetrician',
    department: 'Maternity & Women',
    time: '02:00 PM',
    status: 'Confirmed',
    type: 'Antenatal Check',
    room: 'Women Clinic 4',
  },
];

export const WAITING_PATIENTS_DATA: WaitingPatient[] = [
  {
    id: 'wait-01',
    patientId: 'MC-000002',
    patientName: 'Sara Desta',
    patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    patientAge: 34,
    patientGender: 'Female',
    arrivalTime: '08:45 AM',
    appointment: '09:00 AM (Consultation)',
    doctor: 'Dr. Biruk Assefa',
    department: 'Cardiology',
    status: 'Vitals Ready',
    queueNumber: 'Q-102',
    priority: 'Priority',
    room: 'Room 102',
  },
  {
    id: 'wait-02',
    patientId: 'MC-000005',
    patientName: 'Yared Shimelis',
    patientAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    patientAge: 41,
    patientGender: 'Male',
    arrivalTime: '09:10 AM',
    appointment: '10:30 AM (Post-Op Review)',
    doctor: 'Dr. Yonas Tadesse',
    department: 'Orthopedics',
    status: 'Waiting',
    queueNumber: 'Q-105',
    priority: 'Normal',
    room: 'Ortho Suite 3',
  },
  {
    id: 'wait-03',
    patientId: 'MC-2026-0891',
    patientName: 'Kidus Tilahun',
    patientAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    patientAge: 68,
    patientGender: 'Male',
    arrivalTime: '09:15 AM',
    appointment: 'Walk-in Triage',
    doctor: 'Dr. Hana Mengistu',
    department: 'General Medicine',
    status: 'Called',
    queueNumber: 'Q-108',
    priority: 'Priority',
    room: 'Triage Room 1',
  },
  {
    id: 'wait-04',
    patientId: 'MC-2026-0894',
    patientName: 'Ruth Yohannes',
    patientAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    patientAge: 8,
    patientGender: 'Female',
    arrivalTime: '09:22 AM',
    appointment: '10:00 AM (Pediatrics)',
    doctor: 'Dr. Aster Paulos',
    department: 'Pediatrics',
    status: 'Waiting',
    queueNumber: 'Q-110',
    priority: 'Pediatric',
    room: 'Pediatric Bay B',
  },
  {
    id: 'wait-05',
    patientId: 'MC-000009',
    patientName: 'Mulugeta Berhanu',
    patientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    patientAge: 56,
    patientGender: 'Male',
    arrivalTime: '09:30 AM',
    appointment: '10:00 AM (General)',
    doctor: 'Dr. Hana Mengistu',
    department: 'General Medicine',
    status: 'Waiting',
    queueNumber: 'Q-112',
    priority: 'Normal',
    room: 'Room 204',
  },
];

export const RECENTLY_REGISTERED_DATA: RecentlyRegisteredPatient[] = [
  {
    id: 'rec-reg-01',
    patientId: 'MC-2026-0894',
    name: 'Ruth Yohannes',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    registrationDate: 'Today, 09:18 AM',
    phone: '+251 91 765 4321',
    gender: 'Female',
    age: 8,
    bloodGroup: 'O+',
    address: 'Bole Subcity, Woreda 03',
    emergencyContact: 'Yohannes (Father) • +251 91 765 4320',
    assignedDoctor: 'Dr. Aster Paulos',
    department: 'Pediatrics',
  },
  {
    id: 'rec-reg-02',
    patientId: 'MC-2026-0893',
    name: 'Ephrem Assefa',
    avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=120&auto=format&fit=crop&q=80',
    registrationDate: 'Today, 08:52 AM',
    phone: '+251 92 112 3344',
    gender: 'Male',
    age: 39,
    bloodGroup: 'A+',
    address: 'Yeka Subcity, House 412',
    emergencyContact: 'Hanna (Spouse) • +251 92 112 3345',
    assignedDoctor: 'Dr. Biruk Assefa',
    department: 'Cardiology',
  },
  {
    id: 'rec-reg-03',
    patientId: 'MC-2026-0892',
    name: 'Liya Kassa',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&auto=format&fit=crop&q=80',
    registrationDate: 'Today, 08:20 AM',
    phone: '+251 93 998 7766',
    gender: 'Female',
    age: 26,
    bloodGroup: 'B+',
    address: 'Kirkos Subcity, Kebele 14',
    emergencyContact: 'Rahel (Sister) • +251 93 998 7767',
    assignedDoctor: 'Dr. Aster Paulos',
    department: 'Maternity & Women',
  },
  {
    id: 'rec-reg-04',
    patientId: 'MC-2026-0891',
    name: 'Kidus Tilahun',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    registrationDate: 'Today, 07:45 AM',
    phone: '+251 94 332 2110',
    gender: 'Male',
    age: 68,
    bloodGroup: 'AB+',
    address: 'Arada Subcity, House 88',
    emergencyContact: 'Marta (Daughter) • +251 94 332 2111',
    assignedDoctor: 'Dr. Hana Mengistu',
    department: 'General Medicine',
  },
  {
    id: 'rec-reg-05',
    patientId: 'MC-2026-0890',
    name: 'Meron Belay',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    registrationDate: 'Yesterday, 04:30 PM',
    phone: '+251 95 667 8899',
    gender: 'Female',
    age: 31,
    bloodGroup: 'O-',
    address: 'Nifas Silk, Woreda 09',
    emergencyContact: 'Belay (Brother) • +251 95 667 8898',
    assignedDoctor: 'Dr. Yonas Tadesse',
    department: 'Orthopedics',
  },
];

export const PENDING_PAYMENTS_DATA: PendingPayment[] = [
  {
    id: 'pay-001',
    invoiceNumber: 'INV-2026-4401',
    patientId: 'MC-000002',
    patientName: 'Sara Desta',
    patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    service: 'Cardiology Consultation + Resting ECG',
    amount: 1450,
    currency: 'ETB',
    paymentStatus: 'Pending',
    date: 'Today, 09:05 AM',
    department: 'Cardiology',
    cashierNotes: 'Patient awaiting insurance pre-approval authorization',
  },
  {
    id: 'pay-002',
    invoiceNumber: 'INV-2026-4402',
    patientId: 'MC-2026-0894',
    patientName: 'Ruth Yohannes',
    patientAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    service: 'Pediatric Intake & Wellness Registration',
    amount: 550,
    currency: 'ETB',
    paymentStatus: 'Unpaid',
    date: 'Today, 09:20 AM',
    department: 'Pediatrics',
    cashierNotes: 'Front desk intake registration fee',
  },
  {
    id: 'pay-003',
    invoiceNumber: 'INV-2026-4403',
    patientId: 'MC-000005',
    patientName: 'Yared Shimelis',
    patientAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    service: 'Orthopedic Knee X-Ray (2 Views)',
    amount: 850,
    currency: 'ETB',
    paymentStatus: 'Pending',
    date: 'Today, 09:12 AM',
    department: 'Orthopedics / Imaging',
    cashierNotes: 'Post-op clinical review order',
  },
  {
    id: 'pay-004',
    invoiceNumber: 'INV-2026-4404',
    patientId: 'MC-2026-0891',
    patientName: 'Kidus Tilahun',
    patientAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    service: 'Fast-Track Lab Panel (CBC + Blood Sugar)',
    amount: 620,
    currency: 'ETB',
    paymentStatus: 'Partial',
    date: 'Today, 08:50 AM',
    department: 'Clinical Laboratory',
    cashierNotes: 'Paid ETB 200 co-pay; ETB 420 remaining balance',
  },
  {
    id: 'pay-005',
    invoiceNumber: 'INV-2026-4405',
    patientId: 'MC-000003',
    patientName: 'Dawit Bekele',
    patientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    service: 'Diabetes Management Consultation',
    amount: 450,
    currency: 'ETB',
    paymentStatus: 'Unpaid',
    date: 'Today, 09:28 AM',
    department: 'General Medicine',
    cashierNotes: 'Regular monthly outpatient review',
  },
  {
    id: 'pay-006',
    invoiceNumber: 'INV-2026-4406',
    patientId: 'MC-2026-0893',
    patientName: 'Ephrem Assefa',
    patientAvatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=120&auto=format&fit=crop&q=80',
    service: 'New Patient Enrollment & Health Card Issuance',
    amount: 350,
    currency: 'ETB',
    paymentStatus: 'Pending',
    date: 'Today, 08:55 AM',
    department: 'Admissions',
    cashierNotes: 'Digital RFID card printing fee',
  },
  {
    id: 'pay-007',
    invoiceNumber: 'INV-2026-4407',
    patientId: 'MC-000007',
    patientName: 'Solomon Tesfaye',
    patientAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    service: 'Neurology Consultation & Reflex Battery',
    amount: 1200,
    currency: 'ETB',
    paymentStatus: 'Unpaid',
    date: 'Today, 08:15 AM',
    department: 'Neurology',
    cashierNotes: 'Scheduled for 11:45 AM slot',
  },
  {
    id: 'pay-008',
    invoiceNumber: 'INV-2026-4408',
    patientId: 'MC-2026-0892',
    patientName: 'Liya Kassa',
    patientAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&auto=format&fit=crop&q=80',
    service: 'Obstetric Ultrasound (Pelvic 2D/Doppler)',
    amount: 1350,
    currency: 'ETB',
    paymentStatus: 'Pending',
    date: 'Today, 08:25 AM',
    department: 'Maternity / Imaging',
    cashierNotes: 'Awaiting cash payment receipt stamp',
  },
];

class ReceptionistDashboardService {
  private stats: ReceptionistStats = { ...RECEPTIONIST_STATS };
  private appointments: ReceptionistAppointment[] = [...TODAY_APPOINTMENTS_DATA];
  private waitingPatients: WaitingPatient[] = [...WAITING_PATIENTS_DATA];
  private recentPatients: RecentlyRegisteredPatient[] = [...RECENTLY_REGISTERED_DATA];
  private pendingPayments: PendingPayment[] = [...PENDING_PAYMENTS_DATA];

  async getStats(): Promise<ReceptionistStats> {
    return { ...this.stats };
  }

  async getAppointments(): Promise<ReceptionistAppointment[]> {
    return [...this.appointments];
  }

  async getWaitingPatients(): Promise<WaitingPatient[]> {
    return [...this.waitingPatients];
  }

  async getRecentPatients(): Promise<RecentlyRegisteredPatient[]> {
    return [...this.recentPatients];
  }

  async getPendingPayments(): Promise<PendingPayment[]> {
    return [...this.pendingPayments];
  }

  // Action: Check in appointment
  async checkInAppointment(appointmentId: string): Promise<{ success: boolean; appointment?: ReceptionistAppointment }> {
    const aptIndex = this.appointments.findIndex((a) => a.id === appointmentId);
    if (aptIndex === -1) return { success: false };

    const apt = this.appointments[aptIndex];
    apt.status = 'Checked-in';

    // Add to waiting list if not already there
    const alreadyWaiting = this.waitingPatients.some((w) => w.patientId === apt.patientId);
    if (!alreadyWaiting) {
      const newWait: WaitingPatient = {
        id: `wait-${Date.now()}`,
        patientId: apt.patientId,
        patientName: apt.patientName,
        patientAvatar: apt.patientAvatar,
        patientAge: apt.patientAge,
        patientGender: apt.patientGender === 'Other' ? 'Male' : apt.patientGender,
        arrivalTime: 'Just now',
        appointment: `${apt.time} (${apt.type})`,
        doctor: apt.doctorName,
        department: apt.department,
        status: 'Waiting',
        queueNumber: `Q-${100 + this.waitingPatients.length + 1}`,
        priority: 'Normal',
        room: apt.room,
      };
      this.waitingPatients.unshift(newWait);
      this.stats.waitingPatients += 1;
    }

    this.stats.checkedInAppointments = (this.stats.checkedInAppointments || 0) + 1;
    return { success: true, appointment: apt };
  }

  // Action: Update waiting patient status
  async updateWaitingStatus(patientId: string, newStatus: WaitingPatient['status']): Promise<boolean> {
    const idx = this.waitingPatients.findIndex((p) => p.patientId === patientId);
    if (idx === -1) return false;
    this.waitingPatients[idx].status = newStatus;
    if (newStatus === 'In Consultation') {
      // Find appointment and update
      const apt = this.appointments.find((a) => a.patientId === patientId);
      if (apt) apt.status = 'In Consultation';
    }
    return true;
  }

  // Action: Process / collect payment
  async collectPayment(paymentId: string): Promise<{ success: boolean; payment?: PendingPayment }> {
    const idx = this.pendingPayments.findIndex((p) => p.id === paymentId);
    if (idx === -1) return { success: false };
    
    const payment = this.pendingPayments[idx];
    payment.paymentStatus = 'Paid';
    this.stats.pendingPayments = Math.max(0, this.stats.pendingPayments - 1);
    this.stats.totalPendingAmount = Math.max(0, (this.stats.totalPendingAmount || 0) - payment.amount);
    return { success: true, payment };
  }

  // Action: Quick register patient
  async registerPatient(formData: QuickPatientFormData): Promise<RecentlyRegisteredPatient> {
    const newId = `MC-2026-0${895 + this.recentPatients.length}`;
    const newPatient: RecentlyRegisteredPatient = {
      id: `rec-reg-${Date.now()}`,
      patientId: newId,
      name: formData.fullName,
      avatarUrl: formData.gender === 'Female'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      registrationDate: 'Today, Just now',
      phone: formData.phone,
      gender: formData.gender,
      age: formData.age,
      bloodGroup: formData.bloodGroup,
      assignedDoctor: formData.assignedDoctor,
      department: formData.department,
      emergencyContact: formData.emergencyContact,
    };

    this.recentPatients.unshift(newPatient);
    this.stats.totalPatients += 1;

    // Also add pending card creation fee
    const newBill: PendingPayment = {
      id: `pay-${Date.now()}`,
      invoiceNumber: `INV-2026-${4410 + this.recentPatients.length}`,
      patientId: newId,
      patientName: formData.fullName,
      patientAvatar: newPatient.avatarUrl,
      service: 'New Patient Intake & Registration Card',
      amount: 350,
      currency: 'ETB',
      paymentStatus: 'Unpaid',
      date: 'Today, Just now',
      department: 'Admissions',
      cashierNotes: 'Auto-billed on front desk intake',
    };
    this.pendingPayments.unshift(newBill);
    this.stats.pendingPayments += 1;
    this.stats.totalPendingAmount = (this.stats.totalPendingAmount || 0) + 350;

    return newPatient;
  }

  // Action: Quick book appointment
  async bookAppointment(formData: QuickAppointmentFormData): Promise<ReceptionistAppointment> {
    const newApt: ReceptionistAppointment = {
      id: `rec-apt-${Date.now()}`,
      patientId: formData.patientId || 'MC-000001',
      patientName: formData.patientName,
      patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      patientAge: 32,
      patientGender: 'Female',
      doctorName: formData.doctorName,
      department: formData.department,
      time: formData.time,
      status: 'Confirmed',
      type: formData.type || 'Consultation',
      room: 'Room 201',
    };

    this.appointments.unshift(newApt);
    this.stats.todayAppointments += 1;
    return newApt;
  }
}

export const receptionistDashboardService = new ReceptionistDashboardService();
