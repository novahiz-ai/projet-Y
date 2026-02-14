import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Settings, LogOut } from 'lucide-react';

interface AuthMenuProps {
  isOpen: boolean;
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

const AuthMenu: React.FC<AuthMenuProps> = ({ isOpen, onLogout, onNavigate }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute top-full right-0 mt-4 w-64 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-3xl overflow-hidden p-3 space-y-1 z-[200]"
        >
          <button 
            onClick={() => onNavigate('/dashboard')}
            className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <LayoutDashboard size={20} />
            </div>
            <p className="text-[11px] font-black uppercase text-slate-950 dark:text-white">Tableau de bord</p>
          </button>
          
          <button 
            onClick={() => onNavigate('/dashboard/settings')}
            className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Settings size={20} />
            </div>
            <p className="text-[11px] font-black uppercase text-slate-950 dark:text-white">Paramètres</p>
          </button>
          
          <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-4" />
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center space-x-4 p-4 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <LogOut size={20} />
            </div>
            <p className="text-[11px] font-black uppercase text-rose-500">Déconnexion</p>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthMenu;