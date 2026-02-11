
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Zap, ChevronRight, BookOpen, Target } from 'lucide-react';
import { Article } from '../types';
import StandardButton from './StandardButton';

interface ArticleSidebarProps {
  article: Article;
  relatedArticles: Article[];
  onSummaryClick: (id: string) => void;
  activeId?: string;
  onBrowseGuide: () => void;
}

const ArticleSidebar: React.FC<ArticleSidebarProps> = ({ 
  article, 
  relatedArticles, 
  onSummaryClick, 
  activeId,
  onBrowseGuide
}) => {
  return (
    <div className="sticky top-32 space-y-10">
      
      {/* Sommaire Premium */}
      <div className="bg-slate-50 dark:bg-slate-900/40 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3 mb-8">
           <BookOpen size={16} className="text-brand-primary" />
           <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Dans cet article</p>
        </div>
        <nav className="flex flex-col space-y-2">
          {article.sections.map((section, i) => (
            <button 
              key={section.id} 
              onClick={() => onSummaryClick(section.id)}
              className={`flex items-center space-x-4 text-left p-4 rounded-2xl transition-all group ${
                activeId === section.id 
                ? 'bg-white dark:bg-slate-800 shadow-md ring-1 ring-brand-primary/20' 
                : 'hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black transition-all shrink-0 ${
                activeId === section.id 
                ? 'bg-brand-primary text-white shadow-brand' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              }`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`text-xs font-black uppercase tracking-tight transition-colors leading-tight ${
                activeId === section.id ? 'text-brand-primary' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900'
              }`}>
                {section.title}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Alerte Marché (Largeur optimisée) */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="p-10 bg-brand-primary rounded-[3rem] text-white space-y-6 shadow-2xl shadow-brand-primary/30 relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
          <Target size={24} className="text-white animate-pulse" />
        </div>
        <div className="space-y-2">
          <h4 className="font-black uppercase text-lg tracking-tight leading-none italic">Alerte Opportunité.</h4>
          <p className="text-xs text-indigo-100 font-medium leading-relaxed">
            Les taux pour le crédit <span className="text-white font-bold">{article.categoryLabel}</span> sont historiquement bas ce mois-ci.
          </p>
        </div>
        <Link to="/simulateur" className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest pt-2 group-hover:translate-x-2 transition-transform">
          <span>Calculer mon économie</span>
          <ChevronRight size={14} />
        </Link>
      </motion.div>

      {/* Articles Similaires (Design Liste Verticale) */}
      <div className="space-y-6">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-2">Lectures recommandées</p>
        <div className="space-y-4">
          {relatedArticles.map(art => (
            <Link key={art.id} to={`/guide/${art.id}`} className="flex items-center space-x-4 p-3 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group border border-transparent hover:border-slate-100">
              <div className="w-20 h-16 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-[11px] font-black uppercase tracking-tight text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-brand-primary transition-colors">
                  {art.title}
                </h5>
                <div className="flex items-center space-x-2 mt-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <Clock size={10} />
                  <span>{art.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <StandardButton variant="outline" className="w-full !py-4 !text-[9px] !rounded-2xl" onClick={onBrowseGuide}>
          <span>Explorer tout le guide</span>
        </StandardButton>
      </div>
    </div>
  );
};

export default ArticleSidebar;
