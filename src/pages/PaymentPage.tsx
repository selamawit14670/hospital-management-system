import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { CreditCard, Plus, Filter, Download } from 'lucide-react';

export const PaymentPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing & Payment Transactions"
        subtitle="Patient invoicing, health insurance claim settlements, and pharmacy billings."
        badge={<Badge variant="success">Financial Gateway Active</Badge>}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
              Download Statement
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Create Invoice
            </Button>
          </>
        }
      />

      <Card
        title="Billing Records & Ledger"
        subtitle="Invoicing, copay collections, insurance eligibility checks, and receipts"
      >
        <div className="py-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <CreditCard className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Payment & Billing Module Ready</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1.5 leading-relaxed">
            Invoice generation, claim tracking, payment gateways, and balance ledgers will be implemented in the
            billing phase.
          </p>
        </div>
      </Card>
    </div>
  );
};
