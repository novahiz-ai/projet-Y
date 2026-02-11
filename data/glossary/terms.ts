
import { TFunction } from 'i18next';

export interface ExtendedGlossaryTerm {
  term: string;
  definition: string;
  category: string;
  categoryId: string;
  letter: string;
  proTip?: string;
  isFeatured?: boolean;
}

export const getGlossaryTerms = (t: TFunction): ExtendedGlossaryTerm[] => [
  {
    term: t('glossary.terms.taeg.t'),
    definition: t('glossary.terms.taeg.d'),
    category: t('glossary.categories.credit'),
    categoryId: "credit",
    letter: "T",
    isFeatured: true,
    proTip: t('glossary.terms.taeg.tip')
  },
  {
    term: t('glossary.terms.amort.t'),
    definition: t('glossary.terms.amort.d'),
    category: t('glossary.categories.credit'),
    categoryId: "credit",
    letter: "A",
  },
  {
    term: t('glossary.terms.reste.t'),
    definition: t('glossary.terms.reste.d'),
    category: t('glossary.categories.gestion'),
    categoryId: "gestion",
    letter: "R",
    proTip: t('glossary.terms.reste.tip')
  },
  {
    term: t('glossary.terms.apport.t'),
    definition: t('glossary.terms.apport.d'),
    category: t('glossary.categories.immo'),
    categoryId: "immo",
    letter: "A",
  },
  {
    term: t('glossary.terms.capacite.t'),
    definition: t('glossary.terms.capacite.d'),
    category: t('glossary.categories.gestion'),
    categoryId: "gestion",
    letter: "C",
  },
  {
    term: t('glossary.terms.coemprunteur.t'),
    definition: t('glossary.terms.coemprunteur.d'),
    category: t('glossary.categories.credit'),
    categoryId: "credit",
    letter: "C",
  },
  {
    term: t('glossary.terms.retractation.t'),
    definition: t('glossary.terms.retractation.d'),
    category: t('glossary.categories.juridique'),
    categoryId: "juridique",
    letter: "R",
  },
  {
    term: t('glossary.terms.echeance.t'),
    definition: t('glossary.terms.echeance.d'),
    category: t('glossary.categories.gestion'),
    categoryId: "gestion",
    letter: "E",
  },
  {
    term: t('glossary.terms.frais.t'),
    definition: t('glossary.terms.frais.d'),
    category: t('glossary.categories.credit'),
    categoryId: "credit",
    letter: "F",
  },
  {
    term: t('glossary.terms.hypotheque.t'),
    definition: t('glossary.terms.hypotheque.d'),
    category: t('glossary.categories.immo'),
    categoryId: "immo",
    letter: "H",
  },
  {
    term: t('glossary.terms.tableau.t'),
    definition: t('glossary.terms.tableau.d'),
    category: t('glossary.categories.credit'),
    categoryId: "credit",
    letter: "T",
  },
  {
    term: t('glossary.terms.nominal.t'),
    definition: t('glossary.terms.nominal.d'),
    category: t('glossary.categories.credit'),
    categoryId: "credit",
    letter: "T",
  },
  {
    term: t('glossary.terms.quotite.t'),
    definition: t('glossary.terms.quotite.d'),
    category: t('glossary.categories.assurance'),
    categoryId: "assurance",
    letter: "Q",
  },
  {
    term: t('glossary.terms.liasse.t'),
    definition: t('glossary.terms.liasse.d'),
    category: t('glossary.categories.juridique'),
    categoryId: "juridique",
    letter: "L",
  },
  {
    term: t('glossary.terms.scoring.t'),
    definition: t('glossary.terms.scoring.d'),
    category: t('glossary.categories.gestion'),
    categoryId: "gestion",
    letter: "S",
    proTip: t('glossary.terms.scoring.tip')
  }
];
