import { MoonFilledIcon, SunFilledIcon } from '@malberee/heroui-native'
import * as NavigationBar from 'expo-navigation-bar'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { Dimensions } from 'react-native'
import switchTheme from 'react-native-theme-switch-animation'

import { type Theme, receipts } from '@entities/receipt'

export const useToggleTheme = () => {
  const [showPopover, setShowPopover] = useState(false)

  const { setColorScheme, colorScheme } = useColorScheme()

  const changeTheme = (theme: Theme) => {
    switchTheme({
      switchThemeFunction: () => {
        receipts.setTheme(theme)
        setColorScheme(theme)
        NavigationBar.setBackgroundColorAsync(
          theme === 'dark' ? '#18181b' : '#fafafa',
        )
      },
      animationConfig: {
        type: colorScheme === 'light' ? 'circular' : 'inverted-circular',
        duration: 300,
        startingPoint: {
          cx: Dimensions.get('screen').width,
          cy: 0,
          cxRatio: 0.5,
          cyRatio: 0.5,
        },
      },
    })
  }

  const CurrentIcon = colorScheme === 'dark' ? SunFilledIcon : MoonFilledIcon

  return {
    showPopover,
    togglePopover: () => setShowPopover((prevState) => !prevState),
    CurrentIcon,
    changeTheme,
  }
}
