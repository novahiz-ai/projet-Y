import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './i18n/config';

// Hooks & Utils
import { useTheme } from './hooks/useTheme';
import { useModals } from './hooks/useModals';
import ScrollToTop from './components/navigation/ScrollToTop';

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
import LoginPage from './pages/LoginPage';

// Dashboard Pages
import DashboardHome from './pages/dashboard/DashboardHome';
import CardsPage from './pages/dashboard/CardsPage';

// Components
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import ApplicationFormModal from './components/ApplicationFormModal';
import SimulatorModal from './components/SimulatorModal';
import SearchOverlay from './components/SearchOverlay';
import ConnectivityNotification from './components/ui/ConnectivityNotification';

const DashboardRoutes = () => (
  <DashboardLayout>
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route path="/cards" element={<CardsPage />} />
      <Route path="/loan" element={<div className="p-10 text-center font-black uppercase text-slate-400">Section Demande de prêt bientôt disponible en vue Dashboard</div>} />
      <Route path="/history" element={<div className="p-10 text-center font-black uppercase text-slate-400">Historique des transactions bientôt disponible</div>} />
      <Route path="/transfer-internal" element={<div className="p-10 text-center font-black uppercase text-slate-400">Virement Interne bientôt disponible</div>} />
      <Route path="/transfer-local" element={<div className="p-10 text-center font-black uppercase text-slate-400">Virement Local bientôt disponible</div>} />
      <Route path="/settings" element={<div className="p-10 text-center font-black uppercase text-slate-400">Paramètres profil bientôt disponible</div>} />
    </Routes>
  </DashboardLayout>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const { isDarkMode, setIsDarkMode } = useTheme();
  const { 
    isAppFormOpen, setIsAppFormOpen, appContext, 
    isSearchOpen, setIsSearchOpen, 
    isSimulatorOpen, setIsSimulatorOpen, simulatorOfferId,
    handleOpenAppForm, handleOpenSimulator
  } = useModals();

  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) {
    return <DashboardRoutes />;
  }

  return (
    <MainLayout
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      onSearchOpen={() => setIsSearchOpen(true)}
      onOpenApp={() => handleOpenAppForm()}
      onOpenSimulator={() => handleOpenSimulator()}
    >
      <ScrollToTop />
      <ConnectivityNotification />
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
          <Route path="/login" element={<LoginPage />} />
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