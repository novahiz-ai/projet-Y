import React from 'react';
import { useTranslation } from 'react-i18next';
import { PhoneCall, Mail, Clock } from 'lucide-react';

interface ContactSectionProps {
  accentColor?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ accentColor = "text-indigo-600" }) => {
  const { t } = useTranslation();

  return (
    <section className="bg-slate-50 dark:bg-slate-900/40 p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center max-w-4xl mx-auto">
        <div className="space-y-3 p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-50 dark:border-slate-800 transition-transform hover:-translate-y-1">
          <div className={`w-12 h-12 bg-slate-50 dark:bg-slate-800 ${accentColor} rounded-2xl flex items-center justify-center mx-auto shadow-sm`}>
            <PhoneCall size={24} />
          </div>
          <a href="tel:+33644693243" className="text-lg font-black block text-slate-900 dark:text-white">+33 6 44 69 32 43</a>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Conseiller Dédié</p>
        </div>
        <div className="space-y-3 p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-50 dark:border-slate-800 transition-transform hover:-translate-y-1">
          <div className={`w-12 h-12 bg-slate-50 dark:bg-slate-800 ${accentColor} rounded-2xl flex items-center justify-center mx-auto shadow-sm`}>
            <Mail size={24} />
          </div>
          <a href="mailto:Younitedcreditfr@outlook.fr" className="text-lg font-black block text-slate-900 dark:text-white truncate px-2">Younitedcreditfr@outlook.fr</a>
          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t('contact_section.support_label')}</p>
        </div>
        <div className="md:col-span-2 space-y-3 pt-6">
          <div className="flex items-center justify-center space-x-3 text-emerald-500">
            <Clock size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t('contact_section.availability_title')} 24/7</span>
          </div>
          <p className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">{t('contact_section.availability_desc')}</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;