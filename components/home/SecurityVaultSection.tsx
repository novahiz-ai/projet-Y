import React from 'react';
import { ShieldCheck, Lock, Eye, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FadeIn from '../ui/FadeIn';
import SecurityVaultAnimation from './SecurityVaultAnimation';

const SecurityVaultSection: React.FC = () => {
  const { t } = useTranslation();

  const securityFeatures = [
    { icon: <Lock size={24} />, title: "Cryptage AES-256", desc: "Vos données sont chiffrées selon les standards militaires les plus stricts." },
    { icon: <ShieldCheck size={24} />, title: "Agrément ACPR", desc: "Établissement de crédit agréé et régulé par les autorités bancaires." },
    { icon: <Database size={24} />, title: "Hébergement EU", desc: "Données stockées exclusivement en Union Européenne (RGPD)." },
    { icon: <Eye size={24} />, title: "Transparence", desc: "Zéro frais cachés, taux fixe et conditions claires dès la signature." }
  ];

  return (
    <section className="relative py-24 lg:py-40 bg-slate-950 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#4f46e522,transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="space-y-10">
            <FadeIn direction="right">
              <div className="inline-flex items-center space-x-3 bg-white/5 text-brand-primary px-4 py-1.5 rounded-full border border-white/10">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Forteresse Digitale</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-[0.95] text-white mt-6">
                VOTRE SÉCURITÉ, <br />
                <span className="text-brand-primary">NOTRE PRIORITÉ.</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl mt-8">
                Younited déploie les technologies de pointe pour garantir l'intégrité de vos informations et la conformité totale de vos opérations.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {securityFeatures.map((feat, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-brand-primary/30 transition-all group">
                    <div className="w-12 h-12 bg-brand-primary/20 text-brand-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {feat.icon}
                    </div>
                    <h4 className="text-white font-black uppercase text-xs tracking-tight mb-2">{feat.title}</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed font-medium">{feat.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn direction="left" className="relative">
            <div className="max-w-lg mx-auto lg:mr-0">
               <SecurityVaultAnimation />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default SecurityVaultSection;