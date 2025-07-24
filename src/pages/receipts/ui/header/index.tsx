import { Button } from '@malberee/heroui-native'
import { cssInterop } from 'nativewind'
import React, { type FC } from 'react'
import { View } from 'react-native'

import { ToggleTheme } from '@features/toggle-theme'

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
          startContent={<FilterIcon className="text-foreground" />}
          onPress={toggleFilters}
        />
      </View>
      <ToggleTheme />
    </View>
  )
}
