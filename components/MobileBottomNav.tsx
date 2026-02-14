import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, LayoutGrid, Calculator, UserCircle2, ClipboardList } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MobileBottomNavProps {
  onOpenApp: (context?: any) => void;
  onOpenSimulator: () => void;
  onSearchOpen: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenApp, onOpenSimulator, onSearchOpen }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home size={20} />, label: t('nav.home'), path: '/' },
    { icon: <LayoutGrid size={20} />, label: "solutions", path: '/offres' },
    { icon: null, label: '', path: 'apply', isAction: true }, 
    { icon: <Calculator size={20} />, label: "calculer", path: 'simulator', isSimulator: true },
    { icon: <UserCircle2 size={20} strokeWidth={2.5} />, label: "profil", path: '/login', isProfile: true }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[300] pointer-events-none">
      <div className="relative pointer-events-auto flex flex-col items-center">
        <div className="absolute inset-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-t border-slate-200/50 dark:border-slate-800/50 shadow-[0_-10px_40px_rgba(0,0,0,0.12)]" />
        
        <div className="relative w-full flex items-center justify-around h-[60px] px-1 max-w-md mx-auto overflow-hidden">
          {navItems.map((item, i) => {
            if (item.isAction) {
              return (
                <div key={i} className="relative flex items-center justify-center w-14 h-full">
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => onOpenApp()}
                    className="relative w-11 h-11 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-brand shadow-brand-primary/30 border-2 border-slate-100/20 dark:border-slate-800/40 z-10 overflow-hidden group"
                  >
                    <div className="absolute inset-0 rounded-full border border-black/10 pointer-events-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]" />
                    <ClipboardList size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                  </motion.button>
                </div>
              );
            }

            const active = isActive(item.path || '');
            
            const handleClick = () => {
              if (item.isProfile || item.path === '/login') navigate('/login');
              else if (item.isSimulator) onOpenSimulator();
              else if (item.path) navigate(item.path);
            };

            return (
              <button
                key={i}
                onClick={handleClick}
                className="flex flex-col items-center justify-center space-y-0.5 w-[72px] transition-all relative h-full px-0"
              >
                <div className={`transition-all duration-300 ${active ? 'text-brand-primary scale-110' : 'text-slate-400 opacity-70'}`}>
                  {item.icon}
                </div>
                <span className={`text-[7.5px] font-black uppercase tracking-tight transition-all ${active ? 'text-brand-primary opacity-100' : 'text-slate-400 opacity-60'} whitespace-nowrap overflow-visible`}>
                  {item.label}
                </span>
                
                {active && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-1 w-1 h-1 bg-brand-primary rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
        
        <div className="bg-white/95 dark:bg-slate-950/95 w-full h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  );
};

export default MobileBottomNav;