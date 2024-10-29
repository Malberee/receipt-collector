import React, { type FC, type PropsWithChildren } from 'react'
import { View } from 'react-native'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return <View className="flex-1 px-4">{children}</View>
}
