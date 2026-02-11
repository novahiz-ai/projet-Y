
import { Article } from '../../types';

export const articleRachat: Article = {
  id: 'art-5',
  category: 'rachat',
  categoryLabel: 'Gestion',
  title: "Rachat de crédits : quand sauter le pas ?",
  excerpt: "Analysez si le regroupement de vos prêts est avantageux pour votre budget mensuel.",
  readTime: "11 min",
  image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
  author: "Équipe Younited",
  sections: [
    {
      id: 'mecanisme-rachat',
      title: "Comment fonctionne le regroupement ?",
      type: 'text',
      content: "Le rachat de crédit consiste à faire racheter tout ou partie de ses dettes par un nouvel organisme. Ce dernier solde vos anciens comptes et met en place un contrat unique. L'avantage principal est de n'avoir plus qu'un seul interlocuteur et une seule échéance, souvent calculée pour être plus supportable au quotidien."
    },
    {
      id: 'avantages-cles',
      title: "Les bénéfices pour votre budget",
      type: 'list',
      content: "Le regroupement est une solution de gestion de trésorerie qui offre plusieurs leviers :",
      items: [
        "Baisse immédiate de la mensualité globale (jusqu'à -60%).",
        "Simplification de la gestion bancaire (un seul prélèvement).",
        "Possibilité d'inclure une enveloppe de trésorerie pour un nouveau projet.",
        "Ajustement de la durée de remboursement à votre situation actuelle."
      ]
    },
    {
      id: 'points-vigilance',
      title: "L'allongement de la durée : un coût",
      type: 'highlight',
      content: "Attention : en abaissant votre mensualité, vous augmentez mécaniquement la durée de votre prêt. Cela signifie que le coût total du crédit sera plus élevé. Le rachat est un arbitrage entre confort mensuel immédiat et coût global à long terme."
    },
    {
      id: 'eligibilite-rachat',
      title: "Qui peut prétendre au rachat ?",
      type: 'text',
      content: "Le rachat est ouvert aux locataires comme aux propriétaires. Pour les propriétaires, il est possible de réaliser un rachat 'hypothécaire' qui inclut le prêt immobilier, permettant d'obtenir des taux très bas et des durées plus longues."
    }
  ],
  expertTip: "N'attendez pas d'être en situation d'impayé pour solliciter un rachat. Les banques préfèrent les profils prévoyants qui souhaitent simplement optimiser leur gestion."
};
