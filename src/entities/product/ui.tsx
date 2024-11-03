import { cssInterop } from 'nativewind'
import React, { type FC } from 'react'
import { Image, Text, View } from 'react-native'

import type { ProductType } from '@entities/receipt'

import { currencyFormatter } from '@shared/lib'
import { NoImageIcon } from '@shared/ui'

interface ProductProps {
  product: ProductType
  isFirst: boolean
  isLast: boolean
}

cssInterop(NoImageIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
      width: true,
      height: true,
    },
  },
})

export const Product: FC<ProductProps> = ({ product, isFirst, isLast }) => {
  const { name, picture, price } = product

  return (
    <View>
      <View className="flex-row items-center justify-between p-4">
        <View className="flex-row items-center gap-4">
          <View
            className={`size-16 flex-row items-center justify-center overflow-hidden rounded-medium ${!picture && 'bg-default-50/40'}`}
          >
            {picture ? (
              <Image
                resizeMode="contain"
                className="size-full"
                source={{ uri: picture }}
              />
            ) : (
              <NoImageIcon className="h-8 w-8 text-foreground-300" />
            )}
          </View>
          <Text className="text-xl text-foreground">{name}</Text>
        </View>
        <Text className="text-2xl text-foreground">
          {currencyFormatter.format(price ?? 0)}
        </Text>
      </View>
    </View>
  )
}
