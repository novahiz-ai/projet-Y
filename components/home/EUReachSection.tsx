import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, TrendingUp, Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FadeIn from '../ui/FadeIn';

const EUReachSection: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: <Users />, val: "1M+", label: t('landing.eu_reach.stats.clients') },
    { icon: <Building2 />, val: "9", label: t('landing.eu_reach.stats.countries') },
    { icon: <TrendingUp />, val: "4Md€", label: t('landing.eu_reach.stats.financed') },
    { icon: <Globe />, val: "EU", label: t('landing.eu_reach.stats.standards') }
  ];

  return (
    <section className="relative py-32 lg:py-52 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-20 grayscale scale-110"
          alt="EU Map"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <FadeIn className="space-y-10">
          <div className="inline-flex items-center space-x-3 bg-white/5 text-brand-orange px-5 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <Globe size={16} className="animate-spin-slow text-brand-orange" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-orange">{t('landing.eu_reach.label')}</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white leading-none">
            {t('landing.eu_reach.title')} <br />
            <span className="text-brand-orange">{t('landing.eu_reach.highlight')}</span>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-24">
             {stats.map((stat, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="space-y-3"
               >
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-orange mx-auto mb-6 shadow-xl border border-white/5">{stat.icon}</div>
                 <p className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter">{stat.val}</p>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
               </motion.div>
             ))}
          </div>
        </FadeIn>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}} />
    </section>
  );
};

export default EUReachSection;