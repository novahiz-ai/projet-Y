
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
import LoanCard from '../components/LoanCard';
import { CardSkeleton } from '../components/Skeleton';
import ApplicationFormModal from '../components/ApplicationFormModal';

const OffersPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isAppFormOpen, setIsAppFormOpen] = useState(false);
  const [appContext, setAppContext] = useState<any>(null);

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

  const handleOpenApp = (ctx: any) => {
    setAppContext(ctx);
    setIsAppFormOpen(true);
  };

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen pb-24">
      <ApplicationFormModal isOpen={isAppFormOpen} onClose={() => setIsAppFormOpen(false)} initialContext={appContext} />
      
      {/* Immersive Hero Header */}
      <section className="relative h-auto lg:min-h-[60vh] flex items-center overflow-hidden pt-24 lg:pt-32 pb-10 lg:pb-16">
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

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 space-y-8 lg:space-y-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase italic text-slate-950 dark:text-white leading-[0.9] max-w-4xl">
                {t('offers.title')} <br />
                <span className="text-brand-primary drop-shadow-sm">{t('offers.highlight')}</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base md:text-xl font-medium max-w-2xl leading-relaxed">
                {t('offers.desc')}
              </p>
            </div>
          </motion.div>

          {/* Enhanced Category Bar */}
          <div className="flex items-center space-x-2 lg:space-x-3 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-2 lg:pb-6 md:mx-0 md:px-0">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`group flex items-center space-x-2 lg:space-x-3 px-4 lg:px-6 py-3 lg:py-4 rounded-[1.2rem] lg:rounded-[1.5rem] text-[9px] lg:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 shrink-0 ${
                  activeTab === cat.id 
                  ? 'bg-brand-primary border-brand-primary text-white shadow-brand scale-105' 
                  : 'bg-white dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200 dark:hover:border-slate-700'
                }`}
              >
                <span className={`${activeTab === cat.id ? 'text-white' : 'text-brand-primary'}`}>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div key="loader" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
            >
              {filteredOffers.map((offer) => (
                <LoanCard 
                  key={offer.id} 
                  offer={offer} 
                  onClick={() => navigate(`/offres/${offer.id}`)}
                  onExpressDemand={handleOpenApp}
                />
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
