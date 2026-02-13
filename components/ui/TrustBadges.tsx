import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Clock, ShieldCheck } from 'lucide-react';

interface TrustBadgesProps {
  className?: string;
  variant?: 'horizontal' | 'grid';
}

const TrustBadges: React.FC<TrustBadgesProps> = ({ className = "", variant = 'horizontal' }) => {
  const { t } = useTranslation();

  const badgeItems = [
    { 
      icon: <span className="text-brand-primary font-black text-lg">4.8/5</span>, 
      label: t('landing.hero.trustpilot'),
      sub: "Score"
    },
    { 
      icon: <Clock size={16} className="text-brand-primary" />, 
      label: t('landing.hero.response_time'),
      sub: "3 Minutes"
    },
    { 
      icon: <ShieldCheck size={18} className="text-emerald-500" />, 
      label: "Agréé ACPR",
      sub: "Licence EU"
    }
  ];

  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-3 gap-4 ${className}`}>
        {badgeItems.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center space-y-1">
            <div className="h-8 flex items-center justify-center">{item.icon}</div>
            <p className="text-[7px] font-black uppercase tracking-widest text-slate-400 leading-none">{item.label}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-x-10 gap-y-4 ${className}`}>
      {badgeItems.map((item, i) => (
        <div key={i} className="flex items-center space-x-3 group">
          <div className="transition-transform group-hover:scale-110">{item.icon}</div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase text-slate-950 dark:text-white leading-none">{item.sub}</span>
            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mt-1">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;