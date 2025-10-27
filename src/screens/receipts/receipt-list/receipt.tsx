import { type ReceiptType } from '@store'
import { router } from 'expo-router'
import { cn } from 'merlo-ui'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { cssInterop } from 'nativewind'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, Text, View } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'

import { RarityChip, SwipeToDelete } from '@components'
import { useTheme } from '@providers'
import { formatCurrency } from '@utils'

interface ReceiptProps {
  receipt: ReceiptType
  showSeparator: boolean
  onDelete: (id: string) => void
}

cssInterop(Pressable, {
  className: {
    target: 'style',
  },
})

export const Receipt = observer<ReceiptProps>(
  ({ receipt, showSeparator, onDelete }) => {
    const { id, amount, date, rarity, products, autoCalcAmount } = receipt
    const { t } = useTranslation()
    const { isDark } = useTheme()

    const receiptAmount = autoCalcAmount
      ? products.reduce((acc, product) => acc + product.calculatedPrice, 0)
      : amount

    return (
      <SwipeToDelete
        width={Dimensions.get('screen').width}
        onDelete={() => onDelete(id)}
      >
        <Pressable
          className={cn(
            'bg-default-50 px-4 active:bg-[#f7f7f8]',
            isDark && 'active:!bg-[#222222]',
          )}
          onPress={() => router.navigate(`/${id}`)}
        >
          <View
            className={cn(
              'w-full flex-row items-center justify-between px-4 py-4',
              showSeparator && 'border-b border-default-100',
            )}
          >
            <View className="flex-col justify-between">
              <Text className="text-xl text-foreground">
                {formatCurrency(receiptAmount)}
              </Text>
              <Text className="text-sm capitalize text-foreground-500">
                {moment(date).calendar(null, {
                  sameDay: `[${t('Today')}] [ • ] HH:mm`,
                  lastDay: `[${t('Yesterday')}] [ • ] HH:mm`,
                  lastWeek: 'DD MMMM [ • ] LT',
                  sameElse: `DD MMMM ${moment().year() !== moment(date).year() ? 'YYYY ' : ''}[ • ] HH:mm`,
                })}
              </Text>
            </View>
            {rarity !== 'none' ? (
              <RarityChip rarity={rarity} pointerEvents="none" />
            ) : null}
          </View>
        </Pressable>
      </SwipeToDelete>
    )
  },
)
