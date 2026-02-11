
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, CreditCard, Car, Plane, Home } from 'lucide-react';

interface ProjectIconsGridProps {
  className?: string;
}

const ProjectIconsGrid: React.FC<ProjectIconsGridProps> = ({ className = "" }) => {
  const { t } = useTranslation();

  const items = [
    { 
      icon: <ShoppingBag />, 
      label: t('projects_grid.furniture.label'), 
      desc: t('projects_grid.furniture.desc') 
    },
    { 
      icon: <CreditCard />, 
      label: t('projects_grid.license.label'), 
      desc: t('projects_grid.license.desc') 
    },
    { 
      icon: <Car />, 
      label: t('projects_grid.vehicle.label'), 
      desc: t('projects_grid.vehicle.desc') 
    },
    { 
      icon: <Plane />, 
      label: t('projects_grid.travel.label'), 
      desc: t('projects_grid.travel.desc') 
    },
    { 
      icon: <Home />, 
      label: t('projects_grid.renovation.label'), 
      desc: t('projects_grid.renovation.desc') 
    }
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 ${className}`}>
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center justify-center p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group text-center">
          <div className="mb-6 w-14 h-14 bg-slate-50 dark:bg-slate-950 text-slate-400 group-hover:bg-brand-primary group-hover:text-white rounded-2xl flex items-center justify-center transition-all">
            {item.icon}
          </div>
          <span className="font-black text-[10px] uppercase tracking-widest mb-2 text-slate-900 dark:text-white">{item.label}</span>
          <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tight">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectIconsGrid;
