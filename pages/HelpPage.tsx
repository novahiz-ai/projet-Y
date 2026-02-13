import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  HelpCircle, User, CreditCard, Car, Home, Building, Layers, 
  Lightbulb, ShieldCheck, ArrowRight, Zap, Smartphone, FileCheck, Wallet
} from 'lucide-react';
import ContactSection from '../components/ContactSection';
import LegalWarning from '../components/LegalWarning';
import { getFaqData } from '../data/help/faq';
import HelpHero from '../components/help/HelpHero';
import FaqSection from '../components/help/FaqSection';
import HelpContactGrid from '../components/help/HelpContactGrid';
import FadeIn from '../components/ui/FadeIn';

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

        {/* Section: How it Works / Process Guide */}
        <section className="space-y-16">
          <div className="text-center space-y-6">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
                GUIDE DU <span className="text-brand-primary">PARCOURS.</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto font-medium">
                Du premier clic jusqu'au versement des fonds, découvrez la simplicité du modèle Younited.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Smartphone className="text-brand-primary" />, 
                step: "01", 
                title: "Demande en ligne", 
                desc: "Remplissez notre formulaire express en moins de 3 minutes depuis votre mobile." 
              },
              { 
                icon: <Zap className="text-amber-500" />, 
                step: "02", 
                title: "Accord immédiat", 
                desc: "Grâce à notre algorithme, recevez une réponse de principe instantanée." 
              },
              { 
                icon: <FileCheck className="text-emerald-500" />, 
                step: "03", 
                title: "Signature eIDAS", 
                desc: "Signez votre contrat électroniquement et déposez vos pièces justificatives." 
              },
              { 
                icon: <Wallet className="text-indigo-500" />, 
                step: "04", 
                title: "Transfert 48h", 
                desc: "Les fonds sont versés directement sur votre compte bancaire habituel." 
              }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 relative group hover:border-brand-primary/20 transition-all">
                  <span className="absolute top-8 right-10 text-5xl font-black italic text-slate-200 dark:text-slate-800 group-hover:text-brand-primary/10 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm mb-10 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-black uppercase text-slate-950 dark:text-white mb-4 italic tracking-tight">{item.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section id="faq" className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic">Foire aux <span className="text-brand-primary">questions.</span></h2>
            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide -mx-6 px-6 pb-2 md:pb-0 md:mx-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setIsLoading(true); setActiveTab(cat.id); setActiveFaq(null); }}
                  className={`flex items-center space-x-3 px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 shrink-0 ${
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