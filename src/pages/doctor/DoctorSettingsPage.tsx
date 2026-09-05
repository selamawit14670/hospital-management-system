import React, { useState } from 'react';
import { Settings, Shield, Bell, Stethoscope, Save, CheckCircle2 } from 'lucide-react';
import type { AppRoute } from '../../types';

interface DoctorSettingsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const DoctorSettingsPage: React.FC<DoctorSettingsPageProps> = ({ onNavigate }) => {
  const [slotDuration, setSlotDuration] = useState('20');
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [labAlerts, setLabAlerts] = useState(true);
  const [autoSignRx, setAutoSignRx] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Doctor Clinical Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Configure appointment duration, clinical notifications, and electronic signature settings
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/doctor/dashboard' as AppRoute)}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          &larr; Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Slot Duration */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-blue-600" />
            <h2 className="font-bold text-sm sm:text-base text-slate-900">Consultation Timing</h2>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Default Appointment Slot Duration
            </label>
            <div className="flex flex-wrap gap-2">
              {['15', '20', '30', '45'].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setSlotDuration(mins)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    slotDuration === mins
                      ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {mins} Minutes
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <h2 className="font-bold text-sm sm:text-base text-slate-900">Clinical Alerts</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-slate-900">Urgent Triage & Emergency Alerts</p>
                <p className="text-[11px] text-slate-500">Notify immediately when critical patients are added to your queue</p>
              </div>
              <input
                type="checkbox"
                checked={emergencyAlerts}
                onChange={(e) => setEmergencyAlerts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-slate-900">Pathology Lab Critical Flags</p>
                <p className="text-[11px] text-slate-500">Push notification when abnormal lab values are reported</p>
              </div>
              <input
                type="checkbox"
                checked={labAlerts}
                onChange={(e) => setLabAlerts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between">
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              Settings saved successfully
            </span>
          )}
          <button
            type="submit"
            className="ml-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
