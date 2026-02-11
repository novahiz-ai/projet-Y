
import React from 'react';

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
  const baseStyles = "px-10 py-5 rounded-full font-black text-sm md:text-base uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-3 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
  
  const variants = {
    primary: "bg-brand-primary hover:bg-brand-secondary text-white shadow-brand/20",
    secondary: "bg-brand-secondary hover:bg-brand-primary text-white shadow-brand/20",
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white shadow-none",
    white: "bg-white text-brand-primary hover:bg-slate-50 shadow-white/10"
  };

  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default StandardButton;
