
import { common } from './de/common';
import { landing } from './de/pages/landing';
import { loans } from './de/pages/loans';
import { insurance } from './de/pages/insurance';
import { simulator } from './de/pages/simulator';
import { glossary } from './de/glossary';
import { legal } from './de/pages/legal';
import { info } from './de/pages/info';
import { guide } from './de/pages/guide';

export const de = {
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
