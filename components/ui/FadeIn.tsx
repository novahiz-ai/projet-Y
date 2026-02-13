import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

/**
 * V15 — SOVEREIGN COMPONENT
 * Type: UI_ANIMATION_ENGINE
 */
interface FadeInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  id?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  id,
  delay = 0, 
  direction = 'up', 
  duration = 0.8,
  className = "",
  ...props 
}) => {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      id={id}
      initial={{ 
        opacity: 0, 
        ...directions[direction],
        filter: 'blur(10px)' 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        filter: 'blur(0px)' 
      }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        delay, 
        duration, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;