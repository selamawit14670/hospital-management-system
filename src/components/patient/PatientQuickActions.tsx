import React from 'react';
import { CalendarPlus, IdCard, FileText, Pill, ArrowUpRight } from 'lucide-react';

interface PatientQuickActionsProps {
  onBookAppointment: () => void;
  onViewDigitalCard: () => void;
  onViewMedicalRecords: () => void;
  onViewPrescriptions: () => void;
}

export const PatientQuickActions: React.FC<PatientQuickActionsProps> = ({
  onBookAppointment,
  onViewDigitalCard,
  onViewMedicalRecords,
  onViewPrescriptions,
}) => {
  const actions = [
    {
      id: 'quick-book-apt',
      title: 'Book Appointment',
      description: 'Schedule a visit with your physician or specialist',
      icon: CalendarPlus,
      iconColor: 'bg-blue-600 text-white',
      badge: 'Fast Booking',
      onClick: onBookAppointment,
    },
    {
      id: 'quick-view-card',
      title: 'View Digital Card',
      description: 'Access your NFC smart ID & emergency QR code',
      icon: IdCard,
      iconColor: 'bg-indigo-600 text-white',
      badge: 'Active RFID',
      onClick: onViewDigitalCard,
    },
    {
      id: 'quick-view-records',
      title: 'Medical Records',
      description: 'Review clinical consultation notes & care summaries',
      icon: FileText,
      iconColor: 'bg-purple-600 text-white',
      badge: 'EHR Synced',
      onClick: onViewMedicalRecords,
    },
    {
      id: 'quick-view-rx',
      title: 'Prescriptions',
      description: 'Manage active medications & request pharmacy refills',
      icon: Pill,
      iconColor: 'bg-emerald-600 text-white',
      badge: 'Pharmacy Refill',
      onClick: onViewPrescriptions,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Quick Actions
          </h3>
          <p className="text-xs text-slate-500">
            Instant shortcuts to your healthcare services
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              id={act.id}
              type="button"
              onClick={act.onClick}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all duration-150 cursor-pointer text-left group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs ${act.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {act.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                  {act.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {act.badge}
                </span>
                <span className="text-[11px] font-semibold text-blue-600 group-hover:underline">
                  Launch →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
