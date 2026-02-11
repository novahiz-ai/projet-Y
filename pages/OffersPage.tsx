
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  ChevronRight,
  MessageSquare,
  LayoutGrid,
  Car,
  Home,
  Zap,
  ShieldCheck,
  TrendingUp
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

  const categories = useMemo(() => [
    { id: 'all', label: t('offers.cat_all'), icon: <LayoutGrid size={14} />, types: [] },
    { id: 'mobilite', label: t('offers.cat_mobility'), icon: <Car size={14} />, types: ['auto'] },
    { id: 'habitat', label: t('offers.cat_housing'), icon: <Home size={14} />, types: ['travaux', 'immo'] },
    { id: 'projets', label: t('offers.cat_daily'), icon: <Zap size={14} />, types: ['conso', 'perso', 'projet', 'rapide'] },
    { id: 'gestion', label: t('offers.cat_management'), icon: <ShieldCheck size={14} />, types: ['rachat', 'assurance'] }
  ], [t]);

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
      {/* Immersive Hero Header */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/95 dark:bg-slate-950/95 transition-colors duration-500"></div>
          
          {/* Animated Background Shapes */}
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full animate-pulse pointer-events-none"></div>
          <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 space-y-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-2xl border border-brand-primary/20 backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
                {t('offers.connected_services')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase italic text-slate-950 dark:text-white leading-[0.9] max-w-4xl">
              {t('offers.title')} <br />
              <span className="text-brand-primary drop-shadow-sm">{t('offers.highlight')}</span>
            </h1>
          </motion.div>

          {/* Enhanced Category Bar */}
          <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-6 md:mx-0 md:px-0">
            {categories.map(cat => {
              const count = cat.id === 'all' 
                ? LOAN_OFFERS.length 
                : LOAN_OFFERS.filter(o => cat.types.includes(o.id)).length;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`group flex items-center space-x-3 px-6 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 shrink-0 ${
                    activeTab === cat.id 
                    ? 'bg-brand-primary border-brand-primary text-white shadow-brand scale-105' 
                    : 'bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  <span className={`${activeTab === cat.id ? 'text-white' : 'text-brand-primary'}`}>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[8px] ${
                    activeTab === cat.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-brand-primary/10'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div key="loader" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <motion.div 
              layout
              initial="hidden" 
              animate="visible" 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredOffers.map((offer) => (
                <motion.div 
                  key={offer.id}
                  layout
                  variants={cardVariants}
                  onClick={() => navigate(`/offres/${offer.id}`)}
                  className="group relative bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-3xl transition-all duration-500 cursor-pointer flex flex-col justify-between h-full"
                >
                  <div className="space-y-8">
                    <div className="flex justify-between items-start">
                      <div className={`w-14 h-14 ${offer.color} text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        {getIcon(offer.icon, 28)}
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{t('labels.rate_from')}</p>
                        <p className="text-2xl md:text-3xl font-black text-brand-primary italic leading-none">{offer.minRate}%</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-950 dark:text-white group-hover:text-brand-primary transition-colors italic leading-tight">
                        {t(offer.title)}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-3">
                        {t(offer.description)}
                      </p>
                    </div>
                  </div>
                  <div className="pt-8 mt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-brand-primary transition-colors">
                      {t('labels.see_details')}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-brand-primary group-hover:text-white group-hover:shadow-brand flex items-center justify-center transition-all duration-300">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <section className="mt-32 p-12 lg:p-20 bg-slate-900 rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-3xl">
           <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 blur-[120px] rounded-full"></div>
           <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full"></div>
           
           <div className="space-y-6 relative z-10 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center space-x-3 text-brand-primary">
                 <MessageSquare size={20} className="animate-bounce" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em]">Accompagnement Dédié</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-[0.9]">{t('offers.expert_support')}</h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed">
                Nos analystes financiers vous répondent en direct pour optimiser votre plan de financement.
              </p>
           </div>
           
           <StandardButton 
             variant="white" 
             className="!text-slate-900 !px-12 !py-6 text-lg shadow-2xl relative z-10 active:scale-95" 
             onClick={() => window.location.href = "mailto:Younitedcreditfr@outlook.fr"}
           >
              {t('offers.contact_expert')}
           </StandardButton>
        </section>
        <LegalWarning />
      </div>
    </div>
  );
};

export default OffersPage;
