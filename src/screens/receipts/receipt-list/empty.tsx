import { ArrowLeftIcon, cn } from 'merlo-ui'
import { cssInterop } from 'nativewind'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import { useTheme } from '@providers'

interface EmptyProps {
  hasFilters: boolean
}

cssInterop(ArrowLeftIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
    },
  },
})

export const Empty: FC<EmptyProps> = ({ hasFilters }) => {
  const { t } = useTranslation()
  const { isDark } = useTheme()

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
}
