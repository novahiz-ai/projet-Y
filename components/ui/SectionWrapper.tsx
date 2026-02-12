
import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  innerClassName?: string;
  bgColor?: 'white' | 'slate' | 'dark' | 'transparent';
  noPadding?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  children, id, className = "", innerClassName = "", bgColor = 'transparent', noPadding = false 
}) => {
  const bgStyles = {
    white: "bg-white dark:bg-slate-950",
    slate: "bg-slate-50 dark:bg-slate-900/50",
    dark: "bg-slate-950 text-white",
    transparent: ""
  };

  return (
    <section 
      id={id} 
      className={`w-full ${bgStyles[bgColor]} ${noPadding ? '' : 'py-20 lg:py-32'} ${className}`}
    >
      <div className={`max-w-7xl mx-auto px-6 ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
