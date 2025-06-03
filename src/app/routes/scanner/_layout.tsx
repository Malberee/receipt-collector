import { Button, ChevronDown } from '@malberee/heroui-native'
import { Slot, useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ScannerLayout = () => {
  const { id } = useLocalSearchParams<{ id?: string }>()
  const router = useRouter()
  const { top } = useSafeAreaInsets()

  return (
    <>
      <View className="absolute z-10 p-4" style={{ top }}>
        <Button
          className="rotate-90"
          size="lg"
          variant="light"
          color="default"
          isIconOnly
          startContent={<ChevronDown color="white" />}
          onPress={() => {
            if (id) {
              router.navigate(`/${id}`)
            } else {
              router.navigate('/')
            }
          }}
        />
      </View>
      <Slot />
    </>
  )
}

export default ScannerLayout
