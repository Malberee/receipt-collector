import { Button, MoonFilledIcon, SunFilledIcon } from '@malberee/heroui-native'
import { observer } from 'mobx-react-lite'
import { cssInterop, useColorScheme } from 'nativewind'

import { receipts } from '@entities/receipt'

cssInterop(SunFilledIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

export const ToggleTheme = observer(() => {
  const { setColorScheme, colorScheme } = useColorScheme()

  const toggleTheme = () => {
    const nextTheme = colorScheme === 'dark' ? 'light' : 'dark'

    receipts.setTheme(nextTheme)
    setColorScheme(nextTheme)
  }

  const Icon = colorScheme === 'dark' ? SunFilledIcon : MoonFilledIcon

  return (
    <Button
      isIconOnly
      variant="light"
      color="default"
      size="lg"
      startContent={
        <Icon className="text-foreground" width="24px" height="24px" />
      }
      onPress={toggleTheme}
    />
  )
})
