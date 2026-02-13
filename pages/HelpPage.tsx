import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  HelpCircle, User, CreditCard, Car, Home, Building, Layers, 
  Lightbulb, ShieldCheck
} from 'lucide-react';
import ContactSection from '../components/ContactSection';
import LegalWarning from '../components/LegalWarning';
import { getFaqData } from '../data/help/faq';
import HelpHero from '../components/help/HelpHero';
import FaqSection from '../components/help/FaqSection';
import HelpContactGrid from '../components/help/HelpContactGrid';

const HelpPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('general');
  const [isLoading, setIsLoading] = useState(true);

  const FAQ_DATA = useMemo(() => getFaqData(t), [t, i18n.language]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
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

  const categories = useMemo(() => [
    { id: 'general', icon: <HelpCircle size={18} />, title: t('help.cat_general') },
    { id: 'conso', icon: <CreditCard size={18} />, title: "Conso" },
    { id: 'perso', icon: <User size={18} />, title: "Personnel" },
    { id: 'auto', icon: <Car size={18} />, title: "Auto/Moto" },
    { id: 'travaux', icon: <Home size={18} />, title: t('help.cat_works') },
    { id: 'immo', icon: <Building size={18} />, title: "Immo" },
    { id: 'rachat', icon: <Layers size={18} />, title: "Rachat" },
    { id: 'projet', icon: <Lightbulb size={18} />, title: "Projets" },
    { id: 'assurance', icon: <ShieldCheck size={18} />, title: "Assurance" },
  ], [t]);

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      <HelpHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-40">
        <HelpContactGrid t={t} />

        <section id="faq" className="space-y-12">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setIsLoading(true); setActiveTab(cat.id); setActiveFaq(null); }}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full text-[12px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 shrink-0 ${
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