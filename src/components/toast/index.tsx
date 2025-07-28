import React, { type FC } from 'react'
import { Text, View } from 'react-native'
import type { BaseToastProps } from 'react-native-toast-message'

import { DangerIcon } from './danger-icon'

export const Toast: FC<BaseToastProps> = ({ text1, text2 }) => {
  return (
    <View className="w-full flex-row px-4">
      <View className="flex-1 flex-row items-center gap-4 rounded-medium border border-danger-100 bg-danger-50 p-3">
        <DangerIcon width={28} height={28} className="text-danger-600" />
        <View>
          <Text className="text-danger-600">{text1}</Text>
          <Text className="text-danger-500">{text2}</Text>
        </View>
      </View>
    </View>
  )
}
