import React from 'react';
import {
  Activity,
  Pill,
  HeartPulse,
  BedDouble,
  FileCheck,
  Clock,
  ArrowRight,
} from 'lucide-react';
import type { NursingActivity } from '../../types/nurse';
import type { AppRoute } from '../../types';

interface RecentNursingActivityCardProps {
  activities: NursingActivity[];
  onViewPatient?: (patientId: string) => void;
  onNavigate?: (path: AppRoute) => void;
}

export const RecentNursingActivityCard: React.FC<RecentNursingActivityCardProps> = ({
  activities,
  onViewPatient,
  onNavigate,
}) => {
  const getActivityIcon = (type: NursingActivity['type']) => {
    switch (type) {
      case 'Medication':
        return {
          icon: Pill,
          color: 'text-blue-600 bg-blue-50 border-blue-200',
        };
      case 'Vitals':
        return {
          icon: HeartPulse,
          color: 'text-rose-600 bg-rose-50 border-rose-200',
        };
      case 'Admission':
        return {
          icon: BedDouble,
          color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
        };
      case 'Care':
      case 'Note':
      default:
        return {
          icon: FileCheck,
          color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base tracking-tight">
              Recent Nursing Activity
            </h3>
            <p className="text-xs text-slate-400">Chronological patient care and bedside interventions</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/nurse/nursing-records' as AppRoute)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        >
          Care Log
        </button>
      </div>

      {/* Activity Items */}
      <div className="p-5 space-y-4 flex-1">
        {activities.map((item, index) => {
          const { icon: Icon, color } = getActivityIcon(item.type);
          return (
            <div key={item.id} className="relative flex items-start gap-3.5 group">
              {/* Connector line */}
              {index < activities.length - 1 && (
                <div className="absolute left-4.5 top-9 bottom-0 w-px bg-slate-200" />
              )}

              {/* Icon badge */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border z-10 ${color}`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.action}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3 text-slate-300" />
                    {item.time}
                  </span>
                </div>

                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-600">
                  <span
                    onClick={() => onViewPatient?.(item.patientId)}
                    className="font-semibold text-slate-800 hover:underline cursor-pointer"
                  >
                    {item.patientName}
                  </span>
                  <span>•</span>
                  <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded border">
                    {item.roomBed}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.details}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
