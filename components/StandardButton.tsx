
import React from 'react';
import { motion } from 'framer-motion';

interface StandardButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'ghost';
  type?: 'button' | 'submit';
  disabled?: boolean;
  style?: React.CSSProperties;
}

const StandardButton: React.FC<StandardButtonProps> = ({ 
  children, 
  onClick, 
  className = "", 
  variant = 'primary',
  type = 'button',
  disabled = false,
  style
}) => {
  const baseStyles = "relative px-8 py-4 md:px-10 md:py-5 rounded-2xl md:rounded-[1.5rem] font-black text-xs md:text-sm uppercase tracking-[0.15em] transition-all flex items-center justify-center space-x-3 overflow-hidden select-none disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-primary text-white shadow-brand border border-white/10",
    secondary: "bg-brand-secondary text-white shadow-brand border border-white/10",
    outline: "border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-brand-primary/50 bg-transparent",
    white: "bg-white text-brand-primary shadow-xl border border-slate-100",
    ghost: "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
  };

  return (
    <motion.button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      style={style}
      whileHover={!disabled ? { 
        scale: 1.02, 
        y: -2,
        boxShadow: variant === 'primary' || variant === 'secondary'
          ? "0 25px 50px -12px rgba(124, 58, 237, 0.4)" 
          : "0 20px 40px -12px rgba(0,0,0,0.1)"
      } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`${baseStyles} ${variants[variant]} ${className} group`}
    >
      {/* Shine Effect Animation */}
      <motion.div 
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none skew-x-12"
      />

      <span className="relative z-10 flex items-center space-x-3 whitespace-nowrap">
        {children}
      </span>

      {/* Internal border highlight for depth */}
      <div className="absolute inset-0 rounded-2xl md:rounded-[1.5rem] border border-white/5 pointer-events-none" />
    </motion.button>
  );
};

export default StandardButton;
