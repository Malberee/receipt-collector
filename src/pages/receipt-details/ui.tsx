import { useLocalSearchParams } from 'expo-router'
import moment from 'moment'
import React from 'react'
import { FlatList, Text, View } from 'react-native'

import { receipts } from '@entities/receipt'

import { currencyFormatter } from '@shared/lib'
import { Chip, ScannerButton } from '@shared/ui'

const ReceiptDetails = () => {
  const { id } = useLocalSearchParams()

  const { amount, date, rarity, products } = receipts.getReceiptById(
    id as string,
  )!

  return (
    <>
      <View className="flex-row justify-between border-b border-default-100 pb-4">
        <View>
          <Text className="text-4xl text-foreground">{amount}</Text>
          <Text className="text-base text-foreground-400">
            {moment(date).format('DD.MM.YYYY [ - ] HH:mm')}
          </Text>
        </View>
        <Chip
          rarity={rarity}
          classNames={{ base: 'h-9', content: 'capitalize text-2xl' }}
        />
      </View>
      <FlatList
        data={products}
        renderItem={({ item: { name, quantity, price } }) => (
          <View className="flex-row items-center justify-between border-b border-default-100 p-4">
            <View>
              <Text className="mb-2 text-base text-foreground">{name}</Text>
              {quantity && (
                <Text className="text-xs text-foreground-500">
                  {quantity}шт
                </Text>
              )}
            </View>
            {price && (
              <Text className="text-2xl text-foreground">
                {currencyFormatter.format(price)}
              </Text>
            )}
          </View>
        )}
      />
      <ScannerButton href="/barcode-scanner">Scan barcode</ScannerButton>
    </>
  )
}

export default ReceiptDetails
