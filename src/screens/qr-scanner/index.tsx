import { receipts } from '@store'
import { CameraView } from 'expo-camera'
import { router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import Toast from 'react-native-toast-message'

import { Overlay } from '@components'
import { useScanner } from '@hooks'

import { parseQR } from './utils'

export const QRScanner = () => {
  const { enableTorch, toggleTorch, onScan } = useScanner(300, 300)

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

  return (
    <View className="relative flex-1">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        facing="back"
        enableTorch={enableTorch}
        onBarcodeScanned={(data) => onScan(data, addReceipt)}
      />
      <Overlay type="qr" toggleTorch={toggleTorch} />
    </View>
  )
}
