
export enum LoanType {
  CONSOMMATION = 'Consommation',
  PERSONNEL = 'Personnel',
  AUTO = 'Auto',
  TRAVAUX = 'Travaux',
  RAPIDE = 'Rapide',
  RACHAT = 'Rachat',
  IMMOBILIER = 'Immobilier',
  ASSURANCE = 'Assurance',
  PROJET = 'Projet'
}

export interface LoanOffer {
  id: string;
  type: LoanType;
  title: string;
  description: string;
  minRate: number;
  maxAmount?: number;
  icon: string;
  color: string;
}

export interface SimulationResult {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
}

export interface ArticleSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'highlight' | 'list';
  items?: string[];
}

export interface Article {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  excerpt: string;
  readTime: string;
  image: string;
  author: string;
  isFeatured?: boolean;
  sections: ArticleSection[];
  expertTip?: string;
}
