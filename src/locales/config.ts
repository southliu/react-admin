import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import dashboardEn from './en/dashboard';
import publicEn from './en/public';
import systemEn from './en/system';
import loginEn from './en/login';
import dashboardZh from './zh/dashboard';
import publicZh from './zh/public';
import systemZh from './zh/system';
import loginZh from './zh/login';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'zh',
    debug: true,
    interpolation: {
      escapeValue: false
    },
    resources: {
      zh: {
        translation: {
          public: publicZh,
          login: loginZh,
          dashboard: dashboardZh,
          system: systemZh
        }
      },
      en: {
        translation: {
          public: publicEn,
          login: loginEn,
          dashboard: dashboardEn,
          system: systemEn
        },
      },
    }
  });

export default i18n;