import { CloseFilledIcon } from '@malberee/nextui-native'
import { cssInterop } from 'nativewind'
import React, { type FC } from 'react'
import { Text, View } from 'react-native'
import type { BaseToastProps } from 'react-native-toast-message'

cssInterop(CloseFilledIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

export const Toast: FC<BaseToastProps> = ({ text1, text2 }) => {
  console.log(text1)
  console.log(text2)

  return (
    <View className="z-20 w-full flex-row px-4">
      <View className="h-full flex-row items-center justify-center rounded-l-medium border border-danger-600 bg-danger p-1">
        <CloseFilledIcon color="white" width="20px" height="20px" />
      </View>
      <View className="flex-1 overflow-hidden rounded-r-medium border border-default-200 bg-default-100 p-3">
        <Text className="color-foreground">{text1}</Text>
        <Text className="color-foreground-500">{text2}</Text>
      </View>
    </View>
  )
}
