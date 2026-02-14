import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { StaggerItem, staggerFadeInUp } from '../ui/StaggerContainer';

interface ProcessStepCardProps {
  index: number;
  icon: React.ReactNode;
  label: string;
  title: string;
  desc: string;
}

const ProcessStepCard: React.FC<ProcessStepCardProps> = ({ index, icon, label, title, desc }) => {
  return (
    <StaggerItem 
      variants={staggerFadeInUp}
      className="flex flex-col items-center text-center space-y-8"
    >
      <div className="relative group">
        <div className="w-28 h-28 bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-800 text-brand-primary rounded-[3rem] flex items-center justify-center shadow-xl relative z-10 transition-all duration-500 group-hover:border-brand-primary/30 group-hover:scale-110">
          {icon || <Zap size={36} />}
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-slate-950 text-white rounded-full flex items-center justify-center font-black text-sm italic shadow-lg border-2 border-white dark:border-slate-800">
            0{index + 1}
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em]">{label} 0{index + 1}</span>
        <h4 className="text-3xl font-black uppercase tracking-tighter text-slate-950 dark:text-white italic leading-none">{title}.</h4>
        <p className="text-base text-slate-500 dark:text-slate-400 max-w-[300px] mx-auto leading-relaxed font-medium">{desc}</p>
      </div>
    </StaggerItem>
  );
};

export default ProcessStepCard;