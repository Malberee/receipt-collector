import { Button, ChevronDown } from '@malberee/nextui-native'
import { Link, Slot } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const ScannerLayout = () => {
  return (
    <>
      <View className="absolute z-10 p-4">
        <Link href="../" asChild>
          <Button
            className="rotate-90"
            size="lg"
            variant="light"
            color="default"
            isIconOnly
            startContent={<ChevronDown color="white" />}
          />
        </Link>
      </View>
      <Slot />
    </>
  )
}

export default ScannerLayout
