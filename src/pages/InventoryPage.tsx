import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Package, Plus, Filter, AlertTriangle } from 'lucide-react';

export const InventoryPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Pharmacy & Medical Inventory"
        subtitle="Pharmaceutical stock, surgical supplies, diagnostic reagents, and asset tracking."
        badge={<Badge variant="warning" dot>3 Low Stock Alerts</Badge>}
        actions={
          <>
            <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
              Filter Categories
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add Stock Item
            </Button>
          </>
        }
      />

      <Card
        title="Stock Catalog & Warehouse Ledger"
        subtitle="Real-time pharmaceutical counts, batch expiry alerts, and purchase orders"
      >
        <div className="py-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Package className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Inventory Module Ready</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1.5 leading-relaxed">
            Medicine stock levels, supplier purchase orders, and automatic low-stock notifications will be
            implemented in the inventory step.
          </p>
        </div>
      </Card>
    </div>
  );
};
