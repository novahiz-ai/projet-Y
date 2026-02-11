
import { Article } from '../../types';

export const articleImmo: Article = {
  id: 'art-1',
  category: 'immo',
  categoryLabel: 'Immobilier',
  title: "Le prêt immobilier expliqué : Guide complet 2024",
  excerpt: "Tout ce qu'il faut savoir avant de signer votre offre de prêt. Des frais de notaire à la capacité d'emprunt.",
  readTime: "15 min",
  image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
  author: "Équipe Younited",
  isFeatured: true,
  sections: [
    {
      id: 'bases-immo',
      title: "Comprendre les piliers de l'emprunt",
      type: 'text',
      content: "L'emprunt immobilier est un contrat de longue durée. En 2024, il repose sur quatre piliers fondamentaux : le capital emprunté, le taux d'intérêt (qui rémunère le prêteur), l'assurance emprunteur (qui sécurise le remboursement) et les garanties. Maîtriser ces notions est le premier pas vers une négociation réussie."
    },
    {
      id: 'dossier-solide',
      title: "Les secrets d'un dossier bancaire béton",
      type: 'list',
      content: "Les critères d'octroi se sont durcis. Pour séduire les analystes, votre dossier doit démontrer une stabilité financière irréprochable :",
      items: [
        "Un apport personnel couvrant au moins les frais de notaire (environ 10%).",
        "Un taux d'endettement strictement inférieur à 35% de vos revenus nets.",
        "Une épargne de précaution résiduelle après l'achat (le 'reste à vivre').",
        "Une gestion de comptes saine : aucun découvert sur les 6 derniers mois.",
        "Une situation professionnelle stable (CDI ou 3 ans d'activité non salariée)."
      ]
    },
    {
      id: 'frais-notaire-detail',
      title: "La vérité sur les frais de notaire",
      type: 'highlight',
      content: "Appelés à tort 'frais de notaire', il s'agit principalement de droits de mutation perçus par l'État. Comptez 7 à 8% pour un logement ancien et 2 à 3% pour une construction neuve. Younited conseille d'anticiper ces frais dès le calcul de votre capacité d'emprunt."
    },
    {
      id: 'assurance-delegation',
      title: "L'assurance emprunteur : le levier d'économie",
      type: 'text',
      content: "Trop souvent négligée, l'assurance peut représenter jusqu'à un tiers du coût total du crédit. Grâce à la délégation d'assurance, vous n'êtes plus obligé de souscrire au contrat groupe de votre banque. Choisir un assureur externe peut vous faire économiser des milliers d'euros sur la durée totale du prêt."
    },
    {
      id: 'compromis-signature',
      title: "Du compromis à la remise des clés",
      type: 'list',
      content: "Le parcours de l'acheteur est balisé par des étapes juridiques strictes :",
      items: [
        "Signature du compromis ou de la promesse de vente devant notaire.",
        "Délai de rétractation légal de 10 jours pour l'acheteur.",
        "Obtention de l'offre de prêt (généralement sous 45 à 60 jours).",
        "Délai de réflexion obligatoire de 11 jours avant acceptation de l'offre.",
        "Signature de l'acte authentique et déblocage des fonds."
      ]
    }
  ],
  expertTip: "Ne signez jamais un compromis sans avoir une simulation bancaire récente de moins d'un mois. Les taux bougent vite, votre capacité d'achat aussi."
};
