import type { RecentPatient } from '../types/dashboard';

export const DEMO_RECENT_PATIENTS: RecentPatient[] = [
  {
    id: 'pat-1',
    patientId: 'MC-000001',
    name: 'Abebe Kebede',
    gender: 'Male',
    age: 38,
    bloodGroup: 'O+',
    phone: '+251 91 123 4567',
    registeredAt: 'Today, 09:15 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    emergencyContact: '+251 91 987 6543 (Spouse)',
    address: 'Bole Subcity, Woreda 03, Addis Ababa',
  },
  {
    id: 'pat-2',
    patientId: 'MC-000002',
    name: 'Sara Desta',
    gender: 'Female',
    age: 29,
    bloodGroup: 'A+',
    phone: '+251 92 345 6789',
    registeredAt: 'Today, 08:40 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    emergencyContact: '+251 92 876 5432 (Brother)',
    address: 'Yeka Subcity, Woreda 08, Addis Ababa',
  },
  {
    id: 'pat-3',
    patientId: 'MC-000003',
    name: 'Dawit Bekele',
    gender: 'Male',
    age: 45,
    bloodGroup: 'B+',
    phone: '+251 93 456 7890',
    registeredAt: 'Yesterday, 04:20 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    emergencyContact: '+251 93 765 4321 (Daughter)',
    address: 'Kirkos Subcity, Woreda 02, Addis Ababa',
  },
  {
    id: 'pat-4',
    patientId: 'MC-000004',
    name: 'Meron Alemu',
    gender: 'Female',
    age: 34,
    bloodGroup: 'AB+',
    phone: '+251 94 567 8901',
    registeredAt: 'Yesterday, 02:10 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    emergencyContact: '+251 94 654 3210 (Mother)',
    address: 'Arada Subcity, Woreda 05, Addis Ababa',
  },
  {
    id: 'pat-5',
    patientId: 'MC-000005',
    name: 'Almaz Tadesse',
    gender: 'Female',
    age: 52,
    bloodGroup: 'O-',
    phone: '+251 91 678 9012',
    registeredAt: 'Sep 3, 11:30 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    emergencyContact: '+251 91 543 2109 (Son)',
    address: 'Nifas Silk-Lafto, Addis Ababa',
  },
];

export const patientService = {
  async getRecentlyRegisteredPatients(): Promise<RecentPatient[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...DEMO_RECENT_PATIENTS]), 80);
    });
  },

  async getPatientById(id: string): Promise<RecentPatient | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = DEMO_RECENT_PATIENTS.find((p) => p.patientId === id || p.id === id);
        resolve(found);
      }, 50);
    });
  },
};
