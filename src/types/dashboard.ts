import type { BadgeVariant } from './index';

export interface DashboardStats {
  totalPatients: number;
  patientsGrowth: string;
  todayAppointments: number;
  completedAppointments: number;
  upcomingAppointments: number;
  availableBeds: number;
  totalBeds: number;
  admittedToday: number;
  totalRevenue: number;
  currency: string;
  paymentsCleared: string;
}

export interface TrendDataPoint {
  day: string;
  fullDate?: string;
  appointments: number;
  patientRegistrations: number;
  completedConsultations: number;
}

export interface DepartmentStat {
  name: string;
  patientCount: number;
  color: string;
  percentage: number;
}

export interface CalendarScheduleItem {
  id: string;
  time: string;
  title: string;
  doctor: string;
  department: string;
  room: string;
  type: 'meeting' | 'consultation' | 'training' | 'review';
  date: string; // YYYY-MM-DD
}

export interface DoctorScheduleItem {
  id: string;
  name: string;
  department: string;
  status: 'Available' | 'Unavailable';
  workingHours: string;
  avatarUrl: string;
  specialization?: string;
  room?: string;
  phone?: string;
}

export interface RecentPatient {
  id: string;
  patientId: string;
  name: string;
  gender: 'Male' | 'Female';
  age: number;
  bloodGroup: string;
  phone: string;
  registeredAt: string;
  avatarUrl: string;
  emergencyContact: string;
  address?: string;
}

export type AppointmentStatus =
  | 'Scheduled'
  | 'Confirmed'
  | 'Completed'
  | 'Pending'
  | 'Cancelled';

export interface UpcomingAppointment {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  department: string;
  reason: string;
  time: string;
  date: string;
  status: AppointmentStatus;
  avatarUrl: string;
}
