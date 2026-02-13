import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  HelpCircle, PhoneCall, User, CreditCard, Car, Home, Building, Layers, 
  Lightbulb, ShieldCheck, Clock, Mail, ArrowRight
} from 'lucide-react';
import ContactSection from '../components/ContactSection';
import LegalWarning from '../components/LegalWarning';
import { getFaqData } from '../data/help/faq';
import HelpHero from '../components/help/HelpHero';
import FaqSection from '../components/help/FaqSection';

const HelpPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('general');
  const [isLoading, setIsLoading] = useState(true);

  const FAQ_DATA = useMemo(() => getFaqData(t), [t, i18n.language]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const q = item.question.toLowerCase();
      const a = item.answer.toLowerCase();
      const s = searchQuery.toLowerCase();
      const matchesSearch = q.includes(s) || a.includes(s);
      return searchQuery.length > 1 ? matchesSearch : item.category === activeTab;
    });
  }, [searchQuery, activeTab, FAQ_DATA]);

  const categories = [
    { id: 'general', icon: <HelpCircle size={18} />, title: t('help.cat_general') },
    { id: 'conso', icon: <CreditCard size={18} />, title: "Conso" },
    { id: 'perso', icon: <User size={18} />, title: "Personnel" },
    { id: 'auto', icon: <Car size={18} />, title: "Auto/Moto" },
    { id: 'travaux', icon: <Home size={18} />, title: t('help.cat_works') },
    { id: 'immo', icon: <Building size={18} />, title: "Immo" },
    { id: 'rachat', icon: <Layers size={18} />, title: "Rachat" },
    { id: 'projet', icon: <Lightbulb size={18} />, title: "Projets" },
    { id: 'assurance', icon: <ShieldCheck size={18} />, title: "Assurance" },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      <HelpHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
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
                  <h3 className="text-xl font-black uppercase tracking-tight text-slate-950 dark:text-white italic leading-tight">{item.title}</h3>
                  <p className="text-p-small text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
                <div className="text-p-caption font-black uppercase text-brand-primary tracking-widest flex items-center space-x-2">
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
                onClick={() => { setIsLoading(true); setActiveTab(cat.id); setActiveFaq(null); }}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full text-p-caption font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 shrink-0 ${
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

          <FaqSection 
            isLoading={isLoading} 
            filteredFaqs={filteredFaqs} 
            activeFaq={activeFaq} 
            onFaqToggle={(id) => setActiveFaq(activeFaq === id ? null : id)}
            onReset={() => { setSearchQuery(''); setActiveTab('general'); }}
          />
        </section>

        <ContactSection accentColor="text-brand-primary" />
        <LegalWarning />
      </div>
    </div>
  );
};

export default HelpPage;