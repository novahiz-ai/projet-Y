import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  TrendingUp, 
  Zap, 
  Calendar, 
  Euro, 
  Target, 
  ShieldCheck, 
  ArrowRight, 
  DollarSign, 
  PoundSterling 
} from 'lucide-react';
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

const SimulatorModal: React.FC<SimulatorModalProps> = ({ 
  isOpen, 
  onClose, 
  onProceedToApp, 
  initialOfferId 
}) => {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  
  // Memoize initial offer logic
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
    { name: 'Intérêts', value: Math.max(1, results.totalInterest), color: '#a5b4fc' }
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
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 blur-[150px] rounded-full pointer-events-none" />
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
            className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:bg-brand-primary hover:text-white transition-all shadow-sm group"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Left Column: Input Controls */}
        <div className="lg:w-1/2 p-6 md:p-12 lg:p-20 flex flex-col justify-start lg:justify-center overflow-y-auto scrollbar-hide pb-40 lg:pb-20">
          <div className="max-w-xl mx-auto w-full space-y-12">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
                  {(['EUR', 'USD', 'GBP'] as const).map(cur => (
                    <button key={cur} onClick={() => setCurrency(cur)} className={`flex-1 py-3.5 rounded-xl text-[10px] font-black transition-all ${currency === cur ? 'bg-white dark:bg-slate-700 text-brand-primary shadow-sm' : 'text-slate-400'}`}>
                      {cur}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Amount Slider Card */}
              <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-8 group hover:border-brand-primary/20 transition-all shadow-sm">
                <div className="flex justify-between items-center">
                   <span className="font-black uppercase tracking-widest text-[11px] text-slate-400">{t('simulator.amount')}</span>
                   <div className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white italic tracking-tighter">
                     {amount.toLocaleString()}<span className="text-brand-primary ml-1.5">{currencyConfig[currency as keyof typeof currencyConfig].symbol}</span>
                   </div>
                </div>
                <div className="relative pt-2">
                  <input 
                    type="range" min="500" max={amountMax} step="100" 
                    value={amount} 
                    onChange={e => setAmount(Number(e.target.value))}
                    style={{ backgroundImage: `linear-gradient(to right, #6366f1 ${amountPct}%, #e2e8f0 ${amountPct}%)` }}
                    className="simulator-slider w-full h-2 rounded-full appearance-none cursor-pointer" 
                  />
                </div>
              </div>

              {/* Duration Slider Card */}
              <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-8 group hover:border-brand-primary/20 transition-all shadow-sm">
                <div className="flex justify-between items-center">
                   <span className="font-black uppercase tracking-widest text-[11px] text-slate-400">{t('simulator.duration')}</span>
                   <div className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white italic tracking-tighter">
                     {duration}<span className="text-slate-400 text-lg ml-2 uppercase font-black">{t('simulator.months')}</span>
                   </div>
                </div>
                <div className="relative pt-2">
                  <input 
                    type="range" min="6" max={120} step="1" 
                    value={duration} 
                    onChange={e => setDuration(Number(e.target.value))}
                    style={{ backgroundImage: `linear-gradient(to right, #818cf8 ${durationPct}%, #e2e8f0 ${durationPct}%)` }}
                    className="simulator-slider w-full h-2 rounded-full appearance-none cursor-pointer" 
                  />
                </div>
              </div>
            </div>

            {/* Trust Footer */}
            <div className="flex items-center space-x-4 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl">
               <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
                 <ShieldCheck size={24} />
               </div>
               <div className="space-y-0.5">
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 leading-tight">
                    {t('simulator.guarantee')}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{t('stats.live')}</p>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visualization & CTA */}
        <div className="hidden lg:flex lg:w-1/2 p-12 lg:p-20 flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/20 border-l border-slate-100 dark:border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05),transparent_70%)] pointer-events-none" />
          
          <div className="w-full max-w-md flex flex-col items-center space-y-16">
            
            {/* Payment Display */}
            <div className="text-center space-y-4">
              <span className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400">{t('simulator.est_monthly')}</span>
              <div className="flex items-center justify-center">
                 <motion.span 
                    key={results.monthlyPayment}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-[10rem] font-black text-slate-950 dark:text-white tracking-tighter leading-none italic"
                 >
                   {results.monthlyPayment}
                 </motion.span>
                 <span className="text-4xl font-black text-brand-primary ml-4 italic mt-12">{currencyConfig[currency as keyof typeof currencyConfig].symbol}</span>
              </div>
            </div>

            {/* Mini Stats Grid */}
            <div className="grid grid-cols-2 gap-6 w-full">
               <div className="p-8 bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('simulator.interests')}</p>
                  <p className="text-2xl font-black italic text-slate-950 dark:text-white">
                    {results.totalInterest.toLocaleString()} {currencyConfig[currency as keyof typeof currencyConfig].symbol}
                  </p>
               </div>
               <div className="p-8 bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm text-center space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('simulator.total_cost')}</p>
                  <p className="text-2xl font-black italic text-slate-950 dark:text-white">
                    {results.totalCost.toLocaleString()} {currencyConfig[currency as keyof typeof currencyConfig].symbol}
                  </p>
               </div>
            </div>

            {/* Recharts Visualization */}
            <div className="w-full relative h-[250px] flex items-center justify-center">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={chartData} 
                      cx="50%" cy="50%" 
                      innerRadius="80%" outerRadius="100%" 
                      paddingAngle={10} 
                      dataKey="value" 
                      stroke="none"
                      animationBegin={0}
                      animationDuration={1500}
                    >
                      {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{t('simulator.taeg')}</p>
                 <p className="text-5xl font-black text-brand-primary italic leading-none">{selectedOffer.minRate}%</p>
              </div>
            </div>

            <StandardButton onClick={handleProceed} className="w-full !py-7 shadow-brand group">
              <span className="text-xl">{t('simulator.continue')}</span>
              <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform" />
            </StandardButton>
          </div>
        </div>

        {/* Mobile Sticky Action Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[200] p-6 pb-safe bg-gradient-to-t from-white dark:from-slate-950 to-transparent">
           <div className="bg-slate-950 dark:bg-slate-900 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.4)] flex items-center justify-between gap-8">
              <div className="flex flex-col">
                 <div className="flex items-center space-x-2 text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] mb-2">
                    <Target size={14} className="text-brand-primary" />
                    <span>TAEG {selectedOffer.minRate}%</span>
                 </div>
                 <div className="flex items-end">
                    <motion.span 
                      key={results.monthlyPayment}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-5xl font-black text-white italic leading-none tracking-tighter"
                    >
                      {results.monthlyPayment}
                    </motion.span>
                    <span className="text-brand-primary font-black text-lg ml-2 mb-1.5 italic">
                      {currencyConfig[currency as keyof typeof currencyConfig].symbol}
                    </span>
                 </div>
              </div>
              <button 
                 onClick={handleProceed}
                 className="bg-brand-primary text-white h-16 px-12 rounded-[2.2rem] font-black uppercase text-sm tracking-[0.2em] flex items-center justify-center space-x-3 shadow-brand active:scale-90 transition-all shrink-0"
              >
                 <span>{t('simulator.continue')}</span>
                 <ArrowRight size={20} />
              </button>
           </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .simulator-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 32px;
          height: 32px;
          background: #ffffff;
          border: 8px solid #6366f1;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 15px 35px rgba(99, 102, 241, 0.4);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s ease;
        }
        .simulator-slider:active::-webkit-slider-thumb {
          transform: scale(1.2);
          border-color: #4f46e5;
        }
        .dark .simulator-slider::-webkit-slider-thumb {
          background: #0f172a;
          border-color: #818cf8;
        }
        .dark .simulator-slider:active::-webkit-slider-thumb {
          border-color: #6366f1;
        }
      `}} />
    </motion.div>
  );
};

export default SimulatorModal;