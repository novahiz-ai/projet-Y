import React from 'react';
import { User, Briefcase, ShieldCheck, Landmark } from 'lucide-react';

export const europeanCountries = [
  { value: 'FR', label: 'France', flag: '🇫🇷', prefix: '+33' },
  { value: 'BE', label: 'Belgique', flag: '🇧🇪', prefix: '+32' },
  { value: 'CH', label: 'Suisse', flag: '🇨🇭', prefix: '+41' },
  { value: 'LU', label: 'Luxembourg', flag: '🇱🇺', prefix: '+352' },
  { value: 'DE', label: 'Allemagne', flag: '🇩🇪', prefix: '+49' },
  { value: 'ES', label: 'Espagne', flag: '🇪🇸', prefix: '+34' },
  { value: 'IT', label: 'Italie', flag: '🇮🇹', prefix: '+39' }
];

export const accountTypes = [
  { value: 'personal', label: 'Compte Personnel', icon: React.createElement(User, { size: 18 }), subLabel: 'Individuel' },
  { value: 'business', label: 'Compte Business', icon: React.createElement(Briefcase, { size: 18 }), subLabel: 'Professionnel' }
];

export const banks = [
  { value: 'younited', label: 'Younited Financial', icon: React.createElement(ShieldCheck, { size: 18 }) },
  { value: 'bourso', label: 'Boursorama', icon: React.createElement(Landmark, { size: 18 }) }
];