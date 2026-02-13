import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

/**
 * V16 — SOVEREIGN COMPONENT
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
  duration = 0.5,
  className = "",
  ...props 
}) => {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      id={id}
      initial={{ 
        opacity: 0, 
        ...directions[direction],
        scale: 0.98,
        filter: 'blur(8px)' 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        scale: 1,
        filter: 'blur(0px)' 
      }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        delay, 
        duration, 
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.5
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;