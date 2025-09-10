import i18n from 'i18next'
import moment from 'moment'
import 'moment/locale/uk'
import { initReactI18next } from 'react-i18next'

import { en, uk } from '../../locales'
import { mmkvLanguageDetector } from './mmkv-language-detector'

export { changeLocale } from './change-locale'

const resources = { en: { translation: en }, uk: { translation: uk } }

i18n.use(mmkvLanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
})
i18n.on('initialized', (options) => moment.locale(options.lng))

export default i18n
