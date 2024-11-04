import moment from 'moment'
import React, { type FC } from 'react'
import { Text, View } from 'react-native'

import type { ReceiptType } from '@entities/receipt'

import { currencyFormatter } from '@shared/lib'
import { Chip } from '@shared/ui'

import { Divider } from './divider'

export const Header: FC<ReceiptType> = ({ amount, date, rarity }) => {
  return (
    <View className="rounded-t-medium bg-default-200 dark:bg-default-100">
      <View>
        <View className="flex-row justify-between p-4">
          <View>
            <Text className="mb-2 text-3xl text-foreground">
              {currencyFormatter.format(amount)}
            </Text>
            <Text className="text-base text-foreground-400">
              {moment(date).format('YYYY.MM.DD [ • ] HH:mm')}
            </Text>
          </View>
          <Chip
            rarity={rarity}
            classNames={{ base: 'h-9', content: 'text-xl' }}
          />
        </View>
        <Divider />
      </View>
    </View>
  )
}
