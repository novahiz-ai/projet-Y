import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { LOAN_OFFERS, getIcon } from '../constants';
import StandardButton from '../components/StandardButton';
import LegalWarning from '../components/LegalWarning';
import { CardSkeleton } from '../components/Skeleton';

const OffersPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'all', label: t('offers.cat_all') },
    { id: 'mobilite', label: t('offers.cat_mobility'), types: ['auto'] },
    { id: 'habitat', label: t('offers.cat_housing'), types: ['travaux', 'immo'] },
    { id: 'projets', label: t('offers.cat_daily'), types: ['conso', 'perso', 'projet', 'rapide'] },
    { id: 'gestion', label: t('offers.cat_management'), types: ['rachat', 'assurance'] }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const filteredOffers = useMemo(() => {
    if (activeTab === 'all') return LOAN_OFFERS;
    const category = categories.find(c => c.id === activeTab);
    return LOAN_OFFERS.filter(offer => category?.types?.includes(offer.id));
  }, [activeTab, categories]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen pb-24">
      <section className="relative min-h-[50vh] flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/90 dark:bg-slate-950/90 transition-colors duration-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 space-y-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">LOGO Core v2.4</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase italic text-slate-950 dark:text-white leading-[0.95]">
              {t('offers.title')} <br />
              <span className="text-brand-primary">{t('offers.highlight')}</span>
            </h1>
          </motion.div>

          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-4 md:mx-0 md:px-0">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 shrink-0 ${
                  activeTab === cat.id 
                  ? 'bg-brand-primary border-brand-primary text-white shadow-lg' 
                  : 'bg-white/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 text-slate-500'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div key="loader" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <motion.div initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => (
                <motion.div 
                  key={offer.id}
                  variants={cardVariants}
                  onClick={() => navigate(`/offres/${offer.id}`)}
                  className="group relative bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between h-full"
                >
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className={`w-12 h-12 ${offer.color} text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all`}>
                        {getIcon(offer.icon, 24)}
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">{t('labels.rate_from')}</p>
                        <p className="text-xl md:text-2xl font-black text-brand-primary italic leading-none">{offer.minRate}%</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-slate-950 dark:text-white group-hover:text-brand-primary transition-colors">{t(offer.title)}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-2">{t(offer.description)}</p>
                    </div>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{t('labels.see_details')}</span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-brand-primary group-hover:text-white flex items-center justify-center transition-all">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <section className="mt-24 p-12 bg-slate-900 rounded-[3.5rem] text-white flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full"></div>
           <div className="space-y-4 relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 text-brand-primary">
                 <MessageSquare size={18} />
                 <span className="text-[9px] font-black uppercase tracking-widest">{t('offers.dedicated_support')}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic">{t('offers.expert_support')}</h2>
           </div>
           <StandardButton variant="white" className="!text-slate-900 !px-10 shadow-2xl relative z-10" onClick={() => window.location.href = "mailto:Younitedcreditfr@outlook.fr"}>
              {t('offers.contact_expert')}
           </StandardButton>
        </section>
        <LegalWarning />
      </div>
    </div>
  );
};

export default OffersPage;