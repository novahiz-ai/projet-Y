
import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  scrolled?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, setIsDarkMode, scrolled }) => {
  return (
    <button 
      onClick={() => setIsDarkMode(!isDarkMode)} 
      className={`p-3 rounded-xl transition-colors ${
        scrolled 
          ? 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300' 
          : 'hover:bg-white/10 text-slate-700 dark:text-slate-200'
      }`}
      aria-label="Changer de thème"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
