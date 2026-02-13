import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Wrench, Timer, Loader2, ShieldCheck, X } from 'lucide-react';

interface MaintenanceOverlayProps {
  isVisible: boolean;
}

const MaintenanceOverlay: React.FC<MaintenanceOverlayProps> = ({ isVisible }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(20);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isVisible && countdown > 0) {
      interval = window.setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (isVisible && countdown === 0) {
      if (location.pathname !== '/') {
        setIsRedirecting(true);
        const timeout = setTimeout(() => navigate('/'), 800);
        return () => clearTimeout(timeout);
      }
    }
    return () => clearInterval(interval);
  }, [isVisible, countdown, navigate, location.pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="w-[350px] h-[450px] bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 p-8 shadow-3xl flex flex-col items-center justify-between overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <button 
              onClick={() => navigate('/')}
              className="absolute top-6 right-6 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 transition-all active:scale-90"
            >
              <X size={20} />
            </button>

            <div className="space-y-6 text-center mt-4">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 bg-brand-primary/20 rounded-2xl animate-pulse scale-110" />
                <div className="relative w-full h-full bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-brand">
                  <ShieldCheck size={40} />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-black uppercase tracking-tighter italic text-slate-950 dark:text-white leading-none">
                  Portail <br />
                  <span className="text-brand-primary">Sécurisé.</span>
                </h2>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">Maintenance système V18</p>
              </div>
            </div>

            <div className="w-full bg-slate-50 dark:bg-slate-800/40 rounded-[2rem] p-6 flex flex-col items-center space-y-4 border border-slate-100 dark:border-slate-700/50 relative">
              <div className="flex items-center space-x-2 text-brand-primary">
                {isRedirecting ? <Loader2 size={14} className="animate-spin" /> : <Timer size={14} className="animate-pulse" />}
                <span className="text-[9px] font-black uppercase tracking-widest">{isRedirecting ? 'Redirection...' : 'Reprise de session'}</span>
              </div>
              
              <div className="text-6xl font-black text-slate-950 dark:text-white italic tracking-tighter">
                {countdown}<span className="text-base ml-1 text-brand-primary">s</span>
              </div>

              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 20, ease: "linear" }}
                  className="h-full bg-brand-primary"
                />
              </div>
            </div>

            <div className="w-full pt-4">
              <p className="text-[8px] text-slate-400 font-bold text-center uppercase tracking-widest leading-relaxed">
                Le crédit vous engage et doit être remboursé. <br />
                Vérifiez vos capacités avant de poursuivre.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MaintenanceOverlay;