import { CameraView } from 'expo-camera'
import { Stack } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
  AppState,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { Overlay } from './overlay'

function Scanner() {
  const [value, setValue] = useState('')

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
              console.log(data)

              setValue(data)
              //   await Linking.openURL(data)
            }, 500)
          }
        }}
      />
      <Overlay />
      {value && (
        <Text className="absolute left-1/2 top-10 -translate-x-1/2 text-white">
          {value}
        </Text>
      )}
    </View>
  )
}

export default Scanner
