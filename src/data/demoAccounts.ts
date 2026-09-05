import type { AuthUser, UserRole, AppRoute } from '../types';

export interface DemoAccount {
  email: string;
  password: string;
  role: UserRole;
  user: AuthUser;
  defaultRoute: AppRoute;
}

export const DEMO_ACCOUNTS: Record<UserRole, DemoAccount> = {
  Administrator: {
    email: 'admin@medicare.com',
    password: 'Admin123!',
    role: 'Administrator',
    defaultRoute: '/admin/dashboard',
    user: {
      id: 'usr_admin_01',
      name: 'Robert Garcia',
      role: 'Administrator',
      email: 'admin@medicare.com',
      hospital: 'MediCare Central Command',
      title: 'Chief Hospital Administrator',
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=120&auto=format&fit=crop&q=80',
      status: 'online',
    },
  },
  Doctor: {
    email: 'doctor@medicare.com',
    password: 'Doctor123!',
    role: 'Doctor',
    defaultRoute: '/doctor/dashboard',
    user: {
      id: 'usr_doc_02',
      name: 'Dr. Hana Mengistu',
      role: 'Doctor',
      email: 'doctor@medicare.com',
      hospital: 'General Medicine',
      title: 'Attending Physician',
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&auto=format&fit=crop&q=80',
      status: 'online',
    },
  },
  Nurse: {
    email: 'nurse@medicare.com',
    password: 'Nurse123!',
    role: 'Nurse',
    defaultRoute: '/nurse/dashboard',
    user: {
      id: 'usr_nurse_03',
      name: 'Sister Almaz',
      role: 'Nurse',
      email: 'nurse@medicare.com',
      hospital: 'Inpatient Care & Trauma Ward',
      title: 'Head Clinical Nurse',
      avatarUrl: 'https://images.unsplash.com/photo-1594824813523-28c03e2c6cb3?w=120&auto=format&fit=crop&q=80',
      status: 'online',
    },
  },
  Receptionist: {
    email: 'receptionist@medicare.com',
    password: 'Reception123!',
    role: 'Receptionist',
    defaultRoute: '/receptionist/dashboard',
    user: {
      id: 'usr_rec_04',
      name: 'Selamawit D.',
      role: 'Receptionist',
      email: 'receptionist@medicare.com',
      hospital: 'Central Outpatient Admissions',
      title: 'Patient Intake Officer',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      status: 'online',
    },
  },
  Patient: {
    email: 'patient@medicare.com',
    password: 'Patient123!',
    role: 'Patient',
    defaultRoute: '/patient/dashboard',
    user: {
      id: 'usr_pat_05',
      name: 'Abebe Kebede',
      role: 'Patient',
      email: 'patient@medicare.com',
      hospital: 'MediCare Outpatient Services',
      title: 'Patient Member (#MED-84920)',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      status: 'online',
    },
  },
};

export const ROLE_DEFAULT_ROUTES: Record<UserRole, AppRoute> = {
  Administrator: '/admin/dashboard',
  Doctor: '/doctor/dashboard',
  Nurse: '/nurse/dashboard',
  Receptionist: '/receptionist/dashboard',
  Patient: '/patient/dashboard',
};

export function getRoleFromRoute(path: string): UserRole | null {
  if (path.startsWith('/admin')) return 'Administrator';
  if (path.startsWith('/doctor')) return 'Doctor';
  if (path.startsWith('/nurse')) return 'Nurse';
  if (path.startsWith('/receptionist')) return 'Receptionist';
  if (path.startsWith('/patient')) return 'Patient';
  return null;
}
