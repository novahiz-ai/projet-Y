import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertCircle, PhoneCall } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { FaqSkeleton } from '../Skeleton';
import { FAQItem } from '../../data/help/faq';

interface FaqSectionProps {
  isLoading: boolean;
  filteredFaqs: FAQItem[];
  activeFaq: number | null;
  onFaqToggle: (id: number) => void;
  onReset: () => void;
}

const FaqSection: React.FC<FaqSectionProps> = ({ 
  isLoading, filteredFaqs, activeFaq, onFaqToggle, onReset 
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
      <div className="lg:col-span-8 space-y-6">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FaqSkeleton />
            </motion.div>
          ) : filteredFaqs.length > 0 ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="group border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden transition-all duration-300 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/5 bg-white dark:bg-slate-900/50">
                  <button 
                    onClick={() => onFaqToggle(faq.id)}
                    className="w-full flex items-center justify-between p-8 md:p-10 text-left"
                  >
                    <span className="font-black text-lg md:text-h2 text-slate-900 dark:text-white uppercase tracking-tight pr-6 italic">{faq.question}</span>
                    <div className={`w-10 h-10 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 transition-all ${activeFaq === faq.id ? 'bg-brand-primary border-brand-primary text-white rotate-180 shadow-lg' : 'text-slate-400 group-hover:text-brand-primary'}`}>
                       <ChevronDown size={20} />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === faq.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-8 md:p-10 pt-0 space-y-8">
                      <div className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-base md:text-p-normal border-l-4 border-brand-primary pl-8 py-2">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-slate-50 dark:bg-slate-900/40 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800" >
               <AlertCircle size={48} className="mx-auto text-slate-300 mb-6" />
               <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-xs">{t('help.no_results')}</p>
               <button onClick={onReset} className="mt-6 text-brand-primary font-black uppercase text-[10px] tracking-widest hover:underline">Réinitialiser</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="lg:col-span-4 space-y-8">
         <div className="p-10 bg-slate-950 rounded-[3.5rem] text-white space-y-8 shadow-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl md:text-h3 font-black uppercase italic leading-none">{t('help.immediate_support')}</h3>
              <p className="text-slate-400 text-p-small font-medium leading-relaxed">
                {t('help.experts_contact_desc')}
              </p>
              <div className="space-y-4">
                <a href="tel:+33644693243" className="flex items-center justify-center space-x-3 w-full py-5 bg-brand-primary rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-brand-primary/20">
                  <PhoneCall size={18} />
                  <span>{t('help.call_expert')}</span>
                </a>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default FaqSection;