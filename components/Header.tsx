import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Sun, Moon, ChevronDown, Search as SearchIcon, Zap, Menu, User, Car, Layers, Building, SpellCheck, ArrowRight, Lightbulb, ShoppingBag,
  HelpCircle, BookOpen
} from 'lucide-react';
import { Home as HomeIcon } from 'lucide-react';
// Fix: Import StandardButton to resolve 'Cannot find name' errors on lines using it
import StandardButton from './StandardButton';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import { getCreditLinks, getResourceLinks } from '../data/navigation';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onSearchOpen: () => void;
  onOpenApp: (context?: any) => void;
  onOpenSimulator: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, setIsDarkMode, onSearchOpen, onOpenApp, onOpenSimulator }) => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const creditLinks = getCreditLinks(t);
  const resourceLinks = getResourceLinks(t);

  const getIcon = (id: string) => {
    switch(id) {
      case 'perso': return <User className="text-indigo-500" />;
      case 'auto': return <Car className="text-emerald-500" />;
      case 'travaux': return <HomeIcon className="text-orange-500" />;
      case 'projet': return <Lightbulb className="text-cyan-500" />;
      case 'conso': return <ShoppingBag className="text-blue-500" />;
      case 'rachat': return <Layers className="text-purple-500" />;
      case 'immo': return <Building className="text-rose-500" />;
      default: return <Zap size={18} />;
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.2 } }
  };

  return (
    <nav 
      onMouseLeave={() => setActiveMenu(null)}
      className={`fixed top-0 w-full z-[150] transition-all duration-500 h-[70px] lg:h-[90px] flex items-center ${scrolled || activeMenu ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm' : 'bg-transparent'}`}
    >
       <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 flex justify-between items-center h-full">
         <div className="flex-1 lg:flex-none flex items-center">
           <Logo />
         </div>
         
         <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-12">
              <Link to="/" className="text-[13px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-primary transition-colors">{t('nav.home')}</Link>

              <div className="relative" onMouseEnter={() => setActiveMenu('credit')}>
                <button className={`flex items-center space-x-2 text-[13px] font-black uppercase tracking-widest transition-colors ${activeMenu === 'credit' ? 'text-brand-primary' : 'text-slate-500 hover:text-brand-primary'}`}>
                  <span>{t('nav.credit')}</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === 'credit' ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeMenu === 'credit' && (
                    <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="exit" className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[650px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-3xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                      <div className="grid grid-cols-12">
                        <div className="col-span-8 p-12 grid grid-cols-2 gap-x-8 gap-y-8">
                          {creditLinks.map((link) => (
                            <Link key={link.path} to={link.path} onClick={() => setActiveMenu(null)} className="flex items-start space-x-5 group">
                              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                                {getIcon(link.id)}
                              </div>
                              <div>
                                <p className="text-[12px] font-black uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-brand-primary transition-colors">{link.name}</p>
                                <p className="text-[11px] text-slate-400 font-medium leading-tight mt-1.5 uppercase tracking-tighter">{link.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="col-span-4 bg-slate-50 dark:bg-slate-950 p-12 flex flex-col justify-between border-l border-slate-100 dark:border-slate-800">
                           <div className="space-y-6">
                              <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-brand"><Zap size={24} className="fill-current" /></div>
                              <h4 className="text-sm font-black uppercase tracking-widest italic">{t('landing.hero.simulate')}</h4>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed">Solution de financement instantanée.</p>
                           </div>
                           {/* Fix: StandardButton used here requires the import added above */}
                           <StandardButton onClick={() => { onOpenSimulator(); setActiveMenu(null); }} className="w-full !py-4 shadow-brand !rounded-2xl !text-xs">
                             Simuler
                           </StandardButton>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={() => onOpenSimulator()} className="text-[13px] font-black uppercase tracking-widest text-slate-500 hover:text-brand-primary transition-colors">{t('nav.simulator')}</button>

              <div className="relative" onMouseEnter={() => setActiveMenu('aide')}>
                <button className={`flex items-center space-x-2 text-[13px] font-black uppercase tracking-widest transition-colors ${activeMenu === 'aide' ? 'text-brand-primary' : 'text-slate-500 hover:text-brand-primary'}`}>
                  <span>{t('nav.resources')}</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${activeMenu === 'aide' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeMenu === 'aide' && (
                    <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="exit" className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[380px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-3xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                      <div className="p-10 space-y-4">
                         {resourceLinks.map((link) => (
                           <Link key={link.path} to={link.path} onClick={() => setActiveMenu(null)} className="flex items-center space-x-6 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 group transition-all">
                             <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-950 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                               {link.id === 'help' ? <HelpCircle className="text-brand-primary" /> : link.id === 'guide' ? <BookOpen className="text-emerald-500" /> : <SpellCheck className="text-amber-500" />}
                             </div>
                             <div>
                               <p className="text-[12px] font-black uppercase text-slate-900 dark:text-white tracking-tight">{link.name}</p>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{link.desc}</p>
                             </div>
                           </Link>
                         ))}
                         <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 px-4">
                            <Link to="/à-propos" onClick={() => setActiveMenu(null)} className="flex items-center justify-between group">
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-brand-primary transition-colors">{t('nav.resources_menu.expert_center_label')}</span>
                              <ArrowRight size={16} className="text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                            </Link>
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
         </div>

         <div className="flex items-center space-x-4 flex-none h-full">
           <button onClick={onSearchOpen} className="p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"><SearchIcon size={22} /></button>
           <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors">{isDarkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
           <div className="hidden sm:block"><LanguageSwitcher /></div>
           <button onClick={() => onOpenApp()} className="hidden sm:flex bg-brand-primary text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-brand transition-transform active:scale-95">{t('nav.request')}</button>
           <button className="lg:hidden p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"><Menu size={24} /></button>
         </div>
       </div>
    </nav>
  );
};

export default Header;
