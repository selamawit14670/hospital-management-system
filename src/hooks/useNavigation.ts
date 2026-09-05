import { useState, useEffect, useCallback } from 'react';
import type { AppRoute } from '../types';

export interface RouteMeta {
  title: string;
  subtitle: string;
  category: string;
}

export const routeTitles: Record<string, RouteMeta> = {
  // Authentication
  '/login': {
    title: 'Staff & Patient Sign In',
    subtitle: 'Access your hospital workspace securely',
    category: 'Portal',
  },

  // Administrator Workspace
  '/admin/dashboard': {
    title: 'Hospital Central Command',
    subtitle: 'Live clinical metrics, inpatient census, and outpatient operations',
    category: 'Admin Command',
  },
  '/admin/appointments': {
    title: 'Hospital Appointments',
    subtitle: 'Manage outpatient, emergency, and specialist hospital schedules',
    category: 'Admin Operations',
  },
  '/admin/doctors': {
    title: 'Doctors & Medical Staff',
    subtitle: 'Hospital physicians, surgeons, and department specialist credentials',
    category: 'Personnel',
  },
  '/admin/patients': {
    title: 'Master Patient Registry',
    subtitle: 'Comprehensive patient directory, admissions, and central medical cards',
    category: 'Clinical Records',
  },
  '/admin/departments': {
    title: 'Medical Departments & Wards',
    subtitle: 'Clinical divisions, surgical suites, and facility bed capacity',
    category: 'Facilities',
  },
  '/admin/doctor-schedule': {
    title: "Physician Shift Schedule",
    subtitle: 'Weekly shift rosters, surgery allocations, and on-call physicians',
    category: 'Personnel',
  },
  '/admin/payment': {
    title: 'Financial & Billing Center',
    subtitle: 'Invoice processing, insurance claim settlements, and hospital revenue',
    category: 'Finance',
  },
  '/admin/inventory': {
    title: 'Pharmacy & Stock Inventory',
    subtitle: 'Pharmaceutical supplies, surgical instruments, and stock alerts',
    category: 'Supply Chain',
  },
  '/admin/messages': {
    title: 'Hospital Communications',
    subtitle: 'Central internal dispatches and administrative memos',
    category: 'Communications',
  },

  // Doctor Workspace
  '/doctor/dashboard': {
    title: 'Doctor Clinical Workspace',
    subtitle: 'Today\'s clinical patient list, active triage, and consultation status',
    category: 'Clinical',
  },
  '/doctor/patients': {
    title: 'My Assigned Patients',
    subtitle: 'Patients under your active care and ongoing clinical supervision',
    category: 'Clinical',
  },
  '/doctor/appointments': {
    title: 'Doctor Appointments',
    subtitle: 'Your scheduled consultations, checkups, and surgical operations',
    category: 'Clinical',
  },
  '/doctor/consultations': {
    title: 'Patient Consultations',
    subtitle: 'Clinical diagnoses, clinical notes, and treatment histories',
    category: 'Clinical',
  },
  '/doctor/medical-records': {
    title: 'Medical Records (EHR)',
    subtitle: 'Diagnostic histories, allergy profiles, and surgical summaries',
    category: 'EHR',
  },
  '/doctor/prescriptions': {
    title: 'e-Prescriptions',
    subtitle: 'Formulate, sign, and dispense digital pharmaceutical prescriptions',
    category: 'Pharmacy',
  },
  '/doctor/lab-results': {
    title: 'Pathology & Lab Diagnostics',
    subtitle: 'Blood panels, imaging reports, urinalysis, and biopsy findings',
    category: 'Diagnostics',
  },
  '/doctor/consultations/new': {
    title: 'New Clinical Consultation',
    subtitle: 'Active consultation documentation session, patient assessment, and SOAP notes',
    category: 'Clinical',
  },
  '/doctor/settings': {
    title: 'Doctor Preferences',
    subtitle: 'Consultation slot lengths, clinical notification alerts, and digital signature',
    category: 'Settings',
  },

  // Nurse Workspace
  '/nurse/dashboard': {
    title: 'Nurse Station Overview',
    subtitle: 'Inpatient ward status, vital sign alerts, and nurse handovers',
    category: 'Nursing',
  },
  '/nurse/patients': {
    title: 'Ward Inpatients',
    subtitle: 'Patients admitted to your assigned ward and bed allocations',
    category: 'Nursing',
  },
  '/nurse/appointments': {
    title: 'Clinic Appointments Queue',
    subtitle: 'Patient check-in verification and examination preparation',
    category: 'Nursing',
  },
  '/nurse/vital-signs': {
    title: 'Patient Vital Signs',
    subtitle: 'Blood pressure, pulse, SpO2, temperature, and respiration tracking',
    category: 'Vitals & Triage',
  },
  '/nurse/nursing-records': {
    title: 'Nursing Care Notes',
    subtitle: 'Shift handover logs, medication administration records (MAR), and care plans',
    category: 'Nursing',
  },
  '/nurse/admissions': {
    title: 'Bed Census & Admissions',
    subtitle: 'Manage ward bed allocations, room transfers, and discharge prep',
    category: 'Inpatient',
  },
  '/nurse/medical-records': {
    title: 'Clinical Chart Records',
    subtitle: 'Review doctor treatment protocols and nursing clinical observations',
    category: 'EHR',
  },
  '/nurse/settings': {
    title: 'Nurse Station Settings',
    subtitle: 'Ward station preferences, vitals alert thresholds, and handover notes config',
    category: 'Settings',
  },

  // Receptionist Workspace
  '/receptionist/dashboard': {
    title: 'Front Desk Terminal',
    subtitle: 'Daily patient arrivals, appointment triage, and registration queue',
    category: 'Front Desk',
  },
  '/receptionist/patients': {
    title: 'Patient Directory',
    subtitle: 'Look up registered patients, contact info, and insurance policies',
    category: 'Front Desk',
  },
  '/receptionist/register-patient': {
    title: 'New Patient Registration',
    subtitle: 'Register incoming patients and issue digital hospital ID cards',
    category: 'Registration',
  },
  '/receptionist/appointments': {
    title: 'Appointment Booking Desk',
    subtitle: 'Schedule consultations, check doctor availability, and confirm bookings',
    category: 'Scheduling',
  },
  '/receptionist/payment': {
    title: 'Cashier & Payment Counter',
    subtitle: 'Collect consultation fees, issue copay receipts, and verify insurance',
    category: 'Billing',
  },
  '/receptionist/patient-cards': {
    title: 'Digital Patient Cards',
    subtitle: 'Scan and issue NFC / QR digital identity cards for patients',
    category: 'Identification',
  },

  // Patient Workspace
  '/patient/dashboard': {
    title: 'Patient Health Portal',
    subtitle: 'Your personal health summary, upcoming visits, and active medications',
    category: 'My Health',
  },
  '/patient/digital-card': {
    title: 'My Digital Health Card',
    subtitle: 'Personal medical emergency card with verified QR verification',
    category: 'My Health',
  },
  '/patient/appointments': {
    title: 'My Hospital Appointments',
    subtitle: 'View upcoming consultations and schedule visits with your doctors',
    category: 'My Visits',
  },
  '/patient/medical-records': {
    title: 'My Medical Records',
    subtitle: 'Personal health history, immunization logs, and physician notes',
    category: 'My Health',
  },
  '/patient/prescriptions': {
    title: 'My Medications & Prescriptions',
    subtitle: 'Active pharmacy prescriptions, dosage guides, and refills',
    category: 'Pharmacy',
  },
  '/patient/lab-results': {
    title: 'My Diagnostic Lab Results',
    subtitle: 'Blood tests, radiology scans, and laboratory diagnostic reports',
    category: 'Diagnostics',
  },
  '/patient/profile': {
    title: 'My Patient Profile',
    subtitle: 'Personal contact details, emergency contacts, and insurance details',
    category: 'Account',
  },

  // Legacy fallback routes
  '/dashboard': {
    title: 'Dashboard Overview',
    subtitle: 'Welcome to MediCare Hospital Central Command',
    category: 'Analytics',
  },
  '/appointments': {
    title: 'Appointments',
    subtitle: 'Manage outpatient, emergency, and specialist schedules',
    category: 'Clinical',
  },
  '/doctors': {
    title: 'Doctors & Staff',
    subtitle: 'Hospital physicians, surgeons, and medical department specialists',
    category: 'Personnel',
  },
  '/patients': {
    title: 'Patients Registry',
    subtitle: 'Comprehensive patient directory, admissions, and health records',
    category: 'Clinical',
  },
};

export function useNavigation(initialRoute?: AppRoute) {
  const [currentPath, setCurrentPath] = useState<AppRoute>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname as AppRoute;
      if (path && (path in routeTitles || path === '/login')) {
        return path;
      }
    }
    return initialRoute || '/login';
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as AppRoute;
      if (path && (path in routeTitles || path === '/login')) {
        setCurrentPath(path);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: AppRoute) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
    setIsMobileMenuOpen(false);
  }, []);

  const toggleSidebarCollapse = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return {
    currentPath,
    navigate,
    routeInfo: routeTitles[currentPath] || {
      title: 'MediCare Workspace',
      subtitle: 'Hospital Management System',
      category: 'Healthcare',
    },
    isSidebarCollapsed,
    toggleSidebarCollapse,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  };
}
