import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ShieldCheck, Eye, EyeOff, Lock, Zap } from 'lucide-react';
import StandardButton from '../../components/StandardButton';

const CardsPage: React.FC = () => {
  const [showNumbers, setShowNumbers] = React.useState(false);

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic text-slate-950 dark:text-white">Vos Cartes.</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">Gérez vos moyens de paiement virtuels</p>
        </div>
        <StandardButton className="!rounded-2xl !py-4 !px-8">
          <Plus size={18} />
          <span className="text-xs">Nouvelle Carte</span>
        </StandardButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Visual Card 1 */}
        <motion.div 
          whileHover={{ rotateY: 5, rotateX: -5 }}
          className="relative aspect-[1.586/1] w-full max-w-[450px] mx-auto perspective-1000 group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-brand-primary rounded-[2.5rem] shadow-2xl p-10 flex flex-col justify-between text-white overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3" />
             <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-10 bg-amber-400/80 rounded-lg shadow-inner-soft" />
                <span className="text-2xl font-black italic opacity-60">VISA</span>
             </div>
             
             <div className="relative z-10 space-y-4">
                <div className="flex items-center space-x-4">
                  <p className="text-xl md:text-2xl font-black tracking-[0.2em] italic">
                    {showNumbers ? '4532 1290 8843 0021' : '•••• •••• •••• 0021'}
                  </p>
                  <button onClick={() => setShowNumbers(!showNumbers)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    {showNumbers ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Titulaire</p>
                      <p className="text-sm font-black uppercase">Jean Dupont</p>
                   </div>
                   <div>
                      <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Expire</p>
                      <p className="text-sm font-black italic">12 / 27</p>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Card Controls */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
              <h3 className="text-xl font-black uppercase italic tracking-tight">Sécurité Active</h3>
              <div className="space-y-4">
                 {[
                   { label: 'Paiements en ligne', active: true, icon: Zap },
                   { label: 'Sans contact', active: true, icon: ShieldCheck },
                   { label: 'Retraits DAB', active: false, icon: Lock },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center space-x-4">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.active ? 'bg-brand-primary/10 text-brand-primary' : 'bg-slate-200 text-slate-400'}`}>
                            <item.icon size={20} />
                         </div>
                         <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${item.active ? 'bg-brand-primary' : 'bg-slate-200'}`}>
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.active ? 'right-1' : 'left-1'}`} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CardsPage;