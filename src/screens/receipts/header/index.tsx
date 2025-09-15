import { Button } from 'merlo-ui'
import { cssInterop } from 'nativewind'
import React, { type FC } from 'react'
import { View } from 'react-native'

import { MenuIcon } from '@icons'
import { useDrawer } from '@providers'

import { ThemeChanger } from '../theme-changer'
import { FilterIcon } from './filter-icon'

interface HeaderProps {
  toggleFilters: () => void
}

cssInterop(FilterIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

export const Header: FC<HeaderProps> = ({ toggleFilters }) => {
  const { show } = useDrawer()

  return (
    <View className="w-full flex-row justify-between pb-4">
      <View className="flex-row gap-4">
        <Button
          isIconOnly
          variant="light"
          size="lg"
          color="default"
          startContent={
            <MenuIcon className="text-foreground" width={28} height={28} />
          }
          onPress={show}
        />
        <Button
          isIconOnly
          variant="light"
          size="lg"
          color="default"
          startContent={
            <FilterIcon className="text-foreground" width={24} height={24} />
          }
          onPress={toggleFilters}
        />
      </View>
      <ThemeChanger />
    </View>
  )
}
