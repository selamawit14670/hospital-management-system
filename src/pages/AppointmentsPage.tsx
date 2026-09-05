import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Plus, Filter, Search, Calendar, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export const AppointmentsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments Management"
        subtitle="Manage upcoming consultations, outpatient bookings, and emergency triage."
        badge={<Badge variant="primary">12 Scheduled Today</Badge>}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
              Filter Status
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Schedule Appointment
            </Button>
          </>
        }
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Today's Visits</p>
            <h4 className="text-xl font-bold text-slate-900 mt-0.5">42 Booked</h4>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Completed Today</p>
            <h4 className="text-xl font-bold text-slate-900 mt-0.5">28 Finished</h4>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase">Pending Queued</p>
            <h4 className="text-xl font-bold text-slate-900 mt-0.5">14 Waiting</h4>
          </div>
        </Card>
      </div>

      {/* Placeholder Main Container */}
      <Card
        title="Appointment Roster & Booking Ledger"
        subtitle="Clinical appointment functionality ready for phase 2 implementation"
      >
        <div className="py-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Appointments Module Ready</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1.5 leading-relaxed">
            The appointments module foundation has been connected to MediCare routing. In subsequent steps,
            you will be able to book, reschedule, triage, and manage doctor calendars here.
          </p>
        </div>
      </Card>
    </div>
  );
};
