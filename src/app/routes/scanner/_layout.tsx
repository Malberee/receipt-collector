import { Button, ChevronDown } from '@malberee/heroui-native'
import { Slot, router } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ScannerLayout = () => {
  const { top } = useSafeAreaInsets()

  return (
    <View className="flex-1 bg-default-50">
      <View className="absolute z-10 p-4" style={{ top }}>
        <Button
          size="lg"
          variant="light"
          color="default"
          isIconOnly
          startContent={
            <ChevronDown
              color="white"
              style={{ transform: [{ rotate: '90deg' }] }}
            />
          }
          onPress={() => router.dismiss()}
        />
      </View>
      <Slot />
    </View>
  )
}

export default ScannerLayout
