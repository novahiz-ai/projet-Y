
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 'md' }) => {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl lg:text-3xl",
    lg: "text-4xl lg:text-5xl"
  };

  return (
    <Link 
      to="/" 
      className={`font-black tracking-tighter uppercase italic leading-none select-none transition-transform active:scale-95 ${sizes[size]} ${className}`}
    >
      <span className="text-slate-950 dark:text-white">UNI</span>
      <span className="text-brand-primary">TED</span>
    </Link>
  );
};

export default Logo;
