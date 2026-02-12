
import { TFunction } from 'i18next';

export interface HeroProject {
  id: string;
  labelKey: string;
  rate: string;
  image: string;
  iconName: string;
}

export const getHeroProjects = (t: TFunction): HeroProject[] => [
  { 
    id: "auto", 
    labelKey: 'landing.hero.projects.auto.label', 
    rate: "2.5%", 
    iconName: "Car",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000" 
  },
  { 
    id: "immo", 
    labelKey: 'landing.hero.projects.immo.label', 
    rate: "1.8%", 
    iconName: "Home",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000" 
  },
  { 
    id: "perso", 
    labelKey: 'landing.hero.projects.perso.label', 
    rate: "3.9%", 
    iconName: "User",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
  },
  { 
    id: "travaux", 
    labelKey: 'landing.hero.projects.projet.label', 
    rate: "2.1%", 
    iconName: "Heart",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000" 
  },
];
