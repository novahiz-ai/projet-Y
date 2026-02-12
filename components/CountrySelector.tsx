
import React from 'react';
import { ChevronDown, Globe } from 'lucide-react';

export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

const COUNTRIES: Country[] = [
  { code: 'AL', name: 'Albanie', flag: '🇦🇱', dialCode: '+355' },
  { code: 'DE', name: 'Allemagne', flag: '🇩🇪', dialCode: '+49' },
  { code: 'AD', name: 'Andorre', flag: '🇦🇩', dialCode: '+376' },
  { code: 'AT', name: 'Autriche', flag: '🇦🇹', dialCode: '+43' },
  { code: 'BE', name: 'Belgique', flag: '🇧🇪', dialCode: '+32' },
  { code: 'BY', name: 'Biélorussie', flag: '🇧🇾', dialCode: '+375' },
  { code: 'BA', name: 'Bosnie-Herzégovine', flag: '🇧🇦', dialCode: '+387' },
  { code: 'BG', name: 'Bulgarie', flag: '🇧🇬', dialCode: '+359' },
  { code: 'CY', name: 'Chypre', flag: '🇨🇾', dialCode: '+357' },
  { code: 'HR', name: 'Croatie', flag: '🇭🇷', dialCode: '+385' },
  { code: 'DK', name: 'Danemark', flag: '🇩🇰', dialCode: '+45' },
  { code: 'ES', name: 'Espagne', flag: '🇪🇸', dialCode: '+34' },
  { code: 'EE', name: 'Estonie', flag: '🇪🇪', dialCode: '+372' },
  { code: 'FI', name: 'Finlande', flag: '🇫🇮', dialCode: '+358' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
  { code: 'GR', name: 'Grèce', flag: '🇬🇷', dialCode: '+30' },
  { code: 'HU', name: 'Hongrie', flag: '🇭🇺', dialCode: '+36' },
  { code: 'IE', name: 'Irlande', flag: '🇮🇪', dialCode: '+353' },
  { code: 'IS', name: 'Islande', flag: '🇮🇸', dialCode: '+354' },
  { code: 'IT', name: 'Italie', flag: '🇮🇹', dialCode: '+39' },
  { code: 'XK', name: 'Kosovo', flag: '🇽🇰', dialCode: '+383' },
  { code: 'LV', name: 'Lettonie', flag: '🇱🇻', dialCode: '+371' },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', dialCode: '+423' },
  { code: 'LT', name: 'Lituanie', flag: '🇱🇹', dialCode: '+370' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', dialCode: '+352' },
  { code: 'MK', name: 'Macédoine du Nord', flag: '🇲🇰', dialCode: '+389' },
  { code: 'MT', name: 'Malte', flag: '🇲🇹', dialCode: '+356' },
  { code: 'MD', name: 'Moldavie', flag: '🇲🇩', dialCode: '+373' },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨', dialCode: '+377' },
  { code: 'ME', name: 'Monténégro', flag: '🇲🇪', dialCode: '+382' },
  { code: 'NO', name: 'Norvège', flag: '🇳🇴', dialCode: '+47' },
  { code: 'NL', name: 'Pays-Bas', flag: '🇳🇱', dialCode: '+31' },
  { code: 'PL', name: 'Pologne', flag: '🇵🇱', dialCode: '+48' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', dialCode: '+351' },
  { code: 'CZ', name: 'République Tchèque', flag: '🇨🇿', dialCode: '+420' },
  { code: 'RO', name: 'Roumanie', flag: '🇷🇴', dialCode: '+40' },
  { code: 'GB', name: 'Royaume-Uni', flag: '🇬🇧', dialCode: '+44' },
  { code: 'RU', name: 'Russie', flag: '🇷🇺', dialCode: '+7' },
  { code: 'SM', name: 'Saint-Marin', flag: '🇸🇲', dialCode: '+378' },
  { code: 'RS', name: 'Serbie', flag: '🇷🇸', dialCode: '+381' },
  { code: 'SK', name: 'Slovaquie', flag: '🇸🇰', dialCode: '+421' },
  { code: 'SI', name: 'Slovénie', flag: '🇸🇮', dialCode: '+386' },
  { code: 'SE', name: 'Suède', flag: '🇸🇪', dialCode: '+46' },
  { code: 'CH', name: 'Suisse', flag: '🇨🇭', dialCode: '+41' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', dialCode: '+380' },
  { code: 'VA', name: 'Vatican', flag: '🇻🇦', dialCode: '+39' },
  { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮', dialCode: '+225' },
  { code: 'SN', name: 'Sénégal', flag: '🇸🇳', dialCode: '+221' },
  { code: 'MA', name: 'Maroc', flag: '🇲🇦', dialCode: '+212' },
  { code: 'DZ', name: 'Algérie', flag: '🇩🇿', dialCode: '+213' },
  { code: 'TN', name: 'Tunisie', flag: '🇹🇳', dialCode: '+216' },
  { code: 'CM', name: 'Cameroun', flag: '🇨🇲', dialCode: '+237' },
  { code: 'CD', name: 'Congo (RDC)', flag: '🇨🇩', dialCode: '+243' },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦', dialCode: '+241' },
  { code: 'BJ', name: 'Bénin', flag: '🇧🇯', dialCode: '+229' },
  { code: 'CN', name: 'Chine', flag: '🇨🇳', dialCode: '+86' },
  { code: 'JP', name: 'Japon', flag: '🇯🇵', dialCode: '+81' },
  { code: 'IN', name: 'Inde', flag: '🇮🇳', dialCode: '+91' },
  { code: 'AE', name: 'Émirats Arabes Unis', flag: '🇦🇪', dialCode: '+971' },
  { code: 'TR', name: 'Turquie', flag: '🇹🇷', dialCode: '+90' }
].sort((a, b) => a.name.localeCompare(b.name));

interface CountrySelectorProps {
  value: string;
  onChange: (country: Country) => void;
  label?: string;
  className?: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ value, onChange, label, className = "" }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const selectedCountry = COUNTRIES.find(c => c.code === value) || COUNTRIES.find(c => c.code === 'FR') || COUNTRIES[0];

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`space-y-2 relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1 flex items-center space-x-2">
          <Globe size={12} />
          <span>{label}</span>
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-slate-50/50 dark:bg-slate-900/30 border transition-all rounded-2xl py-4 px-6 flex items-center justify-between outline-none shadow-inner-soft ${
          isOpen ? 'border-brand-primary/40 ring-4 ring-brand-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
        }`}
      >
        <div className="flex items-center space-x-3">
          <span className="text-xl">{selectedCountry.flag}</span>
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">{selectedCountry.name}</span>
        </div>
        <ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-[200] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-100 dark:border-slate-800 rounded-3xl shadow-3xl max-h-64 overflow-y-auto scrollbar-hide py-3">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                onChange(c);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-4 px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left ${value === c.code ? 'bg-brand-primary/10 text-brand-primary' : 'text-slate-600 dark:text-slate-400'}`}
            >
              <span className="text-xl">{c.flag}</span>
              <div className="flex-1">
                <p className="text-sm font-black uppercase tracking-tight">{c.name}</p>
                <p className="text-[10px] font-bold opacity-50">{c.dialCode}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
