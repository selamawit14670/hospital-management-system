import type { NavItem, UserRole, AppRoute } from '../types';

export interface RoleNavigationConfig {
  role: UserRole;
  badgeLabel: string;
  badgeVariant: 'primary' | 'success' | 'warning' | 'info' | 'purple';
  footerCard: {
    title: string;
    subtitle: string;
    badge: string;
    actionLabel: string;
  };
  items: NavItem[];
}

export const ROLE_NAVIGATION: Record<UserRole, RoleNavigationConfig> = {
  Administrator: {
    role: 'Administrator',
    badgeLabel: 'Enterprise Suite',
    badgeVariant: 'primary',
    footerCard: {
      title: 'Hospital Pro Suite',
      subtitle: 'Cloud Sync v2.4 Active. Clinical audit logs 256-bit encrypted.',
      badge: 'v2.4.0',
      actionLabel: '24/7 Support',
    },
    items: [
      { id: 'admin-dashboard', label: 'Dashboard', path: '/admin/dashboard', iconName: 'LayoutDashboard' },
      { id: 'admin-appointments', label: 'Appointments', path: '/admin/appointments', iconName: 'Calendar', badge: '12' },
      { id: 'admin-doctors', label: 'Doctors', path: '/admin/doctors', iconName: 'Stethoscope' },
      { id: 'admin-patients', label: 'Patients', path: '/admin/patients', iconName: 'Users', badge: 'New' },
      { id: 'admin-departments', label: 'Departments', path: '/admin/departments', iconName: 'Building2' },
      { id: 'admin-schedule', label: "Doctor's Schedule", path: '/admin/doctor-schedule', iconName: 'Clock' },
      { id: 'admin-payment', label: 'Payment', path: '/admin/payment', iconName: 'CreditCard' },
      { id: 'admin-inventory', label: 'Inventory', path: '/admin/inventory', iconName: 'Package', badge: '3' },
      { id: 'admin-messages', label: 'Messages', path: '/admin/messages', iconName: 'MessageSquare', badge: '5' },
    ],
  },
  Doctor: {
    role: 'Doctor',
    badgeLabel: 'Physician Portal',
    badgeVariant: 'info',
    footerCard: {
      title: 'Clinical Decision Hub',
      subtitle: 'Verified EHR diagnostics & rapid pharmacy prescription dispatch.',
      badge: 'Online',
      actionLabel: 'Emergency ER',
    },
    items: [
      { id: 'doctor-dashboard', label: 'Dashboard', path: '/doctor/dashboard', iconName: 'LayoutDashboard' },
      { id: 'doctor-patients', label: 'My Patients', path: '/doctor/patients', iconName: 'Users', badge: '8' },
      { id: 'doctor-appointments', label: 'Appointments', path: '/doctor/appointments', iconName: 'Calendar', badge: 'Today' },
      { id: 'doctor-consultations', label: 'Consultations', path: '/doctor/consultations', iconName: 'Activity' },
      { id: 'doctor-records', label: 'Medical Records', path: '/doctor/medical-records', iconName: 'ClipboardList' },
      { id: 'doctor-prescriptions', label: 'Prescriptions', path: '/doctor/prescriptions', iconName: 'Pill' },
      { id: 'doctor-labs', label: 'Lab Results', path: '/doctor/lab-results', iconName: 'FlaskConical', badge: '2' },
      { id: 'doctor-settings', label: 'Settings', path: '/doctor/settings', iconName: 'Settings' },
    ],
  },
  Nurse: {
    role: 'Nurse',
    badgeLabel: 'Ward Station',
    badgeVariant: 'success',
    footerCard: {
      title: 'Nurse Station #4',
      subtitle: 'Patient vitals monitor & ICU bed tracking synchronized.',
      badge: 'Shift A',
      actionLabel: 'Triage Call',
    },
    items: [
      { id: 'nurse-dashboard', label: 'Dashboard', path: '/nurse/dashboard', iconName: 'LayoutDashboard' },
      { id: 'nurse-patients', label: 'Assigned Patients', path: '/nurse/patients', iconName: 'Users', badge: '14' },
      { id: 'nurse-appointments', label: 'Appointments', path: '/nurse/appointments', iconName: 'Calendar' },
      { id: 'nurse-vitals', label: 'Vital Signs', path: '/nurse/vital-signs', iconName: 'Activity', badge: 'Due' },
      { id: 'nurse-records', label: 'Nursing Records', path: '/nurse/nursing-records', iconName: 'FileCheck' },
      { id: 'nurse-admissions', label: 'Admissions', path: '/nurse/admissions', iconName: 'BedDouble' },
      { id: 'nurse-med-records', label: 'Medical Records', path: '/nurse/medical-records', iconName: 'ClipboardList' },
      { id: 'nurse-settings', label: 'Settings', path: '/nurse/settings', iconName: 'Settings' },
    ],
  },
  Receptionist: {
    role: 'Receptionist',
    badgeLabel: 'Front Desk',
    badgeVariant: 'warning',
    footerCard: {
      title: 'Admissions Terminal',
      subtitle: 'Instant patient card issuance & insurance verify system active.',
      badge: 'Desk #2',
      actionLabel: 'Queue System',
    },
    items: [
      { id: 'rec-dashboard', label: 'Dashboard', path: '/receptionist/dashboard', iconName: 'LayoutDashboard' },
      { id: 'rec-patients', label: 'Patients', path: '/receptionist/patients', iconName: 'Users' },
      { id: 'rec-register', label: 'Register Patient', path: '/receptionist/register-patient', iconName: 'UserPlus' },
      { id: 'rec-appointments', label: 'Appointments', path: '/receptionist/appointments', iconName: 'Calendar', badge: '18' },
      { id: 'rec-payment', label: 'Payment', path: '/receptionist/payment', iconName: 'CreditCard' },
      { id: 'rec-cards', label: 'Patient Cards', path: '/receptionist/patient-cards', iconName: 'IdCard' },
      { id: 'rec-settings', label: 'Settings', path: '/receptionist/settings', iconName: 'Settings' },
    ],
  },
  Patient: {
    role: 'Patient',
    badgeLabel: 'Personal Health',
    badgeVariant: 'purple',
    footerCard: {
      title: 'MediCare Health Card',
      subtitle: 'Encrypted personal medical profile and digital emergency QR.',
      badge: 'Active',
      actionLabel: 'Telehealth',
    },
    items: [
      { id: 'pat-dashboard', label: 'Dashboard', path: '/patient/dashboard', iconName: 'LayoutDashboard' },
      { id: 'pat-card', label: 'My Digital Card', path: '/patient/digital-card', iconName: 'IdCard' },
      { id: 'pat-appointments', label: 'My Appointments', path: '/patient/appointments', iconName: 'Calendar', badge: 'Upcoming' },
      { id: 'pat-records', label: 'My Medical Records', path: '/patient/medical-records', iconName: 'FileText' },
      { id: 'pat-prescriptions', label: 'My Prescriptions', path: '/patient/prescriptions', iconName: 'Pill' },
      { id: 'pat-labs', label: 'My Lab Results', path: '/patient/lab-results', iconName: 'FlaskConical' },
      { id: 'pat-profile', label: 'Profile & Settings', path: '/patient/profile', iconName: 'Settings' },
    ],
  },
};
