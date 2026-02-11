
import { TFunction } from 'i18next';

export interface FAQItem {
  id: number;
  category: 'general' | 'conso' | 'perso' | 'auto' | 'travaux' | 'rapide' | 'rachat' | 'immo' | 'assurance' | 'projet';
  question: string;
  answer: string;
  usefulCount: number;
}

export const getFaqData = (t: TFunction): FAQItem[] => [
  { 
    id: 1, 
    category: 'general', 
    question: t('help.faq_1_q'), 
    answer: t('help.faq_1_a'), 
    usefulCount: 1240 
  },
  { 
    id: 2, 
    category: 'general', 
    question: t('help.faq_2_q'), 
    answer: t('help.faq_2_a'), 
    usefulCount: 850 
  },
  { 
    id: 3, 
    category: 'general', 
    question: t('help.faq_3_q'), 
    answer: t('help.faq_3_a'), 
    usefulCount: 2100 
  },
  { 
    id: 4, 
    category: 'conso', 
    question: t('help.faq_4_q'), 
    answer: t('help.faq_4_a'), 
    usefulCount: 620 
  },
  { 
    id: 5, 
    category: 'perso', 
    question: t('help.faq_5_q'), 
    answer: t('help.faq_5_a'), 
    usefulCount: 430 
  },
  { 
    id: 10, 
    category: 'auto', 
    question: t('help.faq_10_q'), 
    answer: t('help.faq_10_a'), 
    usefulCount: 890 
  },
  { 
    id: 11, 
    category: 'auto', 
    question: t('help.faq_11_q'), 
    answer: t('help.faq_11_a'), 
    usefulCount: 310 
  },
  { 
    id: 20, 
    category: 'travaux', 
    question: t('help.faq_20_q'), 
    answer: t('help.faq_20_a'), 
    usefulCount: 980 
  },
  { 
    id: 21, 
    category: 'travaux', 
    question: t('help.faq_21_q'), 
    answer: t('help.faq_21_a'), 
    usefulCount: 540 
  },
  { 
    id: 30, 
    category: 'immo', 
    question: t('help.faq_30_q'), 
    answer: t('help.faq_30_a'), 
    usefulCount: 1560 
  },
  { 
    id: 40, 
    category: 'rachat', 
    question: t('help.faq_40_q'), 
    answer: t('help.faq_40_a'), 
    usefulCount: 720 
  },
  { 
    id: 50, 
    category: 'rapide', 
    question: t('help.faq_50_q'), 
    answer: t('help.faq_50_a'), 
    usefulCount: 1100 
  },
  { 
    id: 60, 
    category: 'assurance', 
    question: t('help.faq_60_q'), 
    answer: t('help.faq_60_a'), 
    usefulCount: 880 
  },
  { 
    id: 70, 
    category: 'projet', 
    question: t('help.faq_70_q'), 
    answer: t('help.faq_70_a'), 
    usefulCount: 340 
  }
];
