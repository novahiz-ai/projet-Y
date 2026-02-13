import { LoanOffer, LoanType } from './types';

export const LOAN_OFFERS: LoanOffer[] = [
  {
    id: 'conso',
    type: LoanType.CONSOMMATION,
    title: 'offers_data.conso.title',
    description: 'offers_data.conso.desc',
    minRate: 4.5,
    maxAmount: 60000,
    icon: 'ShoppingBag',
    color: 'bg-blue-500'
  },
  {
    id: 'perso',
    type: LoanType.PERSONNEL,
    title: 'offers_data.perso.title',
    description: 'offers_data.perso.desc',
    minRate: 3.9,
    icon: 'User',
    color: 'bg-indigo-500'
  },
  {
    id: 'auto',
    type: LoanType.AUTO,
    title: 'offers_data.auto.title',
    description: 'offers_data.auto.desc',
    minRate: 2.5,
    icon: 'Car',
    color: 'bg-emerald-500'
  },
  {
    id: 'travaux',
    type: LoanType.TRAVAUX,
    title: 'offers_data.travaux.title',
    description: 'offers_data.travaux.desc',
    minRate: 2.1,
    icon: 'Home',
    color: 'bg-orange-500'
  },
  {
    id: 'rapide',
    type: LoanType.RAPIDE,
    title: 'offers_data.rapide.title',
    description: 'offers_data.rapide.desc',
    minRate: 6.5,
    icon: 'Zap',
    color: 'bg-yellow-500'
  },
  {
    id: 'rachat',
    type: LoanType.RACHAT,
    title: 'offers_data.rachat.title',
    description: 'offers_data.rachat.desc',
    minRate: 4.2,
    icon: 'Layers',
    color: 'bg-purple-500'
  },
  {
    id: 'immo',
    type: LoanType.IMMOBILIER,
    title: 'offers_data.immo.title',
    description: 'offers_data.immo.desc',
    minRate: 1.8,
    icon: 'Building',
    color: 'bg-rose-500'
  },
  {
    id: 'assurance',
    type: LoanType.ASSURANCE,
    title: 'offers_data.assurance.title',
    description: 'offers_data.assurance.desc',
    minRate: 0,
    icon: 'ShieldCheck',
    color: 'bg-slate-500'
  },
  {
    id: 'projet',
    type: LoanType.PROJET,
    title: 'offers_data.projet.title',
    description: 'offers_data.projet.desc',
    minRate: 3.5,
    icon: 'Lightbulb',
    color: 'bg-cyan-500'
  }
];