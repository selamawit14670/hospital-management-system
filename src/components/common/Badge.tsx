import React from 'react';
import { cn } from '../../utils/cn';
import type { BadgeVariant } from '../../types';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  dot = false,
  children,
  className,
  ...props
}) => {
  const variants: Record<BadgeVariant, { container: string; dot: string }> = {
    primary: {
      container: 'bg-blue-50 text-blue-700 border-blue-200/80',
      dot: 'bg-blue-600',
    },
    success: {
      container: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      dot: 'bg-emerald-500',
    },
    warning: {
      container: 'bg-amber-50 text-amber-700 border-amber-200/80',
      dot: 'bg-amber-500',
    },
    danger: {
      container: 'bg-rose-50 text-rose-700 border-rose-200/80',
      dot: 'bg-rose-500',
    },
    info: {
      container: 'bg-sky-50 text-sky-700 border-sky-200/80',
      dot: 'bg-sky-500',
    },
    neutral: {
      container: 'bg-slate-100 text-slate-700 border-slate-200/80',
      dot: 'bg-slate-500',
    },
    purple: {
      container: 'bg-purple-50 text-purple-700 border-purple-200/80',
      dot: 'bg-purple-500',
    },
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap',
        variants[variant].container,
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', variants[variant].dot)} />}
      <span>{children}</span>
    </span>
  );
};
