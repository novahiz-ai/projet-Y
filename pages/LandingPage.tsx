import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Zap, ArrowRight } from 'lucide-react';

import HeroSection from '../components/HeroSection';
import MobileHeroSection from '../components/MobileHeroSection';
import TabletHeroSection from '../components/TabletHeroSection';
import StandardButton from '../components/StandardButton';
import StatsBar from '../components/StatsBar';
import ProcessSteps from '../components/ProcessSteps';
import TestimonialsSection from '../components/TestimonialsSection';
import HomeRenovationSection from '../components/HomeRenovationSection';
import AutoPromoSection from '../components/AutoPromoSection';
import OffersGallery from '../components/OffersGallery';
import TrustBadgeBanner from '../components/TrustBadgeBanner';
import ExpertiseNewsroom from '../components/ExpertiseNewsroom';
import PageWrapper from '../components/layout/PageWrapper';

// Nouvelles Sections
import SecurityVaultSection from '../components/home/SecurityVaultSection';
import ComparisonSection from '../components/home/ComparisonSection';
import EUReachSection from '../components/home/EUReachSection';

interface LandingPageProps {
  onOpenApp: (context?: any) => void;
  onOpenSimulator: (offerId?: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onOpenApp, onOpenSimulator }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageWrapper>
      {/* 1. Hero Sections (Image BG) */}
      <div className="hidden lg:block">
        <HeroSection 
          title={t('landing.hero.title')}
          highlightText={t('landing.hero.highlight')}
          description={t('landing.hero.desc')}
        >
          <div className="flex flex-row items-center gap-3 w-full max-w-2xl">
            <StandardButton 
              onClick={() => onOpenSimulator()} 
              className="flex-1 shadow-brand group"
            >
              <Zap size={16} className="group-hover:fill-white transition-all group-hover:scale-110 shrink-0" />
              <span className="text-xs xl:text-sm">{t('landing.hero.simulate')}</span>
            </StandardButton>
            
            <StandardButton 
              variant="outline" 
              onClick={() => onOpenApp({ express: true })}
              className="flex-1 group !border-slate-100 dark:!border-slate-800"
            >
              <span className="text-xs xl:text-sm">{t('landing.hero.express')}</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="shrink-0"
              >
                <ArrowRight size={16} className="group-hover:text-brand-primary" />
              </motion.div>
            </StandardButton>
          </div>
        </HeroSection>
      </div>

      <div className="hidden md:block lg:hidden">
        <TabletHeroSection onOpenApp={onOpenApp} onOpenSimulator={onOpenSimulator} />
      </div>

      <div className="md:hidden">
        <MobileHeroSection onOpenApp={onOpenApp} onOpenSimulator={onOpenSimulator} />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.01 }}
        className="relative z-10 bg-white dark:bg-slate-950 rounded-t-[3rem] lg:rounded-t-[6rem] mt-[10px] lg:mt-[25px] transition-colors duration-500"
      >
        <div className="pt-8 lg:pt-12 flex justify-center px-4">
          <StatsBar />
        </div>

        {/* 2. Offers Gallery (Fond Blanc) */}
        <OffersGallery 
          onOpenApp={onOpenApp} 
          onNavigateOffer={(id) => navigate(`/offres/${id}`)} 
        />

        {/* 3. Security Vault (Fond Sombre - Deep Navy) */}
        <SecurityVaultSection />

        {/* 4. Process Steps (Fond Gris Doux) */}
        <div className="bg-slate-50 dark:bg-slate-900/40">
          <ProcessSteps />
        </div>

        {/* 5. Comparison Section (Fond Blanc) */}
        <ComparisonSection />

        {/* 6. Trust Badge Banner (Fond Gris Doux) */}
        <div className="bg-slate-50 dark:bg-slate-900/40 py-20 lg:py-32 border-y border-slate-100 dark:border-slate-800">
          <TrustBadgeBanner />
        </div>

        {/* 7. Reno & Auto Promo (Fond Images) */}
        <HomeRenovationSection onDiscover={() => navigate('/offres/travaux')} />
        <AutoPromoSection />

        {/* 8. EU Reach (Fond Sombre / Map) */}
        <EUReachSection />

        {/* 9. Newsroom & Testimonials (Fond Blanc & Alternance) */}
        <div className="bg-white dark:bg-slate-950 py-20 lg:py-32">
          <ExpertiseNewsroom 
            onNavigateArticle={(id) => navigate(`/guide/${id}`)} 
            onNavigateGuide={() => navigate('/guide')}
          />
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 pb-24 lg:pb-0">
          <TestimonialsSection />
        </div>
      </motion.div>
    </PageWrapper>
  );
};

export default LandingPage;