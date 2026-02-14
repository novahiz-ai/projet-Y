import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';

interface BaseDropdownProps {
  isOpen: boolean;
  onToggle: (state: boolean) => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  label?: string;
  title?: string;
  className?: string;
}

const BaseDropdown: React.FC<BaseDropdownProps> = ({ 
  isOpen, onToggle, trigger, children, label, title, className = "" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) onToggle(false);
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div className={`space-y-2 relative ${className}`} ref={containerRef}>
      {label && (
        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1 flex items-center space-x-2">
          <span>{label}</span>
        </label>
      )}
      
      <div onClick={() => onToggle(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Desktop Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="hidden md:block absolute top-full left-0 right-0 mt-2 z-[300] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-3xl shadow-3xl max-h-96 overflow-y-auto scrollbar-hide py-2"
            >
              {children}
            </motion.div>

            {/* Mobile Full Screen (Gouvernance : Juste plein, centré) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-[1000] bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-0"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full h-full bg-white dark:bg-slate-950 flex flex-col"
              >
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
                  <div>
                    <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{label}</p>
                    <h3 className="text-xl font-black text-slate-950 dark:text-white uppercase italic">{title || "Sélection"}</h3>
                  </div>
                  <button 
                    onClick={() => onToggle(false)}
                    className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-500"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                  {children}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BaseDropdown;