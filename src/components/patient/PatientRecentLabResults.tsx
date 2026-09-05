import React from 'react';
import { FlaskConical, CheckCircle2, Clock, AlertTriangle, Eye, Calendar, FileText } from 'lucide-react';
import type { PatientLabResult } from '../../types/patient';

interface PatientRecentLabResultsProps {
  labResults: PatientLabResult[];
  onViewReport: (result: PatientLabResult) => void;
  onViewAll?: () => void;
}

export const PatientRecentLabResults: React.FC<PatientRecentLabResultsProps> = ({
  labResults,
  onViewReport,
  onViewAll,
}) => {
  const getStatusBadge = (status: PatientLabResult['status']) => {
    switch (status) {
      case 'Normal':
        return {
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: CheckCircle2,
          iconColor: 'text-emerald-600',
        };
      case 'Completed':
        return {
          badge: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: CheckCircle2,
          iconColor: 'text-blue-600',
        };
      case 'Pending Review':
        return {
          badge: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: Clock,
          iconColor: 'text-amber-600',
        };
      default:
        return {
          badge: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: AlertTriangle,
          iconColor: 'text-rose-600',
        };
    }
  };

  return (
    <div id="lab-results-section" className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <FlaskConical className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-900 truncate">
              Recent Lab Results
            </h3>
            <p className="text-xs text-slate-500 truncate">
              Diagnostic pathology panels, hematology, and verified laboratory tests
            </p>
          </div>
        </div>

        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer shrink-0"
          >
            View All ({labResults.length})
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-3">
        {labResults.map((result) => {
          const statusConfig = getStatusBadge(result.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={result.id}
              onClick={() => onViewReport(result)}
              className="p-4 rounded-xl border border-slate-150/80 hover:border-indigo-200 bg-slate-50/40 hover:bg-indigo-50/20 transition-all duration-150 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              {/* Main test details */}
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                  <FlaskConical className="w-5 h-5" />
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      {result.testName}
                    </h4>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusConfig.badge}`}
                    >
                      <StatusIcon className={`w-3 h-3 ${statusConfig.iconColor}`} />
                      {result.status}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {result.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-1 font-medium">
                    {result.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      Ordered by {result.orderedBy}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {result.date}
                    </span>
                    <span>•</span>
                    <span>{result.specimen}</span>
                  </div>
                </div>
              </div>

              {/* Right action */}
              <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewReport(result);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white group-hover:bg-indigo-600 group-hover:text-white border border-slate-200 group-hover:border-indigo-600 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Report</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
