import { CameraView } from 'expo-camera'
import { Stack } from 'expo-router'
import { useEffect, useRef } from 'react'
import { AppState, Platform, StatusBar, StyleSheet, View } from 'react-native'

import { handleScan } from '../model'
import { Overlay } from './overlay'

function Scanner() {
  const qrLock = useRef(false)
  const appState = useRef(AppState.currentState)

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
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true
            setTimeout(() => {
              handleScan(data)
              qrLock.current = false
            }, 2000)
          }
        }}
      />
      <Overlay />
    </View>
  )
}

export default Scanner
