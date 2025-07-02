import { Link } from 'expo-router'
import moment from 'moment'
import React, { memo } from 'react'
import { Text, View } from 'react-native'

import { type ReceiptType } from '@entities/receipt'

import { currencyFormatter, useTheme } from '@shared/lib'
import { Chip, SwipeToDelete } from '@shared/ui'

interface ReceiptProps {
  receipt: ReceiptType
  onDelete: (id: string) => void
}

export const Receipt = memo<ReceiptProps>(({ receipt, onDelete }) => {
  const { id, amount, date, rarity } = receipt
  const { isDark } = useTheme()

  return (
    <SwipeToDelete onDelete={() => onDelete(id)}>
      <Link href={`/${id}`} asChild>
        <View
          className={`bg-default-50 px-4 duration-100 active:bg-[#f7f7f8] active:transition-colors ${isDark && 'active:!bg-[#222222]'}`}
        >
          <View className="w-full flex-row items-center justify-between border-b border-default-100 px-4 py-4">
            <View className="flex-col justify-between">
              <Text className="text-xl text-foreground">
                {currencyFormatter.format(amount)}
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
            {rarity !== 'none' ? <Chip rarity={rarity} /> : null}
          </View>
        </View>
      </Link>
    </SwipeToDelete>
  )
})
