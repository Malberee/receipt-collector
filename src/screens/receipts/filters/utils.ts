import type { ReceiptType } from '@store'
import moment from 'moment'

import type { FiltersType } from './with-filters'

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
