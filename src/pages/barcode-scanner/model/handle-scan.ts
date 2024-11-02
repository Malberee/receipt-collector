import Toast from 'react-native-toast-message'

import { fetchProduct } from '../api'

export const handleScan = async (receiptId: string, data: string) => {
  try {
    const product = await fetchProduct(data)

    return product
  } catch (error) {
    Toast.show({ type: 'error', text1: 'Error', text2: error as string })
    return null
  }
}
