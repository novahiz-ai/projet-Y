
import { Article } from '../../types';

export const articleEtudiant: Article = {
  id: 'art-14',
  category: 'projet',
  categoryLabel: 'Projet',
  title: "Le prêt étudiant : investir dans son avenir",
  excerpt: "Financer ses études, son logement et sa vie quotidienne avec un remboursement différé.",
  readTime: "9 min",
  image: "https://images.unsplash.com/photo-1523050338392-06ba54431b7f?auto=format&fit=crop&q=80&w=800",
  author: "Léa R.",
  sections: [
    {
      id: 'differe-paiement',
      title: "Le mécanisme du différé",
      type: 'text',
      content: "Le prêt étudiant permet de ne commencer à rembourser le capital qu'une fois ses études terminées et son premier emploi décroché. C'est la solution idéale pour se concentrer sur sa réussite académique sans pression financière immédiate."
    },
    {
      id: 'garanties-etat',
      title: "Le prêt garanti par l'État",
      type: 'highlight',
      content: "Si vous n'avez pas de garant familial, l'État peut se porter caution via Bpifrance (sous réserve de quotas annuels par banque)."
    }
  ],
  expertTip: "N'empruntez que le strict nécessaire. Un prêt étudiant reste une dette qui amputera votre premier salaire."
};
