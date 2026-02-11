
import { common } from './sv/common';
import { landing } from './sv/pages/landing';
import { loans } from './sv/pages/loans';
import { insurance } from './sv/pages/insurance';
import { simulator } from './sv/pages/simulator';
import { glossary } from './sv/glossary';
import { legal } from './sv/pages/legal';
import { info } from './sv/pages/info';
import { guide } from './sv/pages/guide';

export const sv = {
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
