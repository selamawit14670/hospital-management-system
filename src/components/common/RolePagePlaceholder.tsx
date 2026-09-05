import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { PageHeader } from '../ui/PageHeader';
import { routeTitles } from '../../hooks/useNavigation';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Sparkles, Activity, Clock, CheckCircle2 } from 'lucide-react';
import type { AppRoute, UserRole } from '../../types';

interface RolePagePlaceholderProps {
  path: AppRoute;
  role: UserRole;
  onNavigate?: (path: AppRoute) => void;
}

export const RolePagePlaceholder: React.FC<RolePagePlaceholderProps> = ({
  path,
  role,
}) => {
  const { user } = useAuth();
  const meta = routeTitles[path] || {
    title: 'Workspace Module',
    subtitle: 'MediCare Clinical Portal',
    category: 'System',
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={meta.title}
        subtitle={meta.subtitle}
        breadcrumbs={[
          { label: 'MediCare' },
          { label: `${role} Workspace` },
          { label: meta.title },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="primary" dot>
              {role} Role Verified
            </Badge>
            <Badge variant="info">
              {meta.category}
            </Badge>
          </div>
        }
      />

      {/* Role Workspace Confirmation Card */}
      <Card className="p-6 border-slate-200/90 shadow-xs bg-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">{meta.title}</h2>
                <Badge variant="success">Access Granted</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Authorized session for <span className="font-semibold text-slate-800">{user?.name}</span> ({user?.role})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Path: <code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-mono text-[11px]">{path}</code></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Role Access</span>
              <Activity className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-sm font-bold text-slate-800">{role}</p>
            <p className="text-xs text-slate-400 mt-1">RBAC Partition Enforced</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Security State</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-sm font-bold text-emerald-700">Authenticated & Protected</p>
            <p className="text-xs text-slate-400 mt-1">Direct token active</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Module Status</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-sm font-bold text-slate-800">Architecture Ready</p>
            <p className="text-xs text-slate-400 mt-1">Scheduled for Step 3</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-3">
          <div className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
            i
          </div>
          <div className="text-xs text-slate-600 leading-relaxed">
            <p className="font-semibold text-slate-800">Hospital Workflow Notice:</p>
            This <span className="font-medium text-blue-700">{meta.title}</span> page route is verified in Step 2 under role authorization.
            The actual clinical datasets and operational forms will be hooked up in subsequent development phases.
          </div>
        </div>
      </Card>
    </div>
  );
};
