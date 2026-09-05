import React, { useState } from 'react';
import { Settings, ArrowLeft, Bell, Printer, Shield, Save, CheckCircle2, User } from 'lucide-react';
import type { AppRoute } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface ReceptionistSettingsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const ReceptionistSettingsPage: React.FC<ReceptionistSettingsPageProps> = ({
  onNavigate,
}) => {
  const { user } = useAuth();
  const [deskName, setDeskName] = useState('Front Desk Terminal #1');
  const [autoQueueCall, setAutoQueueCall] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [printerReceipts, setPrinterReceipts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Front Desk Terminal Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Configure admissions station preferences, receipt printer, and reception queue options
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

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-emerald-800 text-xs sm:text-sm font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Front desk terminal preferences saved successfully!</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-5">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            <span>Staff Station Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Active Intake Officer
              </label>
              <input
                type="text"
                disabled
                value={user?.name || 'Selamawit D.'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Terminal Identifier
              </label>
              <input
                type="text"
                value={deskName}
                onChange={(e) => setDeskName(e.target.value)}
                className="w-full bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Queue & Alerts Options */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <span>Queue & Triage Notifications</span>
          </h2>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Lobby Audio Chime on Call
                </p>
                <p className="text-[11px] text-slate-400">
                  Play audible tone in waiting room when calling patient to physician office
                </p>
              </div>
              <input
                type="checkbox"
                checked={soundAlerts}
                onChange={(e) => setSoundAlerts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Automatic Waiting Room Sync
                </p>
                <p className="text-[11px] text-slate-400">
                  Move checked-in patients directly into physician triage queue
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoQueueCall}
                onChange={(e) => setAutoQueueCall(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Auto-Print Receipts on Cashier Collection
                </p>
                <p className="text-[11px] text-slate-400">
                  Direct payment confirmation to thermal slip printer
                </p>
              </div>
              <input
                type="checkbox"
                checked={printerReceipts}
                onChange={(e) => setPrinterReceipts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
