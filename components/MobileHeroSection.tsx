
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  ArrowRight, 
  Car, 
  Home, 
  User, 
  Heart,
  ShieldCheck,
  ChevronRight,
  Shield,
  Activity
} from 'lucide-react';
import StandardButton from './StandardButton';

interface MobileHeroSectionProps {
  onOpenApp: (context?: any) => void;
  onOpenSimulator: (offerId?: string) => void;
}

const MobileHeroSection: React.FC<MobileHeroSectionProps> = ({ onOpenApp, onOpenSimulator }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const quickActions = [
    { id: "auto", label: t('landing.hero.projects.auto.label'), icon: <Car size={20} />, color: "bg-emerald-500", path: "/offres/auto" },
    { id: "immo", label: t('landing.hero.projects.immo.label'), icon: <Home size={20} />, color: "bg-rose-500", path: "/offres/immo" },
    { id: "perso", label: t('landing.hero.projects.perso.label'), icon: <User size={20} />, color: "bg-indigo-500", path: "/offres/perso" },
    { id: "travaux", label: t('landing.hero.projects.projet.label'), icon: <Heart size={20} />, color: "bg-orange-500", path: "/offres/travaux" },
  ];

  return (
    <section className="relative pt-32 pb-12 px-5 lg:hidden bg-white dark:bg-slate-950 overflow-hidden min-h-[90vh] flex flex-col justify-between">
      {/* Professional Background Image Overlay for Header - Adjusted gradient for embedding */}
      <div className="absolute top-0 left-0 w-full h-[400px] z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" 
          className="w-full h-full object-cover opacity-30 dark:opacity-40 blur-[1px]" 
          alt="" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 dark:from-black/40 via-white dark:via-slate-950 to-white dark:to-slate-950"></div>
      </div>

      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 z-0"></div>
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-indigo-500/5 blur-[60px] rounded-full -translate-x-1/2 z-0"></div>

      <div className="relative z-10 space-y-8">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-black tracking-tight text-slate-950 dark:text-white"
            >
              {t('landing.hero.title')} <span className="text-brand-primary italic">{t('landing.hero.highlight')}</span>
            </motion.h2>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-center border border-slate-200 dark:border-slate-800 text-brand-primary shadow-sm">
             <ShieldCheck size={20} />
          </div>
        </div>

        {/* Main Action Card: Simulator */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => onOpenSimulator()}
          className="relative group bg-slate-950 dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 active:scale-95 transition-transform cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-3xl rounded-full"></div>
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start">
               <div className="w-14 h-14 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-brand">
                 <Zap size={28} className="fill-white" />
               </div>
               <div className="text-right">
                  <p className="text-white/60 text-[8px] font-black uppercase tracking-widest leading-none mb-1">{t('landing.hero.response_time')}</p>
                  <div className="flex items-center justify-end space-x-1">
                    <Activity size={10} className="text-emerald-500 animate-pulse" />
                    <span className="text-white font-black text-[10px] uppercase italic">Analyse Digitale</span>
                  </div>
               </div>
            </div>
            
            <div className="space-y-2">
               <h3 className="text-3xl font-black text-white leading-none uppercase tracking-tighter italic">
                 {t('landing.hero.simulate')}
               </h3>
               <p className="text-slate-400 text-xs font-medium max-w-[200px]">
                 Calculez votre projet et obtenez une réponse immédiate.
               </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
               <div className="flex items-center space-x-2">
                 <Shield size={14} className="text-brand-secondary" />
                 <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">{t('landing.hero.expert_choice')}</span>
               </div>
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white">
                 <ChevronRight size={20} />
               </div>
            </div>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Financement Rapide</span>
             <button onClick={() => navigate('/offres')} className="text-[10px] font-black text-brand-primary uppercase tracking-widest flex items-center space-x-1">
               <span>Tous</span>
               <ChevronRight size={12} />
             </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {quickActions.map((action, idx) => (
               <motion.div
                 key={action.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 + (idx * 0.05) }}
                 onClick={() => navigate(action.path)}
                 className="p-5 bg-white/60 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm flex items-center space-x-4 active:scale-95 transition-all backdrop-blur-md"
               >
                 <div className={`w-10 h-10 ${action.color} text-white rounded-xl flex items-center justify-center shadow-lg shrink-0`}>
                   {action.icon}
                 </div>
                 <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">{action.label}</span>
               </motion.div>
             ))}
          </div>
        </div>

        {/* Express Demand Secondary Action */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => onOpenApp({ express: true })}
          className="w-full py-5 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center space-x-3 text-slate-950 dark:text-white transition-all active:bg-slate-50 dark:active:bg-slate-900"
        >
           <ArrowRight size={18} className="text-brand-primary" />
           <span className="text-xs font-black uppercase tracking-widest">{t('landing.hero.express')}</span>
        </motion.button>
      </div>

      {/* Trust Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pt-10 flex items-center justify-center space-x-6 grayscale opacity-40"
      >
        <div className="flex flex-col items-center">
           <span className="text-[10px] font-black text-brand-primary">4.8/5</span>
           <span className="text-[7px] font-black uppercase tracking-widest">Trustpilot</span>
        </div>
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800" />
        <span className="text-[7px] font-black uppercase tracking-widest">Verified eIDAS</span>
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800" />
        <span className="text-[7px] font-black uppercase tracking-widest">EU Banking License</span>
      </motion.div>
    </section>
  );
};

export default MobileHeroSection;
