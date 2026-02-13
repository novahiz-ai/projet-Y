import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, X } from 'lucide-react';
import { useConnectivity } from '../../hooks/useConnectivity';

const ConnectivityNotification: React.FC = () => {
  const { isOnline, hasChanged } = useConnectivity();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (hasChanged) {
      setShow(true);
      if (isOnline) {
        const timer = setTimeout(() => setShow(false), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isOnline, hasChanged]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="fixed bottom-24 left-6 z-[600] md:bottom-10 md:left-10"
        >
          <div className={`flex items-center space-x-3 px-5 py-3 rounded-2xl shadow-3xl backdrop-blur-xl border ${
            isOnline 
              ? 'bg-emerald-500/90 border-emerald-400 text-white' 
              : 'bg-slate-900/90 border-slate-700 text-slate-300'
          }`}>
            {isOnline ? <Wifi size={16} /> : <WifiOff size={16} className="text-rose-500" />}
            <span className="text-[10px] font-black uppercase tracking-widest">
              {isOnline ? 'Connexion rétablie' : 'Mode hors-ligne'}
            </span>
            <button onClick={() => setShow(false)} className="ml-2 opacity-50 hover:opacity-100">
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConnectivityNotification;