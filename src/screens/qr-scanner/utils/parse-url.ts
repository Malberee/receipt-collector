import moment from 'moment'

import { getRarity } from './get-rarity'

export const parseURL = (data: string) => {
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
