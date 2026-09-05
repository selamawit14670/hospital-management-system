import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Calendar as CalendarIcon,
  AlertCircle,
} from 'lucide-react';
import type { CalendarScheduleItem } from '../../types/dashboard';

interface CalendarSchedulePanelProps {
  schedule: CalendarScheduleItem[];
  onDateChange?: (dateStr: string) => void;
}

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const CalendarSchedulePanel: React.FC<CalendarSchedulePanelProps> = ({
  schedule,
  onDateChange,
}) => {
  // Demo baseline: September 2026
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(8); // 0-indexed, 8 is September
  const [selectedDay, setSelectedDay] = useState(22); // Default to 22 (Tuesday, 22 September)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Calendar math
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateChange?.(dateStr);
  };

  // Format selected day title: e.g. "Tuesday, 22 September"
  const selectedDateObj = new Date(currentYear, currentMonth, selectedDay);
  const dayName = selectedDateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = monthNames[currentMonth];
  const formattedSelectedHeader = `${dayName}, ${selectedDay} ${monthName}`;

  // Check if a day has events (for demo: days 5, 12, 15, 22, 28)
  const hasEvent = (day: number) => [5, 12, 15, 22, 28].includes(day);

  // Filter schedule: if selectedDay is 22, show full schedule; if other event day show sample; if non-event day show empty
  const activeSchedule = hasEvent(selectedDay) ? schedule : [];

  const getTypeBadgeStyle = (type: CalendarScheduleItem['type']) => {
    switch (type) {
      case 'meeting':
        return 'border-l-indigo-500 bg-indigo-50/50 hover:bg-indigo-50';
      case 'consultation':
        return 'border-l-blue-500 bg-blue-50/50 hover:bg-blue-50';
      case 'training':
        return 'border-l-amber-500 bg-amber-50/50 hover:bg-amber-50';
      case 'review':
        return 'border-l-emerald-500 bg-emerald-50/50 hover:bg-emerald-50';
      default:
        return 'border-l-slate-400 bg-slate-50 hover:bg-slate-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Calendar Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Hospital Calendar
            </h3>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              {monthNames[currentMonth]} {currentYear}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {DAYS_OF_WEEK.map((d) => (
            <div key={d} className="text-[11px] font-bold text-slate-400 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Day Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {/* Empty cells before month start */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8 w-8" />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isSelected = day === selectedDay;
            const isToday = day === 5 && currentMonth === 8 && currentYear === 2026;
            const dayHasEvent = hasEvent(day);

            return (
              <button
                key={`day-${day}`}
                type="button"
                onClick={() => handleSelectDay(day)}
                className={`relative h-8 w-8 mx-auto rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : isToday
                    ? 'border border-blue-400 text-blue-600 font-bold bg-blue-50/60'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {day}
                {dayHasEvent && !isSelected && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Schedule Section */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4 text-blue-600" />
            <h4 className="text-xs font-bold text-slate-900 tracking-tight">
              {formattedSelectedHeader}
            </h4>
          </div>
          <span className="text-[10px] font-semibold text-slate-400">
            {activeSchedule.length} events
          </span>
        </div>

        {/* Schedule List */}
        {activeSchedule.length > 0 ? (
          <div className="space-y-2 max-h-68 overflow-y-auto pr-1">
            {activeSchedule.map((item) => (
              <div
                key={item.id}
                className={`p-2.5 rounded-xl border border-slate-200/70 border-l-4 transition-all duration-150 ${getTypeBadgeStyle(
                  item.type
                )}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 tracking-tight">
                    {item.title}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 px-1.5 py-0.5 rounded bg-white/80 border border-slate-200/60 shrink-0">
                    <Clock className="w-3 h-3 text-blue-500" />
                    {item.time}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                  <span className="truncate">{item.doctor}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 shrink-0">
                    <MapPin className="w-2.5 h-2.5" />
                    {item.room}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-5 text-center bg-slate-50/60 rounded-xl border border-slate-200/60">
            <AlertCircle className="w-5 h-5 text-slate-400 mx-auto mb-1.5" />
            <p className="text-xs font-medium text-slate-600">No appointments scheduled for this day.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Click day 22 or 5 to view hospital consultations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
