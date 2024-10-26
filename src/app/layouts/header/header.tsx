import { Button, ChevronIcon } from '@malberee/nextui-native'
import { Link, usePathname } from 'expo-router'
import { cssInterop } from 'nativewind'
import { View } from 'react-native'

import ScannerIcon from './qr-icon'
import ThemeSwitcher from './theme-switcher'

cssInterop(ScannerIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

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
    <View className="z-10 w-full flex-row justify-between p-4">
      <Link href={currentPath === '/' ? '/scanner' : '/'} asChild>
        <Button
          isIconOnly
          variant="light"
          color="default"
          size="lg"
          startContent={
            currentPath !== '/' ? (
              <ChevronIcon
                className="text-foreground"
                width="24px"
                height="24px"
              />
            ) : (
              <ScannerIcon
                className="text-foreground"
                width="24px"
                height="24px"
              />
            )
          }
        />
      </Link>
      <ThemeSwitcher />
    </View>
  )
}

export default Header
