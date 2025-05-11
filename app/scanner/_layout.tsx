import { Button, ChevronDown } from '@malberee/nextui-native'
import { Slot, useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const ScannerLayout = () => {
  const { id } = useLocalSearchParams<{ id?: string }>()
  const router = useRouter()

  return (
    <>
      <View className="absolute z-10 p-4">
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
