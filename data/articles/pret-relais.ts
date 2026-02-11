
import { Article } from '../../types';

export const articleRelais: Article = {
  id: 'art-11',
  category: 'immo',
  categoryLabel: 'Immobilier',
  title: "Le prêt relais : acheter avant de vendre",
  excerpt: "Maîtrisez le mécanisme du financement de transition pour ne pas laisser passer le bien de vos rêves.",
  readTime: "12 min",
  image: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?auto=format&fit=crop&q=80&w=800",
  author: "Sarah D.",
  sections: [
    {
      id: 'mecanisme-relais',
      title: "Comment ça marche ?",
      type: 'text',
      content: "Le prêt relais est une avance de trésorerie consentie par la banque, représentant généralement 70% de la valeur nette du bien que vous mettez en vente. Vous ne remboursez que les intérêts durant la période de transition (1 à 2 ans)."
    },
    {
      id: 'risques-relais',
      title: "Les précautions à prendre",
      type: 'list',
      content: "Pour un prêt relais serein, suivez ces règles :",
      items: [
        "Avoir une estimation réaliste de son bien (par deux agences minimum).",
        "Privilégier le 'relais-rachat' pour n'avoir qu'une seule mensualité.",
        "Anticiper une marge de négociation de 10% sur le prix de vente."
      ]
    }
  ],
  expertTip: "Si votre bien n'est pas vendu sous 6 mois, envisagez une baisse de prix rapide pour éviter le stress de l'échéance du prêt."
};
