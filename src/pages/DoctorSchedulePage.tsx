import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Clock, Plus, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export const DoctorSchedulePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Doctor's Schedule & Roster"
        subtitle="Weekly shift rotations, surgery theater allocations, and on-call physicians."
        badge={<Badge variant="info">Weekly View</Badge>}
        actions={
          <>
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1">
              <Button variant="ghost" size="sm" className="px-2 py-1">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-xs font-semibold px-2 text-slate-700">Sep 01 - Sep 07, 2026</span>
              <Button variant="ghost" size="sm" className="px-2 py-1">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Assign Shift
            </Button>
          </>
        }
      />

      <Card
        title="Clinical Shift Scheduler"
        subtitle="Duty rosters for emergency, ICU, and outpatient consulting clinics"
      >
        <div className="py-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Clock className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Doctor's Schedule Module Ready</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1.5 leading-relaxed">
            Shift scheduling, calendar views, leave management, and replacement routing will be configured in the
            clinical modules phase.
          </p>
        </div>
      </Card>
    </div>
  );
};
