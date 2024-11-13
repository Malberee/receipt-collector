import moment from 'moment'

import { receipts } from '@entities/receipt'

export const getMinMaxDates = () => {
  const dates = receipts.receipts.map((receipt) => moment(receipt.date))

  return { minDate: moment.min(dates), maxDate: moment.max(dates) }
}
