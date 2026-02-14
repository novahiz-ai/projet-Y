import { common } from './uk/common';
import { landing } from './uk/pages/landing';
import { loans as loansData } from './uk/pages/loans';

const loans = loansData as any;

export const uk = {
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
    offers_data: loans.offers_data
  }
};