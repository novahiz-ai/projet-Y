
import { TFunction } from 'i18next';

export const getCreditLinks = (t: TFunction) => [
  { id: 'perso', name: "Emprunt", desc: "Besoin de trésorerie immédiate", path: "/offres/perso", icon: "User" },
  { id: 'auto', name: t('offers_data.auto.title'), desc: "Véhicules neufs ou occasions", path: "/offres/auto", icon: "Car" },
  { id: 'travaux', name: t('offers_data.travaux.title'), desc: "Rénovation et décoration", path: "/offres/travaux", icon: "Home" },
  { id: 'projet', name: "Financement de projet", desc: "Mariage, voyage, études", path: "/offres/projet", icon: "Lightbulb" },
  { id: 'conso', name: t('offers_data.conso.title'), desc: "Équipement et loisirs", path: "/offres/conso", icon: "ShoppingBag" },
  { id: 'rachat', name: t('offers_data.rachat.title'), desc: "Regroupement de mensualités", path: "/offres/rachat", icon: "Layers" },
  { id: 'immo', name: t('offers_data.immo.title'), desc: "Acquisition immobilière", path: "/offres/immo", icon: "Building" },
  { id: 'assurance', name: "Assurance", desc: "Protection de vos proches", path: "/offres/assurance", icon: "ShieldCheck" }
];

export const getResourceLinks = (t: TFunction) => [
  { id: 'help', name: t('nav.resources_menu.help_label'), desc: t('nav.resources_menu.help_desc'), path: "/aide", icon: "HelpCircle" },
  { id: 'guide', name: t('nav.resources_menu.guide_label'), desc: t('nav.resources_menu.guide_desc'), path: "/guide", icon: "BookOpen" },
  { id: 'glossary', name: t('nav.resources_menu.glossary_label'), desc: t('nav.resources_menu.glossary_desc'), path: "/glossaire", icon: "SpellCheck" }
];

export const getFooterLegalLinks = (t: TFunction) => [
  { label: t('footer.legal'), path: "/mentions-legales" },
  { label: t('footer.privacy'), path: "/confidentialite" },
  { label: t('footer.cookies'), path: "/cookies" }
];
