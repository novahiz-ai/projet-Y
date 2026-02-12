
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen, ChevronRight } from 'lucide-react';
import { getArticles } from '../data/articles';
import ArticleCard from './ArticleCard';
import StandardButton from './StandardButton';

interface ExpertiseNewsroomProps {
  onNavigateArticle: (id: string) => void;
  onNavigateGuide: () => void;
}

const ExpertiseNewsroom: React.FC<ExpertiseNewsroomProps> = ({ onNavigateArticle, onNavigateGuide }) => {
  const { t } = useTranslation();
  const articles = useMemo(() => getArticles(t).slice(0, 3), [t]);

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={itemVariants} 
      className="max-w-7xl mx-auto px-6"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-brand-primary/5 border border-brand-primary/10 rounded-full text-brand-primary">
            <BookOpen size={14} />
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">{t('landing.expertise_label')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">
            {t('landing.expertise_title')}<span className="text-brand-primary">{t('landing.expertise_highlight')}</span>
          </h2>
        </div>
        <StandardButton variant="outline" onClick={onNavigateGuide} className="!px-8 !py-4 text-xs">
          <span>{t('landing.access_guide')}</span>
          <ChevronRight size={16} />
        </StandardButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {articles.map((art) => (
          <ArticleCard 
            key={art.id} 
            article={art} 
            onClick={() => onNavigateArticle(art.id)} 
          />
        ))}
      </div>
    </motion.section>
  );
};

export default ExpertiseNewsroom;
