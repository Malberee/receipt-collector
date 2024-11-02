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
    target: 'dashStyle',
    nativeStyleToProp: {
      color: 'dashColor',
    },
  },
})

export const Header: FC<ReceiptType> = ({ amount, date, rarity }) => {
  return (
    <View>
      <StyledDashedLine
        className="translate-y-[3px] rotate-45 rounded-[2px] text-default-100"
        dashGap={6}
        dashLength={6}
        dashThickness={6}
      />
      <View className="flex-row justify-between bg-default-100 p-4">
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
    </View>
  )
}
