import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  CheckCircle2,
  Clock,
  Pill,
  Activity,
  FileCheck,
  ClipboardList,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import type { NursingTask } from '../../types/nurse';
import type { AppRoute } from '../../types';

interface NursingTasksCardProps {
  tasks: NursingTask[];
  onToggleTask?: (taskId: string) => void;
  onNavigate?: (path: AppRoute) => void;
}

export const NursingTasksCard: React.FC<NursingTasksCardProps> = ({
  tasks: initialTasks,
  onToggleTask,
  onNavigate,
}) => {
  const [tasks, setTasks] = useState<NursingTask[]>(initialTasks);

  const handleToggle = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
    onToggleTask?.(taskId);
  };

  const getTaskIcon = (type: NursingTask['type']) => {
    switch (type) {
      case 'Administer Medication':
        return Pill;
      case 'Check Vital Signs':
        return Activity;
      case 'Prepare Patient':
        return ClipboardList;
      case 'Update Nursing Notes':
      default:
        return FileCheck;
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base tracking-tight flex items-center gap-2">
              Nursing Tasks
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                {completedCount}/{tasks.length} Done
              </span>
            </h3>
            <p className="text-xs text-slate-400">Medication administration, vitals, and care plan orders</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate?.('/nurse/nursing-records' as AppRoute)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        >
          MAR Sheet
        </button>
      </div>

      {/* Task List */}
      <div className="p-4 space-y-2.5 flex-1 overflow-y-auto max-h-120">
        {tasks.map((task) => {
          const TaskIcon = getTaskIcon(task.type);
          return (
            <div
              key={task.id}
              onClick={() => handleToggle(task.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                task.completed
                  ? 'bg-slate-50/70 border-slate-200/60 opacity-65'
                  : task.priority === 'High Priority'
                  ? 'bg-rose-50/30 border-rose-200 hover:bg-rose-50/60'
                  : task.priority === 'Urgent'
                  ? 'bg-amber-50/20 border-amber-200 hover:bg-amber-50/50'
                  : 'bg-white border-slate-200/80 hover:border-blue-200 hover:shadow-2xs'
              }`}
            >
              {/* Checkbox */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle(task.id);
                }}
                className="mt-0.5 p-0.5 text-blue-600 hover:text-blue-700 focus:outline-none cursor-pointer"
                aria-label={`Toggle task: ${task.title}`}
              >
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300 hover:text-slate-500" />
                )}
              </button>

              {/* Task Details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p
                    className={`text-xs font-bold text-slate-900 leading-snug ${
                      task.completed ? 'line-through text-slate-400' : ''
                    }`}
                  >
                    {task.title}
                  </p>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                      task.completed
                        ? 'bg-slate-100 text-slate-500 border-slate-200'
                        : task.priority === 'High Priority'
                        ? 'bg-rose-100 text-rose-800 border-rose-200'
                        : task.priority === 'Urgent'
                        ? 'bg-amber-100 text-amber-800 border-amber-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {task.dueTime}
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">{task.patientName}</span>
                  <span>•</span>
                  <span className="font-mono bg-slate-100 px-1 py-0.2 rounded border text-[10px]">
                    {task.roomBed}
                  </span>
                </div>

                {task.notes && (
                  <p className="text-[11px] text-slate-400 mt-1 italic line-clamp-1">
                    {task.notes}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
