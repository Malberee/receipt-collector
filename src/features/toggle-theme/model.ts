import { MoonFilledIcon, SunFilledIcon } from '@malberee/heroui-native'
import * as NavigationBar from 'expo-navigation-bar'
import { colorScheme } from 'nativewind'
import { useState } from 'react'
import { Dimensions } from 'react-native'
import switchTheme from 'react-native-theme-switch-animation'

import { type Theme, receipts } from '@entities/receipt'

export const useToggleTheme = () => {
  const [showPopover, setShowPopover] = useState(false)

  const changeTheme = (theme: Theme) => {
    switchTheme({
      switchThemeFunction: () => {
        receipts.setTheme(theme)
        colorScheme.set(theme)
        NavigationBar.setBackgroundColorAsync(
          colorScheme.get() === 'dark' ? '#18181b' : '#fafafa',
        )
      },
      animationConfig: {
        type: colorScheme.get() === 'light' ? 'circular' : 'inverted-circular',
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

  const CurrentIcon =
    colorScheme.get() === 'dark' ? SunFilledIcon : MoonFilledIcon

  return {
    showPopover,
    togglePopover: () => setShowPopover((prevState) => !prevState),
    CurrentIcon,
    changeTheme,
  }
}
