
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  MessageSquare,
  LayoutGrid,
  Car,
  Home,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { LOAN_OFFERS } from '../constants';
import StandardButton from '../components/StandardButton';
import LegalWarning from '../components/LegalWarning';
import LoanCard from '../components/LoanCard';
import { CardSkeleton } from '../components/Skeleton';
import ApplicationFormModal from '../components/ApplicationFormModal';
import PageHeader from '../components/ui/PageHeader';
import CategoryFilter from '../components/ui/CategoryFilter';

const OffersPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isAppFormOpen, setIsAppFormOpen] = useState(false);
  const [appContext, setAppContext] = useState<any>(null);

  const categories = useMemo(() => [
    { id: 'mobilite', label: t('offers.cat_mobility'), icon: <Car size={14} />, types: ['auto'] },
    { id: 'habitat', label: t('offers.cat_housing'), icon: <Home size={14} />, types: ['travaux', 'immo'] },
    { id: 'projets', label: t('offers.cat_daily'), icon: <Zap size={14} />, types: ['conso', 'perso', 'projet', 'rapide'] },
    { id: 'gestion', label: t('offers.cat_management'), icon: <ShieldCheck size={14} />, types: ['rachat', 'assurance'] }
  ], [t]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const filteredOffers = useMemo(() => {
    if (activeTab === 'all') return LOAN_OFFERS;
    const category = categories.find(c => c.id === activeTab);
    return LOAN_OFFERS.filter(offer => category?.types?.includes(offer.id));
  }, [activeTab, categories]);

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen pb-24">
      <ApplicationFormModal isOpen={isAppFormOpen} onClose={() => setIsAppFormOpen(false)} initialContext={appContext} />
      
      <PageHeader 
        title={t('offers.title')}
        highlight={t('offers.highlight')}
        description={t('offers.desc')}
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
        breadcrumb={[{ label: t('nav.credit') }]}
      />

      <div className="sticky top-20 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-all py-4">
        <div className="max-w-7xl mx-auto px-6">
          <CategoryFilter 
            categories={categories} 
            activeId={activeTab} 
            onSelect={setActiveTab} 
            allLabel={t('offers.cat_all')} 
            MainIcon={LayoutGrid}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <div key="loader" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filteredOffers.map((offer) => (
                <LoanCard key={offer.id} offer={offer} onClick={() => navigate(`/offres/${offer.id}`)} onExpressDemand={(ctx) => {setAppContext(ctx); setIsAppFormOpen(true);}} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <section className="mt-32 p-12 lg:p-20 bg-slate-900 rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-3xl">
           <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 blur-[120px] rounded-full"></div>
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
           <StandardButton variant="white" className="!text-slate-900 !px-12 !py-6 text-lg active:scale-95" onClick={() => window.location.href = "mailto:Younitedcreditfr@outlook.fr"}>
              {t('offers.contact_expert')}
           </StandardButton>
        </section>
        <LegalWarning />
      </div>
    </div>
  );
};

export default OffersPage;
