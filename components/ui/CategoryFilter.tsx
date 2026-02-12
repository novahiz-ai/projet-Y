
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Category {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface CategoryFilterProps {
  categories: Category[];
  activeId: string | null;
  onSelect: (id: string) => void;
  allLabel?: string;
  MainIcon?: LucideIcon;
  className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, activeId, onSelect, allLabel, MainIcon, className = "" 
}) => {
  return (
    <div className={`flex items-center space-x-2 overflow-x-auto scrollbar-hide pb-4 ${className}`}>
      {MainIcon && <MainIcon size={16} className="text-slate-400 mr-2 shrink-0" />}
      {allLabel && (
        <button 
          onClick={() => onSelect('all')}
          className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-2 ${activeId === 'all' || !activeId ? 'bg-slate-950 border-slate-950 text-white dark:bg-white dark:border-white dark:text-slate-950' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200'}`}
        >
          {allLabel}
        </button>
      )}
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`group flex items-center space-x-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 shrink-0 ${activeId === cat.id ? 'bg-brand-primary border-brand-primary text-white shadow-xl shadow-brand-primary/20 scale-105' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200'}`}
        >
          {cat.icon && <span className={activeId === cat.id ? 'text-white' : 'text-brand-primary'}>{cat.icon}</span>}
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
