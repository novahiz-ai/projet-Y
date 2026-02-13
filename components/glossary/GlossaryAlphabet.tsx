import React from 'react';

interface GlossaryAlphabetProps {
  alphabet: string[];
  availableLetters: string[];
  onLetterClick: (letter: string) => void;
}

const GlossaryAlphabet: React.FC<GlossaryAlphabetProps> = ({ alphabet, availableLetters, onLetterClick }) => (
  <div className="w-full flex items-center justify-center space-x-1 overflow-x-auto scrollbar-hide md:border-l border-slate-100 dark:border-slate-800 md:pl-6">
     {alphabet.map(letter => {
       const isAvailable = availableLetters.includes(letter);
       return (
         <button 
           key={letter}
           disabled={!isAvailable}
           onClick={() => onLetterClick(letter)}
           className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${
             isAvailable 
               ? 'text-slate-900 dark:text-white hover:bg-brand-primary hover:text-white cursor-pointer' 
               : 'text-slate-200 dark:text-slate-800 cursor-default opacity-30'
           }`}
         >
           {letter}
         </button>
       );
     })}
  </div>
);

export default GlossaryAlphabet;