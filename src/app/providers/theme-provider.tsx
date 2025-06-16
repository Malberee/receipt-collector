import * as SplashScreen from 'expo-splash-screen'
import { useColorScheme } from 'nativewind'
import { type FC, type PropsWithChildren, useEffect, useState } from 'react'
import { View } from 'react-native'

import { receipts } from '@entities/receipt'

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [appIsReady, setAppIsReady] = useState(false)
  const { setColorScheme, colorScheme } = useColorScheme()

  useEffect(() => {
    setColorScheme(receipts.theme)

    if (
      !appIsReady &&
      (colorScheme === receipts.theme || receipts.theme === 'system')
    ) {
      setTimeout(async () => {
        await SplashScreen.hideAsync()
        setAppIsReady(true)
      }, 200)
    }
  }, [colorScheme])

  return <View className={`flex-1 ${colorScheme}`}>{children}</View>
}
