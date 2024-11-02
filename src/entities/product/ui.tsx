import { cssInterop } from 'nativewind'
import React, { type FC } from 'react'
import { Image, Text, View } from 'react-native'
import DashedLine from 'react-native-dashed-line'

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

const StyledDashedLine = cssInterop(DashedLine, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: 'dashColor',
    },
  },
})

export const Product: FC<ProductProps> = ({ product, isFirst, isLast }) => {
  const { name, picture, price } = product

  return (
    <View>
      {isFirst ? (
        <StyledDashedLine
          className="mx-4 text-default-100"
          dashGap={5}
          dashLength={5}
          dashThickness={2}
        />
      ) : null}

      {isFirst ? (
        <>
          <View className="absolute left-0 top-0 z-10 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-default-50" />
          <View className="absolute right-0 top-0 z-10 size-8 -translate-y-1/2 translate-x-1/2 rounded-full bg-default-50" />
        </>
      ) : null}

      <View
        className={`flex-row items-center justify-between ${isLast && 'rounded-b-medium'} bg-default-100 p-4`}
      >
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
