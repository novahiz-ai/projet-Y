import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { StatsSkeleton } from './Skeleton';
import StatItem from './ui/StatItem';
import { motion } from 'framer-motion';

const StatsBar: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: t('stats.borrowers'), value: "450k+", icon: Users, color: "text-brand-primary", bg: "bg-brand-primary/5" },
    { label: t('stats.funds'), value: "2.4Md€", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/5" },
    { label: t('stats.satisfaction'), value: "4.8/5", icon: CheckCircle2, color: "text-amber-500", bg: "bg-amber-500/5", isSatisfaction: true }
  ];

  if (isLoading) return <StatsSkeleton />;

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="w-full max-w-4xl mx-auto h-[75px] flex items-center bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/50 rounded-full shadow-brand shadow-slate-200/10 dark:shadow-none relative z-30 transition-all px-8"
    >
      <div className="w-full flex items-center justify-around md:justify-center md:space-x-16 lg:space-x-24 h-full">
        {stats.map((stat, i) => (
          <div key={i} className={stat.isSatisfaction ? 'hidden md:block' : 'block'}>
            <StatItem 
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              colorClass={stat.color}
              bgClass={stat.bg}
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default StatsBar;