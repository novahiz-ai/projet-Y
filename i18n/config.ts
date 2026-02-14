import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { fr } from './locales/fr';
import { en } from './locales/en';
import { de } from './locales/de';
import { it } from './locales/it';
import { es } from './locales/es';
import { sv } from './locales/sv';
import { ar } from './locales/ar';
import { lb } from './locales/lb';
import { ru } from './locales/ru';
import { uk } from './locales/uk';
import { pt } from './locales/pt';
import { ro } from './locales/ro';

const resources = {
  fr,
  en,
  de,
  it,
  es,
  sv,
  ar,
  lb,
  ru,
  uk,
  pt,
  ro
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