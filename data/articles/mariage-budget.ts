
import { Article } from '../../types';

export const articleMariage: Article = {
  id: 'art-8',
  category: 'projet',
  categoryLabel: 'Projet',
  title: "Mariage : gérer son budget sans stress",
  excerpt: "De la location de salle au traiteur, apprenez à lisser les dépenses de votre plus beau jour.",
  readTime: "12 min",
  image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
  author: "Marc L.",
  sections: [
    {
      id: 'cout-moyen',
      title: "Le coût réel d'un mariage en 2024",
      type: 'text',
      content: "En France, le coût moyen d'un mariage pour 100 personnes oscille entre 12 000€ et 18 000€. Ces sommes importantes nécessitent souvent un mix entre apport personnel, aide familiale et financement externe."
    },
    {
      id: 'postes-depenses',
      title: "Répartition des dépenses types",
      type: 'highlight',
      content: "Le traiteur représente généralement 40% du budget total. Viennent ensuite le lieu de réception (20%) et la tenue/alliances (15%). Garder une marge de 10% pour les imprévus est la règle d'or des wedding planners."
    }
  ],
  expertTip: "Faites une simulation globale incluant le prêt et votre épargne pour éviter tout découvert avant le jour J."
};
