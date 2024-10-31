import { CameraView } from 'expo-camera'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { Overlay } from '@shared/ui'

export const BarcodeScanner = () => {
  const [enableTorch, setEnableTorch] = useState(false)

  return (
    <View className="relative -mx-4 flex-1">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        facing="back"
        enableTorch={enableTorch}
        // onBarcodeScanned={handleBarcodeScanned}
      />
      <Overlay
        type="barcode"
        toggleTorch={() => setEnableTorch((prevState) => !prevState)}
      />
    </View>
  )
}
