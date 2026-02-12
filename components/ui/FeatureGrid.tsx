
import React from 'react';
import FadeIn from './FadeIn';
import { LucideIcon } from 'lucide-react';

interface FeatureItem {
  title: string;
  description: string;
  icon?: LucideIcon;
  number?: string;
}

interface FeatureGridProps {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  variant?: 'light' | 'bordered' | 'card';
  accentColorClass?: string;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({ 
  items, columns = 3, variant = 'light', accentColorClass = "text-brand-primary" 
}) => {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4"
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
      {items.map((item, i) => (
        <FadeIn key={i} delay={i * 0.1}>
          <div className={`h-full p-8 rounded-[2.5rem] transition-all group ${
            variant === 'light' ? 'bg-slate-50 dark:bg-slate-900 border border-transparent hover:border-brand-primary/20' :
            variant === 'bordered' ? 'bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:shadow-xl' :
            'bg-white dark:bg-slate-900 shadow-sm border border-slate-50 dark:border-slate-800'
          }`}>
            {item.icon ? (
              <div className={`w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm mb-6 ${accentColorClass} group-hover:scale-110 transition-transform`}>
                <item.icon size={24} />
              </div>
            ) : item.number ? (
              <div className={`w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center font-black mb-4 shadow-sm ${accentColorClass}`}>
                {item.number}
              </div>
            ) : null}
            
            <h4 className="font-black uppercase text-xs text-slate-900 dark:text-white mb-2 tracking-tight">
              {item.title}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {item.description}
            </p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
};

export default FeatureGrid;
