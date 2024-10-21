import { Chip } from '@malberee/nextui-native'
import moment from 'moment'
import { Pressable, Text, View } from 'react-native'

import { Rarity, rarityColors } from '@shared/config'

export type ReceiptType = {
  id: string
  amount: number
  date: Date
  rarity: Rarity
}

export interface ReceiptProps extends ReceiptType {}

export function Receipt({ amount, date, rarity }: ReceiptProps) {
  const formatter = new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
  })

  return (
    <Pressable className="flex-row items-center justify-between border-b border-default-100 bg-default-50 px-9 py-4 transition-colors active:bg-default-100/50">
      <View className="flex-col justify-between">
        <Text className="text-xl text-foreground">
          {formatter.format(amount)}
        </Text>
        <Text className="text-sm text-foreground-500">
          {moment(date).format('DD.MM.YYYY [ - ] HH:mm')}
        </Text>
      </View>
      {rarity !== 'none' && (
        <Chip
          size="lg"
          color={rarityColors[rarity]}
          classNames={{ content: 'capitalize' }}
        >
          {rarity}
        </Chip>
      )}
    </Pressable>
  )
}

export default Receipt
