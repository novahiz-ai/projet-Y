import { common } from './ro/common';
import { landing } from './ro/pages/landing';
import { loans as loansData } from './ro/pages/loans';
import { simulator } from './ro/pages/simulator';

const loans = loansData as any;

export const ro = {
  common: {
    ...common,
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
    simulator: simulator
  }
};