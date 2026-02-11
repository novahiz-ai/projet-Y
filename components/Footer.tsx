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
  Linkedin
} from 'lucide-react';
import { LOAN_OFFERS } from '../constants';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden lg:block bg-slate-50 dark:bg-slate-900 pt-20 pb-10 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
              LOGO
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
              {t('footer.desc')}
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700">
                  <PhoneCall size={16} />
                </div>
                <span className="text-sm font-bold">+33 6 44 69 32 43</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700">
                  <Mail size={16} />
                </div>
                <span className="text-sm font-bold">Younitedcreditfr@outlook.fr</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700 text-emerald-500">
                  <Clock size={16} />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-[10px]">{t('labels.support_247')}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t('footer.offers_title')}</h4>
            <ul className="space-y-4">
              {LOAN_OFFERS.slice(0, 5).map((offer) => (
                <li key={offer.id}>
                  <Link to={`/offres/${offer.id}`} className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors flex items-center space-x-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-brand-primary transition-colors"></div>
                    <span>{t(offer.title)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t('footer.resources_title')}</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/simulateur" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">{t('nav.simulator')}</Link>
              </li>
              <li>
                <Link to="/guide" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">{t('nav.guide')}</Link>
              </li>
              <li>
                <Link to="/glossaire" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">{t('footer.glossary_fin')}</Link>
              </li>
              <li>
                <Link to="/aide" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">{t('nav.help')}</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t('footer.social_title')}</h4>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-brand-primary hover:border-brand-primary transition-all shadow-sm">
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <div className="pt-4">
                <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest leading-relaxed">
                   LOGO est un établissement de crédit opérant dans toute l'Union Européenne.
                </p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {t('footer.rights', { year: currentYear })}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/mentions-legales" className="text-[10px] font-black text-slate-400 hover:text-slate-900 dark:hover:text-white uppercase tracking-widest transition-colors">{t('footer.legal')}</Link>
              <Link to="/confidentialite" className="text-[10px] font-black text-slate-400 hover:text-slate-900 dark:hover:text-white uppercase tracking-widest transition-colors">{t('footer.privacy')}</Link>
              <Link to="/cookies" className="text-[10px] font-black text-slate-400 hover:text-slate-900 dark:hover:text-white uppercase tracking-widest transition-colors">{t('footer.cookies')}</Link>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-slate-100 dark:bg-slate-800/50 rounded-2xl text-center border border-slate-200/50 dark:border-slate-700/50">
            <p className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase tracking-[0.1em] leading-relaxed max-w-4xl mx-auto">
              {t('consent.warning')} 
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;