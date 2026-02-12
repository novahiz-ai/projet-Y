
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ShieldCheck, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const COOKIE_ACCEPTED_KEY = 'younited_cookies_accepted';
const COOKIE_LAST_SHOWN_KEY = 'younited_cookies_last_shown';
const REAPPEAR_INTERVAL = 72 * 60 * 60 * 1000; // 72 heures en millisecondes

const CookieBanner: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: number;
    
    const checkCookieStatus = () => {
      const isAccepted = localStorage.getItem(COOKIE_ACCEPTED_KEY);
      
      // Si l'utilisateur a déjà accepté, on ne montre plus jamais la bannière
      if (isAccepted === 'true') return;

      const lastShown = localStorage.getItem(COOKIE_LAST_SHOWN_KEY);
      const now = Date.now();

      // Si l'utilisateur n'a pas accepté (soit ignoré, soit refusé précédemment)
      // On vérifie si l'intervalle de 72h est dépassé
      if (!lastShown || (now - parseInt(lastShown)) > REAPPEAR_INTERVAL) {
        timer = window.setTimeout(() => {
          setIsVisible(true);
          // On met à jour la date de dernière apparition pour le prochain cycle de 72h
          localStorage.setItem(COOKIE_LAST_SHOWN_KEY, now.toString());
        }, 2000);
      }
    };

    checkCookieStatus();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_ACCEPTED_KEY, 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    // On marque comme non accepté, la bannière réapparaîtra dans 72h
    localStorage.setItem(COOKIE_ACCEPTED_KEY, 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 right-6 lg:left-10 lg:right-auto lg:max-w-md z-[500]"
        >
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-[2.5rem] shadow-3xl flex flex-col space-y-6">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center shrink-0">
                  <Cookie size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-950 dark:text-white">{t('cookies_banner.title')}</h3>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-0.5">{t('cookies_banner.subtitle')}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {t('cookies_banner.desc')}
            </p>

            <div className="space-y-3">
              <div className="flex gap-3">
                <button 
                  onClick={handleAccept}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-3xl bg-brand-primary text-white font-black uppercase text-[10px] tracking-widest hover:bg-brand-secondary transition-all shadow-brand active:scale-95"
                >
                  <ShieldCheck size={14} />
                  <span>{t('cookies_banner.accept')}</span>
                </button>
                
                <button 
                  onClick={handleDecline}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 border border-slate-200 dark:border-slate-700"
                >
                  <XCircle size={14} />
                  <span>{t('cookies_banner.decline')}</span>
                </button>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button 
                onClick={() => navigate('/confidentialite')}
                className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-brand-primary transition-colors underline underline-offset-4"
              >
                {t('cookies_banner.policy')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
