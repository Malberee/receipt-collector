import { useCameraPermissions } from 'expo-camera'
import React, { useEffect } from 'react'

import { Receipts } from '@pages/receipts'

import '../global.css'

export default function App() {
  const [permission, requestPermission] = useCameraPermissions()
  useEffect(() => {
    if (!permission?.granted) {
      requestPermission()
    }
  }, [])

  return <Receipts />
}
