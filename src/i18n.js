// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// import enTranslation from './locales/en/translation.json';
// import arTranslation from './locales/ar/translation.json';

// i18n
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: { translation: enTranslation },
//       ar: { translation: arTranslation },
//     },
//     lng: 'en', // default language
//     fallbackLng: 'en',
//     interpolation: { escapeValue: false },
//   });

// export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.init({
  resources: {
    en: {
      translation: {
        toggle_language: 'Toggle Language',
        loading_message: 'Loading family members...',
        present: 'Present',
      },
    },
    ar: {
      translation: {
        toggle_language: 'تبديل اللغة',
        loading_message: 'جاري تحميل أفراد العائلة...',
        present: 'الحاضر',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});


export default i18n;