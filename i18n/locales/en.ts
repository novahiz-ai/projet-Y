
import { common } from './en/common';
import { landing } from './en/pages/landing';
import { loans } from './en/pages/loans';
import { insurance } from './en/pages/insurance';
import { simulator } from './en/pages/simulator';
import { glossary } from './en/glossary';
import { legal } from './en/pages/legal';
import { info } from './en/pages/info';
import { guide } from './en/pages/guide';

export const en = {
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
