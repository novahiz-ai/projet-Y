
import { Article } from '../../types';

export const articleSenior: Article = {
  id: 'art-10',
  category: 'rachat',
  categoryLabel: 'Rachat',
  title: "Rachat de crédit senior : anticiper la retraite",
  excerpt: "Comment adapter ses mensualités à la baisse de revenus lors du passage à la retraite.",
  readTime: "10 min",
  image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800",
  author: "Équipe Younited",
  sections: [
    {
      id: 'transition-retraite',
      title: "Le défi de la baisse de revenus",
      type: 'text',
      content: "Le passage à la retraite s'accompagne souvent d'une baisse de revenus de 30% à 50%. Si les charges de crédits restent identiques, le reste à vivre peut devenir critique. Le rachat de crédit permet de lisser ces dettes sur une durée plus longue pour retrouver un équilibre financier sain."
    },
    {
      id: 'assurance-senior',
      title: "L'assurance : le point sensible",
      type: 'highlight',
      content: "Pour les seniors, le coût de l'assurance peut exploser. Younited propose des solutions adaptées où l'âge de fin de prêt peut aller jusqu'à 85 ans, avec des garanties sur-mesure."
    }
  ],
  expertTip: "Réalisez votre rachat 2 à 3 ans avant votre départ effectif à la retraite pour bénéficier de conditions basées sur vos revenus d'activité."
};
