
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import StandardButton from './StandardButton';

interface ConsentPopoverProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  anchorRect: DOMRect | null;
}

const ConsentPopover: React.FC<ConsentPopoverProps> = ({ isOpen, onAccept, onDecline, anchorRect }) => {
  const { t } = useTranslation();
  
  if (!isOpen) return null;

  // Calcul du positionnement : si anchorRect est présent, on se place dessous, sinon au centre
  const style: React.CSSProperties = anchorRect 
    ? { 
        top: anchorRect.bottom + window.scrollY + 12, 
        left: Math.max(20, anchorRect.left + (anchorRect.width / 2) - 160) 
      }
    : {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'fixed'
      };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[600] flex items-center justify-center pointer-events-none">
        {/* Backdrop sombre si pas d'ancrage pour focus sur le centre */}
        {!anchorRect && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm pointer-events-auto" onClick={onDecline} />}
        
        <motion.div
          initial={{ opacity: 0, y: anchorRect ? -10 : 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: anchorRect ? -10 : 20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          style={anchorRect ? { position: 'absolute', ...style } : { position: 'relative' }}
          className="pointer-events-auto w-[320px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 space-y-6"
        >
          {/* Arrow (uniquement si ancré) */}
          {anchorRect && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-t border-l border-slate-200 dark:border-slate-800 rotate-45"></div>
          )}

          <div className="flex items-center space-x-3 text-amber-500">
            <AlertTriangle size={20} className="shrink-0" />
            <span className="text-[10px] font-black uppercase tracking-widest">{t('consent.title')}</span>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
              {t('consent.warning')}
            </p>
          </div>

          <div className="flex flex-col space-y-3 pt-2">
            <button
              onClick={onAccept}
              className="w-full bg-brand-primary hover:bg-brand-secondary text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-brand shadow-brand-primary/20"
            >
              <CheckCircle2 size={14} />
              <span>{t('consent.accept')}</span>
            </button>
            <button
              onClick={onDecline}
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center space-x-2"
            >
              <XCircle size={14} />
              <span>{t('consent.decline')}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConsentPopover;
