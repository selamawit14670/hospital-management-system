import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AccessDenied } from '../common/AccessDenied';
import { getRoleFromRoute } from '../../data/demoAccounts';
import type { AppRoute, UserRole } from '../../types';

interface RoleGuardProps {
  currentPath: AppRoute;
  onNavigate: (path: AppRoute) => void;
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  currentPath,
  onNavigate,
  children,
  allowedRoles,
}) => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 font-medium">Verifying hospital credentials...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated and path is protected, redirect to login
  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-4">
        <div className="text-center max-w-sm">
          <p className="text-sm font-semibold text-slate-800">Session Required</p>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            You must be signed in with an authorized MediCare staff or patient account to view this page.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
          >
            Go to Staff & Patient Login
          </button>
        </div>
      </div>
    );
  }

  // Determine required role from route path or explicit allowedRoles
  const requiredRole = getRoleFromRoute(currentPath);

  const isPermitted =
    (allowedRoles && allowedRoles.includes(user.role)) ||
    (!allowedRoles && (!requiredRole || user.role === requiredRole));

  if (!isPermitted) {
    return (
      <AccessDenied
        currentRole={user.role}
        attemptedPath={currentPath}
        onNavigate={onNavigate}
        onLogout={logout}
      />
    );
  }

  return <>{children}</>;
};
