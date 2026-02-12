
import React from 'react';
import { motion } from 'framer-motion';

interface StandardButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const StandardButton: React.FC<StandardButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  type = 'button',
  disabled = false
}) => {
  const baseStyles = "relative px-10 py-5 rounded-full font-extrabold text-sm md:text-base uppercase tracking-[0.15em] transition-all flex items-center justify-center space-x-3 overflow-hidden select-none";
  
  const variants = {
    primary: "bg-brand-primary text-white shadow-[0_10px_30px_-10px_rgba(79,70,229,0.5)] border border-white/10",
    secondary: "bg-brand-secondary text-white shadow-[0_10px_30px_-10px_rgba(129,140,248,0.5)] border border-white/10",
    outline: "border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-brand-primary/50 bg-transparent",
    white: "bg-white text-brand-primary shadow-xl border border-slate-100"
  };

  return (
    <motion.button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        boxShadow: variant === 'primary' 
          ? "0 20px 40px -12px rgba(79,70,229,0.6)" 
          : "0 20px 40px -12px rgba(0,0,0,0.1)"
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
      className={`${baseStyles} ${variants[variant]} ${className} group`}
    >
      {/* Shine Effect Animation */}
      <motion.div 
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none skew-x-12"
      />

      {/* Background Glow for Primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]" />
      )}

      <span className="relative z-10 flex items-center space-x-3">
        {children}
      </span>

      {/* Internal border highlight */}
      <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none" />
    </motion.button>
  );
};

export default StandardButton;
