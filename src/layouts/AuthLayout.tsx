import React from 'react';
import { Plus } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 flex flex-col justify-center items-center p-4">
      {/* Brand Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
          <Plus className="w-7 h-7 stroke-[3]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">MediCare</h1>
          <p className="text-xs text-slate-500 font-medium">Hospital Management System</p>
        </div>
      </div>

      <div className="w-full max-w-md">{children}</div>

      <p className="mt-8 text-xs text-slate-400 text-center">
        Protected by MediCare Enterprise Security & Audit System &copy; 2026
      </p>
    </div>
  );
};
