import { receipts } from '@store'
import { router } from 'expo-router'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
import { Camera } from 'react-native-vision-camera'

import { ScannerOverlay } from '@components'
import { useScanner } from '@hooks'

import { parseQR } from './utils'

export const QRScanner = () => {
  const addReceipt = (data: string) => {
    try {
      const receipt = parseQR(data)

      receipts.addReceipt(receipt)

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

  const { cameraProps, toggleTorch } = useScanner('qr', addReceipt)

  return (
    <View className="relative flex-1">
      <Camera {...cameraProps} style={{ flex: 1 }} />
      <ScannerOverlay type="qr" toggleTorch={toggleTorch} />
    </View>
  )
}
