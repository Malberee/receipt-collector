import { cn } from 'merlo-ui'
import { cssInterop } from 'nativewind'
import React from 'react'
import { View } from 'react-native'
import DashedLine from 'react-native-dashed-line'

import { useTheme } from '@providers'

const StyledDashedLine = cssInterop(DashedLine, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: 'dashColor',
    },
  },
})

export const Divider = () => {
  const { current } = useTheme()
  const isDark = current === 'dark'

  return (
    <>
      <View className="absolute bottom-4 left-0 w-full translate-y-1/2 px-6">
        <StyledDashedLine
          className={
            current === 'dark' ? 'text-default-50' : 'text-default-200'
          }
          dashGap={5}
          dashLength={5}
          dashThickness={3}
        />
      </View>
      <View className="flex-row justify-between">
        <View
          className={cn(
            'z-10 size-8 -translate-x-1/2 rounded-full bg-default-200',
            isDark && '!bg-default-50',
          )}
        />
        <View
          className={cn(
            'z-10 size-8 translate-x-1/2 rounded-full bg-default-200',
            isDark && '!bg-default-50',
          )}
        />
      </View>
    </>
  )
}
