import React from 'react';
import { ShieldAlert, ArrowRight, LogOut } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { Badge } from './Badge';
import type { UserRole, AppRoute } from '../../types';
import { ROLE_DEFAULT_ROUTES } from '../../data/demoAccounts';

interface AccessDeniedProps {
  currentRole: UserRole | null;
  attemptedPath: string;
  onNavigate: (path: AppRoute) => void;
  onLogout: () => void;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({
  currentRole,
  attemptedPath,
  onNavigate,
  onLogout,
}) => {
  const targetHome = currentRole ? ROLE_DEFAULT_ROUTES[currentRole] : '/login';

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="max-w-lg w-full text-center border-rose-200 shadow-sm bg-white p-8">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-2xs">
          <ShieldAlert className="w-9 h-9" />
        </div>

        <div className="inline-flex items-center gap-1.5 mb-3">
          <Badge variant="danger" dot>
            403 Security Enforcement
          </Badge>
        </div>

        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Access Denied — Role Authorization Required
        </h2>

        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          Your current account role <span className="font-bold text-slate-900">({currentRole || 'Guest'})</span> is
          not authorized to access the requested medical workspace:
        </p>

        <div className="my-4 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-rose-700 break-all select-all">
          {attemptedPath}
        </div>

        <p className="text-[11px] text-slate-400 mb-6">
          Hospital records and clinical operations are strictly partitioned by credential privilege under HIPAA & MediCare RBAC rules.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => onNavigate(targetHome)}
          >
            Go to {currentRole ? `${currentRole} Dashboard` : 'Login'}
          </Button>

          <Button
            variant="outline"
            size="md"
            leftIcon={<LogOut className="w-4 h-4" />}
            onClick={onLogout}
          >
            Switch Account
          </Button>
        </div>
      </Card>
    </div>
  );
};
