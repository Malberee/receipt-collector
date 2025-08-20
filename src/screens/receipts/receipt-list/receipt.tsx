import { cn } from '@malberee/heroui-native'
import { type ReceiptType } from '@store'
import { Link } from 'expo-router'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import React from 'react'
import { Text, View } from 'react-native'

import { RarityChip, SwipeToDelete } from '@components'
import { useTheme } from '@providers'
import { formatCurrency } from '@utils'

interface ReceiptProps {
  receipt: ReceiptType
  onDelete: (id: string) => void
}

export const Receipt = observer<ReceiptProps>(({ receipt, onDelete }) => {
  const { id, amount, date, rarity, products, autoCalcAmount } = receipt
  const { isDark } = useTheme()

  const receiptAmount = autoCalcAmount
    ? products.reduce((acc, product) => acc + product.calculatedPrice, 0)
    : amount

  return (
    <SwipeToDelete onDelete={() => onDelete(id)}>
      <Link href={`/${id}`} asChild>
        <View
          className={cn(
            'bg-default-50 px-4 transition-colors duration-100 active:bg-[#f7f7f8]',
            isDark && 'active:!bg-[#222222]',
          )}
        >
          <View className="w-full flex-row items-center justify-between border-b border-default-100 px-4 py-4">
            <View className="flex-col justify-between">
              <Text className="text-xl text-foreground">
                {formatCurrency(receiptAmount)}
              </Text>
              <Text className="text-sm text-foreground-500">
                {moment(date).calendar(null, {
                  sameDay: '[Today] [ • ] HH:mm',
                  lastDay: '[Yesterday] [ • ] HH:mm',
                  lastWeek: '[Last] dddd [ • ] HH:mm',
                  sameElse: `DD MMMM ${moment().year() !== moment(date).year() ? 'YYYY ' : ''}[ • ] HH:mm`,
                })}
              </Text>
            </View>
            {rarity !== 'none' ? <RarityChip rarity={rarity} /> : null}
          </View>
        </View>
      </Link>
    </SwipeToDelete>
  )
})
