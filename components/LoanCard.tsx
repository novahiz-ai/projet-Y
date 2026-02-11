import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Zap, ArrowUpRight } from 'lucide-react';
import { LoanOffer } from '../types';
import { getIcon } from '../constants';

interface LoanCardProps {
  offer: LoanOffer;
  onClick?: () => void;
  onExpressDemand?: (context: any) => void;
}

const FloatingIcons = ({ iconName }: { iconName: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04] dark:opacity-[0.07]">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            x: [0, 15, -15, 0],
            y: [0, -20, 20, 0],
            rotate: [0, 45, -45, 0]
          }}
          transition={{ 
            duration: 15 + (i * 5), 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute"
          style={{ 
            left: `${20 + (i * 30)}%`, 
            top: `${10 + (i * 25)}%`,
          }}
        >
          {getIcon(iconName, 120 + (i * 20))}
        </motion.div>
      ))}
    </div>
  );
};

const LoanCard: React.FC<LoanCardProps> = ({ offer, onClick, onExpressDemand }) => {
  const { t } = useTranslation();
  
  const handleExpressClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onExpressDemand) {
      onExpressDemand({ loanId: offer.id, amount: 15000, duration: 48 });
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative h-[420px] bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:border-brand-primary/30 transition-all duration-500 shadow-xl shadow-slate-200/20 dark:shadow-none cursor-pointer overflow-hidden flex flex-col"
      onClick={offer.id !== 'assurance' ? onClick : undefined}
    >
      {/* Animated Icon Background */}
      <FloatingIcons iconName={offer.icon} />

      {/* Glossy Overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/5 pointer-events-none" />

      <div className="relative z-10 p-8 flex flex-col h-full">
        {/* Header: Icon & Rate */}
        <div className="flex justify-between items-start mb-8">
          <div className={`w-16 h-16 ${offer.color} text-white rounded-[1.5rem] flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-current/20`}>
            {getIcon(offer.icon, 32)}
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-100 dark:border-slate-700 text-right">
            <span className="text-[8px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest block leading-none mb-1">{t('labels.rate_from')}</span>
            <div className="text-xl font-black text-brand-primary italic leading-none">
              {offer.minRate}%
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors uppercase tracking-tighter italic">
            {t(offer.title)}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium line-clamp-3">
            {t(offer.description)}
          </p>
        </div>

        {/* Footer: Primary Action & Info */}
        <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-50 dark:border-slate-800/50">
          <button 
            onClick={handleExpressClick}
            className="flex items-center space-x-2.5 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary px-5 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-brand-primary hover:text-white transition-all shadow-sm active:scale-95"
          >
            <Zap size={14} className="fill-current" />
            <span>{t('labels.express_demand')}</span>
          </button>
          
          <div className="w-11 h-11 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-primary/30 transition-all">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>

      {/* Hover Light Effect */}
      <div className="absolute -inset-px bg-gradient-to-r from-brand-primary/0 via-brand-primary/10 to-brand-primary/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl pointer-events-none" />
    </motion.div>
  );
};

export default LoanCard;