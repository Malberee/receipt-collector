import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { FlatList } from 'react-native'

import { Product } from '@entities/product'
import { receipts } from '@entities/receipt'

import { ScannerButton } from '@shared/ui'

import { Header } from './header'

export const ReceiptDetails = () => {
  const { id } = useLocalSearchParams()

  const receipt = receipts.getReceiptById(id as string)!

  const { products } = receipt

  return (
    <>
      <FlatList
        data={products}
        ListHeaderComponent={<Header {...receipt} />}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <Product
            product={item}
            isLast={index + 1 === products?.length}
            isFirst={index === 0}
          />
        )}
      />
      <ScannerButton href="/barcode-scanner">Scan barcode</ScannerButton>
    </>
  )
}
