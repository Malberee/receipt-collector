import { cn } from '@malberee/heroui-native'
import { type ProductType } from '@store'
import { cssInterop } from 'nativewind'
import React, { type FC } from 'react'
import { Image, Pressable, Text, View } from 'react-native'

import { SwipeToDelete } from '@components'
import { NoImageIcon } from '@icons'
import { useTheme } from '@providers'
import { formatCurrency } from '@utils'

interface ProductProps {
  product: ProductType
  receiptId: string
  onPress: (product: ProductType) => void
  onDelete: (id: string) => void
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

export const Product: FC<ProductProps> = ({ product, onPress, onDelete }) => {
  const { isDark } = useTheme()
  const { name, picture, price, quantity, id } = product
  const shouldSliceName = name.length >= 17

  return (
    <SwipeToDelete onDelete={() => onDelete(id)}>
      <Pressable
        onPress={() => onPress(product)}
        className={cn(
          'flex-row items-center justify-between bg-default-50 p-4 transition-colors active:bg-default-100',
          isDark && '!bg-default-100 active:!bg-[#313135]',
        )}
      >
        <View className="shrink flex-row items-center gap-4">
          <View
            className={cn(
              'size-16 flex-row items-center justify-center overflow-hidden rounded-medium',
              !picture && 'bg-default-100',
              !picture && isDark && '!bg-default-50/40',
            )}
          >
            {picture ? (
              <Image
                resizeMode="contain"
                className="size-full"
                source={{ uri: picture }}
              />
            ) : (
              <NoImageIcon
                className={cn(
                  'h-8 w-8 text-foreground-400',
                  isDark && '!text-foreground-300',
                )}
              />
            )}
          </View>
          <View>
            <Text className="text-xl text-foreground">
              {shouldSliceName ? name.slice(0, 17).concat('...') : name}
            </Text>
            <Text className="text-md text-foreground-500">{quantity}pcs</Text>
          </View>
        </View>
        <View>
          <Text className="text-2xl text-foreground">
            {formatCurrency(price ?? 0)}
          </Text>
          {quantity > 1 && price ? (
            <Text className="text-md text-right text-foreground-500">
              {formatCurrency(price * quantity)}
            </Text>
          ) : null}
        </View>
      </Pressable>
    </SwipeToDelete>
  )
}
