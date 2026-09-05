import type {
  DashboardStats,
  TrendDataPoint,
  DepartmentStat,
  CalendarScheduleItem,
} from '../types/dashboard';

/**
 * MediCare Administrator Dashboard Data Service
 * Designed to cleanly swap between local demonstration state and backend REST API
 */

export const DEMO_DASHBOARD_STATS: DashboardStats = {
  totalPatients: 600,
  patientsGrowth: '+12% this month',
  todayAppointments: 35,
  completedAppointments: 12,
  upcomingAppointments: 23,
  availableBeds: 41,
  totalBeds: 120,
  admittedToday: 3,
  totalRevenue: 65500,
  currency: 'ETB',
  paymentsCleared: '94% payments cleared',
};

export const DEMO_TRENDS_7D: TrendDataPoint[] = [
  { day: 'Mon', appointments: 28, patientRegistrations: 14, completedConsultations: 24 },
  { day: 'Tue', appointments: 35, patientRegistrations: 18, completedConsultations: 30 },
  { day: 'Wed', appointments: 32, patientRegistrations: 15, completedConsultations: 28 },
  { day: 'Thu', appointments: 40, patientRegistrations: 22, completedConsultations: 36 },
  { day: 'Fri', appointments: 48, patientRegistrations: 26, completedConsultations: 42 },
  { day: 'Sat', appointments: 30, patientRegistrations: 12, completedConsultations: 26 },
  { day: 'Sun', appointments: 18, patientRegistrations: 8, completedConsultations: 16 },
];

export const DEMO_TRENDS_30D: TrendDataPoint[] = [
  { day: 'Week 1', appointments: 180, patientRegistrations: 95, completedConsultations: 165 },
  { day: 'Week 2', appointments: 215, patientRegistrations: 110, completedConsultations: 198 },
  { day: 'Week 3', appointments: 240, patientRegistrations: 128, completedConsultations: 220 },
  { day: 'Week 4', appointments: 265, patientRegistrations: 142, completedConsultations: 248 },
];

export const DEMO_DEPARTMENTS: DepartmentStat[] = [
  { name: 'General Medicine', patientCount: 120, color: '#2563eb', percentage: 35.3 },
  { name: 'Orthopedics', patientCount: 80, color: '#0284c7', percentage: 23.5 },
  { name: 'Cardiology', patientCount: 65, color: '#0d9488', percentage: 19.1 },
  { name: 'Pediatrics', patientCount: 45, color: '#8b5cf6', percentage: 13.2 },
  { name: 'Gynecology', patientCount: 30, color: '#f59e0b', percentage: 8.9 },
];

export const DEMO_SCHEDULE_EVENTS: Record<string, CalendarScheduleItem[]> = {
  // Keyed by YYYY-MM-DD or default
  default: [
    {
      id: 'sch-1',
      time: '08:00',
      title: 'Morning Staff Meeting',
      doctor: 'Dr. Hana Mengistu & Heads',
      department: 'Executive Boardroom',
      room: 'Conference Hall A',
      type: 'meeting',
      date: '2026-09-22',
    },
    {
      id: 'sch-2',
      time: '10:00',
      title: 'Cardiology Consultation',
      doctor: 'Dr. Olivia Martinez',
      department: 'Cardiology',
      room: 'Suite 302',
      type: 'consultation',
      date: '2026-09-22',
    },
    {
      id: 'sch-3',
      time: '11:00',
      title: 'Orthopedics Consultation',
      doctor: 'Dr. Michael Anderson',
      department: 'Orthopedics',
      room: 'Clinic Room 4',
      type: 'consultation',
      date: '2026-09-22',
    },
    {
      id: 'sch-4',
      time: '13:00',
      title: 'Training Session',
      doctor: 'Clinical Education Dept',
      department: 'Medical Education',
      room: 'Auditorium 2',
      type: 'training',
      date: '2026-09-22',
    },
    {
      id: 'sch-5',
      time: '15:00',
      title: 'Patient Review',
      doctor: 'Dr. Dawit Bekele & Team',
      department: 'ICU & Inpatient',
      room: 'Ward 3B',
      type: 'review',
      date: '2026-09-22',
    },
  ],
};

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    // Simulated async fetch to mimic API call
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...DEMO_DASHBOARD_STATS }), 100);
    });
  },

  async getTotalTrends(period: '7d' | '30d' = '7d'): Promise<TrendDataPoint[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(period === '7d' ? [...DEMO_TRENDS_7D] : [...DEMO_TRENDS_30D]);
      }, 100);
    });
  },

  async getPatientsByDepartment(): Promise<{ departments: DepartmentStat[]; total: number }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const total = DEMO_DEPARTMENTS.reduce((sum, d) => sum + d.patientCount, 0);
        resolve({
          departments: [...DEMO_DEPARTMENTS],
          total,
        });
      }, 100);
    });
  },

  async getScheduleForDate(dateStr: string): Promise<CalendarScheduleItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = DEMO_SCHEDULE_EVENTS[dateStr] || DEMO_SCHEDULE_EVENTS['default'];
        resolve([...items]);
      }, 80);
    });
  },
};
