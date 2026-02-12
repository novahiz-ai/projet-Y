
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Car, Clock, Lock, Zap, ArrowRight } from 'lucide-react';
import StandardButton from './StandardButton';

const AutoPromoSection: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative py-20 lg:py-0 lg:h-[550px] bg-white dark:bg-slate-950 overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-[0.03] dark:opacity-[0.05]"
          alt=""
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left: Image Container with restricted height */}
          <div className="lg:col-span-6 relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[3.5rem] border-8 border-slate-50 dark:border-slate-900 shadow-2xl overflow-hidden lg:h-[420px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200" 
                alt="Premium Highway Car"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </motion.div>

            {/* Floating Green Zap Badge */}
            <motion.div 
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.1 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-4 w-20 h-20 lg:w-24 lg:h-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center shadow-2xl z-20"
            >
              <Zap size={32} className="fill-current animate-pulse" />
            </motion.div>
          </div>

          {/* Right: Content block */}
          <div className="lg:col-span-6 space-y-8 lg:py-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="inline-flex items-center space-x-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
                <Car size={16} />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">{t('offers_data.auto.title')} & Mobilité</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tighter uppercase text-slate-950 dark:text-white italic">
                PRENEZ LA <span className="text-emerald-500">ROUTE</span> <br />
                SANS ATTENDRE.
              </h2>

              <p className="text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                Profitez d'un TAEG fixe dès <span className="text-slate-900 dark:text-white font-black">2.5%</span>. 
                Bénéficiez de notre <span className="text-slate-900 dark:text-white font-black italic">Réponse de Principe Immédiate</span>.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800"
              >
                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-tight text-slate-700 dark:text-slate-300 leading-tight">Fonds sous <br/>8 jours**</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800"
              >
                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                  <Lock size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-tight text-slate-700 dark:text-slate-300 leading-tight">Protection <br/>incluse</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-2"
            >
              <StandardButton 
                onClick={() => navigate('/simulateur', { state: { offerId: 'auto' } })}
                className="!bg-emerald-500 hover:!bg-emerald-600 !px-8 !py-4 shadow-xl shadow-emerald-500/20 group"
              >
                <span className="font-black uppercase tracking-widest text-xs">Simuler mon prêt auto</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </StandardButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutoPromoSection;
