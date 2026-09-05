import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { MessageSquare, Plus, Search } from 'lucide-react';

export const MessagesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Internal Communications"
        subtitle="Inter-department medical memos, doctor handovers, and lab result alerts."
        badge={<Badge variant="info">5 Unread Dispatches</Badge>}
        actions={
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Compose Message
          </Button>
        }
      />

      <Card
        title="Hospital Communication Center"
        subtitle="Direct staff messaging and clinical department consultation threads"
      >
        <div className="py-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <MessageSquare className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">Hospital Messaging Ready</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1.5 leading-relaxed">
            Staff messaging channels, priority alerts, and consultation threads will be connected during the
            communications step.
          </p>
        </div>
      </Card>
    </div>
  );
};
