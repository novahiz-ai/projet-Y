import React from 'react';
import { 
  ShoppingBag, User, Car, Home, Zap, Layers, 
  Building, ShieldCheck, Lightbulb, HelpCircle,
  BookOpen, SpellCheck
} from 'lucide-react';

export const IconRegistry = {
  ShoppingBag: (size = 24) => <ShoppingBag size={size} />,
  User: (size = 24) => <User size={size} />,
  Car: (size = 24) => <Car size={size} />,
  Home: (size = 24) => <Home size={size} />,
  Zap: (size = 24) => <Zap size={size} />,
  Layers: (size = 24) => <Layers size={size} />,
  Building: (size = 24) => <Building size={size} />,
  ShieldCheck: (size = 24) => <ShieldCheck size={size} />,
  Lightbulb: (size = 24) => <Lightbulb size={size} />,
  HelpCircle: (size = 24) => <HelpCircle size={size} />,
  BookOpen: (size = 24) => <BookOpen size={size} />,
  SpellCheck: (size = 24) => <SpellCheck size={size} />
};

export type IconName = keyof typeof IconRegistry;

export const getIcon = (name: string, size = 24) => {
  const iconRenderer = IconRegistry[name as IconName];
  return iconRenderer ? iconRenderer(size) : <Zap size={size} />;
};