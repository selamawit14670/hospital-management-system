import React, { useState } from 'react';
import { Activity, Plus, HeartPulse, Search, ShieldAlert, ArrowRight } from 'lucide-react';
import type { AppRoute } from '../../types';
import { RECENT_VITALS, NURSE_PATIENT_QUEUE } from '../../services/nurseDashboardService';
import { RecordVitalsModal } from '../../components/nurse/RecordVitalsModal';
import type { NurseVitalRecord } from '../../types/nurse';

interface NurseVitalSignsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const NurseVitalSignsPage: React.FC<NurseVitalSignsPageProps> = ({ onNavigate }) => {
  const [vitalsList, setVitalsList] = useState<NurseVitalRecord[]>(RECENT_VITALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Critical' | 'Warning' | 'Normal'>('All');

  const filtered = vitalsList.filter((v) => filter === 'All' || v.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Patient Vital Signs Monitor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time multi-parameter telemetry logs (BP, Heart Rate, Temperature, SpO2, Respiratory Rate)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate?.('/nurse/dashboard' as AppRoute)}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            &larr; Back to Dashboard
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Record New Vitals</span>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2">
        {(['All', 'Critical', 'Warning', 'Normal'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              filter === f
                ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-6">Patient</th>
                <th className="py-3 px-4">Room / Bed</th>
                <th className="py-3 px-4">Blood Pressure</th>
                <th className="py-3 px-4">Heart Rate</th>
                <th className="py-3 px-4">Temperature</th>
                <th className="py-3 px-4">SpO2</th>
                <th className="py-3 px-4">Resp. Rate</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-6">Recorded At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={v.patientAvatar}
                        alt={v.patientName}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                          {v.patientName}
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">{v.patientId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-xs text-slate-800 whitespace-nowrap">
                    {v.roomBed}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-xs sm:text-sm text-slate-900">
                    {v.bp} <span className="text-[10px] font-normal text-slate-400">mmHg</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-xs sm:text-sm text-slate-900">
                    {v.hr} <span className="text-[10px] font-normal text-slate-400">bpm</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-xs sm:text-sm text-slate-900">
                    {v.temp}°C
                  </td>
                  <td className="py-3.5 px-4 font-bold text-xs sm:text-sm text-slate-900">
                    {v.spo2}%
                  </td>
                  <td className="py-3.5 px-4 font-bold text-xs sm:text-sm text-slate-900">
                    {v.rr} /min
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                        v.status === 'Critical'
                          ? 'bg-rose-100 text-rose-800 border-rose-200 animate-pulse'
                          : v.status === 'Warning'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-xs text-slate-500 whitespace-nowrap">
                    {v.recordedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RecordVitalsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        patientsList={NURSE_PATIENT_QUEUE}
        onSaveVitals={(newV) => {
          const rec: NurseVitalRecord = {
            id: `vit-${Date.now()}`,
            patientId: newV.patientId || 'MC-000001',
            patientName: newV.patientName || 'Patient',
            patientAvatar: newV.patientAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
            roomBed: newV.roomBed || 'Ward Bed',
            bp: newV.bp || '120/80',
            hr: newV.hr || 72,
            temp: newV.temp || 36.8,
            spo2: newV.spo2 || 98,
            rr: newV.rr || 16,
            status: newV.status || 'Normal',
            recordedAt: 'Just now',
          };
          setVitalsList((prev) => [rec, ...prev]);
        }}
      />
    </div>
  );
};
