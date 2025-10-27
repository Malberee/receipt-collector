import { Slot } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { BackButton } from '@components'

const ScannerLayout = () => {
  const { top } = useSafeAreaInsets()

  return (
    <View className="flex-1 bg-default-50">
      <View className="absolute z-10 p-4" style={{ top }}>
        <BackButton iconClassName="text-white" />
      </View>
      <Slot />
    </View>
  )
}

export default ScannerLayout
