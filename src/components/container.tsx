import { rem } from 'nativewind'
import type { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'
import { initialWindowMetrics } from 'react-native-safe-area-context'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: initialWindowMetrics?.insets.top,
        paddingBottom: initialWindowMetrics?.insets.bottom,
        paddingHorizontal: rem.get(),
      }}
    >
      {children}
    </View>
  )
}
