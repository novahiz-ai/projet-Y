
import React from 'react';
import { ShieldCheck, Lock, Globe, CheckCircle2 } from 'lucide-react';

const TrustBadgeBanner: React.FC = () => {
  const badges = [
    { icon: <ShieldCheck className="text-emerald-500" />, label: "Agréé ACPR", desc: "Licence Bancaire Européenne" },
    { icon: <Lock className="text-brand-primary" />, label: "Sécurité eIDAS", desc: "Signature 100% certifiée" },
    { icon: <Globe className="text-indigo-500" />, label: "RGPD Compliant", desc: "Protection totale des données" },
    { icon: <CheckCircle2 className="text-amber-500" />, label: "Crédit Responsable", desc: "Transparence des taux" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {badges.map((badge, i) => (
          <div key={i} className="p-6 bg-slate-50/50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center space-y-3 hover:border-brand-primary/20 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
              {badge.icon}
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-tight text-slate-900 dark:text-white leading-none">{badge.label}</p>
              <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">{badge.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadgeBanner;
