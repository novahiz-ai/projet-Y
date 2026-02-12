
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Zap, ArrowRight } from 'lucide-react';

import HeroSection from '../components/HeroSection';
import MobileHeroSection from '../components/MobileHeroSection';
import StandardButton from '../components/StandardButton';
import StatsBar from '../components/StatsBar';
import ProcessSteps from '../components/ProcessSteps';
import TestimonialsSection from '../components/TestimonialsSection';
import HomeRenovationSection from '../components/HomeRenovationSection';
import AutoPromoSection from '../components/AutoPromoSection';
import OffersGallery from '../components/OffersGallery';
import TrustBadgeBanner from '../components/TrustBadgeBanner';
import ExpertiseNewsroom from '../components/ExpertiseNewsroom';

interface LandingPageProps {
  onOpenApp: (context?: any) => void;
  onOpenSimulator: (offerId?: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onOpenApp, onOpenSimulator }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Desktop Hero */}
      <div className="hidden lg:block">
        <HeroSection 
          title={t('landing.hero.title')}
          highlightText={t('landing.hero.highlight')}
          description={t('landing.hero.desc')}
        >
          {/* Action Buttons: Single line forced via flex-row and reduced padding */}
          <div className="flex flex-row items-center gap-3 w-full max-w-2xl">
            <StandardButton 
              onClick={() => onOpenSimulator()} 
              className="flex-1 !px-5 !py-4 shadow-brand whitespace-nowrap group"
            >
              <Zap size={16} className="group-hover:fill-white transition-all group-hover:scale-110 shrink-0" />
              <span className="text-xs xl:text-sm">{t('landing.hero.simulate')}</span>
            </StandardButton>
            
            <StandardButton 
              variant="outline" 
              onClick={() => onOpenApp({ express: true })}
              className="flex-1 !px-5 !py-4 group !border-slate-100 dark:!border-slate-800 whitespace-nowrap"
            >
              <span className="text-xs xl:text-sm">{t('landing.hero.express')}</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="shrink-0"
              >
                <ArrowRight size={16} className="group-hover:text-brand-primary" />
              </motion.div>
            </StandardButton>
          </div>
        </HeroSection>
      </div>

      {/* Mobile Hero */}
      <div className="lg:hidden">
        <MobileHeroSection onOpenApp={onOpenApp} onOpenSimulator={onOpenSimulator} />
      </div>

      {/* Main Content Container with optimized responsive layout */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        className="relative z-10 bg-white dark:bg-slate-950 rounded-t-[3rem] lg:rounded-t-[6rem] mt-[10px] lg:mt-[25px] transition-colors duration-500 pb-12 lg:pb-20"
      >
        <div className="pt-8 lg:pt-12 flex justify-center px-4">
          <StatsBar />
        </div>

        <div className="space-y-16 md:space-y-24 lg:space-y-32 py-10 md:py-16 lg:py-24">
          <OffersGallery 
            onOpenApp={onOpenApp} 
            onNavigateOffer={(id) => navigate(`/offres/${id}`)} 
          />
          <ProcessSteps />
          <TrustBadgeBanner />
          <HomeRenovationSection onDiscover={() => navigate('/offres/travaux')} />
          <AutoPromoSection />
          <ExpertiseNewsroom 
            onNavigateArticle={(id) => navigate(`/guide/${id}`)} 
            onNavigateGuide={() => navigate('/guide')}
          />
          <TestimonialsSection />
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
