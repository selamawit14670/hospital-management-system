import React, { useEffect } from 'react';
import type { AppRoute } from '../types';
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { RoleGuard } from '../components/navigation/RoleGuard';
import { RolePagePlaceholder } from '../components/common/RolePagePlaceholder';
import { useAuth } from '../context/AuthContext';

// Existing Admin Pages
import { DashboardPage } from '../pages/DashboardPage';
import { AppointmentsPage } from '../pages/AppointmentsPage';
import { DoctorsPage } from '../pages/DoctorsPage';
import { PatientsPage } from '../pages/PatientsPage';
import { DepartmentsPage } from '../pages/DepartmentsPage';
import { DoctorSchedulePage } from '../pages/DoctorSchedulePage';
import { PaymentPage } from '../pages/PaymentPage';
import { InventoryPage } from '../pages/InventoryPage';
import { MessagesPage } from '../pages/MessagesPage';
import { LoginPage } from '../pages/LoginPage';

// Doctor Pages
import { DoctorDashboardPage } from '../pages/DoctorDashboardPage';
import { DoctorPatientsPage } from '../pages/doctor/DoctorPatientsPage';
import { DoctorAppointmentsPage } from '../pages/doctor/DoctorAppointmentsPage';
import { DoctorConsultationsPage } from '../pages/doctor/DoctorConsultationsPage';
import { DoctorConsultationNewPage } from '../pages/doctor/DoctorConsultationNewPage';
import { DoctorMedicalRecordsPage } from '../pages/doctor/DoctorMedicalRecordsPage';
import { DoctorPrescriptionsPage } from '../pages/doctor/DoctorPrescriptionsPage';
import { DoctorLabResultsPage } from '../pages/doctor/DoctorLabResultsPage';
import { DoctorSettingsPage } from '../pages/doctor/DoctorSettingsPage';

// Nurse Pages
import { NurseDashboardPage } from '../pages/NurseDashboardPage';
import { NursePatientsPage } from '../pages/nurse/NursePatientsPage';
import { NurseAppointmentsPage } from '../pages/nurse/NurseAppointmentsPage';
import { NurseVitalSignsPage } from '../pages/nurse/NurseVitalSignsPage';
import { NurseNursingRecordsPage } from '../pages/nurse/NurseNursingRecordsPage';
import { NurseAdmissionsPage } from '../pages/nurse/NurseAdmissionsPage';
import { NurseMedicalRecordsPage } from '../pages/nurse/NurseMedicalRecordsPage';
import { NurseSettingsPage } from '../pages/nurse/NurseSettingsPage';

// Receptionist Pages
import { ReceptionistDashboardPage } from '../pages/ReceptionistDashboardPage';
import { ReceptionistPatientsPage } from '../pages/receptionist/ReceptionistPatientsPage';
import { ReceptionistRegisterPatientPage } from '../pages/receptionist/ReceptionistRegisterPatientPage';
import { ReceptionistAppointmentsPage } from '../pages/receptionist/ReceptionistAppointmentsPage';
import { ReceptionistPaymentPage } from '../pages/receptionist/ReceptionistPaymentPage';
import { ReceptionistPatientCardsPage } from '../pages/receptionist/ReceptionistPatientCardsPage';
import { ReceptionistSettingsPage } from '../pages/receptionist/ReceptionistSettingsPage';

// Patient Pages
import { PatientDashboardPage } from '../pages/PatientDashboardPage';

interface AppRoutesProps {
  currentPath: AppRoute;
  onNavigate: (path: AppRoute) => void;
  isSidebarCollapsed: boolean;
  onToggleSidebarCollapse: () => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({
  currentPath,
  onNavigate,
  isSidebarCollapsed,
  onToggleSidebarCollapse,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
}) => {
  const { isAuthenticated, isLoading, getDefaultRoute } = useAuth();

  // Redirect to login if accessing protected route while unauthenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated && currentPath !== '/login') {
      onNavigate('/login');
    }
  }, [isLoading, isAuthenticated, currentPath, onNavigate]);

  // Handle generic /dashboard legacy path by redirecting to role dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated && (currentPath === '/dashboard' || currentPath === ('/' as AppRoute))) {
      const target = getDefaultRoute();
      if (target !== currentPath) {
        onNavigate(target);
      }
    }
  }, [isLoading, isAuthenticated, currentPath, getDefaultRoute, onNavigate]);

  // If route is /login, render using AuthLayout
  if (currentPath === '/login') {
    return (
      <AuthLayout>
        <LoginPage onNavigate={onNavigate} />
      </AuthLayout>
    );
  }

  // Render specific page inside the authenticated MainLayout shell with RoleGuard
  const renderPageComponent = () => {
    // Administrator Workspace Pages
    switch (currentPath) {
      case '/admin/dashboard':
      case '/dashboard':
        return <DashboardPage onNavigate={onNavigate} />;
      case '/admin/appointments':
      case '/appointments':
        return <AppointmentsPage />;
      case '/admin/doctors':
      case '/doctors':
        return <DoctorsPage />;
      case '/admin/patients':
      case '/patients':
        return <PatientsPage />;
      case '/admin/departments':
      case '/departments':
        return <DepartmentsPage />;
      case '/admin/doctor-schedule':
      case '/doctor-schedule':
        return <DoctorSchedulePage />;
      case '/admin/payment':
      case '/payment':
        return <PaymentPage />;
      case '/admin/inventory':
      case '/inventory':
        return <InventoryPage />;
      case '/admin/messages':
      case '/messages':
        return <MessagesPage />;

      // Doctor Workspace Pages
      case '/doctor/dashboard':
        return <DoctorDashboardPage onNavigate={onNavigate} />;
      case '/doctor/patients':
        return <DoctorPatientsPage onNavigate={onNavigate} />;
      case '/doctor/appointments':
        return <DoctorAppointmentsPage onNavigate={onNavigate} />;
      case '/doctor/consultations':
        return <DoctorConsultationsPage onNavigate={onNavigate} />;
      case '/doctor/consultations/new':
        return <DoctorConsultationNewPage onNavigate={onNavigate} />;
      case '/doctor/medical-records':
        return <DoctorMedicalRecordsPage onNavigate={onNavigate} />;
      case '/doctor/prescriptions':
        return <DoctorPrescriptionsPage onNavigate={onNavigate} />;
      case '/doctor/lab-results':
        return <DoctorLabResultsPage onNavigate={onNavigate} />;
      case '/doctor/settings':
        return <DoctorSettingsPage onNavigate={onNavigate} />;

      // Nurse Workspace Pages
      case '/nurse/dashboard':
        return <NurseDashboardPage onNavigate={onNavigate} />;
      case '/nurse/patients':
        return <NursePatientsPage onNavigate={onNavigate} />;
      case '/nurse/appointments':
        return <NurseAppointmentsPage onNavigate={onNavigate} />;
      case '/nurse/vital-signs':
        return <NurseVitalSignsPage onNavigate={onNavigate} />;
      case '/nurse/nursing-records':
        return <NurseNursingRecordsPage onNavigate={onNavigate} />;
      case '/nurse/admissions':
        return <NurseAdmissionsPage onNavigate={onNavigate} />;
      case '/nurse/medical-records':
        return <NurseMedicalRecordsPage onNavigate={onNavigate} />;
      case '/nurse/settings':
        return <NurseSettingsPage onNavigate={onNavigate} />;

      // Receptionist Workspace Pages
      case '/receptionist/dashboard':
        return <ReceptionistDashboardPage onNavigate={onNavigate} />;
      case '/receptionist/patients':
        return <ReceptionistPatientsPage onNavigate={onNavigate} />;
      case '/receptionist/register-patient':
        return <ReceptionistRegisterPatientPage onNavigate={onNavigate} />;
      case '/receptionist/appointments':
        return <ReceptionistAppointmentsPage onNavigate={onNavigate} />;
      case '/receptionist/payment':
        return <ReceptionistPaymentPage onNavigate={onNavigate} />;
      case '/receptionist/patient-cards':
        return <ReceptionistPatientCardsPage onNavigate={onNavigate} />;
      case '/receptionist/settings':
        return <ReceptionistSettingsPage onNavigate={onNavigate} />;

      // Patient Workspace Pages
      case '/patient/dashboard':
        return <PatientDashboardPage onNavigate={onNavigate} />;
      case '/patient/digital-card':
      case '/patient/appointments':
      case '/patient/medical-records':
      case '/patient/prescriptions':
      case '/patient/lab-results':
      case '/patient/profile':
        return <RolePagePlaceholder path={currentPath} role="Patient" onNavigate={onNavigate} />;

      default:
        return <RolePagePlaceholder path={currentPath} role="Administrator" onNavigate={onNavigate} />;
    }
  };

  return (
    <RoleGuard currentPath={currentPath} onNavigate={onNavigate}>
      <MainLayout
        currentPath={currentPath}
        onNavigate={onNavigate}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebarCollapse={onToggleSidebarCollapse}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={onToggleMobileMenu}
        onCloseMobileMenu={onCloseMobileMenu}
      >
        {renderPageComponent()}
      </MainLayout>
    </RoleGuard>
  );
};
