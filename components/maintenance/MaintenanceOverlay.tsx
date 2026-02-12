
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Wrench, Timer, Loader2 } from 'lucide-react';
import StandardButton from '../StandardButton';

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
      interval = window.setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isVisible && countdown === 0) {
      // Redirection uniquement si nous ne sommes pas déjà sur la page d'accueil
      if (location.pathname !== '/') {
        setIsRedirecting(true);
        // Petit délai pour laisser l'utilisateur voir le statut "Redirection"
        const timeout = setTimeout(() => {
          navigate('/');
        }, 800);
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
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-2xl"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 p-10 md:p-12 shadow-3xl text-center space-y-10"
          >
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-brand-primary/20 rounded-full animate-ping" />
              <div className="relative w-full h-full bg-brand-primary text-white rounded-full flex items-center justify-center shadow-brand">
                <Wrench size={40} />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white leading-[0.9]">
                Espace <br />
                <span className="text-brand-primary">En maintenance.</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Nos analystes optimisent votre portail sécurisé. Retour imminent.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] p-8 flex flex-col items-center space-y-4 border border-slate-100 dark:border-slate-700/50 relative overflow-hidden">
              <div className="flex items-center space-x-3 text-brand-primary relative z-10">
                {isRedirecting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Timer size={18} className="animate-pulse" />
                )}
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  {isRedirecting ? 'Redirection...' : 'Retour à l\'accueil'}
                </span>
              </div>
              
              <div className="text-6xl font-black text-slate-900 dark:text-white italic tracking-tighter relative z-10">
                {countdown}<span className="text-xl ml-1 text-brand-primary">s</span>
              </div>

              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2 relative z-10">
                <motion.div 
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 20, ease: "linear" }}
                  className="h-full bg-brand-primary shadow-[0_0_15px_rgba(124,58,237,0.6)]"
                />
              </div>
            </div>

            <div className="pt-4">
              <StandardButton 
                onClick={() => navigate('/')}
                variant="ghost"
                className="w-full !rounded-2xl !py-4 text-[10px] !bg-slate-50 dark:!bg-slate-800/50"
              >
                <span>annuler et quitter</span>
              </StandardButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MaintenanceOverlay;
