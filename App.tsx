import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './i18n/config';
import { 
  Sun, 
  Moon, 
  X, 
  ChevronDown, 
  Search,
  Home,
  LayoutGrid,
  Zap,
  BookOpen,
  Calculator,
  HelpCircle,
  SlidersHorizontal,
  FileText,
  ShieldAlert,
  Lock,
  SpellCheck
} from 'lucide-react';

// Pages
import LandingPage from './pages/LandingPage';
import SimulatorPage from './pages/SimulatorPage';
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
import ApplicationFormModal from './components/ApplicationFormModal';
import SearchResults from './components/SearchResults';
import PreFooter from './components/PreFooter';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import ConsentPopover from './components/ConsentPopover';
import LanguageSwitcher from './components/LanguageSwitcher';
import { PageTransitionSkeleton } from './components/Skeleton';
import { LOAN_OFFERS, getIcon } from './constants';

const BRAND_NAME = "YOUNITED";

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

const AnimatedMenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-5 h-5 flex items-center justify-center">
    <motion.div animate={isOpen ? { opacity: 0, scale: 0.5, rotate: 90 } : { opacity: 1, scale: 1, rotate: 0 }} className="grid grid-cols-2 gap-1">
      <div className="w-1.5 h-1.5 rounded-sm bg-current" /><div className="w-1.5 h-1.5 rounded-sm bg-current" />
      <div className="w-1.5 h-1.5 rounded-sm bg-current" /><div className="w-1.5 h-1.5 rounded-sm bg-current" />
    </motion.div>
    <motion.div initial={{ opacity: 0, scale: 0.5, rotate: -90 }} animate={isOpen ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -90 }} className="absolute inset-0 flex items-center justify-center">
      <X size={20} />
    </motion.div>
  </div>
);

const MobileOffCanvas: React.FC<{ isOpen: boolean; onClose: () => void; onOpenApp: (context?: any, event?: React.MouseEvent | null) => void }> = ({ isOpen, onClose, onOpenApp }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRTL = i18n.language === 'ar';
  const [isOffersExpanded, setIsOffersExpanded] = useState(false);
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="lg:hidden fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[200]" onClick={onClose} />
          <motion.div 
            initial={{ x: isRTL ? '100%' : '-100%' }} animate={{ x: 0 }} exit={{ x: isRTL ? '100%' : '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }} 
            className={`lg:hidden fixed top-0 ${isRTL ? 'right-0' : 'left-0'} bottom-0 w-[85%] max-w-[380px] bg-white dark:bg-slate-950 z-[210] shadow-[20px_0_60px_rgba(0,0,0,0.1)] flex flex-col border-r border-slate-100 dark:border-slate-800`}
          >
            <div className="px-4 py-[5px] flex items-center justify-between border-b border-slate-100 dark:border-slate-900/50 min-h-[65px]">
              <Link to="/" onClick={onClose} className="font-black tracking-tighter uppercase text-xl text-slate-950 dark:text-white italic">{BRAND_NAME}</Link>
              <button onClick={onClose} className="w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-500 transition-colors hover:text-rose-500"><X size={18} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              <div className="space-y-2">
                <Link to="/" onClick={onClose} className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${isRTL ? 'space-x-reverse' : ''} ${isActive('/') ? 'bg-brand-primary text-white shadow-brand' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'}`}>
                  <span className={isActive('/') ? 'text-white' : 'text-brand-primary'}><Home size={20} /></span>
                  <span className="text-sm font-bold uppercase tracking-tight">{t('nav.home')}</span>
                </Link>

                <Link to="/simulateur" onClick={onClose} className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${isRTL ? 'space-x-reverse' : ''} ${isActive('/simulateur') ? 'bg-brand-primary text-white shadow-brand' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'}`}>
                  <span className={isActive('/simulateur') ? 'text-white' : 'text-brand-primary'}><Calculator size={20} /></span>
                  <span className="text-sm font-bold uppercase tracking-tight">{t('nav.simulator')}</span>
                </Link>

                <div className="space-y-2">
                  <button onClick={() => setIsOffersExpanded(!isOffersExpanded)} className={`flex items-center justify-between w-full p-4 rounded-2xl transition-all ${isOffersExpanded ? 'bg-slate-50 dark:bg-slate-900' : 'text-slate-600 dark:text-slate-400'}`}>
                    <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                      <LayoutGrid size={20} className={isOffersExpanded ? 'text-brand-primary' : 'text-slate-400'} />
                      <span className="text-sm font-bold uppercase tracking-tight">{t('nav.credit')}</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isOffersExpanded ? 'rotate-180 text-brand-primary' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOffersExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl">
                        <div className="p-2 grid grid-cols-1 gap-1">
                          {LOAN_OFFERS.map(offer => (
                            <Link key={offer.id} to={`/offres/${offer.id}`} onClick={onClose} className={`flex items-center space-x-4 p-3 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all group ${isRTL ? 'space-x-reverse' : ''}`}>
                              <div className={`w-8 h-8 ${offer.color} text-white rounded-lg flex items-center justify-center shadow-sm shrink-0`}>{getIcon(offer.icon, 16)}</div>
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">{t(offer.title)}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link to="/guide" onClick={onClose} className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${isRTL ? 'space-x-reverse' : ''} ${isActive('/guide') ? 'bg-brand-primary text-white shadow-brand' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'}`}>
                  <span className={isActive('/guide') ? 'text-white' : 'text-brand-primary'}><BookOpen size={20} /></span>
                  <span className="text-sm font-bold uppercase tracking-tight">{t('nav.guide')}</span>
                </Link>

                <Link to="/aide" onClick={onClose} className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${isRTL ? 'space-x-reverse' : ''} ${isActive('/aide') ? 'bg-brand-primary text-white shadow-brand' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'}`}>
                  <span className={isActive('/aide') ? 'text-white' : 'text-brand-primary'}><HelpCircle size={20} /></span>
                  <span className="text-sm font-bold uppercase tracking-tight">{t('nav.help')}</span>
                </Link>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-900">
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { label: t('footer.legal'), path: '/mentions-legales', icon: <FileText size={16} /> },
                    { label: t('footer.privacy'), path: '/confidentialite', icon: <ShieldAlert size={16} /> },
                    { label: t('footer.cookies'), path: '/cookies', icon: <Lock size={16} /> },
                  ].map((item) => (
                    <Link key={item.path} to={item.path} onClick={onClose} className={`flex items-center space-x-4 px-4 py-2.5 text-slate-500 dark:text-slate-500 hover:text-brand-primary transition-colors ${isRTL ? 'space-x-reverse' : ''}`}>
                      <span>{item.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-900/50">
              <button onClick={() => { onClose(); onOpenApp({ express: true }, null); }} className={`w-full bg-brand-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-brand flex items-center justify-center space-x-3 active:scale-95 transition-all ${isRTL ? 'space-x-reverse' : ''}`}>
                <Zap size={16} className="fill-white" />
                <span>{t('nav.request')}</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const MobileBottomNav: React.FC<{ onSimulate: () => void; isVisible: boolean }> = ({ onSimulate, isVisible }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRTL = i18n.language === 'ar';
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: <Home size={20} />, label: t('nav.home'), path: "/" },
    { icon: <LayoutGrid size={20} />, label: t('nav.credit'), path: "/offres" },
    { icon: <SlidersHorizontal size={22} />, label: t('nav.simulator'), isCenter: true },
    { icon: <HelpCircle size={20} />, label: t('nav.help'), path: "/aide" },
    { icon: <BookOpen size={20} />, label: t('nav.guide'), path: "/guide" }
  ];

  const displayItems = isRTL ? [...navItems].reverse() : navItems;

  return (
    <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-[110] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 h-[60px] pb-safe flex items-center justify-around px-2 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'}`}>
      {displayItems.map((item, idx) => item.isCenter ? (
        <div key={idx} className="relative flex items-center justify-center h-full">
          <button onClick={onSimulate} className="relative w-12 h-12 bg-slate-950 dark:bg-slate-800 text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-all border-2 border-brand-primary">
            <div className="absolute inset-1 rounded-full border border-slate-500/20"></div>
            <SlidersHorizontal size={20} className="relative z-10" />
          </button>
        </div>
      ) : (
        <Link key={idx} to={item.path || '/'} className={`flex items-center flex-col justify-center space-y-1 w-12 ${isActive(item.path || '') ? 'text-brand-primary' : 'text-slate-400 dark:text-slate-500'}`}>
          {item.icon}
          <span className="text-[7px] font-black uppercase tracking-tighter text-center line-clamp-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

const AppContent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isAppFormOpen, setIsAppFormOpen] = useState(false);
  const [appContext, setAppContext] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(true);
  const [showConsent, setShowConsent] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [consentAnchorRect, setConsentAnchorRect] = useState<DOMRect | null>(null);
  const [pendingContext, setPendingContext] = useState<any>(null);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setIsMobileNavVisible(false);

      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsMobileNavVisible(true);
      }, 800);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleLangChange = () => {
      setIsChangingLanguage(true);
      setTimeout(() => setIsChangingLanguage(false), 500);
    };
    i18n.on('languageChanged', handleLangChange);
    return () => i18n.off('languageChanged', handleLangChange);
  }, [i18n]);

  const handleOpenAppForm = (context?: any, event?: React.MouseEvent | null) => {
    if (event) setConsentAnchorRect(event.currentTarget.getBoundingClientRect());
    else setConsentAnchorRect(null);
    setPendingContext(context || null);
    setShowConsent(true);
  };

  const onConsentAccept = () => {
    setShowConsent(false);
    setAppContext(pendingContext || null);
    setIsAppFormOpen(true);
  };

  const megaMenuVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, y: 10, scale: 0.99 }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 overflow-x-hidden ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}>
      <ScrollToTop />
      
      <AnimatePresence>{isChangingLanguage && <PageTransitionSkeleton />}</AnimatePresence>
      
      {location.pathname !== '/simulateur' && !isAppFormOpen && (
        <nav className={`fixed top-0 w-full z-[150] transition-all duration-500 h-[65px] lg:h-[75px] flex items-center ${scrolled || isSearchOpen ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm' : 'bg-transparent'}`}>
          <AnimatePresence>
            {isSearchOpen && searchQuery.length >= 2 && (
              <SearchResults query={searchQuery} onClose={() => {setIsSearchOpen(false); setSearchQuery('');}} />
            )}
          </AnimatePresence>

          <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 flex h-full items-center pt-[5px] pb-[5px] lg:pt-0 lg:pb-0">
            <AnimatePresence mode="wait">
              {!isSearchOpen ? (
                <motion.div key="nav-content" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className={`flex-1 flex items-center justify-between h-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center space-x-12 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <Link to="/" className="font-black tracking-tighter uppercase text-xl lg:text-2xl italic select-none">{BRAND_NAME}</Link>
                    <div className={`hidden lg:flex items-center space-x-1 ${isRTL ? 'space-x-reverse' : ''}`}>
                      <Link to="/" className={`px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${location.pathname === '/' ? 'bg-brand-primary/10 text-brand-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{t('nav.home')}</Link>
                      <div onMouseEnter={() => setActiveMegaMenu('offers')} onMouseLeave={() => setActiveMegaMenu(null)} className="relative h-[75px] flex items-center">
                        <div className={`flex items-center space-x-1.5 px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest cursor-pointer transition-all ${isRTL ? 'space-x-reverse' : ''} ${location.pathname.startsWith('/offres') || activeMegaMenu === 'offers' ? 'bg-brand-primary/10 text-brand-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                          <span>{t('nav.credit')}</span>
                          <ChevronDown size={12} className={`transition-transform duration-300 ${activeMegaMenu === 'offers' ? 'rotate-180' : ''}`} />
                        </div>
                        <AnimatePresence>
                          {activeMegaMenu === 'offers' && (
                            <motion.div variants={megaMenuVariants} initial="hidden" animate="visible" exit="exit" className={`absolute top-[70px] ${isRTL ? 'right-[-50px]' : 'left-[-50px]'} w-[800px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-3xl rounded-[2.5rem] p-8 grid grid-cols-3 gap-4`}>
                              {LOAN_OFFERS.map(offer => (
                                <Link key={offer.id} to={`/offres/${offer.id}`} onClick={() => setActiveMegaMenu(null)} className={`flex items-start space-x-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700 group ${isRTL ? 'space-x-reverse' : ''}`}>
                                  <div className={`w-11 h-11 ${offer.color} text-white rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>{getIcon(offer.icon, 20)}</div>
                                  <div className="overflow-hidden">
                                    <h4 className="font-black uppercase text-sm tracking-tight text-slate-900 dark:text-white truncate">{t(offer.title)}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2 mt-1.5">{t(offer.description)}</p>
                                    <span className="text-brand-primary font-black text-[9px] uppercase tracking-widest mt-2 block">{t('labels.rate_from')} {offer.minRate}%</span>
                                  </div>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <Link to="/simulateur" className={`px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${location.pathname === '/simulateur' ? 'bg-brand-primary/10 text-brand-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{t('nav.simulator')}</Link>
                      <div onMouseEnter={() => setActiveMegaMenu('resources')} onMouseLeave={() => setActiveMegaMenu(null)} className="relative h-[75px] flex items-center">
                        <div className={`flex items-center space-x-1.5 px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest cursor-pointer transition-all ${isRTL ? 'space-x-reverse' : ''} ${location.pathname.startsWith('/guide') || activeMegaMenu === 'resources' ? 'bg-brand-primary/10 text-brand-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                          <span>{t('nav.resources')}</span>
                          <ChevronDown size={12} className={`transition-transform duration-300 ${activeMegaMenu === 'resources' ? 'rotate-180' : ''}`} />
                        </div>
                        <AnimatePresence>
                          {activeMegaMenu === 'resources' && (
                            <motion.div variants={megaMenuVariants} initial="hidden" animate="visible" exit="exit" className={`absolute top-[70px] ${isRTL ? 'right-[-50px]' : 'left-[-50px]'} w-[500px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-3xl rounded-[2.5rem] p-6 flex ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <div className={`w-1/2 space-y-4 ${isRTL ? 'pl-6 border-l' : 'pr-6 border-r'} border-slate-100 dark:border-slate-800`}>
                                {[
                                  { path: '/guide', label: t('nav.resources_menu.guide_label'), icon: <BookOpen size={16} /> },
                                  { path: '/aide', label: t('nav.resources_menu.help_label'), icon: <HelpCircle size={16} /> },
                                  { path: '/glossaire', label: t('nav.resources_menu.glossary_label'), icon: <SpellCheck size={16} /> },
                                ].map(res => (
                                  <Link key={res.path} to={res.path} onClick={() => setActiveMegaMenu(null)} className={`flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group ${isRTL ? 'space-x-reverse' : ''}`}>
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-brand-primary">{res.icon}</div>
                                    <span className="text-sm font-black uppercase text-slate-700 dark:text-slate-300 group-hover:text-brand-primary">{res.label}</span>
                                  </Link>
                                ))}
                              </div>
                              <div className="w-1/2 space-y-3 px-6 pt-10 text-center">
                                <Link to="/a-propos" onClick={() => setActiveMegaMenu(null)} className="inline-block px-5 py-2.5 bg-slate-950 dark:bg-white dark:text-slate-950 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all">{t('nav.resources_menu.about_btn')}</Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <button onClick={() => setIsSearchOpen(true)} className="p-2 lg:p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300" aria-label="Rechercher"><Search size={18} /></button>
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 lg:p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300" aria-label="Changer de thème">{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
                    <LanguageSwitcher />
                    <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 lg:p-2.5 bg-brand-primary/10 text-brand-primary rounded-xl" aria-label="Menu Mobile"><AnimatedMenuIcon isOpen={isMobileMenuOpen} /></button>
                    <button onClick={(e) => handleOpenAppForm(null, e)} className="hidden sm:flex bg-brand-primary text-white px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest shadow-brand active:scale-95 transition-all"><Zap size={12} className="fill-white mr-2" />{t('nav.request')}</button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="search-content" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="flex-1 flex items-center justify-center h-full relative">
                  <div className={`w-full max-w-4xl flex items-center space-x-8 px-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <div className="relative flex-1 flex items-center">
                      <Search size={22} className={`absolute ${isRTL ? 'right-0' : 'left-0'} text-brand-primary`} />
                      <input 
                        autoFocus type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
                        placeholder={t('search.placeholder')} 
                        className={`w-full bg-transparent border-none ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 text-lg lg:text-2xl font-black italic outline-none text-slate-950 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700`} 
                      />
                    </div>
                    <button onClick={() => {setIsSearchOpen(false); setSearchQuery('');}} className="p-2 lg:p-3 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-rose-500 hover:text-white rounded-2xl transition-all group shrink-0 text-slate-500 dark:text-slate-400" aria-label="Fermer la recherche"><X size={18} className="group-hover:rotate-90 transition-transform" /></button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      )}

      <ConsentPopover isOpen={showConsent} anchorRect={consentAnchorRect} onAccept={onConsentAccept} onDecline={() => setShowConsent(false)} />
      <MobileOffCanvas isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} onOpenApp={handleOpenAppForm} />
      
      <main className={`flex-grow flex flex-col relative ${location.pathname === '/simulateur' ? 'pt-0' : 'pt-[65px] lg:pt-0'}`}>
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="flex-grow flex flex-col">
            <Routes location={location}>
              <Route path="/" element={<LandingPage onOpenApp={handleOpenAppForm} />} />
              <Route path="/offres" element={<OffersPage />} />
              <Route path="/offres/conso" element={<ConsumerLoanPage />} />
              <Route path="/offres/perso" element={<PersonalLoanPage />} />
              <Route path="/offres/auto" element={<AutoLoanPage />} />
              <Route path="/offres/travaux" element={<HomeImprovementPage />} />
              <Route path="/offres/rapide" element={<FastLoanPage />} />
              <Route path="/offres/rachat" element={<RefinancingPage />} />
              <Route path="/offres/immo" element={<GeneralLoanPage />} />
              <Route path="/offres/assurance" element={<InsurancePage />} />
              <Route path="/offres/projet" element={<ProjectLoanPage />} />
              <Route path="/mentions-legales" element={<LegalNoticePage />} />
              <Route path="/confidentialite" element={<PrivacyPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/guide" element={<GuidePage />} />
              <Route path="/guide/:id" element={<ArticlePage />} />
              <Route path="/glossaire" element={<GlossaryPage />} />
              <Route path="/aide" element={<HelpPage />} />
              <Route path="/a-propos" element={<AboutPage />} />
              <Route path="/credits" element={<CreditsPage />} />
              <Route path="/simulateur" element={<SimulatorPage onProceedToApp={handleOpenAppForm} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {location.pathname !== '/simulateur' && !isAppFormOpen && (
        <>
          <PreFooter onOpenApp={handleOpenAppForm} />
          <Footer />
          <MobileBottomNav onSimulate={() => navigate('/simulateur')} isVisible={isMobileNavVisible} />
          <CookieBanner />
        </>
      )}
      {isAppFormOpen && <ApplicationFormModal isOpen={isAppFormOpen} onClose={() => setIsAppFormOpen(false)} initialContext={appContext} />}
    </div>
  );
};

const App: React.FC = () => (
  <Router><AppContent /></Router>
);

export default App;