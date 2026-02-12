
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatItemProps {
  label: string;
  value: string;
  icon?: LucideIcon;
  colorClass?: string;
  bgClass?: string;
  size?: 'sm' | 'lg';
}

const StatItem: React.FC<StatItemProps> = ({ 
  label, value, icon: Icon, colorClass = "text-brand-primary", bgClass = "bg-brand-primary/5", size = 'sm' 
}) => {
  if (size === 'lg') {
    return (
      <div className="space-y-3 text-center">
        <p className={`text-6xl lg:text-7xl font-black italic ${colorClass}`}>{value}</p>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">{label}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4 group cursor-default">
      {Icon && (
        <div className={`w-10 h-10 rounded-xl ${bgClass} flex items-center justify-center ${colorClass} transition-all duration-500 group-hover:scale-110 shadow-sm`}>
          <Icon size={18} />
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-tight text-slate-950 dark:text-white leading-none italic">
          {value}
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">
          {label}
        </span>
      </div>
    </div>
  );
};

export default StatItem;
