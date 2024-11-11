import { ArrowLeftIcon } from '@malberee/nextui-native'
import { cssInterop } from 'nativewind'
import React from 'react'
import { Text, View } from 'react-native'

cssInterop(ArrowLeftIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
    },
  },
})

const Empty = () => {
  return (
    <View className="flex-1">
      <View className="flex-1 flex-row items-end justify-center">
        <Text className="px-12 text-center text-xl text-foreground-500 dark:text-foreground-300">
          Oops! It's empty. Try scanning the receipt or adding it manually
        </Text>
      </View>
      <View className="mb-[101px] flex-1 animate-bounce flex-row items-end justify-center">
        <ArrowLeftIcon
          className="-rotate-90 text-default-300 dark:text-default-100"
          height="150px"
          width="150px"
        />
      </View>
    </View>
  )
}

export default Empty
