import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getIcon } from '../../constants';

interface HeaderMegaMenuResourcesProps {
  links: any[];
  onClose: () => void;
}

const HeaderMegaMenuResources: React.FC<HeaderMegaMenuResourcesProps> = ({ links, onClose }) => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.98 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }} 
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[380px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-3xl border border-slate-100 dark:border-slate-800 overflow-hidden"
    >
      <div className="p-10 space-y-4">
         {links.map((link) => (
           <Link key={link.path} to={link.path} onClick={onClose} className="flex items-center space-x-6 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 group transition-all">
             <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-950 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
               {getIcon(link.icon || 'Zap', 18)}
             </div>
             <div>
               <p className="text-[12px] font-black uppercase text-slate-950 dark:text-white tracking-tight">{link.name}</p>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{link.desc}</p>
             </div>
           </Link>
         ))}
         <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 px-4">
            <Link to="/à-propos" onClick={onClose} className="flex items-center justify-between group">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-brand-primary transition-colors">{t('nav.resources_menu.expert_center_label')}</span>
              <ArrowRight size={16} className="text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
            </Link>
         </div>
      </div>
    </motion.div>
  );
};

export default HeaderMegaMenuResources;