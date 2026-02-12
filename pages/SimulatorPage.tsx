
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  X, 
  TrendingUp, 
  Euro, 
  DollarSign, 
  PoundSterling, 
  ArrowRight, 
  ShieldCheck,
  Download,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion, animate, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { LOAN_OFFERS } from '../constants';
import StandardButton from '../components/StandardButton';
import ModernSelect from '../components/ModernSelect';

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest))
    });
    return () => controls.stop();
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
};

const SimulatorPage: React.FC<{ onProceedToApp?: (context: any) => void }> = ({ onProceedToApp }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const recapRef = useRef<HTMLDivElement>(null);
  
  const [amount, setAmount] = useState(15000);
  const [duration, setDuration] = useState(36);
  const [currency, setCurrency] = useState('EUR');
  const [selectedOffer, setSelectedOffer] = useState(LOAN_OFFERS[0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const currencies = [
    { code: 'EUR', symbol: '€', icon: <Euro size={14} /> },
    { code: 'USD', symbol: '$', icon: <DollarSign size={14} /> },
    { code: 'GBP', symbol: '£', icon: <PoundSterling size={14} /> }
  ];

  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  const results = useMemo(() => {
    const monthlyRate = (selectedOffer.minRate / 100) / 12;
    const n = duration;
    let monthlyPayment = amount / duration; 
    if (monthlyRate > 0) {
      monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    }
    const totalCost = monthlyPayment * n;
    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalCost - amount),
      totalCost: Math.round(totalCost)
    };
  }, [amount, duration, selectedOffer]);

  const chartData = [
    { name: 'Capital', value: amount, color: '#4f46e5' },
    { name: 'Intérêts', value: Math.max(1, results.totalInterest), color: '#818cf8' }
  ];

  const handleExportPDF = async () => {
    if (!recapRef.current) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(recapRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: document.documentElement.classList.contains('dark') ? '#020617' : '#ffffff',
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth() - 40;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.setProperties({ title: `Recapitulatif_United_${selectedOffer.id}` });
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(22);
      pdf.text('VOTRE SIMULATION UNITED', 20, 25);
      pdf.addImage(imgData, 'JPEG', 20, 40, pdfWidth, pdfHeight);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Document généré le ${new Date().toLocaleDateString()}`, 20, pdfHeight + 60);
      pdf.save(`United_Simulation_${amount}.pdf`);
    } catch (err) {
      console.error('PDF Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const amountMax = selectedOffer.maxAmount || 150000;
  const amountPct = ((amount - 500) / (amountMax - 500)) * 100;
  const durationPct = ((duration - 6) / (120 - 6)) * 100;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-slate-900/0 overflow-hidden p-0 md:p-6 lg:p-12">
      {/* Backdrop animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-white/40 dark:bg-slate-950/60 backdrop-blur-2xl"
        onClick={() => navigate('/')}
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full md:max-w-5xl h-full md:h-[500px] bg-white dark:bg-slate-900 md:rounded-[3rem] shadow-3xl flex flex-col md:flex-row overflow-hidden border border-slate-100 dark:border-slate-800"
      >
        <button onClick={() => navigate('/')} className="absolute top-6 right-6 z-[100] p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm group">
          <X size={20} className="group-hover:rotate-90 transition-transform" />
        </button>

        <div className="flex-1 p-6 md:p-10 flex flex-col justify-center overflow-y-auto scrollbar-hide pb-[200px] md:pb-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 w-full max-w-xl mx-auto md:mx-0"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ModernSelect 
                label={t('simulator.project')}
                options={LOAN_OFFERS.filter(o => o.id !== 'assurance').map(o => ({ value: o.id, label: t(o.title) }))}
                value={selectedOffer.id}
                onChange={(val) => {
                  const off = LOAN_OFFERS.find(o => o.id === val);
                  if (off) setSelectedOffer(off);
                }}
              />
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">{t('simulator.currency')}</label>
                <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner-soft">
                  {currencies.map(cur => (
                    <button key={cur.code} onClick={() => setCurrency(cur.code)} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all flex items-center justify-center space-x-1 ${currency === cur.code ? 'bg-white dark:bg-slate-700 text-brand-primary shadow-sm scale-105' : 'text-slate-400'}`}>
                      {cur.icon}<span>{cur.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl space-y-4 border border-transparent hover:border-brand-primary/10 transition-colors shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t('simulator.amount')}</span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tighter">
                    {amount.toLocaleString()} <span className="text-brand-primary text-lg">{currentCurrency.symbol}</span>
                  </div>
                </div>
                <input 
                  type="range" min="500" max={amountMax} step="100" value={amount} 
                  onChange={(e) => setAmount(Number(e.target.value))}
                  style={{ backgroundImage: `linear-gradient(to right, var(--brand-primary) ${amountPct}%, #e2e8f0 ${amountPct}%)` }}
                  className="w-full h-1 appearance-none rounded-full cursor-pointer bg-slate-200"
                />
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl space-y-4 border border-transparent hover:border-brand-primary/10 transition-colors shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t('simulator.duration')}</span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white italic tracking-tighter">
                    {duration} <span className="text-brand-primary text-lg uppercase">{t('simulator.months')}</span>
                  </div>
                </div>
                <input 
                  type="range" min="6" max={120} step="1" value={duration} 
                  onChange={(e) => setDuration(Number(e.target.value))}
                  style={{ backgroundImage: `linear-gradient(to right, var(--brand-primary) ${durationPct}%, #e2e8f0 ${durationPct}%)` }}
                  className="w-full h-1 appearance-none rounded-full cursor-pointer bg-slate-200"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4 mt-10 hidden md:flex"
          >
            <StandardButton onClick={() => onProceedToApp?.(results)} className="flex-1 !py-5 shadow-brand group !rounded-2xl">
              <span className="text-base">{t('simulator.continue')}</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </StandardButton>
            <button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="p-5 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-brand-primary transition-all active:scale-95 shadow-sm"
            >
              {isExporting ? <Loader2 className="animate-spin" /> : <Download />}
            </button>
          </motion.div>
        </div>

        <motion.div 
          ref={recapRef} 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex w-[400px] bg-slate-50 dark:bg-slate-950 border-l border-slate-100 dark:border-slate-800 flex-col items-center justify-center p-8 space-y-8"
        >
          <div className="text-center space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{t('simulator.est_monthly')}</span>
            <div className="flex items-center justify-center">
              <span className="text-7xl font-black text-slate-900 dark:text-white italic tracking-tighter leading-none">
                <AnimatedNumber value={results.monthlyPayment} />
              </span>
              <span className="text-2xl font-black text-brand-primary ml-2 italic mt-4">{currentCurrency.symbol}</span>
            </div>
          </div>

          <div className="w-full h-32 relative flex items-center justify-center">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={chartData} cx="50%" cy="50%" 
                    innerRadius="60%" outerRadius="80%" paddingAngle={5} 
                    dataKey="value" stroke="none" animationDuration={800}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">TAEG</p>
                <p className="text-xl font-black text-brand-primary italic leading-none">{selectedOffer.minRate}%</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 w-full">
            <div className="text-center">
               <p className="text-[9px] font-black uppercase text-slate-400 mb-1">{t('simulator.interests')}</p>
               <p className="text-lg font-black text-slate-900 dark:text-white tracking-tight"><AnimatedNumber value={results.totalInterest} /> {currentCurrency.symbol}</p>
            </div>
            <div className="text-center">
               <p className="text-[9px] font-black uppercase text-slate-400 mb-1">Total</p>
               <p className="text-lg font-black text-brand-primary tracking-tight"><AnimatedNumber value={results.totalCost} /> {currentCurrency.symbol}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-emerald-500 font-black uppercase text-[10px] tracking-widest pt-2">
            <ShieldCheck size={18} />
            <span>Taux Garanti {selectedOffer.minRate}%</span>
          </div>
        </motion.div>

        {/* MOBILE RÉSUMÉ FIXE */}
        <motion.div 
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, type: "spring", damping: 20 }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-[200] h-[200px] bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shadow-[0_-15px_40px_rgba(0,0,0,0.1)] p-6 flex flex-col justify-between rounded-t-[3rem]"
        >
           <div className="flex items-end justify-between border-b border-slate-50 dark:border-slate-800 pb-3">
              <div className="space-y-0.5">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('simulator.est_monthly')}</p>
                 <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-black italic text-slate-900 dark:text-white leading-none">{results.monthlyPayment}</span>
                    <span className="text-lg font-black text-brand-primary italic leading-none">{currentCurrency.symbol}</span>
                 </div>
              </div>
              <div className="bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20 text-right">
                 <p className="text-[7px] font-black uppercase text-slate-400 tracking-widest mb-0.5">TAEG Fixe</p>
                 <p className="text-sm font-black text-emerald-600 italic leading-none">{selectedOffer.minRate}%</p>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4 py-2">
              <div className="space-y-0.5">
                 <p className="text-[7px] font-black uppercase text-slate-400 tracking-widest">{t('simulator.interests')}</p>
                 <p className="text-xs font-black italic text-slate-800 dark:text-slate-200">
                   {results.totalInterest.toLocaleString()} {currentCurrency.symbol}
                 </p>
              </div>
              <div className="space-y-0.5 text-right">
                 <p className="text-[7px] font-black uppercase text-slate-400 tracking-widest">{t('simulator.total_cost')}</p>
                 <p className="text-xs font-black italic text-brand-primary">
                   {results.totalCost.toLocaleString()} {currentCurrency.symbol}
                 </p>
              </div>
           </div>

           <div className="flex items-center space-x-3">
              <button 
                onClick={handleExportPDF}
                disabled={isExporting}
                className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 dark:border-slate-800 active:scale-95 transition-all shadow-sm"
              >
                 {isExporting ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
              </button>
              <button 
                 onClick={() => onProceedToApp?.(results)}
                 className="flex-1 bg-brand-primary text-white h-14 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center space-x-3 shadow-brand active:scale-95 transition-all"
              >
                 <span>{t('simulator.continue')}</span>
                 <ArrowRight size={18} />
              </button>
           </div>
        </motion.div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: #ffffff;
          border: 6px solid var(--brand-primary);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }
      `}} />
    </div>
  );
};

export default SimulatorPage;
