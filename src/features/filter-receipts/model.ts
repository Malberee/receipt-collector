import { receipts } from '@entities/receipt'

type Overload = {
  (filter: 'amount', value: [number, number]): void
  (filter: 'date', value: [Date, Date]): void
}

export const useFilters = () => {
  const maxAmount = Math.round(
    Math.max(...receipts.receipts.map((item) => item.amount)),
  )

  const handleChange: Overload = (filter, value) => {
    if (filter === 'amount' || filter === 'date') {
      receipts.setFilters(filter, { from: value[0], to: value[1] })
    }
  }

  return { maxAmount, handleChange }
}
