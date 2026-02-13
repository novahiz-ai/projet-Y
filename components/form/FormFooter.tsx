import React from 'react';
import { Lock } from 'lucide-react';

const FormFooter: React.FC = () => {
  return (
    <footer className="p-6 border-t border-slate-100 dark:border-slate-800 text-center shrink-0 bg-slate-50/50 dark:bg-slate-900/20">
      <div className="flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
         <Lock size={12} className="text-emerald-500" />
         <span>Protection AES-256 • Certifié eIDAS</span>
      </div>
    </footer>
  );
};

export default FormFooter;