import React from 'react';
import { 
  HelpCircle, User, CreditCard, Car, Home, 
  Building, Layers, Lightbulb, ShieldCheck 
} from 'lucide-react';

export const HELP_CATEGORIES = [
  // Fix: Use React.createElement instead of JSX to avoid syntax errors in .ts file
  { id: 'general', icon: React.createElement(HelpCircle, { size: 18 }), translationKey: 'help.cat_general' },
  { id: 'conso', icon: React.createElement(CreditCard, { size: 18 }), title: "Conso" },
  { id: 'perso', icon: React.createElement(User, { size: 18 }), title: "Personnel" },
  { id: 'auto', icon: React.createElement(Car, { size: 18 }), title: "Auto/Moto" },
  { id: 'travaux', icon: React.createElement(Home, { size: 18 }), translationKey: 'help.cat_works' },
  { id: 'immo', icon: React.createElement(Building, { size: 18 }), title: "Immo" },
  { id: 'rachat', icon: React.createElement(Layers, { size: 18 }), title: "Rachat" },
  { id: 'projet', icon: React.createElement(Lightbulb, { size: 18 }), title: "Projets" },
  { id: 'assurance', icon: React.createElement(ShieldCheck, { size: 18 }), title: "Assurance" },
];