import React from 'react';
import { FileText, Stethoscope, Calendar, ChevronRight, Eye, Download, Activity } from 'lucide-react';
import type { PatientMedicalRecord } from '../../types/patient';

interface PatientRecentMedicalRecordsProps {
  records: PatientMedicalRecord[];
  onViewRecord: (record: PatientMedicalRecord) => void;
  onViewAll?: () => void;
}

export const PatientRecentMedicalRecords: React.FC<PatientRecentMedicalRecordsProps> = ({
  records,
  onViewRecord,
  onViewAll,
}) => {
  return (
    <div id="medical-records-section" className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-900 truncate">
              Recent Medical Records
            </h3>
            <p className="text-xs text-slate-500 truncate">
              Electronic Health Records (EHR) & clinician clinical notes
            </p>
          </div>
        </div>

        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer shrink-0"
          >
            View All ({records.length})
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-3">
        {records.slice(0, 4).map((record) => (
          <div
            key={record.id}
            onClick={() => onViewRecord(record)}
            className="p-4 rounded-xl border border-slate-150/80 hover:border-purple-200 bg-slate-50/40 hover:bg-purple-50/20 transition-all duration-150 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            {/* Record Main Info */}
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                <Activity className="w-5 h-5" />
              </div>

              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    {record.title}
                  </h4>
                  <span className="text-[10px] font-semibold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded">
                    {record.recordType}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-1 font-medium">
                  {record.primaryDiagnosis}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <Stethoscope className="w-3 h-3 text-slate-400" />
                    {record.doctorName}
                  </span>
                  <span>•</span>
                  <span>{record.department}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {record.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
              {record.vitals && (
                <div className="hidden lg:block text-right mr-2">
                  <p className="text-[10px] text-slate-400 font-medium">Vitals Recorded</p>
                  <p className="text-xs font-bold text-slate-700 font-mono">
                    BP {record.vitals.bloodPressure}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewRecord(record);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white group-hover:bg-purple-600 group-hover:text-white border border-slate-200 group-hover:border-purple-600 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Record</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
