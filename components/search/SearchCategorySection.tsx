
import React from 'react';

interface SearchCategorySectionProps {
  title: string;
  children: React.ReactNode;
}

const SearchCategorySection: React.FC<SearchCategorySectionProps> = ({ title, children }) => {
  return (
    <div className="space-y-6">
      <h4 className="px-2 text-[10px] font-black text-brand-primary uppercase tracking-[0.4em]">{title}</h4>
      <div className="grid grid-cols-1 gap-4">
        {children}
      </div>
    </div>
  );
};

export default SearchCategorySection;
