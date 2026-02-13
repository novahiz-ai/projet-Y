
import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Send, 
  Building2,
  Headphones,
  CheckCircle2,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import StandardButton from '../components/StandardButton';
import ModernSelect from '../components/ModernSelect';
import LegalWarning from '../components/LegalWarning';
import { FormLabel, FormInput } from '../components/ui/FormControls';
import PageHeader from '../components/ui/PageHeader';
import FadeIn from '../components/ui/FadeIn';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'pret',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactMethods = [
    { icon: <Phone size={24} />, title: "Téléphone", value: "+33 6 44 69 32 43", label: "Analyste Dédié", color: "text-emerald-500" },
    { icon: <Mail size={24} />, title: "Email", value: "Younitedcreditfr@outlook.fr", label: "Réponse sous 24h", color: "text-brand-primary" },
    { icon: <Building2 size={24} />, title: "Siège Social", value: "21 rue de Châteaudun, Paris", label: "Younited SA", color: "text-indigo-500" }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen pb-24">
      <PageHeader 
        title="RESTEZ EN "
        highlight="CONTACT."
        description="Nos experts financiers sont à votre écoute pour concrétiser vos ambitions."
        Icon={Headphones}
        label="Service Client 24/7"
        image="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=2000"
        breadcrumb={[{ label: "Aide & Contact" }]}
      />

      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-12">
            <FadeIn direction="right" className="space-y-8">
              <h2 className="text-4xl font-black uppercase tracking-tight italic">Comment pouvons-nous <span className="text-brand-primary">vous aider ?</span></h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Qu'il s'agisse d'une question sur une demande en cours ou d'un besoin de conseil, nous sommes là.
              </p>
            </FadeIn>

            <div className="space-y-4">
              {contactMethods.map((method, i) => (
                <FadeIn key={i} delay={i * 0.1} direction="right">
                  <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center space-x-6 hover:shadow-xl transition-all group">
                    <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm shrink-0 ${method.color} group-hover:scale-110 transition-transform`}>
                      {method.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{method.title}</p>
                      <p className="text-lg font-black text-slate-950 dark:text-white truncate">{method.value}</p>
                      <p className="text-[10px] font-bold uppercase text-brand-primary mt-1">{method.label}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <FadeIn className="relative">
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-[3.5rem] shadow-3xl">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <FormLabel>Votre Nom</FormLabel>
                          <FormInput required placeholder="Jean Dupont" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
                        </div>
                        <div className="space-y-1">
                          <FormLabel>Email</FormLabel>
                          <FormInput required type="email" placeholder="jean@exemple.com" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <FormLabel>Sujet de la demande</FormLabel>
                        <ModernSelect 
                          options={[
                            { value: 'pret', label: 'Demande de prêt' },
                            { value: 'rachat', label: 'Rachat de crédits' },
                            { value: 'suivi', label: 'Suivi de dossier' },
                            { value: 'autre', label: 'Autre question' }
                          ]}
                          value={formState.subject}
                          onChange={val => setFormState({...formState, subject: val})}
                        />
                      </div>
                      <div className="space-y-1">
                        <FormLabel>Message</FormLabel>
                        <textarea required rows={5} className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-brand-primary/40 focus:ring-4 focus:ring-brand-primary/5 rounded-2xl p-6 outline-none font-bold text-slate-900 dark:text-white transition-all shadow-inner-soft" placeholder="Comment pouvons-nous vous aider ?" value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} />
                      </div>
                      <StandardButton type="submit" className="w-full !py-6 shadow-brand">Envoyer ma demande</StandardButton>
                    </motion.form>
                  ) : (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-20 text-center space-y-8">
                      <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl">
                        <CheckCircle2 size={48} />
                      </div>
                      <h3 className="text-3xl font-black uppercase text-slate-950 dark:text-white">Message envoyé !</h3>
                      <button onClick={() => setIsSubmitted(false)} className="text-brand-primary font-black uppercase text-[10px] tracking-widest hover:underline">Envoyer un autre message</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          </div>
        </div>
        <div className="mt-40"><LegalWarning /></div>
      </div>
    </div>
  );
};

export default ContactPage;
