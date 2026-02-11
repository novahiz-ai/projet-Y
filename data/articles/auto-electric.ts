
import { Article } from '../../types';

export const articleAuto: Article = {
  id: 'art-2',
  category: 'auto',
  categoryLabel: 'Mobilité',
  title: "Comment financer sa voiture électrique ?",
  excerpt: "Les aides de l'État et les solutions de financement adaptées aux véhicules propres en 2024.",
  readTime: "10 min",
  image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
  author: "Marc L.",
  sections: [
    {
      id: 'transition-marche',
      title: "Le virage de la mobilité propre",
      type: 'text',
      content: "En 2024, le marché de l'automobile subit une mutation profonde. Avec la fin programmée des moteurs thermiques en 2035, l'achat d'un véhicule électrique n'est plus un luxe mais un investissement stratégique pour préserver la valeur de revente de son patrimoine mobile."
    },
    {
      id: 'bonus-ecologique',
      title: "Bonus Écologique et Prime à la conversion",
      type: 'list',
      content: "L'État soutient massivement l'achat de véhicules à faibles émissions. Voici les aides actuelles :",
      items: [
        "Bonus Écologique : Jusqu'à 4 000€ pour les particuliers (soumis à conditions de prix et de score environnemental).",
        "Prime à la Conversion : Pour le retrait d'un vieux véhicule diesel ou essence.",
        "Le 'Leasing Social' : Une offre d'État pour les ménages modestes à partir de 100€/mois.",
        "Le Micro-crédit véhicule propre : Garanti par l'État pour faciliter l'accès au crédit."
      ]
    },
    {
      id: 'bornes-recharge',
      title: "Financer la borne de recharge",
      type: 'highlight',
      content: "L'installation d'une borne à domicile (Wallbox) est éligible à un crédit d'impôt de 75% du montant des dépenses (limité à 500€). Pensez à inclure le coût restant dans votre demande de prêt travaux ou auto."
    },
    {
      id: 'cout-usage',
      title: "Le calcul du TCO (Total Cost of Ownership)",
      type: 'text',
      content: "Si le prix d'achat d'une électrique est supérieur, son coût total de possession est souvent inférieur. Entre l'absence de vidange, de courroie de distribution et le prix du 'plein' électrique divisé par 4 par rapport à l'essence, l'amortissement du crédit est plus facile au quotidien."
    }
  ],
  expertTip: "Vérifiez si votre employeur propose des aides à la mobilité douce ou des forfaits de recharge gratuite. Cela peut influencer votre capacité de remboursement mensuelle."
};
