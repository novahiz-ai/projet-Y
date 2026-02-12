import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 'md' }) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl"
  };

  return (
    <div className={`flex items-center select-none ${className}`}>
      <span className={`${sizeClasses[size]} font-black italic tracking-tighter uppercase text-slate-950 dark:text-white`}>
        <span className="text-brand-primary">L</span>OGO
      </span>
    </div>
  );
};

export default Logo;