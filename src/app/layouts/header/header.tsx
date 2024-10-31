import { Button, ChevronIcon, Plus } from '@malberee/nextui-native'
import { Link, usePathname } from 'expo-router'
import { cssInterop } from 'nativewind'
import { View } from 'react-native'

import { receipts } from '@entities/receipt'

import { type Rarity, rarityColors } from '@shared/config'

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

  const handlePress = () => {
    const rarities = Object.keys(rarityColors)

    receipts.addReceipt({
      fiscalNumber: Math.random(),
      id: Math.random().toString(),
      amount: Math.round(Math.random() * 100),
      date: new Date(),
      rarity: rarities[Math.floor(Math.random() * rarities.length)] as Rarity,
      products: [
        {
          id: Math.random().toString(),
          name: 'sfsdf',
          price: 123,
          quantity: 1,
        },
      ],
    })
  }

  const isScanner =
    currentPath === '/qr-scanner' || currentPath === '/barcode-scanner'

  return (
    <View
      className={`z-10 w-full flex-row justify-between p-4 ${isScanner && 'absolute'}`}
    >
      <Link href="/" asChild>
        {currentPath === '/' ? (
          <Button
            isIconOnly
            size="lg"
            startContent={<Plus color="white" width="24px" height="24px" />}
            onPress={handlePress}
          />
        ) : (
          <Button
            isIconOnly
            variant="light"
            size="lg"
            startContent={
              <ChevronIcon className="text-white" width="24px" height="24px" />
            }
          />
        )}
      </Link>

      {!isScanner ? <ThemeSwitcher /> : null}
    </View>
  )
}

export default Header
