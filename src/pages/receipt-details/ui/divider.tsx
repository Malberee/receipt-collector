import { cssInterop } from 'nativewind'
import React from 'react'
import { View } from 'react-native'
import DashedLine from 'react-native-dashed-line'

const StyledDashedLine = cssInterop(DashedLine, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: 'dashColor',
    },
  },
})

export const Divider = () => {
  return (
    <>
      <View className="absolute bottom-4 left-0 w-full translate-y-1/2 px-6">
        <StyledDashedLine
          className="text-default-50"
          dashGap={5}
          dashLength={5}
          dashThickness={3}
        />
      </View>
      <View className="flex-row justify-between">
        <View className="z-10 size-8 -translate-x-1/2 rounded-full bg-default-50" />
        <View className="z-10 size-8 translate-x-1/2 rounded-full bg-default-50" />
      </View>
    </>
  )
}
