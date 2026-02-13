import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Bell, CheckCircle2, Apple, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import StandardButton from '../StandardButton';
import FadeIn from '../ui/FadeIn';

const MobileAppSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 lg:py-40 bg-gradient-to-br from-brand-primary to-indigo-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-10 order-2 lg:order-1">
            <FadeIn direction="right" className="space-y-6">
              <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/20">
                <Smartphone size={32} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-[0.95]">
                VOTRE CRÉDIT <br />
                <span className="text-indigo-200">DANS LA POCHE.</span>
              </h2>
              <p className="text-indigo-100 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Suivez votre demande, gérez vos mensualités et recevez des notifications en temps réel depuis l'application Younited.
              </p>
            </FadeIn>

            <div className="space-y-6">
              {[
                "Décision finale en push notification",
                "Gestion du calendrier de remboursement",
                "Modification d'IBAN simplifiée"
              ].map((text, i) => (
                <FadeIn key={i} delay={i * 0.1} direction="right" className="flex items-center space-x-4">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 border border-white/10"><CheckCircle2 size={14} className="text-white" /></div>
                  <span className="text-sm font-black uppercase tracking-widest text-indigo-100">{text}</span>
                </FadeIn>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex items-center space-x-3 px-6 py-3.5 bg-slate-950 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
                <Apple size={24} />
                <div className="text-left">
                  <p className="text-[8px] font-bold uppercase opacity-60 leading-none">Download on the</p>
                  <p className="text-xs font-black uppercase tracking-tighter leading-none mt-1">App Store</p>
                </div>
              </button>
              <button className="flex items-center space-x-3 px-6 py-3.5 bg-slate-950 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
                <Play size={24} className="fill-current" />
                <div className="text-left">
                  <p className="text-[8px] font-bold uppercase opacity-60 leading-none">Get it on</p>
                  <p className="text-xs font-black uppercase tracking-tighter leading-none mt-1">Google Play</p>
                </div>
              </button>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 flex justify-center">
            <FadeIn direction="up">
              <div className="relative w-64 md:w-80 aspect-[9/18.5] bg-slate-950 rounded-[3.5rem] border-[10px] border-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-3xl"></div>
                <div className="p-8 pt-12 space-y-8 h-full bg-slate-900">
                   <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center"><Bell size={24} /></div>
                   <div className="space-y-2">
                      <div className="h-4 w-3/4 bg-white/10 rounded-full"></div>
                      <div className="h-4 w-1/2 bg-white/10 rounded-full"></div>
                   </div>
                   <div className="space-y-6 pt-10">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                         <div className="h-3 w-1/4 bg-brand-primary/40 rounded-full mb-3"></div>
                         <div className="h-6 w-full bg-white/10 rounded-lg"></div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                         <div className="h-3 w-1/4 bg-indigo-400/40 rounded-full mb-3"></div>
                         <div className="h-6 w-full bg-white/10 rounded-lg"></div>
                      </div>
                   </div>
                </div>
              </div>
            </FadeIn>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-400/20 blur-[100px] rounded-full"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;