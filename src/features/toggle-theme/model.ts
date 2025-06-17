import { MoonFilledIcon, SunFilledIcon } from '@malberee/heroui-native'
import * as NavigationBar from 'expo-navigation-bar'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'

import { type Theme, receipts } from '@entities/receipt'

export const useToggleTheme = () => {
  const [showPopover, setShowPopover] = useState(false)

  const { setColorScheme, colorScheme } = useColorScheme()

  const changeTheme = (theme: Theme) => {
    receipts.setTheme(theme)
    setColorScheme(theme)
    NavigationBar.setBackgroundColorAsync(
      theme === 'dark' ? '#18181b' : '#fafafa',
    )
  }

  const CurrentIcon = colorScheme === 'dark' ? SunFilledIcon : MoonFilledIcon

  return {
    showPopover,
    togglePopover: () => setShowPopover((prevState) => !prevState),
    CurrentIcon,
    changeTheme,
  }
}
