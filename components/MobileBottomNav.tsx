
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, LayoutGrid, Calculator, HelpCircle, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MobileBottomNavProps {
  onOpenApp: (context?: any) => void;
  onOpenSimulator: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenApp, onOpenSimulator }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home size={22} />, label: t('nav.home'), path: '/' },
    { icon: <LayoutGrid size={22} />, label: t('nav.credit'), path: '/offres' },
    { icon: null, label: '', path: 'apply', isAction: true }, 
    { icon: <Calculator size={22} />, label: t('nav.simulator'), path: 'simulator', isSimulator: true },
    { icon: <HelpCircle size={22} />, label: t('nav.help'), path: '/aide' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[300] pointer-events-none">
      <div className="relative pointer-events-auto">
        {/* Full-width Glass Background - Height reduced to 60px */}
        <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-t border-slate-200 dark:border-slate-800 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.3)]" />
        
        <div className="relative flex items-center justify-around h-[60px] px-2">
          {navItems.map((item, i) => {
            if (item.isAction) {
              return (
                <div key={i} className="flex items-center justify-center w-14">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onOpenApp()}
                    className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-brand shadow-brand-primary/40 border border-white/20 mb-4"
                  >
                    <Zap size={22} fill="white" strokeWidth={2.5} />
                  </motion.button>
                </div>
              );
            }

            if (item.isSimulator) {
              return (
                <button
                  key={i}
                  onClick={() => onOpenSimulator()}
                  className="flex flex-col items-center justify-center space-y-0.5 w-12 transition-all relative h-full"
                >
                  <div className="text-slate-400 hover:text-brand-primary transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[7px] font-black uppercase tracking-tighter text-slate-400 opacity-60">
                    {item.label}
                  </span>
                </button>
              );
            }

            const active = isActive(item.path);

            return (
              <button
                key={i}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center space-y-0.5 w-12 transition-all relative h-full"
              >
                <div className={`transition-all duration-300 ${active ? 'text-brand-primary scale-110' : 'text-slate-400'}`}>
                  {item.icon}
                </div>
                <span className={`text-[7px] font-black uppercase tracking-tighter transition-all ${active ? 'text-brand-primary opacity-100' : 'text-slate-400 opacity-60'}`}>
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
      </div>
      
      {/* Safe Area Spacer for modern phones */}
      <div className="h-[env(safe-area-inset-bottom)] bg-white/95 dark:bg-slate-950/95 border-none" />
    </div>
  );
};

export default MobileBottomNav;
