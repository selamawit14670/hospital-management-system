import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { TrendingUp, ChevronDown, Activity } from 'lucide-react';
import type { TrendDataPoint } from '../../types/dashboard';

interface TotalTrendsChartProps {
  data: TrendDataPoint[];
  selectedPeriod: '7d' | '30d';
  onPeriodChange: (period: '7d' | '30d') => void;
}

export const TotalTrendsChart: React.FC<TotalTrendsChartProps> = ({
  data,
  selectedPeriod,
  onPeriodChange,
}) => {
  const [activeSeries, setActiveSeries] = useState({
    appointments: true,
    patientRegistrations: true,
    completedConsultations: true,
  });

  const toggleSeries = (key: keyof typeof activeSeries) => {
    setActiveSeries((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-xl text-xs space-y-1.5 min-w-[170px]">
          <p className="font-bold text-slate-800 border-b border-slate-100 pb-1">{label} Overview</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}
              </span>
              <span className="font-bold text-slate-900">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Total Trends</h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              <Activity className="w-3 h-3" />
              Hospital Activity
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-department patient volume and consultation progression
          </p>
        </div>

        {/* Period Filter Dropdown */}
        <div className="relative inline-block text-left self-start sm:self-auto">
          <select
            value={selectedPeriod}
            onChange={(e) => onPeriodChange(e.target.value as '7d' | '30d')}
            className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 py-1.5 pl-3 pr-8 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Chart Area */}
      <div className="w-full h-64 sm:h-72 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorConsultations" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
              domain={[0, 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />

            {activeSeries.appointments && (
              <Area
                type="monotone"
                dataKey="appointments"
                name="Appointments"
                stroke="#2563eb"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorAppointments)"
              />
            )}

            {activeSeries.completedConsultations && (
              <Area
                type="monotone"
                dataKey="completedConsultations"
                name="Completed Consultations"
                stroke="#7c3aed"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorConsultations)"
              />
            )}

            {activeSeries.patientRegistrations && (
              <Area
                type="monotone"
                dataKey="patientRegistrations"
                name="Patient Registrations"
                stroke="#059669"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRegistrations)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Interactive Legend with toggle states */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-3 mt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => toggleSeries('appointments')}
          className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
            activeSeries.appointments
              ? 'bg-blue-50 text-blue-700 border border-blue-100'
              : 'text-slate-400 opacity-60 hover:opacity-100'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <span>Appointments</span>
        </button>

        <button
          type="button"
          onClick={() => toggleSeries('completedConsultations')}
          className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
            activeSeries.completedConsultations
              ? 'bg-purple-50 text-purple-700 border border-purple-100'
              : 'text-slate-400 opacity-60 hover:opacity-100'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
          <span>Completed Consultations</span>
        </button>

        <button
          type="button"
          onClick={() => toggleSeries('patientRegistrations')}
          className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
            activeSeries.patientRegistrations
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
              : 'text-slate-400 opacity-60 hover:opacity-100'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          <span>Patient Registrations</span>
        </button>
      </div>
    </div>
  );
};
