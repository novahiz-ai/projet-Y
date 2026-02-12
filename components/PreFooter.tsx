
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, HelpCircle, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface PreFooterProps {
  onOpenApp?: (context?: any) => void;
}

const PreFooter: React.FC<PreFooterProps> = ({ onOpenApp }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="bg-slate-50/50 dark:bg-slate-950 py-16 lg:py-24 transition-colors duration-500 border-t border-slate-100 dark:border-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
        >
          
          {/* Card 1: Smart Management */}
          <motion.div variants={cardVariants} className="bg-white dark:bg-slate-900 p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col space-y-8 lg:space-y-10 group hover:border-brand-primary/20 transition-colors">
            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <TrendingUp size={32} />
            </div>
            <div className="space-y-4 lg:space-y-6">
              <h3 className="text-base lg:text-lg font-black text-slate-950 dark:text-white uppercase tracking-wider">
                {t('landing.prefooter.smart_title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm lg:text-base leading-relaxed font-medium">
                {t('landing.prefooter.smart_desc')}
              </p>
            </div>
            <div className="pt-6 mt-auto border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                {t('landing.prefooter.smart_label')}
              </span>
            </div>
          </motion.div>

          {/* Card 2: Help */}
          <motion.div variants={cardVariants} className="bg-white dark:bg-slate-900 p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col space-y-8 lg:space-y-10 group hover:border-brand-primary/20 transition-colors">
            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <HelpCircle size={32} />
            </div>
            <div className="space-y-4 lg:space-y-6">
              <h3 className="text-base lg:text-lg font-black text-slate-950 dark:text-white uppercase tracking-wider">
                {t('nav.resources_menu.help_label')}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm lg:text-base leading-relaxed font-medium">
                {t('landing.prefooter.help_desc')}
              </p>
              <button 
                onClick={() => navigate('/aide')}
                className="text-emerald-500 font-black uppercase text-[10px] tracking-widest flex items-center space-x-2 group/btn"
              >
                <span>{t('landing.prefooter.help_cta')}</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="pt-6 mt-auto border-t border-slate-100 dark:border-slate-800">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                {t('chatbot.brand_label')}
              </span>
            </div>
          </motion.div>

          {/* Card 3: Speed (CTA) */}
          <motion.div variants={cardVariants} className="bg-slate-950 p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3.5rem] shadow-2xl text-white flex flex-col space-y-8 lg:space-y-10 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4"></div>
            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white/10 text-brand-primary rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
              <Zap size={32} className="fill-brand-primary" />
            </div>
            <div className="space-y-4 lg:space-y-6">
              <h3 className="text-base lg:text-lg font-black text-white uppercase tracking-wider">
                {t('landing.prefooter.speed_title')}
              </h3>
              <p className="text-slate-400 text-sm lg:text-base leading-relaxed font-medium">
                {t('landing.prefooter.speed_desc')}
              </p>
            </div>
            <div className="pt-8 mt-auto">
               <button 
                onClick={() => onOpenApp ? onOpenApp() : navigate('/simulateur')}
                className="w-full bg-brand-primary hover:bg-brand-secondary text-white py-5 rounded-2xl lg:rounded-[2rem] font-black text-[11px] lg:text-sm uppercase tracking-widest transition-all shadow-brand flex items-center justify-center space-x-4 active:scale-95"
               >
                 <span>{t('landing.prefooter.speed_btn')}</span>
                 <ArrowRight size={18} />
               </button>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default PreFooter;
