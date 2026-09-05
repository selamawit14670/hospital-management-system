import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Stethoscope, Plus, Filter, Search } from 'lucide-react';

export const DoctorsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Doctors & Medical Staff"
        subtitle="Physician directory, specializations, consulting hours, and credentials."
        badge={<Badge variant="info">84 Registered Specialists</Badge>}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
              Filter Department
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add New Doctor
            </Button>
          </>
        }
      />

      <Card
        title="Physician & Specialist Roster"
        subtitle="Hospital doctor directory ready for data binding and doctor profiles"
      >
        <div className="py-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Stethoscope className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Doctor Directory Module</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1.5 leading-relaxed">
            Physician directory and credential records are ready for integration with PostgreSQL and Prisma in
            the upcoming development stages.
          </p>
        </div>
      </Card>
    </div>
  );
};
