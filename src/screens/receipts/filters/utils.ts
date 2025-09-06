import { store } from '@store'
import moment from 'moment'

export const getMinMaxDates = () => {
  const dates = store.receipts.map((receipt) => moment(receipt.date))

  return {
    minDate: moment.min(dates).clone().startOf('day'),
    maxDate: moment.max(dates).clone().endOf('day'),
  }
}
