import React, { useState } from 'react';
import { Settings, Bell, Shield, HeartPulse, Check, Save } from 'lucide-react';
import type { AppRoute } from '../../types';

interface NurseSettingsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const NurseSettingsPage: React.FC<NurseSettingsPageProps> = ({ onNavigate }) => {
  const [saved, setSaved] = useState(false);
  const [spo2AlertThreshold, setSpo2AlertThreshold] = useState('94');
  const [systolicHighAlert, setSystolicHighAlert] = useState('140');
  const [heartRateHighAlert, setHeartRateHighAlert] = useState('100');
  const [tempHighAlert, setTempHighAlert] = useState('38.0');
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [autoChartSync, setAutoChartSync] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Nurse Station Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Configure telemetry alert thresholds, shift notifications, and bedside charting preferences
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/nurse/dashboard' as AppRoute)}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          &larr; Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Vitals Alerts Thresholds */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900">Telemetry Alert Limits</h2>
              <p className="text-xs text-slate-400">Trigger high-priority triage alerts when inpatient vitals exceed these limits</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                SpO2 Low Alert Threshold (%)
              </label>
              <input
                type="number"
                value={spo2AlertThreshold}
                onChange={(e) => setSpo2AlertThreshold(e.target.value)}
                className="w-full bg-slate-50 focus:bg-white text-slate-800 text-sm font-semibold rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Systolic BP High Alert (mmHg)
              </label>
              <input
                type="number"
                value={systolicHighAlert}
                onChange={(e) => setSystolicHighAlert(e.target.value)}
                className="w-full bg-slate-50 focus:bg-white text-slate-800 text-sm font-semibold rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Heart Rate High Alert (bpm)
              </label>
              <input
                type="number"
                value={heartRateHighAlert}
                onChange={(e) => setHeartRateHighAlert(e.target.value)}
                className="w-full bg-slate-50 focus:bg-white text-slate-800 text-sm font-semibold rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Temperature High Alert (°C)
              </label>
              <input
                type="number"
                step="0.1"
                value={tempHighAlert}
                onChange={(e) => setTempHighAlert(e.target.value)}
                className="w-full bg-slate-50 focus:bg-white text-slate-800 text-sm font-semibold rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Station Notification Controls */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900">Shift Audio & Notifications</h2>
              <p className="text-xs text-slate-400">Audible chimes for urgent doctor orders and vitals breaches</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={soundAlerts}
                onChange={(e) => setSoundAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-slate-700">
                Play sound alert when new critical lab result or vitals threshold is logged
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={autoChartSync}
                onChange={(e) => setAutoChartSync(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-slate-700">
                Automatically synchronize vitals recordings with patient electronic medical record (EMR)
              </span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {saved && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              Nurse Station preferences successfully saved!
            </span>
          )}
          <div className="ml-auto">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-2xs cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
