import { receipts } from '@store'
import moment from 'moment'

import type { Rarity } from '@constants'

import { getMinMaxDates } from './utils'

type Overload = {
  (filter: 'amount', value: [number, number]): void
  (filter: 'date', value: [Date, Date]): void
  (filter: 'rarities', value: Rarity[]): void
}

export const useFilters = () => {
  const data = receipts.receipts

  const maxAmount = data.length
    ? Math.ceil(Math.max(...data.map((item) => item.amount)))
    : 0

  const onValueChange: Overload = (filter, value) => {
    const dates = Object.values(getMinMaxDates())

    if (
      filter === 'date' &&
      value.every((date, index) => dates[index].isSame(moment(date)))
    ) {
      receipts.setFilters(filter, {})
      return
    }

    if (filter === 'amount' || filter === 'date') {
      receipts.setFilters(filter, {
        from: value[0] as number | Date,
        to: value[1] as number | Date,
      })
    }

    if (filter === 'rarities') {
      receipts.setFilters(filter, value as Rarity[])
    }
  }

  return { maxAmount, onValueChange }
}
