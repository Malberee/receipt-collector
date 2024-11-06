import { Button } from '@malberee/nextui-native'
import moment from 'moment'
import React, { type FC } from 'react'
import { Pressable, Text, View } from 'react-native'

import type { ReceiptType } from '@entities/receipt'

import { currencyFormatter } from '@shared/lib'
import { Chip } from '@shared/ui'

import { Divider } from './divider'
import type { ModalType } from './index'

interface HeaderProps {
  receipt: ReceiptType
  setModalType: (string: ModalType) => void
}

export const Header: FC<HeaderProps> = ({ receipt, setModalType }) => {
  const { amount, date, rarity } = receipt

  return (
    <View>
      <Pressable
        onPress={() => setModalType('receipt')}
        className="rounded-t-medium bg-default-200 transition-colors active:bg-[#dedee0] dark:bg-default-100 dark:active:bg-[#313135]"
      >
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
      </Pressable>
      <View className="bg-default-200 dark:bg-default-100">
        <View className="p-4">
          <Button
            size="lg"
            variant="flat"
            onPress={() => setModalType('product')}
          >
            Add product
          </Button>
        </View>
        <Divider />
      </View>
    </View>
  )
}
