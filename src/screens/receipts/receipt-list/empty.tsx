import { store } from '@store'
import { ArrowLeftIcon, cn } from 'merlo-ui'
import { observer } from 'mobx-react-lite'
import { cssInterop } from 'nativewind'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import { useTheme } from '@providers'

cssInterop(ArrowLeftIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
    },
  },
})

export const Empty = observer(() => {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const filters = store.filters
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
          className={cn(
            'px-12 text-center text-xl text-foreground-500',
            isDark && '!text-foreground-300',
          )}
        >
          {hasFilters ? t('No results found') : t('Oops!')}
        </Text>
      </View>
      <View className="mb-[101px] flex-1 animate-bounce flex-row items-end justify-center">
        {!hasFilters ? (
          <ArrowLeftIcon
            className={cn(
              '-rotate-90 text-default-300',
              isDark && '!text-default-100',
            )}
            height="150px"
            width="150px"
          />
        ) : null}
      </View>
    </View>
  )
})
