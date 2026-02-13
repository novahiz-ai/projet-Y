import { TFunction } from 'i18next';

export interface FAQItem {
  id: number;
  category: 'general' | 'conso' | 'perso' | 'auto' | 'travaux' | 'rapide' | 'rachat' | 'immo' | 'assurance' | 'projet';
  question: string;
  answer: string;
  usefulCount: number;
}

export const getFaqData = (t: TFunction): FAQItem[] => [
  { 
    id: 1, 
    category: 'general', 
    question: "Quels sont les délais réels pour recevoir les fonds ?", 
    answer: "Chez Younited, une fois votre demande validée et acceptée définitivement, les fonds sont virés sous 48h ouvrées. Notez que ce délai court après l'expiration du délai légal de rétractation de 14 jours (réductible à 7 jours sur demande pour certains projets).", 
    usefulCount: 2450 
  },
  { 
    id: 2, 
    category: 'general', 
    question: "Comment fonctionne la signature électronique ?", 
    answer: "Nous utilisons la technologie de signature certifiée eIDAS. Vous recevez un code par SMS pour valider votre contrat en ligne. C'est 100% sécurisé, juridiquement contraignant et cela vous évite tout envoi postal.", 
    usefulCount: 1890 
  },
  { 
    id: 50, 
    category: 'rapide', 
    question: "Qu'est-ce que l'analyse par Open Banking ?", 
    answer: "L'Open Banking permet de connecter vos comptes bancaires de manière sécurisée (protocole DSP2). Cela remplace l'envoi manuel de vos relevés de compte. Younited analyse vos flux instantanément pour vous donner un accord définitif bien plus rapide.", 
    usefulCount: 3200 
  },
  { 
    id: 3, 
    category: 'general', 
    question: "Puis-je modifier ma mensualité en cours de prêt ?", 
    answer: "Oui, après 6 mois de remboursement sans incident, vous pouvez demander une modulation de vos échéances depuis votre espace client. Cette opération peut entraîner une modification de la durée totale de votre crédit.", 
    usefulCount: 1560 
  },
  { 
    id: 4, 
    category: 'conso', 
    question: "Dois-je changer de banque pour obtenir un prêt ?", 
    answer: "Absolument pas. Younited est un établissement indépendant. Vous conservez votre banque actuelle, et nous effectuons les prélèvements et versements directement sur votre RIB habituel.", 
    usefulCount: 1200 
  },
  { 
    id: 10, 
    category: 'auto', 
    question: "Puis-je acheter mon véhicule à un particulier ?", 
    answer: "Oui, notre prêt auto couvre aussi bien les achats en concession que les transactions entre particuliers. Un simple certificat de cession ou une facture pro-forma pourra vous être demandé selon le montant.", 
    usefulCount: 980 
  },
  { 
    id: 20, 
    category: 'travaux', 
    question: "Quels travaux sont éligibles à l'Eco-PTZ ?", 
    answer: "L'Eco-Prêt à Taux Zéro concerne les travaux de rénovation énergétique : isolation des combles, changement de système de chauffage (pompe à chaleur), isolation des murs ou remplacement des fenêtres par du double vitrage. L'entreprise doit être certifiée RGE.", 
    usefulCount: 1450 
  },
  { 
    id: 40, 
    category: 'rachat', 
    question: "Le rachat de crédit inclut-il mon découvert bancaire ?", 
    answer: "Oui, le regroupement de crédits peut englober vos prêts conso, auto, mais aussi vos découverts bancaires et dettes personnelles pour tout lisser en une seule mensualité plus faible.", 
    usefulCount: 1100 
  },
  { 
    id: 60, 
    category: 'assurance', 
    question: "L'assurance Younited couvre-t-elle la perte d'emploi ?", 
    answer: "Nous proposons une garantie Perte d'Emploi optionnelle. Elle prend en charge tout ou partie de vos mensualités en cas de licenciement économique. Vérifiez les conditions de carence et de franchise dans votre contrat.", 
    usefulCount: 850 
  },
  { 
    id: 70, 
    category: 'projet', 
    question: "Est-il possible de financer un tour du monde ?", 
    answer: "Parfaitement. Le prêt projet Younited est conçu pour ce type d'aventure. Vous disposez de la somme librement sans avoir à justifier chaque ticket d'avion ou réservation d'hôtel.", 
    usefulCount: 720 
  }
];