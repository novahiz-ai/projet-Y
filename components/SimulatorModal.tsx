import React, { useState, useMemo, useEffect } from 'react';
import { X, TrendingUp, Zap, Calendar, Euro, Target, ShieldCheck, ArrowRight, DollarSign, PoundSterling } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LOAN_OFFERS } from '../constants';
import StandardButton from './StandardButton';
import ModernSelect from './ModernSelect';

interface SimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToApp?: (context: any) => void;
  initialOfferId?: string;
}

const SimulatorModal: React.FC<SimulatorModalProps> = ({ isOpen, onClose, onProceedToApp, initialOfferId }) => {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  
  const initialOffer = initialOfferId 
    ? LOAN_OFFERS.find(o => o.id === initialOfferId) 
    : LOAN_OFFERS[0];

  const [amount, setAmount] = useState(15000);
  const [duration, setDuration] = useState(36);
  const [currency, setCurrency] = useState('EUR');
  const [selectedOffer, setSelectedOffer] = useState(initialOffer || LOAN_OFFERS[0]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setIsMounted(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsMounted(false);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const currencyConfig = {
    EUR: { symbol: '€', icon: <Euro size={16} /> },
    USD: { symbol: '$', icon: <DollarSign size={16} /> },
    GBP: { symbol: '£', icon: <PoundSterling size={16} /> }
  };

  const results = useMemo(() => {
    const monthlyRate = (selectedOffer.minRate / 100) / 12;
    const n = duration;
    let monthlyPayment = monthlyRate === 0 
      ? amount / duration 
      : amount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    
    const totalCost = monthlyPayment * n;
    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalCost - amount),
      totalCost: Math.round(totalCost)
    };
  }, [amount, duration, selectedOffer]);

  const handleProceed = () => {
    if (onProceedToApp) {
      onProceedToApp({
        loanId: selectedOffer.id,
        amount,
        duration,
        currency,
        monthlyPayment: results.monthlyPayment
      });
    }
  };

  const chartData = [
    { name: 'Capital', value: amount, color: '#6d28d9' },
    { name: 'Intérêts', value: Math.max(1, results.totalInterest), color: '#d8b4fe' }
  ];

  const amountMax = selectedOffer.maxAmount || 150000;
  const amountPct = ((amount - 500) / (amountMax - 500)) * 100;
  const durationPct = ((duration - 6) / (120 - 6)) * 100;

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[400] bg-white dark:bg-slate-950 flex flex-col h-screen overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <header className="px-6 md:px-12 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl z-50 shrink-0">
        <div className="flex items-center space-x-3">
          <span className="text-lg font-black uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{t('simulator.title')}</span>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden sm:flex items-center space-x-2">
             {['EUR', 'USD', 'GBP'].map(cur => (
               <button key={cur} onClick={() => setCurrency(cur)} className={`px-3 py-1 rounded-lg text-[9px] font-black transition-all ${currency === cur ? 'bg-brand-primary text-white' : 'text-slate-400 hover:text-slate-600'}`}>
                 {cur}
               </button>
             ))}
          </div>
          
          <button 
            onClick={onClose}
            className="group relative w-10 h-10 flex items-center justify-center transition-all duration-300"
            aria-label={t('simulator.quit')}
          >
            <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl group-hover:bg-brand-primary transition-all duration-300 group-hover:rotate-90 group-hover:scale-110 shadow-sm border border-slate-200 dark:border-slate-700 group-hover:border-brand-primary"></div>
            <X size={20} className="relative z-10 text-slate-500 dark:text-slate-400 group-hover:text-white transition-colors" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <div className="lg:w-1/2 p-6 md:p-12 flex flex-col justify-start lg:justify-center bg-white dark:bg-slate-950 overflow-y-auto scrollbar-hide pb-32 lg:pb-12">
          <div className="max-w-xl mx-auto w-full space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ModernSelect 
                label={t('simulator.project')} 
                options={LOAN_OFFERS.filter(o => o.id !== 'assurance').map(o => ({ value: o.id, label: t(o.title) }))} 
                value={selectedOffer.id} 
                onChange={val => {
                  const off = LOAN_OFFERS.find(o => o.id === val);
                  if (off) setSelectedOffer(off);
                }} 
              />
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">{t('simulator.currency')}</label>
                <div className="flex bg-slate-50 dark:bg-slate-800/50 p-1 rounded-2xl border border-slate-100 dark:border-slate-800">
                  {['EUR', 'USD', 'GBP'].map(cur => (
                    <button key={cur} onClick={() => setCurrency(cur)} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${currency === cur ? 'bg-white dark:bg-slate-700 text-brand-primary shadow-sm' : 'text-slate-400'}`}>
                      {cur}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-4 shadow-sm hover:border-brand-primary/20 transition-all">
                <div className="flex justify-between items-center">
                   <span className="font-black uppercase tracking-widest text-[9px] text-slate-500">{t('simulator.amount')}</span>
                   <div className="text-3xl font-black text-slate-950 dark:text-white italic tracking-tighter">
                     {amount.toLocaleString()}<span className="text-brand-primary ml-1 font-black">{currencyConfig[currency as keyof typeof currencyConfig].symbol}</span>
                   </div>
                </div>
                <input type="range" min="500" max={amountMax} step="100" value={amount} onChange={e => setAmount(Number(e.target.value))}
                  style={{ backgroundImage: `linear-gradient(to right, #6d28d9 ${amountPct}%, #e2e8f0 ${amountPct}%)` }}
                  className="simulator-slider w-full h-1.5 rounded-full appearance-none cursor-pointer" />
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-4 shadow-sm hover:border-brand-primary/20 transition-all">
                <div className="flex justify-between items-center">
                   <span className="font-black uppercase tracking-widest text-[9px] text-slate-500">{t('simulator.duration')}</span>
                   <div className="text-3xl font-black text-slate-950 dark:text-white italic tracking-tighter">
                     {duration}<span className="text-slate-400 text-sm ml-1 uppercase font-black">{t('simulator.months')}</span>
                   </div>
                </div>
                <input type="range" min="6" max={120} step="1" value={duration} onChange={e => setDuration(Number(e.target.value))}
                  style={{ backgroundImage: `linear-gradient(to right, #6d28d9 ${durationPct}%, #e2e8f0 ${durationPct}%)` }}
                  className="simulator-slider w-full h-1.5 rounded-full appearance-none cursor-pointer" />
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
               <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
               <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                 {t('simulator.guarantee')}
               </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-1/2 p-6 md:p-12 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/20 border-l border-slate-100 dark:border-slate-800 overflow-y-auto scrollbar-hide min-h-0 min-w-0">
          <div className="w-full max-sm flex flex-col items-center space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{t('simulator.est_monthly')}</span>
              <div className="flex items-center justify-center mt-1">
                 <span className="text-6xl font-black text-slate-950 dark:text-white tracking-tighter leading-none italic">
                   {results.monthlyPayment}
                 </span>
                 <span className="text-2xl font-black text-brand-primary ml-2 italic">{currencyConfig[currency as keyof typeof currencyConfig].symbol}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
               <div className="p-5 bg-white dark:bg-slate-950 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm text-center">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('simulator.interests')}</p>
                  <p className="text-xl font-black italic">{results.totalInterest.toLocaleString()} {currencyConfig[currency as keyof typeof currencyConfig].symbol}</p>
               </div>
               <div className="p-5 bg-white dark:bg-slate-950 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm text-center">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('simulator.total_cost')}</p>
                  <p className="text-xl font-black italic">{results.totalCost.toLocaleString()} {currencyConfig[currency as keyof typeof currencyConfig].symbol}</p>
               </div>
            </div>

            <div className="w-full relative h-[200px] min-h-0 min-w-0">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <PieChart>
                    <Pie data={chartData} cx="50%" cy="50%" innerRadius="85%" outerRadius="100%" paddingAngle={6} dataKey="value" stroke="none" animationDuration={800}>
                      {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t('simulator.taeg')}</p>
                 <p className="text-2xl font-black text-brand-primary italic leading-none">{selectedOffer.minRate}%</p>
              </div>
            </div>

            <StandardButton onClick={handleProceed} className="w-full !py-5 shadow-brand group">
              <span>{t('simulator.continue')}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </StandardButton>
          </div>
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[200] p-4 pb-safe">
           <div className="bg-slate-950/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-800/50 rounded-[2.5rem] p-5 shadow-3xl flex items-center justify-between gap-4">
              <div className="flex flex-col">
                 <div className="flex items-center space-x-1 text-[8px] font-black text-indigo-300 uppercase tracking-widest mb-1">
                    <Target size={10} />
                    <span>{t('simulator.taeg')} {selectedOffer.minRate}%</span>
                 </div>
                 <div className="flex items-end">
                    <span className="text-3xl font-black text-white italic leading-none">
                      {results.monthlyPayment}
                    </span>
                    <span className="text-brand-primary font-black text-sm ml-1.5 mb-0.5">{currencyConfig[currency as keyof typeof currencyConfig].symbol}/{t('simulator.months_short')}</span>
                 </div>
              </div>
              <button 
                 onClick={handleProceed}
                 className="bg-brand-primary text-white h-14 px-8 rounded-3xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center space-x-2 shadow-lg active:scale-95 transition-all"
              >
                 <span>{t('simulator.continue')}</span>
                 <ArrowRight size={16} />
              </button>
           </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .simulator-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #ffffff;
          border: 4px solid #6d28d9;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(109, 40, 217, 0.2);
        }
      `}} />
    </div>
  );
};

export default SimulatorModal;