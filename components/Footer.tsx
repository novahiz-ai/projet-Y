
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  PhoneCall, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Lock
} from 'lucide-react';
import { LOAN_OFFERS } from '../constants';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden lg:block bg-white dark:bg-slate-950 pt-24 pb-10 border-t border-slate-100 dark:border-slate-800 transition-colors duration-500 relative overflow-hidden">
      {/* Background elements for richness */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
         <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Trustmarks Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-16 border-b border-slate-100 dark:border-slate-800 mb-16">
           {[
             { icon: <ShieldCheck size={20} />, label: t('footer.trust_label') },
             { icon: <CheckCircle2 size={20} />, label: "eIDAS Compliance" },
             { icon: <Globe size={20} />, label: "EU-Wide Operations" },
             { icon: <Lock size={20} />, label: "AES-256 Secured" }
           ].map((item, i) => (
             <div key={i} className="flex items-center space-x-3 text-slate-400 group">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center group-hover:text-brand-primary transition-colors">
                  {item.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em]">{item.label}</span>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          <div className="space-y-8">
            <Link to="/" className="text-3xl font-black text-slate-950 dark:text-white tracking-tighter uppercase italic select-none">
              LOGO
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium max-w-xs">
              {t('footer.desc')}
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300 group">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-sm group-hover:border-brand-primary transition-all">
                  <PhoneCall size={18} />
                </div>
                <span className="text-sm font-black">+33 6 44 69 32 43</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300 group">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-sm group-hover:border-brand-primary transition-all">
                  <Mail size={18} />
                </div>
                <span className="text-sm font-black truncate">Younitedcreditfr@outlook.fr</span>
              </div>
              <div className="flex items-center space-x-3 text-emerald-500">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                  <Clock size={18} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">{t('labels.support_247')}</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">{t('footer.offers_title')}</h4>
            <ul className="space-y-5">
              {LOAN_OFFERS.slice(0, 5).map((offer) => (
                <li key={offer.id}>
                  <Link to={`/offres/${offer.id}`} className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-colors flex items-center space-x-3 group">
                    <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800 group-hover:w-3 group-hover:bg-brand-primary transition-all"></div>
                    <span>{t(offer.title)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">{t('footer.resources_title')}</h4>
            <ul className="space-y-5">
              <li>
                <Link to="/simulateur" className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-all">{t('nav.simulator')}</Link>
              </li>
              <li>
                <Link to="/guide" className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-all">{t('nav.guide')}</Link>
              </li>
              <li>
                <Link to="/glossaire" className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-all">{t('footer.glossary_fin')}</Link>
              </li>
              <li>
                <Link to="/aide" className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-brand-primary transition-all">{t('nav.help')}</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-10">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">{t('footer.social_title')}</h4>
              <div className="flex space-x-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-11 h-11 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:shadow-brand transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest leading-relaxed italic">
                   {t('footer.eu_notice')}
                </p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
              {t('footer.rights', { year: currentYear })}
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <Link to="/mentions-legales" className="text-[10px] font-black text-slate-400 hover:text-brand-primary uppercase tracking-widest transition-colors">{t('footer.legal')}</Link>
              <Link to="/confidentialite" className="text-[10px] font-black text-slate-400 hover:text-brand-primary uppercase tracking-widest transition-colors">{t('footer.privacy')}</Link>
              <Link to="/cookies" className="text-[10px] font-black text-slate-400 hover:text-brand-primary uppercase tracking-widest transition-colors">{t('footer.cookies')}</Link>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] text-center border border-slate-100 dark:border-slate-800">
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.15em] leading-relaxed max-w-4xl mx-auto italic">
              {t('consent.warning')} 
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
