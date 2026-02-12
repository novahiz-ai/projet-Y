
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck, ChevronLeft, X } from 'lucide-react';
import { FormLabel, FormInput } from '../components/ui/FormControls';
import StandardButton from '../components/StandardButton';
import Logo from '../components/Logo';
import MaintenanceOverlay from '../components/maintenance/MaintenanceOverlay';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  
  // L'overlay est actif immédiatement sur la page de connexion
  const [showMaintenance] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-5 md:px-6 overflow-hidden relative">
      <MaintenanceOverlay isVisible={showMaintenance} />

      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
          alt=""
          className="w-full h-full object-cover opacity-[0.05] dark:opacity-[0.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-transparent dark:from-slate-950 dark:via-slate-950/90 dark:to-transparent" />
      </div>

      <div className="md:hidden absolute top-6 right-5 z-[100]">
        <Link 
          to="/" 
          className="w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 rounded-full text-slate-900 dark:text-white shadow-xl active:scale-90 transition-all group"
        >
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        </Link>
      </div>

      <div className="hidden md:block absolute top-8 left-8 z-[100]">
        <Link 
          to="/" 
          className="flex items-center space-x-3 px-6 py-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-2xl text-slate-600 dark:text-slate-300 font-black uppercase text-[10px] tracking-widest hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95 group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Retour au site</span>
        </Link>
      </div>

      <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center relative z-10">
        
        <div className="hidden lg:block lg:col-span-6 space-y-12">
          <div className="space-y-8">
            <div className="mb-10"><Logo size="lg" /></div>
            <h1 className="text-5xl xl:text-7xl font-black uppercase tracking-tighter italic leading-[0.9] text-slate-950 dark:text-white">
              {t('auth.login_title')} <br />
              <span className="text-brand-primary">{t('auth.login_highlight')}</span>
            </h1>
            <p className="mt-8 text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-md">
              {t('auth.login_subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-2">
              <ShieldCheck className="text-brand-primary" size={24} />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Sécurité Totale</p>
              <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Certifié eIDAS & RGPD.</p>
            </div>
            <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:border-slate-800" />)}
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">1M+ Clients</p>
              <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Confiance Européenne.</p>
            </div>
          </div>
        </div>

        {/* Le formulaire est flouté et désactivé en arrière-plan pendant la maintenance */}
        <div className="lg:col-span-6 w-full opacity-30 grayscale blur-[4px] pointer-events-none select-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-8 md:p-12 rounded-[3.5rem] shadow-3xl border border-slate-100 dark:border-slate-800 relative"
          >
            <div className="space-y-8 relative z-10">
              <div className="lg:hidden mb-8 flex flex-col items-center space-y-2">
                <Logo size="md" />
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Espace Sécurisé</p>
              </div>

              <div className="space-y-6">
                <div>
                  <FormLabel Icon={Mail}>{t('auth.email_label')}</FormLabel>
                  <FormInput type="email" placeholder="nom@exemple.com" readOnly />
                </div>
                <div>
                  <FormLabel Icon={Lock}>{t('auth.password_label')}</FormLabel>
                  <FormInput type="password" placeholder="••••••••" readOnly />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <StandardButton disabled className="w-full">
                  <span>Vérification...</span>
                </StandardButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
