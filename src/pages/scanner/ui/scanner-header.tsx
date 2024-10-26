import { Button, ChevronIcon, Flash } from '@malberee/nextui-native'
import { Link } from 'expo-router'
import type { FC } from 'react'
import React from 'react'
import { View } from 'react-native'

interface ScannerHeaderProps {
  toggleTorch: () => void
}

export const ScannerHeader: FC<ScannerHeaderProps> = ({ toggleTorch }) => {
  return (
    <View className="absolute z-10 w-full flex-row justify-between p-4">
      <Link href="/" asChild>
        <Button
          isIconOnly
          variant="light"
          color="default"
          size="lg"
          startContent={
            <ChevronIcon color="white" width="24px" height="24px" />
          }
        />
      </Link>
      <Button
        isIconOnly
        variant="light"
        color="default"
        size="lg"
        onPress={toggleTorch}
        startContent={<Flash color="white" size="24px" />}
      />
    </View>
  )
}
