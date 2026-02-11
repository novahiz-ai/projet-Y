import { common } from './ar/common';
import { landing } from './ar/pages/landing';
import { loans } from './ar/pages/loans';
import { insurance } from './ar/pages/insurance';
import { simulator } from './ar/pages/simulator';
import { glossary } from './ar/glossary';
import { legal } from './ar/pages/legal';
import { info } from './ar/pages/info';

export const ar = {
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
  }
};