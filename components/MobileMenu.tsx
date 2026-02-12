
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  X, Home, LayoutGrid, Calculator, BookOpen, 
  ShieldCheck, Cookie, Gavel, HelpCircle, 
  ChevronRight, LogIn, ChevronDown,
  User, Car, Home as HomeIcon, Lightbulb, ShoppingBag, Layers, Building, Zap
} from 'lucide-react';
import Logo from './Logo';
import { getCreditLinks } from '../data/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSimulator: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenSimulator }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isCreditExpanded, setIsCreditExpanded] = useState(false);

  const creditLinks = getCreditLinks(t);

  const getIcon = (id: string) => {
    const size = 18;
    switch(id) {
      case 'perso': return <User size={size} className="text-indigo-500" />;
      case 'auto': return <Car size={size} className="text-emerald-500" />;
      case 'travaux': return <HomeIcon size={size} className="text-orange-500" />;
      case 'projet': return <Lightbulb size={size} className="text-cyan-500" />;
      case 'conso': return <ShoppingBag size={size} className="text-blue-500" />;
      case 'rachat': return <Layers size={size} className="text-purple-500" />;
      case 'immo': return <Building size={size} className="text-rose-500" />;
      case 'assurance': return <ShieldCheck size={size} className="text-indigo-600" />;
      default: return <Zap size={size} />;
    }
  };

  const navLinks = [
    { icon: <Home size={20} />, label: t('nav.home'), path: '/' },
    { 
      icon: <LayoutGrid size={20} />, 
      label: t('nav.credit'), 
      isExpandable: true,
      isExpanded: isCreditExpanded,
      onToggle: () => setIsCreditExpanded(!isCreditExpanded)
    },
    { icon: <Calculator size={20} />, label: t('nav.simulator'), path: '/simulateur', isSim: true },
  ];

  const resourceLinks = [
    { icon: <BookOpen size={18} />, label: t('nav.guide'), path: '/guide' },
    { icon: <HelpCircle size={18} />, label: t('nav.help'), path: '/aide' },
  ];

  const legalLinks = [
    { icon: <ShieldCheck size={18} />, label: t('footer.privacy'), path: '/confidentialite' },
    { icon: <Cookie size={18} />, label: t('footer.cookies'), path: '/cookies' },
    { icon: <Gavel size={18} />, label: t('footer.legal'), path: '/mentions-legales' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[600] lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute top-0 right-0 h-full w-[75vw] bg-white dark:bg-slate-950 shadow-3xl flex flex-col border-l border-slate-100 dark:border-slate-800"
          >
            <div className="p-6 flex items-center justify-between border-b border-slate-50 dark:border-slate-900">
              <Logo />
              <button 
                onClick={onClose}
                className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-500 transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10 scrollbar-hide">
              <button 
                onClick={() => { navigate('/login'); onClose(); }}
                className="w-full p-5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-3xl flex items-center justify-between shadow-xl active:scale-95 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <LogIn size={20} />
                  <span className="font-black uppercase tracking-widest text-[11px]">{t('nav.client_space')}</span>
                </div>
                <ChevronRight size={16} />
              </button>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2">Navigation</p>
                <div className="grid grid-cols-1 gap-2">
                  {navLinks.map((link, idx) => (
                    <div key={idx}>
                      <button
                        onClick={() => {
                          if (link.isExpandable && link.onToggle) link.onToggle();
                          else if (link.isSim) { onOpenSimulator(); onClose(); }
                          else if (link.path) { navigate(link.path); onClose(); }
                        }}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 font-bold active:bg-brand-primary/5 transition-all"
                      >
                        <div className="flex items-center space-x-4">
                          <span className="text-brand-primary">{link.icon}</span>
                          <span className="text-sm uppercase tracking-tight">{link.label}</span>
                        </div>
                        {link.isExpandable && (
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-300 ${link.isExpanded ? 'rotate-180' : ''}`} 
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {link.isExpandable && link.isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-slate-50/30 dark:bg-slate-900/30 rounded-2xl mt-2 border border-slate-100 dark:border-slate-800"
                          >
                            <div className="p-3 grid grid-cols-1 gap-2">
                              {creditLinks.map((subLink) => (
                                <button
                                  key={subLink.path}
                                  onClick={() => { navigate(subLink.path); onClose(); }}
                                  className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all text-left group"
                                >
                                  <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 shrink-0 group-hover:scale-110 transition-transform">
                                    {getIcon(subLink.id)}
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-black uppercase text-slate-900 dark:text-white tracking-tight">{subLink.name}</p>
                                    <p className="text-[9px] text-slate-400 font-medium uppercase tracking-tighter line-clamp-1">{subLink.desc}</p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2">Ressources</p>
                <div className="grid grid-cols-1 gap-2">
                  {resourceLinks.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => { navigate(link.path); onClose(); }}
                      className="flex items-center space-x-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold active:scale-98 transition-all"
                    >
                      <span className="text-slate-400">{link.icon}</span>
                      <span className="text-sm uppercase tracking-tight">{link.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pb-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2">Confidentialité</p>
                <div className="grid grid-cols-1 gap-2">
                  {legalLinks.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => { navigate(link.path); onClose(); }}
                      className="flex items-center space-x-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-500 font-bold active:scale-98 transition-all"
                    >
                      <span className="text-slate-300">{link.icon}</span>
                      <span className="text-xs uppercase tracking-tight">{link.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
