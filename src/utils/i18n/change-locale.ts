import { type Language, store } from '@store'
import i18n from 'i18next'
import moment from 'moment'

export const changeLocale = (lang: Language) => {
  moment.locale(lang)
  i18n.changeLanguage(lang)
  store.setPreferences('lang', lang)
}
