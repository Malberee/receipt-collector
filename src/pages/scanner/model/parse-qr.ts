import moment from 'moment'

import type { ReceiptType } from '@entities/receipt'

import { getRarity } from './get-rarity'

const regexURL =
  /https:\/\/cabinet\.tax\.gov\.ua\/cashregs\/check\?mac=[a-f0-9]{64}&date=\d{8}&time=\d{2}:\d{2}:\d{2}&fn=\d+&id=[A-Za-z0-9]+&sm=\d+\.\d{2}/

const parseURL = (data: string) => {
  const url = new URL(data)

  const amount = Number(url.searchParams.get('sm'))
  const time = url.searchParams.get('time')!
  const date = url.searchParams.get('date')!
  const formattedDate = moment(date + time, 'YYYYMMDD HH:mm:ss').toDate()
  const fiscalNumber = Number(url.searchParams.get('fn'))

  return {
    amount,
    date: formattedDate,
    fiscalNumber,
    rarity: getRarity(data),
  }
}

export const parseQR = (data: string): Omit<ReceiptType, 'id' | 'products'> => {
  try {
    if (regexURL.test(data)) {
      return parseURL(data)
    }

    const [_fiscalNumber, , _amount, _date, time] = data.split(' ')

    const amount = parseFloat(_amount.replace('=', ''))
    const date = moment(_date + time, 'DD.MM.YYYY HH:mm:ss').toDate()
    const fiscalNumber = Number(_fiscalNumber.replace('FN', ''))

    return {
      amount,
      date,
      rarity: getRarity(data),
      fiscalNumber,
    }
  } catch {
    throw 'Cannot scan this QR code!'
  }
}
