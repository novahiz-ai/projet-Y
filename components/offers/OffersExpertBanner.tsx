import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import StandardButton from '../StandardButton';

const OffersExpertBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="mt-32 p-12 lg:p-20 bg-slate-900 rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-3xl">
       <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 blur-[120px] rounded-full"></div>
       <div className="space-y-6 relative z-10 text-center lg:text-left max-w-2xl">
          <div className="inline-flex items-center space-x-3 text-brand-primary">
             <MessageSquare size={20} className="animate-bounce" />
             <span className="text-p-caption font-black uppercase tracking-[0.3em]">Accompagnement Dédié</span>
          </div>
          <h2 className="text-3xl md:text-h1 font-black uppercase tracking-tighter italic leading-[0.9]">{t('offers.expert_support')}</h2>
          <p className="text-slate-400 text-p-normal font-medium leading-relaxed">
            Nos analystes financiers vous répondent en direct pour optimiser votre plan de financement.
          </p>
       </div>
       <StandardButton variant="white" className="!text-slate-900 !px-12 !py-6 text-p-normal active:scale-95" onClick={() => window.location.href = "mailto:Younitedcreditfr@outlook.fr"}>
          {t('offers.contact_expert')}
       </StandardButton>
    </section>
  );
};

export default OffersExpertBanner;