
import { Article } from '../../types';

export const articleAssuranceFac: Article = {
  id: 'art-15',
  category: 'assurance',
  categoryLabel: 'Assurance',
  title: "Décryptage des garanties d'assurance facultatives",
  excerpt: "Perte d'emploi, incapacité de travail... Quelles options valent vraiment le coût ?",
  readTime: "10 min",
  image: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=800",
  author: "Équipe Younited",
  sections: [
    {
      id: 'garantie-chomage',
      title: "La garantie Perte d'Emploi",
      type: 'text',
      content: "Souvent la plus coûteuse, elle prend le relais de vos mensualités en cas de licenciement économique. Vérifiez bien les délais de carence (souvent 6 à 12 mois) avant de souscrire."
    },
    {
      id: 'invalidite-partielle',
      title: "IPP et ITT : les nuances",
      type: 'list',
      content: "Il est crucial de distinguer ces deux garanties :",
      items: [
        "ITT : Incapacité Temporaire Totale (arrêt de travail classique).",
        "IPP : Invalidité Permanente Partielle (taux d'invalidité entre 33% et 66%).",
        "Maintien de salaire : Vérifiez si votre prévoyance entreprise ne couvre pas déjà ces risques."
      ]
    }
  ],
  expertTip: "Relisez la notice d'assurance sur les 'exclusions' (mal de dos, dépression) qui représentent 80% des refus d'indemnisation."
};
