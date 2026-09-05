import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Clock, AlertCircle, Calendar, Package } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { NotificationItem } from '../../types';

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Emergency Admission',
    message: 'Trauma Unit Alert: Patient admitted to Room 304 under Dr. Harrison.',
    time: '5m ago',
    unread: true,
    type: 'emergency',
  },
  {
    id: '2',
    title: 'Doctor Schedule Update',
    message: 'Dr. Sarah Adams updated Tuesday on-call rotation in Cardiology.',
    time: '24m ago',
    unread: true,
    type: 'appointment',
  },
  {
    id: '3',
    title: 'Pharmacy Inventory Alert',
    message: 'Amoxicillin 500mg supply below safety threshold (14 packs left).',
    time: '1h ago',
    unread: false,
    type: 'inventory',
  },
  {
    id: '4',
    title: 'Payment Settlement',
    message: 'Insurance claim #CLM-8924 approved by BlueCross ($4,250.00).',
    time: '2h ago',
    unread: false,
    type: 'billing',
  },
];

export const NotificationButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const getTypeIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'emergency':
        return <AlertCircle className="w-4 h-4 text-rose-600" />;
      case 'appointment':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'inventory':
        return <Package className="w-4 h-4 text-amber-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'p-2.5 rounded-xl border border-slate-200/90 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-150 cursor-pointer relative shadow-2xs',
          isOpen && 'border-blue-400 bg-blue-50/50 text-blue-600'
        )}
        aria-label="View notifications"
        aria-expanded={isOpen}
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 bg-slate-50/60">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-900">Hospital Notifications</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-100 text-blue-700 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">No new notifications</div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    'p-4 transition-colors duration-150 hover:bg-slate-50 cursor-pointer flex gap-3',
                    item.unread ? 'bg-blue-50/20' : 'bg-white'
                  )}
                >
                  <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <p className="text-xs font-semibold text-slate-900 truncate">{item.title}</p>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.message}</p>
                  </div>
                  {item.unread && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 self-center shrink-0" />
                  )}
                </div>
              ))
            )}
          </div>

          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-center">
            <span className="text-xs text-slate-500 font-medium">MediCare Hospital Dispatch System</span>
          </div>
        </div>
      )}
    </div>
  );
};
