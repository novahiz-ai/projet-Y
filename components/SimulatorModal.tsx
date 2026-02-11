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
  
  const initialOffer = useMemo(() => 
    initialOfferId ? LOAN_OFFERS.find(o => o.id === initialOfferId) : LOAN_OFFERS[0]
  , [initialOfferId]);

  const [amount, setAmount] = useState(15000);
  const [duration, setDuration] = useState(36);
  const [currency, setCurrency] = useState('EUR');
  const [selectedOffer, setSelectedOffer] = useState(initialOffer || LOAN_OFFERS[0]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => setIsMounted(true), 200);
      return () => clearTimeout(timer);
    }
    setIsMounted(false);
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
    { name: 'Capital', value: amount, color: '#6366f1' },
    { name: 'Interests', value: Math.max(1, results.totalInterest), color: '#a5b4fc' }
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
      className="fixed inset-0 z-[500] bg-white dark:bg-slate-950 flex flex-col h-screen overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="relative px-6 md:px-12 py-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl z-50">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-brand">
            <TrendingUp size={20} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-black uppercase tracking-tighter text-slate-900 dark:text-white italic leading-none">
            {t('simulator.title')}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
             {(['EUR', 'USD', 'GBP'] as const).map(cur => (
               <button 
                 key={cur} 
                 onClick={() => setCurrency(cur)} 
                 className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${currency === cur ? 'bg-white dark:bg-slate-600 text-brand-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 {cur}
               </button>
             ))}
          </div>
          
          <button 
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:bg-brand-primary hover:text-white transition-all shadow-sm"
          >
            <X size={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left Column - Controls */}
        <div className="lg:w-1/2 p-6 md:p-12 lg:p-20 flex flex-col justify-start lg:justify-center overflow-y-auto scrollbar-hide pb-40 lg:pb-20">
          <div className="max-w-xl mx-auto w-full space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ModernSelect 
                label={t('simulator.project')} 
                options={LOAN_OFFERS.filter(o => o.id !== 'assurance').map(o => ({ value: o.id, label: t(o.title) }))} 
                value={selectedOffer.id} 
                onChange={val => {
                  const off = LOAN_OFFERS.find(o => o.id === val);
                  if (off) setSelectedOffer(off);
                }} 
              />
              <div className="space-y-2 lg:hidden">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">{t('simulator.currency')}</label>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
                  {(['EUR', 'USD', 'GBP'] as const).map(cur => (
                    <button key={cur} onClick={() => setCurrency(cur)} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${currency === cur ? 'bg-white dark:bg-slate-700 text-brand-primary shadow-sm' : 'text-slate-400'}`}>
                      {cur}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Amount Slider */}
              <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-6 group hover:border-brand-primary/20 transition-all shadow-sm">
                <div className="flex justify-between items-center">
                   <span className="font-black uppercase tracking-widest text-[10px] text-slate-400">{t('simulator.amount')}</span>
                   <div className="text-4xl font-black text-slate-950 dark:text-white italic tracking-tighter">
                     {amount.toLocaleString()}<span className="text-brand-primary ml-1">{currencyConfig[currency as keyof typeof currencyConfig].symbol}</span>
                   </div>
                </div>
                <input 
                  type="range" min="500" max={amountMax} step="100" 
                  value={amount} 
                  onChange={e => setAmount(Number(e.target.value))}
                  style={{ backgroundImage: `linear-gradient(to right, #6366f1 ${amountPct}%, #e2e8f0 ${amountPct}%)` }}
                  className="simulator-slider w-full h-2 rounded-full appearance-none cursor-pointer" 
                />
              </div>

              {/* Duration Slider */}
              <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-6 group hover:border-brand-primary/20 transition-all shadow-sm">
                <div className="flex justify-between items-center">
                   <span className="font-black uppercase tracking-widest text-[10px] text-slate-400">{t('simulator.duration')}</span>
                   <div className="text-4xl font-black text-slate-950 dark:text-white italic tracking-tighter">
                     {duration}<span className="text-slate-400 text-base ml-2 uppercase font-black">{t('simulator.months')}</span>
                   </div>
                </div>
                <input 
                  type="range" min="6" max={120} step="1" 
                  value={duration} 
                  onChange={e => setDuration(Number(e.target.value))}
                  style={{ backgroundImage: `linear-gradient(to right, #818cf8 ${durationPct}%, #e2e8f0 ${durationPct}%)` }}
                  className="simulator-slider w-full h-2 rounded-full appearance-none cursor-pointer" 
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl">
               <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                 <ShieldCheck size={20} />
               </div>
               <p className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 leading-tight">
                 {t('simulator.guarantee')}
               </p>
            </div>
          </div>
        </div>

        {/* Right Column - Results (Desktop) */}
        <div className="hidden lg:flex lg:w-1/2 p-12 lg:p-20 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/20 border-l border-slate-100 dark:border-slate-800 relative">
          <div className="w-full max-w-md flex flex-col items-center space-y-12">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-400">{t('simulator.est_monthly')}</span>
              <div className="flex items-center justify-center">
                 <motion.span 
                    key={results.monthlyPayment}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-8xl font-black text-slate-950 dark:text-white tracking-tighter leading-none italic"
                 >
                   {results.monthlyPayment}
                 </motion.span>
                 <span className="text-3xl font-black text-brand-primary ml-3 italic">{currencyConfig[currency as keyof typeof currencyConfig].symbol}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
               <div className="p-6 bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t('simulator.interests')}</p>
                  <p className="text-xl font-black italic text-slate-900 dark:text-white">{results.totalInterest.toLocaleString()} {currencyConfig[currency as keyof typeof currencyConfig].symbol}</p>
               </div>
               <div className="p-6 bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t('simulator.total_cost')}</p>
                  <p className="text-xl font-black italic text-slate-900 dark:text-white">{results.totalCost.toLocaleString()} {currencyConfig[currency as keyof typeof currencyConfig].symbol}</p>
               </div>
            </div>

            <div className="w-full relative h-[220px] flex items-center justify-center">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={chartData} 
                      cx="50%" cy="50%" 
                      innerRadius="80%" outerRadius="100%" 
                      paddingAngle={8} 
                      dataKey="value" 
                      stroke="none"
                      animationBegin={0}
                      animationDuration={1200}
                    >
                      {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{t('simulator.taeg')}</p>
                 <p className="text-4xl font-black text-brand-primary italic leading-none">{selectedOffer.minRate}%</p>
              </div>
            </div>

            <StandardButton onClick={handleProceed} className="w-full !py-6 shadow-brand group">
              <span className="text-lg">{t('simulator.continue')}</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </StandardButton>
          </div>
        </div>

        {/* Mobile Sticky CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[200] p-6 pb-safe">
           <div className="bg-slate-950/95 dark:bg-slate-900/95 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex items-center justify-between gap-6">
              <div className="flex flex-col">
                 <div className="flex items-center space-x-2 text-[9px] font-black text-brand-secondary uppercase tracking-[0.2em] mb-1.5">
                    <Target size={12} className="text-brand-primary" />
                    <span>TAEG {selectedOffer.minRate}%</span>
                 </div>
                 <div className="flex items-end">
                    <motion.span 
                      key={results.monthlyPayment}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-4xl font-black text-white italic leading-none"
                    >
                      {results.monthlyPayment}
                    </motion.span>
                    <span className="text-brand-primary font-black text-base ml-2 mb-1 italic">
                      {currencyConfig[currency as keyof typeof currencyConfig].symbol}
                    </span>
                 </div>
              </div>
              <button 
                 onClick={handleProceed}
                 className="bg-brand-primary text-white h-16 px-10 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center space-x-3 shadow-brand active:scale-95 transition-all"
              >
                 <span>{t('simulator.continue')}</span>
                 <ArrowRight size={18} />
              </button>
           </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .simulator-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          background: #ffffff;
          border: 6px solid #6366f1;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .simulator-slider:active::-webkit-slider-thumb {
          transform: scale(1.15);
        }
        .dark .simulator-slider::-webkit-slider-thumb {
          background: #0f172a;
          border-color: #818cf8;
        }
      `}} />
    </motion.div>
  );
};

export default SimulatorModal;