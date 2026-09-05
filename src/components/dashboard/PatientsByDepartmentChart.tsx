import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { ChevronDown, PieChart as PieIcon } from 'lucide-react';
import type { DepartmentStat } from '../../types/dashboard';

interface PatientsByDepartmentChartProps {
  departments: DepartmentStat[];
  totalPatients: number;
}

export const PatientsByDepartmentChart: React.FC<PatientsByDepartmentChartProps> = ({
  departments,
  totalPatients,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  // Custom Donut Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as DepartmentStat;
      return (
        <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-xl text-xs space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
            <span className="font-bold text-slate-900">{data.name}</span>
          </div>
          <div className="text-slate-600 flex justify-between gap-4">
            <span>Patients:</span>
            <span className="font-bold text-slate-800">{data.patientCount}</span>
          </div>
          <div className="text-slate-600 flex justify-between gap-4">
            <span>Share:</span>
            <span className="font-semibold text-blue-600">{data.percentage}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Patients by Department
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Distribution across clinical specialties</p>
        </div>

        {/* Dropdown Filter */}
        <div className="relative inline-block text-left">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as 'today' | 'week' | 'month')}
            className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 py-1.5 pl-3 pr-8 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Donut Chart with Center Text */}
      <div className="relative w-full h-52 flex items-center justify-center my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={departments}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={84}
              paddingAngle={4}
              dataKey="patientCount"
              stroke="none"
            >
              {departments.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Total Count Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {totalPatients}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Patients
          </span>
        </div>
      </div>

      {/* Detailed Department Legend List */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        {departments.map((dept) => (
          <div key={dept.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: dept.color }}
              />
              <span className="font-medium text-slate-700 truncate">{dept.name}</span>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <span className="font-bold text-slate-900">{dept.patientCount}</span>
              <span className="text-[11px] font-medium text-slate-400 w-11 text-right">
                {dept.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
