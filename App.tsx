import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './i18n/config';

// Hooks & Utils
import { useTheme } from './hooks/useTheme';
import { useModals } from './hooks/useModals';
import ScrollToTop from './components/navigation/ScrollToTop';

// Components (Non-lazy for base UI consistency)
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import ApplicationFormModal from './components/ApplicationFormModal';
import SimulatorModal from './components/SimulatorModal';
import SearchOverlay from './components/SearchOverlay';
import ConnectivityNotification from './components/ui/ConnectivityNotification';

// Pages - Lazy Loaded for Maximum Speed (Code Splitting)
const LandingPage = lazy(() => import('./pages/LandingPage'));
const OffersPage = lazy(() => import('./pages/OffersPage'));
const PersonalLoanPage = lazy(() => import('./pages/PersonalLoanPage'));
const ConsumerLoanPage = lazy(() => import('./pages/ConsumerLoanPage'));
const AutoLoanPage = lazy(() => import('./pages/AutoLoanPage'));
const HomeImprovementPage = lazy(() => import('./pages/HomeImprovementPage'));
const FastLoanPage = lazy(() => import('./pages/FastLoanPage'));
const RefinancingPage = lazy(() => import('./pages/RefinancingPage'));
const GeneralLoanPage = lazy(() => import('./pages/GeneralLoanPage'));
const InsurancePage = lazy(() => import('./pages/InsurancePage'));
const ProjectLoanPage = lazy(() => import('./pages/ProjectLoanPage'));
const LegalNoticePage = lazy(() => import('./pages/LegalNoticePage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const CookiesPage = lazy(() => import('./pages/CookiesPage'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'));
const HelpPage = lazy(() => import('./pages/HelpPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CreditsPage = lazy(() => import('./pages/CreditsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

// Dashboard Pages
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'));
const CardsPage = lazy(() => import('./pages/dashboard/CardsPage'));

// Fast Loading Fallback
const PageLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-slate-950 z-[1000]">
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-12 h-12 border-4 border-slate-100 dark:border-slate-800 border-t-brand-primary rounded-full animate-spin" 
    />
  </div>
);

const DashboardRoutes = () => (
  <DashboardLayout>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/loan" element={<div className="p-10 text-center font-black uppercase text-slate-400">Section Demande de prêt bientôt disponible en vue Dashboard</div>} />
        <Route path="/history" element={<div className="p-10 text-center font-black uppercase text-slate-400">Historique des transactions bientôt disponible</div>} />
        <Route path="/transfer-internal" element={<div className="p-10 text-center font-black uppercase text-slate-400">Virement Interne bientôt disponible</div>} />
        <Route path="/transfer-local" element={<div className="p-10 text-center font-black uppercase text-slate-400">Virement Local bientôt disponible</div>} />
        <Route path="/settings" element={<div className="p-10 text-center font-black uppercase text-slate-400">Paramètres profil bientôt disponible</div>} />
      </Routes>
    </Suspense>
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
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
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