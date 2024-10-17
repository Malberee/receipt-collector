import { Overlay } from './overlay'
import { CameraView } from 'expo-camera'
import { Stack } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
  AppState,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native'

const Home = () => {
  const [value, setValue] = useState('')
  const [enableTorch, setEnableTorch] = useState(false)

  const qrLock = useRef(false)
  const appState = useRef(AppState.currentState)

  const toggleTorch = () => setEnableTorch((prevState) => !prevState)

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
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
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
      <Overlay toggleTorch={toggleTorch} />
      {value && (
        <Text className="absolute left-1/2 top-10 -translate-x-1/2 text-white">
          {value}
        </Text>
      )}
    </SafeAreaView>
  )
}

export default Home
