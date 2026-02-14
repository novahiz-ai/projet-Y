import React from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '../../infrastructure/IconRegistry';

interface FloatingIconsProps {
  iconName: string;
  isHovered: boolean;
}

const FloatingIcons: React.FC<FloatingIconsProps> = ({ iconName, isHovered }) => {
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

export default FloatingIcons;