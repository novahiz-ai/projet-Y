import React, { useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Zap, ArrowUpRight } from 'lucide-react';
import { LoanOffer } from '../types';
// Fix: Import getIcon from the correct location
import { getIcon } from '../infrastructure/IconRegistry';

interface LoanCardProps {
  offer: LoanOffer;
  onClick?: () => void;
  onExpressDemand?: (context: any) => void;
}

const FloatingIcons = ({ iconName, isHovered }: { iconName: string; isHovered: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            x: [0, 6, -6, 0],
            y: [0, -8, 8, 0],
            rotate: [0, 10, -10, 0],
            opacity: isHovered ? 0.08 : 0.03
          }}
          transition={{ 
            duration: 25 + (i * 10), 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className={`absolute blur-[0.5px] ${isHovered ? 'text-brand-primary' : 'text-slate-300 dark:text-slate-700'} transition-colors duration-700`}
          style={{ 
            left: `${15 + (i * 30)}%`, 
            top: `${20 + (i * 20)}%`,
          }}
        >
          {getIcon(iconName, 48 + (i * 12))}
        </motion.div>
      ))}
    </div>
  );
};

const LoanCard: React.FC<LoanCardProps> = ({ offer, onClick, onExpressDemand }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = React.useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
      whileTap={{ scale: 0.97 }}
      className={`group relative h-[440px] w-full max-w-[340px] mx-auto bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[3.5rem] border-2 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col ${
        isHovered 
          ? 'border-brand-primary/50 shadow-3xl z-20' 
          : 'border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none'
      }`}
      onClick={onClick}
    >
      <FloatingIcons iconName={offer.icon} isHovered={isHovered} />

      <div className={`absolute -inset-2 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(124,58,237,0.12),transparent_70%)] transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      <div className="relative z-20 p-10 flex flex-col h-full" style={{ transform: "translateZ(50px)" }}>
        <div className="shrink-0 flex justify-between items-start mb-8">
          <motion.div 
            animate={isHovered ? { scale: 1.1, rotate: [0, -5, 5, 0] } : {}}
            className={`w-16 h-16 ${isHovered ? 'bg-brand-primary' : offer.color} text-white rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl shadow-current/20`}
          >
            {getIcon(offer.icon, 32)}
          </motion.div>
          
          <div className={`px-4 py-2 rounded-2xl border transition-all duration-500 ${
            isHovered 
              ? 'bg-brand-primary/5 border-brand-primary/30' 
              : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700'
          }`}>
            <span className={`text-[9px] uppercase font-black tracking-widest block leading-none mb-1.5 ${isHovered ? 'text-brand-primary' : 'text-slate-400'}`}>
              {t('labels.rate_from')}
            </span>
            <div className={`text-2xl font-black italic leading-none transition-colors duration-500 ${isHovered ? 'text-brand-primary' : 'text-slate-900 dark:text-white'}`}>
              {offer.minRate}%
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center items-start text-left space-y-4">
          <h3 className={`text-2xl font-black uppercase tracking-tighter italic leading-tight transition-colors duration-500 ${
            isHovered ? 'text-brand-primary' : 'text-slate-950 dark:text-white'
          }`}>
            {t(offer.title)}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium line-clamp-4">
            {t(offer.description)}
          </p>
        </div>

        <div className={`shrink-0 mt-auto pt-6 flex items-center justify-between border-t transition-colors duration-500 ${
          isHovered ? 'border-brand-primary/20' : 'border-slate-50 dark:border-slate-800/50'
        }`}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            onClick={(e) => { e.stopPropagation(); onExpressDemand?.({ loanId: offer.id }); }}
            className={`flex items-center space-x-3 px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all duration-500 shadow-lg ${
              isHovered 
                ? 'bg-brand-primary text-white shadow-brand' 
                : 'bg-slate-950 dark:bg-slate-800 text-white'
            }`}
          >
            <Zap size={14} className={isHovered ? 'fill-white' : ''} />
            <span>{t('labels.express_demand')}</span>
          </motion.button>
          
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isHovered ? 'bg-brand-primary/10 text-brand-primary' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
            <ArrowUpRight size={24} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoanCard;