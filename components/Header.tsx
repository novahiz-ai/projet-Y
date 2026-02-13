import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  ChevronDown, Search as SearchIcon, UserCircle2, LayoutDashboard, LogIn, UserPlus, LogOut, Settings
} from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './navigation/ThemeToggle';
import Logo from './Logo';
import { getCreditLinks, getResourceLinks } from '../data/navigation';
import HeaderMegaMenuCredit from './navigation/HeaderMegaMenuCredit';
import HeaderMegaMenuResources from './navigation/HeaderMegaMenuResources';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onSearchOpen: () => void;
  onOpenApp: (context?: any) => void;
  onOpenSimulator: () => void;
  onMobileMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, setIsDarkMode, onSearchOpen, onOpenApp, onOpenSimulator, onMobileMenuToggle 
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  
  // Simulation d'état de connexion (à lier à votre système d'auth réel plus tard)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const authMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleClickOutside = (e: MouseEvent) => {
      if (authMenuRef.current && !authMenuRef.current.contains(e.target as Node)) {
        setShowAuthMenu(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const creditLinks = useMemo(() => getCreditLinks(t), [t]);
  const resourceLinks = useMemo(() => getResourceLinks(t), [t]);

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setShowAuthMenu(!showAuthMenu);
    }
  };

  return (
    <nav 
      onMouseLeave={() => setActiveMenu(null)}
      className={`fixed top-0 w-full z-[150] transition-all duration-500 h-[70px] lg:h-[100px] flex items-center ${
        scrolled || activeMenu 
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm' 
          : 'bg-transparent border-b border-transparent'
      }`}
      role="navigation"
      aria-label="Navigation principale"
    >
       <div className="w-full max-w-[2560px] mx-auto px-6 lg:px-12 flex justify-between items-center h-full">
         <div className="flex-none flex items-center min-w-[120px]">
           <Link to="/" className="active:scale-95 transition-transform" aria-label="Retour à l'accueil">
             <Logo size="md" />
           </Link>
         </div>
         
         <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-12 xl:space-x-16" role="menubar">
              <Link to="/" role="menuitem" className={`text-[13px] font-black uppercase tracking-widest transition-colors ${scrolled ? 'text-slate-500 hover:text-brand-primary' : 'text-slate-700 dark:text-slate-200 hover:text-brand-primary'}`}>{t('nav.home')}</Link>

              <div className="relative" onMouseEnter={() => setActiveMenu('credit')}>
                <button aria-expanded={activeMenu === 'credit'} aria-haspopup="true" className={`flex items-center space-x-2 text-[13px] font-black uppercase tracking-widest transition-colors ${activeMenu === 'credit' ? 'text-brand-primary' : scrolled ? 'text-slate-500 hover:text-brand-primary' : 'text-slate-700 dark:text-slate-200 hover:text-brand-primary'}`}>
                  <span>{t('nav.credit')}</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === 'credit' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>{activeMenu === 'credit' && <HeaderMegaMenuCredit links={creditLinks} onOpenSimulator={onOpenSimulator} onClose={() => setActiveMenu(null)} />}</AnimatePresence>
              </div>

              <button onClick={() => onOpenSimulator()} className={`text-[13px] font-black uppercase tracking-widest transition-colors ${scrolled ? 'text-slate-500 hover:text-brand-primary' : 'text-slate-700 dark:text-slate-200 hover:text-brand-primary'}`}>{t('nav.simulator')}</button>

              <div className="relative" onMouseEnter={() => setActiveMenu('aide')}>
                <button aria-expanded={activeMenu === 'aide'} aria-haspopup="true" className={`flex items-center space-x-2 text-[13px] font-black uppercase tracking-widest transition-colors ${activeMenu === 'aide' ? 'text-brand-primary' : scrolled ? 'text-slate-500 hover:text-brand-primary' : 'text-slate-700 dark:text-slate-200 hover:text-brand-primary'}`}>
                  <span>{t('nav.resources')}</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === 'aide' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>{activeMenu === 'aide' && <HeaderMegaMenuResources links={resourceLinks} onClose={() => setActiveMenu(null)} />}</AnimatePresence>
              </div>
            </div>
         </div>

         <div className="flex items-center space-x-3 lg:space-x-5 flex-none h-full">
           <div className="flex items-center space-x-1 border-r border-slate-100 dark:border-slate-800 pr-4 lg:pr-6">
             <button onClick={onSearchOpen} aria-label="Rechercher" className={`p-3 rounded-xl transition-colors ${scrolled ? 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300' : 'hover:bg-white/10 text-slate-700 dark:text-slate-200'}`}>
               <SearchIcon size={20} strokeWidth={2.5} />
             </button>
             <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} scrolled={scrolled} />
             <LanguageSwitcher />
           </div>

           <div className="relative" ref={authMenuRef}>
             <button 
               onClick={handleProfileClick}
               className={`hidden lg:flex items-center justify-center w-12 h-12 rounded-2xl shadow-xl transition-all active:scale-90 group border relative ${
                 scrolled 
                   ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-transparent dark:border-slate-100' 
                   : 'bg-white/10 dark:bg-slate-900/40 backdrop-blur-md text-slate-900 dark:text-white border-white/20 dark:border-slate-700/50 hover:bg-white/20'
               }`}
               aria-label={t('nav.client_space')}
             >
               <UserCircle2 size={24} className="group-hover:scale-110 transition-transform" />
               {isLoggedIn && <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />}
             </button>

             <AnimatePresence>
               {isLoggedIn && showAuthMenu && (
                 <motion.div
                   initial={{ opacity: 0, y: 10, scale: 0.95 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   exit={{ opacity: 0, y: 10, scale: 0.95 }}
                   className="absolute top-full right-0 mt-4 w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-3xl overflow-hidden p-3 space-y-1"
                 >
                    <button className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left group">
                      <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:scale-110 transition-transform"><LayoutDashboard size={20} /></div>
                      <p className="text-[11px] font-black uppercase text-slate-950 dark:text-white">Tableau de bord</p>
                    </button>
                    <button className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left group">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center group-hover:scale-110 transition-transform"><Settings size={20} /></div>
                      <p className="text-[11px] font-black uppercase text-slate-950 dark:text-white">Paramètres</p>
                    </button>
                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-4" />
                    <button 
                      onClick={() => setIsLoggedIn(false)}
                      className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all text-left group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform"><LogOut size={20} /></div>
                      <p className="text-[11px] font-black uppercase text-rose-500">Déconnexion</p>
                    </button>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>

           <button onClick={onMobileMenuToggle} aria-label="Menu mobile" className={`lg:hidden p-3 rounded-xl transition-all active:scale-90 flex items-center justify-center ${scrolled ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/10 shadow-inner-soft' : 'text-slate-900 dark:text-white hover:bg-white/10'}`}><LayoutDashboard size={24} strokeWidth={2.5} /></button>
         </div>
       </div>
    </nav>
  );
};

export default Header;