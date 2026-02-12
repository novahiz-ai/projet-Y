
import { TFunction } from 'i18next';

export const getCreditLinks = (t: TFunction) => [
  { id: 'perso', name: t('offers_data.perso.title'), desc: "Projets libres, sans justificatif", path: "/offres/perso" },
  { id: 'auto', name: t('offers_data.auto.title'), desc: "Véhicules neufs ou occasions", path: "/offres/auto" },
  { id: 'travaux', name: t('offers_data.travaux.title'), desc: "Rénovation et décoration", path: "/offres/travaux" },
  { id: 'projet', name: t('offers_data.projet.title'), desc: "Réalisation de vos projets de vie", path: "/offres/projet" },
  { id: 'conso', name: t('offers_data.conso.title'), desc: "Équipement et loisirs", path: "/offres/conso" },
  { id: 'rachat', name: t('offers_data.rachat.title'), desc: "Regroupement de mensualités", path: "/offres/rachat" },
  { id: 'immo', name: t('offers_data.immo.title'), desc: "Acquisition immobilière", path: "/offres/immo" }
];

export const getResourceLinks = (t: TFunction) => [
  { id: 'help', name: t('nav.resources_menu.help_label'), desc: t('nav.resources_menu.help_desc'), path: "/aide" },
  { id: 'guide', name: t('nav.resources_menu.guide_label'), desc: t('nav.resources_menu.guide_desc'), path: "/guide" },
  { id: 'glossary', name: t('nav.resources_menu.glossary_label'), desc: t('nav.resources_menu.glossary_desc'), path: "/glossaire" }
];

export const getFooterLegalLinks = (t: TFunction) => [
  { label: t('footer.legal'), path: "/mentions-legales" },
  { label: t('footer.privacy'), path: "/confidentialite" },
  { label: t('footer.cookies'), path: "/cookies" }
];
