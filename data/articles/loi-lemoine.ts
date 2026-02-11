
import { Article } from '../../types';

export const articleLemoine: Article = {
  id: 'art-6',
  category: 'assurance',
  categoryLabel: 'Protection',
  title: "Loi Lemoine : l'assurance emprunteur change",
  excerpt: "Comment changer d'assurance de prêt à tout moment et économiser sur votre crédit.",
  readTime: "9 min",
  image: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&q=80&w=800",
  author: "Sophie M.",
  sections: [
    {
      id: 'liberte-assurance',
      title: "La fin du monopole bancaire",
      type: 'text',
      content: "La Loi Lemoine de 2022 est un tournant historique pour les emprunteurs. Elle permet de résilier son assurance emprunteur n'importe quand, sans frais de sortie, et sans avoir à attendre la date anniversaire du contrat. Cette fluidité favorise une concurrence saine au bénéfice du pouvoir d'achat."
    },
    {
      id: 'trois-piliers',
      title: "Les avancées majeures de la loi",
      type: 'list',
      content: "La loi repose sur trois changements radicaux qui facilitent l'accès au crédit :",
      items: [
        "Résiliation infra-annuelle : Changez de contrat 365 jours par an.",
        "Suppression du questionnaire de santé : Pour les prêts < 200 000€ finissant avant 60 ans.",
        "Droit à l'oubli : Réduit de 10 à 5 ans pour les pathologies cancéreuses ou hépatites.",
        "Information annuelle : La banque doit rappeler chaque année votre droit au changement."
      ]
    },
    {
      id: 'regle-equivalence',
      title: "La notion d'équivalence de garanties",
      type: 'highlight',
      content: "Le seul motif légal pour une banque de refuser votre nouvelle assurance est le non-respect de l'équivalence des garanties. Le nouveau contrat doit vous protéger aussi bien que l'ancien sur des points clés (décès, invalidité, incapacité)."
    },
    {
      id: 'demarche-pratique',
      title: "Comment procéder au changement ?",
      type: 'text',
      content: "La démarche est simple : vous choisissez votre nouveau contrat, vous l'envoyez à votre banque par lettre recommandée, et celle-ci dispose de 10 jours ouvrés pour valider ou justifier d'un refus. Younited peut vous accompagner dans cette démarche pour simplifier les échanges administratifs."
    }
  ],
  expertTip: "Sur un prêt immo de 200 000€, le changement d'assurance peut générer entre 10 000€ et 25 000€ d'économies sur la durée restante. C'est souvent l'opération financière la plus rentable de l'année."
};
