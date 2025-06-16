import { Link } from 'expo-router'
import moment from 'moment'
import React, { memo } from 'react'
import { Text, View } from 'react-native'

import { DeleteLayout } from '@features/delete-entity'

import { type ReceiptType, receipts } from '@entities/receipt'

import { currencyFormatter } from '@shared/lib'
import { Chip } from '@shared/ui'

interface ReceiptProps extends ReceiptType {}

export const Receipt = memo(({ id, amount, date, rarity }: ReceiptProps) => {
  return (
    <DeleteLayout onDelete={() => receipts.deleteReceipt(id)}>
      <Link href={`/${id}`} asChild>
        <View className="bg-default-50 transition-colors duration-100 active:bg-[#f7f7f8] dark:active:bg-[#222222]">
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
            <Chip rarity={rarity} />
          </View>
        </View>
      </Link>
    </DeleteLayout>
  )
})
