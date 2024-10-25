import 'react-native-get-random-values'

import { router } from 'expo-router'
import { nanoid } from 'nanoid'
import Toast from 'react-native-toast-message'

import { receipts } from '@entities/receipt'

import { parseQR } from './parse-qr'

export const handleScan = (data: string) => {
  try {
    const receipt = parseQR(data)

    const id = nanoid()

    receipts.addReceipt({
      ...receipt,
      id,
      products: null,
    })
    router.navigate({
      pathname: 'rarity',
      params: { id, rarity: receipt.rarity },
    })
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error as string,
    })
  }
}
