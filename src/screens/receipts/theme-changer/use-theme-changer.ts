import { MoonFilledIcon, SunFilledIcon } from 'merlo-ui'
import { colorScheme } from 'nativewind'
import { useState } from 'react'

import { useTheme } from '@providers'

export const useToggleChanger = () => {
  const [showPopover, setShowPopover] = useState(false)
  const { set } = useTheme()

  const CurrentIcon =
    colorScheme.get() === 'dark' ? SunFilledIcon : MoonFilledIcon

  return {
    showPopover,
    togglePopover: () => setShowPopover((prevState) => !prevState),
    CurrentIcon,
    onValueChange: set,
  }
}
