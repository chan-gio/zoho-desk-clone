import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translations
import enTranslations from '../locales/en/translation.json'
import viTranslations from '../locales/vi/translation.json'

const resources = {
  en: {
    translation: enTranslations
  },
  vi: {
    translation: viTranslations
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi',
    debug: import.meta.env.DEV,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
