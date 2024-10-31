import type { BarcodeScanningResult } from 'expo-camera'
import { useEffect, useRef, useState } from 'react'
import { AppState } from 'react-native'

import { getScannableAreaSize } from './get-scannable-area-size'
import { isWithinScannableArea } from './is-within-scannable-area'

export const useScanner = (width: number, height: number) => {
  const [enableTorch, setEnableTorch] = useState(false)

  const scanLock = useRef(false)
  const appState = useRef(AppState.currentState)

  const toggleTorch = () => setEnableTorch((prevState) => !prevState)

  const handleScan = (
    { data, cornerPoints }: BarcodeScanningResult,
    parseFn: (data: string) => void,
  ) => {
    if (data && !scanLock.current) {
      const shouldScan = isWithinScannableArea(
        cornerPoints,
        getScannableAreaSize(width, height),
      )

      if (!shouldScan) {
        return
      }

      scanLock.current = true

      setTimeout(() => {
        scanLock.current = false
      }, 1500)

      setTimeout(() => {
        parseFn(data)
      }, 500)
    }
  }

  useEffect(() => {
    const subsciption = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        scanLock.current = false
      }
      appState.current = nextAppState
    })

    return () => {
      subsciption.remove()
    }
  }, [])

  return { toggleTorch, handleScan, enableTorch, scanLock }
}
