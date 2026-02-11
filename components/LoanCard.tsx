
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Zap } from 'lucide-react';
import { LoanOffer } from '../types';
import { getIcon } from '../constants';

interface LoanCardProps {
  offer: LoanOffer;
  onClick?: () => void;
  onExpressDemand?: (context: any) => void;
}

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
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="group relative h-full bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 hover:border-brand-primary/50 transition-all duration-300 shadow-sm hover:shadow-2xl cursor-pointer flex flex-col"
      onClick={offer.id !== 'assurance' ? onClick : undefined}
    >
      <div className="flex justify-between items-start mb-10">
        <div className={`w-16 h-16 ${offer.color} text-white rounded-2xl flex items-center justify-center transform group-hover:rotate-3 transition-transform duration-300 shadow-lg`}>
          {getIcon(offer.icon, 32)}
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 uppercase tracking-widest font-black">{t('labels.rate_from')}</span>
          <div className="text-3xl font-black text-brand-primary italic leading-none mt-1">
            {offer.minRate}%
          </div>
        </div>
      </div>
      
      <h3 className="text-2xl font-black mb-4 group-hover:text-brand-primary transition-colors uppercase tracking-tight">
        {t(offer.title)}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-400 text-base mb-10 line-clamp-3 leading-relaxed font-medium">
        {t(offer.description)}
      </p>
      
      <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <motion.button 
          whileHover={{ x: 4 }}
          onClick={handleExpressClick}
          className="flex items-center space-x-2 text-brand-primary font-black uppercase text-xs tracking-widest"
        >
          <span>{t('labels.express_demand')}</span>
          <Zap size={14} className="fill-brand-primary" />
        </motion.button>
        <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-brand-primary group-hover:text-white transition-all">
          <ChevronRight size={20} />
        </div>
      </div>
    </motion.div>
  );
};

export default LoanCard;
