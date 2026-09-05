import type { DoctorScheduleItem } from '../types/dashboard';

export const DEMO_DOCTORS_SCHEDULE: DoctorScheduleItem[] = [
  {
    id: 'doc-1',
    name: 'Dr. Hana Mengistu',
    department: 'General Medicine',
    status: 'Available',
    workingHours: '09:00 AM - 12:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    specialization: 'Chief Internal Physician',
    room: 'Consultation Suite 101',
    phone: '+251 91 100 2001',
  },
  {
    id: 'doc-2',
    name: 'Dr. Michael Anderson',
    department: 'Orthopedics',
    status: 'Unavailable',
    workingHours: '10:00 AM - 01:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    specialization: 'Orthopedic & Joint Surgeon',
    room: 'Ortho Clinic 4',
    phone: '+251 91 100 2002',
  },
  {
    id: 'doc-3',
    name: 'Dr. Olivia Martinez',
    department: 'Cardiology',
    status: 'Available',
    workingHours: '10:00 AM - 01:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813680-e8838b0051a6?w=150&auto=format&fit=crop&q=80',
    specialization: 'Interventional Cardiologist',
    room: 'Cardio Suite 302',
    phone: '+251 91 100 2003',
  },
  {
    id: 'doc-4',
    name: 'Dr. Emily Carter',
    department: 'Pediatrics',
    status: 'Available',
    workingHours: '02:00 PM - 04:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=150&auto=format&fit=crop&q=80',
    specialization: 'Senior Pediatric Specialist',
    room: 'Pediatric Care 2',
    phone: '+251 91 100 2004',
  },
  {
    id: 'doc-5',
    name: 'Dr. Dawit Bekele',
    department: 'Emergency Medicine',
    status: 'Available',
    workingHours: '08:00 AM - 04:00 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    specialization: 'Trauma & Emergency Specialist',
    room: 'ER Trauma Bay 1',
    phone: '+251 91 100 2005',
  },
];

export const doctorService = {
  async getDoctorsSchedule(): Promise<DoctorScheduleItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...DEMO_DOCTORS_SCHEDULE]), 80);
    });
  },
};
