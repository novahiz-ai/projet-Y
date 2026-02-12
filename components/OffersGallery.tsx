
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, PlusCircle, MinusCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LOAN_OFFERS } from '../constants';
import LoanCard from './LoanCard';

interface OffersGalleryProps {
  onOpenApp: (context?: any) => void;
  onNavigateOffer: (id: string) => void;
}

const OffersGallery: React.FC<OffersGalleryProps> = ({ onOpenApp, onNavigateOffer }) => {
  const { t } = useTranslation();
  
  // Requirement: 3 items per line. Start with 3, add 3 each time.
  const [visibleCount, setVisibleCount] = useState(3);
  const totalOffers = LOAN_OFFERS.length;
  const isAllShown = visibleCount >= totalOffers;

  const handleToggleLoad = () => {
    if (isAllShown) {
      setVisibleCount(3); // Reset to 1 line
      const gallery = document.getElementById('solutions-gallery');
      if (gallery) {
        window.scrollTo({
          top: gallery.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    } else {
      setVisibleCount(prev => Math.min(prev + 3, totalOffers));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="solutions-gallery" className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
            {t('landing.solutions_title')}<span className="text-brand-primary">{t('landing.solutions_highlight')}</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl">{t('landing.solutions_desc')}</p>
        </div>
        <Link to="/offres" className="group flex items-center space-x-3 bg-slate-100 dark:bg-slate-900 px-8 py-4 rounded-full text-sm font-black uppercase tracking-widest transition-all hover:bg-brand-primary hover:text-white">
          <span>{t('landing.view_catalog')}</span>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      {/* Grid: 3 items per row on Desktop as requested */}
      <motion.div 
        variants={containerVariants} 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        <AnimatePresence mode="popLayout">
          {LOAN_OFFERS.slice(0, visibleCount).map((offer) => (
            <motion.div 
              key={offer.id} 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              layout
            >
              <LoanCard 
                offer={offer} 
                onExpressDemand={onOpenApp} 
                onClick={() => onNavigateOffer(offer.id)} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Progressive Load Button */}
      <div className="mt-20 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggleLoad}
          className={`flex items-center space-x-3 px-12 py-5 rounded-[2rem] font-black uppercase text-[11px] tracking-[0.2em] transition-all shadow-xl ${
            isAllShown 
              ? 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-rose-500 hover:text-white' 
              : 'bg-brand-primary text-white shadow-brand shadow-brand-primary/30'
          }`}
        >
          {isAllShown ? (
            <>
              <MinusCircle size={20} />
              <span>{t('labels.load_less')}</span>
            </>
          ) : (
            <>
              <PlusCircle size={20} />
              <span>{t('labels.load_more')}</span>
            </>
          )}
        </motion.button>
      </div>
    </section>
  );
};

export default OffersGallery;
