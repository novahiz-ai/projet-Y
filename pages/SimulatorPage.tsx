import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Zap, 
  Euro, 
  ShieldCheck, 
  ArrowRight, 
  DollarSign, 
  PoundSterling, 
  X, 
  Calendar, 
  TrendingUp,
  Target,
  ChevronRight
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { LOAN_OFFERS } from '../constants';
import StandardButton from '../components/StandardButton';
import ModernSelect from '../components/ModernSelect';

interface SimulatorPageProps {
  onProceedToApp?: (context: any) => void;
}

const SimulatorPage: React.FC<SimulatorPageProps> = ({ onProceedToApp }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  const initialOffer = location.state?.offerId 
    ? LOAN_OFFERS.find(o => o.id === location.state.offerId) 
    : LOAN_OFFERS[0];

  const [amount, setAmount] = useState(25000);
  const [duration, setDuration] = useState(48);
  const [currency, setCurrency] = useState('EUR');
  const [selectedOffer, setSelectedOffer] = useState(initialOffer || LOAN_OFFERS[0]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const currencyConfig = {
    EUR: { symbol: '€', icon: <Euro size={14} /> },
    USD: { symbol: '$', icon: <DollarSign size={14} /> },
    GBP: { symbol: '£', icon: <PoundSterling size={14} /> }
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

  return (
    <div className="h-[100dvh] w-full bg-white dark:bg-slate-950 flex flex-col overflow-hidden relative">
      <header className="pt-safe shrink-0 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl z-[100]">
        <div className="h-[60px] flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white shadow-brand">
              <TrendingUp size={16} strokeWidth={3} />
            </div>
            <span className="font-black uppercase tracking-tighter text-xs">LOGO {t('simulator.title')}</span>
          </div>
          
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-slate-400 hover:text-brand-primary transition-colors text-[9px] font-black uppercase tracking-widest"
          >
            <span>{t('simulator.quit')}</span>
            <X size={16} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <div className="absolute top-[-10%] left-[-10%] w-[30%] h-[30%] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>

        <div className="lg:w-[42%] p-4 md:p-8 lg:p-10 flex flex-col justify-start lg:justify-center bg-white dark:bg-slate-950 overflow-y-auto scrollbar-hide z-10 border-r border-slate-50 dark:border-slate-800/50 pb-40 lg:pb-10">
          <div className="max-w-md mx-auto w-full space-y-4 lg:space-y-6">
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ModernSelect 
                  label={t('simulator.project')}
                  options={LOAN_OFFERS.filter(o => o.id !== 'assurance').map(o => ({ value: o.id, label: t(o.title) }))}
                  value={selectedOffer.id}
                  onChange={(val) => {
                    const offer = LOAN_OFFERS.find(o => o.id === val);
                    if (offer) setSelectedOffer(offer);
                  }}
                />
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest px-1">{t('simulator.currency')}</label>
                  <div className="flex bg-slate-50 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-100 dark:border-slate-800/50">
                    {(['EUR', 'USD', 'GBP'] as const).map((cur) => (
                      <button
                        key={cur}
                        onClick={() => setCurrency(cur)}
                        className={`flex-1 py-2 rounded-lg text-[9px] font-black transition-all ${currency === cur ? 'bg-white dark:bg-slate-700 text-brand-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        {cur}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex justify-between items-end">
                  <div className="space-y-0.5">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t('simulator.amount')}</p>
                    <div className="text-2xl lg:text-3xl font-black text-slate-950 dark:text-white tracking-tighter italic leading-none">
                      {amount.toLocaleString()}<span className="text-brand-primary ml-1">{currencyConfig[currency as keyof typeof currencyConfig].symbol}</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-brand-primary shadow-sm border border-slate-100 dark:border-slate-700">
                    {currencyConfig[currency as keyof typeof currencyConfig].icon}
                  </div>
                </div>
                <input 
                  type="range" min="500" max={amountMax} step="100"
                  value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                  style={{ backgroundImage: `linear-gradient(to right, #6d28d9 ${amountPct}%, #e2e8f0 ${amountPct}%)` }}
                  className="simulator-slider w-full h-1 rounded-full appearance-none cursor-pointer"
                />
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex justify-between items-end">
                  <div className="space-y-0.5">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t('simulator.duration')}</p>
                    <div className="text-2xl lg:text-3xl font-black text-slate-950 dark:text-white tracking-tighter italic leading-none">
                      {duration}<span className="text-slate-400 text-xs ml-2 uppercase font-black">{t('simulator.months')}</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center text-brand-secondary shadow-sm border border-slate-100 dark:border-slate-700">
                    <Calendar size={14} />
                  </div>
                </div>
                <input 
                  type="range" min="6" max={120} step="1"
                  value={duration} onChange={(e) => setDuration(Number(e.target.value))}
                  style={{ backgroundImage: `linear-gradient(to right, #8b5cf6 ${durationPct}%, #e2e8f0 ${durationPct}%)` }}
                  className="simulator-slider w-full h-1 rounded-full appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="hidden lg:block pt-4 border-t border-slate-100 dark:border-slate-800/50 space-y-3">
              <StandardButton 
                onClick={handleProceed} 
                className="w-full !py-4 !text-[11px] !rounded-xl shadow-brand shadow-brand-primary/40 group"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Zap size={16} className="fill-white" />
                  <span className="font-black uppercase tracking-widest">{t('simulator.validate')}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </StandardButton>
              <div className="flex items-center justify-center space-x-2 text-slate-400">
                <ShieldCheck size={12} className="text-emerald-500" />
                <p className="text-[7px] font-black uppercase tracking-[0.2em]">{t('simulator.guarantee')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:w-[58%] p-6 lg:p-10 flex-col justify-center items-center bg-slate-50 dark:bg-slate-900/30 overflow-hidden relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
             <TrendingUp size={600} strokeWidth={0.5} />
          </div>

          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 lg:p-8 shadow-3xl dark:shadow-none border-2 border-slate-100 dark:border-slate-800 space-y-6 relative z-10">
            <div className="text-center space-y-0.5">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400">{t('simulator.est_monthly')}</span>
              <div className="flex items-center justify-center mt-2">
                 <span className="text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tighter leading-none italic">
                   {results.monthlyPayment}
                 </span>
                 <span className="text-2xl font-black text-brand-primary ml-2 italic">{currencyConfig[currency as keyof typeof currencyConfig].symbol}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
               <div className="p-4 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                  <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">{t('simulator.interests')}</p>
                  <p className="text-base font-black text-slate-950 dark:text-white italic">
                    {results.totalInterest.toLocaleString()} {currencyConfig[currency as keyof typeof currencyConfig].symbol}
                  </p>
               </div>
               <div className="p-4 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                  <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">{t('simulator.total_cost')}</p>
                  <p className="text-base font-black text-slate-950 dark:text-white italic">
                    {results.totalCost.toLocaleString()} {currencyConfig[currency as keyof typeof currencyConfig].symbol}
                  </p>
               </div>
            </div>

            <div className="relative h-[160px] lg:h-[200px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <PieChart>
                  <Pie 
                    data={chartData} 
                    cx="50%" cy="50%" 
                    innerRadius="80%" outerRadius="100%" 
                    paddingAngle={6} dataKey="value" stroke="none"
                    animationDuration={1000}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <Target size={14} className="text-brand-primary mb-1" />
                 <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">{t('simulator.taeg')}</p>
                 <p className="text-xl lg:text-2xl font-black text-brand-primary">{selectedOffer.minRate}%</p>
              </div>
            </div>

            <div className="text-center">
               <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full border border-emerald-500/10">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[7px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest italic">{t('simulator.indicative')}</span>
               </div>
            </div>
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
                    <AnimatePresence mode="wait">
                       <motion.span 
                          key={results.monthlyPayment}
                          initial={{ scale: 0.8, opacity: 0, y: 5 }}
                          animate={{ scale: 1, opacity: 1, y: 0 }}
                          className="text-3xl font-black text-white italic leading-none"
                       >
                          {results.monthlyPayment}
                       </motion.span>
                    </AnimatePresence>
                    <span className="text-brand-primary font-black text-sm ml-1.5 mb-0.5">{currencyConfig[currency as keyof typeof currencyConfig].symbol}/{t('simulator.months_short')}</span>
                 </div>
              </div>
              
              <button 
                 onClick={handleProceed}
                 className="bg-brand-primary text-white h-14 px-6 rounded-3xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center space-x-2 shadow-lg shadow-brand-primary/20 active:scale-95 transition-all"
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
          box-shadow: 0 4px 8px rgba(109, 40, 217, 0.15);
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .simulator-slider:active::-webkit-slider-thumb { 
          transform: scale(1.1);
          border-color: #8b5cf6;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default SimulatorPage;