import moment from 'moment'
import { cssInterop } from 'nativewind'
import React, { type FC } from 'react'
import { Text, View } from 'react-native'
import DashedLine from 'react-native-dashed-line'

import type { ReceiptType } from '@entities/receipt'

import { currencyFormatter } from '@shared/lib'
import { Chip } from '@shared/ui'

const StyledDashedLine = cssInterop(DashedLine, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: 'dashColor',
    },
  },
})

export const Header: FC<ReceiptType> = ({ amount, date, rarity }) => {
  return (
    <View className="rounded-t-medium bg-default-100">
      <View className="flex-row justify-between p-4">
        <View>
          <Text className="mb-2 text-3xl text-foreground">
            {currencyFormatter.format(amount)}
          </Text>
          <Text className="text-base text-foreground-400">
            {moment(date).format('YYYY.MM.DD [-] HH:mm')}
          </Text>
        </View>
        <Chip
          rarity={rarity}
          classNames={{ base: 'h-9', content: 'text-xl' }}
        />
      </View>

      <View className="absolute bottom-4 left-0 w-full translate-y-1/2 px-6">
        <StyledDashedLine
          className="text-default-50"
          dashGap={5}
          dashLength={5}
          dashThickness={3}
        />
      </View>
      <View className="flex-row justify-between">
        <View className="z-10 size-8 -translate-x-1/2 rounded-full bg-default-50" />
        <View className="z-10 size-8 translate-x-1/2 rounded-full bg-default-50" />
      </View>
    </View>
  )
}
