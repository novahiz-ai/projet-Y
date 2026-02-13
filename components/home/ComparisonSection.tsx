import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Clock, FileText, Ban } from 'lucide-react';
import FadeIn from '../ui/FadeIn';

const ComparisonSection: React.FC = () => {
  return (
    <section className="py-24 lg:py-40 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-6 mb-20">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-[0.95]">
              LA DIFFÉRENCE <br />
              <span className="text-brand-primary">YOUNITED.</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-2xl mx-auto mt-6">
              Pourquoi nous confier vos projets plutôt qu'à une banque classique ? La réponse est dans l'expérience.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 bg-white dark:bg-slate-950 rounded-[4rem] shadow-3xl overflow-hidden border border-slate-100 dark:border-slate-800">
          {/* Younited Side */}
          <div className="p-12 lg:p-20 space-y-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl group-hover:bg-brand-primary/10 transition-colors"></div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-brand"><Zap size={24} className="fill-white" /></div>
              <h3 className="text-2xl font-black uppercase italic tracking-tight">Younited</h3>
            </div>
            
            <div className="space-y-8">
              {[
                { icon: <Clock size={20} />, text: "Réponse de principe immédiate", sub: "Traitement algorithmique 24/7." },
                { icon: <FileText size={20} />, text: "Zéro papier, 100% digital", sub: "Signature eIDAS et Open Banking." },
                { icon: <Zap size={20} />, text: "Fonds versés sous 48h*", sub: "Après acceptation et délais légaux." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1} className="flex items-start space-x-6">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-1"><Check size={18} /></div>
                  <div>
                    <p className="font-black text-sm uppercase text-slate-950 dark:text-white leading-tight">{item.text}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.sub}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Trad Bank Side */}
          <div className="p-12 lg:p-20 bg-slate-50/50 dark:bg-slate-900/30 space-y-12 border-l border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-4 opacity-50">
              <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 text-slate-500 rounded-2xl flex items-center justify-center"><Ban size={24} /></div>
              <h3 className="text-2xl font-black uppercase italic tracking-tight">Banque Classique</h3>
            </div>
            
            <div className="space-y-8 opacity-60">
              {[
                "Délai d'analyse de 5 à 10 jours",
                "Justificatifs papier et rendez-vous",
                "Processus opaque et frais cachés"
              ].map((text, i) => (
                <FadeIn key={i} delay={i * 0.1} className="flex items-start space-x-6">
                  <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0 mt-1"><X size={18} /></div>
                  <div>
                    <p className="font-black text-sm uppercase text-slate-500 dark:text-slate-400 leading-tight">{text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;