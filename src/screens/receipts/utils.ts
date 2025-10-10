import type { ReceiptType } from '@store'
import moment from 'moment'

import type { Rarity } from '@constants'

export type FiltersType = {
  amount: {
    from: number
    to: number
  }
  date: {
    from: Date
    to: Date
  }
  rarities: Rarity[]
}

export const filterReceipts = (
  receipts: ReceiptType[],
  filters: FiltersType,
) => {
  const { from: amountFrom, to: amountTo } = filters.amount
  const { from: dateFrom, to: dateTo } = filters.date
  const rarities = filters.rarities

  return receipts
    .filter((receipt) => {
      if (amountFrom !== undefined && amountTo !== undefined) {
        return receipt.amount >= amountFrom && receipt.amount <= amountTo
      }

      return true
    })
    .filter((receipt) => {
      if (dateFrom !== undefined && dateTo !== undefined) {
        return moment(receipt.date).isBetween(dateFrom, dateTo, 'second', '[]')
      }

      return true
    })
    .filter((receipt) => {
      if (rarities?.length) {
        return rarities.includes(receipt.rarity as any)
      }

      return true
    })
}

export const getFilters = (receipts: ReceiptType[]) => {
  const maxAmount = Math.ceil(
    Math.max(...receipts.map((receipt) => receipt.amount)),
  )

  const timestamps = receipts.map((receipt) => moment(receipt.date))
  const minDate = moment.min(timestamps).clone().startOf('day')
  const maxDate = moment.max(timestamps).clone().endOf('day')

  const initialState: FiltersType = {
    amount: { from: 0, to: maxAmount },
    date: { from: minDate.toDate(), to: maxDate.toDate() },
    rarities: [],
  }

  return initialState
}
