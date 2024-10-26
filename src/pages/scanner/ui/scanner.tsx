import { type BarcodeScanningResult, CameraView } from 'expo-camera'
import { Stack } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { AppState, Platform, StatusBar, StyleSheet, View } from 'react-native'

import { handleScan } from '../model'
import { Overlay } from './overlay'
import { ScannerHeader } from './scanner-header'

function Scanner() {
  const [enableTorch, setEnableTorch] = useState(false)

  const qrLock = useRef(false)
  const appState = useRef(AppState.currentState)

  const handleBarcodeScanned = ({ data }: BarcodeScanningResult) => {
    if (data && !qrLock.current) {
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
    <View className="relative flex-1">
      <Stack.Screen
        options={{
          title: 'Overview',
          headerShown: false,
        }}
      />
      {Platform.OS === 'android' ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        facing="back"
        enableTorch={enableTorch}
        onBarcodeScanned={handleBarcodeScanned}
      />
      <Overlay />
      <ScannerHeader
        toggleTorch={() => setEnableTorch((prevState) => !prevState)}
      />
    </View>
  )
}

export default Scanner
