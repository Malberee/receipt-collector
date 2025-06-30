import { CameraView } from 'expo-camera'
import { StyleSheet, View } from 'react-native'

import { useScanner } from '@shared/lib'
import { Overlay } from '@shared/ui'

import { addReceipt } from './model'

export const QRScanner = () => {
  const { enableTorch, toggleTorch, handleScan } = useScanner(300, 300)

  return (
    <View className="relative flex-1">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        facing="back"
        enableTorch={enableTorch}
        onBarcodeScanned={(data) => handleScan(data, addReceipt)}
      />
      <Overlay type="qr" toggleTorch={toggleTorch} />
    </View>
  )
}
