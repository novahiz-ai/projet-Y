
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Zap, 
  Euro, 
  ShieldCheck, 
  ArrowRight, 
  DollarSign, 
  PoundSterling, 
  X, 
  TrendingUp,
  Target,
  LayoutGrid,
  Wallet,
  Star,
  CheckCircle2,
  Clock,
  Shield
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { LOAN_OFFERS } from '../constants';
import StandardButton from '../components/StandardButton';
import ModernSelect from '../components/ModernSelect';

interface SimulatorPageProps {
  onProceedToApp?: (context: any) => void;
}

const SimulatorPage: React.FC<SimulatorPageProps> = ({ onProceedToApp }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState(15000);
  const [duration, setDuration] = useState(36);
  const [currency, setCurrency] = useState('EUR');
  const [selectedOffer, setSelectedOffer] = useState(LOAN_OFFERS[0]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

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
    { name: 'Capital', value: amount, color: '#4f46e5' },
    { name: 'Intérêts', value: Math.max(1, results.totalInterest), color: '#f59e0b' }
  ];

  const amountMax = selectedOffer.maxAmount || 150000;
  const amountPct = ((amount - 500) / (amountMax - 500)) * 100;
  const durationPct = ((duration - 6) / (120 - 6)) * 100;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-white md:bg-slate-950/40 dark:bg-slate-950/80 backdrop-blur-md overflow-hidden p-0 md:p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 1, y: 0 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full md:max-w-[900px] h-full md:h-[570px] md:max-h-[85vh] bg-white dark:bg-slate-900 md:rounded-[3rem] shadow-none md:shadow-3xl flex flex-col md:flex-row overflow-hidden p-0 md:p-2.5 gap-2.5 md:border border-slate-100 dark:border-slate-800"
      >
        <button 
          onClick={() => navigate('/')}
          className="absolute top-6 right-6 z-[100] w-12 h-12 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
        >
          <X size={24} />
        </button>

        <div className="flex-1 bg-white dark:bg-slate-950/20 md:bg-slate-50/50 md:rounded-[2.5rem] md:border border-slate-100 dark:border-slate-800/50 p-6 md:p-6 flex flex-col justify-start md:justify-center overflow-y-auto scrollbar-hide h-full pt-16 md:pt-6">
          <div className="space-y-6 md:space-y-5 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-3">
              <ModernSelect 
                label={t('simulator.project')}
                options={LOAN_OFFERS.filter(o => o.id !== 'assurance').map(o => ({ value: o.id, label: t(o.title) }))}
                value={selectedOffer.id}
                onChange={(val) => {
                  const offer = LOAN_OFFERS.find(o => o.id === val);
                  if (offer) setSelectedOffer(offer);
                }}
                className="!py-0"
              />

              <div className="space-y-1.5">
                <label className="text-[10px] md:text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] px-2 flex items-center space-x-2">
                  <LayoutGrid size={11} className="text-indigo-500" />
                  <span>{t('simulator.currency')}</span>
                </label>
                <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
                  {(['EUR', 'USD', 'GBP'] as const).map((cur) => (
                    <button
                      key={cur}
                      onClick={() => setCurrency(cur)}
                      className={`flex-1 py-3 md:py-2 rounded-xl text-[10px] md:text-[9px] font-black transition-all ${currency === cur ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {cur}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 md:space-y-4">
              <div className="p-6 md:p-5 bg-slate-50 md:bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 space-y-4 md:space-y-4 shadow-sm group">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] md:text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>{t('simulator.amount')}</span>
                  </p>
                  <div className="text-4xl md:text-2xl font-black text-slate-950 dark:text-white tracking-tighter italic leading-none">
                    {amount.toLocaleString()}<span className="text-indigo-600 ml-1 text-2xl md:text-lg">{currencyConfig[currency as keyof typeof currencyConfig].symbol}</span>
                  </div>
                </div>
                <input 
                  type="range" min="500" max={amountMax} step="100"
                  value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                  style={{ backgroundImage: `linear-gradient(to right, #4f46e5 ${amountPct}%, #e2e8f0 ${amountPct}%)` }}
                  className="simulator-slider compact-slider w-full h-3 md:h-1.5 rounded-full appearance-none cursor-pointer touch-none"
                />
              </div>

              <div className="p-6 md:p-5 bg-slate-50 md:bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 space-y-4 md:space-y-4 shadow-sm group">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] md:text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>{t('simulator.duration')}</span>
                  </p>
                  <div className="text-4xl md:text-2xl font-black text-slate-950 dark:text-white tracking-tighter italic leading-none">
                    {duration}<span className="text-orange-500 text-2xl md:text-lg ml-1.5 uppercase font-black">{t('simulator.months')}</span>
                  </div>
                </div>
                <input 
                  type="range" min="6" max={120} step="1"
                  value={duration} onChange={(e) => setDuration(Number(e.target.value))}
                  style={{ backgroundImage: `linear-gradient(to right, #f59e0b ${durationPct}%, #e2e8f0 ${durationPct}%)` }}
                  className="simulator-slider duration-slider compact-slider w-full h-3 md:h-1.5 rounded-full appearance-none cursor-pointer touch-none"
                />
              </div>
            </div>

            <div className="md:hidden py-2 grid grid-cols-2 gap-3">
              {[
                { icon: <CheckCircle2 size={16}/>, text: "0€ Frais Dossier", color: "text-emerald-500", bg: "bg-emerald-500/10" },
                { icon: <Clock size={16}/>, text: "Réponse 3min", color: "text-brand-primary", bg: "bg-brand-primary/10" },
                { icon: <Shield size={16}/>, text: "Sécurisé eIDAS", color: "text-indigo-500", bg: "bg-indigo-500/10" },
                { icon: <Zap size={16}/>, text: "TAEG Fixe", color: "text-amber-500", bg: "bg-amber-500/10" }
              ].map((chip, idx) => (
                <div key={idx} className={`flex items-center space-x-3 px-5 py-4 rounded-3xl ${chip.bg} ${chip.color} border border-slate-100 dark:border-slate-800 shadow-inner-soft`}>
                   {chip.icon}
                   <span className="text-[10px] font-black uppercase tracking-tight">{chip.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3 hidden md:block">
              <StandardButton 
                onClick={handleProceed} 
                className="w-full !py-4 !text-[11px] !rounded-2xl shadow-xl shadow-indigo-600/20 group bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Zap size={14} className="fill-current text-orange-500" />
                  <span className="font-black uppercase tracking-widest">{t('simulator.validate')}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </StandardButton>
              <div className="flex items-center justify-center space-x-2 text-slate-400 opacity-80">
                <ShieldCheck size={12} className="text-emerald-500" />
                <p className="text-[7px] font-black uppercase tracking-widest text-slate-500">{t('simulator.guarantee')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex w-full md:w-[380px] bg-slate-100 dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-center items-center relative overflow-hidden h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none scale-125">
             <Wallet size={400} strokeWidth={0.5} className="text-brand-primary" />
          </div>

          <div className="w-full space-y-5 relative z-10 text-center">
            <div className="space-y-1">
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em] text-slate-400 block mb-1">{t('simulator.est_monthly')}</span>
              <div className="flex items-center justify-center">
                 <motion.span 
                    key={results.monthlyPayment}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-[4rem] md:text-[5rem] font-black text-slate-950 dark:text-white tracking-tighter leading-none italic drop-shadow-xl"
                 >
                   {results.monthlyPayment}
                 </motion.span>
                 <span className="text-xl md:text-2xl font-black text-indigo-600 ml-2 italic mt-6">{currencyConfig[currency as keyof typeof currencyConfig].symbol}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
               <div className="p-4 bg-white/90 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
                  <p className="text-[7px] font-black uppercase tracking-widest text-slate-400">{t('simulator.interests')}</p>
                  <p className="text-base font-black text-slate-950 dark:text-white italic">
                    {results.totalInterest.toLocaleString()} <span className="text-orange-500 text-[9px]">{currencyConfig[currency as keyof typeof currencyConfig].symbol}</span>
                  </p>
               </div>
               <div className="p-4 bg-white/90 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
                  <p className="text-[7px] font-black uppercase tracking-widest text-slate-400">{t('simulator.total_cost')}</p>
                  <p className="text-base font-black text-slate-950 dark:text-white italic">
                    {results.totalCost.toLocaleString()} <span className="text-emerald-500 text-[9px]">{currencyConfig[currency as keyof typeof currencyConfig].symbol}</span>
                  </p>
               </div>
            </div>

            <div className="relative h-[110px] md:h-[130px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={chartData} 
                    cx="50%" cy="50%" 
                    innerRadius="65%" outerRadius="85%" 
                    paddingAngle={5} dataKey="value" stroke="none"
                    animationDuration={1200}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <Target size={14} className="text-indigo-600 mb-1 opacity-40" />
                 <p className="text-[6px] md:text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">{t('simulator.taeg')}</p>
                 <p className="text-xl md:text-2xl font-black text-slate-950 dark:text-white italic leading-none">{selectedOffer.minRate}%</p>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-950/5 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/5">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[7px] font-black text-slate-500 dark:text-white/40 uppercase tracking-widest">{t('simulator.indicative')}</span>
            </div>
          </div>
        </div>

        <div className="md:hidden sticky bottom-0 left-0 right-0 z-50 p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-6 shadow-[0_-20px_60px_rgba(0,0,0,0.2)]">
           <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-1">{t('simulator.est_monthly')}</span>
                <div className="flex items-baseline space-x-2">
                  <motion.span 
                    key={results.monthlyPayment}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-5xl font-black text-slate-950 dark:text-white italic tracking-tighter"
                  >
                    {results.monthlyPayment}
                  </motion.span>
                  <span className="text-xl font-black text-indigo-600 italic">{currencyConfig[currency as keyof typeof currencyConfig].symbol}</span>
                </div>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Coût Total</p>
                 <p className="text-xl font-black text-slate-950 dark:text-white italic leading-none">{results.totalCost.toLocaleString()} {currencyConfig[currency as keyof typeof currencyConfig].symbol}</p>
                 <div className="flex items-center justify-end space-x-1 mt-2 text-brand-primary">
                    <Target size={12}/>
                    <span className="text-[9px] font-black">TAEG {selectedOffer.minRate}%</span>
                 </div>
              </div>
           </div>
           
           <button 
             onClick={handleProceed}
             className="w-full bg-brand-primary text-white h-18 py-5 rounded-[2.5rem] font-black uppercase text-sm tracking-[0.4em] flex items-center justify-center space-x-4 shadow-brand active:scale-95 transition-all"
           >
             <Zap size={20} className="fill-white" />
             <span>{t('simulator.continue')}</span>
             <ArrowRight size={20} />
           </button>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .compact-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 44px;
          height: 44px;
          background: #ffffff;
          border: 12px solid currentColor;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
        }
        @media (min-width: 768px) {
          .compact-slider::-webkit-slider-thumb {
            width: 20px;
            height: 20px;
            border: 5px solid currentColor;
          }
        }
        .duration-slider::-webkit-slider-thumb { color: #f59e0b; }
        .simulator-slider:not(.duration-slider)::-webkit-slider-thumb { color: #4f46e5; }
        .dark .simulator-slider::-webkit-slider-thumb { background: #0f172a; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};

export default SimulatorPage;
