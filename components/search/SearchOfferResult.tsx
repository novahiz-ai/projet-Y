import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
// Fix: Import getIcon from the correct location
import { getIcon } from '../../infrastructure/IconRegistry';
import { LoanOffer } from '../../types';

interface SearchOfferResultProps {
  offer: LoanOffer;
  title: string;
  rateLabel: string;
  onClick: () => void;
}

const SearchOfferResult: React.FC<SearchOfferResultProps> = ({ offer, title, rateLabel, onClick }) => {
  return (
    <motion.button 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={onClick} 
      className="flex items-center justify-between p-5 rounded-[2rem] bg-slate-50/50 dark:bg-slate-800/30 border border-transparent hover:border-brand-primary/20 hover:bg-brand-primary/5 transition-all group w-full text-left"
    >
      <div className="flex items-center space-x-5">
        <div className={`w-12 h-12 ${offer.color} text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all`}>
          {getIcon(offer.icon, 24)}
        </div>
        <div>
          <p className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-tight">{title}</p>
          <p className="text-[10px] text-brand-primary font-black uppercase tracking-widest mt-0.5">{rateLabel} {offer.minRate}%</p>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all">
        <ChevronRight size={16} />
      </div>
    </motion.button>
  );
};

export default SearchOfferResult;