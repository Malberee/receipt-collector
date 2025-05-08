import Toast from 'react-native-toast-message'

import { fetchProduct } from './api'

export const handleScan = async (data: string) => {
  try {
    const product = await fetchProduct(data)

    return product
  } catch (err) {
    let error
    if (err instanceof Error) error = err.message
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: String(error) as string,
    })
    return null
  }
}
