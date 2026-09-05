import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  Stethoscope,
  Users,
  Building2,
  Clock,
  CreditCard,
  Package,
  MessageSquare,
  FileText,
  Pill,
  FlaskConical,
  Activity,
  FileCheck,
  BedDouble,
  UserPlus,
  IdCard,
  QrCode,
  User,
  ClipboardList,
  Settings,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import type { NavItem, AppRoute } from '../../types';

interface SidebarItemProps {
  item: NavItem;
  isActive: boolean;
  isCollapsed?: boolean;
  onSelect: (path: AppRoute) => void;
}

const iconMap = {
  LayoutDashboard,
  Calendar,
  Stethoscope,
  Users,
  Building2,
  Clock,
  CreditCard,
  Package,
  MessageSquare,
  FileText,
  Pill,
  FlaskConical,
  Activity,
  FileCheck,
  BedDouble,
  UserPlus,
  IdCard,
  QrCode,
  User,
  ClipboardList,
  Settings,
};

export const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isActive,
  isCollapsed = false,
  onSelect,
}) => {
  const IconComponent = iconMap[item.iconName] || LayoutDashboard;

  return (
    <button
      type="button"
      onClick={() => onSelect(item.path)}
      title={isCollapsed ? item.label : undefined}
      className={cn(
        'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 cursor-pointer group text-left relative',
        isActive
          ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25 font-semibold'
          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80',
        isCollapsed && 'justify-center px-2.5 py-2.5'
      )}
    >
      <div
        className={cn(
          'shrink-0 transition-transform group-hover:scale-105',
          isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'
        )}
      >
        <IconComponent className="w-5 h-5" />
      </div>

      {!isCollapsed && (
        <span className="truncate flex-1 tracking-tight">{item.label}</span>
      )}

      {!isCollapsed && item.badge !== undefined && (
        <span
          className={cn(
            'ml-auto text-xs px-2 py-0.5 rounded-full font-semibold shrink-0',
            isActive
              ? 'bg-white/20 text-white'
              : 'bg-blue-50 text-blue-700 border border-blue-100'
          )}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
};
