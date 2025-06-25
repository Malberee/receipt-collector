import { ArrowLeftIcon } from '@malberee/heroui-native'
import { observer } from 'mobx-react-lite'
import { cssInterop } from 'nativewind'
import React from 'react'
import { Text, View } from 'react-native'

import { receipts } from '@entities/receipt'

import { useTheme } from '@shared/lib'

cssInterop(ArrowLeftIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
    },
  },
})

export const Empty = observer(() => {
  const { isDark } = useTheme()

  const filters = receipts.filters
  const hasFilters = Object.values(filters).some((filter) => {
    if (Array.isArray(filter)) {
      return !!filter.length
    }
    return !!Object.values(filter).length
  })

  return (
    <View className="flex-1">
      <View className="flex-1 flex-row items-end justify-center">
        <Text
          className={`px-12 text-center text-xl text-foreground-500 ${isDark && '!text-foreground-300'}`}
        >
          {hasFilters
            ? 'No results found for these filters.'
            : `Oops! It's empty. Try scanning the receipt or adding it manually.`}
        </Text>
      </View>
      <View className="mb-[101px] flex-1 animate-bounce flex-row items-end justify-center">
        {!hasFilters ? (
          <ArrowLeftIcon
            className={`-rotate-90 text-default-300 ${isDark && '!text-default-100'}`}
            height="150px"
            width="150px"
          />
        ) : null}
      </View>
    </View>
  )
})
