import 'react-native-get-random-values'

import { router } from 'expo-router'
import Toast from 'react-native-toast-message'

import { receipts } from '@entities/receipt'

import { parseQR } from './parse-qr'

export const addReceipt = (data: string) => {
  try {
    const receipt = parseQR(data)

    receipts.addReceipt({
      ...receipt,
    })

    router.replace({
      pathname: 'rarity',
      params: { rarity: receipt.rarity, id: receipt.id },
    })
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error as string,
    })
  }
}
