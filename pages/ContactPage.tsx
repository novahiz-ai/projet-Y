import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Globe, 
  ChevronRight, 
  Linkedin, 
  Twitter, 
  Facebook,
  ShieldCheck,
  ArrowRight,
  Info,
  Zap,
  Building2,
  Headphones,
  MessageCircle
} from 'lucide-react';
import StandardButton from '../components/StandardButton';
import ModernSelect from '../components/ModernSelect';
import LegalWarning from '../components/LegalWarning';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'pret',
    message: ''
  });
  const [isSubmitting, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulation d'envoi
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      setFormState({ name: '', email: '', subject: 'pret', message: '' });
    }, 2000);
  };

  const subjectOptions = [
    { value: 'pret', label: 'Nouvelle demande de prêt' },
    { value: 'suivi', label: 'Suivi de mon dossier en cours' },
    { value: 'reclamation', label: 'Réclamation / Médiation' },
    { value: 'autre', label: 'Autre demande' }
  ];

  const contactMethods = [
    { 
      id: 'email',
      icon: <Mail className="text-brand-primary" />, 
      title: "Support Digital", 
      desc: "Idéal pour l'envoi de vos documents officiels.",
      action: "Younitedcreditfr@outlook.fr",
      link: "mailto:Younitedcreditfr@outlook.fr",
      color: "hover:border-brand-primary/30"
    },
    { 
      id: 'whatsapp',
      icon: <MessageCircle className="text-emerald-500" />, 
      title: "WhatsApp Support", 
      desc: "Conseillers disponibles pour un chat rapide.",
      action: "+33 6 44 69 32 43",
      link: "https://wa.me/33644693243",
      color: "hover:border-emerald-500/30"
    },
    { 
      id: 'phone',
      icon: <Phone className="text-indigo-500" />, 
      title: "Conseiller Expert", 
      desc: "Un accompagnement humain 24h/7j.",
      action: "+33 6 44 69 32 43",
      link: "tel:+33644693243",
      color: "hover:border-indigo-500/30"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=2000" 
            alt="Support Background" 
            className="w-full h-full object-cover opacity-10 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-10">
          <div className="inline-flex items-center space-x-3 bg-brand-primary/10 text-brand-primary px-5 py-2 rounded-2xl border border-brand-primary/20 backdrop-blur-md">
            <Headphones size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Relation Client Younited</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-950 dark:text-white leading-[0.85] italic">
            RESTEZ <br />
            <span className="text-brand-primary">CONNECTÉ.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            Nos experts sont à votre disposition 24h/7j pour concrétiser vos projets de vie avec transparence.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20 space-y-24">
        
        {/* 2. Contact Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {contactMethods.map((method) => (
             <a 
              key={method.id} 
              href={method.link}
              target={method.id === 'whatsapp' ? '_blank' : undefined}
              rel={method.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
              className={`p-10 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] text-left space-y-6 hover:shadow-2xl transition-all group hover:-translate-y-2 ${method.color}`}
             >
                <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {React.cloneElement(method.icon as React.ReactElement, { size: 28 })}
                </div>
                <div className="space-y-2">
                   <h3 className="text-xl font-black uppercase tracking-tight">{method.title}</h3>
                   <p className="text-sm text-slate-400 font-medium leading-relaxed">{method.desc}</p>
                </div>
                <div className="flex items-center space-x-2 text-slate-950 dark:text-white font-black uppercase text-[9px] tracking-widest pt-2">
                   <span className="truncate max-w-[200px]">{method.action}</span>
                   <ChevronRight size={14} className="text-brand-primary group-hover:translate-x-2 transition-transform shrink-0" />
                </div>
             </a>
           ))}
        </section>

        {/* 3. Main Form Section */}
        <section id="siege" className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
           <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-10 relative">
              {isSent && (
                <div className="absolute inset-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-[4rem] flex flex-col items-center justify-center text-center p-12">
                   <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-6 shadow-brand shadow-emerald-500/40">
                      <ShieldCheck size={40} />
                   </div>
                   <h3 className="text-2xl font-black uppercase tracking-tight italic">Message Envoyé.</h3>
                   <p className="text-slate-500 mt-4 max-w-xs mx-auto">Un expert vous recontactera dans les plus brefs délais.</p>
                   <button onClick={() => setIsSent(false)} className="mt-8 text-brand-primary font-black uppercase text-[10px] tracking-widest hover:underline">Envoyer un autre message</button>
                </div>
              )}

              <div className="space-y-4">
                 <h2 className="text-3xl font-black uppercase tracking-tighter italic text-slate-950 dark:text-white">Écrivez-nous.</h2>
                 <p className="text-slate-400 font-medium">Remplissez ce formulaire et un analyste reviendra vers vous.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Nom complet</label>
                       <input 
                        required
                        type="text" 
                        placeholder="Jean Dupont" 
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 font-medium outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-slate-900 dark:text-white"
                        value={formState.name}
                        onChange={e => setFormState({...formState, name: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Email professionnel</label>
                       <input 
                        required
                        type="email" 
                        placeholder="jean.dupont@email.com" 
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 font-medium outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-slate-900 dark:text-white"
                        value={formState.email}
                        onChange={e => setFormState({...formState, email: e.target.value})}
                       />
                    </div>
                 </div>
                 
                 <ModernSelect 
                    label="Objet de la demande"
                    options={subjectOptions}
                    value={formState.subject}
                    onChange={(val) => setFormState({...formState, subject: val})}
                 />

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Votre message</label>
                    <textarea 
                      required
                      placeholder="Comment pouvons-nous vous aider ?" 
                      rows={5}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-[2rem] py-4 px-6 font-medium outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none text-slate-900 dark:text-white"
                      value={formState.message}
                      onChange={e => setFormState({...formState, message: e.target.value})}
                    />
                 </div>
                 <StandardButton 
                   type="submit" 
                   disabled={isSubmitting}
                   className="w-full !py-6 !rounded-[2.5rem] shadow-brand"
                 >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                 </StandardButton>
              </form>
           </div>

           <div className="lg:col-span-5 space-y-8">
              <div className="p-10 bg-slate-950 rounded-[3.5rem] text-white space-y-10 relative overflow-hidden group shadow-3xl">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 blur-3xl rounded-full"></div>
                 <div className="space-y-4 relative z-10">
                    <h3 className="text-2xl font-black uppercase tracking-tight italic">Siège Social</h3>
                    <div className="flex items-start space-x-4">
                       <MapPin className="text-brand-primary shrink-0 mt-1" size={20} />
                       <p className="text-slate-400 font-medium leading-relaxed">
                          21 rue de Châteaudun <br />
                          75009 Paris, France
                       </p>
                    </div>
                 </div>
                 <div className="space-y-4 relative z-10">
                    <h3 className="text-2xl font-black uppercase tracking-tight italic">Horaires</h3>
                    <div className="flex items-start space-x-4">
                       <Clock className="text-brand-primary shrink-0 mt-1" size={20} />
                       <div className="text-slate-400 font-medium">
                          <p>Lundi — Dimanche : Disponible 24h / 7j</p>
                          <p className="text-[10px] text-indigo-300 mt-1">Assistance technique et commerciale permanente</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        <LegalWarning />
      </div>
    </div>
  );
};

export default ContactPage;