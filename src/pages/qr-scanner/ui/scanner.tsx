import { type BarcodeScanningResult, CameraView } from 'expo-camera'
import { useEffect, useRef, useState } from 'react'
import { AppState, StyleSheet, View } from 'react-native'

import { getScannableAreaSize, isWithinScannableArea } from '@shared/lib'
import { Overlay } from '@shared/ui'

import { handleScan } from '../model'

export const QRScanner = () => {
  const [enableTorch, setEnableTorch] = useState(false)

  const qrLock = useRef(false)
  const appState = useRef(AppState.currentState)

  const handleBarcodeScanned = ({
    data,
    cornerPoints,
  }: BarcodeScanningResult) => {
    if (data && !qrLock.current) {
      const shouldScan = isWithinScannableArea(
        cornerPoints,
        getScannableAreaSize(300, 300),
      )

      if (!shouldScan) {
        return
      }

      qrLock.current = true

      setTimeout(() => {
        qrLock.current = false
      }, 1500)

      setTimeout(() => {
        handleScan(data)
      }, 500)
    }
  }

  useEffect(() => {
    const subsciption = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        qrLock.current = false
      }
      appState.current = nextAppState
    })

    return () => {
      subsciption.remove()
    }
  }, [])

  return (
    <View className="relative -mx-4 flex-1">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        facing="back"
        enableTorch={enableTorch}
        onBarcodeScanned={handleBarcodeScanned}
      />
      <Overlay
        type="qr"
        toggleTorch={() => setEnableTorch((prevState) => !prevState)}
      />
    </View>
  )
}
