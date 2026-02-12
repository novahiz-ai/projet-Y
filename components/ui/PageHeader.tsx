
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface PageHeaderProps {
  title: string;
  highlight: string;
  description?: string;
  label?: string;
  Icon?: LucideIcon;
  image?: string;
  breadcrumb?: { label: string; path?: string }[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, highlight, description, label, Icon, image, breadcrumb 
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 border-b border-slate-100 dark:border-slate-800 flex items-center min-h-[40vh] lg:min-h-[50vh]">
      <div className="absolute inset-0 z-0">
        {image && <img src={image} alt="" className="w-full h-full object-cover opacity-10 dark:opacity-20 scale-105" />}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-transparent dark:from-slate-950 dark:via-slate-950/90 dark:to-transparent"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 blur-[100px] rounded-full translate-x-1/2 animate-glow"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {breadcrumb && (
          <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-10">
            <button onClick={() => navigate('/')} className="hover:text-brand-primary transition-colors">{t('nav.home')}</button>
            {breadcrumb.map((item, i) => (
              <React.Fragment key={i}>
                <ChevronRight size={12} />
                <span className={i === breadcrumb.length - 1 ? "text-slate-900 dark:text-white" : ""}>
                  {item.path ? <button onClick={() => navigate(item.path!)} className="hover:text-brand-primary">{item.label}</button> : item.label}
                </span>
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="max-w-4xl space-y-8">
          {label && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center space-x-3 bg-brand-primary/10 text-brand-primary px-5 py-2.5 rounded-2xl border border-brand-primary/20 backdrop-blur-md">
              {Icon && <Icon size={18} className="animate-pulse" />}
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">{label}</span>
            </motion.div>
          )}
          
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-slate-950 dark:text-white leading-[0.85] italic">
            {title} <br />
            <span className="text-brand-primary">{highlight}</span>
          </h1>
          
          {description && (
            <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
