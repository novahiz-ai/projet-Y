import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ShieldCheck, MapPin, Briefcase } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  text: string;
  loanType: string;
  country: string;
  avatar: string;
  width: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  name, text, loanType, country, avatar, width 
}) => {
  return (
    <div 
      className="flex-shrink-0 px-3"
      style={{ width }}
    >
      <motion.div 
        whileHover={{ y: -5 }}
        className="group h-full p-8 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[3rem] space-y-8 flex flex-col justify-between hover:shadow-2xl hover:shadow-brand-primary/10 hover:border-brand-primary/20 transition-all duration-500 cursor-default"
      >
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 rounded-lg text-emerald-600">
              <ShieldCheck size={12} />
              <span className="text-[9px] font-black uppercase tracking-widest">Avis vérifié</span>
            </div>
            <Quote size={32} className="text-brand-primary/10 group-hover:text-brand-primary/20 transition-colors" />
          </div>
          
          <p className="text-slate-600 dark:text-slate-400 font-medium italic leading-relaxed min-h-[80px]">
            "{text}"
          </p>
        </div>

        <div className="pt-6 border-t border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm transition-transform group-hover:scale-105">
              <img src={avatar} alt={name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="min-w-0">
              <h4 className="font-black uppercase tracking-tight text-slate-900 dark:text-white text-sm truncate">{name}</h4>
              <div className="flex items-center space-x-2 text-slate-400 mt-0.5">
                <MapPin size={10} className="text-brand-primary shrink-0" />
                <span className="text-[10px] font-bold uppercase tracking-widest truncate">{country}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-white dark:bg-slate-800/50 px-3 py-2 rounded-xl border border-slate-100 dark:border-slate-700/50 w-fit">
            <Briefcase size={10} className="text-slate-400" />
            <span className="text-[9px] font-black uppercase tracking-tighter text-slate-500 dark:text-slate-300">{loanType}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TestimonialCard;