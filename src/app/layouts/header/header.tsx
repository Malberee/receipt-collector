import { Button, ChevronIcon, Flash } from '@malberee/nextui-native'
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

cssInterop(Flash, {
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
      <Link href={currentPath === '/scanner' ? '/' : 'scanner'} asChild>
        <Button
          isIconOnly
          variant="light"
          color="default"
          size="lg"
          startContent={
            currentPath === '/scanner' ? (
              <ChevronIcon color="white" width="24px" height="24px" />
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
      {currentPath === '/scanner' ? (
        <Button
          isIconOnly
          variant="light"
          color="default"
          size="lg"
          startContent={<Flash className="text-foreground" size="24" />}
        />
      ) : (
        <ThemeSwitcher />
      )}
    </View>
  )
}

export default Header
