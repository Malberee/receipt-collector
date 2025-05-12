import React, { type FC, type PropsWithChildren } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  const { top } = useSafeAreaInsets()

  return (
    <View className="flex-1 px-4" style={{ paddingTop: top }}>
      {children}
    </View>
  )
}
