import React, { useState } from 'react';
import { UserPlus, ArrowLeft, Info, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import type { AppRoute } from '../../types';
import { receptionistDashboardService } from '../../services/receptionistDashboardService';
import { QuickRegisterModal } from '../../components/receptionist/QuickRegisterModal';
import { ReceptionistRecentPatientsTable } from '../../components/receptionist/ReceptionistRecentPatientsTable';
import { PatientDetailModal } from '../../components/doctor/PatientDetailModal';
import { ALL_PATIENTS } from '../../services/doctorDashboardService';
import type { PatientDetailedRecord } from '../../types/doctor';

interface ReceptionistRegisterPatientPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const ReceptionistRegisterPatientPage: React.FC<ReceptionistRegisterPatientPageProps> = ({
  onNavigate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recentPatients, setRecentPatients] = useState(() => {
    return [
      {
        id: 'rec-reg-01',
        patientId: 'MC-2026-0894',
        name: 'Ruth Yohannes',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        registrationDate: 'Today, 09:18 AM',
        phone: '+251 91 765 4321',
        gender: 'Female' as const,
        age: 8,
        bloodGroup: 'O+',
        address: 'Bole Subcity, Woreda 03',
        emergencyContact: 'Yohannes (Father)',
        assignedDoctor: 'Dr. Aster Paulos',
        department: 'Pediatrics',
      },
      {
        id: 'rec-reg-02',
        patientId: 'MC-2026-0893',
        name: 'Ephrem Assefa',
        avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=120&auto=format&fit=crop&q=80',
        registrationDate: 'Today, 08:52 AM',
        phone: '+251 92 112 3344',
        gender: 'Male' as const,
        age: 39,
        bloodGroup: 'A+',
        address: 'Yeka Subcity, House 412',
        emergencyContact: 'Hanna (Spouse)',
        assignedDoctor: 'Dr. Biruk Assefa',
        department: 'Cardiology',
      },
      {
        id: 'rec-reg-03',
        patientId: 'MC-2026-0892',
        name: 'Liya Kassa',
        avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=120&auto=format&fit=crop&q=80',
        registrationDate: 'Today, 08:20 AM',
        phone: '+251 93 998 7766',
        gender: 'Female' as const,
        age: 26,
        bloodGroup: 'B+',
        address: 'Kirkos Subcity, Kebele 14',
        emergencyContact: 'Rahel (Sister)',
        assignedDoctor: 'Dr. Aster Paulos',
        department: 'Maternity & Women',
      },
    ];
  });

  const [selectedPatient, setSelectedPatient] = useState<PatientDetailedRecord | null>(null);

  const handleRegister = async (data: any) => {
    const newPat = await receptionistDashboardService.registerPatient(data);
    setRecentPatients((prev) => [newPat, ...prev]);
  };

  const handleViewPatient = (patientId: string) => {
    const record = ALL_PATIENTS.find((p) => p.patientId === patientId);
    if (record) {
      setSelectedPatient(record);
    } else {
      const recent = recentPatients.find((r) => r.patientId === patientId);
      if (recent) {
        setSelectedPatient({
          patientId: recent.patientId,
          name: recent.name,
          age: recent.age,
          gender: recent.gender,
          bloodGroup: recent.bloodGroup || 'O+',
          phone: recent.phone,
          email: 'patient@medicare.com',
          address: recent.address || 'Addis Ababa',
          city: 'Addis Ababa',
          emergencyContact: {
            name: recent.emergencyContact || 'Family',
            phone: recent.phone,
            relationship: 'Emergency Contact',
          },
          insuranceProvider: 'Ethiopian Health Insurance Agency',
          policyNumber: `EHIA-${recent.patientId}`,
          registeredDate: recent.registrationDate,
          avatarUrl: recent.avatarUrl,
          allergies: ['None'],
          chronicConditions: ['None'],
          currentMedications: [],
          recentConsultations: [],
          labResults: [],
        });
      }
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Patient Intake & Registration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Admit new patients, generate unique medical records, and issue front-desk registration
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/receptionist/dashboard' as AppRoute)}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Roadmap / Notice Card */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-white border border-blue-200/80 rounded-2xl p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">
                  Admissions Intake Desk
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800">
                  Ready for Intake
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Use the front-desk quick intake tool below to instantly enroll new walk-ins and outpatient visitors. Full multi-step digital KYC registration with document upload and physical card printing will arrive in dedicated upcoming steps.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0 flex items-center gap-2 self-start md:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Launch Quick Intake</span>
          </button>
        </div>
      </div>

      {/* Recently Registered Patients */}
      <ReceptionistRecentPatientsTable
        patients={recentPatients}
        onViewPatient={handleViewPatient}
        onRegisterNew={() => setIsModalOpen(true)}
      />

      <QuickRegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegister={handleRegister}
      />

      {selectedPatient && (
        <PatientDetailModal
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
          patient={selectedPatient}
        />
      )}
    </div>
  );
};
