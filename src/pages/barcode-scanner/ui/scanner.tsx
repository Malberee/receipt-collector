import { CameraView } from 'expo-camera'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { useScanner } from '@shared/lib'
import { Overlay } from '@shared/ui'

export const BarcodeScanner = () => {
  const { toggleTorch, enableTorch, handleScan } = useScanner(300, 100)

  return (
    <View className="relative -mx-4 flex-1">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        facing="back"
        enableTorch={enableTorch}
        onBarcodeScanned={(data) => handleScan(data, () => {})}
      />
      <Overlay type="barcode" toggleTorch={toggleTorch} />
    </View>
  )
}
