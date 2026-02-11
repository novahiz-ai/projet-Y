import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Users, CheckCircle2, Activity } from 'lucide-react';
import { StatsSkeleton } from './Skeleton';

const StatsBar: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { 
      label: t('stats.borrowers'), 
      value: "450k+", 
      icon: <Users size={12} />, 
      color: "text-brand-primary",
      bg: "bg-brand-primary/5"
    },
    { 
      label: t('stats.funds'), 
      value: "2.4Md€", 
      icon: <TrendingUp size={12} />, 
      color: "text-emerald-500",
      bg: "bg-emerald-500/5"
    },
    { 
      label: t('stats.satisfaction'), 
      value: "4.8/5", 
      icon: <CheckCircle2 size={12} />, 
      color: "text-amber-500",
      bg: "bg-amber-500/5"
    }
  ];

  if (isLoading) return <StatsSkeleton />;

  return (
    <section className="w-full max-w-5xl mx-auto h-[60px] flex items-center bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/50 rounded-full lg:rounded-2xl shadow-brand shadow-slate-200/10 dark:shadow-none relative z-30 transition-all duration-500 px-4 lg:px-8 animate-in fade-in zoom-in duration-700">
      <div className="w-full flex items-center justify-between gap-4 h-full">
        <div className="hidden md:flex items-center space-x-2 shrink-0">
           <span className="text-[10px] font-black uppercase tracking-tighter text-slate-950 dark:text-white select-none">LOGO</span>
           <div className="flex flex-col -space-y-1 ml-2">
             <span className="text-[8px] font-black uppercase tracking-tight text-slate-950 dark:text-white">{t('stats.banking')}</span>
             <span className="text-[6px] font-bold uppercase tracking-widest text-slate-400">{t('stats.index')}</span>
           </div>
        </div>

        <div className="hidden md:block h-6 w-px bg-slate-200 dark:bg-slate-800"></div>

        <div className="flex-1 flex items-center justify-around md:justify-center md:space-x-10 lg:space-x-14 h-full">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center space-x-2.5 group cursor-default">
              <div className={`w-7 h-7 rounded-full ${stat.bg} flex items-center justify-center ${stat.color} transition-all duration-500 group-hover:scale-110`}>
                {stat.icon}
              </div>
              <div className="flex flex-col -space-y-0.5">
                <span className="text-sm lg:text-base font-black tracking-tight text-slate-950 dark:text-white leading-none italic">
                  {stat.value}
                </span>
                <span className="text-[7px] lg:text-[8px] font-black uppercase tracking-widest text-slate-400 hidden sm:block">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-2 shrink-0 pl-6 border-l border-slate-200 dark:border-slate-800">
           <Activity size={12} className="text-emerald-500 animate-pulse" />
           <span className="text-[7px] font-black uppercase tracking-[0.25em] text-slate-400">{t('stats.live')}</span>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;