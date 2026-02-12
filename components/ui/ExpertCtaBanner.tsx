
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import StandardButton from '../StandardButton';

interface ExpertCtaBannerProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  variant?: 'brand' | 'indigo' | 'emerald' | 'orange' | 'rose' | 'cyan' | 'yellow';
}

const ExpertCtaBanner: React.FC<ExpertCtaBannerProps> = ({ 
  title, description, buttonText, onClick, variant = 'brand' 
}) => {
  const themes = {
    brand: "bg-brand-primary shadow-brand-primary/20",
    indigo: "bg-indigo-600 shadow-indigo-600/20",
    emerald: "bg-emerald-600 shadow-emerald-600/20",
    orange: "bg-orange-600 shadow-orange-600/20",
    rose: "bg-rose-600 shadow-rose-600/20",
    cyan: "bg-cyan-600 shadow-cyan-600/20",
    yellow: "bg-yellow-500 shadow-yellow-500/20"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`relative py-16 lg:py-24 px-10 md:px-20 rounded-[4.5rem] text-white overflow-hidden shadow-3xl ${themes[variant as keyof typeof themes]}`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.15),transparent_70%)]"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
        <div className="space-y-6 max-w-2xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter italic leading-[0.95]">
            {title}
          </h2>
          <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="shrink-0">
          <StandardButton 
            variant="white" 
            onClick={onClick}
            className="!text-slate-950 !px-12 !py-6 !text-lg shadow-2xl group active:scale-95"
          >
            <span>{buttonText}</span>
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </StandardButton>
        </div>
      </div>

      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/5 blur-[80px] rounded-full"></div>
    </motion.div>
  );
};

export default ExpertCtaBanner;
