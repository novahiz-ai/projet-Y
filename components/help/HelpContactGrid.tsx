import React from 'react';
import { motion } from 'framer-motion';
import { Mail, PhoneCall, Clock, ArrowRight } from 'lucide-react';

interface HelpContactGridProps {
  t: any;
}

const HelpContactGrid: React.FC<HelpContactGridProps> = ({ t }) => {
  const contactMethods = [
    { icon: <Mail />, title: "Support Email", desc: "Réponse détaillée sous 24h ouvrées.", color: "emerald", link: "mailto:Younitedcreditfr@outlook.fr" },
    { icon: <PhoneCall />, title: t('help.call_expert'), desc: t('help.experts_contact_desc'), color: "brand", link: "tel:+33644693243" },
    { icon: <Clock />, title: t('contact_section.availability_title'), desc: "24h/7j - Assistance Digitale", color: "indigo", link: "#faq" }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {contactMethods.map((item, i) => (
        <motion.a 
          href={item.link} key={i}
          initial={{ opacity: 0, y: 15 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ delay: i * 0.05 }}
          className="group p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] flex flex-col items-center text-center space-y-6 hover:shadow-2xl hover:border-brand-primary/20 transition-all"
        >
          <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center transition-transform group-hover:scale-110 ${item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : item.color === 'brand' ? 'bg-brand-primary/10 text-brand-primary' : 'bg-indigo-50 text-indigo-600'}`}>
            {React.cloneElement(item.icon as React.ReactElement<any>, { size: 28 })}
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-950 dark:text-white italic leading-tight">{item.title}</h3>
            <p className="text-[14px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
          </div>
          <div className="text-[12px] font-black uppercase text-brand-primary tracking-widest flex items-center space-x-2">
            <span>Détails</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.a>
      ))}
    </section>
  );
};

export default HelpContactGrid;