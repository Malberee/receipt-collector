import { receipts } from '@entities/receipt'

import type { Rarity } from '@shared/config'

type Overload = {
  (filter: 'amount', value: [number, number]): void
  (filter: 'date', value: [Date, Date]): void
  (filter: 'rarities', value: Rarity[]): void
}

export const useFilters = () => {
  const maxAmount = Math.round(
    Math.max(...receipts.receipts.map((item) => item.amount)),
  )

  const handleChange: Overload = (filter, value) => {
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

  return { maxAmount, handleChange }
}
