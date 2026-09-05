import type { UpcomingAppointment } from '../types/dashboard';

export const DEMO_UPCOMING_APPOINTMENTS: UpcomingAppointment[] = [
  {
    id: 'apt-1',
    patientName: 'Abebe Kebede',
    patientId: 'MC-000001',
    doctorName: 'Dr. Hana Mengistu',
    department: 'Internal Medicine',
    reason: '2-Week Blood Pressure Follow-up & Evaluation',
    time: '10:30 AM',
    date: 'Today',
    status: 'Scheduled',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'apt-2',
    patientName: 'Sara Desta',
    patientId: 'MC-000002',
    doctorName: 'Dr. Olivia Martinez',
    department: 'Cardiology',
    reason: 'Echocardiogram & Cardiac Stress Evaluation',
    time: '11:15 AM',
    date: 'Today',
    status: 'Confirmed',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'apt-3',
    patientName: 'Dawit Bekele',
    patientId: 'MC-000003',
    doctorName: 'Dr. Michael Anderson',
    department: 'Orthopedics',
    reason: 'Post-Op Knee Ligament Assessment & Physical Therapy',
    time: '01:45 PM',
    date: 'Today',
    status: 'Pending',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'apt-4',
    patientName: 'Meron Alemu',
    patientId: 'MC-000004',
    doctorName: 'Dr. Emily Carter',
    department: 'Pediatrics',
    reason: 'Routine Childhood Immunization & Developmental Check',
    time: '02:30 PM',
    date: 'Today',
    status: 'Confirmed',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'apt-5',
    patientName: 'Almaz Tadesse',
    patientId: 'MC-000005',
    doctorName: 'Dr. Hana Mengistu',
    department: 'General Medicine',
    reason: 'Type 2 Diabetes Glycemic Control Review',
    time: '04:00 PM',
    date: 'Today',
    status: 'Completed',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  },
];

export const appointmentService = {
  async getUpcomingAppointments(): Promise<UpcomingAppointment[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...DEMO_UPCOMING_APPOINTMENTS]), 80);
    });
  },
};
