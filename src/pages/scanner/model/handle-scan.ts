import 'react-native-get-random-values'

import { router } from 'expo-router'
import { nanoid } from 'nanoid'

import { receipts } from '@entities/receipt'

import { parseQR } from './parse-qr'

export const handleScan = (data: string) => {
  const receipt = parseQR(data)

  const id = nanoid()

  receipts.addReceipt({
    ...receipt,
    id,
    products: null,
  })

  router.navigate('receipt-details/' + id)
}
