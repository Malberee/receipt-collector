import { I18nManager } from 'react-native'

const getLocale = () => {
  const locale = I18nManager.getConstants().localeIdentifier ?? 'en-US'

  return locale.replace('_', '-')
}

const currencyFormatter = new Intl.NumberFormat(getLocale(), {
  style: 'currency',
  currency: 'UAH',
})

export const formatCurrency = (value: number) => currencyFormatter.format(value)
