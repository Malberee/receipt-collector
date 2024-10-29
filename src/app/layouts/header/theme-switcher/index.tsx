import { Button, MoonFilledIcon, SunFilledIcon } from '@malberee/nextui-native'
import { usePathname } from 'expo-router'
import { cssInterop, useColorScheme } from 'nativewind'

cssInterop(SunFilledIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

function ThemeSwitcher() {
  const { toggleColorScheme, colorScheme } = useColorScheme()
  const currentPath = usePathname()

  const Icon = colorScheme === 'dark' ? SunFilledIcon : MoonFilledIcon

  return (
    <Button
      isIconOnly
      variant="light"
      color="default"
      size="lg"
      startContent={
        <Icon
          className={
            currentPath === '/scanner' ? 'text-white' : 'text-foreground'
          }
          width="24px"
          height="24px"
        />
      }
      onPress={toggleColorScheme}
    />
  )
}

export default ThemeSwitcher
