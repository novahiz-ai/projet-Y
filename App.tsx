
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './i18n/config';

// Pages
import LandingPage from './pages/LandingPage';
import OffersPage from './pages/OffersPage';
import PersonalLoanPage from './pages/PersonalLoanPage';
import ConsumerLoanPage from './pages/ConsumerLoanPage';
import AutoLoanPage from './pages/AutoLoanPage';
import HomeImprovementPage from './pages/HomeImprovementPage';
import FastLoanPage from './pages/FastLoanPage';
import RefinancingPage from './pages/RefinancingPage';
import GeneralLoanPage from './pages/GeneralLoanPage';
import InsurancePage from './pages/InsurancePage';
import ProjectLoanPage from './pages/ProjectLoanPage';
import LegalNoticePage from './pages/LegalNoticePage';
import PrivacyPage from './pages/PrivacyPage';
import CookiesPage from './pages/CookiesPage';
import GuidePage from './pages/GuidePage';
import ArticlePage from './pages/ArticlePage';
import GlossaryPage from './pages/GlossaryPage';
import HelpPage from './pages/HelpPage';
import AboutPage from './pages/AboutPage';
import CreditsPage from './pages/CreditsPage';

// Components
import MainLayout from './components/layout/MainLayout';
import ApplicationFormModal from './components/ApplicationFormModal';
import SimulatorModal from './components/SimulatorModal';
import SearchOverlay from './components/SearchOverlay';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const [isAppFormOpen, setIsAppFormOpen] = useState(false);
  const [appContext, setAppContext] = useState<any>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [simulatorOfferId, setSimulatorOfferId] = useState<string | undefined>(undefined);

  const handleOpenAppForm = (context?: any) => {
    setAppContext(context || null);
    setIsAppFormOpen(true);
    setIsSimulatorOpen(false);
  };

  const handleOpenSimulator = (offerId?: string) => {
    setSimulatorOfferId(offerId);
    setIsSimulatorOpen(true);
  };

  useEffect(() => {
    const handleSim = (e: any) => handleOpenSimulator(e.detail?.offerId);
    window.addEventListener('openSimulator', handleSim);
    return () => window.removeEventListener('openSimulator', handleSim);
  }, []);

  return (
    <MainLayout
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      onSearchOpen={() => setIsSearchOpen(true)}
      onOpenApp={() => handleOpenAppForm()}
      onOpenSimulator={() => handleOpenSimulator()}
    >
      <ScrollToTop />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage onOpenApp={handleOpenAppForm} onOpenSimulator={handleOpenSimulator} />} />
          <Route path="/offres" element={<OffersPage />} />
          <Route path="/offres/auto" element={<AutoLoanPage />} />
          <Route path="/offres/travaux" element={<HomeImprovementPage />} />
          <Route path="/offres/conso" element={<ConsumerLoanPage />} />
          <Route path="/offres/rachat" element={<RefinancingPage />} />
          <Route path="/offres/immo" element={<GeneralLoanPage />} />
          <Route path="/offres/projet" element={<ProjectLoanPage />} />
          <Route path="/offres/assurance" element={<InsurancePage />} />
          <Route path="/offres/rapide" element={<FastLoanPage />} />
          <Route path="/offres/perso" element={<PersonalLoanPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/guide/:id" element={<ArticlePage />} />
          <Route path="/glossaire" element={<GlossaryPage />} />
          <Route path="/aide" element={<HelpPage />} />
          <Route path="/à-propos" element={<AboutPage />} />
          <Route path="/credits" element={<CreditsPage />} />
          <Route path="/mentions-legales" element={<LegalNoticePage />} />
          <Route path="/confidentialite" element={<PrivacyPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      <AnimatePresence>
        {isSimulatorOpen && (
          <SimulatorModal 
            isOpen={isSimulatorOpen} 
            onClose={() => setIsSimulatorOpen(false)} 
            onProceedToApp={handleOpenAppForm}
            initialOfferId={simulatorOfferId}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAppFormOpen && (
          <ApplicationFormModal isOpen={isAppFormOpen} onClose={() => setIsAppFormOpen(false)} initialContext={appContext} />
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

const App: React.FC = () => (
  <Router><AppContent /></Router>
);

export default App;
