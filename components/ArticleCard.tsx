
import React from 'react';
import { Clock, User, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="group cursor-pointer space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-sm">
            {article.categoryLabel}
          </span>
        </div>
      </div>
      <div className="space-y-4 px-2">
        <div className="flex items-center space-x-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span className="flex items-center"><Clock size={12} className="mr-1" /> {article.readTime}</span>
          <span className="flex items-center"><User size={12} className="mr-1" /> {article.author}</span>
        </div>
        <h4 className="text-xl font-black uppercase tracking-tight group-hover:text-brand-primary transition-colors leading-tight">
          {article.title}
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
          {article.excerpt}
        </p>
        <div className="flex items-center text-brand-primary font-black uppercase text-[10px] tracking-[0.2em] group-hover:translate-x-2 transition-transform">
          <span>Voir plus</span>
          <ArrowRight size={14} className="ml-2" />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
