import * as NavigationBar from 'expo-navigation-bar'
import * as SplashScreen from 'expo-splash-screen'
import { useColorScheme } from 'nativewind'
import { type FC, type PropsWithChildren, useEffect, useState } from 'react'
import { View } from 'react-native'

import { receipts } from '@entities/receipt'

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [appIsReady, setAppIsReady] = useState(false)
  const { setColorScheme, colorScheme } = useColorScheme()

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(
      colorScheme === 'dark' ? '#18181b' : '#fafafa',
    )

    if (!appIsReady) {
      setColorScheme(receipts.theme)
      if (colorScheme === receipts.theme || receipts.theme === 'system') {
        setTimeout(async () => {
          await SplashScreen.hideAsync()
          setAppIsReady(true)
        }, 200)
      }
    }
  }, [colorScheme])

  return <View className={`flex-1 ${colorScheme}`}>{children}</View>
}
