import React from 'react';
import { Users, Clock, BedDouble, CheckSquare, AlertTriangle, Activity } from 'lucide-react';
import type { NurseStats } from '../../types/nurse';
import type { AppRoute } from '../../types';

interface NurseStatsCardsProps {
  stats: NurseStats;
  onNavigate?: (path: AppRoute) => void;
}

export const NurseStatsCards: React.FC<NurseStatsCardsProps> = ({ stats, onNavigate }) => {
  const cards = [
    {
      id: 'assigned-patients',
      label: 'Assigned Patients',
      value: stats.assignedPatients,
      subtitle: 'Inpatient ward beds occupied',
      change: '+2 from morning shift',
      changeColor: 'text-blue-600',
      icon: Users,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
      borderAccent: 'border-slate-200/90',
      route: '/nurse/patients' as AppRoute,
    },
    {
      id: 'patients-waiting',
      label: 'Patients Waiting',
      value: stats.patientsWaiting,
      subtitle: 'Triage queue & check-ins',
      change: 'Avg wait: 14 mins',
      changeColor: 'text-amber-600',
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
      borderAccent: 'border-slate-200/90',
      route: '/nurse/appointments' as AppRoute,
    },
    {
      id: 'admissions-today',
      label: 'Admissions Today',
      value: stats.admissionsToday,
      subtitle: 'New bed transfers & intake',
      change: '1 ICU step-down',
      changeColor: 'text-emerald-600',
      icon: BedDouble,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      borderAccent: 'border-slate-200/90',
      route: '/nurse/admissions' as AppRoute,
    },
    {
      id: 'tasks-pending',
      label: 'Tasks Pending',
      value: stats.tasksPending,
      subtitle: 'Medication & vitals schedule',
      change: '2 high priority due',
      changeColor: 'text-rose-600',
      icon: CheckSquare,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      borderAccent: 'border-slate-200/90',
      route: '/nurse/nursing-records' as AppRoute,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={() => onNavigate?.(card.route)}
            className={`bg-white rounded-2xl border ${card.borderAccent} p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  {card.label}
                </span>
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {card.value}
                </span>
              </div>
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105 ${card.iconBg}`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium truncate">{card.subtitle}</span>
              <span className={`font-semibold shrink-0 ${card.changeColor}`}>{card.change}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
