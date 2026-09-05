import React, { useState, useEffect } from 'react';
import {
  X,
  HeartPulse,
  Thermometer,
  Activity,
  Wind,
  CheckCircle2,
  AlertTriangle,
  Save,
  BedDouble,
} from 'lucide-react';
import type { NurseQueuePatient, NurseVitalRecord } from '../../types/nurse';

interface RecordVitalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPatient?: NurseQueuePatient | null;
  patientsList?: NurseQueuePatient[];
  onSaveVitals: (vital: Partial<NurseVitalRecord>) => void;
}

export const RecordVitalsModal: React.FC<RecordVitalsModalProps> = ({
  isOpen,
  onClose,
  selectedPatient,
  patientsList = [],
  onSaveVitals,
}) => {
  const [patientId, setPatientId] = useState(selectedPatient?.patientId || '');
  const [systolic, setSystolic] = useState('120');
  const [diastolic, setDiastolic] = useState('80');
  const [hr, setHr] = useState('72');
  const [temp, setTemp] = useState('36.8');
  const [spo2, setSpo2] = useState('98');
  const [rr, setRr] = useState('16');
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (selectedPatient) {
      setPatientId(selectedPatient.patientId);
      if (selectedPatient.vitalsSummary) {
        const [sys, dia] = selectedPatient.vitalsSummary.bp.split('/');
        setSystolic(sys || '120');
        setDiastolic(dia || '80');
        setHr(String(selectedPatient.vitalsSummary.hr || '72'));
        setTemp(String(selectedPatient.vitalsSummary.temp || '36.8'));
        setSpo2(String(selectedPatient.vitalsSummary.spo2 || '98'));
      }
    } else if (patientsList.length > 0 && !patientId) {
      setPatientId(patientsList[0].patientId);
    }
  }, [selectedPatient, patientsList]);

  if (!isOpen) return null;

  const currentPatient =
    patientsList.find((p) => p.patientId === patientId) || selectedPatient;

  // Real-time assessment flag
  const sysNum = parseInt(systolic, 10) || 120;
  const diaNum = parseInt(diastolic, 10) || 80;
  const hrNum = parseInt(hr, 10) || 72;
  const tempNum = parseFloat(temp) || 36.8;
  const spo2Num = parseInt(spo2, 10) || 98;

  let assessment: 'Normal' | 'Warning' | 'Critical' = 'Normal';
  if (spo2Num < 92 || sysNum >= 180 || sysNum < 90 || hrNum > 120 || tempNum >= 39.0) {
    assessment = 'Critical';
  } else if (spo2Num < 95 || sysNum >= 140 || diaNum >= 90 || hrNum > 100 || hrNum < 55 || tempNum >= 38.0) {
    assessment = 'Warning';
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveVitals({
      patientId: currentPatient?.patientId || patientId,
      patientName: currentPatient?.patientName || 'Patient',
      patientAvatar: currentPatient?.patientAvatar,
      roomBed: currentPatient?.roomBed || 'Ward Bed',
      bp: `${systolic}/${diastolic}`,
      hr: hrNum,
      temp: tempNum,
      spo2: spo2Num,
      rr: parseInt(rr, 10) || 16,
      status: assessment,
      recordedAt: 'Just now',
      notes: notes.trim() || undefined,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 sm:px-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Record Patient Vital Signs
              </h2>
              <p className="text-xs text-slate-500">
                Log clinical telemetry & hemodynamic observations
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Patient Selection preview */}
          {currentPatient && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={currentPatient.patientAvatar}
                  alt={currentPatient.patientName}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{currentPatient.patientName}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono bg-white px-1.5 py-0.2 rounded border font-semibold">
                      {currentPatient.patientId}
                    </span>
                    <span>•</span>
                    <span className="font-medium text-slate-700">{currentPatient.roomBed}</span>
                  </div>
                </div>
              </div>

              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                  assessment === 'Critical'
                    ? 'bg-rose-100 text-rose-800 border-rose-200 animate-pulse'
                    : assessment === 'Warning'
                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                {assessment} Vitals
              </span>
            </div>
          )}

          {/* Vitals Inputs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Blood Pressure Systolic */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                BP Systolic (mmHg)
              </label>
              <input
                type="number"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                min="60"
                max="260"
                required
                className="w-full bg-slate-50 focus:bg-white text-slate-900 text-sm font-bold rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Blood Pressure Diastolic */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                BP Diastolic (mmHg)
              </label>
              <input
                type="number"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                min="40"
                max="160"
                required
                className="w-full bg-slate-50 focus:bg-white text-slate-900 text-sm font-bold rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Heart Rate */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Heart Rate (bpm)
              </label>
              <input
                type="number"
                value={hr}
                onChange={(e) => setHr(e.target.value)}
                min="30"
                max="220"
                required
                className="w-full bg-slate-50 focus:bg-white text-slate-900 text-sm font-bold rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Temperature */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Body Temp (°C)
              </label>
              <input
                type="number"
                step="0.1"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                min="34.0"
                max="43.0"
                required
                className="w-full bg-slate-50 focus:bg-white text-slate-900 text-sm font-bold rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* SpO2 */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Oxygen SpO2 (%)
              </label>
              <input
                type="number"
                value={spo2}
                onChange={(e) => setSpo2(e.target.value)}
                min="70"
                max="100"
                required
                className="w-full bg-slate-50 focus:bg-white text-slate-900 text-sm font-bold rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Respiratory Rate */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Resp. Rate (/min)
              </label>
              <input
                type="number"
                value={rr}
                onChange={(e) => setRr(e.target.value)}
                min="8"
                max="50"
                required
                className="w-full bg-slate-50 focus:bg-white text-slate-900 text-sm font-bold rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Clinical Observation Note */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nursing Observations & Bedside Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Patient resting calmly, oral hydration encouraged, breath sounds clear..."
              className="w-full bg-slate-50 focus:bg-white text-slate-800 text-xs rounded-xl border border-slate-200 p-2.5 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            {isSaved ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                Vitals logged to EHR successfully!
              </span>
            ) : (
              <span className="text-[11px] text-slate-400 font-mono">
                Auto-stamped: Sister Almaz • Station 4
              </span>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Vitals</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
