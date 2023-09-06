import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import dashboardEn from './en/dashboard';
import publicEn from './en/public';
import systemEn from './en/system';
import loginEn from './en/login';
import contentEn from './en/content';
import dashboardZh from './zh/dashboard';
import publicZh from './zh/public';
import systemZh from './zh/system';
import loginZh from './zh/login';
import contentZh from './zh/content';

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
          system: systemZh,
          content: contentZh
        }
      },
      en: {
        translation: {
          public: publicEn,
          login: loginEn,
          dashboard: dashboardEn,
          system: systemEn,
          content: contentEn
        },
      },
    }
  });

export default i18n;