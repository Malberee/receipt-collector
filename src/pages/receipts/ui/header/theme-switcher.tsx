import { Button, MoonFilledIcon, SunFilledIcon } from '@malberee/heroui-native'
import { cssInterop, useColorScheme } from 'nativewind'

cssInterop(SunFilledIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

export const ThemeSwitcher = () => {
  const { toggleColorScheme, colorScheme } = useColorScheme()

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
      onPress={toggleColorScheme}
    />
  )
}
