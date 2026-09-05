import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Thermometer,
  Wind,
  Plus,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import type { NurseVitalRecord } from '../../types/nurse';
import type { AppRoute } from '../../types';

interface VitalSignsMonitorCardProps {
  vitals: NurseVitalRecord[];
  onLogVitalsClick: () => void;
  onViewPatient?: (patientId: string) => void;
  onNavigate?: (path: AppRoute) => void;
}

export const VitalSignsMonitorCard: React.FC<VitalSignsMonitorCardProps> = ({
  vitals,
  onLogVitalsClick,
  onViewPatient,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'All' | 'Alerts'>('All');

  const displayedVitals = filter === 'Alerts'
    ? vitals.filter((v) => v.status === 'Critical' || v.status === 'Warning')
    : vitals;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 sm:px-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight flex items-center gap-2">
              Recent Vital Signs
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                Live Vitals
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Ward inpatient hemodynamic & respiratory telemetry monitors
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilter(filter === 'All' ? 'Alerts' : 'All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              filter === 'Alerts'
                ? 'bg-rose-50 text-rose-700 border-rose-200 shadow-2xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {filter === 'Alerts' ? 'Showing Alerts Only' : 'Filter Alerts'}
          </button>

          <button
            type="button"
            onClick={onLogVitalsClick}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1 shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Record</span>
          </button>
        </div>
      </div>

      {/* Vitals Grid / Stream */}
      <div className="p-4 sm:p-5 space-y-3">
        {displayedVitals.map((rec) => (
          <div
            key={rec.id}
            className={`p-4 rounded-xl border transition-all ${
              rec.status === 'Critical'
                ? 'bg-rose-50/40 border-rose-200/90 shadow-2xs'
                : rec.status === 'Warning'
                ? 'bg-amber-50/30 border-amber-200/80 shadow-2xs'
                : 'bg-slate-50/50 border-slate-200/80 hover:bg-white hover:shadow-2xs'
            }`}
          >
            {/* Top row: Patient demographics & Alert tag */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={rec.patientAvatar}
                  alt={rec.patientName}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4
                      onClick={() => onViewPatient?.(rec.patientId)}
                      className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {rec.patientName}
                    </h4>
                    <span className="font-mono text-[10px] font-semibold bg-white px-1.5 py-0.2 rounded border border-slate-200">
                      {rec.patientId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{rec.roomBed}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {rec.recordedAt}
                </span>

                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    rec.status === 'Critical'
                      ? 'bg-rose-100 text-rose-800 border-rose-200 animate-pulse'
                      : rec.status === 'Warning'
                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {rec.status}
                </span>
              </div>
            </div>

            {/* Vitals metrics chips: BP, HR, Temp, SpO2, RR */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {/* BP */}
              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">BP (Blood Pres.)</span>
                <span
                  className={`text-sm font-extrabold ${
                    parseInt(rec.bp.split('/')[0], 10) >= 140 ? 'text-rose-600' : 'text-slate-900'
                  }`}
                >
                  {rec.bp} <span className="text-[10px] font-normal text-slate-400">mmHg</span>
                </span>
              </div>

              {/* Heart Rate */}
              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">HR (Pulse)</span>
                <span
                  className={`text-sm font-extrabold ${
                    rec.hr > 100 || rec.hr < 60 ? 'text-rose-600' : 'text-slate-900'
                  }`}
                >
                  {rec.hr} <span className="text-[10px] font-normal text-slate-400">bpm</span>
                </span>
              </div>

              {/* Temperature */}
              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Temp</span>
                <span
                  className={`text-sm font-extrabold ${
                    rec.temp >= 38.0 ? 'text-rose-600' : 'text-slate-900'
                  }`}
                >
                  {rec.temp}°C
                </span>
              </div>

              {/* SpO2 */}
              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">SpO2 (Oxygen)</span>
                <span
                  className={`text-sm font-extrabold ${
                    rec.spo2 < 95 ? 'text-rose-600' : 'text-slate-900'
                  }`}
                >
                  {rec.spo2}%
                </span>
              </div>

              {/* Respiratory Rate */}
              <div className="col-span-2 sm:col-span-1 p-2.5 rounded-lg bg-white border border-slate-200/80">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Resp. Rate</span>
                <span
                  className={`text-sm font-extrabold ${
                    rec.rr > 20 ? 'text-rose-600' : 'text-slate-900'
                  }`}
                >
                  {rec.rr} <span className="text-[10px] font-normal text-slate-400">/min</span>
                </span>
              </div>
            </div>

            {/* Clinical Note if any */}
            {rec.notes && (
              <p className="text-xs text-slate-600 mt-2.5 pt-2 border-t border-slate-200/60 font-mono">
                <span className="text-slate-400 font-sans">Observation:</span> {rec.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
