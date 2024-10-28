import { Button, ChevronIcon, Plus } from '@malberee/nextui-native'
import { Link, usePathname } from 'expo-router'
import { cssInterop } from 'nativewind'
import { View } from 'react-native'

import ThemeSwitcher from './theme-switcher'

cssInterop(ChevronIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

cssInterop(Plus, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

function Header() {
  const currentPath = usePathname()

  return (
    <View className="z-10 w-full flex-row justify-between bg-default-50 p-4">
      <Link href={currentPath === '/' ? '/' : '/'} asChild>
        <Button
          isIconOnly
          variant={currentPath !== '/' ? 'light' : 'solid'}
          color={currentPath !== '/' ? 'default' : 'primary'}
          size="lg"
          startContent={
            currentPath !== '/' ? (
              <ChevronIcon
                className="text-foreground"
                width="24px"
                height="24px"
              />
            ) : (
              <Plus className="text-white" width="24px" height="24px" />
            )
          }
        />
      </Link>
      <ThemeSwitcher />
    </View>
  )
}

export default Header
