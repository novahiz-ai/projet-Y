import React from 'react';
import { motion } from 'framer-motion';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -15, scale: 1.02, filter: 'blur(4px)' }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 30,
        mass: 1
      }}
      className={`min-h-screen pb-32 lg:pb-0 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;