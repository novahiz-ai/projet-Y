import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// Fix: Import getIcon from the correct location
import { getIcon } from '../../infrastructure/IconRegistry';
import StandardButton from '../StandardButton';

interface HeaderMegaMenuCreditProps {
  links: any[];
  onOpenSimulator: () => void;
  onClose: () => void;
}

const HeaderMegaMenuCredit: React.FC<HeaderMegaMenuCreditProps> = ({ links, onOpenSimulator, onClose }) => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.98 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }} 
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[750px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-3xl border border-slate-100 dark:border-slate-800 overflow-hidden"
    >
      <div className="grid grid-cols-12">
        <div className="col-span-8 p-12 grid grid-cols-2 gap-x-8 gap-y-8">
          {links.map((link) => (
            <Link key={link.path} to={link.path} onClick={onClose} className="flex items-start space-x-5 group">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                {getIcon(link.icon || 'Zap', 18)}
              </div>
              <div>
                <p className="text-[12px] font-black uppercase tracking-tight text-slate-950 dark:text-white group-hover:text-brand-primary transition-colors">{link.name}</p>
                <p className="text-[10px] text-slate-400 font-medium leading-tight mt-1.5 uppercase tracking-tighter">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="col-span-4 bg-slate-50 dark:bg-slate-950 p-12 flex flex-col justify-between border-l border-slate-100 dark:border-slate-800">
           <div className="space-y-6">
              <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-brand">
                <Zap size={24} className="fill-current" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest italic">{t('landing.hero.simulate')}</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Solution de financement instantanée.</p>
           </div>
           <StandardButton onClick={() => { onOpenSimulator(); onClose(); }} className="w-full !py-4 shadow-brand !rounded-2xl !text-xs">Simuler</StandardButton>
        </div>
      </div>
    </motion.div>
  );
};

export default HeaderMegaMenuCredit;