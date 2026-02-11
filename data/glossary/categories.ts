
export interface GlossaryCategory {
  id: string;
  label: string;
  description: string;
  color: string;
}

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  { id: 'credit', label: 'Crédit & Taux', description: 'Tout sur les mécanismes de prêt.', color: 'text-blue-500' },
  { id: 'immo', label: 'Immobilier', description: 'Termes spécifiques à l’achat de pierre.', color: 'text-rose-500' },
  { id: 'juridique', label: 'Réglementation', description: 'Le cadre légal protecteur.', color: 'text-amber-500' },
  { id: 'assurance', label: 'Assurance', description: 'La protection de votre emprunt.', color: 'text-indigo-500' },
  { id: 'gestion', label: 'Gestion Budget', description: 'Calculer sa santé financière.', color: 'text-emerald-500' }
];
