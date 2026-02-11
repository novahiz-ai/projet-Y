
import { common } from './es/common';
import { landing } from './es/pages/landing';
import { loans } from './es/pages/loans';
import { insurance } from './es/pages/insurance';
import { simulator } from './es/pages/simulator';
import { glossary } from './es/glossary';
import { legal } from './es/pages/legal';
import { info } from './es/pages/info';
import { guide } from './es/pages/guide';

export const es = {
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
