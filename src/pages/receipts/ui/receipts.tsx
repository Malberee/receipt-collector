import { Link } from 'expo-router'
import { observer } from 'mobx-react-lite'
import { cssInterop } from 'nativewind'
import React from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'

import { Receipt, receipts } from '@entities/receipt'

import { type Rarity, rarityColors } from '@shared/config'

import Empty from './empty'
import ScannerIcon from './qr-icon'

cssInterop(ScannerIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

const Receipts = observer(() => {
  const data = receipts.receipts

  const handlePress = () => {
    const rarities = Object.keys(rarityColors)

    receipts.addReceipt({
      fiscalNumber: Math.random(),
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
        <Link href="/scanner" asChild>
          <Pressable
            onPress={handlePress}
            className="w-full flex-row items-center justify-center gap-2 rounded-large border-2 border-dashed border-primary bg-[#d9eafd] px-3 py-6 transition-colors duration-100 active:bg-[#bfdbfa] dark:bg-[#171d26] dark:active:bg-[#14253b]"
          >
            <ScannerIcon className="text-primary" width="24px" height="24px" />
            <Text className="text-center text-xl text-primary">Scan QR</Text>
          </Pressable>
        </Link>
      </View>
    </>
  )
})

export default Receipts
