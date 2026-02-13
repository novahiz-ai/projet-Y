import React from 'react';
import { motion } from 'framer-motion';

const SecurityVaultAnimation: React.FC = () => {
  return (
    <div className="relative w-full aspect-square flex items-center justify-center pointer-events-none select-none">
      {/* Glow de fond statique */}
      <div className="absolute inset-0 bg-brand-primary/10 blur-[120px] rounded-full scale-110" />

      {/* Anneau Orbital 1 - Rotation Lente */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[85%] h-[85%] border-[1px] border-brand-primary/20 rounded-full border-dashed"
      />

      {/* Anneau Orbital 2 - Rotation Rapide Inverse */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[70%] h-[70%] border-[2px] border-indigo-500/10 rounded-full border-dotted"
      />

      {/* Anneau Orbital 3 - Hexagones Pulsants */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: 180
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[55%] h-[55%] border-[1.5px] border-brand-primary/30 rounded-[3rem]"
      />

      {/* Noyau Central - Le "Core" */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Halo de puissance */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-brand-primary/40 rounded-full blur-2xl"
        />
        
        {/* Sphère de données */}
        <motion.div 
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(124, 58, 237, 0.5)",
              "0 0 50px rgba(124, 58, 237, 0.8)",
              "0 0 20px rgba(124, 58, 237, 0.5)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 bg-slate-900 rounded-full border-2 border-brand-primary flex items-center justify-center z-10 overflow-hidden"
        >
          {/* Grille interne animée */}
          <motion.div 
            animate={{ y: [-40, 40] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-full opacity-30"
            style={{ 
              backgroundImage: 'linear-gradient(transparent 1px, #7c3aed 1px), linear-gradient(90deg, transparent 1px, #7c3aed 1px)',
              backgroundSize: '8px 8px'
            }}
          />
        </motion.div>

        {/* Satellites de données (Petits points) */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 10 + i * 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, delay: i * 0.3 }
            }}
            className="absolute w-2 h-2 bg-brand-primary rounded-full shadow-[0_0_10px_#7c3aed]"
            style={{ 
              top: '50%',
              left: '50%',
              marginTop: '-4px',
              marginLeft: '-4px',
              transform: `rotate(${i * 60}deg) translateX(${60 + i * 5}px)`
            }}
          />
        ))}
      </div>

      {/* Effet Scanner Laser Horizontal */}
      <motion.div
        animate={{ top: ['20%', '80%', '20%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent shadow-[0_0_15px_#7c3aed] z-20 opacity-40"
      />
    </div>
  );
};

export default SecurityVaultAnimation;