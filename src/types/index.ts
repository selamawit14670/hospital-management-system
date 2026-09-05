export type UserRole =
  | 'Administrator'
  | 'Doctor'
  | 'Nurse'
  | 'Receptionist'
  | 'Patient';

export type AdminRoute =
  | '/admin/dashboard'
  | '/admin/patients'
  | '/admin/appointments'
  | '/admin/doctors'
  | '/admin/departments'
  | '/admin/doctor-schedule'
  | '/admin/payment'
  | '/admin/inventory'
  | '/admin/messages';

export type DoctorRoute =
  | '/doctor/dashboard'
  | '/doctor/patients'
  | '/doctor/patients/:patientId'
  | '/doctor/appointments'
  | '/doctor/consultations'
  | '/doctor/consultations/new'
  | '/doctor/medical-records'
  | '/doctor/prescriptions'
  | '/doctor/lab-results'
  | '/doctor/settings';

export type NurseRoute =
  | '/nurse/dashboard'
  | '/nurse/patients'
  | '/nurse/appointments'
  | '/nurse/vital-signs'
  | '/nurse/nursing-records'
  | '/nurse/admissions'
  | '/nurse/medical-records'
  | '/nurse/settings';

export type ReceptionistRoute =
  | '/receptionist/dashboard'
  | '/receptionist/patients'
  | '/receptionist/register-patient'
  | '/receptionist/appointments'
  | '/receptionist/payment'
  | '/receptionist/patient-cards'
  | '/receptionist/settings';

export type PatientRoute =
  | '/patient/dashboard'
  | '/patient/digital-card'
  | '/patient/appointments'
  | '/patient/medical-records'
  | '/patient/prescriptions'
  | '/patient/lab-results'
  | '/patient/profile';

export type AppRoute =
  | AdminRoute
  | DoctorRoute
  | NurseRoute
  | ReceptionistRoute
  | PatientRoute
  | '/login'
  | '/dashboard'
  | '/appointments'
  | '/doctors'
  | '/patients'
  | '/departments'
  | '/doctor-schedule'
  | '/payment'
  | '/inventory'
  | '/messages';

export interface NavItem {
  id: string;
  label: string;
  path: AppRoute;
  iconName:
    | 'LayoutDashboard'
    | 'Calendar'
    | 'Stethoscope'
    | 'Users'
    | 'Building2'
    | 'Clock'
    | 'CreditCard'
    | 'Package'
    | 'MessageSquare'
    | 'FileText'
    | 'Pill'
    | 'FlaskConical'
    | 'Activity'
    | 'FileCheck'
    | 'BedDouble'
    | 'UserPlus'
    | 'IdCard'
    | 'QrCode'
    | 'User'
    | 'ClipboardList'
    | 'Settings';
  badge?: string | number;
  badgeVariant?: 'blue' | 'emerald' | 'amber' | 'rose';
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  hospital: string;
  avatarUrl: string;
  title?: string;
  status: 'online' | 'busy' | 'away' | 'offline';
}

export interface AuthUser extends UserProfile {
  token?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'appointment' | 'emergency' | 'inventory' | 'billing' | 'system';
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple';
