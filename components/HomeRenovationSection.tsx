import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Home, CheckCircle2, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import StandardButton from './StandardButton';

interface HomeRenovationSectionProps {
  onDiscover: () => void;
}

const HomeRenovationSection: React.FC<HomeRenovationSectionProps> = ({ onDiscover }) => {
  const { t } = useTranslation();
  
  const rawFeatures = t('landing.renovation_features', { returnObjects: true });
  const features = Array.isArray(rawFeatures) ? rawFeatures : [];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-white dark:bg-slate-950">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-[0.03] dark:opacity-[0.05]"
          alt=""
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="inline-flex items-center space-x-3 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 px-5 py-2 rounded-2xl border border-orange-100 dark:border-orange-500/20"
            >
              <Home size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">{t('landing.renovation_label')}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase text-slate-950 dark:text-white">
                {t('landing.renovation_title')}<span className="text-orange-500 italic">{t('landing.renovation_highlight')}</span> <br />
                {t('landing.renovation_subtitle')}
              </h2>
              <p className="mt-8 text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                {t('landing.renovation_desc')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8"
            >
              {features.map((feature, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{feature}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <StandardButton 
                onClick={onDiscover}
                className="!bg-orange-500 hover:!bg-orange-600 !px-10 !py-5 shadow-xl shadow-orange-500/20 group"
              >
                <span className="font-black uppercase tracking-widest text-sm">{t('landing.renovation_cta')}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </StandardButton>
            </motion.div>
          </div>

          <div className="lg:col-span-6 relative h-[580px] md:h-[500px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute z-20 left-4 md:left-10 top-0 md:top-10 w-64 md:w-80 p-8 md:p-10 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6"
            >
              <div className="w-14 h-14 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500">
                <TrendingUp size={32} />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-tight text-slate-950 dark:text-white leading-none">
                  {t('landing.renovation_card_value_title')}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {t('landing.renovation_card_value_desc')}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 20 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="absolute z-30 right-4 md:right-0 bottom-4 md:bottom-10 w-64 md:w-80 p-8 md:p-10 bg-slate-950 rounded-[3.5rem] shadow-3xl border border-slate-800/50 space-y-6"
            >
              <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center text-slate-950">
                <Zap size={32} className="fill-current" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-tight text-white leading-none">
                  {t('landing.renovation_card_saving_title')}
                </h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                  {t('landing.renovation_card_saving_desc')}
                </p>
              </div>
            </motion.div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08),transparent_70%)] pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeRenovationSection;