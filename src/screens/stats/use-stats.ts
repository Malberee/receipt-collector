import { type ReceiptType, store } from '@store'
import moment from 'moment'

export type Period = 'day' | 'month'

export const useStats = (
  param: 'amount' | 'count',
  dates: Date[],
  period: Period,
) => {
  const getAutoCalcReceiptAmount = (receipt: ReceiptType) =>
    receipt.products.reduce((acc, product) => acc + product.calculatedPrice, 0)

  const data = store
    .getReceipts()
    .filter((receipt) => {
      return (
        moment(receipt.date).startOf('day').isSameOrAfter(dates[0]) &&
        moment(receipt.date)
          .startOf('day')
          .isSameOrBefore(dates[dates.length - 1])
      )
    })
    .map((receipt) => ({
      value: receipt.autoCalcAmount
        ? getAutoCalcReceiptAmount(receipt)
        : receipt.amount,
      date: receipt.date,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const format = period === 'day' ? 'YYYY-MM-DD' : 'YYYY-MM'

  const grouped = data.reduce(
    (acc, item) => {
      const day = moment(item.date).format(format)

      if (!acc[day]) {
        acc[day] = 0
      }

      if (param === 'amount') {
        acc[day] += Number(item.value)
      } else {
        acc[day]++
      }

      return acc
    },
    {} as Record<string, number>,
  )

  const result = dates.map((date) => ({
    date: new Date(date),
    value: grouped[moment(date).format(format)] ?? 0,
  }))

  return result
}
