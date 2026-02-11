
import { common } from './it/common';
import { landing } from './it/pages/landing';
// Fix: Use a temporary variable to cast the loans export to any to avoid property access errors since the source data might be partial
import { loans as loansData } from './it/pages/loans';
import { insurance } from './it/pages/insurance';
import { simulator } from './it/pages/simulator';
import { glossary } from './it/glossary';
import { legal } from './it/pages/legal';
import { info } from './it/pages/info';
import { guide } from './it/pages/guide';

const loans = loansData as any;

export const it = {
  common: {
    ...common,
    ...legal,
    ...info,
    landing: landing,
    testimonials_data: landing.testimonials,
    prefooter: landing.prefooter,
    personal_loan: loans.personal,
    consumer_loan: loans.consumer,
    auto_loan: loans.auto,
    travaux: loans.travaux,
    project_loan: loans.projet,
    fast_loan: loans.fast,
    refinancing_loan: loans.refinancing,
    mortgage: loans.mortgage,
    eligibility: loans.eligibility,
    projects_grid: loans.projects_grid,
    offers: loans.offers_list,
    offers_data: loans.offers_data,
    insurance: insurance,
    simulator: simulator,
    glossary: glossary
  },
  guide: guide
};
