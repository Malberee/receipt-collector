import moment from 'moment'

import type { ReceiptType } from '@entities/receipt'

import { getRarity } from './get-rarity'

export const parseQR = (data: string): Omit<ReceiptType, 'id' | 'products'> => {
  const [fiscalNumber, , _amount, _date, time] = data.split(' ')

  const amount = parseFloat(_amount.replace('=', ''))
  const date = moment(_date + time, 'DD.MM.YYYY HH:mm:ss').toDate()

  return {
    amount,
    date,
    rarity: getRarity(data),
    fiscalNumber,
  }
}
