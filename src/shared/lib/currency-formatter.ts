import { NativeModules, Platform } from 'react-native'

const getLocale = () => {
  let locale = 'en-US'

  if (Platform.OS === 'ios') {
    locale =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
  }

  if (Platform.OS === 'android') {
    locale = NativeModules.I18nManager.localeIdentifier
  }

  return locale.replace('_', '-')
}

export const currencyFormatter = new Intl.NumberFormat(getLocale(), {
  style: 'currency',
  currency: 'UAH',
})
