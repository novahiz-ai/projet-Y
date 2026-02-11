import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { fr } from './locales/fr';
import { en } from './locales/en';
import { de } from './locales/de';
import { it } from './locales/it';
import { es } from './locales/es';
import { sv } from './locales/sv';
import { ar } from './locales/ar';

const resources = {
  fr,
  en,
  de,
  it,
  es,
  sv,
  ar
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'en',
    ns: ['common', 'guide'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;