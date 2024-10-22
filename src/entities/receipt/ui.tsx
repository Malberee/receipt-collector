import { Link } from 'expo-router'
import moment from 'moment'
import { Text, View } from 'react-native'

import { currencyFormatter } from '@shared/lib'
import { Chip } from '@shared/ui'

import type { ReceiptType } from './model'

interface ReceiptProps extends ReceiptType {}

export const Receipt = ({ id, amount, date, rarity }: ReceiptProps) => {
  return (
    <Link href={`/receipt-details/${id}`} asChild>
      <View className="bg-default-50 px-4 transition-colors active:bg-default-100/50">
        <View className="w-full flex-row items-center justify-between border-b border-default-100 px-4 py-4">
          <View className="flex-col justify-between">
            <Text className="text-xl text-foreground">
              {currencyFormatter.format(amount)}
            </Text>
            <Text className="text-sm text-foreground-500">
              {moment(date).format('DD.MM.YYYY [ - ] HH:mm')}
            </Text>
          </View>
          <Chip rarity={rarity} />
        </View>
      </View>
    </Link>
  )
}
