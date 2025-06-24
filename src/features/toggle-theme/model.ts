import { MoonFilledIcon, SunFilledIcon } from '@malberee/heroui-native'
import { colorScheme } from 'nativewind'
import { useState } from 'react'
import { Dimensions } from 'react-native'
import switchTheme from 'react-native-theme-switch-animation'

import { type Theme } from '@entities/receipt'

import { useTheme } from '@shared/lib'

export const useToggleTheme = () => {
  const [showPopover, setShowPopover] = useState(false)
  const { current, set } = useTheme()

  const onValueChange = (theme: Theme) => {
    if (
      theme === current ||
      (theme === 'system' && current === colorScheme.get())
    ) {
      set(theme)
      return
    }

    switchTheme({
      switchThemeFunction: () => {
        set(theme)
      },
      animationConfig: {
        type: current === 'light' ? 'circular' : 'inverted-circular',
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
    onValueChange,
  }
}
