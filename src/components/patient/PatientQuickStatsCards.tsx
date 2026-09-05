import React from 'react';
import { Calendar, Pill, FlaskConical, FileText, ChevronRight } from 'lucide-react';
import type { PatientQuickStats } from '../../types/patient';

interface PatientQuickStatsCardsProps {
  stats: PatientQuickStats;
  onNavigateSection?: (sectionId: string) => void;
}

export const PatientQuickStatsCards: React.FC<PatientQuickStatsCardsProps> = ({
  stats,
  onNavigateSection,
}) => {
  const cards = [
    {
      id: 'appointments-stat',
      title: 'Upcoming Appointments',
      count: stats.upcomingAppointments,
      subtitle: stats.nextAppointmentSummary,
      badge: 'Tomorrow',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-100',
      icon: Calendar,
      iconBg: 'bg-blue-500 text-white shadow-blue-500/20',
      accentBorder: 'hover:border-blue-300',
      targetSection: 'upcoming-appointment-section',
    },
    {
      id: 'prescriptions-stat',
      title: 'Active Prescriptions',
      count: stats.activePrescriptions,
      subtitle: stats.activePrescriptionNote,
      badge: '1 Refill Due',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-100',
      icon: Pill,
      iconBg: 'bg-emerald-500 text-white shadow-emerald-500/20',
      accentBorder: 'hover:border-emerald-300',
      targetSection: 'prescriptions-section',
    },
    {
      id: 'labs-stat',
      title: 'Lab Results',
      count: stats.labResults,
      subtitle: stats.latestLabSummary,
      badge: 'All Normal',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      icon: FlaskConical,
      iconBg: 'bg-indigo-500 text-white shadow-indigo-500/20',
      accentBorder: 'hover:border-indigo-300',
      targetSection: 'lab-results-section',
    },
    {
      id: 'records-stat',
      title: 'Medical Records',
      count: stats.medicalRecords,
      subtitle: stats.lastRecordSummary,
      badge: 'EHR Synced',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-100',
      icon: FileText,
      iconBg: 'bg-purple-500 text-white shadow-purple-500/20',
      accentBorder: 'hover:border-purple-300',
      targetSection: 'medical-records-section',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            id={card.id}
            onClick={() => onNavigateSection?.(card.targetSection)}
            className={`bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between ${card.accentBorder}`}
          >
            <div>
              {/* Header row: Icon & Status Pill */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm ${card.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>

              {/* Stat Metric */}
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {card.count}
                </p>
                <h3 className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>
              </div>
            </div>

            {/* Footer Summary */}
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="truncate max-w-[200px]">{card.subtitle}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
