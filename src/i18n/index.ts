import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    saveMissing: true,
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation:{
      escapeValue: false
    },
    load: 'all'
  });

export default i18next;