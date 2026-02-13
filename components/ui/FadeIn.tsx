import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

/**
 * V16 — SOVEREIGN UI ANIMATION ENGINE
 * Optimisé pour la réactivité et la fluidité GPU.
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
  duration = 0.4,
  className = "",
  ...props 
}) => {
  const directions = {
    up: { y: 15 },
    down: { y: -15 },
    left: { x: 15 },
    right: { x: -15 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      id={id}
      initial={{ 
        opacity: 0, 
        ...directions[direction],
        scale: 0.99,
        filter: 'blur(4px)' 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        scale: 1,
        filter: 'blur(0px)' 
      }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ 
        delay, 
        duration, 
        type: "spring",
        stiffness: 400, // Plus nerveux
        damping: 30,    // Moins d'oscillation
        mass: 0.8
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;