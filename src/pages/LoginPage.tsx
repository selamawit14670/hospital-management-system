import React, { useState } from 'react';
import {
  Plus,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  ClipboardList,
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import { cn } from '../utils/cn';
import type { UserRole, AppRoute } from '../types';
import { DEMO_ACCOUNTS } from '../data/demoAccounts';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
  onNavigate: (path: AppRoute) => void;
}

interface RoleOption {
  id: UserRole;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hint: string;
}

const roleOptions: RoleOption[] = [
  { id: 'Administrator', label: 'Administrator', icon: ShieldCheck, hint: 'Full Hospital Control' },
  { id: 'Doctor', label: 'Doctor', icon: Stethoscope, hint: 'Clinical EHR & Consults' },
  { id: 'Nurse', label: 'Nurse', icon: HeartPulse, hint: 'Ward Care & Vitals' },
  { id: 'Receptionist', label: 'Receptionist', icon: ClipboardList, hint: 'Intake & Scheduling' },
  { id: 'Patient', label: 'Patient', icon: User, hint: 'Health Portal & Card' },
];

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login } = useAuth();

  // Role selection state (defaults to Administrator)
  const [selectedRole, setSelectedRole] = useState<UserRole>('Administrator');

  // Form inputs
  const [email, setEmail] = useState<string>(DEMO_ACCOUNTS.Administrator.email);
  const [password, setPassword] = useState<string>(DEMO_ACCOUNTS.Administrator.password);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status & error states
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  // Handle switching role
  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
    setShowForgotNotice(false);

    // Automatically load the demo credentials for the selected role to provide frictionless testing
    const demo = DEMO_ACCOUNTS[role];
    if (demo) {
      setEmail(demo.email);
      setPassword(demo.password);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setShowForgotNotice(false);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please provide both hospital email and account password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login({
        email: email.trim(),
        password: password.trim(),
        selectedRole,
        rememberMe,
      });

      if (!result.success) {
        setErrorMessage(result.error || 'Authentication failed. Please check credentials.');
      } else if (result.redirectUrl) {
        onNavigate(result.redirectUrl);
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'System error during authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Login Card */}
      <Card className="p-6 sm:p-8 border-slate-200/90 shadow-xl shadow-slate-200/50 bg-white rounded-2xl">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/25 mb-3">
            <Plus className="w-7 h-7 stroke-[3]" />
          </div>

          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center justify-center gap-1.5">
            MediCare
            <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
          </h2>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
            Hospital Management System
          </p>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Sign in to your account
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Access your hospital workspace securely.
            </p>
          </div>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. Select Your Hospital Role
            </label>
            <span className="text-[11px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              {selectedRole} Selected
            </span>
          </div>

          {/* Grid of 5 Selectable Roles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {roleOptions.slice(0, 4).map((role) => {
              const IconComp = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleSelectRole(role.id)}
                  className={cn(
                    'flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-150 cursor-pointer text-xs font-semibold',
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/30'
                      : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  )}
                >
                  <IconComp
                    className={cn('w-4 h-4 mb-1.5', isSelected ? 'text-white' : 'text-blue-600')}
                  />
                  <span>{role.label}</span>
                  <span
                    className={cn(
                      'text-[10px] font-normal mt-0.5',
                      isSelected ? 'text-blue-100' : 'text-slate-400'
                    )}
                  >
                    {role.hint}
                  </span>
                </button>
              );
            })}

            {/* Patient Option spanning or centered */}
            {roleOptions.slice(4, 5).map((role) => {
              const IconComp = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleSelectRole(role.id)}
                  className={cn(
                    'col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-150 cursor-pointer text-xs font-semibold',
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/30'
                      : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  )}
                >
                  <IconComp
                    className={cn('w-4 h-4 mb-1.5', isSelected ? 'text-white' : 'text-blue-600')}
                  />
                  <span>{role.label}</span>
                  <span
                    className={cn(
                      'text-[10px] font-normal mt-0.5',
                      isSelected ? 'text-blue-100' : 'text-slate-400'
                    )}
                  >
                    {role.hint}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">
              <span className="font-semibold">Authorization Error: </span>
              {errorMessage}
            </div>
          </div>
        )}

        {/* Forgot Password Demo Notice */}
        {showForgotNotice && (
          <div className="mb-5 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-start gap-2 animate-in fade-in duration-200">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Demo Environment Support</p>
              <p className="text-[11px] text-blue-700 mt-0.5">
                Passwords are preconfigured for testing. Click the role cards above to populate default credentials for {selectedRole}.
              </p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Hospital Email
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                @{selectedRole.toLowerCase()}.medicare.com
              </span>
            </div>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@medicare.com"
              leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
              className="rounded-xl text-sm"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotNotice(true)}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter account password"
                leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                className="rounded-xl text-sm pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-xs font-medium text-slate-600">Remember me</span>
            </label>

            <span className="text-[11px] text-slate-400">
              Demo Mode Active
            </span>
          </div>

          {/* Submit Sign In Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full justify-center text-sm font-semibold rounded-xl mt-2 cursor-pointer shadow-md shadow-blue-500/25"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign In as {selectedRole}
          </Button>
        </form>

        {/* Demo Information Notice Box */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-medium mb-3">
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span>Demo environment — use the provided demo account.</span>
          </div>

          {/* Quick Demo Switcher Badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-1">
            {(['Administrator', 'Doctor', 'Nurse', 'Receptionist', 'Patient'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleSelectRole(r)}
                className={cn(
                  'text-[10px] px-2 py-1 rounded-md font-mono transition-colors cursor-pointer border',
                  selectedRole === r
                    ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                )}
              >
                {DEMO_ACCOUNTS[r].email} ({DEMO_ACCOUNTS[r].password})
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Footer Security Note */}
      <div className="text-center mt-4">
        <p className="text-[11px] text-slate-400">
          MediCare HMS v2.4 · HIPAA Compliant · 256-bit Encrypted Session
        </p>
      </div>
    </div>
  );
};
