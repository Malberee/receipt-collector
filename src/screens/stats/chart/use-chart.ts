import { store, type ReceiptType } from '@store'
import moment from 'moment'

import type { ChartProps } from './index'

export const useChart = (
  param: ChartProps['param'],
  period: ChartProps['period'],
) => {
  const isWeek = period === 'week'
  const format = isWeek ? 'YYYY-MM-DD' : 'YYYY-MM'

  const getAutoCalcReceiptAmount = (receipt: ReceiptType) =>
    receipt.products.reduce((acc, product) => acc + product.calculatedPrice, 0)

  const dates = Array.from({ length: isWeek ? 7 : 6 }, (_, i) =>
    moment()
      .startOf('day')
      .subtract((isWeek ? 6 : 5) - i, isWeek ? 'days' : 'months')
      .format(format),
  )
  const data = store
    .getReceipts()
    .filter((receipt) => moment(receipt.date).isSameOrAfter(dates[0]))
    .map((receipt) => ({
      value: receipt.autoCalcAmount
        ? getAutoCalcReceiptAmount(receipt)
        : receipt.amount,
      date: receipt.date,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

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
    value: grouped[date] ?? 0,
  }))

  return { data: result }
}
