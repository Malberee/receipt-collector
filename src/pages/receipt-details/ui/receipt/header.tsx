import { Button } from '@malberee/heroui-native'
import moment from 'moment'
import React, { type FC } from 'react'
import { Text, View } from 'react-native'

import type { ReceiptType } from '@entities/receipt'

import { currencyFormatter } from '@shared/lib'
import { Chip } from '@shared/ui'

import { Divider } from './divider'

interface HeaderProps {
  receipt: ReceiptType
  openModal: () => void
}

export const Header: FC<HeaderProps> = ({ receipt, openModal }) => {
  const { amount, date, rarity } = receipt

  return (
    <View>
      <View className="rounded-t-medium bg-default-200 dark:bg-default-100">
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
      <View className="bg-default-200 dark:bg-default-100">
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
