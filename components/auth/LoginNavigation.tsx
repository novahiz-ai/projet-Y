import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';

const LoginNavigation: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default LoginNavigation;