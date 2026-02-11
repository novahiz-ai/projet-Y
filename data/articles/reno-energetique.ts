
import { Article } from '../../types';

export const articleReno: Article = {
  id: 'art-3',
  category: 'travaux',
  categoryLabel: 'Habitat',
  title: "Rénovation énergétique : les aides cumulables",
  excerpt: "MaPrimeRénov, Eco-PTZ... Découvrez comment financer vos travaux d'isolation efficacement.",
  readTime: "12 min",
  image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
  author: "Sarah D.",
  sections: [
    {
      id: 'enjeux-climat',
      title: "Valoriser son bien par la performance",
      type: 'text',
      content: "L'étiquette énergétique (DPE) est devenue le critère majeur du marché immobilier. Un logement classé F ou G (passoire thermique) subit une décote importante. Rénover, c'est donc à la fois réduire ses factures et protéger la valeur de son capital."
    },
    {
      id: 'maprimerenov-2024',
      title: "MaPrimeRénov' : Le nouveau barème",
      type: 'list',
      content: "Depuis le 1er janvier 2024, le dispositif s'articule autour de deux parcours :",
      items: [
        "Parcours Décarbonation : Pour changer son mode de chauffage par une pompe à chaleur.",
        "Parcours Rénovation d'ampleur : Pour un gain de 2 classes énergétiques minimum (ex: E vers C).",
        "Accompagnateur Rénov' : Un tiers de confiance désormais obligatoire pour les gros chantiers.",
        "Aides CEE : Primes versées par les fournisseurs d'énergie, cumulables avec MaPrimeRénov'."
      ]
    },
    {
      id: 'ecoptz-financement',
      title: "L'Eco-PTZ : Le prêt à taux zéro",
      type: 'highlight',
      content: "Pour financer le 'reste à charge' après les primes, l'Eco-Prêt à Taux Zéro est l'outil idéal. Il permet d'emprunter jusqu'à 50 000€ sur 20 ans sans payer d'intérêts, à condition que les travaux soient réalisés par des entreprises RGE."
    },
    {
      id: 'audit-prealable',
      title: "L'audit énergétique : La boussole des travaux",
      type: 'text',
      content: "Avant de lancer les devis, réalisez un audit. Il permet de prioriser les interventions : isoler la toiture et les murs est souvent plus efficace que de simplement changer les fenêtres. C'est cet audit qui valide l'accès aux aides les plus importantes."
    }
  ],
  expertTip: "Ne signez aucun devis avant d'avoir reçu l'accord écrit de MaPrimeRénov'. Les aides ne sont jamais rétroactives."
};
