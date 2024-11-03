import { Button, ChevronIcon, Plus } from '@malberee/nextui-native'
import { Link, usePathname, useSegments } from 'expo-router'
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
  const segments = useSegments()

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
          quantity: 3,
        },
        {
          id: Math.random().toString(),
          name: 'sfsdf',
          price: 123,
          quantity: 1,
          picture:
            'https://images.openfoodfacts.org/images/products/482/307/762/1154/front_en.30.400.jpg',
        },
        {
          id: Math.random().toString(),
          name: 'sfsdf',
          price: 123,
          quantity: 2,
        },
        {
          id: Math.random().toString(),
          name: 'sfsdf',
          price: 0,
          quantity: 2,
        },
      ],
    })
  }

  const isScanner =
    segments[0] === 'qr-scanner' || segments[0] === 'barcode-scanner'

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
              <ChevronIcon
                className={isScanner ? 'text-white' : 'text-foreground'}
                width="24px"
                height="24px"
              />
            }
          />
        )}
      </Link>

      {!isScanner ? <ThemeSwitcher /> : null}
    </View>
  )
}

export default Header
