import { storage, type store } from '@store'
import type { LanguageDetectorModule } from 'i18next'

export const mmkvLanguageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  init: () => {},
  detect: () => {
    try {
      const _store: typeof store = JSON.parse(storage.getString('store') ?? '')
      return _store.preferences.lang
    } catch {
      return 'en'
    }
  },
}
