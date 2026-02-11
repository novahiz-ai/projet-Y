
import { Article } from '../../types';

export const articleRenouvelable: Article = {
  id: 'art-9',
  category: 'conso',
  categoryLabel: 'Consommation',
  title: "Crédit renouvelable vs Prêt personnel",
  excerpt: "Comprendre les différences majeures pour choisir le financement le plus adapté à votre besoin.",
  readTime: "9 min",
  image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
  author: "Équipe Younited",
  sections: [
    {
      id: 'fonctionnement-different',
      title: "Deux philosophies de crédit",
      type: 'text',
      content: "Le prêt personnel est amortissable : vous recevez une somme fixe et la remboursez sur une durée définie. Le crédit renouvelable (ou revolving) est une réserve d'argent disponible en permanence que vous utilisez et reconstituez au fil de vos remboursements."
    },
    {
      id: 'tableau-comparatif',
      title: "Comment choisir ?",
      type: 'list',
      content: "Le choix dépend de la nature de votre projet :",
      items: [
        "Prêt Personnel : Idéal pour un achat précis (voiture, travaux, mariage). Taux généralement plus bas.",
        "Crédit Renouvelable : Adapté aux petits besoins imprévus et récurrents. Taux souvent plus élevés.",
        "Younited privilégie le prêt personnel amortissable pour sa transparence et sa sécurité."
      ]
    }
  ],
  expertTip: "Pour tout achat supérieur à 1000€, le prêt personnel est quasi systématiquement plus économique que le crédit renouvelable."
};
