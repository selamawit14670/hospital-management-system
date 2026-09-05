export interface ReceptionistStats {
  totalPatients: number;
  todayAppointments: number;
  waitingPatients: number;
  pendingPayments: number;
  totalPatientsChange?: string;
  checkedInAppointments?: number;
  totalPendingAmount?: number;
  currency?: string;
}

export interface ReceptionistAppointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  patientPhone?: string;
  doctorName: string;
  doctorSpecialty?: string;
  department: string;
  time: string;
  status: 'Confirmed' | 'Checked-in' | 'In Consultation' | 'Completed' | 'Cancelled';
  type: string;
  room?: string;
}

export interface WaitingPatient {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  patientAge?: number;
  patientGender?: 'Male' | 'Female';
  arrivalTime: string;
  appointment: string;
  doctor: string;
  department?: string;
  status: 'Waiting' | 'Called' | 'Vitals Ready' | 'In Consultation';
  queueNumber: string;
  priority?: 'Normal' | 'Priority' | 'Emergency' | 'Pediatric';
  room?: string;
}

export interface RecentlyRegisteredPatient {
  id: string;
  patientId: string;
  name: string;
  avatarUrl: string;
  registrationDate: string;
  phone: string;
  gender: 'Male' | 'Female';
  age: number;
  bloodGroup?: string;
  address?: string;
  emergencyContact?: string;
  assignedDoctor?: string;
  department?: string;
}

export interface PendingPayment {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  service: string;
  amount: number;
  currency: string;
  paymentStatus: 'Pending' | 'Unpaid' | 'Partial' | 'Paid';
  date: string;
  department: string;
  cashierNotes?: string;
}

export interface QuickPatientFormData {
  fullName: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female';
  bloodGroup: string;
  assignedDoctor: string;
  department: string;
  emergencyContact: string;
}

export interface QuickAppointmentFormData {
  patientId: string;
  patientName: string;
  doctorName: string;
  department: string;
  time: string;
  type: string;
}

export interface FullPatientRegistrationFormData {
  // 1. Personal Information
  fullName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  patientPhoto: string;

  // 2. Contact Information
  phoneNumber: string;
  email: string;
  address: string;

  // 3. Emergency Contact
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;

  // 4. Additional Information
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Other';
  occupation: string;
  registrationDate: string;

  // Department & Doctor Routing (optional)
  department?: string;
  assignedDoctor?: string;
}

export interface RegisteredPatientConfirmation {
  patientId: string;
  formData: FullPatientRegistrationFormData;
  calculatedAge: number;
  rfidChipId: string;
  registeredTimestamp: string;
}

