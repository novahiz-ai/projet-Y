import React from 'react';
import { useTranslation } from 'react-i18next';
import { getIcon } from '../../infrastructure/IconRegistry';
import { HeroProject } from '../../data/heroProjects';

interface ProjectSelectorProps {
  projects: HeroProject[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ projects, activeIndex, onSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-nowrap gap-3 max-w-full overflow-x-auto lg:overflow-visible scrollbar-hide py-2">
      {projects.map((proj, idx) => (
        <button
          key={proj.id}
          onClick={() => onSelect(idx)}
          className={`px-5 py-3 rounded-[1.8rem] border-2 transition-all flex items-center space-x-3 shrink-0 ${
            activeIndex === idx 
              ? 'bg-white dark:bg-slate-900 border-brand-primary shadow-xl shadow-brand-primary/15 scale-105 z-10' 
              : 'bg-white/40 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800 hover:border-slate-200'
          }`}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            activeIndex === idx ? 'bg-brand-primary text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}>
            {getIcon(proj.iconName, 18)}
          </div>
          <div className="text-left">
            <p className="text-[9px] font-black uppercase text-slate-950 dark:text-white leading-none mb-0.5">{t(proj.labelKey)}</p>
            <p className={`text-[9px] font-black ${activeIndex === idx ? 'text-brand-primary' : 'text-slate-400'}`}>{proj.rate}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ProjectSelector;