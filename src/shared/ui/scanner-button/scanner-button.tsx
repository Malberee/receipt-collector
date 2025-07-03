import { useCameraPermissions } from 'expo-camera'
import { router } from 'expo-router'
import { cssInterop, rem } from 'nativewind'
import React, { type FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@shared/lib'

import ScannerIcon from './scanner-icon'

interface ScannerButtonProps {
  children?: string
  href: string
}

cssInterop(ScannerIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

export const ScannerButton: FC<ScannerButtonProps> = ({ children, href }) => {
  const { isDark } = useTheme()
  const { bottom } = useSafeAreaInsets()
  const [permission, requestPermission] = useCameraPermissions()

  const handlePress = () => {
    if (!permission?.granted) {
      requestPermission()
      return
    }

    router.navigate(href)
  }

  return (
    <View
      className="absolute left-4 z-10 w-full"
      style={{ bottom: bottom + rem.get() }}
    >
      <Pressable
        onPress={handlePress}
        className={`rounded-large bg-[#d9eafd] duration-100 active:bg-[#bfdbfa] active:transition-colors ${isDark && '!bg-[#171d26] active:!bg-[#14253b]'}`}
      >
        <View className="w-full flex-row items-center justify-center gap-2 rounded-large border-2 border-dashed border-primary px-3 py-6">
          <ScannerIcon className="text-primary" width="24px" height="24px" />
          <Text className="text-center text-xl text-primary">{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}
