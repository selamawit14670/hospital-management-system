import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Building2, Plus, Filter } from 'lucide-react';

export const DepartmentsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Hospital Departments"
        subtitle="Clinical divisions, surgical suites, inpatient wards, and facility management."
        badge={<Badge variant="purple">16 Departments</Badge>}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
              Filter Wards
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add Department
            </Button>
          </>
        }
      />

      <Card
        title="Departmental Operations"
        subtitle="Cardiology, Neurology, Pediatrics, Oncology, Orthopedics, and Radiology"
      >
        <div className="py-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Building2 className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Departments Module Ready</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1.5 leading-relaxed">
            Manage hospital departments, head of departments, operational budgets, and bed capacities.
          </p>
        </div>
      </Card>
    </div>
  );
};
