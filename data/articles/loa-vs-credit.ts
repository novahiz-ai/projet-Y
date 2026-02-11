
import { Article } from '../../types';

export const articleLoa: Article = {
  id: 'art-12',
  category: 'auto',
  categoryLabel: 'Auto',
  title: "LOA vs Crédit Classique : le match",
  excerpt: "Quelle formule choisir pour votre prochain véhicule ? Analyse des coûts réels.",
  readTime: "11 min",
  image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
  author: "Marc L.",
  sections: [
    {
      id: 'choisir-usage',
      title: "Une question d'usage ou de propriété ?",
      type: 'text',
      content: "Le crédit classique fait de vous le propriétaire immédiat. La LOA (Location avec Option d'Achat) vous rend locataire avec une promesse de vente. Si vous changez de voiture tous les 3 ans, la LOA est attractive. Si vous gardez votre véhicule 10 ans, le crédit est imbattable."
    },
    {
      id: 'cout-cache',
      title: "Attention aux frais de remise en état",
      type: 'highlight',
      content: "En LOA, la moindre rayure lors de la restitution peut coûter très cher. Le crédit auto Younited vous laisse libre de l'entretien et des kilomètres parcourus."
    }
  ],
  expertTip: "Comparez toujours le coût total (Apport + Somme des loyers + Option d'achat) au coût total d'un crédit auto classique."
};
