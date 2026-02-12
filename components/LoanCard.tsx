
import React, { useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Zap, ArrowUpRight } from 'lucide-react';
import { LoanOffer } from '../types';
import { getIcon } from '../constants';

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
            opacity: isHovered ? 0.05 : 0.02
          }}
          transition={{ 
            duration: 30 + (i * 12), 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className={`absolute blur-[1px] ${isHovered ? 'text-violet-500' : 'text-slate-300 dark:text-slate-700'} transition-colors duration-1000`}
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
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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

  const handleExpressClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onExpressDemand) {
      onExpressDemand({ loanId: offer.id, amount: 15000, duration: 48 });
    }
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1200, transformStyle: "preserve-3d" }}
      whileTap={{ scale: 0.98 }}
      className={`group relative h-[420px] w-[320px] mx-auto bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-[3rem] border-2 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col ${
        isHovered 
          ? 'border-violet-500/50 shadow-[0_30px_70px_-20px_rgba(124,58,237,0.35)] dark:shadow-[0_30px_70px_-20px_rgba(124,58,237,0.5)] z-20' 
          : 'border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/20 dark:shadow-none'
      }`}
      onClick={offer.id !== 'assurance' ? onClick : undefined}
    >
      <FloatingIcons iconName={offer.icon} isHovered={isHovered} />

      <div className={`absolute -inset-2 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.1),transparent_70%)] transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ x: "-100%", opacity: 0 }} animate={{ x: "120%", opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent pointer-events-none z-10 skew-x-12"
          />
        )}
      </AnimatePresence>

      <div className="relative z-20 p-10 flex flex-col h-full" style={{ transform: "translateZ(40px)" }}>
        <div className="shrink-0 flex justify-between items-start mb-8">
          <motion.div 
            animate={isHovered ? { scale: 1.1, backgroundColor: '#7c3aed' } : {}}
            className={`w-14 h-14 ${isHovered ? 'bg-violet-600' : offer.color} text-white rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl shadow-current/20`}
          >
            {getIcon(offer.icon, 28)}
          </motion.div>
          
          <div className={`px-4 py-2 rounded-2xl border transition-all duration-500 ${
            isHovered 
              ? 'bg-violet-500/5 border-violet-500/30' 
              : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-700'
          }`}>
            <span className={`text-[10px] uppercase font-black tracking-widest block leading-none mb-1.5 ${isHovered ? 'text-violet-500' : 'text-slate-400'}`}>
              {t('labels.rate_from')}
            </span>
            <div className={`text-xl font-black italic leading-none transition-colors duration-500 ${isHovered ? 'text-violet-600 dark:text-violet-400' : 'text-brand-primary'}`}>
              {offer.minRate}%
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center items-start text-left space-y-4">
          <h3 className={`text-2xl font-black uppercase tracking-tighter italic leading-tight transition-colors duration-500 ${
            isHovered ? 'text-violet-700 dark:text-violet-200' : 'text-slate-900 dark:text-white'
          }`}>
            {t(offer.title)}
          </h3>
          <p className={`text-slate-500 dark:text-slate-400 text-base leading-relaxed font-medium line-clamp-4 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-80'}`}>
            {t(offer.description)}
          </p>
        </div>

        <div className={`shrink-0 mt-auto pt-6 flex items-center justify-between border-t transition-colors duration-500 ${
          isHovered ? 'border-violet-500/20' : 'border-slate-50 dark:border-slate-800/50'
        }`}>
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
            onClick={handleExpressClick}
            className={`flex items-center space-x-3 px-6 py-3 rounded-[1.4rem] font-black uppercase text-xs tracking-widest transition-all duration-500 shadow-lg ${
              isHovered 
                ? 'bg-gradient-to-r from-[#7c3aed] to-[#6366f1] text-white shadow-violet-500/40' 
                : 'bg-slate-950 dark:bg-slate-800 text-white'
            }`}
          >
            <Zap size={14} className={isHovered ? 'fill-white' : ''} />
            <span>{t('labels.express_demand')}</span>
          </motion.button>
          
          <motion.div 
            animate={isHovered ? { scale: 1.1, backgroundColor: '#7c3aed', color: '#ffffff' } : {}}
            className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 transition-all duration-500 shadow-sm border border-transparent"
          >
            <ArrowUpRight size={24} />
          </motion.div>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-violet-500/5 to-transparent transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
    </motion.div>
  );
};

export default LoanCard;
