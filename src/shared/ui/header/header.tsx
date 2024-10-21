import { Button, ChevronIcon, Flash } from '@malberee/nextui-native'
import { Link, usePathname } from 'expo-router'
import { View } from 'react-native'

import ScannerIcon from './qr-icon'

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
              <ScannerIcon color="white" width="24px" height="24px" />
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
          startContent={<Flash color="white" size="24" />}
        />
      ) : null}
    </View>
  )
}

export default Header
