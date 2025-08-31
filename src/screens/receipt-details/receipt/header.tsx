import { Button, cn } from '@malberee/heroui-native'
import type { ReceiptType } from '@store'
import moment from 'moment'
import React, { type FC } from 'react'
import { Text, View } from 'react-native'

import { RarityChip } from '@components'
import { useTheme } from '@providers'
import { formatCurrency } from '@utils'

import { Divider } from './divider'

interface HeaderProps {
  receipt: ReceiptType
  openModal: () => void
}

export const Header: FC<HeaderProps> = ({ receipt, openModal }) => {
  const { isDark } = useTheme()
  const { amount, date, rarity } = receipt

  const receiptAmount = receipt.autoCalcAmount
    ? (receipt.products.reduce(
        (acc, product) => acc + product.calculatedPrice,
        0,
      ) ?? 0)
    : amount

  return (
    <View className="-mb-[0.1px]">
      <View
        className={cn(
          'rounded-t-medium bg-default-50',
          isDark && '!bg-default-100',
        )}
      >
        <View className="flex-row justify-between p-4">
          <View>
            <Text className="mb-2 text-3xl text-foreground">
              {formatCurrency(receiptAmount)}
            </Text>
            <Text className="text-base text-foreground-400">
              {moment(date).format('YYYY.MM.DD [ • ] HH:mm')}
            </Text>
          </View>
          {rarity !== 'none' ? (
            <RarityChip
              rarity={rarity}
              classNames={{ base: 'h-9', content: 'text-xl' }}
            />
          ) : null}
        </View>
        <Divider />
      </View>
      <View className={cn('bg-default-50', isDark && '!bg-default-100')}>
        <View className="p-4">
          <Button size="lg" variant="flat" onPress={openModal}>
            Add product
          </Button>
        </View>
        <Divider />
      </View>
    </View>
  )
}
