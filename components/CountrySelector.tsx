import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import BaseDropdown from './ui/BaseDropdown';

export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  region: 'Europe' | 'Asie';
}

const EUROPEAN_COUNTRIES: Country[] = ([
  { code: 'AL', name: 'Albanie', flag: '🇦🇱', dialCode: '+355', region: 'Europe' },
  { code: 'AD', name: 'Andorre', flag: '🇦🇩', dialCode: '+376', region: 'Europe' },
  { code: 'AT', name: 'Autriche', flag: '🇦🇹', dialCode: '+43', region: 'Europe' },
  { code: 'BE', name: 'Belgique', flag: '🇧🇪', dialCode: '+32', region: 'Europe' },
  { code: 'BY', name: 'Biélorussie', flag: '🇧🇾', dialCode: '+375', region: 'Europe' },
  { code: 'BA', name: 'Bosnie-Herzégovine', flag: '🇧🇦', dialCode: '+387', region: 'Europe' },
  { code: 'BG', name: 'Bulgarie', flag: '🇧🇬', dialCode: '+359', region: 'Europe' },
  { code: 'HR', name: 'Croatie', flag: '🇭🇷', dialCode: '+385', region: 'Europe' },
  { code: 'CY', name: 'Chypre', flag: '🇨🇾', dialCode: '+357', region: 'Europe' },
  { code: 'CZ', name: 'République Tchèque', flag: '🇨🇿', dialCode: '+420', region: 'Europe' },
  { code: 'DK', name: 'Danemark', flag: '🇩🇰', dialCode: '+45', region: 'Europe' },
  { code: 'EE', name: 'Estonie', flag: '🇪🇪', dialCode: '+372', region: 'Europe' },
  { code: 'FI', name: 'Finlande', flag: '🇫🇮', dialCode: '+358', region: 'Europe' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33', region: 'Europe' },
  { code: 'DE', name: 'Allemagne', flag: '🇩🇪', dialCode: '+49', region: 'Europe' },
  { code: 'GR', name: 'Grèce', flag: '🇬🇷', dialCode: '+30', region: 'Europe' },
  { code: 'HU', name: 'Hongrie', flag: '🇭🇺', dialCode: '+36', region: 'Europe' },
  { code: 'IS', name: 'Islande', flag: '🇮🇸', dialCode: '+354', region: 'Europe' },
  { code: 'IE', name: 'Irlande', flag: '🇮🇪', dialCode: '+353', region: 'Europe' },
  { code: 'IT', name: 'Italie', flag: '🇮🇹', dialCode: '+39', region: 'Europe' },
  { code: 'LV', name: 'Lettonie', flag: '🇱🇻', dialCode: '+371', region: 'Europe' },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', dialCode: '+423', region: 'Europe' },
  { code: 'LT', name: 'Lituanie', flag: '🇱🇹', dialCode: '+370', region: 'Europe' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', dialCode: '+352', region: 'Europe' },
  { code: 'MT', name: 'Malte', flag: '🇲🇹', dialCode: '+356', region: 'Europe' },
  { code: 'MD', name: 'Moldavie', flag: '🇲🇩', dialCode: '+373', region: 'Europe' },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨', dialCode: '+377', region: 'Europe' },
  { code: 'ME', name: 'Monténégro', flag: '🇲🇪', dialCode: '+382', region: 'Europe' },
  { code: 'NL', name: 'Pays-Bas', flag: '🇳🇱', dialCode: '+31', region: 'Europe' },
  { code: 'MK', name: 'Macédoine du Nord', flag: '🇲🇰', dialCode: '+389', region: 'Europe' },
  { code: 'NO', name: 'Norvège', flag: '🇳🇴', dialCode: '+47', region: 'Europe' },
  { code: 'PL', name: 'Pologne', flag: '🇵🇱', dialCode: '+48', region: 'Europe' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', dialCode: '+351', region: 'Europe' },
  { code: 'RO', name: 'Roumanie', flag: '🇷🇴', dialCode: '+40', region: 'Europe' },
  { code: 'RU', name: 'Russie', flag: '🇷🇺', dialCode: '+7', region: 'Europe' },
  { code: 'SM', name: 'Saint-Marin', flag: '🇸🇲', dialCode: '+378', region: 'Europe' },
  { code: 'RS', name: 'Serbie', flag: '🇷🇸', dialCode: '+381', region: 'Europe' },
  { code: 'SK', name: 'Slovaquie', flag: '🇸🇰', dialCode: '+421', region: 'Europe' },
  { code: 'SI', name: 'Slovénie', flag: '🇸🇮', dialCode: '+386', region: 'Europe' },
  { code: 'ES', name: 'Espagne', flag: '🇪🇸', dialCode: '+34', region: 'Europe' },
  { code: 'SE', name: 'Suède', flag: '🇸🇪', dialCode: '+46', region: 'Europe' },
  { code: 'CH', name: 'Suisse', flag: '🇨🇭', dialCode: '+41', region: 'Europe' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', dialCode: '+380', region: 'Europe' },
  { code: 'GB', name: 'Royaume-Uni', flag: '🇬🇧', dialCode: '+44', region: 'Europe' },
  { code: 'VA', name: 'Vatican', flag: '🇻🇦', dialCode: '+39', region: 'Europe' }
] as Country[]).sort((a, b) => a.name.localeCompare(b.name));

const ASIAN_COUNTRIES: Country[] = ([
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', dialCode: '+93', region: 'Asie' },
  { code: 'AM', name: 'Arménie', flag: '🇦🇲', dialCode: '+374', region: 'Asie' },
  { code: 'AZ', name: 'Azerbaïdjan', flag: '🇦🇿', dialCode: '+994', region: 'Asie' },
  { code: 'BH', name: 'Bahreïn', flag: '🇧🇭', dialCode: '+973', region: 'Asie' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', dialCode: '+880', region: 'Asie' },
  { code: 'BT', name: 'Bhoutan', flag: '🇧🇹', dialCode: '+975', region: 'Asie' },
  { code: 'BN', name: 'Brunei', flag: '🇧🇳', dialCode: '+673', region: 'Asie' },
  { code: 'KH', name: 'Cambodge', flag: '🇰🇭', dialCode: '+855', region: 'Asie' },
  { code: 'CN', name: 'Chine', flag: '🇨🇳', dialCode: '+86', region: 'Asie' },
  { code: 'GE', name: 'Géorgie', flag: '🇬🇪', dialCode: '+995', region: 'Asie' },
  { code: 'IN', name: 'Inde', flag: '🇮🇳', dialCode: '+91', region: 'Asie' },
  { code: 'ID', name: 'Indonésie', flag: '🇮🇩', dialCode: '+62', region: 'Asie' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷', dialCode: '+98', region: 'Asie' },
  { code: 'IQ', name: 'Irak', flag: '🇮🇶', dialCode: '+964', region: 'Asie' },
  { code: 'IL', name: 'Israël', flag: '🇮🇱', dialCode: '+972', region: 'Asie' },
  { code: 'JP', name: 'Japon', flag: '🇯🇵', dialCode: '+81', region: 'Asie' },
  { code: 'JO', name: 'Jordanie', flag: '🇯🇴', dialCode: '+962', region: 'Asie' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', dialCode: '+7', region: 'Asie' },
  { code: 'KW', name: 'Koweït', flag: '🇰🇼', dialCode: '+965', region: 'Asie' },
  { code: 'KG', name: 'Kirghizistan', flag: '🇰🇬', dialCode: '+996', region: 'Asie' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦', dialCode: '+856', region: 'Asie' },
  { code: 'LB', name: 'Liban', flag: '🇱🇧', dialCode: '+961', region: 'Asie' },
  { code: 'MY', name: 'Malaisie', flag: '🇲🇾', dialCode: '+60', region: 'Asie' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻', dialCode: '+960', region: 'Asie' },
  { code: 'MN', name: 'Mongolie', flag: '🇲🇳', dialCode: '+976', region: 'Asie' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲', dialCode: '+95', region: 'Asie' },
  { code: 'NP', name: 'Népal', flag: '🇳🇵', dialCode: '+977', region: 'Asie' },
  { code: 'KP', name: 'Corée du Nord', flag: '🇰🇵', dialCode: '+850', region: 'Asie' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲', dialCode: '+968', region: 'Asie' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', dialCode: '+92', region: 'Asie' },
  { code: 'PS', name: 'Palestine', flag: '🇵🇸', dialCode: '+970', region: 'Asie' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', dialCode: '+63', region: 'Asie' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', dialCode: '+974', region: 'Asie' },
  { code: 'SA', name: 'Arabie Saoudite', flag: '🇸🇦', dialCode: '+966', region: 'Asie' },
  { code: 'SG', name: 'Singapour', flag: '🇸🇬', dialCode: '+65', region: 'Asie' },
  { code: 'KR', name: 'Corée du Sud', flag: '🇰🇷', dialCode: '+82', region: 'Asie' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', dialCode: '+94', region: 'Asie' },
  { code: 'SY', name: 'Syrie', flag: '🇸🇾', dialCode: '+963', region: 'Asie' },
  { code: 'TW', name: 'Taïwan', flag: '🇹🇼', dialCode: '+886', region: 'Asie' },
  { code: 'TJ', name: 'Tadjikistan', flag: '🇹🇯', dialCode: '+992', region: 'Asie' },
  { code: 'TH', name: 'Thaïlande', flag: '🇹🇭', dialCode: '+66', region: 'Asie' },
  { code: 'TL', name: 'Timor Oriental', flag: '🇹🇱', dialCode: '+670', region: 'Asie' },
  { code: 'TR', name: 'Turquie', flag: '🇹🇷', dialCode: '+90', region: 'Asie' },
  { code: 'TM', name: 'Turkménistan', flag: '🇹🇲', dialCode: '+993', region: 'Asie' },
  { code: 'AE', name: 'Émirats Arabes Unis', flag: '🇦🇪', dialCode: '+971', region: 'Asie' },
  { code: 'UZ', name: 'Ouzbékistan', flag: '🇺🇿', dialCode: '+998', region: 'Asie' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', dialCode: '+84', region: 'Asie' },
  { code: 'YE', name: 'Yémen', flag: '🇾🇪', dialCode: '+967', region: 'Asie' }
] as Country[]).sort((a, b) => a.name.localeCompare(b.name));

const ALL_ALLOWED_COUNTRIES = [...EUROPEAN_COUNTRIES, ...ASIAN_COUNTRIES];

interface CountrySelectorProps {
  value: string;
  onChange: (country: Country) => void;
  label?: string;
  className?: string;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ value, onChange, label, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const filteredEurope = useMemo(() => EUROPEAN_COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase())), [search]);
  const filteredAsia = useMemo(() => ASIAN_COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase())), [search]);

  const selectedCountry = ALL_ALLOWED_COUNTRIES.find(c => c.code === value) || EUROPEAN_COUNTRIES.find(c => c.code === 'FR') || EUROPEAN_COUNTRIES[0];

  const renderGroup = (title: string, list: Country[]) => {
    if (list.length === 0) return null;
    return (
      <div className="space-y-1">
        <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800/50 sticky top-0 z-10 backdrop-blur-sm border-y border-slate-100 dark:border-slate-800">
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">{title}</span>
        </div>
        {list.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => {
              onChange(c);
              setIsOpen(false);
              setSearch('');
            }}
            className={`w-full flex items-center space-x-4 px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left group/item ${value === c.code ? 'bg-brand-primary/10 text-brand-primary' : 'text-slate-600 dark:text-slate-400'}`}
          >
            <span className="text-xl group-hover/item:scale-110 transition-transform">{c.flag}</span>
            <div className="flex-1">
              <p className="text-sm font-black uppercase tracking-tight">{c.name}</p>
              <p className="text-[10px] font-bold opacity-50">{c.dialCode}</p>
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <BaseDropdown 
      isOpen={isOpen} 
      onToggle={(state) => { setIsOpen(state); if (!state) setSearch(''); }} 
      label={label} 
      title="Sélection pays"
      trigger={
        <div className={`w-full bg-slate-50/50 dark:bg-slate-900/30 border transition-all rounded-2xl py-4 px-6 flex items-center justify-between outline-none shadow-inner-soft ${isOpen ? 'border-brand-primary/40 ring-4 ring-brand-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}>
          <div className="flex items-center space-x-3">
            <span className="text-xl">{selectedCountry.flag}</span>
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">{selectedCountry.name}</span>
          </div>
          <ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      }
    >
      <div className="px-4 py-3 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl z-20 border-b border-slate-100 dark:border-slate-800">
        <div className="relative group">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Rechercher un pays..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 focus:border-brand-primary/40 focus:ring-4 focus:ring-brand-primary/5 rounded-xl pl-10 pr-4 py-2 text-xs font-bold text-slate-900 dark:text-white outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 dark:hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>
      </div>
      {renderGroup("Europe", filteredEurope)}
      {renderGroup("Asie", filteredAsia)}
      {(filteredEurope.length === 0 && filteredAsia.length === 0) && (
        <div className="py-10 text-center space-y-2">
          <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest italic">Aucun résultat</p>
        </div>
      )}
    </BaseDropdown>
  );
};

export default CountrySelector;