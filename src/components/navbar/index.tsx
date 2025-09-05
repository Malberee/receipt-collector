import { Button } from '@malberee/heroui-native'
import { router, usePathname } from 'expo-router'
import type { FC } from 'react'
import { View } from 'react-native'

import { ChartIcon } from './chart-icon'
import { ReceiptIcon } from './receipt-icon'

interface NavbarProps {
  onNavigate: () => void
}

const routes = {
  '/': { label: 'Receipt list', Icon: ReceiptIcon },
  '/stats': { label: 'Stats', Icon: ChartIcon },
}

export const Navbar: FC<NavbarProps> = ({ onNavigate }) => {
  const pathname = usePathname()

  return (
    <View className="flex-col gap-4">
      {Object.entries(routes).map(([path, { label, Icon }]) => {
        const isActive = pathname === path

        return (
          <Button
            size="lg"
            color={isActive ? 'primary' : 'default'}
            variant={isActive ? 'flat' : 'light'}
            fullWidth
            className="h-14 justify-start"
            startContent={
              <Icon className={isActive ? 'text-primary' : 'text-foreground'} />
            }
            onPress={() => {
              router.navigate(path)
              onNavigate()
            }}
            key={label}
          >
            {label}
          </Button>
        )
      })}
    </View>
  )
}
