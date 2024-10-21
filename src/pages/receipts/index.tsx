import React from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'

import { Receipt, type ReceiptType } from '@entities/receipt'

const receipts: ReceiptType[] = [
  { id: '1', date: new Date(), amount: 10.0, rarity: 'rare' },
  { id: '2', date: new Date(), amount: 26.3, rarity: 'mythic' },
  { id: '3', date: new Date(), amount: 14.5, rarity: 'common' },
  { id: '4', date: new Date(), amount: 30.0, rarity: 'epic' },
  { id: '5', date: new Date(), amount: 20.0, rarity: 'legendary' },
  { id: '6', date: new Date(), amount: 10.0, rarity: 'rare' },
  { id: '7', date: new Date(), amount: 26.3, rarity: 'mythic' },
  { id: '8', date: new Date(), amount: 14.5, rarity: 'common' },
  { id: '9', date: new Date(), amount: 30.0, rarity: 'epic' },
  { id: '10', date: new Date(), amount: 20.0, rarity: 'legendary' },
  { id: '11', date: new Date(), amount: 10.0, rarity: 'rare' },
  { id: '12', date: new Date(), amount: 26.3, rarity: 'mythic' },
  { id: '13', date: new Date(), amount: 14.5, rarity: 'common' },
  { id: '14', date: new Date(), amount: 30.0, rarity: 'epic' },
  { id: '15', date: new Date(), amount: 20.0, rarity: 'legendary' },
  { id: '16', date: new Date(), amount: 10.0, rarity: 'rare' },
  { id: '17', date: new Date(), amount: 26.3, rarity: 'mythic' },
  { id: '18', date: new Date(), amount: 14.5, rarity: 'common' },
  { id: '19', date: new Date(), amount: 30.0, rarity: 'epic' },
  { id: '20', date: new Date(), amount: 20.0, rarity: 'legendary' },
  { id: '21', date: new Date(), amount: 10.0, rarity: 'rare' },
  { id: '22', date: new Date(), amount: 26.3, rarity: 'mythic' },
  { id: '23', date: new Date(), amount: 14.5, rarity: 'common' },
  { id: '24', date: new Date(), amount: 30.0, rarity: 'epic' },
  { id: '25', date: new Date(), amount: 20.0, rarity: 'legendary' },
]

function Receipts() {
  return (
    <>
      <FlatList
        contentContainerStyle={{ paddingBottom: 101 }}
        data={receipts}
        renderItem={({ item }) => <Receipt {...item} />}
        keyExtractor={(item) => item.id}
      />
      <View className="absolute bottom-4 w-full px-4">
        <Pressable className="w-full rounded-large border-2 border-dashed border-primary bg-[#d9eafd] px-3 py-6 transition-colors duration-100 active:bg-[#bfdbfa] dark:bg-[#171d26] dark:active:bg-[#14253b]">
          <Text className="text-center text-large text-foreground">
            Add manually
          </Text>
        </Pressable>
      </View>
    </>
  )
}

export default Receipts
