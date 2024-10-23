import { observer } from 'mobx-react-lite'
import React from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'

import { Receipt, receipts } from '@entities/receipt'

import { type Rarity, rarityColors } from '@shared/config'

import Empty from './empty'

const Receipts = observer(() => {
  const data = receipts.receipts

  const handlePress = () => {
    const rarities = Object.keys(rarityColors)

    receipts.addReceipt({
      fiscalNumber: Math.random().toString().slice(2, 10),
      id: Math.random().toString(),
      amount: Math.round(Math.random() * 100),
      date: new Date(),
      rarity: rarities[Math.floor(Math.random() * rarities.length)] as Rarity,
      products: [
        {
          id: Math.random().toString(),
          name: 'sfsdf',
          price: 123,
          quantity: 1,
        },
      ],
    })
  }

  return (
    <>
      <FlatList
        contentContainerStyle={{ paddingBottom: 101, minHeight: '100%' }}
        data={data}
        renderItem={({ item }) => <Receipt {...item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Empty />}
      />
      <View className="absolute bottom-4 w-full px-4">
        <Pressable
          onPress={handlePress}
          className="w-full rounded-large border-2 border-dashed border-primary bg-[#d9eafd] px-3 py-6 transition-colors duration-100 active:bg-[#bfdbfa] dark:bg-[#171d26] dark:active:bg-[#14253b]"
        >
          <Text className="text-center text-large text-foreground">
            Add manually
          </Text>
        </Pressable>
      </View>
    </>
  )
})

export default Receipts
