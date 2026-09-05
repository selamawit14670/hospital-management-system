import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Users, Plus, Filter, Download } from 'lucide-react';

export const PatientsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients Registry"
        subtitle="Manage admitted patients, outpatient medical histories, and digital patient cards."
        badge={<Badge variant="success">3,842 Total Patients</Badge>}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
              Export List
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Register Patient
            </Button>
          </>
        }
      />

      <Card
        title="Patient Directory"
        subtitle="Clinical record storage, digital card generation, and medical histories"
      >
        <div className="py-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Users className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Patients Registry Container</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1.5 leading-relaxed">
            Patient registration, medical records, and digital patient cards with QR codes will be
            implemented in the designated subsequent step.
          </p>
        </div>
      </Card>
    </div>
  );
};
