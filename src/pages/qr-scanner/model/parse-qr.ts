import moment from 'moment'

import type { ReceiptType } from '@entities/receipt'

import { getRarity } from './get-rarity'

const parseURL = (data: string) => {
  const url = new URL(data)

  const amount = Number(url.searchParams.get('sm'))
  const time = url.searchParams.get('time')!
  const date = url.searchParams.get('date')!
  const formattedDate = moment(date + time, 'YYYYMMDD HH:mm:ss').toDate()
  const fiscalNumber = url.searchParams.get('fn')! + formattedDate

  return {
    amount,
    date: formattedDate,
    id: fiscalNumber,
    rarity: getRarity(data),
  }
}

export const parseQR = (data: string): Omit<ReceiptType, 'products'> => {
  const regexURL = new RegExp(
    /https:\/\/cabinet\.tax\.gov\.ua\/cashregs\/check\?.*/,
  )

  const dateRegex = new RegExp(/\b\d{1,2}[\.-]\d{2}[\.-]\d{4}\b/)
  const dateRegex2 = new RegExp(/\b\d{1,2}[\.-]\d{2}[\.-]\d{2}\b/)
  const timeRegex = new RegExp(/\b\d{2}:\d{2}:\d{2}\b/)
  const amountRegex = new RegExp(/\b=?\d+\.\d{2}\b(?!\.)/)
  const fiscalNumberRegex = new RegExp(/\bF?N?\d{10}\b/)

  try {
    if (regexURL.test(data)) {
      return parseURL(data)
    }

    const getFormattedDate = (string?: string) => {
      return string?.split('').toSpliced(-2, -2, '20').join('')
    }

    const values = ([] as string[]).concat(
      data.match(fiscalNumberRegex) ?? [],
      data.match(amountRegex) ?? [],
      getFormattedDate(data.match(dateRegex2)?.[0]) ??
        data.match(dateRegex) ??
        [],
      data.match(timeRegex) ?? [],
    )

    if (values.length !== 4) {
      throw 'Cannot scan this QR code!'
    }

    const [_fiscalNumber, _amount, _date, time] = values

    const amount = parseFloat(_amount.replace('=', ''))
    const date = moment(_date + time, 'DD.MM.YYYY HH:mm:ss').toDate()
    const fiscalNumber = _fiscalNumber.replace('FN', '')

    return {
      amount,
      date,
      rarity: getRarity(data),
      id: fiscalNumber + date.getTime(),
    }
  } catch {
    throw 'Cannot scan this QR code!'
  }
}
