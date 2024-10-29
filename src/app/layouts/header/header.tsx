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

function Header() {
  const currentPath = usePathname()

  return (
    <View
      className={`z-10 w-full flex-row justify-between p-4 ${currentPath === '/scanner' && 'absolute'}`}
    >
      <Link href={currentPath === '/' ? '/' : '/'} asChild>
        <Button
          isIconOnly
          variant={currentPath !== '/' ? 'light' : 'solid'}
          color={currentPath !== '/' ? 'default' : 'primary'}
          size="lg"
          startContent={
            currentPath !== '/' ? (
              <ChevronIcon
                className={
                  currentPath === '/scanner' ? 'text-white' : 'text-foreground'
                }
                width="24px"
                height="24px"
              />
            ) : (
              <Plus color="white" width="24px" height="24px" />
            )
          }
        />
      </Link>
      {currentPath !== '/scanner' ? <ThemeSwitcher /> : null}
    </View>
  )
}

export default Header
