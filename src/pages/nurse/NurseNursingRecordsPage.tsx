import React, { useState } from 'react';
import { FileCheck, Plus, CheckCircle, Clock, Pill, Save, AlertTriangle } from 'lucide-react';
import type { AppRoute } from '../../types';
import { NURSING_TASKS, RECENT_NURSING_ACTIVITIES } from '../../services/nurseDashboardService';

interface NurseNursingRecordsPageProps {
  onNavigate?: (path: AppRoute) => void;
}

export const NurseNursingRecordsPage: React.FC<NurseNursingRecordsPageProps> = ({ onNavigate }) => {
  const [shiftNote, setShiftNote] = useState(
    'Shift A (07:00 - 15:30) Ward Handover Summary:\n- Total inpatients: 14. All morning oral medications dispensed.\n- Room 205 Bed B (Tigist Assefa): Acute bronchospasm episode at 09:15; nebulization and IV hydrocortisone given per Dr. Mengistu. SpO2 currently stable at 94% on 2L nasal cannula.\n- Room 204 Bed A (Abebe Kebede): BP 142/92 recorded; repeat scheduled for 14:00.\n- Room 201 Bed B (Kassahun Tolessa): Surgical dressing dry; ambulated in hallway without syncope.'
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Nursing Care Records & MAR
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Shift handover documentation, medication administration logs, and bedside clinical care notes
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

      {/* Shift Handover Note Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              Nurse Station Shift Handover Record
            </h2>
            <p className="text-xs text-slate-400">Sister Almaz • Ward Station 4 • Shift A</p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Shift Note</span>
          </button>
        </div>

        <textarea
          rows={6}
          value={shiftNote}
          onChange={(e) => setShiftNote(e.target.value)}
          className="w-full bg-slate-50 focus:bg-white text-slate-800 font-mono text-xs rounded-xl border border-slate-200 p-3.5 focus:outline-none focus:border-blue-500 leading-relaxed"
        />

        {saved && (
          <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            Shift handover notes updated and broadcasted to incoming charge nurse!
          </p>
        )}
      </div>

      {/* Recent Nursing Activity & MAR Log */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
        <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Pill className="w-5 h-5 text-indigo-600" />
          Medication Administration Records (MAR)
        </h2>

        <div className="divide-y divide-slate-100">
          {NURSING_TASKS.map((task) => (
            <div key={task.id} className="py-3 flex items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-bold text-slate-900">{task.title}</p>
                <p className="text-slate-500 mt-0.5">
                  Patient: <span className="font-semibold text-slate-700">{task.patientName}</span> ({task.roomBed})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-400 text-[11px]">{task.dueTime}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${
                    task.completed
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {task.completed ? 'Administered' : 'Pending Order'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
