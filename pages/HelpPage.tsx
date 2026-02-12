
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  HelpCircle, 
  PhoneCall, 
  ChevronDown, 
  User, 
  CreditCard, 
  LifeBuoy, 
  Car, 
  Home, 
  Building, 
  Layers, 
  Lightbulb, 
  ShieldCheck,
  MessageSquare,
  Clock,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  Zap,
  FileSignature,
  Wallet,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  ChevronRightCircle,
  Mail
} from 'lucide-react';
import ContactSection from '../components/ContactSection';
import LegalWarning from '../components/LegalWarning';
import StandardButton from '../components/StandardButton';
import { FaqSkeleton } from '../components/Skeleton';
import { getFaqData } from '../data/help/faq';

const HelpPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('general');
  const [isLoading, setIsLoading] = useState(true);

  const FAQ_DATA = useMemo(() => getFaqData(t), [t, i18n.language]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const q = item.question.toLowerCase();
      const a = item.answer.toLowerCase();
      const s = searchQuery.toLowerCase();
      const matchesSearch = q.includes(s) || a.includes(s);
      const matchesTab = item.category === activeTab;
      
      if (searchQuery.length > 1) return matchesSearch;
      return matchesTab;
    });
  }, [searchQuery, activeTab, FAQ_DATA]);

  const categories = [
    { id: 'general', icon: <HelpCircle size={18} />, title: t('help.cat_general') },
    { id: 'conso', icon: <CreditCard size={18} />, title: t('offers_data.conso.title').split(' ')[0] },
    { id: 'perso', icon: <User size={18} />, title: t('offers_data.perso.title').split(' ')[1] },
    { id: 'auto', icon: <Car size={18} />, title: "Auto/Moto" },
    { id: 'travaux', icon: <Home size={18} />, title: t('help.cat_works') },
    { id: 'immo', icon: <Building size={18} />, title: "Immo" },
    { id: 'rachat', icon: <Layers size={18} />, title: "Rachat" },
    { id: 'projet', icon: <Lightbulb size={18} />, title: "Projets" },
    { id: 'assurance', icon: <ShieldCheck size={18} />, title: "Assurance" },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      
      {/* 1. HERO & SEARCH */}
      <section className="relative h-[50vh] lg:h-auto lg:min-h-0 pt-24 lg:pt-32 pb-10 lg:pb-20 bg-slate-50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-800 overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#6d28d944,transparent_70%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center space-y-6 lg:space-y-10 relative z-10 w-full">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-7xl font-black uppercase tracking-tighter italic text-slate-950 dark:text-white leading-[0.85]">
            {t('help.title')} <br />
            <span className="text-brand-primary">{t('help.highlight')}</span>
          </motion.h1>
          
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-indigo-500 rounded-full blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-full shadow-2xl overflow-hidden px-6 lg:px-8">
              <Search size={20} className="text-slate-300 lg:size-24" />
              <input 
                type="text" 
                placeholder={t('help.search_placeholder')}
                className="w-full bg-transparent border-none py-4 lg:py-6 pl-3 lg:pl-5 pr-4 text-base lg:text-xl font-medium outline-none text-slate-950 dark:text-white placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-40">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { icon: <Mail />, title: "Support Email", desc: "Réponse détaillée sous 24h ouvrées.", color: "emerald", link: "mailto:Younitedcreditfr@outlook.fr" },
             { icon: <PhoneCall />, title: t('help.call_expert'), desc: t('help.experts_contact_desc'), color: "brand", link: "tel:+33644693243" },
             { icon: <Clock />, title: t('contact_section.availability_title'), desc: "24h/7j - Assistance Digitale", color: "indigo", link: "#faq" }
           ].map((item, i) => (
             <motion.a 
               href={item.link} key={i}
               initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
               className="group p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] flex flex-col items-center text-center space-y-6 hover:shadow-2xl hover:border-brand-primary/20 transition-all"
             >
                <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center transition-transform group-hover:scale-110 ${item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : item.color === 'brand' ? 'bg-brand-primary/10 text-brand-primary' : 'bg-indigo-50 text-indigo-600'}`}>
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 28 })}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase tracking-tight">{item.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
                <div className="text-[10px] font-black uppercase text-brand-primary tracking-widest flex items-center space-x-2">
                  <span>{t('labels.see_details')}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
             </motion.a>
           ))}
        </section>

        <section id="faq" className="space-y-12">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setIsLoading(true);
                  setActiveTab(cat.id);
                  setActiveFaq(null);
                }}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 shrink-0 ${
                  activeTab === cat.id && searchQuery.length <= 1
                  ? 'bg-brand-primary border-brand-primary text-white shadow-xl shadow-brand-primary/20 scale-105' 
                  : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500'
                }`}
              >
                {cat.icon}
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

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
                          onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                          className="w-full flex items-center justify-between p-8 md:p-10 text-left"
                        >
                          <span className="font-black text-lg md:text-2xl text-slate-900 dark:text-white uppercase tracking-tight pr-6">{faq.question}</span>
                          <div className={`w-10 h-10 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 transition-all ${activeFaq === faq.id ? 'bg-brand-primary border-brand-primary text-white rotate-180 shadow-lg' : 'text-slate-400 group-hover:text-brand-primary'}`}>
                             <ChevronDown size={20} />
                          </div>
                        </button>
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === faq.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="p-8 md:p-10 pt-0 space-y-8">
                            <div className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-base md:text-xl border-l-4 border-brand-primary pl-8 py-2">
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-4 space-y-8">
               <div className="p-10 bg-slate-950 rounded-[3.5rem] text-white space-y-8 shadow-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                  <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl font-black uppercase italic leading-none">{t('help.immediate_support')}</h3>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
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
        </section>

        <ContactSection accentColor="text-brand-primary" />
        <LegalWarning />
      </div>
    </div>
  );
};

export default HelpPage;
