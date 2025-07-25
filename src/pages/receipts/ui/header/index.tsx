import { Button } from '@malberee/heroui-native'
import { router } from 'expo-router'
import { cssInterop } from 'nativewind'
import React, { type FC } from 'react'
import { View } from 'react-native'

import { ToggleTheme } from '@features/toggle-theme'

import { ChartIcon } from './chart-icon'
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
  return (
    <View className="w-full flex-row justify-between pb-4">
      <View className="flex-row gap-4">
        <Button
          isIconOnly
          variant="light"
          size="lg"
          color="default"
          startContent={
            <ChartIcon className="text-foreground" width={24} height={24} />
          }
          onPress={() => router.navigate('/stats')}
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
      <ToggleTheme />
    </View>
  )
}
