
import React from 'react';
import { LucideIcon, ChevronDown } from 'lucide-react';

interface LabelProps {
  children: React.ReactNode;
  Icon?: LucideIcon;
  className?: string;
}

export const FormLabel: React.FC<LabelProps> = ({ children, Icon, className = "" }) => (
  <label className={`text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest px-1 flex items-center space-x-2 mb-2 select-none ${className}`}>
    {Icon && <Icon size={12} />}
    <span>{children}</span>
  </label>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  Icon?: LucideIcon;
}

export const FormInput: React.FC<InputProps> = ({ error, Icon, className = "", ...props }) => (
  <div className="relative w-full group">
    {Icon && (
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors pointer-events-none">
        <Icon size={18} />
      </div>
    )}
    <input 
      {...props}
      className={`w-full bg-slate-50/20 dark:bg-slate-900/10 border transition-all duration-300 outline-none rounded-2xl py-4 ${Icon ? 'pl-14' : 'px-6'} pr-6 font-bold text-base md:text-lg text-slate-900 dark:text-white placeholder:text-slate-400/50 shadow-inner-soft ${
        error 
          ? 'border-rose-500 ring-4 ring-rose-500/5' 
          : 'border-slate-100 dark:border-slate-800/60 focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/5'
      } ${className}`}
    />
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  Icon?: LucideIcon;
}

export const FormSelect: React.FC<SelectProps> = ({ error, Icon, className = "", children, ...props }) => (
  <div className="relative w-full group">
    {Icon && (
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors pointer-events-none z-10">
        <Icon size={18} />
      </div>
    )}
    <select 
      {...props}
      className={`w-full appearance-none bg-slate-50/20 dark:bg-slate-900/10 border transition-all duration-300 outline-none rounded-2xl py-4 ${Icon ? 'pl-14' : 'px-6'} pr-12 font-bold text-base md:text-lg text-slate-900 dark:text-white cursor-pointer shadow-inner-soft ${
        error 
          ? 'border-rose-500 ring-4 ring-rose-500/5' 
          : 'border-slate-100 dark:border-slate-800/60 focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/5'
      } ${className}`}
    >
      {children}
    </select>
    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-brand-primary transition-colors">
      <ChevronDown size={20} />
    </div>
  </div>
);
