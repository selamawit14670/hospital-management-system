import React from 'react';
import { Calendar, Users, Clock, FlaskConical, ArrowUpRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { DoctorStats } from '../../types/doctor';
import type { AppRoute } from '../../types';

interface DoctorStatsCardsProps {
  stats: DoctorStats;
  onNavigate?: (path: AppRoute) => void;
}

export const DoctorStatsCards: React.FC<DoctorStatsCardsProps> = ({ stats, onNavigate }) => {
  const cards = [
    {
      id: 'stat-today-apt',
      title: "Today's Appointments",
      value: stats.todayAppointments,
      subtitle: `${stats.completedAppointments} completed`,
      icon: Calendar,
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
      badge: {
        text: `${stats.todayAppointments - stats.completedAppointments} remaining`,
        color: 'text-blue-700 bg-blue-50 border-blue-100',
      },
      actionPath: '/doctor/appointments' as AppRoute,
    },
    {
      id: 'stat-waiting',
      title: 'Patients Waiting',
      value: stats.waitingPatients,
      subtitle: `${stats.urgentPatients} urgent priority`,
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
      badge: {
        text: 'Queue active',
        color: 'text-amber-700 bg-amber-50 border-amber-100',
      },
      actionPath: '/doctor/dashboard' as AppRoute,
      highlight: stats.urgentPatients > 0,
    },
    {
      id: 'stat-my-patients',
      title: 'My Patients',
      value: stats.myPatientsTotal,
      subtitle: `+${stats.newPatientsThisMonth} this month`,
      icon: Users,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
      badge: {
        text: 'Assigned cohort',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-100',
      },
      actionPath: '/doctor/patients' as AppRoute,
    },
    {
      id: 'stat-lab-results',
      title: 'Pending Lab Results',
      value: stats.pendingLabResults,
      subtitle: `${stats.urgentLabReviews} require review`,
      icon: FlaskConical,
      iconBg: 'bg-rose-50 text-rose-600 border border-rose-100',
      badge: {
        text: 'Pathology & Scans',
        color: 'text-rose-700 bg-rose-50 border-rose-100',
      },
      actionPath: '/doctor/lab-results' as AppRoute,
      highlight: stats.urgentLabReviews > 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={() => onNavigate?.(card.actionPath)}
            className="group relative bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            {/* Top row: Icon + Badge */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg} transition-transform group-hover:scale-105`}>
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>

              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${card.badge.color}`}>
                {card.badge.text}
              </span>
            </div>

            {/* Middle: Big Value */}
            <div>
              <p className="text-xs font-semibold text-slate-500 tracking-tight uppercase">
                {card.title}
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {card.value}
                </span>
                {card.id === 'stat-my-patients' && (
                  <span className="inline-flex items-center text-xs font-bold text-emerald-600">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    +{stats.newPatientsThisMonth}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom: Subtitle with status dot */}
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                {card.id === 'stat-today-apt' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                ) : card.highlight ? (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                )}
                {card.subtitle}
              </span>
              <span className="text-[11px] text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                Open &rarr;
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
