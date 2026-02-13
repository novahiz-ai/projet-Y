import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Info, 
  ChevronRight,
  Target,
  Smartphone,
  Lock,
  CheckCircle2,
  Heart,
  Plane,
  GraduationCap,
  Hammer,
  Users,
  Clock,
  Briefcase
} from 'lucide-react';
import StandardButton from '../components/StandardButton';
import OfferSummaryTable from '../components/OfferSummaryTable';
import ContactSection from '../components/ContactSection';
import LegalWarning from '../components/LegalWarning';
import FadeIn from '../components/ui/FadeIn';

const ProjectLoanPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('definition');

  const navItems = [
    { id: 'definition', title: t('project_loan.nav.definition') },
    { id: 'projets', title: t('project_loan.nav.projets') },
    { id: 'avantages', title: t('project_loan.nav.avantages') },
    { id: 'processus', title: t('project_loan.nav.processus') },
    { id: 'eligibilite', title: t('project_loan.nav.eligibilite') },
    { id: 'resume', title: t('project_loan.nav.resume') }
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140;
      window.scrollTo({ top: element.offsetTop - offset, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const getArray = (key: string) => {
    const res = t(key, { returnObjects: true });
    return Array.isArray(res) ? res : [];
  };

  const projectsItems = getArray('project_loan.content.projects_items');
  const whyItems = getArray('project_loan.content.why_items');
  const processItems = getArray('project_loan.content.process_items');
  const eligibilityItems = getArray('project_loan.content.eligibility_items');
  const summaryRows = getArray('project_loan.content.summary_rows');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative bg-white dark:bg-slate-950 transition-colors duration-500">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[75vh] lg:h-auto lg:min-h-[85vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000" 
            alt="Project Dream" 
            className="w-full h-full object-cover opacity-20 dark:opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-transparent dark:from-slate-950 dark:via-slate-950/90 dark:to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 pt-16 lg:pt-20 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 lg:space-y-8"
            >
              <h1 className="text-4xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase italic text-slate-950 dark:text-white">
                {t('project_loan.hero.title')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-500">{t('project_loan.hero.highlight')}</span>
              </h1>

              <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {t('project_loan.hero.desc')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
                <StandardButton 
                  onClick={() => window.dispatchEvent(new CustomEvent('openSimulator', { detail: { offerId: 'projet' } }))}
                  className="mx-auto lg:mx-0 !bg-cyan-600 hover:!bg-cyan-700 shadow-xl shadow-cyan-600/20 !py-6 !px-10"
                >
                  <span className="text-base lg:text-lg">Démarrer ma simulation</span>
                  <ArrowRight size={18} />
                </StandardButton>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative bg-white dark:bg-slate-900/60 backdrop-blur-3xl border border-slate-200 dark:border-white/10 p-12 rounded-[4rem] shadow-3xl space-y-10 transform rotate-2 hover:rotate-0 transition-all duration-700">
                <div className="flex justify-between items-start">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Budget Projet</h3>
                  <div className="w-16 h-16 bg-cyan-600 text-white rounded-3xl flex items-center justify-center shadow-2xl">
                    <Zap size={32} />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-slate-100 dark:border-white/5 pb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Capacité Max</span>
                    <span className="text-3xl font-black text-slate-950 dark:text-white italic">60 000 €</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-slate-400">
                  <ShieldCheck size={20} className="text-cyan-500" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Étude Immédiate</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CONTENT BODY --- */}
      <div className="relative z-10 py-24 bg-white dark:bg-slate-950 rounded-t-[4rem] -mt-10 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 lg:flex lg:gap-24">
          
          {/* Sidebar Nav */}
          <aside className="hidden lg:block lg:w-1/4">
            <div className="sticky top-32 space-y-3 bg-slate-50 dark:bg-slate-900/40 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-6">Expertise Projet</p>
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => scrollTo(item.id)} 
                  className={`flex items-center space-x-4 w-full text-left p-4 rounded-2xl font-bold transition-all group ${activeSection === item.id ? 'bg-white dark:bg-slate-800 text-cyan-600 shadow-md ring-1 ring-cyan-500/10' : 'text-slate-600 dark:text-slate-400 hover:text-cyan-600'}`}
                >
                  <ChevronRight size={14} className={`${activeSection === item.id ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity`} />
                  <span className="text-[11px] uppercase tracking-tight">{item.title}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-32">
            
            {/* Section: Définition */}
            <motion.section 
              id="definition" 
              initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={itemVariants}
              className="space-y-10 scroll-mt-32"
            >
              <div className="flex items-center space-x-5">
                <div className="w-14 h-14 bg-cyan-600/10 text-cyan-600 rounded-2xl flex items-center justify-center shadow-inner-soft">
                  <Info size={32} />
                </div>
                <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">{t('project_loan.content.def_title')}</h2>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-lg space-y-8 font-medium">
                <p>{t('project_loan.content.def_p1')}</p>
                <div className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border-l-8 border-cyan-600 shadow-xl dark:shadow-none italic text-xl text-slate-900 dark:text-white leading-relaxed">
                  "{t('project_loan.content.def_box')}"
                </div>
              </div>
            </motion.section>

            {/* Section: Projets */}
            <motion.section 
              id="projets" 
              initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={containerVariants}
              className="space-y-16 scroll-mt-32"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-black uppercase tracking-tight">{t('project_loan.content.projects_title')}</h2>
                <p className="text-slate-500 font-medium text-lg">{t('project_loan.content.projects_subtitle')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projectsItems.map((item: any, i: number) => (
                  <motion.div 
                    key={i} variants={itemVariants}
                    className="group relative p-10 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3.5rem] hover:border-cyan-500/40 transition-all duration-500 hover:shadow-2xl flex flex-col justify-between min-h-[240px]"
                  >
                    <div className="space-y-6">
                      <div className="w-16 h-16 bg-white dark:bg-slate-800 text-cyan-600 rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-all">
                        {i === 0 ? <Users size={32}/> : i === 1 ? <Plane size={32}/> : i === 2 ? <GraduationCap size={32}/> : <Hammer size={32}/>}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black uppercase tracking-tight text-slate-950 dark:text-white">{item.t}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Section: Avantages */}
            <motion.section 
              id="avantages" 
              initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={itemVariants}
              className="space-y-12 scroll-mt-32"
            >
              <h2 className="text-3xl font-black uppercase tracking-tight">{t('project_loan.content.why_title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {whyItems.map((adv: any, i: number) => (
                  <div key={i} className="text-center space-y-6 p-8 bg-slate-50/50 dark:bg-slate-900/30 rounded-[3rem] border border-transparent hover:border-cyan-500/20 transition-all">
                    <div className="w-20 h-20 bg-white dark:bg-slate-800 text-cyan-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl">
                       {i === 0 ? <Zap size={40} /> : i === 1 ? <Smartphone size={40} /> : <Lock size={40} />}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-black uppercase tracking-tight">{adv.t}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">{adv.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Section: Parcours */}
            <motion.section 
              id="processus" 
              initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={itemVariants}
              className="scroll-mt-32"
            >
              <div className="bg-slate-950 py-24 px-10 md:px-20 rounded-[4.5rem] text-white overflow-hidden relative shadow-3xl">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#0891b222,transparent_60%)]"></div>
                <div className="relative z-10 text-center space-y-20">
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight italic">{t('project_loan.content.process_title')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                    {processItems.map((step: any, i: number) => (
                      <div key={i} className="space-y-8 relative group">
                        <div className="w-20 h-20 bg-white/5 hover:bg-cyan-600 hover:text-white border border-white/10 rounded-3xl flex items-center justify-center mx-auto transition-all duration-500 backdrop-blur-md">
                          <span className="font-black text-3xl italic">{step.s}</span>
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-xl font-black uppercase tracking-tight text-white">{step.t}</h3>
                          <p className="text-slate-400 text-sm font-medium leading-relaxed">{step.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section: Éligibilité */}
            <motion.section 
              id="eligibilite" 
              initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }} variants={itemVariants}
              className="space-y-16 scroll-mt-32"
            >
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none italic text-center lg:text-left">
                  {t('project_loan.content.eligibility_title')} 
                  <span className="text-cyan-600">{t('project_loan.content.eligibility_highlight')}</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {eligibilityItems.map((crit: any, i: number) => (
                  <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] flex items-start space-x-6 group hover:border-cyan-500/30 transition-all">
                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm text-brand-primary">
                      <CheckCircle2 size={24} className="text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="font-black text-lg uppercase text-slate-900 dark:text-white mb-2">{crit.t}</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{crit.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Section: Résumé */}
            <motion.section 
              id="resume" 
              initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.4 }} variants={itemVariants}
              className="scroll-mt-32"
            >
              <OfferSummaryTable 
                rows={summaryRows.map((r: any) => ({ label: r.t, value: r.v, isHighlight: r.h }))}
              />
            </motion.section>

            <ContactSection accentColor="text-cyan-600" />
            <LegalWarning />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLoanPage;