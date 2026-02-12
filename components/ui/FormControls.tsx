
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface LabelProps {
  children: React.ReactNode;
  Icon?: LucideIcon;
  className?: string;
}

export const FormLabel: React.FC<LabelProps> = ({ children, Icon, className = "" }) => (
  <label className={`text-[10px] font-black uppercase text-slate-400 tracking-widest px-1 flex items-center space-x-2 mb-2 ${className}`}>
    {Icon && <Icon size={12} />}
    <span>{children}</span>
  </label>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const FormInput: React.FC<InputProps> = ({ error, className = "", ...props }) => (
  <input 
    {...props}
    className={`w-full bg-slate-50 dark:bg-slate-900 border-2 ${error ? 'border-rose-500 ring-2 ring-rose-500/10' : 'border-transparent focus:border-brand-primary/20'} rounded-2xl py-4 px-6 font-bold text-lg focus:ring-4 focus:ring-brand-primary/10 transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400 shadow-inner-soft ${className}`}
  />
);
