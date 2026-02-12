
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SectionHeadingProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  badge, badgeIcon: BadgeIcon, title, highlight, description, align = 'left', className = "" 
}) => {
  return (
    <div className={`${align === 'center' ? 'text-center mx-auto' : 'text-left'} space-y-6 ${className}`}>
      {badge && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className={`inline-flex items-center space-x-3 bg-brand-primary/5 text-brand-primary px-4 py-1.5 rounded-full border border-brand-primary/10`}
        >
          {BadgeIcon && <BadgeIcon size={14} />}
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">{badge}</span>
        </motion.div>
      )}
      
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter italic leading-[0.95] text-slate-950 dark:text-white">
        {title} {highlight && <span className="text-brand-primary">{highlight}</span>}
      </h2>

      {description && (
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
