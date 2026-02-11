
import { Article } from '../../types';

export const articleVacances: Article = {
  id: 'art-7',
  category: 'perso',
  categoryLabel: 'Prêt Perso',
  title: "Financer ses vacances : prêt ou épargne ?",
  excerpt: "Découvrez quand il est judicieux de recourir à un petit crédit pour vos voyages et comment l'anticiper.",
  readTime: "7 min",
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
  author: "Léa R.",
  sections: [
    {
      id: 'budget-voyage',
      title: "Anticiper son budget évasion",
      type: 'text',
      content: "Les vacances représentent souvent l'un des postes de dépense les plus importants de l'année. Entre les billets d'avion, l'hébergement et les dépenses sur place, l'addition peut vite grimper. Le prêt personnel 'voyage' permet d'étaler ce coût sur plusieurs mois sans entamer l'intégralité de son épargne de précaution."
    },
    {
      id: 'avantages-credit-voyage',
      title: "Les avantages du crédit voyage",
      type: 'list',
      content: "Pourquoi choisir le financement Younited pour votre prochain départ ?",
      items: [
        "Taux fixe et mensualités connues à l'avance.",
        "Pas de justificatif de destination requis.",
        "Réponse rapide pour saisir les offres 'last minute'.",
        "Possibilité de rembourser par anticipation sans frais (selon montants)."
      ]
    }
  ],
  expertTip: "Réservez vos vols au moins 3 mois à l'avance pour réduire le capital nécessaire à emprunter."
};
