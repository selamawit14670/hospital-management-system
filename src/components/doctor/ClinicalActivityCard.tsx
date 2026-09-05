import React from 'react';
import { Activity, CheckCircle, Pill, FileCheck, ClipboardList, Clock } from 'lucide-react';
import type { ClinicalActivity } from '../../types/doctor';
import type { AppRoute } from '../../types';

interface ClinicalActivityCardProps {
  activities: ClinicalActivity[];
  onViewPatient?: (patientId: string) => void;
  onNavigate?: (path: AppRoute) => void;
}

export const ClinicalActivityCard: React.FC<ClinicalActivityCardProps> = ({
  activities,
  onViewPatient,
  onNavigate,
}) => {
  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'Consultation completed':
        return {
          icon: CheckCircle,
          color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
        };
      case 'Prescription created':
        return {
          icon: Pill,
          color: 'text-blue-600 bg-blue-50 border-blue-200',
        };
      case 'Lab result reviewed':
        return {
          icon: FileCheck,
          color: 'text-purple-600 bg-purple-50 border-purple-200',
        };
      case 'Clinical note updated':
      default:
        return {
          icon: ClipboardList,
          color: 'text-amber-600 bg-amber-50 border-amber-200',
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
              Clinical Activity Feed
            </h3>
            <p className="text-xs text-slate-400">Chronological clinical actions & EHR logs</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/doctor/consultations' as AppRoute)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        >
          Audit Log
        </button>
      </div>

      {/* Activity items */}
      <div className="p-5 space-y-4 flex-1">
        {activities.map((item, index) => {
          const { icon: Icon, color } = getActivityIcon(item.action);
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
                  <span className="font-semibold text-slate-800">{item.patientName}</span>
                  <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded border border-slate-200">
                    {item.patientId}
                  </span>
                </div>

                {item.details && (
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-1">
                    {item.details}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
