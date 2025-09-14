import { store } from '@store'
import getSymbolFromCurrency from 'currency-symbol-map'
import { I18nManager } from 'react-native'

const getLocale = () => {
  const locale = I18nManager.getConstants().localeIdentifier ?? 'en-US'

  return locale.replace('_', '-')
}

export const formatCurrency = (
  value: number,
  options?: Intl.NumberFormatOptions,
) => {
  const formatter = new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: store.preferences.currency,
    currencyDisplay: 'symbol',
    ...options,
  })

  const useSymbol = formatter.resolvedOptions().currencyDisplay === 'symbol'

  return formatter
    .formatToParts(value)
    .map((part) => {
      if (part.type === 'currency' && useSymbol) {
        return getSymbolFromCurrency(store.preferences.currency)
      }
      if (part.type === 'literal' && useSymbol) {
        return ''
      }

      return part.value
    })
    .join('')
}
