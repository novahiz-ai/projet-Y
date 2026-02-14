import React, { useState } from 'react';
import { LucideIcon, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LabelProps {
  children: React.ReactNode;
  Icon?: LucideIcon;
  className?: string;
  required?: boolean;
  optional?: boolean;
}

export const FormLabel: React.FC<LabelProps> = ({ children, Icon, className = "", required, optional }) => {
  const { t } = useTranslation();
  return (
    <div className={`flex items-center justify-between mb-2 px-1 ${className}`}>
      <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest flex items-center space-x-2 select-none">
        {Icon && <Icon size={12} />}
        <span>{children}</span>
      </label>
      {required && <span className="text-[8px] font-black uppercase tracking-tighter text-brand-primary opacity-70 italic">{t('labels.mandatory')}</span>}
      {optional && <span className="text-[8px] font-black uppercase tracking-tighter text-slate-300 dark:text-slate-600 italic">{t('labels.optional')}</span>}
    </div>
  );
};

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

export const PasswordInput: React.FC<InputProps> = ({ error, Icon, className = "", ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative w-full group">
      {Icon && (
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors pointer-events-none">
          <Icon size={18} />
        </div>
      )}
      <input 
        {...props}
        type={show ? 'text' : 'password'}
        className={`w-full bg-slate-50/20 dark:bg-slate-900/10 border transition-all duration-300 outline-none rounded-2xl py-4 ${Icon ? 'pl-14' : 'px-6'} pr-14 font-bold text-base md:text-lg text-slate-900 dark:text-white placeholder:text-slate-400/50 shadow-inner-soft ${
          error 
            ? 'border-rose-500 ring-4 ring-rose-500/5' 
            : 'border-slate-100 dark:border-slate-800/60 focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/5'
        } ${className}`}
      />
      <button 
        type="button" 
        onClick={() => setShow(!show)}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-primary transition-colors"
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

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