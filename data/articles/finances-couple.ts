
import { Article } from '../../types';

export const articleCouple: Article = {
  id: 'art-13',
  category: 'perso',
  categoryLabel: 'Gestion',
  title: "Gérer ses finances en couple et emprunter",
  excerpt: "Solidarité, co-emprunt et protection du conjoint lors d'une demande de prêt.",
  readTime: "8 min",
  image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
  author: "Sophie M.",
  sections: [
    {
      id: 'co-emprunteur',
      title: "L'intérêt du co-emprunteur",
      type: 'text',
      content: "Emprunter à deux rassure la banque. Les revenus cumulés augmentent la capacité d'emprunt, tandis que le risque de défaut est divisé par deux. Chez Younited, le processus est simplifié pour les couples avec une signature électronique commune."
    },
    {
      id: 'solidarite-detre',
      title: "La clause de solidarité",
      type: 'highlight',
      content: "Attention : en signant à deux, vous êtes solidaires de la dette. Si l'un ne peut plus payer, l'autre est redevable de l'intégralité de la mensualité, quel que soit le régime matrimonial."
    }
  ],
  expertTip: "Optez pour une assurance emprunteur à 100% sur chaque tête pour une protection totale du foyer."
};
