import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 'md' }) => {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl"
  };

  return (
    <div className={`flex items-center font-black tracking-tighter select-none cursor-default ${className} ${sizeClasses[size]}`}>
      <span className="bg-gradient-to-r from-[#7c3aed] via-[#10b981] to-[#f97316] bg-clip-text text-transparent italic drop-shadow-sm">
        Logo
      </span>
    </div>
  );
};

export default Logo;