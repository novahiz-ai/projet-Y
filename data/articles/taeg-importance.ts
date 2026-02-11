
import { Article } from '../../types';

export const articleTaeg: Article = {
  id: 'art-4',
  category: 'perso',
  categoryLabel: 'Conseil',
  title: "Prêt personnel : l'importance du TAEG",
  excerpt: "Apprenez à comparer les offres de crédit en regardant les bons indicateurs de coût.",
  readTime: "8 min",
  image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
  author: "Julien V.",
  sections: [
    {
      id: 'taeg-nominal',
      title: "TAEG vs Taux Nominal : Ne vous trompez pas",
      type: 'text',
      content: "Le taux nominal n'est que la partie émergée de l'iceberg. Il ne représente que les intérêts purs. Le TAEG (Taux Annuel Effectif Global), lui, est l'indicateur 'tout compris'. Il est obligatoire dans toutes les offres de crédit à la consommation et immobilier en France."
    },
    {
      id: 'compo-taeg',
      title: "Que contient réellement le TAEG ?",
      type: 'list',
      content: "Pour être transparent, le TAEG agglomère l'ensemble des frais liés à l'obtention du prêt :",
      items: [
        "Les intérêts bancaires calculés sur le taux nominal.",
        "Les frais de dossier ou commissions d'intervention.",
        "Le coût de l'assurance emprunteur (si celle-ci est obligatoire pour l'offre).",
        "Les frais de garantie (caution ou hypothèque).",
        "Les frais d'ouverture et de tenue de compte si nécessaire."
      ]
    },
    {
      id: 'seuil-usure',
      title: "Le Taux d'Usure : Votre garde-fou",
      type: 'highlight',
      content: "Le taux d'usure est le TAEG maximal qu'un prêteur est autorisé à pratiquer. Fixé par la Banque de France chaque trimestre, il protège les emprunteurs contre des taux abusifs. Aucune offre ne peut légalement dépasser ce seuil."
    },
    {
      id: 'cout-total',
      title: "Regarder le coût total, l'autre réflexe",
      type: 'text',
      content: "Au-delà du taux, vérifiez toujours le 'Coût total du crédit'. C'est la somme exacte que vous aurez remboursée en plus du capital emprunté. C'est l'indicateur le plus parlant pour votre budget sur la durée."
    }
  ],
  expertTip: "Certaines banques affichent un taux d'appel très bas mais imposent une assurance facultative hors TAEG très onéreuse. Réintégrez toujours l'assurance dans vos calculs de comparaison."
};
